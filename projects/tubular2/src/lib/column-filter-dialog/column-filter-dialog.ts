import {
    Component,
    Input, Output,
    EventEmitter,
    HostBinding,
    AfterViewInit,
    OnInit,
    ContentChild,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColumnModel } from 'tubular-common';
import { GridComponent } from '../grid/grid';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';

@Component({
    selector: 'tb-filter-dialog',
    templateUrl: './column-filter-dialog.html',
    styleUrls: ['./column-filter-dialog.css']
})
export class ColumnFilterDialogComponent implements AfterViewInit, OnInit {
    @Output() toggleEvent: EventEmitter<any> = new EventEmitter();

    @Input()
    public column: string;
    public columnModel: ColumnModel;

    public form: FormGroup;
    public isBetween = false;
    public inputType: string;

    public operators: Object[];
    @HostBinding('class.is-open') @Input() isDialogOpen = false;

    constructor(fb: FormBuilder, private tbGrid: GridComponent) {

        this.form = fb.group({
            filter: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(value => {
            this.columnModel.Filter = value.filter;
            this.inputType = this.columnModel.DataType;

            this.columnModel.hasFilter = this.columnModel.Filter != null && this.columnModel.Filter !== 'None';
        });
    }

    ngOnInit(): void {
        this.isDialogOpen = false;
        const value = this.tbGrid.columns.getValue();
        const columnModel = value.find((c: ColumnModel) => c.Name === this.column);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.columnModel = columnModel;
        this.operators = ColumnModel.getOperators(columnModel);
    }

    public submit() {
        this.tbGrid.filterByColumnName(this.column);
    }

    public reset() {
        this.form.reset();
        this.columnModel.Filter = null;

        this.tbGrid.filterByColumnName(this.column);
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
        setTimeout(_ => {
            // set initial value in form with a timeout
            this.form.patchValue({
                filter: this.columnModel.Filter
            });
        });
    }

    public toggleClick() {
        // TODO: Change to Modal for now
        // https://material.angular.io/components/dialog/overview
    }
}
