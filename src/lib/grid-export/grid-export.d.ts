import { GridComponent } from '../grid/index';
export declare class GridExportButtonDirective {
    gridInstance: GridComponent;
    fileName: string;
    onClick(event: MouseEvent): void;
    private saveAs(blob);
}
