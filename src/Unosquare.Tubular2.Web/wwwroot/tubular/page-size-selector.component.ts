import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TubularGrid }      from './grid.component';

import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'page-size-selector',
    template: `<form class="form-inline">
                <div class="form-group">
                <label class="small">Page size</label>&nbsp;
                <select (change)="onChange($event.target.value)" class="form-control input-sm">
                    <option *ngFor="let obj of _options" [value]="obj">{{obj}}</option>
                </select>
                </div>
                </form>`
})
export class PageSizeSelector {
    _options: number[] = [10, 20, 50, 100];

    constructor(private tbGrid: TubularGrid) { }

    @Input('options')
    set in(options: any[]) {
        if (options != undefined) this._options = options;
    }
    
    onChange(newVal) {
        this.tbGrid._pageSize.next(newVal);
    }
}
