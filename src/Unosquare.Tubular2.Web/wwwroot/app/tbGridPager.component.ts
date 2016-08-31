import { Component, Input } from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TbGrid }           from './tbGrid.component';

@Component({
    selector: 'tb-grid-pager',
    template: `
    <ul>
        <li><button (click)="goTo(0)">1</button></li>
        <li><button (click)="goTo(1)">2</button></li>
    </ul>`,
    styles: [
        'li { display: inline; } '
    ]
})
export class TbGridPager {
    constructor(private tbGrid: TbGrid) {
        
    }

    goTo(page: number) {
        this.tbGrid.page.next(page);
    }
}