import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColumnModel } from './column';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

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
                <option>None</option>
                <option>Contains</option>
            </select>
        </div>
        <div class="pull-xs-right clearfix">
            <button type="submit" class="btn btn-sm btn-success" [disabled]="!form.valid">Filter</button>
            <button class="btn btn-sm btn-danger" (click)="form.reset()">Clear</button>
        </div>
    </form>`
})
export class ColumnFilterDialog implements AfterViewInit {
    @Input() column: ColumnModel;
    @Input() popover: NgbPopover;
    @Output() onFilteringChange = new EventEmitter<ColumnModel>();
    form: FormGroup;

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
        setTimeout(_ => this.form.patchValue({ "text": this.column.filter.text }));
    }

    onSubmit() {
        this.onFilteringChange.emit(this.column);
    }
}