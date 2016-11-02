import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TubularModule, TubularDataService, SETTINGS_PROVIDER, TubularLocalStorageService } from '@tubular2/tubular2';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }  from './app.component';
import { SampleGrid } from './sampleGrid.component';
import { Popup } from './popup.component';
import { GridComponent }   from './grid.component';
import { FormComponent }   from './form.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, TubularModule, AppRoutingModule ],
    declarations: [AppComponent, SampleGrid, Popup, GridComponent, FormComponent],
    providers: [
        TubularDataService,
        { provide: SETTINGS_PROVIDER, useClass: TubularLocalStorageService }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [Popup]
})
export class AppModule { }