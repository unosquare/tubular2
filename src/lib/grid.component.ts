import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TubularDataService } from './tubular-data.service';
import { ColumnModel, DataType } from './column';
import { PopupContainer } from './grid-table';

import 'rxjs/add/operator/debounceTime';

export class GridPageInfo {
    currentInitial = 0;
    currentTop = 0;
    currentPage = 0;
    totalPages = 0;
    totalRecordCount = 0;
    filteredRecordCount = 0;
}

@Component({
    selector: 'tubular-grid',
    template: `
    <div>
        <div class="tubular-overlay" [hidden]="!showLoading">
            <div><div class="fa fa-refresh fa-2x fa-spin"></div>
        </div></div>
        <ng-content></ng-content>
    </div>`,
    styles: [
        ':host /deep/ div.row { margin-top: 4px; margin-bottom: 4px; }',
        ':host /deep/ div.row:first { margin-top: 0; }'
    ]
})
export class TubularGrid extends PopupContainer {
    // data is just observable and children can't push
    private data = new BehaviorSubject([]);
    dataStream = this.data.asObservable();
    private _pageInfo = new BehaviorSubject(new GridPageInfo());
    pageInfo = this._pageInfo.asObservable();

    _pageSize = new BehaviorSubject(10);
    pageSize = this._pageSize.asObservable();
    
    // values that to observe and allow to push from children
    page = new BehaviorSubject(0);
    columns = new BehaviorSubject([]);
    freeTextSearch = new BehaviorSubject("");
    
    showLoading = false;
    private requestCount = 0;
    search = {
        text: "",
        operator: "None"
    };

    @Input('server-url') serverUrl: string;
    @Input('require-authentication') requireAuthentication: boolean;
    @Input('request-timeout') requestTimeout: number;
    @Input('server-save-url') serverSaveUrl: string;

    @Output() onDataError = new EventEmitter<any>();
    @Output() onDataSaved = new EventEmitter<any>();

    constructor(private tbDataService: TubularDataService) {
        super();
    }

    ngOnInit() {
        // just a logging
        this.dataStream.subscribe(p => console.log("New data", p));

        // subscriptions to events
        this.pageSize.subscribe(c => this.refresh());
        this.columns.subscribe(c => this.refresh());
        this.page.subscribe(c => this.refresh());
        this.freeTextSearch
            .debounceTime(500)
            .subscribe(c => {
                if (c === this.search.text) return;
                this.search.text = c;
                this.search.operator = !c ? "None" : "Auto";
                this.refresh();
            });
    }

    refresh() {
        this.getCurrentPage((data, req) => this.transformDataset(data, req));
    }

    getCurrentPage(callback) {
        let req = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this._pageSize.getValue(),
            take: this._pageSize.getValue(),
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        };

        this.tbDataService.retrieveData(this.serverUrl, req).subscribe(
            data => callback(data, req),
            error => this.onDataError.emit(error)
        );
    }

    getFullDataSource(callback) {
        let req = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: 0,
            take: -1,
            search: {
                text: '',
                operator: 'None'
            }
        };

        this.tbDataService.retrieveData(this.serverUrl, req).subscribe(
            data => callback(data.Payload || {}),
            error => this.onDataError.emit(error)
        );
    }

    onUpdate(row) {
        this.tbDataService
            .save(this.serverSaveUrl, row.values, row.$isNew ? RequestMethod.Post : RequestMethod.Put)
            .subscribe(
                data => this.onDataSaved.emit(data),
                error => this.onDataError.emit(error),
                () => this.refresh()
            );
    }

    onDismiss(reason) {
        
    }
    
    private transformToObj(columns: ColumnModel[], data: any) {
        let obj = {};

        columns.forEach((column, key) => {
            obj[column.name] = data[key] || data[column.name];
            
            if (column.dataType == DataType.Date || column.dataType == DataType.DateTime  || column.dataType == DataType.DateTimeUtc) {
                console.log(obj[column.name]);
                let timezone = new Date(Date.parse(obj[column.name])).toString().match(/([-\+][0-9]+)\s/)[1];
                timezone = timezone.substr(0, timezone.length - 2) + ':' + timezone.substr(timezone.length - 2, 2);
                console.log(obj[column.name].replace('Z', '') + timezone);
                let tempDate = new Date(Date.parse(obj[column.name].replace('Z', '') + timezone));

                if (column.dataType === DataType.Date) {
                    obj[column.name] = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
                } else {
                    obj[column.name] = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), 
                        tempDate.getHours(), tempDate.getMinutes(), tempDate.getSeconds(), 0);
                }
                console.log(obj[column.name]);
            }
        });

        return obj;
    }

    private transformDataset(data, req) {
        let transform = d => this.transformToObj(req.columns, d);
        let payload = (data.Payload || {}).map(transform);
        // push data
        this.data.next(payload);

        let pageInfo = new GridPageInfo();
        pageInfo.currentPage = data.CurrentPage;
        pageInfo.totalPages = data.TotalPages;
        pageInfo.filteredRecordCount = data.FilteredRecordCount;
        pageInfo.totalRecordCount = data.TotalRecordCount;

        pageInfo.currentInitial = ((pageInfo.currentPage - 1) * this._pageSize.getValue()) + 1;

        if (pageInfo.currentInitial <= 0)
            pageInfo.currentInitial = data.TotalRecordCount > 0 ? 1 : 0;

        pageInfo.currentTop = this._pageSize.getValue() * pageInfo.currentPage;
        if (pageInfo.currentTop <= 0 || pageInfo.currentTop > data.filteredRecordCount)
            pageInfo.currentTop = data.filteredRecordCount;
        
        // push page Info
        this._pageInfo.next(pageInfo);
    }
}