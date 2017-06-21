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
let PrintButtonDirective = class PrintButtonDirective {
    onClick(event) {
        this.gridInstance.getFullDataSource()
            .subscribe((data) => {
            let headers = this.gridInstance.columns.getValue().reduce((a, b) => a + '<th>' + b.label + '</th>', '');
            let rows = data.Payload.reduce((prev, row) => prev + '<tr>' +
                row.reduce((a, b) => a + '<td>' + b + '</td>', '') + '</tr>', '');
            let tableHtml = `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
            let popup = window.open('', '', 'menubar=0,location3=0,height=500,width=800');
            popup.document.write('<body onload="window.print();">');
            popup.document.write(tableHtml);
            popup.document.write('</body>');
            popup.document.close();
        });
    }
};
__decorate([
    core_1.Input('grid-print'),
    __metadata("design:type", grid_component_1.GridComponent)
], PrintButtonDirective.prototype, "gridInstance", void 0);
__decorate([
    core_1.HostListener('click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], PrintButtonDirective.prototype, "onClick", null);
PrintButtonDirective = __decorate([
    core_1.Directive({
        selector: '[grid-print]'
    })
], PrintButtonDirective);
exports.PrintButtonDirective = PrintButtonDirective;
