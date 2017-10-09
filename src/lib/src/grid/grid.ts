import {
    Component, Input, Output, EventEmitter, ViewChild, AfterViewChecked,
    OnInit, Inject, Optional, ContentChild, AfterViewInit
} from '@angular/core';
import {
    RequestMethod, Http, RequestOptions,
    ResponseContentType, Request, Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';

import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from '../core/tubular-local-storage-service';
import { ColumnModel, ColumnDataType, ColumnSortDirection } from './column';
import { GridPageInfo } from './grid-page-info';
import { GridRequest, GridSearchParameter } from './grid-request';
import { GridResponse } from './grid-response';
import { DataService } from '../services/data.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// TODO: Add animation to sortable
@Component({
    selector: 'tb-grid',
    templateUrl: './grid.html',
    styleUrls: ['./grid.css']
})
export class GridComponent implements OnInit {
    // data is just observable and children can't push
    private data = new BehaviorSubject([]);
    private _pageInfo = new BehaviorSubject(new GridPageInfo());
    private tbRequestRunning: GridRequest;
    private requestCount = 0;

    public pageInfo = this._pageInfo.asObservable();
    public dataStream = this.data.asObservable();
    public dataSource: TubularDataSource | null;
    public _pageSize = new BehaviorSubject(this.getPageSizeSettingValue());
    public pageSize = this._pageSize.asObservable();

    public page = new BehaviorSubject(this.getPageSettingValue());
    public columns: BehaviorSubject<ColumnModel[]> = new BehaviorSubject([]);
    public freeTextSearch = new BehaviorSubject('');
    public pageSet = false;

    public isLoading = false;
    public search = {
        text: '',
        operator: 'None'
    } as GridSearchParameter;

    @Input() public dataUrl: string;
    @Input() public requestMethod: string | RequestMethod;
    @Input() public requestTimeout: number;

    @Output() public beforeRequest = new EventEmitter<any>();
    @Output() public onRequestDataError = new EventEmitter<any>();

    @ContentChild(MatSort) matSort: MatSort;

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private dataService: DataService) {

    }

    goToPage(page) {
        this.pageSet = true;
        this.page.next(page);
    }

    refresh() {
        if (this.pageSet && this.columns.getValue().length > 0 && this._pageSize.getValue() > 0) {
            this.getCurrentPage()
                .subscribe(
                (data: any) => {
                    this._transformDataset(data, this.tbRequestRunning);
                },
                error => this._handleRequestDataError(error)
                );
        }
    }

    getCurrentPage(): Observable<GridResponse> {
        this.isLoading = true;

        this.tbRequestRunning = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this._pageSize.getValue(),
            take: this._pageSize.getValue(),
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        } as GridRequest;

        return this._requestData(this.tbRequestRunning);
    }

    getFullDataSource(): Observable<GridResponse> {
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

        return this._requestData(tbRequest);
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

        this.dataSource = new TubularDataSource(this);

        if (this.matSort) {
            this.matSort.sortChange.subscribe(element => {
                this.sortByColumnName(element.active);
            });
        }

        // just a logging
        this.dataStream.subscribe(p => console.log('New data'));

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

    addColumns(columns: ColumnModel[]) {
        // TODO: Should we clear before??
        this.columns.getValue().push(...columns);
    }

    sortByColumnName(columnName: string) {
        const value = this.columns.getValue();
        const columnModel = value.find(c => c.name === columnName);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.sort(columnModel);
    }

    sort(column: ColumnModel) {
        const value = this.columns.getValue();

        if (!column.sortable) {
            return;
        }

        if (column.direction === ColumnSortDirection.None) {
            column.direction = ColumnSortDirection.Asc;
        } else if (column.direction === ColumnSortDirection.Asc) {
            column.direction = ColumnSortDirection.Desc;
        } else if (column.direction === ColumnSortDirection.Desc) {
            column.direction = ColumnSortDirection.None;
        }

        column.sortOrder = column.direction === ColumnSortDirection.None ? 0 : Number.MAX_VALUE;

        if (!column.isMultiSort) {
            value.forEach(
                v => v.sortOrder = v.name === column.name ? v.sortOrder : 0);
            value.forEach(
                v => v.direction = v.name === column.name ?
                    column.direction :
                    ColumnSortDirection.None);
        }

        const currentlySortedColumns = value.filter(col => col.sortOrder > 0);
        currentlySortedColumns.sort((a, b) => a.sortOrder === b.sortOrder ? 0 : 1);
        currentlySortedColumns.forEach((col, index) => { col.sortOrder = index + 1; });

        this.columns.next(value);
    }

    filterByColumnName(columnName: string) {
        const value = this.columns.getValue();
        const columnModel = value.find(c => c.name === columnName);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.columns.next(value);
    }

    private _requestData(tbRequest: GridRequest) {
        // transform direction values to strings
        tbRequest.columns.forEach(this._transformSortDirection);

        const ngRequestOptions = new RequestOptions({
            body: tbRequest,
            url: this.dataUrl,
            method: this.requestMethod || 'POST',
            withCredentials: false,
            responseType: ResponseContentType.Json
        });

        this.beforeRequest.emit(ngRequestOptions);

        const ngRequest = new Request(ngRequestOptions);

        const result = this.dataService.getData(ngRequest);

        return result.map(response => {
            this.isLoading = false;
            return response;
        });
    }

    private _handleRequestDataError(error) {
        if (this.onRequestDataError) {
            this.onRequestDataError.emit(error);
        }
    }

    private _transformSortDirection(column: ColumnModel) {
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

    private _transformToObj(columns: ColumnModel[], data: any) {
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

    private _transformDataset(data, req) {
        const transform = d => this._transformToObj(req.columns, d);
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

export class TubularDataSource extends DataSource<any> {
    constructor(private _tbGrid: GridComponent) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        return this._tbGrid.dataStream;
    }

    disconnect() { }
}
