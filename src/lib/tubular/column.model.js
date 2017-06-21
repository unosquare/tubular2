"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataType;
(function (DataType) {
    DataType[DataType["String"] = 1] = "String";
    DataType[DataType["Number"] = 2] = "Number";
    DataType[DataType["Boolean"] = 3] = "Boolean";
    DataType[DataType["Date"] = 4] = "Date";
    DataType[DataType["DateTime"] = 5] = "DateTime";
    DataType[DataType["DateTimeUtc"] = 6] = "DateTimeUtc";
})(DataType = exports.DataType || (exports.DataType = {}));
var ColumnSortDirection;
(function (ColumnSortDirection) {
    ColumnSortDirection[ColumnSortDirection["None"] = 0] = "None";
    ColumnSortDirection[ColumnSortDirection["Asc"] = 1] = "Asc";
    ColumnSortDirection[ColumnSortDirection["Desc"] = 2] = "Desc";
})(ColumnSortDirection = exports.ColumnSortDirection || (exports.ColumnSortDirection = {}));
var ColumnFilterMode;
(function (ColumnFilterMode) {
    ColumnFilterMode[ColumnFilterMode["None"] = 0] = "None";
    ColumnFilterMode[ColumnFilterMode["String"] = 1] = "String";
    ColumnFilterMode[ColumnFilterMode["Number"] = 2] = "Number";
    ColumnFilterMode[ColumnFilterMode["Boolean"] = 3] = "Boolean";
    ColumnFilterMode[ColumnFilterMode["Date"] = 4] = "Date";
    ColumnFilterMode[ColumnFilterMode["DateTime"] = 5] = "DateTime";
})(ColumnFilterMode = exports.ColumnFilterMode || (exports.ColumnFilterMode = {}));
class ColumnFilter {
}
exports.ColumnFilter = ColumnFilter;
class ColumnModel {
    constructor(name, searchable, sortable) {
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
        this.sortDirection = 'None';
        this.name = name;
        this.label = name.replace(/([a-z])([A-Z])/g, '$1 $2');
        if (searchable != null) {
            this.searchable = searchable;
        }
        if (sortable != null) {
            this.sortable = sortable;
        }
    }
    getInputType() {
        switch (this.filterMode) {
            case ColumnFilterMode.Number:
                return 'number';
            case ColumnFilterMode.Date:
                return 'date';
            case ColumnFilterMode.DateTime:
                return 'datetime-local';
            default:
                return 'text';
        }
    }
    getOperators() {
        switch (this.filterMode) {
            case ColumnFilterMode.String:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Contains', value: 'Contains' },
                    { name: 'Not Contains', value: 'NotContains' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Not Equals', value: 'NotEquals' },
                    { name: 'Starts With', value: 'StartsWith' },
                    { name: 'Not Starts With', value: 'NotStartsWith' },
                    { name: 'Ends With', value: 'EndsWith' },
                    { name: 'Not Ends With', value: 'NotEndsWith' }
                ];
            case ColumnFilterMode.Number:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Between', value: 'Between' },
                    { name: '>=', value: 'Gte' },
                    { name: '>', value: 'Gt' },
                    { name: '<=', value: 'Lte' },
                    { name: '<', value: 'Lt' }
                ];
            case ColumnFilterMode.Date:
            case ColumnFilterMode.DateTime:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Not Equals', value: 'NotEquals' },
                    { name: 'Between', value: 'Between' },
                    { name: '>=', value: 'Gte' },
                    { name: '>', value: 'Gt' },
                    { name: '<=', value: 'Lte' },
                    { name: '<', value: 'Lt' }
                ];
            case ColumnFilterMode.Boolean:
            default:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Not Equals', value: 'NotEquals' }
                ];
        }
    }
}
exports.ColumnModel = ColumnModel;
