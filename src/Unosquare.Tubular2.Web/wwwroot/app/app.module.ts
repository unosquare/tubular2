import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TubularModule, TbDataService } from 'tubular/tubular';

import { AppComponent }  from './app.component';
import { SampleGrid } from './sampleGrid.component';

@NgModule({
    imports: [BrowserModule, FormsModule, TubularModule ],
    declarations: [AppComponent, SampleGrid],
    providers: [TbDataService],
    bootstrap: [ AppComponent ]
})
export class AppModule { }