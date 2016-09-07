import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TbGrid }  from './tbGrid.component';
import { TbColumnHeader } from './tbColumnHeader.directive';
import { TbGridSearch } from './tbGridSearch.component';
import { TbGridPager } from './tbGridPager.component';
import { TbGridPagerInfo } from './tbGridPagerInfo.component';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, NgbModule],
    declarations: [TbGrid, TbColumnHeader, TbGridSearch, TbGridPager, TbGridPagerInfo],
    exports: [TbGrid, TbColumnHeader, TbGridSearch, TbGridPager, TbGridPagerInfo, NgbModule]
})
export class TubularModule { }