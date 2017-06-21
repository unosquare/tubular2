import {
    Component, Input, Output, EventEmitter,
    ContentChild, TemplateRef, ViewChild, AfterViewInit
} from '@angular/core';

import { ColumnModel } from './column.model';

// TODO: Add different color if the filter is ON
@Component({
    selector: 'tb-column-header',
    template: `
    <div class="column-header">
        <span 
            [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
            (click)="sort($event)">
            {{column.label}}
        </span>
        <div class="column-menu" [hidden]="column.filterMode == 0" 
            #popover="ngbPopover" [ngbPopover]="filterPopoverTemplate" 
            placement="bottom" popoverTitle="Filter" (click)="togglePopover()">
            <md-icon color="{{ hasFilter ? 'primary' : '' }}">filter_list</md-icon>
        </div>
    </div>`,
    styles: [
        '.column-menu { position: relative; display: block; text-align: center; vertical-align: top; float: right; }',
        '.column-header .mat-icon { font-size: 14px; cursor: pointer; }'
    ]
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

        if (ColumnHeaderComponent.prevPopover == this.popover) {
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