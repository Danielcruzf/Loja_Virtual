using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggregate
{
    public class OrderItem
    {
        public int Id { get; set; }
        public required ProductItemOrdered ItemOrdered { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}
/*

A classe OrderItem representa um item individual dentro de um pedido, geralmente utilizada em sistemas de e-commerce ou gestão de pedidos. Ela possui quatro propriedades principais:

Id: Um identificador único do tipo inteiro para cada item do pedido. Isso facilita a referência e manipulação de itens específicos em bancos de dados ou coleções.
ItemOrdered: Uma propriedade obrigatória (indicada pelo modificador required) do tipo ProductItemOrdered, que provavelmente contém informações detalhadas sobre o produto associado a este item do pedido, como nome, descrição ou código do produto.
Price: Um valor do tipo long que representa o preço do item. O uso de long pode indicar que o sistema trabalha com valores monetários em centavos para evitar problemas de precisão com tipos de ponto flutuante.
Quantity: Um inteiro que indica a quantidade deste produto incluída no pedido.

*/