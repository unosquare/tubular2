import { Component, Input } from '@angular/core';

import { TbGrid } from './tbGrid.component';
import { TbGridTable } from './tbGridTablecomponent';
import { TbColumnModel } from './tbColumn.model';

@Component({
    selector: 'grid',
    template: `
    <table class="table table-sm table-striped table-inverse">
        <thead>
            <tr>
                <th *ngFor="let column of columns | async" 
                    [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
                    (click)="sort(column)">
                    {{column.label}}
                </th>
            </tr>
        </thead>
        <tbody>
        <tr *ngFor="let row of rows">
            <td >{{row.OrderID}}</td>
            <td>{{row.CustomerName}}</td>
            <td>{{row.ShippedDate | date}}</td>
            <td>{{row.ShipperCity}}</td>
        </tr>
        </tbody>
    </table>`
})
export class SampleGrid extends TbGridTable {
    constructor(private tbGrid: TbGrid) {
        super(tbGrid);

        this.addColumns([
            new TbColumnModel("OrderID", false, true),
            new TbColumnModel("CustomerName"),
            new TbColumnModel("ShippedDate", false, false),
            new TbColumnModel("ShipperCity")
        ]);
    }
}