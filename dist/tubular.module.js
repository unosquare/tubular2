"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const grid_component_1 = require("./grid.component");
const column_header_component_1 = require("./column-header.component");
const grid_search_component_1 = require("./grid-search.component");
const grid_pager_component_1 = require("./grid-pager.component");
const column_filter_dialog_component_1 = require("./column-filter-dialog.component");
const grid_pager_info_component_1 = require("./grid-pager-info.component");
const page_size_selector_component_1 = require("./page-size-selector.component");
const grid_export_component_1 = require("./grid-export.component");
const grid_print_component_1 = require("./grid-print.component");
const mdate_pipe_1 = require("./mdate.pipe");
let TubularModule = class TubularModule {
};
TubularModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule,
            ng_bootstrap_1.NgbModule.forRoot()
        ],
        declarations: [
            grid_component_1.GridComponent, column_header_component_1.ColumnHeaderComponent, grid_search_component_1.GridSearchComponent,
            grid_pager_component_1.GridPagerComponent, grid_pager_info_component_1.GridPagerInfoComponent, column_filter_dialog_component_1.ColumnFilterDialogComponent,
            page_size_selector_component_1.PageSizeSelectorComponent, grid_export_component_1.ExportButtonComponent, grid_print_component_1.PrintButtonComponent,
            mdate_pipe_1.MDatePipe
        ],
        exports: [
            grid_component_1.GridComponent, column_header_component_1.ColumnHeaderComponent, grid_search_component_1.GridSearchComponent,
            grid_pager_component_1.GridPagerComponent, grid_pager_info_component_1.GridPagerInfoComponent, column_filter_dialog_component_1.ColumnFilterDialogComponent,
            page_size_selector_component_1.PageSizeSelectorComponent, grid_export_component_1.ExportButtonComponent, grid_print_component_1.PrintButtonComponent,
            mdate_pipe_1.MDatePipe,
            ng_bootstrap_1.NgbModule
        ]
    })
], TubularModule);
exports.TubularModule = TubularModule;
