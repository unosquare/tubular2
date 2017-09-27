import {
    Component, Input, Output, EventEmitter, ContentChildren, AfterViewInit, AfterContentInit,
    OnInit, Inject, Optional, ComponentFactoryResolver, QueryList
} from '@angular/core';

import {
    RequestMethod, Http, RequestOptions,
    ResponseContentType, Request, Response
} from '@angular/http';

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from '../core/tubular-local-storage-service';
import { GridRequest, GridSearchParameter } from './grid-request';
import { TbColumn } from './tb-column.component';
import { ColumnModel, ColumnDataType, ColumnSortDirection } from './column';
import { GridResponse } from './grid-response';
import { DataService } from '../services/data.service';


import { DataSource } from '@angular/cdk/collections';
import { CdkTable } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';


@Component({
    selector: 'tb-grid2',
    templateUrl: './grid2.html',
    styleUrls: ['./grid.css']
})
export class TbGridComponent implements OnInit, AfterContentInit {

    data = new BehaviorSubject([]);
    tbRequestRunning: GridRequest;
    displayedColumns = ['position', 'name'];
    dataSource: TubularDataSource2 | null;
    pageSet = false;
    requestCount = 0;

    public dataStream = this.data.asObservable();
    public _pageSize = new BehaviorSubject(this.getPageSizeSettingValue());
    public pageSize = this._pageSize.asObservable();
    public page = new BehaviorSubject(this.getPageSettingValue());
    public isLoading = false;
    public columns = new BehaviorSubject([]);

    @ContentChildren(TbColumn) tbColumns: QueryList<TbColumn>;


    @Input() public dataUrl: string;
    @Input() public requestMethod: string | RequestMethod;

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private dataService: DataService) {

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

    public getCurrentPage(): Observable<GridResponse> {
        this.isLoading = true;

        this.tbRequestRunning = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this._pageSize.getValue(),
            take: this._pageSize.getValue(),
            // search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        } as GridRequest;

        return this.requestData(this.tbRequestRunning);
    }

    public getFullDataSource(): Observable<GridResponse> {
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
        this.dataStream.subscribe(p => console.log('New data'));

        // subscriptions to events
        this.pageSize.subscribe(() => {
            this.refresh();
            // this.changePageSizeData();
        });

        // this.columns.subscribe(() => this.refresh());

        this.page.subscribe(() => {
            this.refresh();
            // this.changePagesData();
        });

        // this.freeTextSearch
        //     .subscribe(c => {
        //         if (c === this.search.text) {
        //             return;
        //         }

        //         this.search.text = c;
        //         this.search.operator = !c ? 'None' : 'Auto';
        //         this.refresh();
        //     });
    }

    ngAfterContentInit() {
        this.tbColumns.forEach(column => {
            this.columns.getValue().push(new ColumnModel(column.columnDef, false, false));
        });

        this.initDatasource();

        this.goToPage(0);
    }

    initDatasource() {
        this.dataSource = new TubularDataSource2(this);
        console.log(this.tbColumns, this.columns.getValue(), 'initDataSource');

        // if (this.mdSort) {
        //     this.mdSort.mdSortChange.subscribe(element => {
        //         this.sortByColumnName(element.active);
        //     })
        // }
    }

    private requestData(tbRequest: GridRequest): Observable<GridResponse> {
        // transform direction values to strings
        tbRequest.columns.forEach(this.transformSortDirection);

        const ngRequestOptions = new RequestOptions({
            body: tbRequest,
            url: this.dataUrl,
            method: this.requestMethod || 'POST',
            withCredentials: false,
            responseType: ResponseContentType.Json
        });

        const ngRequest = new Request(ngRequestOptions);

        const result = this.dataService.getData(ngRequest);

        return result.map(response => {
            this.isLoading = false;
            return response;
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

            // if (column.dataType === ColumnDataType.DateTimeUtc) {
            //     obj[column.name] = moment.utc(obj[column.name]);
            // }

            // if (column.dataType === ColumnDataType.Date || column.dataType === ColumnDataType.DateTime) {
            //     obj[column.name] = moment(obj[column.name]);
            // }
        });

        return obj;
    }

    private transformDataset(data, req) {
        const transform = d => this.transformToObj(req.columns, d);
        const payload = (data.Payload || {}).map(transform);
        // push data
        this.data.next(payload);

        // const pageInfo = new GridPageInfo();
        // pageInfo.currentPage = data.CurrentPage;
        // pageInfo.totalPages = data.TotalPages;
        // pageInfo.filteredRecordCount = data.FilteredRecordCount;
        // pageInfo.totalRecordCount = data.TotalRecordCount;

        // pageInfo.currentInitial = ((pageInfo.currentPage - 1) * this._pageSize.getValue()) + 1;

        // if (pageInfo.currentInitial <= 0) {
        //     pageInfo.currentInitial = data.TotalRecordCount > 0 ? 1 : 0;
        // }

        // pageInfo.currentTop = this._pageSize.getValue() * pageInfo.currentPage;

        // if (pageInfo.currentTop <= 0 || pageInfo.currentTop > data.filteredRecordCount) {
        //     pageInfo.currentTop = data.filteredRecordCount;
        // }

        // // push page Info
        // this._pageInfo.next(pageInfo);
    }

}

export interface Element {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const data: Element[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Element[]> {
        return Observable.of(data);
    }

    disconnect() { }
}

export class TubularDataSource2 extends DataSource<any> {
    constructor(private _tbGrid: TbGridComponent) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        return this._tbGrid.dataStream;
    }

    disconnect() { }
}