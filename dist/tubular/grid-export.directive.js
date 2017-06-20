;(function () {
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
let ExportButtonDirective = class ExportButtonDirective {
    onClick(event) {
        this.gridInstance.getFullDataSource()
            .subscribe((data) => {
            const headers = this.gridInstance.columns.getValue().reduce((a, b) => a + b.label + ',', '').slice(0, -1) + '\r\n';
            const rows = data.Payload.map((row) => row.reduce((a, b) => a + '"' + b + '"' + ',', '').slice(0, -1) + '\r\n');
            const csv = rows.reduce((a, b) => a + b, headers);
            const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
            this.saveAs(blob);
        });
    }
    saveAs(blob) {
        const fileURL = window.URL.createObjectURL(blob);
        const downloadLink = window.document.createElement("a");
        downloadLink.href = fileURL;
        downloadLink.download = this.fileName || 'export.csv';
        downloadLink.target = '_self';
        downloadLink.click();
        window.URL.revokeObjectURL(fileURL);
    }
};
__decorate([
    core_1.Input('grid-export'),
    __metadata("design:type", grid_component_1.GridComponent)
], ExportButtonDirective.prototype, "gridInstance", void 0);
__decorate([
    core_1.Input('file-name'),
    __metadata("design:type", String)
], ExportButtonDirective.prototype, "fileName", void 0);
__decorate([
    core_1.HostListener('click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], ExportButtonDirective.prototype, "onClick", null);
ExportButtonDirective = __decorate([
    core_1.Directive({
        selector: '[grid-export]'
    })
], ExportButtonDirective);
exports.ExportButtonDirective = ExportButtonDirective;

this.tubular2 = gridexport_directive;
}).call(this);
