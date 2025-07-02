using System;
using API.Entities;
using API.Entities.OrderAggregate;
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
    public required DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
    }
}