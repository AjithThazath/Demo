/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import { ColDef, Grid, GridApi } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminHttpService } from '../admin-http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsColumDefService {

  editClicked = new Subject<any>

  constructor(
    private sharedService: SharedService,
  ) { }

  public columnDefs: ColDef[] = [
    {
      headerName: "ID",
      field: 'id',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      maxWidth: 100,
      cellClass: 'center'
    },

    {
      headerName: "Title",
      field: 'title',
      floatingFilter: true,
      filter: 'agTextColumnFilter',
      cellClass: 'center'
    },
    {
      headerName: "ImageUrl",
      field: 'imageUrl',
      minWidth: 200,
      cellRenderer: (params: any) => {
        let host = this.sharedService.getHost()
        return `<img class="gridImage" src=${host + encodeURI(params.value)}>`
      }
    },
    {
      headerName: "Description",
      field: 'description',
      floatingFilter: true,
      // cellClass: 'center'
    },
    {
      headerName: "Quantity",
      field: 'quantity',
      floatingFilter: true,
      cellClass: 'center'
    },
    {
      headerName: "Price",
      field: 'price',
      floatingFilter: true,
      valueFormatter: params => {
        return '₹ ' + params.value;
      },
      cellClass: 'center',
      cellStyle: { 'font-weight': 'bolder' },
    },
    {
      headerName: "Action",
      cellStyle: { 'text-align': 'center', 'cursor': 'pointer' },
      cellRenderer: (params: any) => {
        let div = document.createElement('div');
        let span = document.createElement('span');
        span.classList.add('material-icons-outlined');
        span.textContent = 'edit';
        div.appendChild(span);
        let span2 = document.createElement('span');
        span2.classList.add('material-icons-outlined');
        span2.textContent = 'delete';
        div.appendChild(span2);
        span.addEventListener('click', (event) => {
          event.stopPropagation()
          this.action(params, 'edit')
        })
        span2.addEventListener('click', (event) => {
          event.stopPropagation()
          this.action(params, 'delete')
        })
        div.classList.add('center')
        return div
      },
      maxWidth: 100
    }
  ];

  public defaultColDef: ColDef = {
    editable: false,
    filter: 'agTextColumnFilter',
    // floatingFilter: true,
    resizable: true,
    floatingFilterComponentParams: { suppressFilterButton: true },
    suppressMenu: true,
    minWidth: 100
  };

  private action(param: any, type: string) {
    console.log('params..', param);
    this.editClicked.next({ type: type, param: param.data })
  }
}
