import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { FormPopup, TubularGrid, TubularDataService } from '@tubular2/tubular2'

@Component({
    selector: 'order-popup',
    templateUrl: '/app/order-popup.component.html'
})
export class OrderPopup extends FormPopup {
    constructor(tbGrid: TubularGrid, formBuilder: FormBuilder, dataService: TubularDataService, public toastr: ToastsManager) {
        super(tbGrid, formBuilder, dataService, toastr);
    }

    getModelDefinition(): any {
        return {
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