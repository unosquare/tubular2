import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TbDataService } from './tbData.service';

@Component({
    selector: 'tb-grid',
    template: `
    <div>
        <div class="tubular-overlay" [hidden]="showLoading && currentRequest != null">
            <div><div class="fa fa-refresh fa-2x fa-spin"></div>
        </div></div>
        <ng-content></ng-content>
    </div>`
})
export class TbGrid {
    private data = new BehaviorSubject([]);
    page = new BehaviorSubject(0);

    dataStream = this.data.asObservable();

    requestCount = 0;
    pageSize = 10;
    errorMessage: string;
    search: any = {
        Text: "",
        Operator: "None"
    };
    columns = new BehaviorSubject([]);
    
    @Input('server-url')
    serverUrl: string;
    @Input('require-authentication')
    requireAuthentication: boolean;

    constructor(private tbDataService: TbDataService) { }

    ngOnInit() {
        // just a logging
        this.dataStream.subscribe(p => console.log("New data", p));

        // subscriptions to events
        this.columns.subscribe(c => this.refresh());
        this.page.subscribe(c => this.refresh());
    }
    
    refresh() {
        let req = {
            Count: this.requestCount++,
            Columns: this.columns.getValue(),
            Skip: this.page.getValue() * this.pageSize,
            Take: this.pageSize,
            Search: this.search,
            TimezoneOffset: new Date().getTimezoneOffset()
        };

        this.tbDataService.retrieveData(this.serverUrl, req).subscribe(
            payload => this.data.next(payload),
            error => this.errorMessage = error
        );
    }
}