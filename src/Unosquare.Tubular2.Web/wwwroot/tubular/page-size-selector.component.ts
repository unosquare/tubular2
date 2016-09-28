import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TubularDataService } from './tubular-data.service';
import { ColumnModel } from './column';
import { TubularGrid }      from './grid.component';

import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'page-size-selector',
    template: ` <form class="form-inline">
                <div [ngClass]="form-group">
                <label class="small">Page size</label>&nbsp;
                <select (change)="onChange($event.target.value)" class="form-control input-sm ">
                    <option *ngFor="let obj of options" [value]="obj">{{obj}}</option>
                </select>
                </div>
                </form>`
})
export class PageSizeSelector {
    options = [10, 20, 50, 100];

    constructor(private tbGrid: TubularGrid) {
    }

    onChange(newVal) {
        this.tbGrid._pageSize.next(newVal);
    }

}
