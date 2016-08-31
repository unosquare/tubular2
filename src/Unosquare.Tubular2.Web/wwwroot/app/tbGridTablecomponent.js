"use strict";
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var TbGridTable = (function () {
    function TbGridTable(tbGrid) {
        var _this = this;
        this.columnObservable = new BehaviorSubject_1.BehaviorSubject([]);
        this.columns = this.columnObservable.asObservable();
        tbGrid.dataStream.subscribe(function (payload) { return _this.rows = payload; });
        this.columnObservable.subscribe(function (payload) { return tbGrid.columns.next(payload); });
    }
    TbGridTable.prototype.addColumns = function (columns) {
        var _this = this;
        columns.forEach(function (c) {
            var val = _this.columnObservable.getValue();
            val.push(c);
            _this.columnObservable.next(val);
        });
    };
    return TbGridTable;
}());
exports.TbGridTable = TbGridTable;
//# sourceMappingURL=tbGridTablecomponent.js.map