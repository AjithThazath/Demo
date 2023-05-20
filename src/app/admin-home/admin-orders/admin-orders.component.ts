/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ColDef, Grid, GridOptions, Module } from 'ag-grid-community';
import { AdminProductsColumDefService } from './admin-orders-colum-def.service';
import { Order } from 'src/app/shared/models/order.model';
import { AdminHttpService } from '../admin-http.service';
import { AlertService } from 'src/app/shared/alert.service';
import { AdminHomeComponent } from '../admin-home.component'
import { SharedService } from 'src/app/shared/shared.service';
import { PAGINATION_LIMIT } from 'src/app/shared/app.constant';
import { Product } from 'src/app/shared/models/product.model';
import { AdminOrderProductsColumDefService } from './admin-order-products-colum-def.service';
import { MatSidenav } from '@angular/material/sidenav';
import { takeUntil, Subject } from 'rxjs';



@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) matSideNav: MatSidenav | undefined

  unSubscribe = new Subject<boolean>()

  errorLog = 'ERROR:: AdminOrdersComponent :'
  columnDefs: ColDef[] = []
  productsColumnDefs: ColDef[] = []
  defaultColDef: ColDef = {}
  rowData: Order[] = [];
  rowHeight = 50;
  pageNo = 0;
  total = 0
  pageLimit = PAGINATION_LIMIT;
  productForOrders: Product[] = [];
  hidePageSize = false

  private grid: GridOptions | null = null
  private orderProductgrid: GridOptions | null = null

  constructor(
    private gridService: AdminProductsColumDefService,
    private adminOrderProductsColumDefService: AdminOrderProductsColumDefService,
    private httpService: AdminHttpService,
    private alertService: AlertService,
    private adminHomeComponent: AdminHomeComponent,
    private sharedService: SharedService
  ) { }

  // ngAfterViewChecked (){
  //   if(this.grid){
  //     this.grid.api?.sizeColumnsToFit()
  //   }
  // }



  ngOnInit() {
    this.columnDefs = this.gridService.getColumnDef();
    this.productsColumnDefs = this.adminOrderProductsColumDefService.columnDefs;
    // if (!this.sharedService.isHigherResolutionScreen()) {
      this.rowHeight = 100
    // }
    if(this.sharedService.isMobileDevice()){
      this.hidePageSize = true
    }
    this.defaultColDef = this.gridService.defaultColDef;
    this.getData();
    this.adminHomeComponent.tabChange.pipe(takeUntil(this.unSubscribe)).subscribe(val => {
      if (val === 1) {
        this.grid.api?.sizeColumnsToFit();
        this.getData();
       
      }
    })

  }

  getData() {
    this.httpService.getAllOrders(this.pageNo, this.pageLimit).subscribe((response: any) => {
      if (response.orders.length) {
        // orders.forEach(order=>{
        //   this.rowData.push(new Order(order))
        // })
        this.rowData = response.orders;
        this.total = response.totalCount;
      }
    }, err => {
      console.error(this.errorLog, err)
      this.alertService.errorAlert(null, err.errorMessage)
    })
  }

  onGridReady(event: GridOptions) {
    this.grid = event;
  }
  onOrderProductGridReady(event: GridOptions) {
    console.log('executed order priduct grid')
    this.orderProductgrid = event;
    
  }

  handlePageEvent(event) {
    this.pageNo = event.pageIndex;
    this.pageLimit = event.pageSize
    this.getData();
  }

  onSelectionChanged(event) {
    this.productForOrders = event.data.products;
    this.orderProductgrid.api?.sizeColumnsToFit();
    this.matSideNav.open();
  }

  close() {
    this.matSideNav.close()
  }

  ngOnDestroy() {
    this.unSubscribe.next(true);
  }
}
