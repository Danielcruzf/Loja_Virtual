using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")] //https://localhost:5001/api/Product
    [ApiController]
    public class ProductController(StoreContext context) : ControllerBase //CRUD
    {
        [HttpGet]

        public ActionResult<List<Product>> GetProduct()// retorna os produtos 
        { // verifica o banco de dados
            return context.Products.ToList();
        }

        [HttpGet ("{id}")]
        public ActionResult<Product>GetProduct(int id)// retorna os produtos pelo id
        {    //verifica os produtos 
            var product = context.Products.Find(id);
           //verifica se o PRODUTO É NULL caso seja retona NotFoud na tela
            if(product== null) return NotFound(); 
            return product;
        }
    }
}
