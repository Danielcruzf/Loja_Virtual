using System;
using System.Xml.Linq;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticAssets;



namespace API.Extensions;

public static class ProductExtensons
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        query = orderBy switch
        {
            "price" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };
        return query;
    }
    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
    {
        if (string.IsNullOrEmpty(searchTerm)) return query;
        var lowerCaseSeachTerm = searchTerm.Trim().ToLower();
        return query.Where(x => x.Name.ToLower().Contains(lowerCaseSeachTerm));

    }
    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
    {
        var branList = new List<string>();
        var typesList = new List<string>();

        if (!string.IsNullOrEmpty(brands))
        {
            branList.AddRange([.. brands.ToLower().Split(",")]);
        }

        if (!string.IsNullOrEmpty(types))
        {
            branList.AddRange([.. types.ToLower().Split(",")]);
        }

        query = query.Where(x => branList.Count == 0 || branList.Contains(x.Brand.ToLower()));
        query = query.Where(x => typesList.Count == 0 || typesList.Contains(x.Brand.ToLower()));

        return query; 
        
    }
}