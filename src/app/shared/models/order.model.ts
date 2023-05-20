/**
    @Authored By Ajith Thazath  
    Created for Demo project
**/
import { orderStatus } from "./enums/orderSatus.enum";
import { Product } from "./product.model";
import { DEFAULT_HOST } from '../app.constant'

export class Order {
    private orderId: number;
    private products: Product[] = []
    private orderDate: Date;
    private totalAmount: number
    private status: orderStatus
    private user: string | null = null
    constructor(data: any) {
        this.orderId = data.id;
        this.orderDate = new Date(data.orderDate);
        this.totalAmount = data.totalAmount;
        this.status = data.status
        this.user = data.userid;
        this.createProducts(data.products);
    }

    public getOrderId() {
        return this.orderId;
    }
    public getProducts() {
        return this.products;
    }
    public getorderDate() {
        return this.orderDate;
    }
    public getTotalAmount() {
        return this.totalAmount;
    }

    public getStatus() {
        return this.status.toString();
    }

    public setStatus(status: orderStatus) {
        this.status = status
    }

    public getUser() {
        return this.user;
    }

    public setUser(userId: string) {
        this.user = userId
    }

    createProducts(products: any[]) {
        products.forEach(prod => {
            this.products.push(new Product(prod, DEFAULT_HOST))
        })
    }

}