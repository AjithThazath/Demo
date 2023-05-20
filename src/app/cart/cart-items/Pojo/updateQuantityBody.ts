/**
    @Authored By Ajith Thazath  
    Created for Demo project
**/
export class updateQuantityOnServerBody {
    private productId: number | undefined;
    private quantity: number

    constructor(productId: number | undefined, quantity: number) {
        this.productId = productId;
        this.quantity = quantity;
    }
}