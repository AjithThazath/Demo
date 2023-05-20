/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Sex } from '../shared/models/user.model';
import { SharedService } from '../shared/shared.service';
import { AuthServiceService } from '../shared/auth/auth-service.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ORDER_PATH } from '../shared/app.constant';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  isTablet = false

  section = 'details'

  sideNavContent = [
    { name: 'My Details', action: 'details' },
    { name: 'My Orders', action: 'orders' }
  ]

  user: User | null = null

  constructor(
    private sharedService: SharedService,
    private authService: AuthServiceService,
    private route: Router,
    private actvatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sharedService.userSubject.subscribe(user => {
      this.user = user;
    })
    if (this.authService.getIsAdmin()) {
      this.sideNavContent.push({ name: 'Go to Admin Dashboard', action: 'ADMIN_DASBOARD' })
    }
    if (this.actvatedRoute.snapshot.queryParams['tab'] === ORDER_PATH) {
      this.section = 'orders'
    }

    this.isTablet = this.sharedService.isTabletDevice() || this.sharedService.isMobileDevice();

  }



  showSection(event: string) {
    switch (event) {
      case 'details': this.section = 'details';
        break;
      case 'orders': this.section = 'orders'
        break;
      case 'ADMIN_DASBOARD': this.openAdminDashboard();
        break;

    }
  }

  private openAdminDashboard() {
    window.open(window.origin + '/admin-dashboard');
  }

}
