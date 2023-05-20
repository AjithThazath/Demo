/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CONFIRM_NO, CONFIRM_YES, QTY, REMOVE_CART_DIALOG_TITLE, REMOVE_FROM_CART_TOOLTIP } from 'src/app/shared/app.constant';
import { Product } from 'src/app/shared/models/product.model';
import { SharedService } from 'src/app/shared/shared.service';
import { CartHttpService } from '../cart.http.service';
import { AlertService } from 'src/app/shared/alert.service';
import { updateQuantityOnServerBody } from './Pojo/updateQuantityBody';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent {

  REMOVE_FROM_CART_TOOLTIP = REMOVE_FROM_CART_TOOLTIP
  total = 0;
  qty: number[] = []
  item: Product | null = null
  @Input() set items(val: Product | null) {
    if (val) {
      // this.item = new Product(val,this.sharedService.getHost());
      this.item = val
      this.calcTotal()
    }
  }

  @Input() isEdit: boolean = true

  @Output() itemChange = new EventEmitter()

  errorLog = 'ERROR:: CartItemsComponent :';

  constructor(
    private sharedService: SharedService,
    private cartHttpService: CartHttpService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.qty = QTY;
  }

  qtyChange(event: any) {
    this.updateQuantityOnServer(event.value)
    // this.item?.setQuantity(event.value);
    // this.calcTotal();
  }

  private calcTotal() {
    this.total = this.item ? this.item.getPrice() * this.item.getQuantity() : 0;
  }

  public removeFromCart() {
    let title = REMOVE_CART_DIALOG_TITLE

    this.alertService.showConfirmDialog(title, '', CONFIRM_YES, CONFIRM_NO).then(val => {
      if (val.isConfirmed) {
        this.sharedService.showLoader.next(true)
        this.cartHttpService.getRemoveFromCart(this.item?.getId()).subscribe(res => {
          this.itemChange.emit(this.item);
          this.sharedService.showLoader.next(false)
        }, err => {
          console.error(this.errorLog, err)
          this.alertService.errorAlert(err.error.errorMessage, err.error.errorMessage);
        })
      }
    })
  }

  public updateQuantityOnServer(value: number) {
    this.sharedService.showLoader.next(true)
    this.cartHttpService.updateQuantityOnServerUrl(new updateQuantityOnServerBody(this.item?.getId(), value)).subscribe(val => {
      this.item?.setQuantity(value);
      this.calcTotal();
      this.sharedService.showLoader.next(false)
    }, err => {
      console.error(this.errorLog, err)
      this.sharedService.showLoader.next(false)
      this.alertService.errorAlert(err.error.errorMessage, err.error.errorMessage);
    })
  }
}
