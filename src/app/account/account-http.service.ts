/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AccountUrlService } from './account-url.service';
import { AlertService } from '../shared/alert.service';
import { Order } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(
    private http: HttpClient,
    private urlService: AccountUrlService,
    private alertService: AlertService
  ) { }

  public putUpdateUserDetails(body: User) {
    return this.http.put<User>(this.urlService.getUpdateUserURL(), body)
  }

  public getAllOrders(pageNo: number, pageSize: number) {
    return this.http.get<Order[]>(this.urlService.getAllOrdersUrl(pageNo, pageSize))
  }

  public deleteCancelOrder(id: number) {
    return this.http.delete<{ message: string }>(this.urlService.deleteCancelOrderURL(id));
  }

  public downloadInvoice(id: number) {
    return this.http.get(this.urlService.downlaodInvoiceUrl(id), {
      headers: {
        "Accept": "application/pdf"
      },
      responseType: "blob"
    })
  }

}
