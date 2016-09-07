"use strict";
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var column_1 = require('./column');
var TbGridTable = (function () {
    function TbGridTable(tbGrid) {
        var _this = this;
        this.columnObservable = new BehaviorSubject_1.BehaviorSubject([]);
        this.columns = this.columnObservable.asObservable();
        this.isFiltering = false;
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
        // TODO: Check logic from previous
        if (column.direction === column_1.ColumnSortDirection.None)
            column.direction = column_1.ColumnSortDirection.Asc;
        else if (column.direction === column_1.ColumnSortDirection.Asc)
            column.direction = column_1.ColumnSortDirection.Desc;
        else if (column.direction === column_1.ColumnSortDirection.Desc)
            column.direction = column_1.ColumnSortDirection.None;
        column.sortOrder = column.direction === column_1.ColumnSortDirection.None ? 0 : 1;
        var val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    };
    return TbGridTable;
}());
exports.TbGridTable = TbGridTable;
//# sourceMappingURL=tbGridTable.js.map