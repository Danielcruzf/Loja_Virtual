import { Product } from "./product";

export type Basket =
    {
        basketId: string;
        items: Item[];
    }
export class Item 
{
    constructor(product: Product, quantity: number) 
    {
        this.productId = String(product.id);
        this.name = product.name;
        this.price = product.price;
        this.pictureUrl = product.pictureUrl;
        this.brand = product.brand;
        this.type = product.type;
        this.quantity = quantity; // Use the parameter, not product.quantity
    }
    productId: string;
    name: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;

}