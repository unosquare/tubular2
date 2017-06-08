import {
    Component, Input, Output, EventEmitter,
    ContentChild, TemplateRef, ViewChild, AfterViewInit
} from '@angular/core';

import { ColumnModel } from './column.model';

@Component({
    selector: 'tb-column-header',
    template: `
    <div class="column-header">
        <span 
            [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
            (click)="sort($event)">
            {{column.label}}
        </span>
        <div class="column-menu" [hidden]="column.filterMode == 0">
            <button md-fab [ngClass]="{ 'btn-success': hasFilter }"
                placement="left-bottom" title="Filter" (click)="togglePopover()">
                <md-icon>filter_list</md-icon>
            </button>
        </div>
    </div>`,
    styles: [
        '.column-menu { position: relative; display: block; text-align: center; vertical-align: top; float: right; }',
        '.column-menu button i { font-size: 12px; }'
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

    public togglePopover() {
        // TODO: Change to Material
        // if (ColumnHeaderComponent.prevPopover != null) {
        //     ColumnHeaderComponent.prevPopover.close();

        //     if (ColumnHeaderComponent.prevPopover === this.popover) {
        //         ColumnHeaderComponent.prevPopover = null;
        //         this.popover.toggle();
        //         return;
        //     }
        // }

        // ColumnHeaderComponent.prevPopover = this.popover;
    }

    public sort($event) {
        this.column.isMultiSort = $event.ctrlKey;

        if (this.column.sortable) {
            this.onSort.emit(this.column);
        }
    }

    public filter(hasValue: boolean) {
        ColumnHeaderComponent.prevPopover = null;
        // TODO: Change to Material
        //this.popover.close();
        this.hasFilter = hasValue;
        this.onFilter.emit(this.column);
    }
}
