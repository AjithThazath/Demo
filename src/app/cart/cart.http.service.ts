/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import { CartUrlService } from './cart.URL.service';
import { HttpClient, HttpUserEvent } from '@angular/common/http';
import { updateQuantityOnServerBody } from './cart-items/Pojo/updateQuantityBody';

@Injectable({
  providedIn: 'root'
})
export class CartHttpService {

  constructor(
    private cartUrlService: CartUrlService,
    private http: HttpClient
  ) { }

  public getRemoveFromCart(id: number | undefined) {
    return this.http.delete(this.cartUrlService.getRemoveFromCart(id))
  }

  public placeOrder(body: { otp: number }) {
    return this.http.post<{ orderId: number }>(this.cartUrlService.placeOrderUrl(), body)
  }

  public updateQuantityOnServerUrl(body: updateQuantityOnServerBody | null) {
    return this.http.put(this.cartUrlService.updateQuantityOnServerUrl(), body)
  }

  public generateOTP() {
    return this.http.get<{ message: string }>(this.cartUrlService.generateOTPURL())
  }
}
