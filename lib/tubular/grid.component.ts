import {
    Component, Input, Output, EventEmitter,
    OnInit, Inject, Optional
} from '@angular/core';
import { RequestMethod, Http, RequestOptions, ResponseContentType, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from './tubular-settings.service';
import { ColumnModel, DataType, ColumnSortDirection } from './column.model';
import { GridPageInfo } from './grid-page-info';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface TbRequest {
    count: number,
    columns: any[],
    skip: number,
    take: number,
    search: TbSearchParameter,
    timezoneOffset: number
}

export interface TbSearchParameter {
    text: string,
    operator: string
}

@Component({
    selector: 'tb-grid',
    template: `
    <div>
        <div class="tubular-overlay" [hidden]="!showLoading">
            <div><md-icon>refresh</md-icon></div>
        </div>
        <ng-content></ng-content>
    </div>`,
    styles: [
        ':host /deep/ div.row { margin-top: 4px; margin-bottom: 4px; }',
        ':host /deep/ div.row:first { margin-top: 0; }',
        ':host /deep/ .sortable { text-decoration: underline; cursor: pointer; }',
        ':host /deep/ .sortable:hover { text-decoration: none; color: yellow; }',
        ':host /deep/ .sortAsc::after { font-family: FontAwesome; content: "\\f176"; }',
        ':host /deep/ .sortDesc::after { font-family: FontAwesome; content: "\\f175"; }'
    ]
})
export class GridComponent implements OnInit {

    // data is just observable and children can't push
    private data = new BehaviorSubject([]);
    public dataStream = this.data.asObservable();
    private _pageInfo = new BehaviorSubject(new GridPageInfo());
    public pageInfo = this._pageInfo.asObservable();

    private tbRequestRunning: TbRequest;

    public _pageSize = new BehaviorSubject(this.getPageSizeSettingValue());
    public pageSize = this._pageSize.asObservable();

    // values that to observe and allow to push from children
    public page = new BehaviorSubject(this.getPageSettingValue());
    public columns = new BehaviorSubject([]);
    public freeTextSearch = new BehaviorSubject('');

    pageSet = false;

    public showLoading = false;
    public search = <TbSearchParameter>{
        text: '',
        operator: 'None'
    };

    private requestCount = 0;

    @Input() public dataUrl: string;
    @Input() public requestMethod: string | RequestMethod;
    @Input() public requestTimeout: number;

    @Output() public beforeRequest = new EventEmitter<any>();

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private http: Http) {

    }

    public testRemove(callback) {
        this.http.request('/mock/api').map(callback);
    }

    public goToPage(page) {
        this.pageSet = true;
        this.page.next(page);
    }

    public refresh() {
        if (this.pageSet && this.columns.getValue().length > 0 && this._pageSize.getValue() > 0) {
            this.getCurrentPage()
                .subscribe((data: any) => {
                    this.transformDataset(data, this.tbRequestRunning)
                });
        }
    }

    public getCurrentPage(): Observable<Response> {

        this.tbRequestRunning = <TbRequest>{
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this._pageSize.getValue(),
            take: this._pageSize.getValue(),
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        };

        // transform direction values to strings
        this.tbRequestRunning.columns.forEach(this.transformSortDirection);

        let ngRequestOptions = new RequestOptions({
            body: this.tbRequestRunning,
            url: this.dataUrl,
            method: this.requestMethod || 'POST',
            withCredentials: false,
            responseType: ResponseContentType.Json
        });

        this.beforeRequest.emit(ngRequestOptions);

        let ngRequest = new Request(ngRequestOptions);

        return this.http.request(ngRequest).map(response => response.json());;
    }

    public getFullDataSource(): Observable<Response> {
        let tbRequest = <TbRequest>{
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: 0,
            take: -1,
            search: {
                text: '',
                operator: 'None'
            }
        };

        let ngRequestOptions = new RequestOptions({
            body: tbRequest,
            url: this.dataUrl,
            method: this.requestMethod || 'POST',
            withCredentials: false,
            responseType: ResponseContentType.Json
        });

        this.beforeRequest.emit(ngRequestOptions);

        let ngRequest = new Request(ngRequestOptions);

        return this.http.request(ngRequest).map(response => response.json());
    }

    changePagesData() {
        if (this.settingsProvider != null) {
            this.settingsProvider.put('gridPage', this.page.getValue());
        }
    }

    changePageSizeData() {
        if (this.settingsProvider != null) {
            this.settingsProvider.put('gridPageSize', this._pageSize.getValue());
        }
    }

    getPageSettingValue() {
        if (this.settingsProvider != null) {
            return this.settingsProvider.get("gridPage") || 0;
        }

        return 0;
    }

    getPageSizeSettingValue() {
        if (this.settingsProvider != null) {
            return this.settingsProvider.get("gridPageSize") || 10;
        }

        return 10;
    }

    ngOnInit() {
        // just a logging
        this.dataStream.subscribe((p) => console.log('New data', p));

        // subscriptions to events
        this.pageSize.subscribe((c) => {
            this.refresh();
            this.changePageSizeData();
        });
        this.columns.subscribe((c) => this.refresh());
        this.page.subscribe((c) => {
            this.refresh();
            this.changePagesData();
        });
        this.freeTextSearch
            .debounceTime(500)
            .subscribe((c) => {
                if (c === this.search.text) {
                    return;
                }

                this.search.text = c;
                this.search.operator = !c ? 'None' : 'Auto';
                this.refresh();
            });

        this.goToPage(0);
    }

    private transformSortDirection(column: ColumnModel) {
        switch (column.direction) {
            case ColumnSortDirection.Asc:
                column.sortDirection = 'Ascending';
                break;
            case ColumnSortDirection.Desc:
                column.sortDirection = 'Descending';
                break;
            default:
                column.sortDirection = 'None';
        }
    }

    private transformToObj(columns: ColumnModel[], data: any) {
        let obj = {};

        columns.forEach((column, key) => {
            obj[column.name] = data[key] || data[column.name];

            if (column.dataType === DataType.DateTimeUtc) {
                obj[column.name] = moment.utc(obj[column.name]);
            }

            if (column.dataType === DataType.Date || column.dataType === DataType.DateTime) {
                obj[column.name] = moment(obj[column.name]);
            }
        });

        return obj;
    }

    private transformDataset(data, req) {
        let transform = (d) => this.transformToObj(req.columns, d);
        let payload = (data.Payload || {}).map(transform);
        // push data
        this.data.next(payload);

        let pageInfo = new GridPageInfo();
        pageInfo.currentPage = data.CurrentPage;
        pageInfo.totalPages = data.TotalPages;
        pageInfo.filteredRecordCount = data.FilteredRecordCount;
        pageInfo.totalRecordCount = data.TotalRecordCount;

        pageInfo.currentInitial = ((pageInfo.currentPage - 1) * this._pageSize.getValue()) + 1;

        if (pageInfo.currentInitial <= 0) {
            pageInfo.currentInitial = data.TotalRecordCount > 0 ? 1 : 0;
        }

        pageInfo.currentTop = this._pageSize.getValue() * pageInfo.currentPage;

        if (pageInfo.currentTop <= 0 || pageInfo.currentTop > data.filteredRecordCount) {
            pageInfo.currentTop = data.filteredRecordCount;
        }

        // push page Info
        this._pageInfo.next(pageInfo);
    }
}
