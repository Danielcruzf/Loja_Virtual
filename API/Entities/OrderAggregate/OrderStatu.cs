namespace API.Entities.OrderAggregate;

public enum OrderStatus
{
    Pending,
    PaymentReceived,
    PaymentFailed
}
/*
Esses valores ajudam a representar de forma clara e segura o estado de um pedido em um sistema,
evitando o uso de strings ou números mágicos espalhados pelo código. 
Assim, fica mais fácil implementar lógicas de negócio baseadas no status do pedido,
além de reduzir a chance de erros de digitação ou inconsistências.
*/