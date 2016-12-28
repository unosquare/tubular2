import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormPopup, TubularGrid } from '@tubular2/tubular2'

@Component({
    selector: 'order-popup',
    templateUrl: '/app/order-popup.component.html'
})
export class OrderPopup extends FormPopup {
    constructor(tbGrid: TubularGrid, formBuilder: FormBuilder) {
        super(tbGrid, formBuilder);
    }

    getModelDefinition(): any {
        return  {
            CustomerName: [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)
            ],
            ShippedDate: [],
            ShipperCity: [
                Validators.required
            ]
        }
    }
}