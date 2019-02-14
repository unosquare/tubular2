import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { GridComponent } from './grid';

export class TubularDataSource extends DataSource<any> {
    constructor(private _tbGrid: GridComponent) {
        super();
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        return this._tbGrid.dataStream;
    }
    disconnect() { }
}
