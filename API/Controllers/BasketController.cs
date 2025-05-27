using System;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Entities;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controller;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<API.DTOs.BasketDto>> GetBasket() {
        var basket = await RetrieveBasket();

        if (basket == null) return NotFound();
        return new API.DTOs.BasketDto
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(item => new API.DTOs.BasketItemDto
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                Brand = item.Product.Brand,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Quantity = item.Quantity
            }).ToList()

        };
    }
    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        basket ??= CreateBasket();
        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Problem adding item to basket");
        basket.AddItem(product, quantity);
        var result = await context.SaveChangesAsync() > 0;
        if (result) return CreatedAtAction(nameof(GetBasket), basket);

        return BadRequest("Problem updating basket");
    }


    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
       var basket = await RetrieveBasket();
        return Ok();

    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30),
        };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }
    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }
}
   

