import {
    Component, Input, Output, EventEmitter, ViewChild, QueryList,
    OnInit, AfterContentInit, Inject, Optional, ContentChild, ContentChildren
} from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';

import * as momentNs from 'moment';
const moment = momentNs;

import { MatSort, MatPaginator, PageEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from '../core/tubular-local-storage-service';
import { GridPageInfo } from './grid-page-info';
import { GridRequest, ColumnModel, ColumnDataType } from 'tubular-common';
import { GridResponse } from 'tubular-common';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

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
    };

    @Input() public dataUrl: string;
    @Input() public requestMethod: string;
    @Input() public requestTimeout: number;

    @Output() public beforeRequest = new EventEmitter<any>();
    @Output() public onRequestDataError = new EventEmitter<any>();

    @ContentChild(MatSort) sorting: MatSort;
    @ContentChildren(MatPaginator) paginators: QueryList<MatPaginator>;

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private http: HttpClient) {
    }

    ngOnInit() {

        this.dataSource = new TubularDataSource(this);

        // subscriptions to events
        if (this.sorting) {
            this.sorting.sortChange.subscribe(element => {
                this.sortByColumnName(element.active);
            });
        }

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
        const columnModel = value.find(c => c.Name === columnName);
        console.log(value);
        console.log(columnModel);
        if (!columnModel) {
            throw Error('Invalid column name');
        }
        this.columns.next( ColumnModel.sortColumnArray(columnName, value, true));

        // this.refresh();
    }


    filterByColumnName(columnName: string) {
        const value = this.columns.getValue();
        const columnModel = value.find(c => c.Name === columnName);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.columns.next(value);
    }

    getFullDataSource(): Observable<object> {
        const tbRequest: GridRequest = {
            Counter: this._requestCount++,
            Columns: this.columns.getValue(),
            Skip: 0,
            Take: -1,
            Search: {
                text: '',
                operator: 'None'
            },
            TimezoneOffset: new Date().getTimezoneOffset()
        };

        return this._requestData(tbRequest);
    }

    private _getCurrentPage(): Observable<GridResponse> {

        if (this.columns.getValue().length === 0) {
            return;
        }

        this.isLoading = true;

        this._tbRequestRunning = {
            Columns: this.columns.getValue(),
            Counter: this._requestCount++,
            Search: this.search,
            Skip: this.page.getValue() * this.pageSize.getValue(),
            Take: this.pageSize.getValue(),
            TimezoneOffset: new Date().getTimezoneOffset()
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

    private _requestData(tbRequest: GridRequest): Observable<GridResponse> {
        // transform direction values to strings
        const result = this.http.request<GridResponse>(
            this.requestMethod || 'POST',
            this.dataUrl,
            {
                body: tbRequest,
                withCredentials: false,
                responseType: 'json'
            }
        );

        return result.pipe(
            map(response => {
                this.isLoading = false;
                return response;
            }));
    }

    private _handleRequestDataError(error) {
        if (this.onRequestDataError) {
            this.onRequestDataError.emit(error);
        }
    }

    private _transformToObj(columns: ColumnModel[], data: any) {
        const obj = {};

        columns.forEach((column, key) => {
            obj[column.Name] = data[key] || data[column.Name];

            if (column.DataType === ColumnDataType.DATE_TIME_UTC) {
                obj[column.Name] = moment.utc(obj[column.Name]);
            }

            if (column.DataType === ColumnDataType.DATE || column.DataType === ColumnDataType.DATE_TIME) {
                obj[column.Name] = moment(obj[column.Name]);
            }
        });

        return obj;
    }

    private _transformDataset(response: GridResponse, req) {
        const transform = d => this._transformToObj(req.Columns, d);
        const payload = (response.Payload).map(transform);
        const pageInfo = new GridPageInfo();

        // push data
        this._dataStream.next(payload);

        const totalRecords = this.columns.getValue().some(c => c.hasFilter) ?
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
