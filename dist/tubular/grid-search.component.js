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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const grid_component_1 = require("./grid.component");
const tubular_settings_service_1 = require("./tubular-settings.service");
let GridSearchComponent = class GridSearchComponent {
    constructor(settingsProvider, tbGrid) {
        this.settingsProvider = settingsProvider;
        this.tbGrid = tbGrid;
    }
    ngOnInit() {
        // TODO: Restore value from localstorage?
    }
    clearInput() {
        this.tbGrid.freeTextSearch.next('');
        this.search = '';
    }
    setSearch(event) {
        this.tbGrid.freeTextSearch.next(event);
    }
};
GridSearchComponent = __decorate([
    core_1.Component({
        selector: 'tb-grid-search',
        template: `<div fxLayout="row" class="search-container">
        <md-icon (click)="inputField.focus()" class="icon-gray">search</md-icon>
        <input type="text" 
            [(ngModel)]="search"
            (ngModelChange)="setSearch($event)"
            #inputField
            fxFlex
            placeholder="Search..." />
        <md-icon *ngIf="search" (click)="clearInput()" class="icon-gray">close</md-icon>
    </div>`,
        styles: [
            ':host /deep/ input { border-width: 0; background-color: transparent; }',
            ':host /deep/ input:focus { outline:none; }',
            ':host /deep/ .search-container { border: 1px solid #CCC; padding: 6px;     box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); position: relative; display: inline-flex; }',
            ':host /deep/ .icon-gray { cursor: pointer; color: #CCC; }'
        ]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, grid_component_1.GridComponent])
], GridSearchComponent);
exports.GridSearchComponent = GridSearchComponent;

this.tubular2 = gridsearch_component;
}).call(this);
