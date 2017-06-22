import { EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ColumnModel } from '../grid/index';
export declare class ColumnFilterDialogComponent implements AfterViewInit {
    column: ColumnModel;
    filterChange: EventEmitter<boolean>;
    form: FormGroup;
    isBetween: boolean;
    inputType: string;
    private operators;
    constructor(fb: FormBuilder);
    submit(): void;
    reset(): void;
    selectChange(newVal: any): void;
    ngAfterViewInit(): void;
}
