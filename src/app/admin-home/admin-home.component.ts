/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {

  tabChange = new Subject<number>()

  public onTabChange(event: MatTabChangeEvent): void {
    this.tabChange.next(event.index)
  }

}
