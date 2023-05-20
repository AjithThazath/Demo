/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component } from '@angular/core';
import { AccountHttpService } from '../account-http.service';
import { Order } from 'src/app/shared/models/order.model';
import { AlertService } from 'src/app/shared/alert.service';
import { orderStatus } from 'src/app/shared/models/enums/orderSatus.enum';
import { SharedService } from 'src/app/shared/shared.service';
import { ACTION_DENIED, CANCEL_ORDER_SUCCESS, CANNOT_BE_CANCELLED, CONFIRM_CANCEL_ORDER, CONFIRM_CANCEL_ORDER_DESC, CONFIRM_NO, CONFIRM_YES, INVOICE_DOWNLOAD_SUCCESS, PAGINATION_LIMIT } from '../../shared/app.constant';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  errorLog = 'ERROR:: MyOrdersComponent :'

  CANNOT_BE_CANCELLED: string[] = CANNOT_BE_CANCELLED;

  isLinear = true

  stepperOrientation = 'vertical'

  orders: Order[] = [];

  pageNo = 0;

  isMobileDevice = false

  possibleStatus: { status: string, value: string }[] = []

  constructor(
    private accountHttpService: AccountHttpService,
    private alertService: AlertService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getAllOrders()
    this.getPossibleStatusFromService();
    this.isMobileDevice = this.sharedService.isMobileDevice()
  }

  public getAllOrders() {
    this.accountHttpService.getAllOrders(this.pageNo, PAGINATION_LIMIT).subscribe((res: any) => {
      if (res.orders.length) {
        this.orders = []
        res.orders.forEach(order => {
          this.orders.push(new Order(order));
        })
      }
    },
      err => {
        console.error(this.errorLog, err)
        this.alertService.errorAlert(null, err.errorMessage)
      })
  }

  public getPossibleStatusFromService() {
    this.possibleStatus = this.sharedService.getPossibleStatus();
    this.possibleStatus = this.possibleStatus.filter(val => val.status != 'CANCELLED')
  }

  public getStatusValue(value: any) {
    return this.sharedService.getStatusValue(value);
  }

  public showStatus(order: Order, stepIndex: number): boolean {
    let index = this.possibleStatus.findIndex(val => val.status === order.getStatus());
    if (stepIndex <= index) {
      return true
    } else {
      return false
    }
  }

  public cancelOrder(order: Order) {
    if (!order) {
      return
    }
    this.alertService.showConfirmDialog(CONFIRM_CANCEL_ORDER,
      CONFIRM_CANCEL_ORDER_DESC, CONFIRM_YES, CONFIRM_NO)
      .then(val => {
        if (val.isConfirmed) {
          this.accountHttpService.deleteCancelOrder(order.getOrderId()).subscribe(res => {
            this.alertService.success(CANCEL_ORDER_SUCCESS, res.message);
            this.getAllOrders();
          },
            err => {
              console.error(this.errorLog, err)
              this.alertService.errorAlert(ACTION_DENIED, err.error.message);
            })
        }
      })
  }

  downloadInvoice(order: Order) {
    if (!order) {
      return
    }
    this.accountHttpService.downloadInvoice(order.getOrderId()).subscribe((x: any) => {
      var newBlob = new Blob([x], { type: "application/pdf" });

      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement("a");
      link.href = data;
      link.download = `Invoice#${order.getOrderId()}.pdf`;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window
        })
      );

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
      this.alertService.success(null, INVOICE_DOWNLOAD_SUCCESS);
    }, err => {
      console.error(this.errorLog, err)
      this.alertService.errorAlert(null, err.error.message);
    })
  }

  onScroll() {
    this.pageNo++;
    this.getAllOrders()
  }

}
