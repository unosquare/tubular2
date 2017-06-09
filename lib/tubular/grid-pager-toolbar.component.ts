import { Component, Input, OnInit } from '@angular/core';

import { GridComponent } from './grid.component';
import { GridPageInfo } from './grid-page-info';

// Based on https://github.com/daniel-nagy/md-data-table
@Component({
    selector: 'tb-grid-toolbar',
    template:
    `<div>
        <div class="label">{{$pagination.label.page}}</div>

        <md-select virtual-page-select total="{{$pagination.pages()}}" class="md-table-select" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" ng-disabled="$pagination.disabled" aria-label="Page">
            <md-content>
            <md-option ng-repeat="page in $pageSelect.pages" ng-value="page">{{page}}</md-option>
            </md-content>
        </md-select>
        </div>

        <div class="limit-select" ng-if="$pagination.limitOptions">
        <div class="label">{{$pagination.label.rowsPerPage}}</div>

        <md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" ng-disabled="$pagination.disabled" aria-label="Rows" placeholder="{{ $pagination.limitOptions[0] }}">
            <md-option ng-repeat="option in $pagination.limitOptions" ng-value="option.value ? $pagination.eval(option.value) : option">{{::option.label ? option.label : option}}</md-option>
        </md-select>
        </div>

        <div class="buttons">
        <div class="label">{{$pagination.min()}} - {{$pagination.max()}} {{$pagination.label.of}} {{$pagination.total}}</div>

        <button md-icon-button type="button" *ngIf="boundaryLinks" (click)="$pagination.first()" [disabled]="$pagination.disabled || !$pagination.hasPrevious()" aria-label="First">
            <md-icon>first_page</md-icon>
        </button>

        <button md-icon-button type="button" (click)="$pagination.previous()" [disabled]="$pagination.disabled || !$pagination.hasPrevious()" aria-label="Previous">
            <md-icon>chevron_left</md-icon>
        </button>

        <button md-icon-button type="button" (click)="$pagination.next()" [disabled]="$pagination.disabled || !$pagination.hasNext()" aria-label="Next">
            <md-icon>chevron_right</md-icon>
        </button>

        <button md-icon-button type="button" *ngIf="boundaryLinks" (click)="$pagination.last()" [disabled]="$pagination.disabled || !$pagination.hasNext()" aria-label="Last">
            <md-icon>last_page</md-icon>
        </button>
        </div>`,
    styles: [
        ':host /deep/ div { font-size: 12px; }',
    ]
})
export class GridPagerToolbarComponent implements OnInit {
    public pageInfo = new GridPageInfo();
    
    /**
     *  Whether to show the "First" and "Last" page links
     */
    @Input() boundaryLinks: boolean = true;

    /**
     *  Current page.
     */
    @Input() page = 0;
    
    constructor(private tbGrid: GridComponent) { }

    selectPage(pageNumber: number): void { 
        // TODO?
    }

    public ngOnInit() {
        // live update properties
        this.tbGrid.pageInfo.subscribe((pageInfo: GridPageInfo) => {
            this.pageInfo = pageInfo;
        });
    }
}
