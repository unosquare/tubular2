import { FormGroup, FormBuilder } from '@angular/forms';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';

import { TubularGrid } from './grid.component';
import { RequestMethod } from '@angular/http';

import { TubularHttpService } from './tubular-http.service';

export abstract class TbForm {
    $isNew: boolean;
    localForm: FormGroup;
    formErrors: Object;
    httpService: TubularHttpService;
    //toastr: ToastsManager;

    modelKey: string;
    serverUrl: string;
    saveUrl: string;
    hasModelKey: boolean;
    serverSaveMethod: RequestMethod;
    requireAuthentication: boolean;

    constructor(public formBuilder: FormBuilder, httpService: TubularHttpService = null) { //, toastr: ToastsManager) {
        this.formErrors = {};
        this.httpService = httpService;
        //this.toastr = toastr;
    }

    tbFormInit(options: {
        modelKey?: string,
        serverUrl?: string,
        saveUrl?: string,
        serverSaveMethod?: RequestMethod,
        requireAuthentication?: boolean
    } = {}): FormGroup {


        this.hasModelKey = options.modelKey !== undefined && options.modelKey != '';
        this.modelKey = options.modelKey || '';
        this.serverUrl = options.serverUrl || '';
        this.saveUrl = options.saveUrl || '';
        this.serverSaveMethod = options.serverSaveMethod || RequestMethod.Post;
        this.requireAuthentication = options.requireAuthentication !== undefined ? options.requireAuthentication : false;

        this.localForm = this.buildForm();

        // Try to load values if we have model key and server url
        if (this.hasModelKey &&
            this.serverUrl) {

            this.httpService.get(this.serverUrl + this.localForm.controls[this.modelKey].value, this.requireAuthentication).subscribe(
                data => {
                    for (var key in data) {

                        if (this.localForm.controls[key]) {
                            this.localForm.controls[key].setValue(data[key]);
                        }
                    }
                },
                errorMessage => console.error(errorMessage, "Application Error")
            );
        }

        // Watch for changes on form in order to trigger proper validations.
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

    onSave(row, success?: (success: any) => void, error?: (error: any) => void, complete?: () => void) {
        this.httpService
            .save(this.saveUrl, row.values, row.$isNew ? this.serverSaveMethod : RequestMethod.Put, this.requireAuthentication)
            .subscribe(
            data => success ? success(data) : this.defaultSaveSuccess(data),
            errorMessage => error ? error(errorMessage) : this.defaultSaveError(errorMessage),
            () => complete ? complete() : this.defaultSaveComplete()
            );
    }

    private defaultSaveSuccess(data) {
        console.log("Success");
    }

    private defaultSaveError(error) {
        console.log("Error");
    }

    private defaultSaveComplete() {
        console.log("Complete");
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