import { GridComponent } from './grid.component';
import 'rxjs/add/operator/debounceTime';
export declare class PageSizeInfo {
    value: number;
    selected: boolean;
}
export declare class PageSizeSelectorComponent {
    private tbGrid;
    private _options;
    private selected;
    constructor(tbGrid: GridComponent);
    in: any[];
    private ngOnInit();
    private onChange(newVal);
}
