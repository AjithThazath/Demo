/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { isLoggedInRouteGuardGuard } from './shared/guard/isLogged-in-route-guard.guard copy';
import { isAdminRouteGuardGuard } from './shared/guard/isAdmin-route-guard.guard';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { OtpAndAddressConfirmationComponent } from './cart/otp-and-address-confirmation/otp-and-address-confirmation.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: "full" },
  {
    path: 'home', component: HomeComponent, canActivateChild: [isLoggedInRouteGuardGuard], children: [
      { path: 'product/:id', component: ProductComponent }
    ]
  },
  { path: 'cart', component: CartComponent, canActivate: [isLoggedInRouteGuardGuard] },
  { path: 'myaccount', component: AccountComponent, canActivate: [isLoggedInRouteGuardGuard] },
  { path: 'confirm-order', component: OtpAndAddressConfirmationComponent, canActivate: [isLoggedInRouteGuardGuard] },
  { path: 'admin-dashboard', component: AdminHomeComponent, canActivate: [isLoggedInRouteGuardGuard, isAdminRouteGuardGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
