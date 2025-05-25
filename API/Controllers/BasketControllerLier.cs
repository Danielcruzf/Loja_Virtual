using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NoContent();
            return basket.ToDto();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            var basketToUse = basket ?? CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest("Problem adding item to basket");
            basketToUse.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

            return BadRequest("Problem updating basket");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // Implemente a lógica de remoção conforme necessário
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
            _context.Baskets.Add(basket);
            return basket;
        }

        private async Task<Basket?> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
        }
    }

    // Defina os DTOs abaixo, se ainda não existirem:
    public class BasketDto
    {
        public string BasketId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }

    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string PictureUrl { get; set; }
        public int Quantity { get; set; }
    }
}