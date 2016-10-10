import { Input } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import { TubularGrid }      from './grid.component';

export class FormPopup {
    @Input('popupRef') popupRef: any;
    @Input('row') row: any;
    detailsForm: FormGroup;

    constructor(public tbGrid: TubularGrid, public formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.detailsForm = this.formBuilder.group(this.row);
    }
    
    close() {
        this.popupRef.close();
    }

    save() {
        this.tbGrid._updateRow.next(this.detailsForm.value);
        this.popupRef.close();
    }
}