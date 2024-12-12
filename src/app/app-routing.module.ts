import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarManagementModule } from './features/car-management/car-management.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/car-model',
    pathMatch: 'full'
  },
  {
    path: 'car-management',
    loadChildren: () => import('./features/car-management/car-management.module').then(m => m.CarManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}