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
const forms_1 = require("@angular/forms");
const column_model_1 = require("./column.model");
let ColumnFilterDialogComponent = class ColumnFilterDialogComponent {
    constructor(fb) {
        this.filterChange = new core_1.EventEmitter();
        this.isBetween = false;
        this.form = fb.group({
            text: ['', forms_1.Validators.required],
            argument: [''],
            operator: ['None', forms_1.Validators.required]
        });
        this.form.valueChanges.subscribe((value) => {
            this.column.filter.text = value.text;
            this.column.filter.operator = value.operator;
            if (value.argument) {
                this.column.filter.argument = [value.argument];
            }
            this.isBetween = value.operator === 'Between';
            this.inputType = this.column.getInputType();
        });
    }
    submit() {
        this.filterChange.emit(true);
    }
    reset() {
        this.form.reset();
        this.column.filter.argument = null;
        this.column.filter.operator = 'None';
        this.filterChange.emit(false);
    }
    selectChange(newVal) {
        if (newVal === 'None') {
            this.form.controls['text'].disable();
        }
        else {
            this.form.controls['text'].enable();
        }
    }
    ngAfterViewInit() {
        // set initial value in form with a timeout
        setTimeout((_) => {
            // load operator directly from the column
            this.operators = this.column.getOperators();
            // set initial value in form with a timeout
            this.form.patchValue({
                text: this.column.filter.text,
                argument: this.column.filter.argument,
                operator: this.column.filter.operator || 'None'
            });
            if (this.column.filter.operator === 'None') {
                this.form.controls['text'].disable();
            }
        });
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", column_model_1.ColumnModel)
], ColumnFilterDialogComponent.prototype, "column", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ColumnFilterDialogComponent.prototype, "filterChange", void 0);
ColumnFilterDialogComponent = __decorate([
    core_1.Component({
        selector: 'tb-filter-dialog',
        template: `
   <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="form-group">
            <label for="operator">Operator</label>
            <select id="operator" class="form-control" 
                    formControlName="operator" 
                    (change)="selectChange($event.target.value)">
                <option *ngFor="let operator of operators" [value]="operator.value">
                    {{operator.name}}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label>Value</label>
            <input type="{{inputType}}" class="form-control" formControlName="text" />
            <label *ngIf="isBetween">Argument</label>
            <input *ngIf="isBetween" type="{{inputType}}" 
                class="form-control" formControlName="argument"/>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <button type="submit" class="btn btn-sm btn-success btn-block" 
                        [disabled]="!form.valid">Filter</button>
            </div>
            <div class="col-xs-6">
                <button type="button" class="btn btn-sm btn-danger btn-block" 
                        (click)="reset()">Clear</button>
            </div>
        </div>
    </form>`,
        styles: ['form { min-width: 200px; }']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], ColumnFilterDialogComponent);
exports.ColumnFilterDialogComponent = ColumnFilterDialogComponent;
