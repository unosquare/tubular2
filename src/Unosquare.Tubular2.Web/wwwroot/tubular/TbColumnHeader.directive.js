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
var column_1 = require('./column');
var popover_1 = require('@ng-bootstrap/ng-bootstrap/popover/popover');
var TbColumnHeader = (function () {
    function TbColumnHeader() {
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
    }
    TbColumnHeader.prototype.sort = function () {
        this.onSort.emit(this.column);
    };
    TbColumnHeader.prototype.filter = function (hasValue) {
        this.popover.close();
        this.onFilter.emit(this.column);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', column_1.ColumnModel)
    ], TbColumnHeader.prototype, "column", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TbColumnHeader.prototype, "onSort", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TbColumnHeader.prototype, "onFilter", void 0);
    __decorate([
        core_1.ContentChild("filterPopover"), 
        __metadata('design:type', core_1.TemplateRef)
    ], TbColumnHeader.prototype, "filterPopoverTemplate", void 0);
    __decorate([
        core_1.ViewChild('popover'), 
        __metadata('design:type', popover_1.NgbPopover)
    ], TbColumnHeader.prototype, "popover", void 0);
    TbColumnHeader = __decorate([
        core_1.Component({
            selector: 'column-header',
            template: "\n    <div class=\"column-header\">\n        <span [ngClass]=\"{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}\"\n            (click)=\"sort()\">\n            {{column.label}}\n        </span>\n        <div class=\"pull-xs-right\" [hidden]=\"column.filterMode == 0\" #popover=\"ngbPopover\" [ngbPopover]=\"filterPopoverTemplate\" placement=\"bottom\" title=\"Filter\">\n            <i class=\"fa\" [ngClass]=\"{ 'fa-filter': !isFiltering, 'fa-times': isFiltering }\"></i>\n        </div>\n    </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], TbColumnHeader);
    return TbColumnHeader;
}());
exports.TbColumnHeader = TbColumnHeader;
//# sourceMappingURL=tbColumnHeader.directive.js.map