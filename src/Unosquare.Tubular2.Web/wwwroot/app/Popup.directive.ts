import {
        Component,
        Input,
        Directive,
        ComponentRef,
        Renderer,
        ElementRef,
        Injector,
        ViewContainerRef,
        ComponentFactoryResolver } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { Popup } from './popup.component';

@Directive({
    selector: '[popupDetails]',
    host: {
        '(click)': 'onClick($event)',
    }
})
export class PopupDirective {
    @Input('popupDetails') _row : any;
    private _popupService: PopupService<Popup>;
    private _windowRef: ComponentRef<Popup>;

    constructor(injector: Injector, viewContainerRef: ViewContainerRef, private _renderer: Renderer,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this._popupService = new PopupService<Popup>(
            Popup, injector, viewContainerRef, _renderer, componentFactoryResolver);
    }

    ngOnInit() { 
    }

    onClick($event) {
        this._windowRef = this._popupService.open();
        console.log('diste click' + this._row);
    }

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
