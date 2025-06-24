using System;
using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentsService(IConfiguration config)
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
        var service = new PaymentIntentService();
        var intent = new PaymentIntent();
        var subtotal = basket.Items.Sum(x => x.Quantity * x.Product.Price);
        var deliveryFree = subtotal > 1000 ? 0 : 500;//taxa de entrega

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var opitions = new PaymentIntentCreateOptions
            {
                Amount = (long)(subtotal + deliveryFree),
                Currency = "brl",
                PaymentMethodTypes = new List<string> { "card" },

            };
            intent = await service.CreateAsync(opitions);

        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = subtotal + deliveryFree,

            };
            await service.UpdateAsync(basket.PaymentIntentId, options);
        }
        return intent;
        
    }

}


//configuração do serviço de pagamentos - Implementação de métodos relacionados a pagamentos, como processar transações, verificar status de pagamento, etc.