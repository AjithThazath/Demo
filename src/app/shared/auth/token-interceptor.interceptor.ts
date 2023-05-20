/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthServiceService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq;
    if (this.authService.getToken() !== '' && this.authService.getToken() !== null) {
      authReq = request.clone(
        {
          headers: request.headers.append('Authorization', this.authService.getToken())
        }
      );
    } else {
      authReq = request.clone()
    }
    return next.handle(authReq);
  }
}