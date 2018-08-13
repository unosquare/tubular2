import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component, Input } from '@angular/core';
import ColumnModel from 'tubular-common';

@Component({
    selector: 'tb-dialog-component',
    templateUrl: './column-filter-form.html'
})

export class DialogComponent {

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
        this.data.tbGrid.filterByColumnName(this.column);
    }

    public reset() {
        this.data.form.reset();
        this.data.columnModel.Filter = null;

        this.data.tbGrid.filterByColumnName(this.column);
    }

    public selectChange(newVal: any) {
        if (newVal === 'None') {
            this.data.form.controls['text'].disable();
        } else {
            this.data.form.controls['text'].enable();
        }
    }
}
