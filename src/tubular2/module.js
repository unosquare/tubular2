"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const material_1 = require("@angular/material");
const index_1 = require("./grid/index");
const column_header_1 = require("./column-header/column-header");
const grid_search_1 = require("./grid-search/grid-search");
const grid_pager_1 = require("./grid-pager/grid-pager");
const column_filter_dialog_1 = require("./column-filter-dialog/column-filter-dialog");
const grid_pager_info_1 = require("./grid-pager-info/grid-pager-info");
const grid_page_size_selector_1 = require("./grid-page-size-selector/grid-page-size-selector");
const grid_export_1 = require("./grid-export/grid-export");
const grid_print_1 = require("./grid-print/grid-print");
const mdate_1 = require("./mdate/mdate");
// NbBootstrap special guest (https://github.com/ng-bootstrap/ng-bootstrap)
const popover_1 = require("./popover/popover");
class TubularModule {
}
TubularModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    platform_browser_1.BrowserModule,
                    forms_1.FormsModule,
                    forms_1.ReactiveFormsModule,
                    http_1.HttpModule,
                    material_1.MaterialModule
                ],
                declarations: [
                    index_1.GridComponent, column_header_1.ColumnHeaderComponent, grid_search_1.GridSearchComponent,
                    grid_pager_1.GridPagerComponent, grid_pager_info_1.GridPagerInfoComponent, column_filter_dialog_1.ColumnFilterDialogComponent,
                    grid_page_size_selector_1.GridPageSizeSelectorComponent, grid_export_1.GridExportButtonDirective, grid_print_1.GridPrintButtonDirective,
                    mdate_1.MDatePipe, popover_1.NgbPopover, popover_1.NgbPopoverWindow
                ],
                exports: [
                    index_1.GridComponent, column_header_1.ColumnHeaderComponent, grid_search_1.GridSearchComponent,
                    grid_pager_1.GridPagerComponent, grid_pager_info_1.GridPagerInfoComponent, column_filter_dialog_1.ColumnFilterDialogComponent,
                    grid_page_size_selector_1.GridPageSizeSelectorComponent, grid_export_1.GridExportButtonDirective, grid_print_1.GridPrintButtonDirective,
                    mdate_1.MDatePipe, popover_1.NgbPopover
                ],
                entryComponents: [
                    popover_1.NgbPopoverWindow
                ]
            },] },
];
/** @nocollapse */
TubularModule.ctorParameters = () => [];
exports.TubularModule = TubularModule;
//# sourceMappingURL=module.js.map