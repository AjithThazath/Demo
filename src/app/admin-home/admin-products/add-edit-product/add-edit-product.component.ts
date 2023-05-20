/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminHttpService } from '../../admin-http.service';
import { AlertService } from 'src/app/shared/alert.service';
import { Product } from 'src/app/shared/models/product.model';
import { Events } from 'ag-grid-community';
import { SharedService } from 'src/app/shared/shared.service';
import { DIALOG_TITLE_PRODUCT_ADDED_SUCCESS, DIALOG_TITLE_PRODUCT_UPDATED_SUCCESS } from 'src/app/shared/app.constant';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {

  errorLog = 'ERROR:: AddEditProductComponent :'

  public addEditProduct: FormGroup = new FormGroup({});
  public editMode: boolean = false;

  @Input() set product(prod: Product | null) {
    if (prod) {
      this.addEditProduct.patchValue({
        id: prod.getId(),
        title: prod.getTitle(),
        description: prod.getDescription(),
        price: prod.getPrice(),
        quantity: prod.getQuantity(),
        imageUrl: prod.getImageUrl()
      })
      this.editMode = true
    } else {
      this.editMode = false
    }
  }

  @Output() close = new EventEmitter()
  @Output() delete = new EventEmitter()

  constructor(
    private adminHttpService: AdminHttpService,
    private alertService: AlertService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.addEditProduct = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', [Validators.required]),
      image: new FormControl(null),
      imageUrl: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)]),
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)])
    })
  }
  public resetForm() {
    this.addEditProduct.reset()
  }

  addProd() {


    const formData = new FormData();
    if (this.editMode) {
      formData.append('id', this.addEditProduct.get('id')?.value)
    }
    formData.append('title', this.addEditProduct.get('title')?.value)
    formData.append('description', this.addEditProduct.get('description')?.value)
    formData.append('price', this.addEditProduct.get('price')?.value)
    formData.append('quantity', this.addEditProduct.get('quantity')?.value)
    if (this.addEditProduct.get('image').value) {
      formData.append('image', this.addEditProduct.get('image')?.value)
    }
    this.adminHttpService.addProduct(formData).subscribe((res: Product) => {
      let prod = new Product(res)
      let title = DIALOG_TITLE_PRODUCT_ADDED_SUCCESS;
      if (this.editMode) {
        title = DIALOG_TITLE_PRODUCT_UPDATED_SUCCESS
      }
      this.addEditProduct.reset();
      let message = "ID for the" + prod.getTitle() + ' is ' + prod.getId();
      this.cancel();
      this.alertService.success(title, message);
    }, err => {
      console.error(this.errorLog, err)
      this.alertService.errorAlert(null, err.errorMessage)
    })

  }

  cancel() {
    this.addEditProduct.reset();
    this.close.emit(true)

  }

  attachImage(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addEditProduct.patchValue({
          image: file,
          imageUrl: reader.result as string
        })
      }
    }
  }

  public deleteProd(){
    this.delete.emit(this.product)
  }

  ngOnDestroy() {
    this.addEditProduct.reset();
  }
}
