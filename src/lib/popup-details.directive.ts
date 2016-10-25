import { Directive, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Directive({
    selector: '[popupDetails]',
    host: {
        '(click)': 'onClick($event)',
    }
})
export class PopupDetails {
    @Input() popupDetails: string | TemplateRef<any>;
    @Output() popupUpdated = new EventEmitter();

    constructor(private modalService: NgbModal) { }
    
    onClick($event) {
        let winRef = this.modalService.open(this.popupDetails);
        this.popupUpdated.emit(winRef);
    }
}