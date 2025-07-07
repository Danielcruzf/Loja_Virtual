using System;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers;

public class PaymentsController(PaymentsService paymentsService,
StoreContext context, IConfiguration config, ILogger<PaymentsController>logger)
 : BaseApiController
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

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        try
        {
            var stripeEvent = ConstructStripeEvent(json);

            if (stripeEvent.Data.Object is not PaymentIntent intent)
            {
                return BadRequest("Invalid event data");
            }

            if (intent.Status == "succeeded") await HandlePaymentIntentSucceeded(intent);

            else await HandlePaymentIntentFailed(intent);

            return Ok();


        }
        catch (StripeException ex)
        {
            logger.LogError(ex, "Stripe Webhoook error");
            return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "an Unexpected error has occurred");
            return StatusCode(StatusCodes.Status500InternalServerError, "Unexpected error");
        }
    }

    private async Task HandlePaymentIntentFailed(PaymentIntent intent)
    {
        throw new NotImplementedException();
    }

    private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
    {
        throw new NotImplementedException();
    }

    private Event ConstructStripeEvent(string json)
    {
        try
        {
            return EventUtility.ConstructEvent(json,
            Request.Headers["Stripe-Signature"],config["StripeSettings:WhSecret"]);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to construct stripe event");
            throw new StripeException("Inavalid singnature");
        }
    }

}

