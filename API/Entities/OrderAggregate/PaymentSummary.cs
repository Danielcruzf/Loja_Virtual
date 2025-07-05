using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace API.Entities.OrderAggregate;

[Owned]
public class PaymentSummary
{
    public int Last4 { get; set; }
    public required string Brand { get; set; }
    
    [JsonPropertyName("exp_month")]
    public int ExpMonth { get; set; }

    [JsonPropertyName("exp_year")]
    public int ExpYear { get; set; }
}
/*
Last4: Um inteiro que provavelmente armazena os últimos 4 dígitos do cartão de crédito utilizado na transação. Isso é comum para exibir informações de cartão de forma segura, sem mostrar o número completo.
Brand: Uma string obrigatória (usando o modificador required, disponível a partir do C# 11) que indica a bandeira do cartão, como Visa, MasterCard, etc. O uso de required força que essa propriedade seja definida na criação do objeto.
ExpMonth: Um inteiro que representa o mês de expiração do cartão.
ExpYear: Um inteiro que representa o ano de expiração do cartão.

Essas propriedades facilitam o armazenamento e a manipulação dos dados essenciais de 
um cartão de crédito, garantindo que informações sensíveis sejam tratadas de forma 
segura e clara no sistema. O uso de propriedades automáticas também torna o código mais 
limpo e fácil de manter.
*/