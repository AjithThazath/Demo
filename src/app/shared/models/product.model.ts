/**
    @Authored By Ajith Thazath  
    Created for Demo project
**/

export class Product {
    private id: number;
    private title: string;
    private imageUrl: string;
    private description: string;
    private price: number;
    private quantity: number

    constructor(prod: any, host?: string) {
        this.id = prod.id;
        this.title = prod.title;
        if (host) {
            this.imageUrl = encodeURI(host + prod.imageUrl);
        } else {
            this.imageUrl = encodeURI(prod.imageUrl)
        }
        this.description = prod.description;
        this.price = prod.price;
        this.quantity = prod.quantity;
    }

    public getId() {
        return this.id;
    }

    public getTitle() {
        return this.title;
    }

    public getImageUrl() {
        return this.imageUrl;
    }

    public getDescription() {
        return this.description;
    }

    public getPrice() {
        return this.price;
    }

    public getQuantity() {
        return this.quantity;
    }

    public setQuantity(qty: number) {
        this.quantity = qty
    }
}