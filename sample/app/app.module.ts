import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import { TubularModule, SETTINGS_PROVIDER, TubularLocalStorageService, HttpOptions } from '@tubular2/tubular2';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SampleGrid } from './sampleGrid.component';
import { MainGridComponent } from './main-grid.component';
import { LoginComponent } from './login.component';
import { OrderComponent } from './order.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
    imports: [
        BrowserModule, FormsModule, ReactiveFormsModule, TubularModule, 
        AppRoutingModule, ToastModule.forRoot()
    ],
    declarations: [
        AppComponent, SampleGrid, MainGridComponent, 
        LoginComponent, OrderComponent
    ],
    entryComponents: [OrderComponent],
    providers: [
        { provide: SETTINGS_PROVIDER, useClass: TubularLocalStorageService },
        { provide: RequestOptions, useClass: HttpOptions }
    ],
    bootstrap: [AppComponent],
    // entryComponents: [OrderPopup]
})
export class AppModule { }