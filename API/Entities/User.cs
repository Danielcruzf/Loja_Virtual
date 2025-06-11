using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

public class User:IdentityUser
{
public int? AddressId { get; set; }
public Address? Address{ get; set; }
}