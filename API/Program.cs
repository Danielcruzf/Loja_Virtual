using System.Configuration;
using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. - Serviços

builder.Services.AddControllers();

//Serviço de conexão ao Banco de Dados
builder.Services.AddDbContext<StoreContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddCors();// Configuração de CORS para permitir requisições de origens específicas
builder.Services.AddTransient<ExceptionMiddleware>();// Middleware para tratamento de exceções
builder.Services.AddScoped<PaymentsService>();// Serviço de pagamentos

// Configuração de endpoints de identidade 
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<StoreContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.(Middleware)
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000"));

app.UseAuthentication();//validação de usuário
app.UseAuthorization();//validação de autorização

app.MapControllers();

app.MapGroup("api").MapIdentityApi<User>();// MapIdentityApi<User> é um método de extensão que mapeia os endpoints de identidade para a API, permitindo operações como registro, login e gerenciamento de usuários.


await DbInitializer.InitDb(app);// Inicialização do banco de dados

app.Run();
