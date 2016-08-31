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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var tbData_service_1 = require('./tbData.service');
var app_component_1 = require('./app.component');
var sampleGrid_component_1 = require('./sampleGrid.component');
var tbGrid_component_1 = require('./tbGrid.component');
var tbGridSearch_component_1 = require('./tbGridSearch.component');
var tbGridPager_component_1 = require('./tbGridPager.component');
var tbColumnHeader_directive_1 = require('./tbColumnHeader.directive');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule],
            declarations: [app_component_1.AppComponent, tbGrid_component_1.TbGrid, sampleGrid_component_1.SampleGrid, tbColumnHeader_directive_1.TbColumnHeader, tbGridPager_component_1.TbGridPager, tbGridSearch_component_1.TbGridSearch],
            providers: [tbData_service_1.TbDataService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map