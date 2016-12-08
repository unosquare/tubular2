// import { Input, Output, EventEmitter} from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import * as moment from 'moment';

import { TubularGrid } from './grid.component';

export abstract class TbForm {
    $isNew: boolean;
    localForm: FormGroup;
    formErrors: Object;

    constructor(public formBuilder: FormBuilder) {
        this.formErrors = {};
    }

    tbFormInit(): void {
        this.localForm = this.buildForm();

        this.localForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {

        if (!this.localForm) { return; }

        for (const field in this.localForm.controls) {
            // clear previous error message (if any)
            this.formErrors[field] = [];
            const control = this.localForm.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field].push(messages[key]);
                }
            }
        }
    }

    abstract buildForm(): FormGroup;

    abstract validationMessages : {};

}