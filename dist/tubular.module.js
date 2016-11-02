"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var grid_component_1 = require('./grid.component');
var column_header_component_1 = require('./column-header.component');
var grid_search_component_1 = require('./grid-search.component');
var grid_pager_component_1 = require('./grid-pager.component');
var column_filter_dialog_component_1 = require('./column-filter-dialog.component');
var grid_pager_info_component_1 = require('./grid-pager-info.component');
var page_size_selector_component_1 = require('./page-size-selector.component');
var grid_export_component_1 = require('./grid-export.component');
var grid_print_component_1 = require('./grid-print.component');
var TubularModule = (function () {
    function TubularModule() {
    }
    TubularModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, ng_bootstrap_1.NgbModule],
            declarations: [grid_component_1.TubularGrid, column_header_component_1.ColumnHeader, grid_search_component_1.GridSearch, grid_pager_component_1.GridPager, grid_pager_info_component_1.GridPagerInfo, column_filter_dialog_component_1.ColumnFilterDialog, page_size_selector_component_1.PageSizeSelector, grid_export_component_1.ExportButton, grid_print_component_1.PrintButton],
            exports: [grid_component_1.TubularGrid, column_header_component_1.ColumnHeader, grid_search_component_1.GridSearch, grid_pager_component_1.GridPager, grid_pager_info_component_1.GridPagerInfo, column_filter_dialog_component_1.ColumnFilterDialog, page_size_selector_component_1.PageSizeSelector, grid_export_component_1.ExportButton, grid_print_component_1.PrintButton,
                ng_bootstrap_1.NgbModule]
        }), 
        __metadata('design:paramtypes', [])
    ], TubularModule);
    return TubularModule;
}());
exports.TubularModule = TubularModule;
