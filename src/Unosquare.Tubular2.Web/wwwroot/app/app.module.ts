import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TubularModule, TubularDataService, TubularSettingsService } from '@tubular2/tubular2';

import { AppComponent }  from './app.component';
import { SampleGrid } from './sampleGrid.component';
import { OrderPopup } from './order-popup.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, TubularModule ],
    declarations: [AppComponent, SampleGrid, OrderPopup],
    providers: [TubularDataService, TubularSettingsService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [OrderPopup]
})
export class AppModule { }