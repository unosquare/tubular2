import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';

import { ColumnModel } from './column';

@Component({
    selector: 'column-header',
    template: `
    <div class="column-header">
        <span [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
            (click)="sort()">
            {{column.label}}
        </span>
        <div class="pull-xs-right" [hidden]="column.filterMode == 0"  [ngbPopover]="filterPopoverTemplate" placement="bottom" title="Filter">
            <i class="fa" [ngClass]="{ 'fa-filter': !isFiltering, 'fa-times': isFiltering }"></i>
        </div>
    </div>`
})
export class TbColumnHeader {
    @Input() column: ColumnModel;
    @Output() onSort = new EventEmitter<ColumnModel>();
    @Output() onFilteringChange = new EventEmitter<boolean>();
    @ContentChild("filterPopover") private filterPopoverTemplate: TemplateRef<Object>;
    isFiltering = false;

    sort() {
        this.onSort.emit(this.column);
    }

    toggleFilter() {
        this.isFiltering = !this.isFiltering;

        this.onFilteringChange.emit(this.isFiltering);
    }
}