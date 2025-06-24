using System; // Importa o namespace System, que contém tipos fundamentais do .NET

namespace API.DTOs; // Define o namespace onde a classe está localizada

public class BasketDto // Declara a classe BasketDto, que representa um carrinho de compras (DTO)
{
    public required string BasketId { get; set; } // Propriedade obrigatória que armazena o ID do carrinho

    public List<BasketItemDto> Items { get; set; } = []; // Lista de itens do carrinho, inicializada como vazia

    public string? ClientSecret { get; set; } // Propriedade opcional para armazenar o segredo do cliente (ex: pagamento)

    public string? PaymentIntentId { get; set; } // Propriedade opcional para armazenar o ID da intenção de pagamento
}