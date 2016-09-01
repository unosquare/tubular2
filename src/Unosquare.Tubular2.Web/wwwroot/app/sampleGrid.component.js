"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var tbGrid_component_1 = require('./tbGrid.component');
var tbGridTablecomponent_1 = require('./tbGridTablecomponent');
var tbColumn_model_1 = require('./tbColumn.model');
var SampleGrid = (function (_super) {
    __extends(SampleGrid, _super);
    function SampleGrid(tbGrid) {
        _super.call(this, tbGrid);
        this.tbGrid = tbGrid;
        this.addColumns([
            new tbColumn_model_1.TbColumnModel("OrderID", false, true),
            new tbColumn_model_1.TbColumnModel("CustomerName"),
            new tbColumn_model_1.TbColumnModel("ShippedDate", false, false),
            new tbColumn_model_1.TbColumnModel("ShipperCity")
        ]);
    }
    SampleGrid = __decorate([
        core_1.Component({
            selector: 'grid',
            template: "\n    <table class=\"table table\">\n        <thead>\n            <tr>\n                <td *ngFor=\"let column of columns | async\" \n                    [ngClass]=\"{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}\"\n                    (click)=\"sort(column)\">\n                    {{column.label}}\n                </td>\n            </tr>\n        </thead>\n        <tbody>\n        <tr *ngFor=\"let row of rows\">\n            <td >{{row.OrderID}}</td>\n            <td>{{row.CustomerName}}</td>\n            <td>{{row.ShippedDate | date}}</td>\n            <td>{{row.ShipperCity}}</td>\n        </tr>\n        </tbody>\n    </table>"
        }), 
        __metadata('design:paramtypes', [tbGrid_component_1.TbGrid])
    ], SampleGrid);
    return SampleGrid;
}(tbGridTablecomponent_1.TbGridTable));
exports.SampleGrid = SampleGrid;
//# sourceMappingURL=sampleGrid.component.js.map