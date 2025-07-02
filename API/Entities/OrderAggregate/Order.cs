using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggregate;

public class Order
{
    public int Id { get; set; }
    public required string BuyerEmail { get; set; }
    public required ShippingAddress ShippingAddress { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public List<OrderItem> OrderItems { get; set; } = [];
    public long Subtotal { get; set; }
    public long DeliveryFee { get; set; }
    public long Discount { get; set; }
    public string? PaymentIntentId { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public required PaymentSummary PaymentSummary { get; set; }


    public long GetTotal()
    {
        return Subtotal + DeliveryFee - Discount;
    }
}
/*
Propriedades (os dados do pedido)

Id: Um número único para identificar cada pedido.
BuyerEmail: O e-mail de quem fez o pedido.
ShippingAddress: O endereço para onde o pedido será enviado (é de outro tipo chamado ShippingAddress).
OrderDate: A data e hora em que o pedido foi feito. Por padrão, pega o momento atual.
OrderItems: Uma lista com todos os itens que fazem parte do pedido (cada item é do tipo OrderItem).
Subtotal: O valor total dos produtos, sem contar frete ou desconto.
DeliveryFee: O valor do frete.
Discount: O valor de desconto aplicado ao pedido.
PaymentIntentId: Um identificador relacionado ao pagamento (pode ser nulo, ou seja, pode não ter valor).
OrderStatus: O status do pedido (por exemplo: pendente, pago, enviado, etc). Começa como "Pending" (pendente).
PaymentSummary: Um resumo do pagamento (de outro tipo chamado PaymentSummary).

Resumindo
Esse arquivo define como um pedido é representado no seu sistema.
Ele guarda todas as informações importantes de um pedido.
Tem um método para calcular o valor total do pedido.
Ajuda a manter o código organizado e fácil de entender.

*/