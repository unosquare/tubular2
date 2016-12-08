// import { Input, Output, EventEmitter} from '@angular/core';
"use strict";
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
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field].push(messages[key]);
                }
            }
        }
    };
    return TbForm;
}());
exports.TbForm = TbForm;
