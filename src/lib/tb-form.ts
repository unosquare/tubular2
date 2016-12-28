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

    tbFormInit(): FormGroup {
        this.localForm = this.buildForm();

        this.localForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

        return this.localForm;
    }

    onValueChanged(data?: any) {

        if (!this.localForm) { return; }

        for (const field in this.localForm.controls) {
            // clear previous error message (if any)
            this.formErrors[field] = [];
            const control = this.localForm.get(field);

            if (control && control.dirty && !control.valid) {

                for (const key in control.errors) {
                    this.formErrors[field].push(this.getErrorMessage(field, key));
                }
            }
        }
    }

    private getVal(data, field): any {
        if (data === undefined)
            return "";

        if (moment.isMoment(data[field])) {
            return data[field].format('YYYY-MM-DDThh:mm');
        } else {
            return data[field];
        }
    }

    private getErrorMessage(fieldName: string, validator: string): string {
        if (this.validationMessages === undefined || this.validationMessages[fieldName] === undefined) {
            let friendlyFieldName = this.getFriendlyFieldName(fieldName);

            switch (validator) {
                case "required":
                    return `${friendlyFieldName} is required.`;
                case "minlength":
                    return `${friendlyFieldName} must be at least 4 characters long.`;
                case "maxlength":
                    return `${friendlyFieldName} cannot be more than 24 characters long.`;
                default:
                    return `Invalid field.`;
            }
        }
        else {
            return this.validationMessages[fieldName][validator];
        }


    }

    private getFriendlyFieldName(fieldName: string): string {
        return fieldName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase(); });
    }

    buildForm(): FormGroup {
        let rowData = this.getRow();
        let data = {};
        let modelDefinition = this.getModelDefinition();

        this.$isNew = !rowData;

        for (let field in modelDefinition) {
            data[field] = [this.getVal(rowData, field), modelDefinition[field]];
        }

        return this.formBuilder.group(data);
    }

    abstract getRow(): any;
    abstract getModelDefinition(): any;

    validationMessages: {};

}