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
require("rxjs/add/operator/debounceTime");
class PageSizeInfo {
    constructor() {
        this.value = 0;
        this.selected = false;
    }
}
exports.PageSizeInfo = PageSizeInfo;
let PageSizeSelectorComponent = class PageSizeSelectorComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this._options = [10, 20, 50, 100];
    }
    set in(options) {
        if (options) {
            this._options = options;
        }
    }
    ngOnInit() {
        this.selected = this.tbGrid._pageSize.getValue();
    }
    onChange(newVal) {
        this.tbGrid._pageSize.next(newVal);
    }
};
__decorate([
    core_1.Input('options'),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], PageSizeSelectorComponent.prototype, "in", null);
PageSizeSelectorComponent = __decorate([
    core_1.Component({
        selector: 'tb-page-size-selector',
        template: `
    <form class="form-inline">
        <div class="form-group">
            <label class="small">Page size</label>&nbsp;
            <select (change)="onChange($event.target.value)" class="form-control form-control-sm" 
                [(ngModel)]="selected" [ngModelOptions]="{standalone: true}">
                <option *ngFor="let obj of _options" [value]="obj">{{obj}}</option>
            </select>
        </div>
    </form>`
    }),
    __metadata("design:paramtypes", [grid_component_1.GridComponent])
], PageSizeSelectorComponent);
exports.PageSizeSelectorComponent = PageSizeSelectorComponent;
