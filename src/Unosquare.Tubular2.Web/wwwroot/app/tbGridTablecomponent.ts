import { Component, Input } from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TbGrid }           from './tbGrid.component';
import { TbColumnModel, TbColumnSortDirection } from './tbColumn.model';

export class TbGridTable {
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
        // TODO: Check logic
        if (column.direction == TbColumnSortDirection.None)
            column.direction = TbColumnSortDirection.Asc;
        else if (column.direction == TbColumnSortDirection.Asc)
            column.direction = TbColumnSortDirection.Desc;
        else if (column.direction == TbColumnSortDirection.Desc)
            column.direction = TbColumnSortDirection.None;

        column.sortOrder = column.direction == TbColumnSortDirection.None ? 0 : 1;

        var val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    }
}