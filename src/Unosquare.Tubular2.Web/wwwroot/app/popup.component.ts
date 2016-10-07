import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TubularGrid } from '../tubular';

@Component({
    selector: 'popup-details',
    templateUrl: '/app/popup.component.html'
})

export class Popup {
    @Input('popupRef') popupRef: any;
    _row: any;
    detailsForm: FormGroup;

    constructor(private tbGrid: TubularGrid, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.detailsForm = this.formBuilder.group(this._row);
    }

    @Input('row')
    set in(row: any) {
        this._row = row;
    }

    close() {
        this.popupRef.close();
    }

    save() {
        this.tbGrid._updateRow.next(this.detailsForm.value);
        this.popupRef.close();
    }
}
