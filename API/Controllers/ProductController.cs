using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Http.Features;

namespace API.Controllers
{

    public class ProductController(StoreContext context) : BaseApiController //CRUD
    {
        [HttpGet]

        public async Task<ActionResult<List<Product>>> GetProduct([FromQuery] ProductParams productParams)// retorna os produtos 
        { // verifica o banco de dados
            var query = context.Products

                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.Metadata);

            return products;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)// retorna os produtos pelo id
        {    //verifica os produtos 
            var product = await context.Products.FindAsync(id);
            //verifica se o PRODUTO É NULL caso seja retona NotFoud na tela
            if (product == null) return NotFound();

            return product;
        }
        [HttpGet("filters")] 
        public async Task<ActionResult<object>> GetFilters()
        {
            var brands = await context.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
