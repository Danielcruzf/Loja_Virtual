using API.Data;
using Microsoft.AspNetCore.Connections;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. - Serviços

builder.Services.AddControllers();
//Serviço de conexão ao Banco de Dados
builder.Services.AddDbContext<StoreContext>(opt=>
{ opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));});
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.(Middleware)
app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000"));

app.MapControllers();
DbInitializer.InitDb(app);

app.Run();
