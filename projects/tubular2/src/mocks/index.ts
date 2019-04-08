import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '../public_api';
import { ColumnModel } from 'tubular-common';
import { MatPaginator } from '@angular/material';

function setupInitialColumns(tbGrid: GridComponent) {
    tbGrid.addColumns([
        new ColumnModel('OrderID'),
        new ColumnModel('CustomerName'),
        new ColumnModel('ShippedDate'),
        new ColumnModel('CreationDate'),
        new ColumnModel('ShipperCity')
    ]);
}

@Component({
    template: `
    <tb-grid #grid dataUrl="https://tubular.azurewebsites.net/api/orders/paged" (onRequestDataError)="handleError($event)">
        <mat-table [dataSource]="grid.dataSource">
            <ng-container cdkColumnDef="options">
                <mat-header-cell *cdkHeaderCellDef> Options </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> <button mat-buton (click)="edit(row)"><mat-icon>mode_edit</mat-icon></button> </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="OrderID">
                <mat-header-cell *cdkHeaderCellDef> Order ID </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.OrderID}} </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="CustomerName">
                <mat-header-cell *cdkHeaderCellDef> Customer Name </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.CustomerName}} </mat-cell>
            </ng-container>

            <mat-header-row *cdkHeaderRowDef="['options', 'OrderID', 'CustomerName']"></mat-header-row>
            <mat-row *cdkRowDef="let row; columns: ['options', 'OrderID', 'CustomerName'];"></mat-row>
        </mat-table>
    </tb-grid>
    `
})
export class SimpleTbGridComponent {
    @ViewChild(GridComponent) tbGrid: GridComponent;

    public errorWhenGettingData = false;

    handleError(error: any) {
        this.errorWhenGettingData = true;
    }

    OnInit() {
        setupInitialColumns(this.tbGrid);
    }
}

@Component({
    template: `
    <tb-grid #grid dataUrl="https://tubular.azurewebsites.net/api/orders/paged" (onRequestDataError)="handleError($event)">
        <mat-table [dataSource]="grid.dataSource" matSort>
            <ng-container cdkColumnDef="options">
                <mat-header-cell *cdkHeaderCellDef> Options </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> <button mat-buton (click)="edit(row)"><mat-icon>mode_edit</mat-icon></button> </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="OrderID">
                <mat-header-cell *cdkHeaderCellDef>
                    <span mat-sort-header>
                        Order ID
                    </span>
                </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.OrderID}} </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="CustomerName">
                <mat-header-cell *cdkHeaderCellDef>
                    <span mat-sort-header>
                        Customer Name
                    </span>
                </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.CustomerName}} </mat-cell>
            </ng-container>

            <mat-header-row *cdkHeaderRowDef="['options', 'OrderID', 'CustomerName']"></mat-header-row>
            <mat-row *cdkRowDef="let row; columns: ['options', 'OrderID', 'CustomerName'];"></mat-row>
        </mat-table>
    </tb-grid>
    `
})
export class TbGridWithSortingComponent {
    @ViewChild(GridComponent) tbGrid: GridComponent;

    handleError(error: any) {
        console.log(error);
    }

    OnInit() {
        setupInitialColumns(this.tbGrid);
    }
}

@Component({
    template: `
    <tb-grid #grid dataUrl="https://tubular.azurewebsites.net/api/orders/paged" (onRequestDataError)="handleError($event)">
        <mat-table [dataSource]="grid.dataSource">
            <ng-container cdkColumnDef="options">
                <mat-header-cell *cdkHeaderCellDef> Options </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> <button mat-buton (click)="edit(row)"><mat-icon>mode_edit</mat-icon></button> </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="OrderID">
                <mat-header-cell *cdkHeaderCellDef> Order ID </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.OrderID}} </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="CustomerName">
                <mat-header-cell *cdkHeaderCellDef>
                    <span>
                        Customer Name
                    </span>
                    <tb-filter-dialog column="CustomerName">
                    </tb-filter-dialog>
                </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.CustomerName}} </mat-cell>
            </ng-container>

            <mat-header-row *cdkHeaderRowDef="['options', 'OrderID', 'CustomerName']"></mat-header-row>
            <mat-row *cdkRowDef="let row; columns: ['options', 'OrderID', 'CustomerName'];"></mat-row>
        </mat-table>
    </tb-grid>
    `
})
export class TbGridWithFilteringComponent {
    @ViewChild(GridComponent) tbGrid: GridComponent;

    handleError(error: any) {
        console.log(error);
    }

    OnInit() {
        setupInitialColumns(this.tbGrid);
    }
}


@Component({
    template: `
    <tb-grid #grid dataUrl="https://tubular.azurewebsites.net/api/orders/paged" (onRequestDataError)="handleError($event)">
        <mat-table [dataSource]="grid.dataSource">
            <ng-container cdkColumnDef="options">
                <mat-header-cell *cdkHeaderCellDef> Options </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> <button mat-buton (click)="edit(row)"><mat-icon>mode_edit</mat-icon></button> </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="OrderID">
                <mat-header-cell *cdkHeaderCellDef> Order ID </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.OrderID}} </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="CustomerName">
                <mat-header-cell *cdkHeaderCellDef> Customer Name </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.CustomerName}} </mat-cell>
            </ng-container>

            <mat-header-row *cdkHeaderRowDef="['options', 'OrderID', 'CustomerName']"></mat-header-row>
            <mat-row *cdkRowDef="let row; columns: ['options', 'OrderID', 'CustomerName'];"></mat-row>
        </mat-table>

        <mat-paginator
            [pageIndex]="0"
            [pageSize]="25"
            [pageSizeOptions]="[5, 10, 25, 100]">
        </mat-paginator>
    </tb-grid>
    `
})
export class TbGridWithPaginatorComponent {
    @ViewChild(GridComponent) tbGrid: GridComponent;

    @ViewChild(MatPaginator) matPaginator: MatPaginator;

    handleError(error: any) {
        console.log(error);
    }

    OnInit() {
        setupInitialColumns(this.tbGrid);
    }
}

@Component({
    template: `
    <tb-grid #grid dataUrl="https://tubular.azurewebsites.net/api/orders/paged" (onRequestDataError)="handleError($event)">
        <mat-paginator #topPaginator
            [pageIndex]="0"
            [pageSize]="25"
            [pageSizeOptions]="[5, 10, 25, 100]">
        </mat-paginator>
        <mat-table [dataSource]="grid.dataSource">
            <ng-container cdkColumnDef="options">
                <mat-header-cell *cdkHeaderCellDef> Options </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> <button mat-buton (click)="edit(row)"><mat-icon>mode_edit</mat-icon></button> </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="OrderID">
                <mat-header-cell *cdkHeaderCellDef> Order ID </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.OrderID}} </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="CustomerName">
                <mat-header-cell *cdkHeaderCellDef> Customer Name </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.CustomerName}} </mat-cell>
            </ng-container>

            <mat-header-row *cdkHeaderRowDef="['options', 'OrderID', 'CustomerName']"></mat-header-row>
            <mat-row *cdkRowDef="let row; columns: ['options', 'OrderID', 'CustomerName'];"></mat-row>
        </mat-table>

        <mat-paginator #bottomPaginator
            [pageIndex]="0"
            [pageSize]="25"
            [pageSizeOptions]="[5, 10, 25, 100]">
        </mat-paginator>
    </tb-grid>
    `
})
export class TbGridWithTwoPaginatorsComponent {
    @ViewChild(GridComponent) tbGrid: GridComponent;

    @ViewChild('topPaginator') topPaginator: MatPaginator;
    @ViewChild('bottomPaginator') bottomPaginator: MatPaginator;

    handleError(error: any) {
        console.log(error);
    }

    OnInit() {
        setupInitialColumns(this.tbGrid);
    }
}
