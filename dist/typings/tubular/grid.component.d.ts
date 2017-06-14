import { EventEmitter, OnInit } from '@angular/core';
import { RequestMethod, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ITubularSettingsProvider } from './tubular-settings.service';
import { GridPageInfo } from './grid-page-info';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
export interface TbRequest {
    count: number;
    columns: any[];
    skip: number;
    take: number;
    search: TbSearchParameter;
    timezoneOffset: number;
}
export interface TbSearchParameter {
    text: string;
    operator: string;
}
export declare class GridComponent implements OnInit {
    private settingsProvider;
    private http;
    private data;
    dataStream: Observable<any[]>;
    private _pageInfo;
    pageInfo: Observable<GridPageInfo>;
    private tbRequestRunning;
    _pageSize: BehaviorSubject<any>;
    pageSize: Observable<any>;
    page: BehaviorSubject<any>;
    columns: BehaviorSubject<any[]>;
    freeTextSearch: BehaviorSubject<string>;
    pageSet: boolean;
    isLoading: boolean;
    search: TbSearchParameter;
    private requestCount;
    dataUrl: string;
    requestMethod: string | RequestMethod;
    requestTimeout: number;
    beforeRequest: EventEmitter<any>;
    constructor(settingsProvider: ITubularSettingsProvider, http: Http);
    testRemove(callback: any): void;
    goToPage(page: any): void;
    refresh(): void;
    getCurrentPage(): Observable<Response>;
    getFullDataSource(): Observable<Response>;
    changePagesData(): void;
    changePageSizeData(): void;
    getPageSettingValue(): any;
    getPageSizeSettingValue(): any;
    ngOnInit(): void;
    private transformSortDirection(column);
    private transformToObj(columns, data);
    private transformDataset(data, req);
}
