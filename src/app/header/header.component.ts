/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../shared/auth/auth-service.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { SharedService } from '../shared/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { CartHttpService } from '../cart/cart.http.service';
import { Cart } from '../shared/models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ngUnsubscribe = new Subject<boolean>

  isLoginClicked = false;

  cartCount: number = 0

  isLoggedIn = false

  profileOpt: { name: string, action: string }[] = [
    { name: 'My Profile', action: "PROFILE" },
    { name: 'Logout', action: "LOGOUT" }
  ]

  constructor(
    private authService: AuthServiceService,
    private sharedService: SharedService,
    private route: Router
  ) {
    if (authService.getToken() !== null && authService.getToken() !== '') {
      this.isLoggedIn = true;
      this.sharedService.getAllDetailsofUser();
    }
  }

  public showLogin() {
    this.sharedService.showLogin.next(true)
  }

  public loginClose() {
    this.isLoginClicked = false
  }

  public action(type: string) {
    switch (type) {
      case 'LOGOUT': this.logout();
        break;
      case 'PROFILE': this.redirectProfile();
        break;

    }
  }

  private logout() {
    this.authService.clearToken();
    this.route.navigateByUrl('/home')
  }

  private redirectProfile() {
    this.route.navigateByUrl('/myaccount')
  }

  private subs() {
    this.authService.isLoggedIn.pipe(takeUntil(this.ngUnsubscribe)).subscribe((val: boolean) => {
      if (val) {
        this.loginClose()
      }
      this.isLoggedIn = val
    })
    this.sharedService.showLogin.pipe(takeUntil(this.ngUnsubscribe)).subscribe((val: boolean) => {
      this.isLoginClicked = true
    })

    this.sharedService.cartEmit.pipe(takeUntil(this.ngUnsubscribe)).subscribe((cart: Cart) => {
      this.cartCount = cart.getCartCount();
    })
  }

  ngOnInit() {
    this.subs();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true)
  }

  gotToCart() {
    this.route.navigateByUrl('/cart')
  }

  routeHome() {
    this.route.navigateByUrl('/home')
  }
}
