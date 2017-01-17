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
var core_1 = require("@angular/core");
var grid_component_1 = require("./grid.component");
require("rxjs/add/operator/debounceTime");
var PageSizeInfo = (function () {
    function PageSizeInfo() {
        this.value = 0;
        this.selected = false;
    }
    return PageSizeInfo;
}());
exports.PageSizeInfo = PageSizeInfo;
var PageSizeSelector = (function () {
    function PageSizeSelector(tbGrid) {
        this.tbGrid = tbGrid;
        this._options = [10, 20, 50, 100];
    }
    Object.defineProperty(PageSizeSelector.prototype, "in", {
        set: function (options) {
            if (options != undefined)
                this._options = options;
        },
        enumerable: true,
        configurable: true
    });
    PageSizeSelector.prototype.ngOnInit = function () {
        this.selected = this.tbGrid._pageSize.getValue();
    };
    PageSizeSelector.prototype.onChange = function (newVal) {
        this.tbGrid._pageSize.next(newVal);
    };
    return PageSizeSelector;
}());
__decorate([
    core_1.Input('options'),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], PageSizeSelector.prototype, "in", null);
PageSizeSelector = __decorate([
    core_1.Component({
        selector: 'page-size-selector',
        template: "\n    <form class=\"form-inline\">\n        <div class=\"form-group\">\n            <label class=\"small\">Page size</label>&nbsp;\n            <select (change)=\"onChange($event.target.value)\" class=\"form-control form-control-sm\" \n                [(ngModel)]=\"selected\" [ngModelOptions]=\"{standalone: true}\">\n                <option *ngFor=\"let obj of _options\" [value]=\"obj\">{{obj}}</option>\n            </select>\n        </div>\n    </form>"
    }),
    __metadata("design:paramtypes", [grid_component_1.TubularGrid])
], PageSizeSelector);
exports.PageSizeSelector = PageSizeSelector;
