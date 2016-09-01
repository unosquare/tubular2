import { Component, Input } from '@angular/core';

import { TbGrid } from './tbGrid.component';
import { TbGridTable } from './tbGridTablecomponent';
import { TbColumnModel } from './tbColumn.model';

@Component({
    selector: 'grid',
    template: `
    <table>
        <thead>
            <td *ngFor="let column of columns | async" columnHeader [sortable]="column.sortable">
                {{column.name}}
            </td>
        </thead>
        <tbody>
        <tr *ngFor="let row of rows">
            <td>{{row.OrderID}}</td>
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