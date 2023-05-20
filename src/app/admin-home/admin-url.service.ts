/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ADMIN_PATH, ORDER_PATH } from '../shared/app.constant';
import { orderStatus } from '../shared/models/enums/orderSatus.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminUrlService {

  constructor(
    private sharedService: SharedService
  ) { }



  public getAddProductUrl() {
    return this.sharedService.getHost() + '/' + ADMIN_PATH + '/add-product';
  }
  public postEditProductUrl(id: number) {
    return this.sharedService.getHost() + '/' + ADMIN_PATH + '/edit-product/' + id;
  }

  public getAllOrdersForAdminURL(pageNo: number, limit: number) {
    return this.sharedService.getHost() + '/' + ADMIN_PATH + '/allorders?pageNo=' + pageNo + '&pageSize=' + limit;
  }

  public putUpdateOrderStatusAdminURL(id: number, status: orderStatus) {
    return this.sharedService.getHost() + '/' + ORDER_PATH + '/update/' + id + '/' + status;
  }

  public getAllProductURL(pageNo: number, limit: number) {
    return this.sharedService.getHost() + '/shop/products?page=' + pageNo + '&limit=' + limit;
  }

  public deleteProduct(id: number) {
    return this.sharedService.getHost() + '/' + ADMIN_PATH + '/delete-product/' + id
  }
}
