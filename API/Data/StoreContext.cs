using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
//conexão(Herança)com banco de dados via class DbContext
public class StoreContext(DbContextOptions options) : DbContext(options)
{ //Tabela Produtos
    public required DbSet<Product> Products { get; set; }
    //Tabela Basket
    public required DbSet<Basket> Baskets { get; set; }
    //Tabela BasketItem
    public required DbSet<BasketItem> BasketItems { get; set; }

   /* protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
    */
    //Configuração do banco de dados
}
