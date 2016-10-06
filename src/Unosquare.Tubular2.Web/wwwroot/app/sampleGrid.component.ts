import { Component, Input} from '@angular/core';

import { TubularGrid, GridTable, ColumnModel, ColumnFilterMode } from '../tubular';

@Component({
    selector: 'grid',
    templateUrl: '/app/sampleGrid.component.html'
})

export class SampleGrid extends GridTable {
    popupRef: any;

    constructor(private tbGrid: TubularGrid) {
        super(tbGrid);
        let orderIdColumn = new ColumnModel("OrderID", false);
        orderIdColumn.filterMode = ColumnFilterMode.Number;

        let customerColumn = new ColumnModel("CustomerName");
        customerColumn.filterMode = ColumnFilterMode.String;

        let dateColumn = new ColumnModel("ShippedDate", false);
        dateColumn.filterMode = ColumnFilterMode.Date;

        let cityColumn = new ColumnModel("ShipperCity");
        cityColumn.filterMode = ColumnFilterMode.String;
        
        this.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            cityColumn
        ]);
    }

    setPopup(ref) {
        this.popupRef = ref;

        // this.popupRef.result
    }
}