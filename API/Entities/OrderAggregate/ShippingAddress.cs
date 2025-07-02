using System;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

[Owned]

public class ShippingAddress
{
    public required string Name { get; set; }
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }

    [JsonPropertyName("postal_code")]//Ajuste do formato do codigo postal
    public required string PostalCode { get; set; }
    public required string Country { get; set; }

}
/*
Esse trecho define as propriedades de uma classe que representa um endereço de entrega (ShippingAddress). 
Cada propriedade corresponde a uma parte do endereço e utiliza propriedades automáticas para facilitar o 
acesso e a modificação dos valores.

Name: String obrigatória que armazena o nome do destinatário.
Line1: String obrigatória para o endereço principal (rua, número, etc.).
Line2: String opcional (pode ser nula), geralmente usada para informações adicionais, como complemento ou apartamento.
City: String obrigatória para a cidade.
State: String obrigatória para o estado.
PostalCode: String obrigatória para o código postal. O atributo [JsonPropertyName("postal_code")] indica que, ao serializar ou desserializar para JSON, essa propriedade será representada como "postal_code", seguindo um padrão comum em APIs.
Country: String obrigatória para o país.

*/