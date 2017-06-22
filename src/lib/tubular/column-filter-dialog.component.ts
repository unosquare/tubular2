 import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColumnModel } from './column.model';

@Component({
    selector: 'tb-filter-dialog',
    template: `
   <form [formGroup]="form" (ngSubmit)="submit()">
        <md-select placeholder="Operator"
            formControlName="operator"
            (change)="selectChange($event.value)">
            <md-option *ngFor="let operator of operators" [value]="operator.value">
                {{operator.name}}
            </md-option>
        </md-select>
        <md-input-container>
            <input mdInput
                type="{{inputType}}" formControlName="text"
                placeholder="Value" />
        </md-input-container>
        <md-input-container *ngIf="isBetween">
            <input mdInput
                type="{{inputType}}" formControlName="argument"
                placeholder="Argument" />
        </md-input-container>
        <div fxLayout="row">
            <button type="submit" md-button fxFlex
                    [disabled]="!form.valid">Filter</button>
            <button type="button" md-button fxFlex
                    (click)="reset()">Clear</button>
        </div>
    </form>`,
    styles: [ 'form { min-width: 200px; }' ]
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
