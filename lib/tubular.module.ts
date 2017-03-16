﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GridComponent }  from './grid.component';
import { TbInputErrorComponent }  from './tb-input-error.component';
import { ColumnHeaderComponent } from './column-header.component';
import { GridSearchComponent } from './grid-search.component';
import { GridPagerComponent } from './grid-pager.component';
import { ColumnFilterDialogComponent }  from './column-filter-dialog.component';
import { GridPagerInfoComponent } from './grid-pager-info.component';
import { PageSizeSelectorComponent } from './page-size-selector.component';
import { ExportButtonComponent } from './grid-export.component';
import { PrintButtonComponent } from './grid-print.component';
import { MDatePipe } from './mdate.pipe';

@NgModule({
    imports: [
        BrowserModule, FormsModule, ReactiveFormsModule, HttpModule,
        NgbModule.forRoot()
    ],
    declarations: [
        GridComponent, ColumnHeaderComponent, GridSearchComponent,
        GridPagerComponent, GridPagerInfoComponent, ColumnFilterDialogComponent,
        PageSizeSelectorComponent, ExportButtonComponent, PrintButtonComponent,
        MDatePipe, TbInputErrorComponent
    ],
    exports: [
        GridComponent, ColumnHeaderComponent, GridSearchComponent,
        GridPagerComponent, GridPagerInfoComponent, ColumnFilterDialogComponent,
        PageSizeSelectorComponent, ExportButtonComponent, PrintButtonComponent,
        MDatePipe, TbInputErrorComponent,
        NgbModule
    ]
})
export class TubularModule { }
