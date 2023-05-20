/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { SharedService } from 'src/app/shared/shared.service';
import { Sex } from '../../shared/models/user.model';
import { AccountHttpService } from '../account-http.service';
import { AlertService } from 'src/app/shared/alert.service';
import { UPDATE_SUCCESS } from 'src/app/shared/app.constant';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  errorLog = 'ERROR:: UserDetailsComponent :'

  unSubscribe = new Subject<boolean>()

  isEdit: boolean = false;

  userForm: any = null;

  sexOptions: string[] = ['MALE', 'FEMALE']

  userDetails: User | null = null;
  constructor(
    private sharedService: SharedService,
    private accountHttpService: AccountHttpService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.sharedService.userSubject.pipe(takeUntil(this.unSubscribe)).subscribe(user => {
      this.userDetails = user;
      this.generateForm();
    })
  }

  public generateForm() {
    this.userForm = new FormGroup({
      name: new FormControl(this.userDetails ? this.userDetails.getName() : '', [Validators.required]),
      username: new FormControl(this.userDetails ? this.userDetails.getUserName() : '', [Validators.email, Validators.required]),
      mobile_number: new FormControl(this.userDetails ? this.userDetails.getMobileNumber() : '', [Validators.maxLength(10), Validators.required]),
      sex: new FormControl(this.userDetails ? this.userDetails.getSex() : 'Male', Validators.required),
      address: new FormControl(this.userDetails ? this.userDetails.getAddress() : '', Validators.required),
    })
  }

  updateUser() {
    this.accountHttpService.putUpdateUserDetails(new User(this.userForm.value)).subscribe(res => {
      this.sharedService.updateUser(new User(this.userForm.value))
      this.alertService.success(null, UPDATE_SUCCESS);
      this.isEdit = false;
    }, err => {
      console.error(this.errorLog, err)
      this.alertService.errorAlert(null, err.errorMessage);
    })
  }

  cancel() {
    this.isEdit = false;
  }

  ngOnDestroy() {
    this.unSubscribe.next(true);
  }

}
