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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const tb_form_1 = require("./tb-form");
let TbInputError = class TbInputError {
    constructor() { }
    ngOnInit() {
        this.formErrors = this.tbForm.formErrors;
    }
};
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
        template: `
    <div *ngIf="tbForm.formErrors[controlName] && tbForm.formErrors[controlName].length > 0" class="alert alert-danger">
                <span *ngFor="let item of tbForm.formErrors[controlName]; let i = index">
                    {{item}}
                </span>
    </div>
    `
    }),
    __metadata("design:paramtypes", [])
], TbInputError);
exports.TbInputError = TbInputError;
