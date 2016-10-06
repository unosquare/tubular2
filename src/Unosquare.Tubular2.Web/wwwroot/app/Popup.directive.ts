import { Directive, Input, TemplateRef } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Directive({
    selector: '[popupDetails]',
    host: {
        '(click)': 'onClick($event)',
    }
})
export class PopupDirective {
    @Input() popupDetails: string | TemplateRef<any>;

    constructor(private modalService: NgbModal) {
    }

    ngOnInit() { 
    }

    onClick($event) {
        this.modalService.open(this.popupDetails);
    }

}
