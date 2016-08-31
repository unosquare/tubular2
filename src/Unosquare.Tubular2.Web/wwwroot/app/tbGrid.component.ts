import { Component, Input } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TbDataService } from './tbData.service';
import 'rxjs/add/operator/debounceTime';

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
    // data is just observable and children can't push
    private _data = new BehaviorSubject([]);
    dataStream = this._data.asObservable();
    private _totalPages = new BehaviorSubject(0);
    totalPages = this._totalPages.asObservable();
    private _totalRecordCount = new BehaviorSubject(0);
    totalRecordCount = this._totalRecordCount.asObservable();
    private _filteredRecordCount = new BehaviorSubject(0);
    filteredRecordCount = this._filteredRecordCount.asObservable();

    // values that to observe and allow to push from children
    page = new BehaviorSubject(0);
    columns = new BehaviorSubject([]);
    freeTextSearch = new BehaviorSubject("");

    requestCount = 0;
    pageSize = 10;
    errorMessage: string;
    search = {
        Text: "",
        Operator: "None"
    };
    
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
        this.freeTextSearch
            .debounceTime(500)
            .subscribe(c => {
                if (c === this.search.Text) return;
                this.search.Text = c;
                this.search.Operator = !c ? "None" : "Auto";
                this.refresh();
            });
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
            data => {
                let transform = d => this.transformToObj(req.Columns, d);
                let payload = (data.Payload || {}).map(transform);
                this._data.next(payload);
                this._filteredRecordCount.next(data.FilteredRecordCount);
                this._totalPages.next(data.TotalPages);
                this._totalRecordCount.next(data.TotalRecordCount);
            },
            error => this.errorMessage = error
        );
    }

    private transformToObj(columns: any, data: any) {
        let obj = {};

        columns.forEach((column, key) => obj[column.Name] = data[key] || data[column.Name]);

        return obj;
    }

}