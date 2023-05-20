/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginUrlServiceService {

  constructor(
    private sharedService: SharedService
  ) { }

  public getLoginUrl() {
    return this.sharedService.getHost() + '/auth/login'
  }

  public getSignUpUrl() {
    return this.sharedService.getHost() + '/auth/signUp'
  }
}
