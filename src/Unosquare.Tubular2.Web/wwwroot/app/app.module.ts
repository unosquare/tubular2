import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { TbDataService } from './tbData.service';

import { AppComponent }  from './app.component';
import { TbGrid } from './tbGrid.component';
import { TbGridPager } from './tbGridPager.component';
import { SampleGrid } from './sampleGrid.component';
import { TbColumnHeader } from './tbColumnHeader.directive';

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent, TbGrid, SampleGrid, TbColumnHeader, TbGridPager ],
    providers: [TbDataService],
    bootstrap: [AppComponent]
})
export class AppModule { }