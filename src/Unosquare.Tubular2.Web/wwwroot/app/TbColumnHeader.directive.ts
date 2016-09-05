import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TbColumnModel } from './tbColumn.model';

@Component({
    selector: 'column-header',
    template: `
    <span [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
        (click)="sort()">
        {{column.label }}
    </span>`
})
export class TbColumnHeader {
    @Input() column: TbColumnModel;
    @Output() onSort = new EventEmitter<TbColumnModel>();

    sort() {
        this.onSort.emit(this.column);
    }
}