"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var moment = require("moment");
var tubular_http_service_1 = require("./tubular-http.service");
var tubular_settings_service_1 = require("./tubular-settings.service");
var column_1 = require("./column");
require("rxjs/add/operator/debounceTime");
var GridPageInfo = (function () {
    function GridPageInfo() {
        this.currentInitial = 0;
        this.currentTop = 0;
        this.currentPage = 0;
        this.totalPages = 0;
        this.totalRecordCount = 0;
        this.filteredRecordCount = 0;
    }
    return GridPageInfo;
}());
exports.GridPageInfo = GridPageInfo;
var TubularGrid = (function () {
    function TubularGrid(settingsProvider, httpService) {
        this.settingsProvider = settingsProvider;
        this.httpService = httpService;
        // data is just observable and children can't push
        this.data = new BehaviorSubject_1.BehaviorSubject([]);
        this.dataStream = this.data.asObservable();
        this._pageInfo = new BehaviorSubject_1.BehaviorSubject(new GridPageInfo());
        this.pageInfo = this._pageInfo.asObservable();
        this._pageSize = new BehaviorSubject_1.BehaviorSubject(this.getPageSizeSettingValue());
        this.pageSize = this._pageSize.asObservable();
        // values that to observe and allow to push from children
        this.page = new BehaviorSubject_1.BehaviorSubject(this.getPageSettingValue());
        this.columns = new BehaviorSubject_1.BehaviorSubject([]);
        this.freeTextSearch = new BehaviorSubject_1.BehaviorSubject("");
        this.pageSet = false;
        this.showLoading = false;
        this.requestCount = 0;
        this.search = {
            text: "",
            operator: "None"
        };
        this.onDataError = new core_1.EventEmitter();
        this.onDataSaved = new core_1.EventEmitter();
    }
    TubularGrid.prototype.ngOnInit = function () {
        var _this = this;
        // just a logging
        this.dataStream.subscribe(function (p) { return console.log("New data", p); });
        // subscriptions to events
        this.pageSize.subscribe(function (c) {
            _this.refresh();
            _this.changePageSizeData();
        });
        this.columns.subscribe(function (c) {
            _this.refresh();
        });
        this.page.subscribe(function (c) {
            _this.refresh();
            _this.changePagesData();
        });
        this.freeTextSearch
            .debounceTime(500)
            .subscribe(function (c) {
            if (c === _this.search.text)
                return;
            _this.search.text = c;
            _this.search.operator = !c ? "None" : "Auto";
            _this.refresh();
        });
    };
    TubularGrid.prototype.goToPage = function (page) {
        this.pageSet = true;
        this.page.next(page);
    };
    TubularGrid.prototype.refresh = function () {
        var _this = this;
        if (this.pageSet && this.columns.getValue().length > 0 && this._pageSize.getValue() > 0) {
            this.getCurrentPage(function (data, req) { return _this.transformDataset(data, req); });
        }
    };
    TubularGrid.prototype.getCurrentPage = function (callback) {
        var _this = this;
        var req = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this._pageSize.getValue(),
            take: this._pageSize.getValue(),
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        };
        this.httpService.post(this.serverUrl, req).subscribe(function (data) { return callback(data, req); }, function (error) { return _this.onDataError.emit(error); });
    };
    TubularGrid.prototype.getFullDataSource = function (callback) {
        var _this = this;
        var req = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: 0,
            take: -1,
            search: {
                text: '',
                operator: 'None'
            }
        };
        this.httpService.post(this.serverUrl, req).subscribe(function (data) { return callback(data.Payload || {}); }, function (error) { return _this.onDataError.emit(error); });
    };
    TubularGrid.prototype.onUpdate = function (row) {
        var _this = this;
        this.httpService
            .save(this.serverSaveUrl, row.values, row.$isNew ? http_1.RequestMethod.Post : http_1.RequestMethod.Put)
            .subscribe(function (data) { return _this.onDataSaved.emit(data); }, function (error) { return _this.onDataError.emit(error); }, function () { return _this.refresh(); });
    };
    TubularGrid.prototype.transformToObj = function (columns, data) {
        var obj = {};
        columns.forEach(function (column, key) {
            obj[column.name] = data[key] || data[column.name];
            if (column.dataType == column_1.DataType.DateTimeUtc) {
                obj[column.name] = moment.utc(obj[column.name]);
            }
            if (column.dataType == column_1.DataType.Date || column.dataType == column_1.DataType.DateTime) {
                obj[column.name] = moment(obj[column.name]);
            }
        });
        return obj;
    };
    TubularGrid.prototype.transformDataset = function (data, req) {
        var _this = this;
        var transform = function (d) { return _this.transformToObj(req.columns, d); };
        var payload = (data.Payload || {}).map(transform);
        // push data
        this.data.next(payload);
        var pageInfo = new GridPageInfo();
        pageInfo.currentPage = data.CurrentPage;
        pageInfo.totalPages = data.TotalPages;
        pageInfo.filteredRecordCount = data.FilteredRecordCount;
        pageInfo.totalRecordCount = data.TotalRecordCount;
        pageInfo.currentInitial = ((pageInfo.currentPage - 1) * this._pageSize.getValue()) + 1;
        if (pageInfo.currentInitial <= 0)
            pageInfo.currentInitial = data.TotalRecordCount > 0 ? 1 : 0;
        pageInfo.currentTop = this._pageSize.getValue() * pageInfo.currentPage;
        if (pageInfo.currentTop <= 0 || pageInfo.currentTop > data.filteredRecordCount)
            pageInfo.currentTop = data.filteredRecordCount;
        // push page Info
        this._pageInfo.next(pageInfo);
    };
    TubularGrid.prototype.changePagesData = function () {
        if (this.settingsProvider != null)
            this.settingsProvider.put("gridPage", this.page.getValue());
    };
    TubularGrid.prototype.changePageSizeData = function () {
        if (this.settingsProvider != null)
            this.settingsProvider.put("gridPageSize", this._pageSize.getValue());
    };
    TubularGrid.prototype.getPageSettingValue = function () {
        if (this.settingsProvider != null)
            return this.settingsProvider.get("gridPage") || 0;
        else
            return 0;
    };
    TubularGrid.prototype.getPageSizeSettingValue = function () {
        if (this.settingsProvider != null)
            return this.settingsProvider.get("gridPageSize") || 10;
        else
            return 10;
    };
    return TubularGrid;
}());
__decorate([
    core_1.Input('server-url'),
    __metadata("design:type", String)
], TubularGrid.prototype, "serverUrl", void 0);
__decorate([
    core_1.Input('require-authentication'),
    __metadata("design:type", Boolean)
], TubularGrid.prototype, "requireAuthentication", void 0);
__decorate([
    core_1.Input('request-timeout'),
    __metadata("design:type", Number)
], TubularGrid.prototype, "requestTimeout", void 0);
__decorate([
    core_1.Input('server-save-url'),
    __metadata("design:type", String)
], TubularGrid.prototype, "serverSaveUrl", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TubularGrid.prototype, "onDataError", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TubularGrid.prototype, "onDataSaved", void 0);
TubularGrid = __decorate([
    core_1.Component({
        selector: 'tubular-grid',
        template: "\n    <div>\n        <div class=\"tubular-overlay\" [hidden]=\"!showLoading\">\n            <div><div class=\"fa fa-refresh fa-2x fa-spin\"></div>\n        </div></div>\n        <ng-content></ng-content>\n    </div>",
        styles: [
            ':host /deep/ div.row { margin-top: 4px; margin-bottom: 4px; }',
            ':host /deep/ div.row:first { margin-top: 0; }',
            ':host /deep/ .sortable { text-decoration: underline; cursor: pointer; }',
            ':host /deep/ .sortable:hover { text-decoration: none; color: yellow; }',
            ':host /deep/ .sortAsc::after { font-family: FontAwesome; content: "\\f176"; }',
            ':host /deep/ .sortDesc::after { font-family: FontAwesome; content: "\\f175"; }'
        ]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, tubular_http_service_1.TubularHttpService])
], TubularGrid);
exports.TubularGrid = TubularGrid;
