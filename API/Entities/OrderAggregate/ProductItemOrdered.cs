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