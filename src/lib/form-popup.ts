import { Input, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

import * as moment from 'moment';

import { TubularGrid } from './grid.component';
import { TubularDataService } from './tubular-data.service';

import { TbForm } from './tb-form';

export abstract class FormPopup extends TbForm {
    @Input() modalRef: any;
    @Input() row: any;
    $isNew: boolean;
    detailsForm: FormGroup;
    private data: any;

    constructor(public tbGrid: TubularGrid, public formBuilder: FormBuilder, public dataService: TubularDataService, public toastr: ToastsManager) {
        super(formBuilder, dataService, toastr);
    }

    ngOnInit() {

        this.detailsForm = this.tbFormInit({
            saveUrl: this.tbGrid.serverSaveUrl
        });
    }

    close() {
        this.modalRef.close();
    }

    save() {
        this.onSave({
            values: this.detailsForm.value,
            $isNew: this.$isNew
        },
            data => console.log("Saved"),
            error => {
                console.log('Save error');
                this.close();
            },
            () => console.log("Completed"));
    }

    getRow(): any {
        return this.row;
    };

    abstract getModelDefinition(): any;
}