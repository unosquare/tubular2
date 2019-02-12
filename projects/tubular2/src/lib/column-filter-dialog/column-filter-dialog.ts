// tslint:disable-next-line:max-line-length
import { Component, Input, Output, EventEmitter, HostBinding, AfterViewInit, OnInit, ContentChild, TemplateRef, ViewChild } from '@angular/core';
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
    // public prevPopover: NgbPopover;

    @ContentChild('filterPopover')
    public filterPopoverTemplate: TemplateRef<Object>;

    @ViewChild('popover') private popover: NgbPopover;

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
        this.isDialogOpen = false;
        const value = this.tbGrid.columns.getValue();
        const columnModel = value.find(c => c.name === this.column);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.columnModel = columnModel;
    }

    public submit() {
        this.tbGrid.filterByColumnName(this.column);
        this.popover.close();
    }

    public reset() {
        this.form.reset();
        this.columnModel.filter.argument = null;
        this.columnModel.filter.operator = 'None';

        this.tbGrid.filterByColumnName(this.column);
    }

    public cancel() {
        this.form.reset();
        this.columnModel.filter.argument = null;
        this.columnModel.filter.operator = 'None';

        this.tbGrid.filterByColumnName(this.column);
        this.popover.close();
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

    public toggleClick() {
        this.isDialogOpen = !this.isDialogOpen;
        this.togglePopover();
    }

    public togglePopover() {
        if (this.isDialogOpen) {
            this.popover.open();
        } else {
            this.popover.close();
        }
    }
}
