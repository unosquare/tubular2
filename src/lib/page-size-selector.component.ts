import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TubularGrid }      from './grid.component';

import 'rxjs/add/operator/debounceTime';

export class PageSizeInfo {
    value = 0;
    selected = false;
}

@Component({
    selector: 'page-size-selector',
    template: `
    <form class="form-inline">
        <div class="form-group">
            <label class="small">Page size</label>&nbsp;
            <select (change)="onChange($event.target.value)" class="form-control input-sm">
                <option *ngFor="let obj of _options" [value]="obj.value" [selected]="obj.selected">{{obj.value}}</option>
            </select>
        </div>
    </form>`
})
export class PageSizeSelector {
    _options: PageSizeInfo[] = [
        { value: 10, selected: this.isSelected(10) },
        { value: 20, selected: this.isSelected(20) },
        { value: 50, selected: this.isSelected(50) },
        { value: 100, selected: this.isSelected(100) }];

    constructor(private tbGrid: TubularGrid) { }

    @Input('options')
    set in(options: any[]) {
        if (options != undefined) {
            for (let option of options) {
                this._options.push({ value: option, selected: this.isSelected(option) });
            }
        }
    }

    private onChange(newVal: number) {
        this.tbGrid._pageSize.next(newVal);
    }

    private isSelected(option) {
        return (this.tbGrid._pageSize.getValue() == option);
    }
}
