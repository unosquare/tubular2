﻿import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormPopup, TubularGrid } from '@tubular2/tubular2'

@Component({
    selector: 'sample-popup',
    templateUrl: '/app/popup.component.html'
})
export class Popup extends FormPopup {
    constructor(tbGrid: TubularGrid, formBuilder: FormBuilder) {
        super(tbGrid, formBuilder);
    }

    getEmptyRow(): any {
        return {
            CustomerName: "",
            ShippedDate: Date,
            ShipperCity: ""
        };
    }
}