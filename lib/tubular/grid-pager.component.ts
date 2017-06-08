﻿import { Component, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { GridComponent, GridPageInfo } from './grid.component';

// TODO: Refactor to match with GridPageInfo
@Component({
    selector: 'tb-grid-pager', 
    host: { 'role': 'navigation' },
    template: `
    <ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
      <li *ngIf="boundaryLinks" class="page-item"
        [class.disabled]="!hasPrevious() || disabled">
        <a aria-label="First" class="page-link" href (click)="!!selectPage(1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
          <span aria-hidden="true">&laquo;&laquo;</span>
        </a>
      </li>
      <li *ngIf="directionLinks" class="page-item"
        [class.disabled]="!hasPrevious() || disabled">
        <a aria-label="Previous" class="page-link" href (click)="!!selectPage(page-1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li *ngFor="let pageNumber of pages" class="page-item" [class.active]="pageNumber === page"
        [class.disabled]="isEllipsis(pageNumber) || disabled">
        <a *ngIf="isEllipsis(pageNumber)" class="page-link">...</a>
        <a *ngIf="!isEllipsis(pageNumber)" class="page-link" href (click)="!!selectPage(pageNumber)">
          {{pageNumber}}
          <span *ngIf="pageNumber === page" class="sr-only">(current)</span>
        </a>
      </li>
      <li *ngIf="directionLinks" class="page-item" [class.disabled]="!hasNext() || disabled">
        <a aria-label="Next" class="page-link" href (click)="!!selectPage(page+1)" [attr.tabindex]="(hasNext() ? null : '-1')">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
      <li *ngIf="boundaryLinks" class="page-item" [class.disabled]="!hasNext() || disabled">
        <a aria-label="Last" class="page-link" href (click)="!!selectPage(pageCount)" [attr.tabindex]="(hasNext() ? null : '-1')">
          <span aria-hidden="true">&raquo;&raquo;</span>
        </a>
      </li>
    </ul>
  `
})
export class GridPagerComponent implements OnInit, OnChanges {
    pageCount = 0;
    pages: number[] = [];
    public info = new GridPageInfo();

    /**
     * Whether to disable buttons from user input
     */
    @Input() disabled: boolean;

    /**
     *  Whether to show the "First" and "Last" page links
     */
    @Input() boundaryLinks: boolean;

    /**
     *  Whether to show the "Next" and "Previous" page links
     */
    @Input() directionLinks: boolean;

    /**
     *  Whether to show ellipsis symbols and first/last page numbers when maxSize > number of pages
     */
    @Input() ellipses: boolean;

    /**
     *  Whether to rotate pages when maxSize > number of pages.
     *  Current page will be in the middle
     */
    @Input() rotate: boolean;

    /**
     *  Number of items in collection.
     */
    @Input() collectionSize: number;

    /**
     *  Maximum number of pages to display.
     */
    @Input() maxSize: number;

    /**
     *  Current page.
     */
    @Input() page = 0;

    /**
     *  Number of items per page.
     */
    @Input() pageSize: number;

    /**
     * Pagination display size: small or large
     */
    @Input() size: 'sm' | 'lg';

    constructor(public tbGrid: GridComponent) {
    }

    public ngOnInit() {
        this.tbGrid.pageInfo.subscribe((x: GridPageInfo) => this.info = x);
    }

    hasPrevious(): boolean { return this.page > 1; }

    hasNext(): boolean { return this.page < this.pageCount; }

    selectPage(pageNumber: number): void {
        this.info.currentPage = pageNumber;
        this.tbGrid.goToPage(pageNumber - 1);
        this._updatePages(pageNumber);
    }

    ngOnChanges(changes: SimpleChanges): void { this.selectPage(this.page); }

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

     private getValueInRange(value: number, max: number, min = 0): number {
  return Math.max(Math.min(value, max), min);
}

    private _setPageInRange(newPageNo) {
        const prevPageNo = this.page;
        this.page = this.getValueInRange(newPageNo, this.pageCount, 1);

        if (this.page !== prevPageNo) {
            // TODO: Complete this.pageChange.emit(this.page);
        }
    }

    private _updatePages(newPage: number) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);

        if (typeof this.pageCount === 'number') { // TODO: I dont know
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
