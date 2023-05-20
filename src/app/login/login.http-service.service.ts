/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUrlServiceService } from './login.url-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpServiceService {

  constructor(
    private http: HttpClient,
    private urlService: LoginUrlServiceService
  ) { }

  //For login
  public login(cred: { username: string, password: string }) {
    return this.http.post(this.urlService.getLoginUrl(), cred)
  }

  //For signing Up new User
  public signUp(userInfo: { username: string, password: string, name: string, mobile_number: number, address: string }) {
    return this.http.post(this.urlService.getSignUpUrl(), userInfo)
  }
}
