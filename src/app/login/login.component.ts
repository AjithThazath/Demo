/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../shared/auth/auth-service.service';
import { LoginHttpServiceService } from './login.http-service.service';
import { LoginUrlServiceService } from './login.url-service.service';
import { SharedService } from '../shared/shared.service';
import { AlertService } from '../shared/alert.service';
import { CHANGE_TAB_TO_SIGNUP, INVALID_PASSWORD_FORMAT } from '../shared/app.constant';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginMatTab', { static: false }) matTab: MatTabGroup

  invalidCred: boolean = false
  @Output() cancelClicked = new EventEmitter();
  digitTest = new RegExp(/\d/);
  upperCaseTest = new RegExp(/[A-Z]/)
  lowerCaseTest = new RegExp(/[a-z]/)
  INVALID_PASSWORD_FORMAT = INVALID_PASSWORD_FORMAT
  sexOptions: string[] = ['MALE', 'FEMALE'];
  CHANGE_TAB_TO_SIGNUP = CHANGE_TAB_TO_SIGNUP;
  errorLog = "ERROR:: LoginComponent :"

  constructor(
    private fb: FormBuilder,
    private loginHttpService: LoginHttpServiceService,
    private authService: AuthServiceService,
    private sharedService: SharedService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  signUpForm: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.passwordFormatValidation.bind(this)]),
    verifyPassword: new FormControl('', [Validators.required, this.verifyPassword.bind(this)]),
    name: new FormControl('', Validators.required),
    sex: new FormControl('MALE', Validators.required),
    mobile_number: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^[0-9]/)]),
    address: new FormControl('', [Validators.required])
  })

  public login() {
    this.sharedService.showLoader.next(true)
    this.loginHttpService.login(this.loginForm.value).subscribe((res: any) => {
      this.authService.setToken(res.token);
      this.sharedService.getAllDetailsofUser()
      this.sharedService.showLoader.next(false)
    }, err => {
      if (err.error.statusCode === 401 && err.error.errorMessage === "Bad credentials") {
        this.invalidCred = true
      } else {
        this.alertService.errorAlert(null, err.error.errorMessage);
      }
      console.error(this.errorLog, err)
      this.sharedService.showLoader.next(false)
    })
  }

  public close() {
    this.cancelClicked.emit(true)
  }

  public signUp() {
    this.sharedService.showLoader.next(true)
    let payload = this.signUpForm.value;
    payload.password =
      this.loginHttpService.signUp(this.signUpForm.value).subscribe((res: any) => {
        this.authService.setToken(res.token);
        this.sharedService.getUserDetailsFromAPI()
        this.sharedService.getPossibleStatusFormAPI();
        this.sharedService.showLoader.next(false)
      }, err => {
        console.error(this.errorLog, err)
        this.alertService.errorAlert(null, err.error.errorMessage);
        this.sharedService.showLoader.next(false)
      })
  }

  verifyPassword(args): Validators {
    if (this.signUpForm?.get('password')?.value !== args?.value) {
      return {
        verifyPassword: {
          value: "Password dont match"
        }
      }
    }
    else {
      return null;
    }
  }

  private passwordFormatValidation(args) {
    let error = {}
    if (args.value.length < 6 || !this.upperCaseTest.test(args.value) || !this.lowerCaseTest.test(args.value)) {
      error['password'] = { value: INVALID_PASSWORD_FORMAT }
      return error;
    } else {
      return null
    }

  }

  changeTabToSIgnUp() {
    this.matTab.selectedIndex = 1;
  }

}
