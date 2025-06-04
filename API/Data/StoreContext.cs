using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

// Conexão (herança) com banco de dados via classe DbContext
public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    // Tabela Produtos
    public required DbSet<Product> Products { get; set; }
    // Tabela Basket
    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id = "bf9c8b73-dd18-44d7-b8a9-12912d3a9456", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Id = "b5eb70ef-a1b9-4a09-a83d-440b27bc8101", Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}