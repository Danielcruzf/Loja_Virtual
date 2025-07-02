using System;
using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        return user.Identity?.Name ?? throw new UnauthorizedAccessException();
    }
}
/*
O código define uma classe estática chamada ClaimsPrincipalExtensions dentro do namespace API.Extensions. O objetivo dessa classe é fornecer um método de extensão para o tipo ClaimsPrincipal, que representa o usuário autenticado em aplicações ASP.NET Core.

O método de extensão GetUsername permite obter o nome de usuário (username) associado ao ClaimsPrincipal. Ele faz isso acessando a propriedade Identity.Name do objeto user. Caso o usuário não esteja autenticado ou a propriedade Name seja nula, o método lança uma exceção UnauthorizedAccessException, indicando que o acesso não é autorizado.

Esse método facilita a obtenção do nome do usuário em diferentes partes da aplicação, tornando o código mais limpo e reutilizável. Além disso, ao lançar uma exceção quando o usuário não está autenticado, ele reforça a segurança e evita que operações sensíveis sejam realizadas sem a devida autorização.
*/