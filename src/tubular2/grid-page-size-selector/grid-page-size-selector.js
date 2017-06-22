"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const index_1 = require("../grid/index");
require("rxjs/add/operator/debounceTime");
class PageSizeInfo {
    constructor() {
        this.value = 0;
        this.selected = false;
    }
}
exports.PageSizeInfo = PageSizeInfo;
class GridPageSizeSelectorComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this._options = [10, 20, 50, 100];
    }
    set in(options) {
        if (options) {
            this._options = options;
        }
    }
    ngOnInit() {
        this.selected = this.tbGrid._pageSize.getValue();
    }
    onChange(newVal) {
        // TODO: Fix
        this.tbGrid._pageSize.next(newVal);
    }
}
GridPageSizeSelectorComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tb-page-size-selector',
                templateUrl: 'grid-page-size-selector.html'
            },] },
];
/** @nocollapse */
GridPageSizeSelectorComponent.ctorParameters = () => [
    { type: index_1.GridComponent, },
];
GridPageSizeSelectorComponent.propDecorators = {
    'in': [{ type: core_1.Input, args: ['options',] },],
};
exports.GridPageSizeSelectorComponent = GridPageSizeSelectorComponent;
//# sourceMappingURL=grid-page-size-selector.js.map