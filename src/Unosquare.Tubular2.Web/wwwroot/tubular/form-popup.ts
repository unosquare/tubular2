import { Input } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import { TubularGrid }      from './grid.component';

export abstract class FormPopup {
    @Input('popupRef') popupRef: any;
    @Input('row') row: any;
    detailsForm: FormGroup;

    constructor(public tbGrid: TubularGrid, public formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.detailsForm = this.formBuilder.group(this.row || this.getEmptyRow());
    }
    
    close() {
        this.popupRef.dismiss();
    }

    save() {
        this.popupRef.close(this.detailsForm.value);
    }

    abstract getEmptyRow(): any;
}