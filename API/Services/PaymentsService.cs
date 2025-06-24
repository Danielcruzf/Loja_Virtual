using System;
using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentsService(IConfiguration config)
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)// Método para criar ou atualizar uma intenção de pagamento
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
        var service = new PaymentIntentService();   // Serviço para gerenciar intenções de pagamento
        var intent = new PaymentIntent();// Inicializa um novo objeto PaymentIntent
        var subtotal = basket.Items.Sum(x => x.Quantity * x.Product.Price);// Calcula o subtotal do carrinho multiplicando a quantidade pelo preço de cada produto
        var deliveryFree = subtotal > 1000 ? 0 : 500;//taxa de entrega

        if (string.IsNullOrEmpty(basket.PaymentIntentId))// Verifica se o PaymentIntentId está vazio ou nulo
        {
            var opitions = new PaymentIntentCreateOptions
            {
                Amount = (long)(subtotal + deliveryFree),
                Currency = "brl",
                PaymentMethodTypes = new List<string> { "card" },

            };
            intent = await service.CreateAsync(opitions);

        }
        else// Se já existir um PaymentIntentId, atualiza a intenção de pagamento existente
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


/*
Este código define a classe PaymentsService, responsável por gerenciar operações de pagamento utilizando a API do Stripe. O construtor da classe recebe uma instância de IConfiguration, que é usada para acessar configurações sensíveis, como a chave secreta do Stripe.

O método principal, CreateOrUpdatePaymentIntent, recebe um objeto Basket (carrinho de compras) como parâmetro. Ele começa configurando a chave da API do Stripe e criando uma instância do serviço de intenções de pagamento (PaymentIntentService). Em seguida, calcula o subtotal do carrinho somando o preço multiplicado pela quantidade de cada item. Se o subtotal for maior que 1000, a entrega é gratuita; caso contrário, é cobrada uma taxa de entrega de 500.

Se o carrinho ainda não possui um PaymentIntentId, o método cria uma nova intenção de pagamento com o valor calculado, define a moeda como real brasileiro ("brl") e permite apenas pagamentos com cartão. Caso já exista um PaymentIntentId, ele atualiza a intenção de pagamento existente com o novo valor. Por fim, o método retorna o objeto PaymentIntent, que representa a sessão de pagamento no Stripe.

*/