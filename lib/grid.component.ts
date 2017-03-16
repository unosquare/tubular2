import { Component, Input, Output, EventEmitter, Inject, Optional } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';

import { TubularHttpService } from './tubular-http.service';
import { SETTINGS_PROVIDER, ITubularSettingsProvider } from './tubular-settings.service';
import { ColumnModel, DataType, ColumnSortDirection } from './column.model';

import 'rxjs/add/operator/debounceTime';

export class GridPageInfo {
    currentInitial = 0;
    currentTop = 0;
    currentPage = 0;
    totalPages = 0;
    totalRecordCount = 0;
    filteredRecordCount = 0;
}

@Component({
    selector: 'tubular-grid',
    template: `
    <div>
        <div class="tubular-overlay" [hidden]="!showLoading">
            <div><div class="fa fa-refresh fa-2x fa-spin"></div>
        </div></div>
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
export class GridComponent {

    // data is just observable and children can't push
    private data = new BehaviorSubject([]);
    dataStream = this.data.asObservable();
    private _pageInfo = new BehaviorSubject(new GridPageInfo());
    pageInfo = this._pageInfo.asObservable();

    _pageSize = new BehaviorSubject(this.getPageSizeSettingValue());
    pageSize = this._pageSize.asObservable();

    // values that to observe and allow to push from children
    page = new BehaviorSubject(this.getPageSettingValue());
    columns = new BehaviorSubject([]);
    freeTextSearch = new BehaviorSubject('');

    pageSet = false;

    showLoading = false;
    search = {
        text: '',
        operator: 'None'
    };

    private requestCount = 0;

    @Input() public dataUrl: string;
    @Input() public requireAuthentication: boolean;
    @Input() public requestTimeout: number;
    @Input() public saveUrl: string;

    @Output() onDataError = new EventEmitter<any>();
    @Output() onDataSaved = new EventEmitter<any>();

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private httpService: TubularHttpService) { }

    private ngOnInit() {
        // just a logging
        this.dataStream.subscribe((p) => console.log('New data', p));

        // subscriptions to events
        this.pageSize.subscribe(c => {
            this.refresh();
            this.changePageSizeData()
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
    }

    public goToPage(page) {
        this.pageSet = true;
        this.page.next(page);
    }

    public refresh() {
        if (this.pageSet && this.columns.getValue().length > 0 && this._pageSize.getValue() > 0) {
            this.getCurrentPage((data, req) => this.transformDataset(data, req));
        }
    }

    public getCurrentPage(callback) {
        let req = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this._pageSize.getValue(),
            take: this._pageSize.getValue(),
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        };
        
        // transform direction values to strings
        req.columns.forEach(this.transformSortDirection);

        this.httpService.post(this.dataUrl, req).subscribe(
            data => callback(data, req),
            error => this.onDataError.emit(error)
        );
    }

    public getFullDataSource(callback) {
        let req = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: 0,
            take: -1,
            search: {
                text: '',
                operator: 'None'
            }
        };

        this.httpService.post(this.dataUrl, req).subscribe(
            (data) => callback(data.Payload || {}),
            (error) => this.onDataError.emit(error)
        );
    }

    onUpdate(row) {
        this.httpService
            .save(this.saveUrl, row.values, row.$isNew ? RequestMethod.Post : RequestMethod.Put)
            .subscribe(
            data => this.onDataSaved.emit(data),
            error => this.onDataError.emit(error),
            () => this.refresh());
    }

    changePagesData() {
        if (this.settingsProvider != null) {
            this.settingsProvider.put("gridPage", this.page.getValue());
        }
    }

    changePageSizeData() {
        if (this.settingsProvider != null) {
            this.settingsProvider.put("gridPageSize", this._pageSize.getValue());
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
        let transform = d => this.transformToObj(req.columns, d);
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
