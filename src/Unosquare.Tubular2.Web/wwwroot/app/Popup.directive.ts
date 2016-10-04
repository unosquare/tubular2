import { Component, Input, Directive, ComponentRef, Renderer, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {listenToTriggers} from '@ng-bootstrap/ng-bootstrap/util/triggers';

@Directive({
    selector: '[popupDetails]',
    //exportAs: 'popupDetails',
    host: {
        '(click)': 'onClick($event)',
    }
})
export class PopupDirective {
    //@Input() _row: any;
    @Input('popupDetails') _row;

    detailsForm: FormGroup;
    private _unregisterListenersFn;

    constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
    }

    //ngOnInit() {
    //    this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, 'click', this.open.bind(this), this.close.bind(this),
    //        this.toggle.bind(this));
    //}

    ngOnInit() { 
        setTimeout(() => {
            document.addEventListener('click', this._row);
        }, 0);
    }

    onClick($event) {
        console.log('diste click' + this._row);
    }

    //setRow(row: any) {
    //    this._row = row;
    //    this.detailsForm = this.formBuilder.group(this._row);
    //}

    //open() {
    //    //this.modalService.open(popup);
    //    console.log('open directive');
    //}

    //close() {
    //    //this.modalService.open(popup);
    //    console.log('close directive');
    //}

    //toggle() {
    //    //this.modalService.open(popup);
    //}
}

//export const NGB_POPUP_DIRECTIVES = [PopupDirective];