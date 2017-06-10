import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GridComponent } from './grid.component';
import { GridPageInfo } from './grid-page-info';
import { getValueInRange, isNumber } from './util';

// TODO: Refactor to match with GridPageInfo
@Component({
    selector: 'tb-grid-pager',
    host: { 'role': 'navigation' },
    template: `
    <div class="tubular-pager">
        <md-button-toggle-group>
            <md-button-toggle value="first" [disabled]="!hasPrevious() || disabled" (click)="!!selectPage(1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
                <md-icon>first_page</md-icon>
            </md-button-toggle>
            <md-button-toggle value="previous" [disabled]="!hasPrevious() || disabled" (click)="!!selectPage(page-1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
                <md-icon>chevron_left</md-icon>
            </md-button-toggle>
            <md-button-toggle *ngFor="let pageNumber of pages" value="{{pageNumber}}" (click)="selectPage(pageNumber)" [checked]="pageNumber === page" [disabled]="(isEllipsis(pageNumber) || disabled) ? 'disabled': null">
                {{pageNumber}}
            </md-button-toggle>
            <md-button-toggle value="next" [disabled]="!hasNext() || disabled" (click)="!!selectPage(page+1)" [attr.tabindex]="(hasNext() ? null : '-1')">
                <md-icon>chevron_right</md-icon>
            </md-button-toggle>
            <md-button-toggle value="last" [disabled]="!hasNext() || disabled" (click)="!!selectPage(pageCount)" [attr.tabindex]="(hasNext() ? null : '-1')">
                <md-icon>last_page</md-icon>
            </md-button-toggle>
        </md-button-toggle-group>
    </div>
  `
})
export class GridPagerComponent implements OnInit, OnChanges {
    pageCount = 0;
    pages: number[] = [];
    public info = new GridPageInfo();
    public collectionSize = new BehaviorSubject(0);

    /**
     * Whether to disable buttons from user input
     */
    @Input() disabled: boolean;

    /**
     *  Whether to show the "First" and "Last" page links
     */
    @Input() boundaryLinks: boolean = true;

    /**
     *  Whether to show the "Next" and "Previous" page links
     */
    @Input() directionLinks: boolean = true;

    /**
     *  Whether to show ellipsis symbols and first/last page numbers when maxSize > number of pages
     */
    @Input() ellipses: boolean = false;

    /**
     *  Whether to rotate pages when maxSize > number of pages.
     *  Current page will be in the middle
     */
    @Input() rotate: boolean;

    /**
     *  Maximum number of pages to display.
     */
    // @Input() collectionSize: number = 0;

    /**
     *  Maximum number of pages to display.
     */
    @Input() maxSize: number = 5;

    /**
     *  Current page.
     */
    public page = 0;

    /**
     *  Number of items per page.
     */
    public pageSize: number = 10;

    /**
     * Pagination display size: small or large
     */
    @Input() size: 'sm' | 'lg';

    /**
     *  An event fired when the page is changed.
     *  Event's payload equals to the newly selected page.
     */
    @Output() pageChange = new EventEmitter<number>(true);

    constructor(public tbGrid: GridComponent) {

    }

    public ngOnInit() {
        this.tbGrid.page.subscribe(page => {
            let requireUpdate = this.page !== (page + 1);
            if (requireUpdate)
                this.selectPage(page + 1)
        });
        this.tbGrid.pageSize.subscribe(pageSize => {
            let requireUpdate = this.pageSize !== pageSize;
            this.pageSize = pageSize;
            if (requireUpdate)
                this._updatePages(this.page);
        })
        this.tbGrid.pageInfo.subscribe((x: GridPageInfo) => {

            if (x.filteredRecordCount != this.collectionSize.getValue()) {
                this.collectionSize.next(x.filteredRecordCount);
                this.selectPage(x.currentPage);
            }

            this.collectionSize.next(x.filteredRecordCount)
        });
    }

    hasPrevious(): boolean { return this.page > 1; }

    hasNext(): boolean { return this.page < this.pageCount; }

    selectPage(pageNumber: number): void {
        // this.page = pageNumber;
        this._updatePages(pageNumber);
    }

    ngOnChanges(changes: SimpleChanges): void { this._updatePages(this.page); }

    /**
     * @internal
     */
    isEllipsis(pageNumber): boolean { return pageNumber === -1; }

    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    private _applyEllipses(start: number, end: number) {
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
    private _applyRotation(): [number, number] {
        let start = 0;
        let end = this.pageCount;
        let leftOffset = Math.floor(this.maxSize / 2);
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;

        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        } else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        } else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }

        return [start, end];
    }

    /**
     * Paginates page numbers based on maxSize items per page
     */
    private _applyPagination(): [number, number] {
        let page = Math.ceil(this.page / this.maxSize) - 1;
        let start = page * this.maxSize;
        let end = start + this.maxSize;

        return [start, end];
    }

    private _setPageInRange(newPageNo) {
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);

        if (this.page !== prevPageNo) {
            this.tbGrid.goToPage(this.page - 1);
            // this.pageChange.emit(this.page);
        }
    }

    private _updatePages(newPage: number) {

        this.pageCount = Math.ceil(this.collectionSize.getValue() / this.pageSize);

        if (!isNumber(this.pageCount)) {
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
            } else {
                [start, end] = this._applyPagination();
            }

            this.pages = this.pages.slice(start, end);

            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
}
