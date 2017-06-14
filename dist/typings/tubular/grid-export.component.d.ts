import { GridComponent } from './grid.component';
import 'rxjs/add/operator/map';
export declare class ExportButtonComponent {
    private tbGrid;
    fileName: string;
    constructor(tbGrid: GridComponent);
    downloadCsv(): void;
    downloadAllCsv(): void;
    private processCsv(data);
}
