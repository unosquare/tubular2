import { Component, Input } from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TbGrid }           from './tbGrid.component';
import { TbColumnModel, ColumnSortDirection } from './column';

export class TbGridTable {
    isFiltering: boolean = false;
    rows: any[];
    private columnObservable: BehaviorSubject<TbColumnModel[]> = new BehaviorSubject([]);

    columns = this.columnObservable.asObservable();

    constructor(tbGrid: TbGrid) {
        tbGrid.dataStream.subscribe(payload => this.rows = payload);
        this.columnObservable.subscribe(payload => tbGrid.columns.next(payload));
    }

    addColumns(columns: TbColumnModel[]) {
        columns.forEach(c => {
            var val = this.columnObservable.getValue();
            val.push(c);
            this.columnObservable.next(val);
        });
    }

    sort(column: TbColumnModel) {
        // TODO: Check logic from previous
        if (column.direction == ColumnSortDirection.None)
            column.direction = ColumnSortDirection.Asc;
        else if (column.direction == ColumnSortDirection.Asc)
            column.direction = ColumnSortDirection.Desc;
        else if (column.direction == ColumnSortDirection.Desc)
            column.direction = ColumnSortDirection.None;

        column.sortOrder = column.direction == ColumnSortDirection.None ? 0 : 1;

        var val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    }
}