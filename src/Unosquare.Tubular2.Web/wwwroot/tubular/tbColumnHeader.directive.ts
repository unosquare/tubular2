import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TbColumnModel } from './column';

@Component({
    selector: 'column-header',
    template: `
    <div class="column-header">
    <span [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
        (click)="sort()">
        {{column.label }}
    </span>
    <div class="pull-xs-right" [hidden]="column.filterMode == 0" (click)="toggleFilter()">
        <i class="fa" [ngClass]="{ 'fa-filter': !isFiltering, 'fa-times': isFiltering }"></i>
    </div>
    <div [hidden]="!isFiltering">
        <form>
            <input type="text" class="form-control" ([ngModel])="column.filterText" />
            <button class="btn btn-sm btn-success">Filter</button>
            <button class="btn btn-sm btn-danger">Clear</button>
        </form>
    </div>
    </div>`,
    styles: [
        // TODO: This is not working
        '.column-header { height: 100%; vertical-align: top; transition: width 2s ease, height 2s ease; }'
    ]
})
export class TbColumnHeader {
    @Input() column: TbColumnModel;
    @Output() onSort = new EventEmitter<TbColumnModel>();
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