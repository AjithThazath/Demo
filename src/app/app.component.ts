/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/

import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myShoppingAppFE';

  showLoader = false;

  constructor(
    private sharedService: SharedService
  ) {

  }

  ngOnInit() {
    this.sharedService.showLoader.subscribe(val => {
      this.showLoader = val
    })

  }


}
