import {
    Component, Input, Output, EventEmitter,
    ContentChild, TemplateRef, ViewChild, AfterViewInit 
} from '@angular/core';

import { ColumnModel } from './column.model';

@Component({
    selector: 'column-header',
    template: `
    <div class="column-header">
        <span [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
            (click)="sort($event)">
            {{column.label}}
        </span>
        <div class="column-menu" [hidden]="column.filterMode == 0">
            <button class="btn btn-sm" [ngClass]="{ 'btn-success': hasFilter }"
                #popover="ngbPopover" [ngbPopover]="filterPopoverTemplate" 
                placement="left-bottom" title="Filter" (click)="togglePopover()">
                <i class="fa fa-filter"></i>
            </button>
        </div>
    </div>`,
    styles: [
        '.column-menu { position: relative; display: block; text-align: center; vertical-align: top; float: right; }',
        '.column-menu button { border-radius: 30px !important; line-height: 10px; margin: 0; padding: .25rem; }',
        '.column-menu button i { font-size: 12px; }'
    ]
})
export class ColumnHeaderComponent {
    @Input() public column: ColumnModel;
    @Output() public onSort = new EventEmitter<ColumnModel>();
    @Output() public onFilter = new EventEmitter<ColumnModel>();
    @ContentChild('filterPopover') private filterPopoverTemplate: TemplateRef<Object>;
    @ViewChild('popover') popover: any;

    private hasFilter: boolean;

    static prevPopover = null;

    private togglePopover() {
        if (ColumnHeaderComponent.prevPopover != null) {
            ColumnHeaderComponent.prevPopover.close();

            if (ColumnHeaderComponent.prevPopover === this.popover) {
                ColumnHeaderComponent.prevPopover = null;
                this.popover.toggle();
                return;
            }
        }

        ColumnHeaderComponent.prevPopover = this.popover;
    }

    private sort($event) {
        this.column.isMultiSort = $event.ctrlKey;

        if (this.column.sortable) {
            this.onSort.emit(this.column);
        }
    }

    private filter(hasValue: boolean) {
        ColumnHeaderComponent.prevPopover = null;
        this.popover.close();
        this.hasFilter = hasValue;
        this.onFilter.emit(this.column);
    }
}
