"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const index_1 = require("../grid/index");
const util_1 = require("../core/util");
class GridPagerComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this.pageCount = 0;
        this.pages = [];
        this.info = new index_1.GridPageInfo();
        this.collectionSize = new BehaviorSubject_1.BehaviorSubject(0);
        /**
         *  Whether to show the "First" and "Last" page links
         */
        this.boundaryLinks = true;
        /**
         *  Whether to show the "Next" and "Previous" page links
         */
        this.directionLinks = true;
        /**
         *  Whether to show ellipsis symbols and first/last page numbers when maxSize > number of pages
         */
        this.ellipses = false;
        /**
         *  Maximum number of pages to display.
         */
        // @Input() collectionSize: number = 0;
        /**
         *  Maximum number of pages to display.
         */
        this.maxSize = 5;
        /**
         *  Current page.
         */
        this.page = 0;
        /**
         *  Number of items per page.
         */
        this.pageSize = 10;
        /**
         *  An event fired when the page is changed.
         *  Event's payload equals to the newly selected page.
         */
        this.pageChange = new core_1.EventEmitter(true);
    }
    ngOnInit() {
        this.tbGrid.page.subscribe((page) => {
            const requireUpdate = this.page !== (page + 1);
            if (requireUpdate)
                this.selectPage(page + 1);
        });
        this.tbGrid.pageSize.subscribe((pageSize) => {
            const requireUpdate = this.pageSize !== pageSize;
            this.pageSize = pageSize;
            if (requireUpdate)
                this._updatePages(this.page);
        });
        this.tbGrid.pageInfo.subscribe((x) => {
            if (x.filteredRecordCount != this.collectionSize.getValue()) {
                this.collectionSize.next(x.filteredRecordCount);
                this.selectPage(x.currentPage);
            }
            this.collectionSize.next(x.filteredRecordCount);
        });
    }
    hasPrevious() { return this.page > 1; }
    hasNext() { return this.page < this.pageCount; }
    selectPage(pageNumber) {
        // this.page = pageNumber;
        this._updatePages(pageNumber);
    }
    ngOnChanges(changes) { this._updatePages(this.page); }
    /**
     * @internal
     */
    isEllipsis(pageNumber) {
        return pageNumber === -1;
    }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                if (start > 1) {
                    this.pages.unshift(-1);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                if (end < (this.pageCount - 1)) {
                    this.pages.push(-1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    _applyRotation() {
        let start = 0;
        let end = this.pageCount;
        const leftOffset = Math.floor(this.maxSize / 2);
        const rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page
     */
    _applyPagination() {
        const page = Math.ceil(this.page / this.maxSize) - 1;
        const start = page * this.maxSize;
        const end = start + this.maxSize;
        return [start, end];
    }
    _setPageInRange(newPageNo) {
        const prevPageNo = this.page;
        this.page = util_1.getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo) {
            this.tbGrid.goToPage(this.page - 1);
            // this.pageChange.emit(this.page);
        }
    }
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize.getValue() / this.pageSize);
        if (!util_1.isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            let start = 0;
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
}
GridPagerComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tb-grid-pager',
                host: { role: 'navigation' },
                templateUrl: 'grid-pager.html'
            },] },
];
/** @nocollapse */
GridPagerComponent.ctorParameters = () => [
    { type: index_1.GridComponent, },
];
GridPagerComponent.propDecorators = {
    'disabled': [{ type: core_1.Input },],
    'boundaryLinks': [{ type: core_1.Input },],
    'directionLinks': [{ type: core_1.Input },],
    'ellipses': [{ type: core_1.Input },],
    'rotate': [{ type: core_1.Input },],
    'maxSize': [{ type: core_1.Input },],
    'size': [{ type: core_1.Input },],
    'pageChange': [{ type: core_1.Output },],
};
exports.GridPagerComponent = GridPagerComponent;
//# sourceMappingURL=grid-pager.js.map