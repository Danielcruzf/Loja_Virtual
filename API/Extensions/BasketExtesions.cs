using System;
using System.Linq;
using API.Controllers;
using API.Entities;
using API.DTOs;

namespace API.Extensions 
{
    public static class BasketExtesions
    {
        public static BasketDto ToDto(this Basket basket)
        {
            return new BasketDto
            {
                BasketId = basket.BasketId,
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
    }
}