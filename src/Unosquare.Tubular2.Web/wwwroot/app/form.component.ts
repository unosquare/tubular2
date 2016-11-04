import { Component, Output, EventEmitter, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { TubularDataService } from '@tubular2/tubular2';

@Component({
    selector: 'sample-form',
    templateUrl: '/app/form.component.html'
})
export class FormComponent {

    request: any;
    detailsForm: FormGroup;
    @Output() dataRequest = new EventEmitter<any>();

    constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, private dataService: TubularDataService) { }

    ngOnInit() {
        let id: number;

        this.route.params.forEach((params: Params) => {
            id = params['id'];
        });
        
        if (id != undefined) {
            this.getRow(id);
        } else {
            this.emptyRow();
        }
    }

    getRow(id: number): void {
        this.dataService.getData("http://tubular.azurewebsites.net/api/orders/" + id).subscribe(
            data => { this.dataRequest.emit(data); }
            );
    }

    emptyRow(): void {
        this.detailsForm = this.formBuilder.group({
            CustomerName: "",
            ShippedDate: Date,
            ShipperCity: ""
        });
    }
}
