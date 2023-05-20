/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class isAdminRouteGuardGuard {

  constructor(
    private authService: AuthServiceService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.getIsAdmin()) {
      this.router.navigateByUrl('/home')
      this.sharedService.showLogin.next(true)
      return false
    }
    return true
  }

}
