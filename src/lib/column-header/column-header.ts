 import {
    Component, Input, Output, EventEmitter,
    ContentChild, TemplateRef, ViewChild, AfterViewInit
} from '@angular/core';

import { ColumnModel } from '../grid/index';

@Component({
    selector: 'tb-column-header',
    templateUrl: './column-header.html',
    styleUrls: ['./column-header.css']
})
export class ColumnHeaderComponent {
    private static prevPopover = null;

    @Input()
    public column: ColumnModel;
    @Output()
    public onSort = new EventEmitter<ColumnModel>();
    @Output()
    public onFilter = new EventEmitter<ColumnModel>();
    @ContentChild('filterPopover')
    public filterPopoverTemplate: TemplateRef<Object>;
    public hasFilter: boolean;

    @ViewChild('popover') private popover: any;

    public togglePopover() {
        if (ColumnHeaderComponent.prevPopover != null) {
            ColumnHeaderComponent.prevPopover.close();
        }

        if (ColumnHeaderComponent.prevPopover === this.popover) {
            ColumnHeaderComponent.prevPopover = null;
            this.popover.close();
            return;
        }

        ColumnHeaderComponent.prevPopover = this.popover;
        this.popover.toggle();
    }

    public sort($event) {
        this.column.isMultiSort = $event.ctrlKey;

        if (this.column.sortable) {
            this.onSort.emit(this.column);
        }
    }

    public filter(hasValue: boolean) {
        ColumnHeaderComponent.prevPopover = null;
        this.popover.close();
        this.hasFilter = hasValue;
        this.onFilter.emit(this.column);
    }
}
