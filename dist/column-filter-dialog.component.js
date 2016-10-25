"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var column_1 = require('./column');
var ColumnFilterDialog = (function () {
    function ColumnFilterDialog(fb) {
        var _this = this;
        this.onFilteringChange = new core_1.EventEmitter();
        this.isBetween = false;
        this.form = fb.group({
            "text": ["", forms_1.Validators.required],
            "argument": [""],
            "operator": ["None", forms_1.Validators.required]
        });
        this.form.valueChanges.subscribe(function (value) {
            _this.column.filter.text = value.text;
            _this.column.filter.operator = value.operator;
            if (value.argument)
                _this.column.filter.argument = [value.argument];
            _this.isBetween = value.operator == "Between";
            _this.inputType = _this.column.getInputType();
        });
    }
    ColumnFilterDialog.prototype.ngAfterViewInit = function () {
        var _this = this;
        // set initial value in form with a timeout
        setTimeout(function (_) {
            // load operator directly from the column
            _this.operators = _this.column.getOperators();
            // set initial value in form with a timeout
            _this.form.patchValue({
                "text": _this.column.filter.text,
                "argument": _this.column.filter.argument,
                "operator": _this.column.filter.operator || "None"
            });
        });
    };
    ColumnFilterDialog.prototype.onSubmit = function () {
        this.onFilteringChange.emit(true);
    };
    ColumnFilterDialog.prototype.reset = function () {
        this.form.reset();
        this.column.filter.argument = null;
        this.column.filter.operator = column_1.FilterOperator.None;
        this.onFilteringChange.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', column_1.ColumnModel)
    ], ColumnFilterDialog.prototype, "column");
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ColumnFilterDialog.prototype, "onFilteringChange");
    ColumnFilterDialog = __decorate([
        core_1.Component({
            selector: 'filter-dialog',
            template: "\n   <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n            <label>Value</label>\n            <input type=\"{{inputType}}\" class=\"form-control\" formControlName=\"text\" />\n            <label *ngIf=\"isBetween\">Argument</label>\n            <input *ngIf=\"isBetween\" type=\"{{inputType}}\" class=\"form-control\" formControlName=\"argument\" />\n        </div>\n        <div class=\"form-group\">\n            <label for=\"operator\">Operator</label>\n            <select id=\"operator\" class=\"form-control\" formControlName=\"operator\">\n                <option *ngFor=\"let operator of operators\" [value]=\"operator.value\">{{operator.name}}</option>\n            </select>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-6\">\n                <button type=\"submit\" class=\"btn btn-sm btn-success btn-block\" \n                        [disabled]=\"!form.valid\">Filter</button>\n            </div>\n            <div class=\"col-xs-6\">\n                <button type=\"button\" class=\"btn btn-sm btn-danger btn-block\" \n                        (click)=\"reset()\">Clear</button>\n            </div>\n        </div>\n    </form>",
            styles: ['form { min-width: 200px; }']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], ColumnFilterDialog);
    return ColumnFilterDialog;
}());
exports.ColumnFilterDialog = ColumnFilterDialog;
