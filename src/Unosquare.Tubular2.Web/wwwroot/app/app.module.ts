import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TubularModule, TubularDataService } from '../tubular';

import { AppComponent }  from './app.component';
import { SampleGrid } from './sampleGrid.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, TubularModule ],
    declarations: [AppComponent, SampleGrid],
    providers: [TubularDataService],
    bootstrap: [ AppComponent ]
})
export class AppModule { }