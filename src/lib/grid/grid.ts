 import {
    Component, Input, Output, EventEmitter,
    OnInit, Inject, Optional
} from '@angular/core';
import {
    RequestMethod, Http, RequestOptions,
    ResponseContentType, Request, Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from '../core/tubular-local-storage-service';
import { ColumnModel, ColumnDataType, ColumnSortDirection } from './column';
import { GridPageInfo } from './grid-page-info';
import { GridRequest, GridSearchParameter } from './grid-request';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// TODO: Add animation to sortable
@Component({
    selector: 'tb-grid',
    templateUrl: './grid.html',
    styleUrls: [ './grid.css' ]
})
export class GridComponent implements OnInit {
    // data is just observable and children can't push
    private data = new BehaviorSubject([]);
    public dataStream = this.data.asObservable();
    private _pageInfo = new BehaviorSubject(new GridPageInfo());
    public pageInfo = this._pageInfo.asObservable();

    private tbRequestRunning: GridRequest;

    public _pageSize = new BehaviorSubject(this.getPageSizeSettingValue());
    public pageSize = this._pageSize.asObservable();

    // values that to observe and allow to push from children
    public page = new BehaviorSubject(this.getPageSettingValue());
    public columns = new BehaviorSubject([]);
    public freeTextSearch = new BehaviorSubject('');

    pageSet = false;

    public isLoading = false;
    public search = {
        text: '',
        operator: 'None'
    } as GridSearchParameter;

    private requestCount = 0;

    @Input() public dataUrl: string;
    @Input() public requestMethod: string | RequestMethod;
    @Input() public requestTimeout: number;

    @Output() public beforeRequest = new EventEmitter<any>();

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private http: Http) {

    }

    public goToPage(page) {
        this.pageSet = true;
        this.page.next(page);
    }

    public refresh() {
        if (this.pageSet && this.columns.getValue().length > 0 && this._pageSize.getValue() > 0) {
            this.getCurrentPage()
                .subscribe((data: any) => {
                    this.transformDataset(data, this.tbRequestRunning);
                });
        }
    }

    public getCurrentPage(): Observable<Response> {
        this.isLoading = true;

        this.tbRequestRunning = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this._pageSize.getValue(),
            take: this._pageSize.getValue(),
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        } as GridRequest;

        return this.requestData(this.tbRequestRunning);
    }

    public getFullDataSource(): Observable<Response> {
        const tbRequest = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: 0,
            take: -1,
            timezoneOffset: new Date().getTimezoneOffset(),
            search: {
                text: '',
                operator: 'None'
            } as GridSearchParameter
        } as GridRequest;

        return this.requestData(tbRequest);
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
            return this.settingsProvider.get('gridPage') || 0;
        }

        return 0;
    }

    getPageSizeSettingValue() {
        if (this.settingsProvider != null) {
            return this.settingsProvider.get('gridPageSize') || 10;
        }

        return 10;
    }

    ngOnInit() {
        // just a logging
        this.dataStream.subscribe(p => console.log('New data', p));

        // subscriptions to events
        this.pageSize.subscribe(() => {
            this.refresh();
            this.changePageSizeData();
        });

        this.columns.subscribe(() => this.refresh());

        this.page.subscribe(() => {
            this.refresh();
            this.changePagesData();
        });

        this.freeTextSearch
            .subscribe(c => {
                if (c === this.search.text) {
                    return;
                }

                this.search.text = c;
                this.search.operator = !c ? 'None' : 'Auto';
                this.refresh();
            });

        this.goToPage(0);
    }

    private requestData(tbRequest: GridRequest): Observable<Response> {
        // transform direction values to strings
        tbRequest.columns.forEach(this.transformSortDirection);

        const ngRequestOptions = new RequestOptions({
            body: tbRequest,
            url: this.dataUrl,
            method: this.requestMethod || 'POST',
            withCredentials: false,
            responseType: ResponseContentType.Json
        });

        this.beforeRequest.emit(ngRequestOptions);

        const ngRequest = new Request(ngRequestOptions);

        return this.http.request(ngRequest).map(response => {
            this.isLoading = false;
            return response.json();
        });
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
        const obj = {};

        columns.forEach((column, key) => {
            obj[column.name] = data[key] || data[column.name];

            if (column.dataType === ColumnDataType.DateTimeUtc) {
                obj[column.name] = moment.utc(obj[column.name]);
            }

            if (column.dataType === ColumnDataType.Date || column.dataType === ColumnDataType.DateTime) {
                obj[column.name] = moment(obj[column.name]);
            }
        });

        return obj;
    }

    private transformDataset(data, req) {
        const transform = d => this.transformToObj(req.columns, d);
        const payload = (data.Payload || {}).map(transform);
        // push data
        this.data.next(payload);

        const pageInfo = new GridPageInfo();
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
