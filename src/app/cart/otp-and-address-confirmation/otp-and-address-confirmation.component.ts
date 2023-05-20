/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Route, Router, Routes } from '@angular/router';
import { AccountHttpService } from 'src/app/account/account-http.service';
import { AlertService } from 'src/app/shared/alert.service';
import { ADDRESSBLOCK, COD, COD_DESC, COMPLETE, CONFIRM_ADDRESS, ENTER_OTP_MESSAGE, MODE_OF_PAYMENT_MSG, NOT_COMPLETE, ORDER_PACED_BODY, ORDER_PACED_TITLE, ORDER_PATH, OTP_EXPIRED, OTP_TIMER, SELECT_PAYMENT, SUCCESS, UPDATE_SUCCESS, VALIDATEOTP } from 'src/app/shared/app.constant';
import { User } from 'src/app/shared/models/user.model';
import { SharedService } from 'src/app/shared/shared.service';
import { CartHttpService } from '../cart.http.service';
import { Observable, timer } from 'rxjs';
@Component({
  selector: 'app-otp-and-address-confirmation',
  templateUrl: './otp-and-address-confirmation.component.html',
  styleUrls: ['./otp-and-address-confirmation.component.scss']
})
export class OtpAndAddressConfirmationComponent {

  CONFIRM_ADDRESS = CONFIRM_ADDRESS;
  COMPLETED = COMPLETE;
  NOT_COMPLETE = NOT_COMPLETE;
  ADDRESSBLOCK = ADDRESSBLOCK;
  VALIDATEOTP = VALIDATEOTP;
  SELECT_PAYMENT = SELECT_PAYMENT;
  SUCCESS = SUCCESS;
  selectedTab = 0;
  ENTER_OTP_MESSAGE = ENTER_OTP_MESSAGE;
  orderId: number | null = null;
  otpInvalid = false;
  ORDER_PACED_TITLE = ORDER_PACED_TITLE;
  ORDER_PACED_BODY = ORDER_PACED_BODY;
  paymentOption = [{ value: COD, desc: COD_DESC }]
  paymentMode = COD;
  MODE_OF_PAYMENT_MSG = MODE_OF_PAYMENT_MSG;
  OTP_TIMER = OTP_TIMER;
  dispalyTimer: string = '';
  timerSusb: any;
  showOTPExpired = false;
  OTP_EXPIRED = OTP_EXPIRED;

  errorLog = "ERROR:: OtpAndAddressConfirmationComponent :"
  @Output() close = new EventEmitter()

  user: User | null = null

  validationForm: FormGroup | null = null;
  isEdit: boolean = false

  steps = [{ status: NOT_COMPLETE, value: ADDRESSBLOCK, disable: false },
  { status: NOT_COMPLETE, value: SELECT_PAYMENT, disable: true },
  { status: NOT_COMPLETE, value: VALIDATEOTP, disable: true },
  { status: NOT_COMPLETE, value: SUCCESS, disable: true }
  ]
  dispTime: string = "05 : 00"
  showCritical: boolean = false

  public cancel() {
    this.isEdit = false
  }

  constructor(private fb: FormBuilder,
    private sharedService: SharedService,
    private accountHttpService: AccountHttpService,
    private alertService: AlertService,
    private cartHttpService: CartHttpService,
    private route: Router) { }

  ngOnInit() {
    this.user = this.sharedService.getUserDetails()
    this.validationForm = this.fb.group({
      mobile_number: new FormControl(this.user.getMobileNumber(), [Validators.required, Validators.pattern(/^[0-9]/), Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl(this.user.getAddress(), Validators.required),
      otp: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/), Validators.minLength(4), Validators.maxLength(4)]),
      otpVerified: new FormControl(false, [Validators.required])
    })
  }

  public update() {
    this.user.setAddress(this.validationForm.get('address').value)
    this.user.setMobilenumber(this.validationForm.get('mobile_number').value)
    this.accountHttpService.putUpdateUserDetails(new User(this.user)).subscribe(res => {
      this.sharedService.updateUser(new User(res))
      this.alertService.success(null, UPDATE_SUCCESS);
      this.isEdit = false;
    }, err => {
      console.error(this.errorLog, err)
      this.alertService.errorAlert(null, err.errorMessage);
    })
  }

  next(type: string) {
    console.log('type',type)
    switch (type) {
      case ADDRESSBLOCK: {
        this.steps[0].status = COMPLETE;
        this.steps[0].disable = true;
        this.steps[1].disable = false;
        this.steps[2].disable = true;
        this.steps[3].disable = true;
        this.selectedTab = 1;
      }
        break;
      case VALIDATEOTP: {
        this.steps[0].disable = true;
        this.steps[1].disable = true;
        this.steps[2].disable = true;
        this.steps[3].status = COMPLETE;
        this.steps[3].disable = false;
        this.selectedTab = 3;
      }
        break;
      case SELECT_PAYMENT: {
        this.steps[1].status = COMPLETE;
        this.steps[1].disable = true;
        this.steps[2].disable = false;
        this.steps[3].disable = true;
        this.steps[0].disable = true;
        this.selectedTab = 2;
        this.generateOTP();
        this.timer();
      }
        break;
    }
  }

  public generateOTP() {
    this.sharedService.showLoader.next(true);
    this.cartHttpService.generateOTP().subscribe(otp => {
      this.otpInvalid = false;
      this.showOTPExpired = false;
      this.dispTime = "05 : 00";
      this.sharedService.showLoader.next(false);
    }, err => {
      console.error(this.errorLog, err)
      this.sharedService.showLoader.next(false);
      this.alertService.errorAlert(err.error.errorMessage, err.error.errorMessage);
    })
  }
  public placeOrder() {
    this.sharedService.showLoader.next(true);
    let otp = { otp: this.validationForm.get('otp').value }
    this.cartHttpService.placeOrder(otp).subscribe(value => {
      this.validationForm.patchValue({
        otpVerified: true
      });
      this.orderId = value.orderId
      this.next(VALIDATEOTP)
      this.sharedService.getCartForUser();
      this.sharedService.showLoader.next(false);
    }, err => {
      console.error(this.errorLog, err)
      this.otpInvalid = true
      this.validationForm.get('otp').reset();
      this.sharedService.showLoader.next(false);
      this.alertService.errorAlert(err.error.errorMessage, err.error.errorMessage);
    })
  }

  public goHome() {
    this.route.navigateByUrl("/home");
  }

  public goToMyOrders() {
    this.route.navigateByUrl("/myaccount?tab=" + ORDER_PATH);
  }

  public emitClose() {
    // this.close.emit(true)
    this.route.navigateByUrl('/cart');
  }

  tabChange(event: MatTabChangeEvent) {
    this.selectedTab = event.index
  }


  public timer() {
    this.showCritical = false
    this.timerSusb = timer(1000, 1000).subscribe(val => {
      let countDown = OTP_TIMER - val;
      if (countDown > 0) {
        let min = Math.floor(countDown / 60);
        let sec = countDown % 60;
        if (countDown <= 60) {
          this.showCritical = true
        }
        this.dispTime = `0${min} : ${sec <= 9 ? '0' + sec : sec}`
      } else if (countDown === 0) {
        this.otpInvalid = true;
        this.showOTPExpired = true
        this.timerUnsuscriber()
      }
    });
  }

  timerUnsuscriber() {
    this.timerSusb.unsubscribe();
  }

}
