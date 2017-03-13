import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import { TubularModule, SETTINGS_PROVIDER, TubularLocalStorageService, HttpOptions, TubularAuthService, TubularHttpService } from '@tubular2/tubular2';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SampleGrid } from './sampleGrid.component';
import { OrderPopup } from './order-popup.component';
import { GridComponent } from './grid.component';
import { FormComponent } from './form.component';
import { LoginComponent } from './login.component';
import { ExpirationComponent } from './expiration.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, TubularModule, AppRoutingModule, ToastModule],
    declarations: [AppComponent, SampleGrid, OrderPopup, GridComponent, FormComponent, LoginComponent, ExpirationComponent],
    providers: [
        TubularAuthService,
        TubularHttpService,
        { provide: SETTINGS_PROVIDER, useClass: TubularLocalStorageService },
        { provide: RequestOptions, useClass: HttpOptions }
    ],
    bootstrap: [AppComponent],
    entryComponents: [OrderPopup]
})
export class AppModule { }