import { Input, Output, EventEmitter} from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import * as moment from 'moment';

import { TubularGrid }      from './grid.component';

export abstract class FormPopup {

    @Input() modalRef: any;
    @Input('row') row: any;
    $isNew: boolean;
    detailsForm: FormGroup;
    private data: any;

    constructor(public tbGrid: TubularGrid, public formBuilder: FormBuilder) {
    }

    ngOnInit() {
        let tempData = this.row || this.getEmptyRow();
        this.data = {};

        for (let field in tempData) {
            if (moment.isMoment(tempData[field])) {
                this.data[field] = [tempData[field].format('YYYY-MM-DDThh:mm')];
            } else {
                this.data[field] = [tempData[field]];
            }
        }

        this.detailsForm = this.formBuilder.group(this.data);
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