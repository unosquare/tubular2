import { Input, Output, EventEmitter} from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import { TubularGrid }      from './grid.component';

export abstract class FormPopup {

    @Input() modalRef: any;
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
        this.modalRef.close();
    }
    
    save() {

        this.tbGrid.onUpdate({
            'values': this.detailsForm.value,
            '$isNew': this.$isNew
        });

        this.modalRef.close();
    }

    abstract getEmptyRow(): any;
}