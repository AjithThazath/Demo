/**
  @Authored By Ajith Thazath  
  Created for Demo project
**/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatTabsModule,
    CdkTableModule,
    MatTableModule,
    MatDividerModule,
    MatTooltipModule,
    MatStepperModule,
    MatCardModule,
    CdkStepperModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatRadioModule,
    MatPaginatorModule
  ],
  exports: [
    MatIconModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    CdkStepperModule,
    MatTooltipModule,
    MatDividerModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatRadioModule,
    MatPaginatorModule
  ]
})
export class AngularMaterialModule { }
