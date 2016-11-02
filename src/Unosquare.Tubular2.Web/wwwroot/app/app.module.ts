import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TubularModule, TubularDataService, SETTINGS_PROVIDER, TubularLocalStorageService } from '@tubular2/tubular2';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }  from './app.component';
import { SampleGrid } from './sampleGrid.component';
import { OrderPopup } from './order-popup.component';
import { GridComponent }   from './grid.component';
import { FormComponent }   from './form.component';
import { LoginComponent }   from './login.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, TubularModule, AppRoutingModule ],
    declarations: [AppComponent, SampleGrid, OrderPopup, GridComponent, FormComponent, LoginComponent],
    providers: [
        TubularDataService,
        { provide: SETTINGS_PROVIDER, useClass: TubularLocalStorageService }
    ],
    bootstrap: [AppComponent],
    entryComponents: [OrderPopup]
})
export class AppModule { }