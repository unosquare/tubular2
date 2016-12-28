// import { Input, Output, EventEmitter} from '@angular/core';
"use strict";
var moment = require('moment');
var TbForm = (function () {
    function TbForm(formBuilder) {
        this.formBuilder = formBuilder;
        this.formErrors = {};
    }
    TbForm.prototype.tbFormInit = function () {
        var _this = this;
        this.localForm = this.buildForm();
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
                if (this.validationMessages[field] === undefined) {
                    this.formErrors[field].push("yeah");
                    continue;
                }
                for (var key in control.errors) {
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
        if (this.validationMessages[fieldName]) {
            return this.validationMessages[fieldName][validator];
        }
        var friendlyFieldName = this.getFriendlyFieldName(fieldName);
        switch (validator) {
            case "required":
                return friendlyFieldName + " is required.";
            case "minlength":
                return friendlyFieldName + " must be at least 4 characters long.";
            case "minlength":
                return friendlyFieldName + " cannot be more than 24 characters long.";
            default:
                return "This field is invalid";
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
    return TbForm;
}());
exports.TbForm = TbForm;
