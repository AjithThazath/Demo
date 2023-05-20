/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { ColDef, Grid, GridApi } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminHttpService } from '../admin-http.service';
import { AlertService } from 'src/app/shared/alert.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsColumDefService {

  editClicked = new Subject<any>
  possibleStatus: any[] = []

  constructor(
    private sharedService: SharedService,
    private adminHttpService: AdminHttpService,
    private alertService: AlertService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.sharedService.possibleStatusSubject.subscribe(status=>{
      this.possibleStatus = status;
    })
  }

  public columnDefs: any[] = [
    {
      headerName: "ID",
      field: 'id',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      maxWidth: 100,
      cellClass: 'center'
    },

    {
      headerName: "Ordered By",
      field: 'userid',
      floatingFilter: true,
      filter: 'agTextColumnFilter',
      cellClass: 'center',
      minWidth:250
    },
    {
      headerName: "Order Date",
      field: 'orderDate',
      cellClass: 'center',
      cellRenderer: (data) => {
        return formatDate(data.value, 'dd MMM yyyy', this.locale);
      },
      floatingFilter: true,
    },
    {
      headerName: "Amount",
      field: 'totalAmount',
      cellClass: 'center',
      floatingFilter: true,
    },

    {
      headerName: "Status",
      field: "status",
      floatingFilter: true,
      cellClass: 'center',
      cellRenderer: (params: any) => {
        let value: any = params.value
        let div = document.createElement('div');
        div.addEventListener('click',(event)=>{
          event.stopPropagation()
        })
        let select = document.createElement('select');
        let attr = this.possibleStatus.find(val => val.status === params.data.status)
        select.classList.add('adminSelect')
        this.possibleStatus.forEach(stat => {
          let opt = document.createElement('option');
          opt.innerText = stat.value
          opt.setAttribute('value', stat.status)
          if (opt.innerText === attr.value) {
            opt.setAttribute('selected', 'true')
          }
          select.appendChild(opt);
        })
        select.addEventListener('change', ($event: Event) => {
          value = $event.target['value'];
        })
        let button = document.createElement('button');
        button.classList.add('adminButton')
        button.innerText = 'Update';
        button.addEventListener('click', (event) => {
         
          this.updateStatus(params, value)
        })

        div.appendChild(select);
        div.appendChild(button)
        return div

      },
      minWidth: 200
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

  private action(param: any) {
    this.editClicked.next(param.data)
  }

  public getColumnDef() {
    this.possibleStatus = this.sharedService.getPossibleStatus();
    return this.columnDefs
  }

  private updateStatus(param: any, updatedValue) {
    this.adminHttpService.putUpdateOrderStatusAdmin(param.data.id, updatedValue).subscribe(val => {
      this.alertService.success(val['message'], 'Order Updated Successfully')
    }, err => {
      console.log('err', err)
      this.alertService.errorAlert(null, err.errorMessage)
    })
  }


}
