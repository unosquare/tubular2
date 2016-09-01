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
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var tbData_service_1 = require('./tbData.service');
require('rxjs/add/operator/debounceTime');
var TbGrid = (function () {
    function TbGrid(tbDataService) {
        this.tbDataService = tbDataService;
        // data is just observable and children can't push
        this._data = new BehaviorSubject_1.BehaviorSubject([]);
        this.dataStream = this._data.asObservable();
        this._totalPages = new BehaviorSubject_1.BehaviorSubject(0);
        this.totalPages = this._totalPages.asObservable();
        this._totalRecordCount = new BehaviorSubject_1.BehaviorSubject(0);
        this.totalRecordCount = this._totalRecordCount.asObservable();
        this._filteredRecordCount = new BehaviorSubject_1.BehaviorSubject(0);
        this.filteredRecordCount = this._filteredRecordCount.asObservable();
        // values that to observe and allow to push from children
        this.page = new BehaviorSubject_1.BehaviorSubject(0);
        this.columns = new BehaviorSubject_1.BehaviorSubject([]);
        this.freeTextSearch = new BehaviorSubject_1.BehaviorSubject("");
        this.requestCount = 0;
        this.pageSize = 10;
        this.search = {
            text: "",
            operator: "None"
        };
    }
    TbGrid.prototype.ngOnInit = function () {
        var _this = this;
        // just a logging
        this.dataStream.subscribe(function (p) { return console.log("New data", p); });
        // subscriptions to events
        this.columns.subscribe(function (c) { return _this.refresh(); });
        this.page.subscribe(function (c) { return _this.refresh(); });
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
    TbGrid.prototype.refresh = function () {
        var _this = this;
        var req = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this.pageSize,
            take: this.pageSize,
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        };
        this.tbDataService.retrieveData(this.serverUrl, req).subscribe(function (data) {
            var transform = function (d) { return _this.transformToObj(req.columns, d); };
            var payload = (data.Payload || {}).map(transform);
            _this._data.next(payload);
            _this._filteredRecordCount.next(data.FilteredRecordCount);
            _this._totalPages.next(data.TotalPages);
            _this._totalRecordCount.next(data.TotalRecordCount);
        }, function (error) { return _this.errorMessage = error; });
    };
    TbGrid.prototype.transformToObj = function (columns, data) {
        var obj = {};
        columns.forEach(function (column, key) { return obj[column.name] = data[key] || data[column.name]; });
        return obj;
    };
    __decorate([
        core_1.Input('server-url'), 
        __metadata('design:type', String)
    ], TbGrid.prototype, "serverUrl", void 0);
    __decorate([
        core_1.Input('require-authentication'), 
        __metadata('design:type', Boolean)
    ], TbGrid.prototype, "requireAuthentication", void 0);
    TbGrid = __decorate([
        core_1.Component({
            selector: 'tb-grid',
            template: "\n    <div>\n        <div class=\"tubular-overlay\" [hidden]=\"showLoading && currentRequest != null\">\n            <div><div class=\"fa fa-refresh fa-2x fa-spin\"></div>\n        </div></div>\n        <ng-content></ng-content>\n    </div>"
        }), 
        __metadata('design:paramtypes', [tbData_service_1.TbDataService])
    ], TbGrid);
    return TbGrid;
}());
exports.TbGrid = TbGrid;
//# sourceMappingURL=tbGrid.component.js.map