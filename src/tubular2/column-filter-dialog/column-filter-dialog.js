"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
class ColumnFilterDialogComponent {
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
}
ColumnFilterDialogComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tb-filter-dialog',
                templateUrl: 'column-filter-dialog.html',
                styleUrls: ['column-filter-dialog.css']
            },] },
];
/** @nocollapse */
ColumnFilterDialogComponent.ctorParameters = () => [
    { type: forms_1.FormBuilder, },
];
ColumnFilterDialogComponent.propDecorators = {
    'column': [{ type: core_1.Input },],
    'filterChange': [{ type: core_1.Output },],
};
exports.ColumnFilterDialogComponent = ColumnFilterDialogComponent;
//# sourceMappingURL=column-filter-dialog.js.map