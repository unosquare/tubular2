import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TubularGrid }  from './grid.component';
import { ColumnHeader } from './column-header.component';
import { GridSearch } from './grid-search.component';
import { GridPager } from './grid-pager.component';
import { ColumnFilterDialog }  from './column-filter-dialog.component';
import { GridPagerInfo } from './grid-pager-info.component';
import { PageSizeSelector } from './page-size-selector.component';
import { ExportButton } from './grid-export.component';
import { PrintButton } from './grid-print.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, NgbModule],
    declarations: [TubularGrid, ColumnHeader, GridSearch, GridPager, GridPagerInfo, ColumnFilterDialog, PageSizeSelector, ExportButton, PrintButton],
    exports: [TubularGrid, ColumnHeader, GridSearch, GridPager, GridPagerInfo, ColumnFilterDialog, PageSizeSelector, ExportButton, PrintButton, 
        NgbModule]
})
export class TubularModule { }