"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const moment = require("moment");
const tubular_local_storage_service_1 = require("../core/tubular-local-storage-service");
const column_1 = require("./column");
const grid_page_info_1 = require("./grid-page-info");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
// TODO: Add animation to sortable
class GridComponent {
    constructor(settingsProvider, http) {
        this.settingsProvider = settingsProvider;
        this.http = http;
        // data is just observable and children can't push
        this.data = new BehaviorSubject_1.BehaviorSubject([]);
        this.dataStream = this.data.asObservable();
        this._pageInfo = new BehaviorSubject_1.BehaviorSubject(new grid_page_info_1.GridPageInfo());
        this.pageInfo = this._pageInfo.asObservable();
        this._pageSize = new BehaviorSubject_1.BehaviorSubject(this.getPageSizeSettingValue());
        this.pageSize = this._pageSize.asObservable();
        // values that to observe and allow to push from children
        this.page = new BehaviorSubject_1.BehaviorSubject(this.getPageSettingValue());
        this.columns = new BehaviorSubject_1.BehaviorSubject([]);
        this.freeTextSearch = new BehaviorSubject_1.BehaviorSubject('');
        this.pageSet = false;
        this.isLoading = false;
        this.search = {
            text: '',
            operator: 'None'
        };
        this.requestCount = 0;
        this.beforeRequest = new core_1.EventEmitter();
    }
    goToPage(page) {
        this.pageSet = true;
        this.page.next(page);
    }
    refresh() {
        if (this.pageSet && this.columns.getValue().length > 0 && this._pageSize.getValue() > 0) {
            this.getCurrentPage()
                .subscribe((data) => {
                this.transformDataset(data, this.tbRequestRunning);
            });
        }
    }
    getCurrentPage() {
        this.isLoading = true;
        this.tbRequestRunning = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this._pageSize.getValue(),
            take: this._pageSize.getValue(),
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        };
        return this.requestData(this.tbRequestRunning);
    }
    getFullDataSource() {
        const tbRequest = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: 0,
            take: -1,
            search: {
                text: '',
                operator: 'None'
            }
        };
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
    requestData(tbRequest) {
        // transform direction values to strings
        tbRequest.columns.forEach(this.transformSortDirection);
        const ngRequestOptions = new http_1.RequestOptions({
            body: tbRequest,
            url: this.dataUrl,
            method: this.requestMethod || 'POST',
            withCredentials: false,
            responseType: http_1.ResponseContentType.Json
        });
        this.beforeRequest.emit(ngRequestOptions);
        const ngRequest = new http_1.Request(ngRequestOptions);
        return this.http.request(ngRequest).map((response) => {
            this.isLoading = false;
            return response.json();
        });
    }
    transformSortDirection(column) {
        switch (column.direction) {
            case column_1.ColumnSortDirection.Asc:
                column.sortDirection = 'Ascending';
                break;
            case column_1.ColumnSortDirection.Desc:
                column.sortDirection = 'Descending';
                break;
            default:
                column.sortDirection = 'None';
        }
    }
    transformToObj(columns, data) {
        const obj = {};
        columns.forEach((column, key) => {
            obj[column.name] = data[key] || data[column.name];
            if (column.dataType === column_1.ColumnDataType.DateTimeUtc) {
                obj[column.name] = moment.utc(obj[column.name]);
            }
            if (column.dataType === column_1.ColumnDataType.Date || column.dataType === column_1.ColumnDataType.DateTime) {
                obj[column.name] = moment(obj[column.name]);
            }
        });
        return obj;
    }
    transformDataset(data, req) {
        const transform = (d) => this.transformToObj(req.columns, d);
        const payload = (data.Payload || {}).map(transform);
        // push data
        this.data.next(payload);
        const pageInfo = new grid_page_info_1.GridPageInfo();
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
GridComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tb-grid',
                templateUrl: 'grid.html',
                styleUrls: ['grid.css']
            },] },
];
/** @nocollapse */
GridComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [tubular_local_storage_service_1.SETTINGS_PROVIDER,] },] },
    { type: http_1.Http, },
];
GridComponent.propDecorators = {
    'dataUrl': [{ type: core_1.Input },],
    'requestMethod': [{ type: core_1.Input },],
    'requestTimeout': [{ type: core_1.Input },],
    'beforeRequest': [{ type: core_1.Output },],
};
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.js.map