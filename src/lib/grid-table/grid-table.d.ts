import { Observable } from 'rxjs/Observable';
import { GridComponent, ColumnModel } from '../grid/index';
export declare abstract class GridTable {
    tbGrid: GridComponent;
    columns: Observable<ColumnModel[]>;
    rows: any[];
    isEmpty: boolean;
    private columnObservable;
    constructor(tbGrid: GridComponent);
    addColumns(columns: ColumnModel[]): void;
    sort(column: ColumnModel): void;
    applyFilter(column: ColumnModel): void;
}
