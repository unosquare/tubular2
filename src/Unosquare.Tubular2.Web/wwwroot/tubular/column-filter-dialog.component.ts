import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColumnModel } from './column';

@Component({
    selector: 'filter-dialog',
    template: `
   <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label>Text</label>
            <input type="text" class="form-control" formControlName="text" />
        </div>
        <div class="form-group">
            <label for="operator">Operator</label>
            <select id="operator" class="form-control" formControlName="operator">
                <option *ngFor="let operator of operators">{{operator.name}}</option>
            </select>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <button type="submit" class="btn btn-sm btn-success btn-block" 
                        [disabled]="!form.valid">Filter</button>
            </div>
            <div class="col-xs-6">
                <button class="btn btn-sm btn-danger btn-block" 
                        (click)="reset()">Clear</button>
            </div>
        </div>
    </form>`
})
export class ColumnFilterDialog implements AfterViewInit {
    @Input() column: ColumnModel;
    @Output() onFilteringChange = new EventEmitter<boolean>();
    form: FormGroup;
    operators: Object[];

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            "text": ["", Validators.required],
            "operator": ["None", Validators.required]
        });

        this.form.valueChanges.subscribe((value) => {
            this.column.filter.text = value.text;
            this.column.filter.operator = value.operator;
        });
    }

    ngAfterViewInit() {
        // set initial value in form with a timeout
        setTimeout(_ => {
            // load operator directly from the column
            this.operators = this.column.getOperators();

            console.log(this.column.filter);
            // set initial value in form with a timeout
            this.form.patchValue({ "text": this.column.filter.text });
            this.form.patchValue({ "operator": this.column.filter.operator });
        });
    }

    onSubmit() {
        this.onFilteringChange.emit(true);
    }

    reset() {
        this.onFilteringChange.emit(false);
        this.form.reset();
    }
}