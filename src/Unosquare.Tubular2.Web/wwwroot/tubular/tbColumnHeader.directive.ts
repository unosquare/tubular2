import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ColumnModel } from './column';

@Component({
    selector: 'column-header',
    template: `
    <template #popContent>
        <div class="form-group">
            <label for="filter">Text</label>
            <input type="text" id="filter" class="form-control" ([ngModel])="column.filter.text" />
        </div>
        <div class="form-group">
            <label for="operator">Operator</label>
            <select id="operator" class="form-control"></select>
        </div>
        <div class="pull-xs-right clearfix">
            <button class="btn btn-sm btn-success">Filter</button>
            <button class="btn btn-sm btn-danger">Clear</button>
        </div>
    </template>

    <div class="column-header">
    <span [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
        (click)="sort()">
        {{column.label}}
    </span>
    <div class="pull-xs-right" [hidden]="column.filterMode == 0"  [ngbPopover]="popContent" placement="bottom" title="Filter">
        <i class="fa" [ngClass]="{ 'fa-filter': !isFiltering, 'fa-times': isFiltering }"></i>
    </div>
    </div>`
})
export class TbColumnHeader {
    @Input() column: ColumnModel;
    @Output() onSort = new EventEmitter<ColumnModel>();
    @Output() onFilteringChange = new EventEmitter<boolean>();
    isFiltering = false;

    sort() {
        this.onSort.emit(this.column);
    }

    toggleFilter() {
        this.isFiltering = !this.isFiltering;

        this.onFilteringChange.emit(this.isFiltering);
    }
}