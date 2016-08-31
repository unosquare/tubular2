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
var TbGrid = (function () {
    function TbGrid(tbDataService) {
        this.tbDataService = tbDataService;
        this.data = new BehaviorSubject_1.BehaviorSubject([]);
        this.page = new BehaviorSubject_1.BehaviorSubject(0);
        this.dataStream = this.data.asObservable();
        this.requestCount = 0;
        this.pageSize = 10;
        this.search = {
            Text: "",
            Operator: "None"
        };
        this.columns = new BehaviorSubject_1.BehaviorSubject([]);
    }
    TbGrid.prototype.ngOnInit = function () {
        var _this = this;
        // just a logging
        this.dataStream.subscribe(function (p) { return console.log("New data", p); });
        // subscriptions to events
        this.columns.subscribe(function (c) { return _this.refresh(); });
        this.page.subscribe(function (c) { return _this.refresh(); });
    };
    TbGrid.prototype.refresh = function () {
        var _this = this;
        var req = {
            Count: this.requestCount++,
            Columns: this.columns.getValue(),
            Skip: this.page.getValue() * this.pageSize,
            Take: this.pageSize,
            Search: this.search,
            TimezoneOffset: new Date().getTimezoneOffset()
        };
        this.tbDataService.retrieveData(this.serverUrl, req).subscribe(function (payload) { return _this.data.next(payload); }, function (error) { return _this.errorMessage = error; });
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