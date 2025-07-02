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
public class OrdersController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders()
    {
        var orders = await context.Orders
            .Include(x => x.OrderItems)
            .Where(x => x.BuyerEmail == User.GetUsername())
            .ToListAsync();

        return orders;
    }
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Order>> GetOrderDetails(int id)
    {
        var order = await context.Orders
            .Where(x => x.BuyerEmail == User.GetUsername() && id == x.Id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0)
            return BadRequest("Basket is empty or not found");

        var items = CreateOrderItems(basket.Items);

        var subtotal = items.Sum(x => x.Price * x.Quantity);
        var deliveryFee = CalculateDeliveryFee(subtotal);

        var order = new Order
        {
            OrderItems = items,
            BuyerEmail = User.GetUsername(),
            ShippingAddress = orderDto.ShippingAddress,
            DeliveryFee = deliveryFee,
            Subtotal = subtotal,
            PaymentSummary = orderDto.PaymentSummary,
            PaymentIntentId = basket.PaymentIntentId
        };

        context.Orders.Add(order);

        context.Baskets.Remove(basket);
        Response.Cookies.Delete("basketId");

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Problem creating order");

        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order);


    }

    private long CalculateDeliveryFee(long subtotal)
    {
        throw new NotImplementedException();
    }

    private List<OrderItem> CreateOrderItems(List<BasketItem> items)
    {
        throw new NotImplementedException();
    }
}
/*
O código apresentado define um controller chamado OrdersController dentro do namespace API.Controllers, utilizado em uma API ASP.NET Core. Esse controller é responsável por gerenciar operações relacionadas a pedidos (orders) e está protegido pelo atributo [Authorize], o que significa que apenas usuários autenticados podem acessar seus endpoints.

O construtor OrdersController recebe uma instância de StoreContext, que é provavelmente o contexto do Entity Framework responsável pela comunicação com o banco de dados. O controller herda de BaseApiController, o que sugere que funcionalidades comuns a outros controllers estão centralizadas nessa classe base.

O método GetOrders, decorado com [HttpGet], retorna uma lista de pedidos do usuário autenticado. Ele utiliza o contexto para buscar todos os pedidos (Orders) cujo campo BuyerEmail corresponde ao e-mail do usuário atual (obtido por User.GetUsername()). Além disso, utiliza Include para carregar também os itens do pedido (OrderItems) em uma única consulta, evitando consultas adicionais (lazy loading). O resultado é retornado como uma lista assíncrona.

Já o método GetOrderDetails, decorado com [HttpGet("{id:int}")], retorna os detalhes de um pedido específico, identificado pelo parâmetro id. Ele busca no banco de dados um pedido cujo Id corresponda ao fornecido e cujo BuyerEmail seja igual ao do usuário autenticado. Caso não encontre o pedido, retorna NotFound(); caso contrário, retorna o pedido encontrado.

Um ponto importante é que ambos os métodos garantem que o usuário só possa acessar seus próprios pedidos, reforçando a segurança da aplicação. Além disso, o uso de métodos assíncronos melhora a escalabilidade da API.
*/