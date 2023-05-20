/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component, ViewChild } from '@angular/core';
import { HomeHttpService } from './home.http.service';
import { Product } from '../shared/models/product.model';
import { SharedService } from '../shared/shared.service';
import { AlertService } from '../shared/alert.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { PAGINATION_LIMIT } from '../shared/app.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  errorLog = "ERROR:: HomeComponent :"
  products: Product[] = []

  nodata: boolean = false;

  pageNo = 0;

  constructor(
    private httpService: HomeHttpService,
    private sharedService: SharedService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  private getAllProducts() {
    this.sharedService.showLoader.next(true)
    this.httpService.getAllProducts(this.pageNo, PAGINATION_LIMIT).subscribe((res: any) => {
      this.sharedService.showLoader.next(false)
      if (res.products.length) {
        res.products.forEach((prod: any) => {
          this.products.push(new Product(prod, this.sharedService.getHost()));
        })
      } else {
        if (this.products.length === 0) {
          this.nodata = true
        }
      }
    }, err => {
      console.error(this.errorLog, err)
      this.sharedService.showLoader.next(false)
      this.nodata = true
      this.alert.errorAlert("error", err.message)
    })
  }

  public showProduct(id: number) {
    this.router.navigateByUrl('home/product/' + id)
  }
  onScroll() {
    this.pageNo++;
    this.getAllProducts()
  }

}
