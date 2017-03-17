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
const column_model_1 = require("./column.model");
let ColumnHeaderComponent = ColumnHeaderComponent_1 = class ColumnHeaderComponent {
    constructor() {
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
    }
    togglePopover() {
        if (ColumnHeaderComponent_1.prevPopover != null) {
            ColumnHeaderComponent_1.prevPopover.close();
            if (ColumnHeaderComponent_1.prevPopover === this.popover) {
                ColumnHeaderComponent_1.prevPopover = null;
                this.popover.toggle();
                return;
            }
        }
        ColumnHeaderComponent_1.prevPopover = this.popover;
    }
    sort($event) {
        this.column.isMultiSort = $event.ctrlKey;
        if (this.column.sortable) {
            this.onSort.emit(this.column);
        }
    }
    filter(hasValue) {
        ColumnHeaderComponent_1.prevPopover = null;
        this.popover.close();
        this.hasFilter = hasValue;
        this.onFilter.emit(this.column);
    }
};
ColumnHeaderComponent.prevPopover = null;
__decorate([
    core_1.Input(),
    __metadata("design:type", column_model_1.ColumnModel)
], ColumnHeaderComponent.prototype, "column", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ColumnHeaderComponent.prototype, "onSort", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ColumnHeaderComponent.prototype, "onFilter", void 0);
__decorate([
    core_1.ContentChild('filterPopover'),
    __metadata("design:type", core_1.TemplateRef)
], ColumnHeaderComponent.prototype, "filterPopoverTemplate", void 0);
__decorate([
    core_1.ViewChild('popover'),
    __metadata("design:type", Object)
], ColumnHeaderComponent.prototype, "popover", void 0);
ColumnHeaderComponent = ColumnHeaderComponent_1 = __decorate([
    core_1.Component({
        selector: 'tb-column-header',
        template: `
    <div class="column-header">
        <span 
            [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
            (click)="sort($event)">
            {{column.label}}
        </span>
        <div class="column-menu" [hidden]="column.filterMode == 0">
            <button class="btn btn-sm" [ngClass]="{ 'btn-success': hasFilter }"
                #popover="ngbPopover" [ngbPopover]="filterPopoverTemplate" 
                placement="left-bottom" title="Filter" (click)="togglePopover()">
                <i class="fa fa-filter"></i>
            </button>
        </div>
    </div>`,
        styles: [
            '.column-menu { position: relative; display: block; text-align: center; vertical-align: top; float: right; }',
            '.column-menu button { border-radius: 30px !important; line-height: 10px; margin: 0; padding: .25rem; }',
            '.column-menu button i { font-size: 12px; }'
        ]
    })
], ColumnHeaderComponent);
exports.ColumnHeaderComponent = ColumnHeaderComponent;
var ColumnHeaderComponent_1;
