import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
  
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TubularDataService } from '@tubular2/tubular2';

@Component({
    selector: 'sample-form',
    templateUrl: '/app/form.component.html'
})
export class FormComponent {

    request: any;
    detailsForm: FormGroup;
    private _row = new BehaviorSubject(this.emptyRow());
    row = this._row.asObservable();

    constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, private dataService: TubularDataService) { }

    ngOnInit() {
        let id: number;
        this.row.subscribe(() => {
            this.formBuild();
        });

        this.route.params.forEach((params: Params) => {
            id = params['id'];
        });
        
        if (id != undefined) {
            this.getRow(id);
        }
    }

    getRow(id: number): void {
        this.dataService.getData("http://tubular.azurewebsites.net/api/orders/" + id).subscribe(
            data => { this._row.next(data); }
            );
    }

    formBuild(): void {
        this.detailsForm = this.formBuilder.group(this._row.value);
    }


    emptyRow(): any {
        return {
            CustomerName: "",
            ShippedDate: Date,
            ShipperCity: ""
        };
    }
}
