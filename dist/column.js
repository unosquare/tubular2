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
    ColumnFilterMode[ColumnFilterMode["Number"] = 2] = "Number";
    ColumnFilterMode[ColumnFilterMode["Boolean"] = 3] = "Boolean";
    ColumnFilterMode[ColumnFilterMode["Date"] = 4] = "Date";
    ColumnFilterMode[ColumnFilterMode["DateTime"] = 5] = "DateTime";
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
        this.isMultiSort = false;
        this.name = name;
        this.label = name.replace(/([a-z])([A-Z])/g, '$1 $2');
        if (searchable != null)
            this.searchable = searchable;
        if (sortable != null)
            this.sortable = sortable;
    }
    ColumnModel.prototype.getInputType = function () {
        switch (this.filterMode) {
            case ColumnFilterMode.Number:
                return "number";
            case ColumnFilterMode.Date:
                return "date";
            case ColumnFilterMode.DateTime:
                return "datetime-local";
            default:
                return "text";
        }
    };
    ColumnModel.prototype.getOperators = function () {
        switch (this.filterMode) {
            case ColumnFilterMode.String:
                return [
                    { name: "None", value: "None" },
                    { name: "Contains", value: "Contains" },
                    { name: "Not Contains", value: "NotContains" },
                    { name: "Equals", value: "Equals" },
                    { name: "Not Equals", value: "NotEquals" },
                    { name: "Starts With", value: "StartsWith" },
                    { name: "Not Starts With", value: "NotStartsWith" },
                    { name: "Ends With", value: "EndsWith" },
                    { name: "Not Ends With", value: "NotEndsWith" }
                ];
            case ColumnFilterMode.Number:
                return [
                    { name: "None", value: "None" },
                    { name: "Equals", value: "Equals" },
                    { name: "Between", value: "Between" },
                    { name: ">=", value: ">=" },
                    { name: ">", value: ">" },
                    { name: "<=", value: "<=" },
                    { name: "<", value: "<" },
                ];
            case ColumnFilterMode.Boolean:
                return [
                    { name: "None", value: "None" },
                    { name: "Equals", value: "Equals" },
                    { name: "Not Equals", value: "NotEquals" }
                ];
            case ColumnFilterMode.Date:
            case ColumnFilterMode.DateTime:
                return [
                    { name: "None", value: "None" },
                    { name: "Equals", value: "Equals" },
                    { name: "Not Equals", value: "NotEquals" },
                    { name: "Between", value: "Between" },
                    { name: ">=", value: ">=" },
                    { name: ">", value: ">" },
                    { name: "<=", value: "<=" },
                    { name: "<", value: "<" },
                ];
            default:
                return [];
        }
    };
    return ColumnModel;
}());
exports.ColumnModel = ColumnModel;
