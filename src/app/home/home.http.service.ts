/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class HomeHttpService {

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  public getAllProductURL(pageNo: number, limit: number) {
    return this.sharedService.getHost() + '/shop/products?page=' + pageNo + '&limit=' + limit;
  }

  public getAllProducts(pageNo: number, limit: number) {
    return this.http.get(this.getAllProductURL(pageNo, limit))
  }
}
