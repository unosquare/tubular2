import { Component, Input, Output, EventEmitter, AfterViewInit, OnInit, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ColumnModel } from '../grid/index';
import { GridComponent } from '../grid/grid';
import { NgbPopover } from '../popover/popover';


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
    private columnModel: ColumnModel;

    @Output()
    public filterChange = new EventEmitter<string>();
    public form: FormGroup;
    public isBetween = false;
    public inputType: string;

    private operators: Object[];

    constructor(fb: FormBuilder, private tbGrid: GridComponent) {

        this.form = fb.group({
            text: ['', Validators.required],
            argument: [''],
            operator: ['None', Validators.required]
        });

        this.form.valueChanges.subscribe(value => {
            this.columnModel.filter.text = value.text;
            this.columnModel.filter.operator = value.operator;

            if (value.argument) {
                this.columnModel.filter.argument = [value.argument];
            }

            this.isBetween = value.operator === 'Between';
            this.inputType = this.columnModel.getInputType();

            this.columnModel.hasFilter =
                this.columnModel.filter.text != null && this.columnModel.filter.operator !== 'None';
        });
    }

    ngOnInit(): void {

        const value = this.tbGrid.columns.getValue();
        const columnModel = value.find(c => c.name === this.column);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.columnModel = columnModel;
    }

    public submit() {
        this.filterChange.emit(this.column);
    }

    public reset() {
        this.form.reset();
        this.columnModel.filter.argument = null;
        this.columnModel.filter.operator = 'None';

        this.filterChange.emit(this.column);
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
            this.operators = this.columnModel.getOperators();

            // set initial value in form with a timeout
            this.form.patchValue({
                text: this.columnModel.filter.text,
                argument: this.columnModel.filter.argument,
                operator: this.columnModel.filter.operator || 'None'
            });

            if (this.columnModel.filter.operator === 'None') {
                this.form.controls['text'].disable();
            }
        });
    }

    public togglePopover() {
        // TODO: Fix behavior for multiple popovers.
        this.popover.toggle();
    }
}
