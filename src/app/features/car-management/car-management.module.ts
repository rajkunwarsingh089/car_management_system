import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarModelComponent } from './car-model/car-model.component';
import { SalesmanCommissionReportComponent } from './salesman-commission-report/salesman-commission-report.component';
import { CarModelListComponent } from './car-model-list/car-model-list.component';
import { Guard } from 'src/app/shared/guard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule here
import { CustomValidatorsDirective } from 'src/app/shared/custom-validators.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/shared/notification.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/car-model',
    pathMatch: 'full'
  },
  {
    path: 'car-model',
    component: CarModelComponent,
    canActivate: [Guard],
  },
  {
    path: 'car-model-list',
    component: CarModelListComponent,
    canActivate: [Guard],
  },
  {
    path: 'salesman-commission-report',
    component: SalesmanCommissionReportComponent,
    canActivate: [Guard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  exports: [RouterModule],
  declarations: [
    CarModelComponent,
    SalesmanCommissionReportComponent,
    CarModelListComponent,
    CustomValidatorsDirective
  ],
  providers: [NotificationService]
})
export class CarManagementModule { }
