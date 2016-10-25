import { Input } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import { TubularGrid }      from './grid.component';

export abstract class FormPopup {
    @Input('popupRef') popupRef: any;
    @Input('row') row: any;
    $isNew: boolean;
    detailsForm: FormGroup;

    constructor(public tbGrid: TubularGrid, public formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.detailsForm = this.formBuilder.group(this.row || this.getEmptyRow());
        this.$isNew = !this.row;
    }
    
    close() {
        this.popupRef.dismiss();
    }

    save() {
        this.popupRef.close({
            'values': this.detailsForm.value,
            '$isNew': this.$isNew
        });
    }

    abstract getEmptyRow(): any;
}