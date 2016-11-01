import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TubularModule, TubularDataService, SETTINGS_PROVIDER, TUBULAR_LOCAL_STORAGE } from '@tubular2/tubular2';

import { AppComponent }  from './app.component';
import { SampleGrid } from './sampleGrid.component';
import { Popup } from './popup.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, TubularModule ],
    declarations: [AppComponent, SampleGrid, Popup],
    providers: [
        TubularDataService,
        { provide: SETTINGS_PROVIDER, useClass: TUBULAR_LOCAL_STORAGE }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [Popup]
})
export class AppModule { }