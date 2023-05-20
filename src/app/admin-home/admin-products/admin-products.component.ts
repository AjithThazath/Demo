/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component, ViewChild } from '@angular/core';
import { AdminProductsColumDefService } from './admin-products-colum-def.service';
import { ColDef, Grid, GridApi, GridOptions, RowHeightParams } from 'ag-grid-community';
import { Product } from 'src/app/shared/models/product.model';
import { AdminHttpService } from '../admin-http.service';
import { AlertService } from 'src/app/shared/alert.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from 'src/app/shared/shared.service';
import { DELETE_PROD_CONFIRM, DELETE_PROD_FAIL, DELETE_PROD_SUCCESS, DELETE_PROD_TEXT, PAGINATION_LIMIT } from 'src/app/shared/app.constant';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  @ViewChild('sidenav', { static: false }) matSideNav: MatSidenav | undefined
  unSubscribe = new Subject<boolean>()

  pageNo: number = 0;
  pageLimit = PAGINATION_LIMIT
  total = 0
  columnDefs: ColDef[] = []
  defaultColDef: ColDef = {}
  prodClicked: Product | null = null
  rowData: Product[] = []
  private grid: GridOptions | null = null
  rowHeight = 200;

  errorLog = 'ERROR:: AdminProductsComponent :'
  constructor(
    private gridService: AdminProductsColumDefService,
    private adminHttpService: AdminHttpService,
    private alertService: AlertService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.columnDefs = this.gridService.columnDefs
    this.defaultColDef = this.gridService.defaultColDef;
    this.getData();
    this.gridService.editClicked.pipe(takeUntil(this.unSubscribe)).subscribe(prod => {
      this.prodClicked = new Product(prod.param, this.sharedService.getHost())
      if (prod.type === 'edit') {
        this.matSideNav?.open()
      } else {
        this.deleteProd()
      }
    })
  }

  private getData() {
    this.adminHttpService.getAllProducts(this.pageNo, this.pageLimit).subscribe((res: any) => {
      if (res.products.length) {
        this.rowData = res.products;
        this.total = res.total;
      } else {
        this.rowData = []
      }
    },
      err => {
        console.error(this.errorLog, err)
        this.alertService.errorAlert(null, err.error.message)
      })
  }

  onGridReady(event: GridOptions) {
    this.grid = event
    event.api?.sizeColumnsToFit();
    this.grid.api.refreshCells();
  }

  public close() {

    this.matSideNav?.close();
    this.getData();
  }

  public openSideNav() {
    this.matSideNav?.open();
    this.prodClicked = null;
  }

  deleteProd() {
    this.alertService.showConfirmDialog(DELETE_PROD_CONFIRM, DELETE_PROD_TEXT, 'Yes', 'No').then(res => {
      if (res.isConfirmed) {
        this.adminHttpService.deleteProduct(this.prodClicked.getId()).subscribe(val => {
          this.alertService.success(DELETE_PROD_SUCCESS, null);
          this.matSideNav.close();
          this.getData();
        }, err => {
          console.error(this.errorLog, err)
          this.alertService.errorAlert(DELETE_PROD_FAIL, err.error.message)
        })
      }
    })
  }

  onSelectionChanged(event) {
    this.prodClicked = new Product(event.data, this.sharedService.getHost())
    this.matSideNav.open();
  }

  handlePageEvent(event) {
    this.pageNo = event.pageIndex;
    this.pageLimit = event.pageSize
    this.getData();
  }

  ngOnDestroy() {
    this.unSubscribe.next(true);
  }
}
