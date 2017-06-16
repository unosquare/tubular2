;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Tubular.module = factory();
  }
}(this, function() {
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
const material_1 = require("@angular/material");
const grid_component_1 = require("./grid.component");
const column_header_component_1 = require("./column-header.component");
const grid_search_component_1 = require("./grid-search.component");
const grid_pager_component_1 = require("./grid-pager.component");
const column_filter_dialog_component_1 = require("./column-filter-dialog.component");
const grid_pager_info_component_1 = require("./grid-pager-info.component");
const page_size_selector_component_1 = require("./page-size-selector.component");
const grid_export_directive_1 = require("./grid-export.directive");
const grid_print_directive_1 = require("./grid-print.directive");
const mdate_pipe_1 = require("./mdate.pipe");
// NbBootstrap special guest (https://github.com/ng-bootstrap/ng-bootstrap)
const popover_1 = require("./popover");
let TubularModule = class TubularModule {
};
TubularModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            material_1.MaterialModule
        ],
        declarations: [
            grid_component_1.GridComponent, column_header_component_1.ColumnHeaderComponent, grid_search_component_1.GridSearchComponent,
            grid_pager_component_1.GridPagerComponent, grid_pager_info_component_1.GridPagerInfoComponent, column_filter_dialog_component_1.ColumnFilterDialogComponent,
            page_size_selector_component_1.PageSizeSelectorComponent, grid_export_directive_1.ExportButtonDirective, grid_print_directive_1.PrintButtonDirective,
            mdate_pipe_1.MDatePipe, popover_1.NgbPopover, popover_1.NgbPopoverWindow
        ],
        exports: [
            grid_component_1.GridComponent, column_header_component_1.ColumnHeaderComponent, grid_search_component_1.GridSearchComponent,
            grid_pager_component_1.GridPagerComponent, grid_pager_info_component_1.GridPagerInfoComponent, column_filter_dialog_component_1.ColumnFilterDialogComponent,
            page_size_selector_component_1.PageSizeSelectorComponent, grid_export_directive_1.ExportButtonDirective, grid_print_directive_1.PrintButtonDirective,
            mdate_pipe_1.MDatePipe, popover_1.NgbPopover
        ],
        entryComponents: [
            popover_1.NgbPopoverWindow
        ]
    })
], TubularModule);
exports.TubularModule = TubularModule;

return Tubular.module;
}));
