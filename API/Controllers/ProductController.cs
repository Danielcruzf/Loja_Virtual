using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   
    public class ProductController(StoreContext context) : BaseApiController //CRUD
    {
        [HttpGet]

        public async Task< ActionResult<List<Product>>> GetProduct()// retorna os produtos 
        { // verifica o banco de dados
            return await context.Products.ToListAsync();
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)// retorna os produtos pelo id
        {    //verifica os produtos 
            var product = await context.Products.FindAsync(id);
           //verifica se o PRODUTO É NULL caso seja retona NotFoud na tela
            if(product== null) return NotFound(); 
            return product;
        }
    }
}
