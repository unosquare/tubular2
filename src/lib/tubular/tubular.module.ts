 import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { GridComponent } from './grid.component';
import { ColumnHeaderComponent } from './column-header.component';
import { GridSearchComponent } from './grid-search.component';
import { GridPagerComponent } from './grid-pager.component';
import { ColumnFilterDialogComponent } from './column-filter-dialog.component';
import { GridPagerInfoComponent } from './grid-pager-info.component';
import { PageSizeSelectorComponent } from './page-size-selector.component';
import { ExportButtonDirective } from './grid-export.directive';
import { PrintButtonDirective } from './grid-print.directive';
import { MDatePipe } from './mdate.pipe';

// NbBootstrap special guest (https://github.com/ng-bootstrap/ng-bootstrap)
import { NgbPopover, NgbPopoverWindow } from './popover';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule
    ],
    declarations: [
        GridComponent, ColumnHeaderComponent, GridSearchComponent,
        GridPagerComponent, GridPagerInfoComponent, ColumnFilterDialogComponent,
        PageSizeSelectorComponent, ExportButtonDirective, PrintButtonDirective,
        MDatePipe, NgbPopover, NgbPopoverWindow
    ],
    exports: [
        GridComponent, ColumnHeaderComponent, GridSearchComponent,
        GridPagerComponent, GridPagerInfoComponent, ColumnFilterDialogComponent,
        PageSizeSelectorComponent, ExportButtonDirective, PrintButtonDirective,
        MDatePipe, NgbPopover
    ],
    entryComponents: [
        NgbPopoverWindow
    ]
})
export class TubularModule { }
