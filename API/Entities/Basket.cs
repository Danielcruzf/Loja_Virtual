using System;
using System.Linq;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public required string BasketId { get; set; }
        public List<BasketItem> Items { get; set; } = [];

        public void AddItem(Product product, int quantity)
        {
            if (product == null) throw new ArgumentNullException(nameof(product));
            if (quantity <= 0) throw new ArgumentException("Quantity deve ser maior que zero", nameof(quantity));

            var existingItem = FindItem(product.Id);
            if (existingItem == null)
            {
                Items.Add(new BasketItem
                {
                    ProductId = product.Id,
                    Product = product,
                    Quantity = quantity
                });
            }
            else
            {
                existingItem.Quantity += quantity; // Atualiza a quantidade do item já existente
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity deve ser maior que zero", nameof(quantity));
            var item = FindItem(productId);
            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity <= 0) Items.Remove(item);
        }

        private BasketItem? FindItem(int productId)
        {
            return Items.FirstOrDefault(item => item.ProductId == productId);
        }
    }
}