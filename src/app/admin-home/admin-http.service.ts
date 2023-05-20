/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUrlService } from './admin-url.service';
import { Product } from '../shared/models/product.model';
import { Order } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminHttpService {

  constructor(
    private http: HttpClient,
    private adminUrlService: AdminUrlService,
  ) { }



  public getAllProducts(pageNo: number, limit: number) {
    return this.http.get(this.adminUrlService.getAllProductURL(pageNo, limit))
  }

  public addProduct(payload: FormData) {
    return this.http.post<Product>(this.adminUrlService.getAddProductUrl(), payload)
  }

  public getAllOrders(pageNo: number, limit: number) {
    return this.http.get(this.adminUrlService.getAllOrdersForAdminURL(pageNo, limit))
  }

  public putUpdateOrderStatusAdmin(id, status) {
    return this.http.put(this.adminUrlService.putUpdateOrderStatusAdminURL(id, status), null)
  }

  public deleteProduct(id: number) {
    return this.http.delete(this.adminUrlService.deleteProduct(id))
  }

  public editProduct(payload: Product, id: number) {
    return this.http.post<Product>(this.adminUrlService.postEditProductUrl(id), payload)
  }

}
