 import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColumnModel } from '../grid/index';

@Component({
    selector: 'tb-filter-dialog',
    templateUrl: './column-filter-dialog.html',
    styleUrls: ['./column-filter-dialog.css']
})
export class ColumnFilterDialogComponent implements AfterViewInit {
    @Input()
    public column: ColumnModel;
    @Output()
    public filterChange = new EventEmitter<boolean>();
    public form: FormGroup;
    public isBetween = false;
    public inputType: string;

    private operators: Object[];

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            text: ['', Validators.required],
            argument: [''],
            operator: ['None', Validators.required]
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

    public submit() {
        this.filterChange.emit(true);
    }

    public reset() {
        this.form.reset();
        this.column.filter.argument = null;
        this.column.filter.operator = 'None';

        this.filterChange.emit(false);
    }

    public selectChange(newVal: any) {
        if (newVal === 'None') {
            this.form.controls['text'].disable();
        } else {
            this.form.controls['text'].enable();
        }
    }

    public ngAfterViewInit() {
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
