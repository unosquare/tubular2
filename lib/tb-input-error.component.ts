import { Component, OnInit, Input } from '@angular/core';
import { TbForm } from './tb-form';

@Component({
    selector: 'tb-input-error',
    template: 
    `<div  *ngIf="tbForm.formErrors[controlName] && tbForm.formErrors[controlName].length > 0" 
           class="alert alert-danger">
        <span *ngFor="let item of tbForm.formErrors[controlName]; let i = index">
            {{item}}
        </span>
    </div>`
})
export class TbInputErrorComponent implements OnInit {
    @Input() tbForm: TbForm;
    @Input() controlName: String;

    private formErrors: Object;

    constructor() { }

    ngOnInit() {
        this.formErrors = this.tbForm.formErrors;
    }
}
