"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class ColumnHeaderComponent {
    constructor() {
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
    }
    togglePopover() {
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
    sort($event) {
        this.column.isMultiSort = $event.ctrlKey;
        if (this.column.sortable) {
            this.onSort.emit(this.column);
        }
    }
    filter(hasValue) {
        ColumnHeaderComponent.prevPopover = null;
        this.popover.close();
        this.hasFilter = hasValue;
        this.onFilter.emit(this.column);
    }
}
ColumnHeaderComponent.prevPopover = null;
ColumnHeaderComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tb-column-header',
                templateUrl: 'column-header.html',
                styleUrls: ['column-header.css']
            },] },
];
/** @nocollapse */
ColumnHeaderComponent.ctorParameters = () => [];
ColumnHeaderComponent.propDecorators = {
    'column': [{ type: core_1.Input },],
    'onSort': [{ type: core_1.Output },],
    'onFilter': [{ type: core_1.Output },],
    'filterPopoverTemplate': [{ type: core_1.ContentChild, args: ['filterPopover',] },],
    'popover': [{ type: core_1.ViewChild, args: ['popover',] },],
};
exports.ColumnHeaderComponent = ColumnHeaderComponent;
//# sourceMappingURL=column-header.js.map