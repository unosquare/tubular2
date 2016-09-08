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
        this.form = fb.group({
            "text": ["", forms_1.Validators.required],
            "operator": ["None", forms_1.Validators.required]
        });
        this.form.valueChanges.subscribe(function (value) {
            _this.column.filter.text = value.text;
            _this.column.filter.operator = value.operator;
        });
    }
    ColumnFilterDialog.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function (_) { return _this.form.patchValue({ "text": _this.column.filter.text }); });
    };
    ColumnFilterDialog.prototype.onSubmit = function () {
        this.onFilteringChange.emit(true);
    };
    ColumnFilterDialog.prototype.reset = function () {
        this.onFilteringChange.emit(false);
        this.form.reset();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', column_1.ColumnModel)
    ], ColumnFilterDialog.prototype, "column", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ColumnFilterDialog.prototype, "onFilteringChange", void 0);
    ColumnFilterDialog = __decorate([
        core_1.Component({
            selector: 'filter-dialog',
            template: "\n   <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n            <label>Text</label>\n            <input type=\"text\" class=\"form-control\" formControlName=\"text\" />\n        </div>\n        <div class=\"form-group\">\n            <label for=\"operator\">Operator</label>\n            <select id=\"operator\" class=\"form-control\" formControlName=\"operator\">\n                <option>None</option>\n                <option>Contains</option>\n            </select>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-6\">\n                <button type=\"submit\" class=\"btn btn-sm btn-success btn-block\" \n                        [disabled]=\"!form.valid\">Filter</button>\n            </div>\n            <div class=\"col-xs-6\">\n                <button class=\"btn btn-sm btn-danger btn-block\" \n                        (click)=\"reset()\">Clear</button>\n            </div>\n        </div>\n    </form>"
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], ColumnFilterDialog);
    return ColumnFilterDialog;
}());
exports.ColumnFilterDialog = ColumnFilterDialog;
//# sourceMappingURL=ColumnFilterDialog.component.js.map