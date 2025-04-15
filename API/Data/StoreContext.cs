using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
//conexão(Herança)com banco de dados via class DbContext
public class StoreContext(DbContextOptions options) : DbContext(options)
{ //Tabela Produtos
    public required DbSet<Product> Products { get; set; }
}
