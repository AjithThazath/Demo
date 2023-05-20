/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { addToCart } from './POJO';
import { CART_API_PATH } from '../shared/app.constant';
@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  public getProductByIdUrl(id: number) {
    return this.shared.getHost() + '/shop/product/' + id;
  }

  public getAddToCartUrl() {
    return this.shared.getHost() + CART_API_PATH +'addToCart';
  }

  public getProductById(id: number) {
    return this.http.get(this.getProductByIdUrl(id))
  }

  public addToCart(payload: addToCart) {
    return this.http.post(this.getAddToCartUrl(), payload);
  }
}
