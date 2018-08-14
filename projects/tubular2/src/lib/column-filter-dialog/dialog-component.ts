import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component, Input, AfterViewInit } from '@angular/core';
import ColumnModel from 'tubular-common';

@Component({
    selector: 'tb-dialog-component',
    templateUrl: './column-filter-form.html',
    styleUrls: ['./dialog-component.css']
})

export class DialogComponent implements AfterViewInit {

    @Input()
    public column: string;
    public columnModel: ColumnModel;
    public isBetween = false;
    public operators: Object[];

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(data);
    }

    onClose(): void {
        this.dialogRef.close();
    }

    public submit() {
        this.data.columnModel.Filter = {
            operator: this.data.form.controls.operator.value,
            text: this.data.form.controls.text.value
        };
        this.data.tbGrid.filterByColumnName(this.data.column);
        this.onClose();
    }

    public reset() {
        this.data.form.reset();
        this.data.columnModel.Filter = null;

        this.data.tbGrid.filterByColumnName(this.data.column);
    }

    public ngAfterViewInit() {
        // set initial value in form with a timeout
        setTimeout(_ => {
            // set initial value in form with a timeout
            this.data.form.patchValue({
                filter: this.data.columnModel.Filter
            });
        });
    }

    public selectChange(newVal: any) {
        if (newVal === 'None') {
            this.data.form.controls['text'].disable();
        } else {
            this.data.form.controls['text'].enable();
        }
    }
}
