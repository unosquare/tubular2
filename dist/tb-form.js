"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
const moment = require("moment");
const http_1 = require("@angular/http");
class TbForm {
    constructor(formBuilder, httpService = null) {
        this.formBuilder = formBuilder;
        this.formErrors = {};
        this.httpService = httpService;
        //this.toastr = toastr;
    }
    tbFormInit(options = {}) {
        this.hasModelKey = options.modelKey !== undefined && options.modelKey !== '';
        this.modelKey = options.modelKey || '';
        this.serverUrl = options.serverUrl || '';
        this.saveUrl = options.saveUrl || '';
        this.serverSaveMethod = options.serverSaveMethod || http_1.RequestMethod.Post;
        this.requireAuthentication = options.requireAuthentication !== undefined ? options.requireAuthentication : false;
        this.localForm = this.buildForm();
        // Try to load values if we have model key and server url
        if (this.hasModelKey && this.serverUrl) {
            this.httpService.get(this.serverUrl + this.localForm.controls[this.modelKey].value, this.requireAuthentication)
                .subscribe((data) => {
                for (let key in data) {
                    if (this.localForm.controls[key]) {
                        this.localForm.controls[key].setValue(data[key]);
                    }
                }
            }, (errorMessage) => console.error(errorMessage, 'Application Error'));
        }
        // Watch for changes on form in order to trigger proper validations.
        this.localForm.valueChanges
            .subscribe((data) => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
        return this.localForm;
    }
    onValueChanged(data) {
        if (!this.localForm) {
            return;
        }
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
    onSave(row, success, error, complete) {
        this.httpService
            .save(this.saveUrl, row.values, row.$isNew ? this.serverSaveMethod : http_1.RequestMethod.Put, this.requireAuthentication)
            .subscribe((data) => success ? success(data) : this.defaultSaveSuccess(data), (errorMessage) => error ? error(errorMessage) : this.defaultSaveError(errorMessage), () => complete ? complete() : this.defaultSaveComplete());
    }
    defaultSaveSuccess(data) {
        console.log('Success');
    }
    defaultSaveError(error) {
        console.log('Error');
    }
    defaultSaveComplete() {
        console.log('Complete');
    }
    getVal(data, field) {
        if (data === undefined) {
            return '';
        }
        if (moment.isMoment(data[field])) {
            return data[field].format('YYYY-MM-DDThh:mm');
        }
        else {
            return data[field];
        }
    }
    getErrorMessage(fieldName, validator) {
        if (this.validationMessages === undefined || this.validationMessages[fieldName] === undefined) {
            let friendlyFieldName = this.getFriendlyFieldName(fieldName);
            switch (validator) {
                case 'required':
                    return `${friendlyFieldName} is required.`;
                case 'minlength':
                    return `${friendlyFieldName} must be at least 4 characters long.`;
                case 'maxlength':
                    return `${friendlyFieldName} cannot be more than 24 characters long.`;
                default:
                    return `Invalid field.`;
            }
        }
        else {
            return this.validationMessages[fieldName][validator];
        }
    }
    getFriendlyFieldName(fieldName) {
        return fieldName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
    }
    buildForm() {
        let rowData = this.getRow();
        let data = {};
        let modelDefinition = this.getModelDefinition();
        this.$isNew = !rowData;
        for (let field in modelDefinition) {
            data[field] = [this.getVal(rowData, field), modelDefinition[field]];
        }
        return this.formBuilder.group(data);
    }
}
exports.TbForm = TbForm;
