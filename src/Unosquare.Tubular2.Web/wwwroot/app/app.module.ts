import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TbDataService } from './tbData.service';

import { AppComponent }  from './app.component';
import { SampleGrid } from './sampleGrid.component';

import { TbGrid } from './tbGrid.component';
import { TbGridSearch } from './tbGridSearch.component';
import { TbGridPager } from './tbGridPager.component';
import { TbGridPagerInfo } from './tbGridPagerInfo.component';
import { TbColumnHeader } from './tbColumnHeader.directive';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: [
        AppComponent, TbGrid, SampleGrid, TbColumnHeader,
        TbGridPager, TbGridPagerInfo, TbGridSearch
    ],
    providers: [TbDataService],
    bootstrap: [AppComponent]
})
export class AppModule { }