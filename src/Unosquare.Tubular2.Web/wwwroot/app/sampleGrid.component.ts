import { Component,
    Input,
    trigger,
    state, 
    style,
    transition,
    animate } from '@angular/core';

import { TbGrid, TbGridTable, TbColumnModel, ColumnFilterMode } from '../tubular';

@Component({
    selector: 'grid',
    templateUrl: '/app/sampleGrid.component.html',
    animations: [
        trigger('rowState', [
            state('false', style({
                'max-height': '100%',
                display: 'block'
            })),
            state('true', style({
                'max-height': '0',
                display: 'none'
            })),
            transition('false => true', animate('1s ease-in')),
            transition('true => false', animate('1s ease-out'))
        ])
    ]
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