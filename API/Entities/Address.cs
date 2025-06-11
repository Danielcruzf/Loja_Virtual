using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Address
{
    [JsonIgnore]//ignora a propriedade Id durante a serialização JSON
    //Isso é útil quando você não deseja expor o ID do endereço em respostas JSON, por exemplo, ao retornar informações de um usuário.
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }

    [JsonPropertyName("postal_code")]//Ajuste do formato do codigo postal
    public required string PostalCode { get; set; }
    public required string Country { get; set; }

}