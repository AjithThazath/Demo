/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component, ComponentFactoryResolver, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Cart } from '../shared/models/cart.model';
import { CartHttpService } from './cart.http.service';
import { AlertService } from '../shared/alert.service';
import { CONFIRM_ADDRESS, ORDER_SUCCESS } from '../shared/app.constant';
import { Router } from '@angular/router';
import { OtpAndAddressConfirmationComponent } from './otp-and-address-confirmation/otp-and-address-confirmation.component'
import { takeUntil, Subject } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @ViewChild('viewContainer', { static: false }) _viewRef
  unSubscribe = new Subject<boolean>()

  cartItems: Cart | null = null;
  cartCount = 0;
  total = 0;
  validateOTP = false

  constructor(
    private sharedService: SharedService,
    private cartHttpService: CartHttpService,
    private alertService: AlertService,
    private route: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.sharedService.cartEmit.pipe(takeUntil(this.unSubscribe)).subscribe((cart: Cart) => {
      this.cartItems = cart
      this.calculateCart()
    })
    this.calculateCart()
  }

  public refreshCart() {
    this.sharedService.getCartForUser();
  }

  public calculateCart() {
    this.cartItems = this.sharedService.getCart();
    this.cartCount = this.cartItems.getCartCount();
    this.total = this.cartItems.getTotal();
  }

  showConfirm() {
    this.route.navigateByUrl('/confirm-order')
    // this._viewRef.clear();
    // const componentFactory =  this.componentFactoryResolver.resolveComponentFactory(OtpAndAddressConfirmationComponent);
    // this._viewRef.createComponent(componentFactory)
  }

  closeOrder() {
    this.validateOTP = false
  }

  ngOnDestroy() {
    this.unSubscribe.next(true);
  }

}
