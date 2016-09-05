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
var tbGrid_component_1 = require('./tbGrid.component');
var tbColumnHeader_directive_1 = require('./tbColumnHeader.directive');
var tbGridSearch_component_1 = require('./tbGridSearch.component');
var tbGridPager_component_1 = require('./tbGridPager.component');
var tbGridPagerInfo_component_1 = require('./tbGridPagerInfo.component');
var TubularModule = (function () {
    function TubularModule() {
    }
    TubularModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule],
            declarations: [tbGrid_component_1.TbGrid, tbColumnHeader_directive_1.TbColumnHeader, tbGridSearch_component_1.TbGridSearch, tbGridPager_component_1.TbGridPager, tbGridPagerInfo_component_1.TbGridPagerInfo],
            exports: [tbGrid_component_1.TbGrid, tbColumnHeader_directive_1.TbColumnHeader, tbGridSearch_component_1.TbGridSearch, tbGridPager_component_1.TbGridPager, tbGridPagerInfo_component_1.TbGridPagerInfo]
        }), 
        __metadata('design:paramtypes', [])
    ], TubularModule);
    return TubularModule;
}());
exports.TubularModule = TubularModule;
//# sourceMappingURL=tubular.module.js.map