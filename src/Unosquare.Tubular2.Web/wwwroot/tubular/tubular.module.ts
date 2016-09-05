import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TbGrid }  from './tbGrid.component';
import { TbColumnHeader } from './tbColumnHeader.directive';
import { TbGridSearch } from './tbGridSearch.component';
import { TbGridPager } from './tbGridPager.component';
import { TbGridPagerInfo } from './tbGridPagerInfo.component';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    declarations: [TbGrid, TbColumnHeader, TbGridSearch, TbGridPager, TbGridPagerInfo],
    exports: [TbGrid, TbColumnHeader, TbGridSearch, TbGridPager, TbGridPagerInfo]
})
export class TubularModule { }