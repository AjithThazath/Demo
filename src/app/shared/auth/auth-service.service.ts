/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token: string = '';

  private isAdmin: boolean = false;

  public isLoggedIn = new Subject<boolean>();

  constructor() {
    this.haveValidToken();
  }

  private haveValidToken() {
    if (localStorage.getItem('authToken')) {
      let decoded = this.decodeToken(localStorage.getItem('authToken'));
      const d = new Date(0);
      d.setUTCSeconds(decoded.exp);
      if (d > new Date()) {
        this.token = this.token = 'Bearer ' + localStorage.getItem('authToken');
        this.isAdmin = decoded.isAdmin;
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
        localStorage.removeItem('authToken')
      }
    }
  }

  public getToken(): string {
    if (this.token === '' || this.token === null) {
      return ''
    }
    return this.token
  }

  public setToken(token: string) {
    localStorage.setItem('authToken', token)
    this.token = 'Bearer ' + token;
    let decoded: { exp: number, iat: number, isAdmin: boolean, sub: string } = this.decodeToken(token);
    console.log('decoded token', decoded)
    this.isAdmin = decoded.isAdmin;
    this.isLoggedIn.next(true);
  }

  private decodeToken(token): { exp: number, iat: number, isAdmin: boolean, sub: string } {
    return jwt_decode(token);
  }

  public clearToken() {
    this.token = '';
    this.isAdmin = false;
    localStorage.removeItem('authToken')
    this.isLoggedIn.next(false);
  }

  public getIsAdmin() {
    if (this.isAdmin) {
      return true
    } else {
      return false
    }
  }

}
