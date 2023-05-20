/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public errorAlert(title: string | null, text: string | null) {
    Swal.fire({
      icon: 'error',
      title: title ? title : "Error",
      text: text ? text : 'Internal Server Error',
    })
  }

  public success(title: string | null, text: string) {
    Swal.fire({
      title: title ? title : 'Success',
      text: text,
      iconHtml: `<span class="material-icons-outlined" style="font-size: 7rem;color:dodgerblue">
      recommend
      </span>`,
    })
  }

  public showConfirmDialog(title: string = 'Are you Sure?',
    text: string = "You won't be able to revert this!",
    confirmButtonText: string = "Proceed", cancelButtonText: string = "Cancel") {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    })
  }
}
