import {
    Component, Input, Output, EventEmitter, ViewChild, QueryList,
    OnInit, AfterContentInit, Inject, Optional, ContentChild, ContentChildren
} from '@angular/core';
import {
    RequestMethod, Http, RequestOptions,
    ResponseContentType, Request, Response
} from '@angular/http';

import * as moment from 'moment';

import { MatSort, MatPaginator, PageEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from '../core/tubular-local-storage-service';
import { DataService } from '../services/data.service';
import { ColumnModel, ColumnDataType, ColumnSortDirection } from './column';
import { GridPageInfo } from './grid-page-info';
import { GridRequest, GridSearchParameter } from './grid-request';
import { GridResponse } from './grid-response';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

// TODO: Add animation to sortable
@Component({
    selector: 'tb-grid',
    templateUrl: './grid.html',
    styleUrls: ['./grid.css']
})
export class GridComponent implements OnInit, AfterContentInit {
    // data is just observable and children can't push
    private _dataStream = new BehaviorSubject([]);
    private _totalRecords = new BehaviorSubject(0);

    // TODO: Check we really need to push internally, only
    private _pageInfo = new BehaviorSubject(new GridPageInfo());
    private _tbRequestRunning: GridRequest;
    private _requestCount = 0;
    private _pageEvent = new Subject<PageEvent>();

    public dataStream = this._dataStream.asObservable();
    public totalRecords = this._totalRecords.asObservable();
    public pageInfo = this._pageInfo.asObservable();
    public pageSize = new BehaviorSubject(this._getPageSizeSettingValue());

    public dataSource: TubularDataSource | null;
    public page = new BehaviorSubject(this._getPageSettingValue());
    public columns: BehaviorSubject<ColumnModel[]> = new BehaviorSubject([]);
    public freeTextSearch = new BehaviorSubject('');
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

    @ContentChild(MatSort) sorting: MatSort;
    @ContentChildren(MatPaginator) paginators: QueryList<MatPaginator>;

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private dataService: DataService) {
    }

    ngOnInit() {

        this.dataSource = new TubularDataSource(this);

        // subscriptions to events
        if (this.sorting) {
            this.sorting.sortChange.subscribe(element => {
                this.sortByColumnName(element.active);
            });
        }

        this.dataStream.subscribe(p => console.log('New data'));

        this._pageEvent.subscribe((pageEvent: PageEvent) => {
            if (pageEvent.pageSize !== this.pageSize.getValue()) {
                this.pageSize.next(pageEvent.pageSize);
            }

            if (pageEvent.pageIndex !== this.page.getValue()) {
                this.page.next(pageEvent.pageIndex);
            }

            this.refresh();
        });

        // TODO: see if we really need an observable here
        this.pageSize.subscribe(() => {
            this._changePageSizeData();
        });

        // TODO: see if we really need an observable here
        this.page.subscribe(() => {
            this._changePagesData();
        });

        this.columns.subscribe(() => this.refresh());

        this.freeTextSearch
            .subscribe(c => {
                if (c === this.search.text) {
                    return;
                }

                this.search.text = c;
                this.search.operator = !c ? 'None' : 'Auto';
                this.refresh();
            });

        this.refresh();
    }

    ngAfterContentInit(): void {

        if (this.paginators) {
            this.paginators.forEach(paginator => {

                // Update paginator when event is coming from TB
                this.totalRecords.subscribe((totalRecords: number) => paginator.length = totalRecords);
                this.page.subscribe((page: number) => paginator.pageIndex = page);
                this.pageSize.subscribe((pageSize: number) => paginator.pageSize = pageSize);

                // Handle the event when fired by the paginator
                paginator.page.subscribe((pageEvent: PageEvent) => {
                    this._pageEvent.next(pageEvent);
                });
            });
        }
    }

    goToPage(page) {
        this.page.next(page);
        this.refresh();
    }

    refresh() {
        if (this.columns.getValue().length > 0) {
            this._getCurrentPage()
                .subscribe(
                (data: any) => {
                    this._transformDataset(data, this._tbRequestRunning);
                },
                error => this._handleRequestDataError(error)
                );
        }
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

    getFullDataSource(): Observable<GridResponse> {
        const tbRequest = {
            count: this._requestCount++,
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

    private _getCurrentPage(): Observable<GridResponse> {

        if (this.columns.getValue().length === 0) {
            return;
        }

        this.isLoading = true;

        this._tbRequestRunning = {
            count: this._requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this.pageSize.getValue(),
            take: this.pageSize.getValue(),
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        } as GridRequest;

        return this._requestData(this._tbRequestRunning);
    }

    private _changePagesData() {
        if (this.settingsProvider != null) {
            this.settingsProvider.put('gridPage', this.page.getValue());
        }
    }

    private _changePageSizeData() {
        if (this.settingsProvider != null) {
            this.settingsProvider.put('gridPageSize', this.pageSize.getValue());
        }
    }

    private _getPageSettingValue() {
        if (this.settingsProvider != null) {
            return this.settingsProvider.get('gridPage') || 0;
        }

        return 0;
    }

    private _getPageSizeSettingValue() {
        if (this.settingsProvider != null) {
            return this.settingsProvider.get('gridPageSize') || 10;
        }

        return 10;
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

    private _transformDataset(response: GridResponse, req) {
        const transform = d => this._transformToObj(req.columns, d);
        const payload = (response.Payload).map(transform);
        const pageInfo = new GridPageInfo();

        // push data
        this._dataStream.next(payload);

        let totalRecords = this.columns.getValue().some(c => c.hasFilter) ?
            response.FilteredRecordCount :
            response.TotalRecordCount;

        this._totalRecords.next(totalRecords);
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
