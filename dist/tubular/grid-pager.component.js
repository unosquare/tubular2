;(function () {
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const grid_component_1 = require("./grid.component");
const grid_page_info_1 = require("./grid-page-info");
const util_1 = require("./util");
// TODO: Refactor to match with GridPageInfo
let GridPagerComponent = class GridPagerComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this.pageCount = 0;
        this.pages = [];
        this.info = new grid_page_info_1.GridPageInfo();
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
        this.tbGrid.page.subscribe(page => {
            let requireUpdate = this.page !== (page + 1);
            if (requireUpdate)
                this.selectPage(page + 1);
        });
        this.tbGrid.pageSize.subscribe(pageSize => {
            let requireUpdate = this.pageSize !== pageSize;
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
        let leftOffset = Math.floor(this.maxSize / 2);
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
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
        let page = Math.ceil(this.page / this.maxSize) - 1;
        let start = page * this.maxSize;
        let end = start + this.maxSize;
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
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GridPagerComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GridPagerComponent.prototype, "boundaryLinks", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GridPagerComponent.prototype, "directionLinks", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GridPagerComponent.prototype, "ellipses", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GridPagerComponent.prototype, "rotate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], GridPagerComponent.prototype, "maxSize", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GridPagerComponent.prototype, "size", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GridPagerComponent.prototype, "pageChange", void 0);
GridPagerComponent = __decorate([
    core_1.Component({
        selector: 'tb-grid-pager',
        host: { 'role': 'navigation' },
        template: `
    <div class="tubular-pager">
        <md-button-toggle-group>
            <md-button-toggle *ngIf="boundaryLinks" value="first" [disabled]="!hasPrevious() || disabled" (click)="!!selectPage(1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
                <md-icon>first_page</md-icon>
            </md-button-toggle>
            <md-button-toggle value="previous" [disabled]="!hasPrevious() || disabled" (click)="!!selectPage(page-1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
                <md-icon>chevron_left</md-icon>
            </md-button-toggle>
            <md-button-toggle 
                *ngFor="let pageNumber of pages" 
                value="{{pageNumber}}" 
                (click)="selectPage(pageNumber)" 
                [checked]="pageNumber === page" 
                [disabled]="(isEllipsis(pageNumber) || disabled) ? 'disabled': null">
                {{ (isEllipsis(pageNumber) ? "..." : pageNumber) }}
            </md-button-toggle>
            <md-button-toggle value="next" [disabled]="!hasNext() || disabled" (click)="!!selectPage(page+1)" [attr.tabindex]="(hasNext() ? null : '-1')">
                <md-icon>chevron_right</md-icon>
            </md-button-toggle>
            <md-button-toggle *ngIf="boundaryLinks" value="last" [disabled]="!hasNext() || disabled" (click)="!!selectPage(pageCount)" [attr.tabindex]="(hasNext() ? null : '-1')">
                <md-icon>last_page</md-icon>
            </md-button-toggle>
        </md-button-toggle-group>
    </div>
  `
    }),
    __metadata("design:paramtypes", [grid_component_1.GridComponent])
], GridPagerComponent);
exports.GridPagerComponent = GridPagerComponent;

this.tubular2 = gridpager_component;
}).call(this);
