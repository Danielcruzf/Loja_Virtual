using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController(StoreContext context) : BaseApiController // Controller de pedidos, recebe o contexto do banco via injeção de dependência
{
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders() // Retorna a lista de pedidos do usuário autenticado
    {
        var orders = await context.Orders // Busca os pedidos no banco
            .ProjectToDto() // Inclui os itens do pedido no resultado
            .Where(x => x.BuyerEmail == User.GetUsername()) // Filtra pelos pedidos do usuário autenticado
            .ToListAsync(); // Executa a consulta de forma assíncrona

        return orders; // Retorna a lista de pedidos
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderDetails(int id) // Retorna detalhes de um pedido específico
    {
        var order = await context.Orders // Busca os pedidos no banco
            .ProjectToDto()
            .Where(x => x.BuyerEmail == User.GetUsername() && id == x.Id) // Filtra pelo usuário e pelo id do pedido
            .FirstOrDefaultAsync(); // Retorna o primeiro resultado ou null

        if (order == null) return NotFound(); // Se não encontrar, retorna 404

        return order; // Retorna o pedido encontrado
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto) // Cria um novo pedido a partir do DTO recebido
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]); // Recupera o carrinho do usuário pelo cookie

        if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId))   // Verifica se o carrinho existe e não está vazio
            return BadRequest("Basket is empty or not found"); // Retorna erro se não houver itens

        var items = CreateOrderItems(basket.Items); // Converte itens do carrinho em itens do pedido
        if (items == null) return BadRequest("Basket is empty or items out of stock");//carrinho está vazio ou se o estoque esta vazio.

        var subtotal = items.Sum(x => x.Price * x.Quantity); // Calcula o subtotal do pedido
        var deliveryFee = CalculateDeliveryFee(subtotal); // Calcula a taxa de entrega

        var order = await context.Orders
        .Include(x => x.OrderItems)
        .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);

        if (order == null)
        {
            order = new Order // Cria o objeto pedido
            {
                OrderItems = items, // Define os itens do pedido
                BuyerEmail = User.GetUsername(), // Define o e-mail do comprador
                ShippingAddress = orderDto.ShippingAddress, // Define o endereço de entrega
                DeliveryFee = deliveryFee, // Define a taxa de entrega
                Subtotal = subtotal, // Define o subtotal
                PaymentSummary = orderDto.PaymentSummary, // Define o resumo do pagamento
                PaymentIntentId = basket.PaymentIntentId // Define o ID da intenção de pagamento
            };
            context.Orders.Add(order); // Adiciona o pedido ao contexto do banco
        }
        else
        {
            order.OrderItems = items;
         }


        var result = await context.SaveChangesAsync() > 0; // Salva as alterações no banco

        if (!result) return BadRequest("Problem creating order"); // Se falhar, retorna erro

        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.ToDto()); // Retorna 201 com os detalhes do pedido criado
    }

    private long CalculateDeliveryFee(long subtotal) // Calcula a taxa de entrega (ainda não implementado)
    {
        return subtotal > 1000 ? 0 : 500;
    }

    private List<OrderItem>? CreateOrderItems(List<BasketItem> items)
    {
        var orderItems = new List<OrderItem>();

        foreach (var item in items)
        {
            if (item.Product.QuantityInStock < item.Quantity)
                return null;

            var orderItem = new OrderItem
            {
                ItemOrdered = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    PictureUrl = item.Product.PictureUrl,
                    Name = item.Product.Name
                },
                Price = item.Product.Price,
                Quantity = item.Quantity
            };
            orderItems.Add(orderItem);

            item.Product.QuantityInStock -= item.Quantity;
        }

        return orderItems;

    }
}


/*
O trecho selecionado faz parte do método CreateOrder no controller OrdersController, responsável por criar um novo pedido (Order) a partir dos itens presentes no carrinho (Basket) do usuário autenticado.

Primeiro, o método tenta recuperar o carrinho do usuário usando o ID armazenado em um cookie chamado "basketId". Se o carrinho não existir ou estiver vazio, retorna um erro informando que o carrinho está vazio ou não foi encontrado.

Em seguida, converte os itens do carrinho em itens de pedido (OrderItems) usando o método auxiliar CreateOrderItems. Calcula o subtotal do pedido somando o preço multiplicado pela quantidade de cada item. O valor da taxa de entrega (deliveryFee) é calculado com base no subtotal, usando o método CalculateDeliveryFee.

Com essas informações, o método instancia um novo objeto Order, preenchendo propriedades como os itens do pedido, e-mail do comprador, endereço de entrega, taxa de entrega, subtotal, resumo do pagamento e ID da intenção de pagamento.

Depois, adiciona o novo pedido ao contexto do banco de dados, remove o carrinho do contexto e exclui o cookie "basketId" do usuário, indicando que o carrinho foi consumido. Por fim, salva as alterações no banco de dados. Se a operação for bem-sucedida, retorna uma resposta CreatedAtAction com os detalhes do novo pedido; caso contrário, retorna um erro informando que houve um problema ao criar o pedido.
*/