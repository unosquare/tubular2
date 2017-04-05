import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'tb-order-modal',
    templateUrl: '/app/order.component.html'
})
export class OrderComponent implements OnInit {
    orderForm: FormGroup;

    @Input() name;
    @Input() model;
    @Input() isNew: boolean;

    constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {

    }

    ngOnInit(): void {

        this.orderForm = this.fb.group({
            CustomerName: [this.isNew ? '' : this.model.CustomerName, Validators.required],
            ShipperCity: [this.isNew ? '' : this.model.ShipperCity, Validators.required],
            ShippedDate: [this.isNew ? '' : this.model.ShippedDate, Validators.required]
        });
    }

}
