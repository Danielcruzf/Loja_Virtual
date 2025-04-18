using System;
using API.Entities;
using Humanizer;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
   
public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new  InvalidOperationException("Failed to retrieve Store Context");
        

        SeedData(context);



    }

    private static void SeedData(StoreContext context)
    {
        context.Database.Migrate();
        if ( context.Products.Any()) return; // Verifica se já existem produtos no banco de dados

        {
            var products = new List<Product>
                {
                   new Product
                   {
                    Name="Angular Red T-Shirt",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    Price = 2000,
                    PictureUrl="/imagens/products/tshirt-ang.png",
                    Brand ="Angular",
                    Type = "T-Shirt",
                    QuantityInStock=100
                   },
                  };

            context.Products.AddRange(products);
            context.SaveChanges();


        }
    }
}
