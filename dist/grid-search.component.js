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
        selector: 'grid-search',
        template: `<div>
                    <div class="input-group input-group-sm">
                    <span class="input-group-addon"><i class="fa fa-search"></i></span>
                        <input #toSearch type="text" class="form-control" 
                        [(ngModel)]="search"
                        (ngModelChange)="setSearch($event)"
                        placeholder="search . . ." />
                        <span class="input-group-btn" [hidden]="!toSearch.value">
                            <button class="btn btn-default" (click)="clearInput()">
                            <i class="fa fa-times-circle"></i>
                            </button>
                        </span>
                    </div>
                </div>`
    }),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, grid_component_1.GridComponent])
], GridSearchComponent);
exports.GridSearchComponent = GridSearchComponent;
