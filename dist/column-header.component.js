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
var ColumnHeader = (function () {
    function ColumnHeader() {
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
    }
    ColumnHeader.prototype.togglePopover = function () {
        if (ColumnHeader.prevPopover != null) {
            ColumnHeader.prevPopover.close();
            if (ColumnHeader.prevPopover === this.popover) {
                ColumnHeader.prevPopover = null;
                this.popover.toggle();
                return;
            }
        }
        ColumnHeader.prevPopover = this.popover;
    };
    ColumnHeader.prototype.sort = function ($event) {
        this.column.isMultiSort = $event.ctrlKey;
        if (this.column.sortable) {
            this.onSort.emit(this.column);
        }
    };
    ColumnHeader.prototype.filter = function (hasValue) {
        ColumnHeader.prevPopover = null;
        this.popover.close();
        this.hasFilter = hasValue;
        this.onFilter.emit(this.column);
    };
    ColumnHeader.prevPopover = null;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', column_1.ColumnModel)
    ], ColumnHeader.prototype, "column");
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ColumnHeader.prototype, "onSort");
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ColumnHeader.prototype, "onFilter");
    __decorate([
        core_1.ContentChild('filterPopover'), 
        __metadata('design:type', core_1.TemplateRef)
    ], ColumnHeader.prototype, "filterPopoverTemplate");
    __decorate([
        core_1.ViewChild('popover'), 
        __metadata('design:type', Object)
    ], ColumnHeader.prototype, "popover");
    ColumnHeader = __decorate([
        core_1.Component({
            selector: 'column-header',
            template: "\n    <div class=\"column-header\">\n        <span [ngClass]=\"{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}\"\n            (click)=\"sort($event)\">\n            {{column.label}}\n        </span>\n        <div class=\"column-menu\" [hidden]=\"column.filterMode == 0\">\n            <button class=\"btn btn-sm\" [ngClass]=\"{ 'btn-success': hasFilter }\"\n                #popover=\"ngbPopover\" [ngbPopover]=\"filterPopoverTemplate\" \n                placement=\"left-bottom\" title=\"Filter\" (click)=\"togglePopover()\">\n                <i class=\"fa fa-filter\"></i>\n            </button>\n        </div>\n    </div>",
            styles: [
                '.column-menu { position: relative; display: block; text-align: center; vertical-align: top; float: right; }',
                '.column-menu button { border-radius: 30px !important; line-height: 10px; margin: 0; padding: .25rem; }',
                '.column-menu button i { font-size: 12px; }'
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ColumnHeader);
    return ColumnHeader;
}());
exports.ColumnHeader = ColumnHeader;
