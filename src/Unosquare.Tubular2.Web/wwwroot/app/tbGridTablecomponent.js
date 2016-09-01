"use strict";
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var tbColumn_model_1 = require('./tbColumn.model');
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
    TbGridTable.prototype.sort = function (column) {
        // TODO: Check logic
        if (column.direction == tbColumn_model_1.TbColumnSortDirection.None)
            column.direction = tbColumn_model_1.TbColumnSortDirection.Asc;
        else if (column.direction == tbColumn_model_1.TbColumnSortDirection.Asc)
            column.direction = tbColumn_model_1.TbColumnSortDirection.Desc;
        else if (column.direction == tbColumn_model_1.TbColumnSortDirection.Desc)
            column.direction = tbColumn_model_1.TbColumnSortDirection.None;
        column.sortOrder = column.direction == tbColumn_model_1.TbColumnSortDirection.None ? 0 : 1;
        var val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    };
    return TbGridTable;
}());
exports.TbGridTable = TbGridTable;
//# sourceMappingURL=tbGridTablecomponent.js.map