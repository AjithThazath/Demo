/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from './angular-material.module';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NoDataFoundComponent } from './shared/no-data-found/no-data-found.component';
import { ProductComponent } from './product/product.component';
import { TokenInterceptorInterceptor } from './shared/auth/token-interceptor.interceptor';
import { CartComponent } from './cart/cart.component';
import { CartItemsComponent } from './cart/cart-items/cart-items.component';
import { AccountComponent } from './account/account.component';
import { UserDetailsComponent } from './account/user-details/user-details.component';
import { MyOrdersComponent } from './account/my-orders/my-orders.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AgGridModule } from 'ag-grid-angular';
import { AdminProductsComponent } from './admin-home/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-home/admin-orders/admin-orders.component';
import { AddEditProductComponent } from './admin-home/admin-products/add-edit-product/add-edit-product.component';
import { OtpAndAddressConfirmationComponent } from './cart/otp-and-address-confirmation/otp-and-address-confirmation.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { clickOutsideDirective } from './shared/click-outside.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    NoDataFoundComponent,
    ProductComponent,
    CartComponent,
    CartItemsComponent,
    AccountComponent,
    UserDetailsComponent,
    MyOrdersComponent,
    AdminHomeComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AddEditProductComponent,
    clickOutsideDirective,
    OtpAndAddressConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    AgGridModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
