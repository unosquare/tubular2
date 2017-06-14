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
let ExportButtonComponent = class ExportButtonComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
    }
    downloadCsv() {
        this.tbGrid.getFullDataSource()
            .subscribe((data) => {
            this.processCsv(data.Payload);
        });
    }
    downloadAllCsv() {
        this.tbGrid.getFullDataSource()
            .subscribe((data) => {
            this.processCsv(data.Payload);
        });
    }
    processCsv(data) {
        let headers = this.tbGrid.columns.getValue().reduce((a, b) => a + b.label + ',', '').slice(0, -1) + '\r\n';
        let rows = data.map((row) => row.reduce((a, b) => a + '"' + b + '"' + ',', '').slice(0, -1) + '\r\n');
        let csv = rows.reduce((a, b) => a + b, headers);
        let blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        // TODO: Complete: http://stackoverflow.com/questions/34177221/angular2-how-to-inject-window-into-an-angular2-service
        //saveAs(blob, this.fileName);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ExportButtonComponent.prototype, "fileName", void 0);
ExportButtonComponent = __decorate([
    core_1.Component({
        selector: 'tb-grid-export',
        template: `
    <div>
        <button md-button [mdMenuTriggerFor]="menu">
            <md-icon>file_download</md-icon>&nbsp;Export CSV
        </button>
        <md-menu #menu="mdMenu">
            <button md-menu-item (click)="downloadCsv()">Current rows</button>
            <button md-menu-item (click)="downloadAllCsv()">All rows</button>
        </md-menu>
    </div>`
    }),
    __metadata("design:paramtypes", [grid_component_1.GridComponent])
], ExportButtonComponent);
exports.ExportButtonComponent = ExportButtonComponent;
