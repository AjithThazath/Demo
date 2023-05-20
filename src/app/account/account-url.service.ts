/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AccountUrlService {

  userPath = '/user/';
  orderPath = '/order'

  constructor(
    private sharedService: SharedService
  ) { }

  public getUpdateUserURL(): string {
    return this.sharedService.getHost() + this.userPath + 'update/userdetails'
  }

  public getAllOrdersUrl(pageNo: number, pageSize: number): string {
    return this.sharedService.getHost() + this.orderPath + '?pageNo=' + pageNo + '&pageSize=' + pageSize;
  }

  public getOrderPossibleStatus(): string {
    return this.sharedService.getHost() + this.orderPath;
  }

  public downlaodInvoiceUrl(id: number) {
    return this.sharedService.getHost() + this.orderPath + '/generateInvoice/' + id;
  }

  public deleteCancelOrderURL(id: number) {
    return this.sharedService.getHost() + this.orderPath + '/cancel/' + id;
  }

}
