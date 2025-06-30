using System;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentsController(PaymentsService paymentsService, StoreContext context) : BaseApiController
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()

    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);// buscando a cesta

        if (basket == null) return BadRequest("Basket not found");// verificando se o item é nulo dentro do DataBase

        var intent = await paymentsService.CreateOrUpdatePaymentIntent(basket);// intenção de pagamento

        if (intent == null) return BadRequest("Problem creating payment intent");

        basket.PaymentIntentId ??= intent.Id;//verifica se basket.PaymentIntentId é nulo; caso seja, ele atribui o valor de intent.Id a essa propriedade. Se PaymentIntentId já possuir um valor (ou seja, não for nulo), nada é alterado.
        basket.ClientSecret ??= intent.ClientSecret;

        if (context.ChangeTracker.HasChanges())
        {
            var result = await context.SaveChangesAsync() > 0;

            if (result) return BadRequest("Problem updating basket with payment intent");

        }

        


        return Ok(basket.ToDto());

    }
}

