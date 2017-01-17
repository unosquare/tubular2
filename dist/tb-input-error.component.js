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
var core_1 = require("@angular/core");
var tb_form_1 = require("./tb-form");
var TbInputError = (function () {
    function TbInputError() {
    }
    TbInputError.prototype.ngOnInit = function () {
        this.formErrors = this.tbForm.formErrors;
    };
    return TbInputError;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tb_form_1.TbForm)
], TbInputError.prototype, "tbForm", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TbInputError.prototype, "controlName", void 0);
TbInputError = __decorate([
    core_1.Component({
        selector: 'tb-input-error',
        template: "\n    <div *ngIf=\"tbForm.formErrors[controlName] && tbForm.formErrors[controlName].length > 0\" class=\"alert alert-danger\">\n                <span *ngFor=\"let item of tbForm.formErrors[controlName]; let i = index\">\n                    {{item}}\n                </span>\n    </div>\n    "
    }),
    __metadata("design:paramtypes", [])
], TbInputError);
exports.TbInputError = TbInputError;
