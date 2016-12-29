// import { Input, Output, EventEmitter} from '@angular/core';
"use strict";
var moment = require('moment');
var TbForm = (function () {
    function TbForm(formBuilder, dataService) {
        if (dataService === void 0) { dataService = null; }
        this.formBuilder = formBuilder;
        this.formErrors = {};
        this.dataService = dataService;
    }
    TbForm.prototype.tbFormInit = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        console.log(options);
        this.hasModelKey = options.modelKey !== undefined && options.modelKey != '';
        this.modelKey = options.modelKey || '';
        this.serverUrl = options.serverUrl || '';
        this.localForm = this.buildForm();
        if (this.hasModelKey &&
            this.serverUrl) {
            this.dataService.getData(this.serverUrl + this.localForm.controls[this.modelKey]).subscribe(function (data) { console.log(data); });
        }
        this.localForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
        return this.localForm;
    };
    TbForm.prototype.onValueChanged = function (data) {
        if (!this.localForm) {
            return;
        }
        for (var field in this.localForm.controls) {
            // clear previous error message (if any)
            this.formErrors[field] = [];
            var control = this.localForm.get(field);
            if (control && control.dirty && !control.valid) {
                for (var key in control.errors) {
                    this.formErrors[field].push(this.getErrorMessage(field, key));
                }
            }
        }
    };
    TbForm.prototype.getVal = function (data, field) {
        if (data === undefined)
            return "";
        if (moment.isMoment(data[field])) {
            return data[field].format('YYYY-MM-DDThh:mm');
        }
        else {
            return data[field];
        }
    };
    TbForm.prototype.getErrorMessage = function (fieldName, validator) {
        if (this.validationMessages === undefined || this.validationMessages[fieldName] === undefined) {
            var friendlyFieldName = this.getFriendlyFieldName(fieldName);
            switch (validator) {
                case "required":
                    return friendlyFieldName + " is required.";
                case "minlength":
                    return friendlyFieldName + " must be at least 4 characters long.";
                case "maxlength":
                    return friendlyFieldName + " cannot be more than 24 characters long.";
                default:
                    return "Invalid field.";
            }
        }
        else {
            return this.validationMessages[fieldName][validator];
        }
    };
    TbForm.prototype.getFriendlyFieldName = function (fieldName) {
        return fieldName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase(); });
    };
    TbForm.prototype.buildForm = function () {
        var rowData = this.getRow();
        var data = {};
        var modelDefinition = this.getModelDefinition();
        this.$isNew = !rowData;
        for (var field in modelDefinition) {
            data[field] = [this.getVal(rowData, field), modelDefinition[field]];
        }
        return this.formBuilder.group(data);
    };
    TbForm.prototype.save = function () {
    };
    return TbForm;
}());
exports.TbForm = TbForm;
