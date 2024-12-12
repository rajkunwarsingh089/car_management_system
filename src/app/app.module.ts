import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarManagementModule } from './features/car-management/car-management.module';
import { CarModelService } from './shared/car-model-service';
import { Interceptor } from './shared/interceptor.interceptor';
import { Guard } from './shared/guard.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarManagementModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    Guard,
    CarModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
