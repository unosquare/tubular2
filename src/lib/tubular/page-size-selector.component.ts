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
    <md-select placeholder="Page Size" (change)="onChange($event.value)"
        [(ngModel)]="selected" [ngModelOptions]="{standalone: true}">
        <md-option *ngFor="let obj of _options" [value]="obj">{{obj}}</md-option>
    </md-select>`
})
export class PageSizeSelectorComponent {
    private _options: number[] = [10, 20, 50, 100];
    private selected: number;

    constructor(private tbGrid: GridComponent) { }

    @Input('options')
    set in(options: any[]) {
        if (options) {
            this._options = options;
        }
    }

    private ngOnInit() {
        this.selected = this.tbGrid._pageSize.getValue();
    }

    private onChange(newVal: number) {
        // TODO: Fix
        this.tbGrid._pageSize.next(newVal);
    }
}
