import { Observable } from 'rxjs/Observable';
import { GridComponent } from './grid.component';
import { ColumnModel } from './column.model';
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
