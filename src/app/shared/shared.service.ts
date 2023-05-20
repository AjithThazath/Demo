/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Product } from './models/product.model';
import { Cart } from './models/cart.model';
import { AlertService } from './alert.service';
import { DEFAULT_HOST, ADD_PRODUCT, REMOVE_PRODUCT, ORDER_PATH } from './app.constant';
import { HttpClient } from '@angular/common/http';
import { Sex, User } from './models/user.model';
import { orderStatus } from './models/enums/orderSatus.enum';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  errorLog = 'ERROR:: SharedService : '

  public showLoader = new Subject<boolean>()

  public showLogin = new Subject<boolean>();

  private cart = new Cart({})

  private user: User | null = null;

  public userSubject = new BehaviorSubject<User>(this.user)

  public cartEmit = new Subject<Cart>();

  private possibleStatus: { status: string, value: string }[] = []

  public possibleStatusSubject = new BehaviorSubject<any>({});

  private mobileDefaultWidth = 750

  private tabletMaxWidth = 1000;

  private desktopMaxWidth = 1280;


  constructor(
    private alertService: AlertService,
    private http: HttpClient
  ) {}

  public getHost() {
    return DEFAULT_HOST;
  }

  public getCart() {
    return this.cart
  }

  public updateCart(cart) {
    this.cart = cart;
    this.cartEmit.next(this.cart);
  }

  // public updateCart(prod:Product,type:string){
  //   if(type === ADD_PRODUCT){
  //     this.cart.addToCart(prod);
  //   }else{
  //     this.cart.removeFromCart(prod);
  //   }
  //   this.cartEmit.next(this.cart);
  // }

  public getCartForUser() {
    this.showLoader.next(true)
    this.getCartItem().subscribe(val => {
      this.cart = new Cart(val);
      this.cartEmit.next(this.cart);
      this.showLoader.next(false)
    }, err => {
      this.alertService.errorAlert(null, err.error.errorMessage);
      this.showLoader.next(false)
    })
  }

  public getCartItem() {
    return this.http.get(this.getCartForUserUrl());
  }

  public getCartForUserUrl() {
    return this.getHost() + '/api/cart/getCartForUser';
  }

  public getUserDetailsAPIURL() {
    return this.getHost() + '/user/userdetails';
  }

  public getUserDetailsAPI() {
    return this.http.get(this.getUserDetailsAPIURL());
  }

  public getUserDetails() {
    return this.user
  }

  public getUserDetailsFromAPI() {
    this.showLoader.next(true)
    this.getUserDetailsAPI().subscribe(val => {
      this.user = new User(val)
      this.userSubject.next(this.user);
      this.showLoader.next(false)
    }, err => {
      console.log(this.errorLog, err)
      this.alertService.errorAlert(null, err.error.errorMessage);
      this.showLoader.next(false)
    })
  }

  public updateUser(user: User) {
    this.user = user
    this.userSubject.next(this.user)
  }

  public getAllDetailsofUser() {
    this.getCartForUser();
    this.getUserDetailsFromAPI();
    this.getPossibleStatusFormAPI();
  }


  public getPossibleStatus() {
    return this.possibleStatus
  }

  public getStatusValue(status: string) {
    return (<any>orderStatus)[status];
  }

  public setPossibleValue(value: { status: string, value: string }[]) {
    this.possibleStatus = value
  }

  public getPossibleStatusURL() {
    return this.getHost() + '/' + ORDER_PATH + '/orderstatus';
  }

  getPossibleStatsuReq() {
    return this.http.get<string[]>(this.getPossibleStatusURL())
  }

  public getPossibleStatusFormAPI() {
    let status: { status: string, value: string }[] = []
    this.showLoader.next(true)
    this.getPossibleStatsuReq().subscribe((value: string[]) => {
      value.forEach(val => {
        status.push({
          status: val,
          value: this.getStatusValue(val)
        })
      })
      this.possibleStatus = status;
      this.possibleStatusSubject.next(this.possibleStatus);
      this.showLoader.next(false)
    }, err => {
      console.error(this.errorLog, err)
      this.alertService.errorAlert(null, err.error.errorMessage);
      this.showLoader.next(false)
    })
  }

  public isMobileDevice(): boolean {
    return window.innerWidth <= this.mobileDefaultWidth;
  }

  public isTabletDevice(): boolean {
    return (window.innerWidth > this.mobileDefaultWidth) && (window.innerWidth < this.tabletMaxWidth)
  }

  public isHigherResolutionScreen(): boolean {
    return (window.innerWidth > this.desktopMaxWidth);
  }

}
