"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var column_1 = require('./column');
var PopupContainer = (function () {
    function PopupContainer() {
    }
    PopupContainer.prototype.setPopup = function (ref) {
        var _this = this;
        if (!ref)
            return;
        this.popupRef = ref;
        this.popupRef.result.then(function (data) { return _this.onUpdate(data); }, this.onDismiss);
    };
    return PopupContainer;
}());
exports.PopupContainer = PopupContainer;
var GridTable = (function (_super) {
    __extends(GridTable, _super);
    function GridTable(tbGrid) {
        var _this = this;
        _super.call(this);
        this.tbGrid = tbGrid;
        this.columnObservable = new BehaviorSubject_1.BehaviorSubject([]);
        this.columns = this.columnObservable.asObservable();
        this.tbGrid.dataStream.subscribe(function (payload) { return _this.rows = payload; });
        this.columnObservable.subscribe(function (payload) { return _this.tbGrid.columns.next(payload); });
    }
    GridTable.prototype.addColumns = function (columns) {
        var _this = this;
        columns.forEach(function (c) {
            var val = _this.columnObservable.getValue();
            val.push(c);
            _this.columnObservable.next(val);
        });
    };
    GridTable.prototype.sort = function (column) {
        var value = this.columnObservable.getValue();
        if (!column.sortable)
            return;
        if (column.direction === column_1.ColumnSortDirection.None)
            column.direction = column_1.ColumnSortDirection.Asc;
        else if (column.direction === column_1.ColumnSortDirection.Asc)
            column.direction = column_1.ColumnSortDirection.Desc;
        else if (column.direction === column_1.ColumnSortDirection.Desc)
            column.direction = column_1.ColumnSortDirection.None;
        column.sortOrder = column.direction === column_1.ColumnSortDirection.None ? 0 : Number.MAX_VALUE;
        if (!column.isMultiSort) {
            value.forEach(function (v) { return v.sortOrder = v.name == column.name ? v.sortOrder : 0; });
            value.forEach(function (v) { return v.direction = v.name == column.name ? column.direction : column_1.ColumnSortDirection.None; });
        }
        var currentlySortedColumns = value.filter(function (col) { return col.sortOrder > 0; });
        currentlySortedColumns.sort(function (a, b) { return a.sortOrder === b.sortOrder ? 0 : 1; });
        currentlySortedColumns.forEach(function (col, index) { col.sortOrder = index + 1; });
        this.columnObservable.next(value);
    };
    GridTable.prototype.applyFilter = function (column) {
        var val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    };
    return GridTable;
}(PopupContainer));
exports.GridTable = GridTable;
//# sourceMappingURL=grid-table.js.map