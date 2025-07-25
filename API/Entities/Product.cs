using System;

namespace API.Entities;

public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; } = "";
    public required string Description { get; set; }
    public long Price { get; set; }//sem modificador de acesso 'requerid' que ira preencher o valor com 0
    public required string PictureUrl { get; set; }
    public required string Type { get; set; }
    public required string Brand { get; set; }
    public int QuantityInStock { get; set; }//sem modificador de acesso 'requerid' que ira preencher o valor com 0
    public string? publicId { get; set; }
}
