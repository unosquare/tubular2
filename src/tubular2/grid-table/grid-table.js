"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const index_1 = require("../grid/index");
class GridTable {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this.columnObservable = new BehaviorSubject_1.BehaviorSubject([]);
        this.columns = this.columnObservable.asObservable();
        this.tbGrid.dataStream.subscribe((payload) => {
            this.rows = payload;
            this.isEmpty = !this.rows || this.rows.length === 0;
        });
        this.columnObservable.subscribe((payload) => this.tbGrid.columns.next(payload));
    }
    addColumns(columns) {
        columns.forEach((c) => {
            const val = this.columnObservable.getValue();
            val.push(c);
            this.columnObservable.next(val);
        });
    }
    sort(column) {
        const value = this.columnObservable.getValue();
        if (!column.sortable) {
            return;
        }
        if (column.direction === index_1.ColumnSortDirection.None) {
            column.direction = index_1.ColumnSortDirection.Asc;
        }
        else if (column.direction === index_1.ColumnSortDirection.Asc) {
            column.direction = index_1.ColumnSortDirection.Desc;
        }
        else if (column.direction === index_1.ColumnSortDirection.Desc) {
            column.direction = index_1.ColumnSortDirection.None;
        }
        column.sortOrder = column.direction === index_1.ColumnSortDirection.None ? 0 : Number.MAX_VALUE;
        if (!column.isMultiSort) {
            value.forEach((v) => v.sortOrder = v.name === column.name ? v.sortOrder : 0);
            value.forEach((v) => v.direction = v.name === column.name ?
                column.direction :
                index_1.ColumnSortDirection.None);
        }
        const currentlySortedColumns = value.filter((col) => col.sortOrder > 0);
        currentlySortedColumns.sort((a, b) => a.sortOrder === b.sortOrder ? 0 : 1);
        currentlySortedColumns.forEach((col, index) => { col.sortOrder = index + 1; });
        this.columnObservable.next(value);
    }
    applyFilter(column) {
        const val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    }
}
exports.GridTable = GridTable;
//# sourceMappingURL=grid-table.js.map