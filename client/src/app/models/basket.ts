import { Product } from "./product";

export type Basket =
    {
        basketId: string
        items: Item[]
        clientSecret?: string
        paymentIntentId?: string
        
    }
export class Item 
{
    constructor(product: Product, quantity: number) 
    {
        this.productId = String(product.id);// Convertendo o ID do produto para string
        this.name = product.name;// Atribuindo o nome do produto
        this.price = product.price;// Atribuindo o preço do produto
        this.pictureUrl = product.pictureUrl;// Atribuindo a URL da imagem do produto
        this.brand = product.brand;// Atribuindo a marca do produto
        this.type = product.type;// Atribuindo o tipo do produto
        this.quantity = quantity;// Atribuindo a quantidade do produto
    }
    productId: string;
    name: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;

}