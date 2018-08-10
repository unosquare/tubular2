import { Component, Input, Output, EventEmitter, AfterViewInit, OnInit, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColumnModel } from 'tubular-common';
import { GridComponent } from '../grid/grid';
import { NgbPopover } from '../popover/popover';
import { ColumnFilter } from '../grid';


@Component({
    selector: 'tb-filter-dialog',
    templateUrl: './column-filter-dialog.html',
    styleUrls: ['./column-filter-dialog.css']
})
export class ColumnFilterDialogComponent implements AfterViewInit, OnInit {
    private static prevPopover: NgbPopover = null;

    @ContentChild('filterPopover')
    public filterPopoverTemplate: TemplateRef<Object>;

    @ViewChild('popover') private popover: NgbPopover;

    @Input()
    public column: string;
    public columnModel: ColumnModel;

    public form: FormGroup;
    public isBetween = false;
    public inputType: string;

    public operators: Object[];

    constructor(fb: FormBuilder, private tbGrid: GridComponent) {

        this.form = fb.group({
            filter: ['', Validators.required]
            //text: ['', Validators.required],
            //argument: [''],
            //operator: ['None', Validators.required]
        });

        this.form.valueChanges.subscribe(value => {
            console.log('filter');
            this.columnModel.Filter = value.filter;
            //if (value.text) {
            //    this.columnModel.Filter = value.text;
            //}
            //if (value.operator) {
            //    this.columnModel.Filter = value.operator;
//
            //}
            //this.columnModel.Filter = new ColumnFilter();
            //this.columnModel.Filter.text = value.text;
            //this.columnModel.Filter.operator = value.operator;

           // if (value.argument) {
           //     this.columnModel.Filter = [value.argument];
           // }

            //this.isBetween = value.operator === 'Between';
            this.inputType = this.columnModel.DataType;

            this.columnModel.hasFilter = this.columnModel.Filter != null && this.columnModel.Filter !== 'None';
            // this.columnModel.Filter.text != null && this.columnModel.Filter.operator !== 'None';
        });
    }

    ngOnInit(): void {

        const value = this.tbGrid.columns.getValue();
        const columnModel = value.find(c => c.Name === this.column);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.columnModel = columnModel;
    }

    public submit() {
        this.tbGrid.filterByColumnName(this.column);
    }

    public reset() {
        this.form.reset();
        this.columnModel.Filter = null;//.argument = null;
       // this.columnModel.Filter.operator = 'None';

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
            // load operator directly from the column
            //this.operators = this.columnModel.getOperators();

            // set initial value in form with a timeout
            this.form.patchValue({
                filter: this.columnModel.Filter
                //text: this.columnModel.Filter.text,
                //argument: this.columnModel.Filter.argument,
                //operator: this.columnModel.Filter.operator || 'None'
            });

            //if (this.columnModel.Filter.operator === 'None') {
            //    this.form.controls['text'].disable();
            //}
        });
    }

    public togglePopover() {
        // TODO: Fix behavior for multiple popovers.
        this.popover.toggle();
    }
}
