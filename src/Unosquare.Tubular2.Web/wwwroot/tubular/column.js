"use strict";
(function (DataType) {
    DataType[DataType["String"] = 1] = "String";
    DataType[DataType["Number"] = 2] = "Number";
    DataType[DataType["Boolean"] = 3] = "Boolean";
    DataType[DataType["Date"] = 4] = "Date";
    DataType[DataType["DateTime"] = 5] = "DateTime";
    DataType[DataType["DateTimeUtc"] = 6] = "DateTimeUtc";
})(exports.DataType || (exports.DataType = {}));
var DataType = exports.DataType;
(function (ColumnSortDirection) {
    ColumnSortDirection[ColumnSortDirection["None"] = 0] = "None";
    ColumnSortDirection[ColumnSortDirection["Asc"] = 1] = "Asc";
    ColumnSortDirection[ColumnSortDirection["Desc"] = 2] = "Desc";
})(exports.ColumnSortDirection || (exports.ColumnSortDirection = {}));
var ColumnSortDirection = exports.ColumnSortDirection;
(function (ColumnFilterMode) {
    ColumnFilterMode[ColumnFilterMode["None"] = 0] = "None";
    ColumnFilterMode[ColumnFilterMode["String"] = 1] = "String";
})(exports.ColumnFilterMode || (exports.ColumnFilterMode = {}));
var ColumnFilterMode = exports.ColumnFilterMode;
(function (FilterOperator) {
    FilterOperator[FilterOperator["None"] = 0] = "None";
    FilterOperator[FilterOperator["Equals"] = 1] = "Equals";
})(exports.FilterOperator || (exports.FilterOperator = {}));
var FilterOperator = exports.FilterOperator;
var ColumnFilter = (function () {
    function ColumnFilter() {
    }
    return ColumnFilter;
}());
exports.ColumnFilter = ColumnFilter;
var ColumnModel = (function () {
    function ColumnModel(name, searchable, sortable) {
        this.searchable = true;
        this.sortable = true;
        this.sortOrder = 0;
        this.direction = ColumnSortDirection.None;
        this.visible = true;
        this.dataType = DataType.String;
        this.hasFilter = false;
        this.filterMode = ColumnFilterMode.None;
        this.filter = new ColumnFilter();
        this.name = name;
        this.label = name.replace(/([a-z])([A-Z])/g, '$1 $2');
        if (searchable != null)
            this.searchable = searchable;
        if (sortable != null)
            this.sortable = sortable;
    }
    return ColumnModel;
}());
exports.ColumnModel = ColumnModel;
//# sourceMappingURL=column.js.map