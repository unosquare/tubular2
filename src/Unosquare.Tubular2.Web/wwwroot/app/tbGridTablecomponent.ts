﻿import { Component, Input } from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TbGrid }           from './tbGrid.component';
import { TbColumnModel } from './tbColumn.model';

export class TbGridTable {
    rows: any[];
    private columnObservable = new BehaviorSubject([]);

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
}