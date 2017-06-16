import { GridComponent } from './grid.component';
export declare class ExportButtonDirective {
    gridInstance: GridComponent;
    fileName: string;
    onClick(event: MouseEvent): void;
    private saveAs(blob);
}
