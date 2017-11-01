import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CdkTableModule } from '@angular/cdk/table';

// Material
import {
    MatButtonModule,
    MatDialogModule,
    MatFormField,
    MatFormFieldControl,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatOption,
    MatSelect, MatSelectModule,
    MatSortModule, MatTableModule, MatPaginator
} from '@angular/material';

import { GridComponent } from './grid/index';
import { GridSearchComponent } from './grid-search/grid-search';
import { ColumnFilterDialogComponent } from './column-filter-dialog/column-filter-dialog';
import { GridPagerInfoComponent } from './grid-pager-info/grid-pager-info';
import { GridExportButtonDirective } from './grid-export/grid-export';
import { GridPrintButtonDirective } from './grid-print/grid-print';
import { MDatePipe } from './mdate/mdate';
import { DataService } from './services/data.service';

// NbBootstrap special guest (https://github.com/ng-bootstrap/ng-bootstrap)
import { NgbPopover, NgbPopoverWindow } from './popover/popover';

@NgModule({
    exports: [
        CdkTableModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
    ]
})
export class CustomMaterialModule { }


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CustomMaterialModule
    ],
    declarations: [
        GridComponent, GridSearchComponent,
        GridPagerInfoComponent, ColumnFilterDialogComponent,
        GridExportButtonDirective, GridPrintButtonDirective,
        MDatePipe, NgbPopover, NgbPopoverWindow
    ],
    exports: [
        GridComponent, GridSearchComponent,
        GridPagerInfoComponent, ColumnFilterDialogComponent,
        GridExportButtonDirective, GridPrintButtonDirective,
        MDatePipe, NgbPopover
    ],
    entryComponents: [
        NgbPopoverWindow
    ],
    providers: [DataService]
})
export class TubularModule { }
