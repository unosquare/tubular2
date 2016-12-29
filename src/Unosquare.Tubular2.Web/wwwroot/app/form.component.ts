import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TbForm, TubularGrid, TubularDataService } from '@tubular2/tubular2';

@Component({
    selector: 'sample-form',
    templateUrl: '/app/form.component.html'
})
export class FormComponent extends TbForm implements OnInit{

    request: any;
    detailsForm: FormGroup;
    private _row = new BehaviorSubject(this.getRow());
    row = this._row.asObservable();

    constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, public dataService: TubularDataService) {
        super(formBuilder, dataService);
     }

    ngOnInit() {
        let id: number;

        //TODO: investigar eliminar foreach
        this.route.params.forEach((params: Params) => {
            id = params['id'];
        });

        this.detailsForm = this.tbFormInit({
            modelKey : "OrderID",
            serverUrl : "http://tubular.azurewebsites.net/api/orders/"
        });
    }

    getRow(): any{
        return {
            OrderID : 3,
            CustomerName: "",
            ShippedDate: Date,
            ShipperCity : ""
        };
    }

    getModelDefinition(): any {
        return  {
            OrderID: [],
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

    validationMessages = {
        'CustomerName': {
            'required': 'Customer Name is required.',
            'minlength': 'Customer Name must be at least 4 characters long.',
            'maxlength': 'Customer Name cannot be more than 24 characters long.'
        },
        'ShipperCity': {
            'required': 'City is required.'
        }
    };

}
