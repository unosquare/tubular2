import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { GridComponent } from './grid/index';
import { GridSearchComponent } from './grid-search/grid-search';
import { GridPagerComponent } from './grid-pager/grid-pager';
import { ColumnFilterDialogComponent } from './column-filter-dialog/column-filter-dialog';
import { GridPagerInfoComponent } from './grid-pager-info/grid-pager-info';
import { GridPageSizeSelectorComponent } from './grid-page-size-selector/grid-page-size-selector';
import { GridExportButtonDirective } from './grid-export/grid-export';
import { GridPrintButtonDirective } from './grid-print/grid-print';
import { MDatePipe } from './mdate/mdate';
import { DataService } from './services/data.service';

// NbBootstrap special guest (https://github.com/ng-bootstrap/ng-bootstrap)
import { NgbPopover, NgbPopoverWindow } from './popover/popover';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule
    ],
    declarations: [
        GridComponent, GridSearchComponent,
        GridPagerComponent, GridPagerInfoComponent, ColumnFilterDialogComponent,
        GridPageSizeSelectorComponent, GridExportButtonDirective, GridPrintButtonDirective,
        MDatePipe, NgbPopover, NgbPopoverWindow
    ],
    exports: [
        GridComponent, GridSearchComponent,
        GridPagerComponent, GridPagerInfoComponent, ColumnFilterDialogComponent,
        GridPageSizeSelectorComponent, GridExportButtonDirective, GridPrintButtonDirective,
        MDatePipe, NgbPopover
    ],
    entryComponents: [
        NgbPopoverWindow
    ],
    providers: [DataService]
})
export class TubularModule { }
