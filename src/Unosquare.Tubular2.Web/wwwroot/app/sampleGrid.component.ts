import { Component, Input } from '@angular/core';

import { TbGrid } from './tbGrid.component';
import { TbGridTable } from './tbGridTablecomponent';

@Component({
    selector: 'grid',
    template: `
    <table>
        <thead>
            <td *ngFor="let column of columns | async" columnHeader [sortable]="column.Sortable">{{column.Name}}</td>
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
            { Name: "OrderID", Sortable: true },
            { Name: "CustomerName", Sortable: true, Searchable: true },
            { Name: "ShippedDate", Sortable: false },
            { Name: "ShipperCity", Sortable: true, Searchable: true }
        ]);
    }
}