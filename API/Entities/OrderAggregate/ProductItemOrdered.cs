using System;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

[Owned]
public class ProductItemOrdered
{
    public int ProduvtId { get; set; }
    public required string Name { get; set; }
    public required string PictureUrl { get; set; }

}
/*
ProduvtId: Um inteiro que armazena o identificador único do produto. Vale notar que há um erro de digitação no nome da propriedade ("ProduvtId" deveria ser "ProductId").
Name: Uma string obrigatória (graças ao modificador required, disponível a partir do C# 11) que representa o nome do produto. O uso de required garante que essa propriedade deve ser definida ao criar uma instância da classe.
PictureUrl: Outra string obrigatória que armazena a URL da imagem do produto, permitindo exibir a foto correspondente em interfaces de usuário.

Essas propriedades tornam a classe adequada para transportar informações essenciais sobre produtos em pedidos,
facilitando a manipulação e exibição desses dados no sistema. 
O uso de propriedades automáticas simplifica o código e melhora a legibilidade.
*/