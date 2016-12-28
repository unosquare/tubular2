import { Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import * as moment from 'moment';

import { TubularGrid } from './grid.component';

import { TbForm } from './tb-form';

export abstract class FormPopup extends TbForm {
    @Input() modalRef: any;
    @Input() row: any;
    $isNew: boolean;
    detailsForm: FormGroup;
    private data: any;

    constructor(public tbGrid: TubularGrid, public formBuilder: FormBuilder) {
        super(formBuilder);
    }

    ngOnInit() {

        this.detailsForm = this.tbFormInit();
    }

    close() {
        this.modalRef.close();
    }

    save() {

        this.tbGrid.onUpdate({
            values: this.detailsForm.value,
            $isNew: this.$isNew
        });

        this.modalRef.close();
    }

    getRow(): any {
        return this.row;
    };

    abstract getModelDefinition(): any;
}