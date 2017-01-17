"use strict";
var moment = require("moment");
var http_1 = require("@angular/http");
var TbForm = (function () {
    function TbForm(formBuilder, dataService, toastr) {
        if (dataService === void 0) { dataService = null; }
        this.formBuilder = formBuilder;
        this.formErrors = {};
        this.dataService = dataService;
        this.toastr = toastr;
    }
    TbForm.prototype.tbFormInit = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.hasModelKey = options.modelKey !== undefined && options.modelKey != '';
        this.modelKey = options.modelKey || '';
        this.serverUrl = options.serverUrl || '';
        this.saveUrl = options.saveUrl || '';
        this.serverSaveMethod = options.serverSaveMethod || http_1.RequestMethod.Post;
        this.requireAuthentication = options.requireAuthentication !== undefined ? options.requireAuthentication : false;
        this.dataService.setRequireAuthentication(this.requireAuthentication);
        this.localForm = this.buildForm();
        // Try to load values if we have model key and server url
        if (this.hasModelKey &&
            this.serverUrl) {
            this.dataService.getData(this.serverUrl + this.localForm.controls[this.modelKey].value).subscribe(function (data) {
                for (var key in data) {
                    if (_this.localForm.controls[key]) {
                        _this.localForm.controls[key].setValue(data[key]);
                    }
                }
            }, function (errorMessage) { return _this.toastr.error(errorMessage, "Application Error"); });
        }
        // Watch for changes on form in order to trigger proper validations.
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
    TbForm.prototype.onSave = function (row, success, error, complete) {
        var _this = this;
        this.dataService
            .save(this.saveUrl, row.values, row.$isNew ? this.serverSaveMethod : http_1.RequestMethod.Put)
            .subscribe(function (data) { return success ? success(data) : _this.defaultSaveSuccess(data); }, function (errorMessage) { return error ? error(errorMessage) : _this.defaultSaveError(errorMessage); }, function () { return complete ? complete() : _this.defaultSaveComplete(); });
    };
    TbForm.prototype.defaultSaveSuccess = function (data) {
        console.log("Success");
    };
    TbForm.prototype.defaultSaveError = function (error) {
        console.log("Error");
    };
    TbForm.prototype.defaultSaveComplete = function () {
        console.log("Complete");
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
    return TbForm;
}());
exports.TbForm = TbForm;
