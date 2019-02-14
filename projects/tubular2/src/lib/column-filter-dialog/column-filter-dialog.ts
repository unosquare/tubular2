import {
    Component,
    Input, Output,
    EventEmitter,
    OnInit,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ColumnModel } from 'tubular-common';
import { GridComponent } from '../grid/grid';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog-component';

@Component({
    selector: 'tb-filter-dialog',
    templateUrl: './column-filter-dialog.html',
    styleUrls: ['./column-filter-dialog.css']
})
export class ColumnFilterDialogComponent implements OnInit {
    @Output() toggleEvent: EventEmitter<any> = new EventEmitter();

    @Input()
    public column: string;
    public columnModel: ColumnModel;
    public form: FormGroup;
    public isBetween = false;
    public operators: Object[];

    constructor(fb: FormBuilder, private tbGrid: GridComponent, public dialog: MatDialog) {
        this.form = fb.group({
            filter: ['equal', Validators.required],
            operator: [''],
            text: [''],
            argument: ['']
        });

        this.form.valueChanges.subscribe(value => {
            this.columnModel.Filter = value.filter;

            this.columnModel.hasFilter = this.columnModel.Filter && this.columnModel.Filter !== 'None';
        });
    }

    ngOnInit(): void {
        const value = this.tbGrid.columns.getValue();
        const columnModel = value.find((c: ColumnModel) => c.Name === this.column);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.columnModel = columnModel;
        this.operators = ColumnModel.getOperators(columnModel);
    }


    public toggleClick() {
         const dialogRef = this.dialog.open(DialogComponent, {
            width: '300px',
            data: { operator: this.operators, form: this.form, tbGrid: this.tbGrid, columnModel: this.columnModel, column: this.column },
        });
    }
}

