var builder = WebApplication.CreateBuilder(args);

// Add services to the container. - Serviços

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.(Middleware)
app.MapControllers();

app.Run();
