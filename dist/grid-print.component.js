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
var grid_component_1 = require('./grid.component');
var PrintButton = (function () {
    function PrintButton(tbGrid) {
        this.tbGrid = tbGrid;
    }
    PrintButton.prototype.print = function () {
        var _this = this;
        this.tbGrid.getFullDataSource(function (data) {
            var headers = _this.tbGrid.columns.getValue().reduce(function (a, b) { return a + '<th>' + b.label + '</th>'; }, '');
            var rows = data.map(function (row) {
                if (typeof (row) === 'object') {
                    return '<tr>' + row.reduce(function (a, b) { return a + '<td>' + b + '</td>'; }, '') + '</tr>';
                }
            });
            var tableHtml = '<table class="table table-bprdered table-striped"><thead><tr>'
                + headers
                + '</tr></thead><tbody>'
                + rows.join("")
                + '</tbody></table>';
            var popup = window.open("", "", "menubar=0,location=0,height=500,width=800");
            popup.document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
            popup.document.write('<body onload="window.print();">');
            popup.document.write(tableHtml);
            popup.document.write('</body>');
            popup.document.close();
        });
    };
    PrintButton = __decorate([
        core_1.Component({
            selector: 'grid-print',
            template: "<button class=\"btn btn-info btn-sm\" (click)=\"print()\">\n        <span class=\"fa fa-print\"></span>&nbsp;Print\n    </button>"
        }), 
        __metadata('design:paramtypes', [grid_component_1.TubularGrid])
    ], PrintButton);
    return PrintButton;
}());
exports.PrintButton = PrintButton;
