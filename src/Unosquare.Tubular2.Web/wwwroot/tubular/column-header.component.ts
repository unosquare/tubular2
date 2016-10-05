import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';

import { ColumnModel } from './column';

@Component({
    selector: 'column-header',
    template: `
    <div class="column-header">
        <span [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
            (click)="sort($event)">
            {{column.label}}
        </span>
        <div class="pull-xs-right" [hidden]="column.filterMode == 0" #popover="ngbPopover" [ngbPopover]="filterPopoverTemplate" 
                placement="left-bottom" title="Filter" (click)="togglePopover()">
            <i class="fa" [ngClass]="{ 'fa-filter': !isFiltering, 'fa-times': isFiltering }"></i>
        </div>
    </div>`
})
export class ColumnHeader {
    @Input() column: ColumnModel;
    @Output() onSort = new EventEmitter<ColumnModel>();
    @Output() onFilter = new EventEmitter<ColumnModel>();
    @ContentChild('filterPopover') private filterPopoverTemplate: TemplateRef<Object>;
    @ViewChild('popover') popover: NgbPopover;
    
    public static prevPopover = null;

    togglePopover() {
        if (ColumnHeader.prevPopover != null) {
            ColumnHeader.prevPopover.close();

            if (ColumnHeader.prevPopover == this.popover) {
                ColumnHeader.prevPopover = null;
                this.popover.toggle();
                return;
            }
        }

        ColumnHeader.prevPopover = this.popover;
    }

    sort($event) {
        this.column.isMultiSort =  $event.ctrlKey;
        if (this.column.sortable) {
            this.onSort.emit(this.column);
        }
    }

    filter(hasValue: boolean) {
        this.popover.close();
        this.onFilter.emit(this.column);
    }
}