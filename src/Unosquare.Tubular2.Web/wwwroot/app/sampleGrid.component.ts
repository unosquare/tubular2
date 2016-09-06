import { Component, Input } from '@angular/core';

import { TbGrid, TbGridTable, TbColumnModel, ColumnFilterMode } from '../tubular';

@Component({
    selector: 'grid',
    templateUrl: '/app/sampleGrid.component.html'
})
export class SampleGrid extends TbGridTable {
    constructor(private tbGrid: TbGrid) {
        super(tbGrid);
        
        let customerColumn = new TbColumnModel("CustomerName");
        customerColumn.filterMode = ColumnFilterMode.String;

        this.addColumns([
            new TbColumnModel("OrderID", false, true),
            customerColumn,
            new TbColumnModel("ShippedDate", false, false),
            new TbColumnModel("ShipperCity")
        ]);
    }

    layoutChange(isFiltering: boolean) {
        this.isFiltering = isFiltering;
    }
}