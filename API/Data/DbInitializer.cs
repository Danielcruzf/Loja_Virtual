using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Failed to retrieve Store Context");

        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Failed to retrieve user manager");

        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>()
            ?? throw new InvalidOperationException("Failed to retrieve role manager");

        await SeedData(context, userManager, roleManager);
    }

    private static async Task SeedData(StoreContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        try
        {
            context.Database.Migrate();
        }
        catch (Microsoft.Data.SqlClient.SqlException ex) when (ex.Number == 4060) // Cannot open database requested by the login. The login failed.
        {
            // Tenta criar o banco de dados manualmente
            var databaseName = context.Database.GetDbConnection().Database;
            var connectionString = context.Database.GetDbConnection().ConnectionString.Replace($"Database={databaseName}", "Database=master");
            using (var masterConnection = new Microsoft.Data.SqlClient.SqlConnection(connectionString))
            {
                masterConnection.Open();
                using (var command = masterConnection.CreateCommand())
                {
                    command.CommandText = $"CREATE DATABASE [{databaseName}]";
                    command.ExecuteNonQuery();
                }
            }
            // Tenta migrar novamente
            context.Database.Migrate();
        }

        var roles = new[] { "Member", "Admin" };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "bob@test.com",
                Email = "bob@test.com"
            };

            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");

            var admin = new User
            {
                UserName = "admin@test.com",
                Email = "admin@test.com"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin,[ "Member", "Admin" ]);
            
        }

        if (context.Products.Any()) return; // Verifica se já existem produtos no banco de dados

        {
            var products = new List<Product>
            {
                new Product
                {
                    Name = "Angular Speedster Board 2000",
                    Description =
             "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Angular Board 3000",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 15000,
                    PictureUrl = "/images/products/sb-ang2.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Board Speed Rush 3",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/sb-core1.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Net Core Super Board",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-core2.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "React Board Super Whizzy Fast",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "React",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Typescript Entry Board",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12000,
                    PictureUrl = "/images/products/sb-ts1.png",
                    Brand = "TypeScript",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Blue Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/hat-core1.png",
                    Brand = "NetCore",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green React Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureUrl = "/images/products/hat-react1.png",
                    Brand = "React",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Purple React Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/hat-react2.png",
                    Brand = "React",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Blue Code Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    PictureUrl = "/images/products/glove-code1.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Code Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/glove-code2.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Purple React Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureUrl = "/images/products/glove-react1.png",
                    Brand = "React",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green React Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureUrl = "/images/products/glove-react2.png",
                    Brand = "React",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Redis Red Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureUrl = "/images/products/boot-redis1.png",
                    Brand = "Redis",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Red Boots",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureUrl = "/images/products/boot-core2.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Purple Boots",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 19999,
                    PictureUrl = "/images/products/boot-core1.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Angular Purple Boots",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    PictureUrl = "/images/products/boot-ang2.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Angular Blue Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/boot-ang1.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },

            };
            context.Products.AddRange(products);
            context.SaveChanges();
        }

    }
}
