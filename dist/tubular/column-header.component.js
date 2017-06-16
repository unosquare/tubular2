;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Column-header.component = factory();
  }
}(this, function() {
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
// TODO: Add different color if the filter is ON
let ColumnHeaderComponent = ColumnHeaderComponent_1 = class ColumnHeaderComponent {
    // TODO: Add different color if the filter is ON
    constructor() {
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
    }
    togglePopover() {
        if (ColumnHeaderComponent_1.prevPopover != null) {
            ColumnHeaderComponent_1.prevPopover.close();
        }
        if (ColumnHeaderComponent_1.prevPopover == this.popover) {
            ColumnHeaderComponent_1.prevPopover = null;
            this.popover.close();
            return;
        }
        ColumnHeaderComponent_1.prevPopover = this.popover;
        this.popover.toggle();
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
        <div class="column-menu" [hidden]="column.filterMode == 0" 
            #popover="ngbPopover" [ngbPopover]="filterPopoverTemplate" 
            placement="bottom" popoverTitle="Filter" (click)="togglePopover()">
            <md-icon>filter_list</md-icon>
        </div>
    </div>`,
        styles: [
            '.column-menu { position: relative; display: block; text-align: center; vertical-align: top; float: right; }',
            '.column-header .mat-icon { font-size: 14px; cursor: pointer; }'
        ]
    })
], ColumnHeaderComponent);
exports.ColumnHeaderComponent = ColumnHeaderComponent;
var ColumnHeaderComponent_1;

return Column-header.component;
}));
