import { Input, Output, EventEmitter } from '@angular/core';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

import * as moment from 'moment';

import { GridComponent } from './grid.component';
import { TubularHttpService } from './tubular-http.service';

import { TbForm } from './tb-form';

export abstract class FormPopup extends TbForm {
    @Input() public modalRef: any;
    @Input() public row: any;
    public $isNew: boolean;
    private detailsForm: FormGroup;
    private data: any;

    constructor(
        public tbGrid: GridComponent,  // TODO: Refactor, why we need the GridComponent?
        public formBuilder: FormBuilder, 
        public httpService: TubularHttpService) {// , public toastr: ToastsManager) {
        super(formBuilder, httpService); //, toastr);
    }

    private ngOnInit() {
        this.detailsForm = this.tbFormInit({
            saveUrl: this.tbGrid.saveUrl
        });
    }

    public close() {
        this.modalRef.close();
    }

    public save() {
        this.onSave({
            values: this.detailsForm.value,
            $isNew: this.$isNew
        },
            (data) => console.log('Saved'),
            (error) => {
                console.log('Save error');
                this.close();
            },
            () => console.log('Completed'));
    }

    public getRow(): any {
        return this.row;
    };

    public abstract getModelDefinition(): any;
}
