import { EventEmitter, TemplateRef } from '@angular/core';
import { ColumnModel } from './column.model';
export declare class ColumnHeaderComponent {
    private static prevPopover;
    column: ColumnModel;
    onSort: EventEmitter<ColumnModel>;
    onFilter: EventEmitter<ColumnModel>;
    filterPopoverTemplate: TemplateRef<Object>;
    hasFilter: boolean;
    private popover;
    togglePopover(): void;
    sort($event: any): void;
    filter(hasValue: boolean): void;
}
