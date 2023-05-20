/**
    @Authored By Ajith Thazath  
    Created for Demo project
**/
import { DEFAULT_HOST } from "../app.constant";
import { Product } from "./product.model";

export class Cart {
    private total: number;
    private items: Product[] = []


    constructor(data: any) {
        this.total = data.total;
        this.createProducts(data?.items);
    }

    public addToCart(product: Product) {
        this.items.push(product);
        this.total = this.total + product.getPrice();
    }

    public removeFromCart(prod: Product) {
        let index = this.items.findIndex(item => item.getId() === prod.getId());
        this.items.splice(index, 1);
        this.total = this.total - prod.getPrice();
    }

    public getTotal() {
        return this.total;
    }

    public getItems() {
        return this.items;
    }

    public getCartCount() {
        return this.items.length
    }

    private createProducts(products: any[]) {
        if (products) {
            products.forEach(prod => {
                this.items.push(new Product(prod, DEFAULT_HOST))
            })
        }
    }

}