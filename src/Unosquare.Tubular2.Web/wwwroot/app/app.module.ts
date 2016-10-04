import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TubularModule, TubularDataService } from '../tubular';

import { AppComponent }  from './app.component';
import { SampleGrid } from './sampleGrid.component';
import { Popup } from './popup.component';
import { PopupDirective }  from './popup.directive';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, TubularModule ],
    declarations: [AppComponent, SampleGrid, Popup, PopupDirective],
    providers: [TubularDataService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule { }