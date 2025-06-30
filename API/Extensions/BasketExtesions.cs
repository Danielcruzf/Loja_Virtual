using API.Entities;
using API.DTOs;
using Microsoft.EntityFrameworkCore;


namespace API.Extensions
{

    public static class BasketExtesions
    {
        public static BasketDto ToDto(this Basket basket)
        {
            return new BasketDto
            {
                BasketId = basket.BasketId,
                ClientSecret = basket.ClientSecret,// O ClientSecret é utilizado para autenticar e autorizar operações de pagamento, geralmente fornecido por um provedor de pagamentos como Stripe.
                PaymentIntentId = basket.PaymentIntentId,// O PaymentIntentId representa o identificador único da intenção de pagamento, também fornecido pelo provedor de pagamentos, permitindo rastrear e gerenciar o status do pagamento.
                Items = basket.Items.Select(x => new BasketItemDto
                {
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Price = x.Product.Price,
                    Brand = x.Product.Brand,
                    Type = x.Product.Type,
                    PictureUrl = x.Product.PictureUrl,
                    Quantity = x.Quantity
                }).ToList(),
            };
        }

        public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket> query, string? basketId)
        {

            return await query
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.BasketId == basketId) ?? throw new Exception("Cannot get basket");
        }
    }
}


/*
Este método de extensão assíncrono, chamado GetBasketWithItems, 
é utilizado para buscar um objeto do tipo Basket (cesta) a partir de uma consulta (IQueryable<Basket>) 
no Entity Framework. Ele recebe como parâmetro o identificador da cesta (basketId) 
e retorna a cesta correspondente, incluindo seus itens e os produtos relacionados a cada item.

*/