import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColumnModel } from './column';

@Component({
    selector: 'filter-dialog',
    template: `
   <form [formGroup]="form" (ngSubmit)="onSubmit()">
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
    styles: [ 'form { min-width: 200px; }' ]
})
export class ColumnFilterDialogComponent implements AfterViewInit {
    @Input() public column: ColumnModel;
    @Output() onFilteringChange = new EventEmitter<boolean>();
    form: FormGroup;
    operators: Object[];
    isBetween = false;
    inputType: string;

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

            this.isBetween = value.operator == "Between";
            this.inputType = this.column.getInputType();
        });
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
                operator: this.column.filter.operator || "None"
            });

            if (this.column.filter.operator == "None") {
                this.form.controls['text'].disable();
            }
        });
    }

    private onSubmit() {
        this.onFilteringChange.emit(true);
    }

    private reset() {
        this.form.reset();
        this.column.filter.argument = null;
        this.column.filter.operator = 'None';

        this.onFilteringChange.emit(false);
    }

    private selectChange(newVal: any) {
        if (newVal == 'None') {
            this.form.controls['text'].disable();
        } else {
            this.form.controls['text'].enable();
        }
    }
}
