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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const grid_component_1 = require("./grid.component");
require("rxjs/add/operator/map");
let PrintButtonComponent = class PrintButtonComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
    }
    print() {
        this.tbGrid.getFullDataSource()
            .subscribe((data) => {
            let headers = this.tbGrid.columns.getValue().reduce((a, b) => a + '<th>' + b.label + '</th>', '');
            let rows = data.Payload.reduce((prev, row) => prev + '<tr>' +
                row.reduce((a, b) => a + '<td>' + b + '</td>', '') + '</tr>', '');
            let tableHtml = `<table class="table table-sm table-striped">
                    <thead><tr>${headers}</tr></thead><tbody>${rows}</tbody>
                </table>`;
            let popup = window.open('', '', 'menubar=0,location=0,height=500,width=800');
            popup.document.write('<link rel="stylesheet" ' +
                'href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
            popup.document.write('<body onload="window.print();">');
            popup.document.write(tableHtml);
            popup.document.write('</body>');
            popup.document.close();
        });
    }
};
PrintButtonComponent = __decorate([
    core_1.Component({
        selector: 'tb-grid-print',
        template: `<button class="btn btn-info btn-sm" (click)="print()">
        <span class="fa fa-print"></span>&nbsp;Print
    </button>`
    }),
    __metadata("design:paramtypes", [grid_component_1.GridComponent])
], PrintButtonComponent);
exports.PrintButtonComponent = PrintButtonComponent;
