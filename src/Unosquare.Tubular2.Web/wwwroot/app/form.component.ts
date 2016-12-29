import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TbForm, TubularGrid, TubularDataService } from '@tubular2/tubular2';

@Component({
    selector: 'sample-form',
    templateUrl: '/app/form.component.html'
})
export class FormComponent extends TbForm implements OnInit{

    detailsForm: FormGroup;

    constructor(private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, public dataService: TubularDataService, private toastr: ToastsManager) {
        super(formBuilder, dataService);
     }

    ngOnInit() {
        this.detailsForm = this.tbFormInit({
            modelKey : "OrderID",
            serverUrl : "http://tubular.azurewebsites.net/api/orders/",
            saveUrl : "http://tubular.azurewebsites.net/api/orders/"
        });
    }
    
    save(){
        this.onSave({
            values: this.detailsForm.value,
            $isNew: this.$isNew
        }, 
        data => this.toastr.success("The record has been saved.", 'Success!'),
        error => {
            this.toastr.error(error, 'Save error');
            this.close();
        },
        () => this.close()
        );
    }

    close(){
        this.router.navigate(['/']);
    }

    getRow(): any{
        return {
            OrderID : this.route.snapshot.params['id'],
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
