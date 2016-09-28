import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TubularGrid }      from './grid.component';

import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'page-size-selector',
    template: ` <form class="form-inline">
                <div [ngClass]="form-group">
                <label class="small">Page size</label>&nbsp;
                <select (change)="onChange($event.target.value)" class="form-control input-sm " >
                    <option *ngFor="let obj of _options" [value]="obj">{{obj}}</option>
                </select>
                </div>
                </form>`
})
export class PageSizeSelector {
    _options: any[] = [10, 20, 50, 100];

    constructor(private tbGrid: TubularGrid) {
    }

    @Input('options')
    set in(options: any[]) {
        options != undefined ? this._options = options : this._options = [10, 20, 50, 100];
    }


    onChange(newVal) {
        this.tbGrid._pageSize.next(newVal);
    }

}
