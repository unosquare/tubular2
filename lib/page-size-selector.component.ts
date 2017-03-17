import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { GridComponent }      from './grid.component';

import 'rxjs/add/operator/debounceTime';

export class PageSizeInfo {
    value = 0;
    selected = false;
}

@Component({
    selector: 'tb-page-size-selector',
    template: `
    <form class="form-inline">
        <div class="form-group">
            <label class="small">Page size</label>&nbsp;
            <select (change)="onChange($event.target.value)" class="form-control form-control-sm" 
                [(ngModel)]="selected" [ngModelOptions]="{standalone: true}">
                <option *ngFor="let obj of _options" [value]="obj">{{obj}}</option>
            </select>
        </div>
    </form>`
})
export class PageSizeSelectorComponent {
    private _options: number[] = [10, 20, 50, 100];
    private selected: number;

    constructor(private tbGrid: GridComponent) { }

    @Input('options')
    set in(options: any[]) {
        if (options != undefined) {
            this._options = options;
        }
    }

    private ngOnInit() {
        this.selected = this.tbGrid._pageSize.getValue();
    }

    private onChange(newVal: number) {
        this.tbGrid._pageSize.next(newVal);
    }
}
