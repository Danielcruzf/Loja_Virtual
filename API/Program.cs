using API.Data;
using API.Middleware;
using Microsoft.AspNetCore.Connections;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. - Serviços

builder.Services.AddControllers();
//Serviço de conexão ao Banco de Dados
builder.Services.AddDbContext<StoreContext>(opt=>
{ opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));});
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.(Middleware)
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000"));

app.MapControllers();
DbInitializer.InitDb(app);

app.Run();
