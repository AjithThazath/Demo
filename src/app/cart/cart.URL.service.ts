/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { CART_API_PATH, ORDER_API_PATH, ORDER_PATH } from '../shared/app.constant';

@Injectable({
  providedIn: 'root'
})
export class CartUrlService {


  constructor(
    private sharedService: SharedService
  ) { }

  public getRemoveFromCart(id: number | undefined) {
    return this.sharedService.getHost() + CART_API_PATH + 'remove/' + id;
  }

  public placeOrderUrl() {
    return this.sharedService.getHost() + ORDER_API_PATH + 'placeOrder'
  }

  public updateQuantityOnServerUrl() {
    return this.sharedService.getHost() + CART_API_PATH + 'changeQuantity'
  }

  public generateOTPURL() {
    return this.sharedService.getHost() + '/' + ORDER_PATH + '/generateOTP'
  }

}
