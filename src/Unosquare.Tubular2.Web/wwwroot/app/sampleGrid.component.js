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
var tubular_1 = require('../tubular');
var SampleGrid = (function (_super) {
    __extends(SampleGrid, _super);
    function SampleGrid(tbGrid) {
        _super.call(this, tbGrid);
        this.tbGrid = tbGrid;
        var customerColumn = new tubular_1.TbColumnModel("CustomerName");
        customerColumn.filterMode = tubular_1.ColumnFilterMode.String;
        this.addColumns([
            new tubular_1.TbColumnModel("OrderID", false, true),
            customerColumn,
            new tubular_1.TbColumnModel("ShippedDate", false, false),
            new tubular_1.TbColumnModel("ShipperCity")
        ]);
    }
    SampleGrid.prototype.layoutChange = function (isFiltering) {
        this.isFiltering = isFiltering;
    };
    SampleGrid = __decorate([
        core_1.Component({
            selector: 'grid',
            templateUrl: '/app/sampleGrid.component.html',
            animations: [
                core_1.trigger('rowState', [
                    core_1.state('false', core_1.style({
                        'max-height': '100%',
                        display: 'block'
                    })),
                    core_1.state('true', core_1.style({
                        'max-height': '0',
                        display: 'none'
                    })),
                    core_1.transition('false => true', core_1.animate('1s ease-in')),
                    core_1.transition('true => false', core_1.animate('1s ease-out'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [tubular_1.TbGrid])
    ], SampleGrid);
    return SampleGrid;
}(tubular_1.TbGridTable));
exports.SampleGrid = SampleGrid;
//# sourceMappingURL=sampleGrid.component.js.map