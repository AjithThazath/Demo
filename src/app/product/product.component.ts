/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductHttpService } from './product-http.service';
import { AlertService } from '../shared/alert.service';
import { addToCart } from './POJO';
import { ADD_PRODUCT, PRODUCT_ADD_TO_CART_SUCCESS, QTY } from '../shared/app.constant';
import { Cart } from '../shared/models/cart.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  qty: number[] = QTY;

  product: Product | null = null

  selectedQuantity: number = 1;
  productId: number = 0;
  errorLog = 'ERROR:: ProductComponent: '

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private httpService: ProductHttpService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.productId = Number(this.activatedRoute.snapshot.params['id']);
    this.getProductById()
  }

  public getProductById() {
    this.sharedService.showLoader.next(true)
    this.httpService.getProductById(this.productId).subscribe(product => {
      this.product = new Product(product, this.sharedService.getHost())
      this.sharedService.showLoader.next(false)
      if (this.product.getQuantity() < 5) {
        this.qty = []
        for (let i = 1; i <= this.product.getQuantity(); i++) {
          this.qty.push(i)
        }
      }
    }, err => {
      console.error(this.errorLog, err)
      this.product = null;
      this.sharedService.showLoader.next(false);
      this.close();
      this.alertService.errorAlert('ERROR', err.errorMessage);
    })
  }

  public close() {
    this.router.navigateByUrl('/home')
  }

  public addQty() {
    if (this.selectedQuantity < 5) {
      this.selectedQuantity++
    }
  }
  public subtractQty() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--
    }
  }

  public qtyChange(value: any) {
    console.log('value', value)
    if (Number(value) > 5 || Number(value) < 1) {
      this.selectedQuantity = 1
    }
  }

  public addToCart() {
    this.sharedService.showLoader.next(true)
    this.httpService.addToCart(new addToCart(this.productId, this.selectedQuantity)).subscribe(res => {

      this.sharedService.updateCart(new Cart(res));
      this.close();
      this.alertService.success('Success', PRODUCT_ADD_TO_CART_SUCCESS)
      this.sharedService.showLoader.next(false);
    }, err => {
      console.error(this.errorLog, err)
      this.sharedService.showLoader.next(false);
      this.alertService.errorAlert('ERROR', err.errorMessage);
    })
  }
}
