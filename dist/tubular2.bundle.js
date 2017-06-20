;(function () {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./tubular"));

this.tubular2 = index;
}).call(this);

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
const forms_1 = require("@angular/forms");
const column_model_1 = require("./column.model");
let ColumnFilterDialogComponent = class ColumnFilterDialogComponent {
    constructor(fb) {
        this.filterChange = new core_1.EventEmitter();
        this.isBetween = false;
        this.form = fb.group({
            text: ['', forms_1.Validators.required],
            argument: [''],
            operator: ['None', forms_1.Validators.required]
        });
        this.form.valueChanges.subscribe((value) => {
            this.column.filter.text = value.text;
            this.column.filter.operator = value.operator;
            if (value.argument) {
                this.column.filter.argument = [value.argument];
            }
            this.isBetween = value.operator === 'Between';
            this.inputType = this.column.getInputType();
        });
    }
    submit() {
        this.filterChange.emit(true);
    }
    reset() {
        this.form.reset();
        this.column.filter.argument = null;
        this.column.filter.operator = 'None';
        this.filterChange.emit(false);
    }
    selectChange(newVal) {
        if (newVal === 'None') {
            this.form.controls['text'].disable();
        }
        else {
            this.form.controls['text'].enable();
        }
    }
    ngAfterViewInit() {
        // set initial value in form with a timeout
        setTimeout((_) => {
            // load operator directly from the column
            this.operators = this.column.getOperators();
            // set initial value in form with a timeout
            this.form.patchValue({
                text: this.column.filter.text,
                argument: this.column.filter.argument,
                operator: this.column.filter.operator || 'None'
            });
            if (this.column.filter.operator === 'None') {
                this.form.controls['text'].disable();
            }
        });
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", column_model_1.ColumnModel)
], ColumnFilterDialogComponent.prototype, "column", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ColumnFilterDialogComponent.prototype, "filterChange", void 0);
ColumnFilterDialogComponent = __decorate([
    core_1.Component({
        selector: 'tb-filter-dialog',
        template: `
   <form [formGroup]="form" (ngSubmit)="submit()">
        <md-select placeholder="Operator" 
            formControlName="operator" 
            (change)="selectChange($event.value)">
            <md-option *ngFor="let operator of operators" [value]="operator.value">
                {{operator.name}}
            </md-option>
        </md-select>
        <md-input-container>
            <input mdInput
                type="{{inputType}}" formControlName="text" 
                placeholder="Value" />
        </md-input-container>
        <md-input-container *ngIf="isBetween">
            <input mdInput
                type="{{inputType}}" formControlName="argument"
                placeholder="Argument" />
        </md-input-container>
        <div fxLayout="row">
            <button type="submit" md-button fxFlex
                    [disabled]="!form.valid">Filter</button>
            <button type="button" md-button fxFlex
                    (click)="reset()">Clear</button>
        </div>
    </form>`,
        styles: ['form { min-width: 200px; }']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], ColumnFilterDialogComponent);
exports.ColumnFilterDialogComponent = ColumnFilterDialogComponent;

this.tubular2 = columnfilterdialog_component;
}).call(this);

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
const column_model_1 = require("./column.model");
// TODO: Add different color if the filter is ON
let ColumnHeaderComponent = ColumnHeaderComponent_1 = class ColumnHeaderComponent {
    // TODO: Add different color if the filter is ON
    constructor() {
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
    }
    togglePopover() {
        if (ColumnHeaderComponent_1.prevPopover != null) {
            ColumnHeaderComponent_1.prevPopover.close();
        }
        if (ColumnHeaderComponent_1.prevPopover == this.popover) {
            ColumnHeaderComponent_1.prevPopover = null;
            this.popover.close();
            return;
        }
        ColumnHeaderComponent_1.prevPopover = this.popover;
        this.popover.toggle();
    }
    sort($event) {
        this.column.isMultiSort = $event.ctrlKey;
        if (this.column.sortable) {
            this.onSort.emit(this.column);
        }
    }
    filter(hasValue) {
        ColumnHeaderComponent_1.prevPopover = null;
        this.popover.close();
        this.hasFilter = hasValue;
        this.onFilter.emit(this.column);
    }
};
ColumnHeaderComponent.prevPopover = null;
__decorate([
    core_1.Input(),
    __metadata("design:type", column_model_1.ColumnModel)
], ColumnHeaderComponent.prototype, "column", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ColumnHeaderComponent.prototype, "onSort", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ColumnHeaderComponent.prototype, "onFilter", void 0);
__decorate([
    core_1.ContentChild('filterPopover'),
    __metadata("design:type", core_1.TemplateRef)
], ColumnHeaderComponent.prototype, "filterPopoverTemplate", void 0);
__decorate([
    core_1.ViewChild('popover'),
    __metadata("design:type", Object)
], ColumnHeaderComponent.prototype, "popover", void 0);
ColumnHeaderComponent = ColumnHeaderComponent_1 = __decorate([
    core_1.Component({
        selector: 'tb-column-header',
        template: `
    <div class="column-header">
        <span 
            [ngClass]="{sortable: column.sortable, sortNone: column.direction == 0, sortAsc: column.direction == 1, sortDesc: column.direction == 2}"
            (click)="sort($event)">
            {{column.label}}
        </span>
        <div class="column-menu" [hidden]="column.filterMode == 0" 
            #popover="ngbPopover" [ngbPopover]="filterPopoverTemplate" 
            placement="bottom" popoverTitle="Filter" (click)="togglePopover()">
            <md-icon color="{{ hasFilter ? 'primary' : '' }}">filter_list</md-icon>
        </div>
    </div>`,
        styles: [
            '.column-menu { position: relative; display: block; text-align: center; vertical-align: top; float: right; }',
            '.column-header .mat-icon { font-size: 14px; cursor: pointer; }'
        ]
    })
], ColumnHeaderComponent);
exports.ColumnHeaderComponent = ColumnHeaderComponent;
var ColumnHeaderComponent_1;

this.tubular2 = columnheader_component;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnDataType;
(function (ColumnDataType) {
    ColumnDataType[ColumnDataType["String"] = 1] = "String";
    ColumnDataType[ColumnDataType["Number"] = 2] = "Number";
    ColumnDataType[ColumnDataType["Boolean"] = 3] = "Boolean";
    ColumnDataType[ColumnDataType["Date"] = 4] = "Date";
    ColumnDataType[ColumnDataType["DateTime"] = 5] = "DateTime";
    ColumnDataType[ColumnDataType["DateTimeUtc"] = 6] = "DateTimeUtc";
})(ColumnDataType = exports.ColumnDataType || (exports.ColumnDataType = {}));
var ColumnSortDirection;
(function (ColumnSortDirection) {
    ColumnSortDirection[ColumnSortDirection["None"] = 0] = "None";
    ColumnSortDirection[ColumnSortDirection["Asc"] = 1] = "Asc";
    ColumnSortDirection[ColumnSortDirection["Desc"] = 2] = "Desc";
})(ColumnSortDirection = exports.ColumnSortDirection || (exports.ColumnSortDirection = {}));
var ColumnFilterMode;
(function (ColumnFilterMode) {
    ColumnFilterMode[ColumnFilterMode["None"] = 0] = "None";
    ColumnFilterMode[ColumnFilterMode["String"] = 1] = "String";
    ColumnFilterMode[ColumnFilterMode["Number"] = 2] = "Number";
    ColumnFilterMode[ColumnFilterMode["Boolean"] = 3] = "Boolean";
    ColumnFilterMode[ColumnFilterMode["Date"] = 4] = "Date";
    ColumnFilterMode[ColumnFilterMode["DateTime"] = 5] = "DateTime";
})(ColumnFilterMode = exports.ColumnFilterMode || (exports.ColumnFilterMode = {}));
class ColumnFilter {
}
exports.ColumnFilter = ColumnFilter;
class ColumnModel {
    constructor(name, searchable, sortable) {
        this.searchable = true;
        this.sortable = true;
        this.sortOrder = 0;
        this.direction = ColumnSortDirection.None;
        this.visible = true;
        this.dataType = ColumnDataType.String;
        this.hasFilter = false;
        this.filterMode = ColumnFilterMode.None;
        this.filter = new ColumnFilter();
        this.isMultiSort = false;
        this.sortDirection = 'None';
        this.name = name;
        this.label = name.replace(/([a-z])([A-Z])/g, '$1 $2');
        if (searchable != null) {
            this.searchable = searchable;
        }
        if (sortable != null) {
            this.sortable = sortable;
        }
    }
    getInputType() {
        switch (this.filterMode) {
            case ColumnFilterMode.Number:
                return 'number';
            case ColumnFilterMode.Date:
                return 'date';
            case ColumnFilterMode.DateTime:
                return 'datetime-local';
            default:
                return 'text';
        }
    }
    getOperators() {
        switch (this.filterMode) {
            case ColumnFilterMode.String:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Contains', value: 'Contains' },
                    { name: 'Not Contains', value: 'NotContains' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Not Equals', value: 'NotEquals' },
                    { name: 'Starts With', value: 'StartsWith' },
                    { name: 'Not Starts With', value: 'NotStartsWith' },
                    { name: 'Ends With', value: 'EndsWith' },
                    { name: 'Not Ends With', value: 'NotEndsWith' }
                ];
            case ColumnFilterMode.Number:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Between', value: 'Between' },
                    { name: '>=', value: 'Gte' },
                    { name: '>', value: 'Gt' },
                    { name: '<=', value: 'Lte' },
                    { name: '<', value: 'Lt' }
                ];
            case ColumnFilterMode.Date:
            case ColumnFilterMode.DateTime:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Not Equals', value: 'NotEquals' },
                    { name: 'Between', value: 'Between' },
                    { name: '>=', value: 'Gte' },
                    { name: '>', value: 'Gt' },
                    { name: '<=', value: 'Lte' },
                    { name: '<', value: 'Lt' }
                ];
            case ColumnFilterMode.Boolean:
            default:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Not Equals', value: 'NotEquals' }
                ];
        }
    }
}
exports.ColumnModel = ColumnModel;

this.tubular2 = column_model;
}).call(this);

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
const grid_component_1 = require("./grid.component");
let ExportButtonDirective = class ExportButtonDirective {
    onClick(event) {
        this.gridInstance.getFullDataSource()
            .subscribe((data) => {
            const headers = this.gridInstance.columns.getValue().reduce((a, b) => a + b.label + ',', '').slice(0, -1) + '\r\n';
            const rows = data.Payload.map((row) => row.reduce((a, b) => a + '"' + b + '"' + ',', '').slice(0, -1) + '\r\n');
            const csv = rows.reduce((a, b) => a + b, headers);
            const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
            this.saveAs(blob);
        });
    }
    saveAs(blob) {
        const fileURL = window.URL.createObjectURL(blob);
        const downloadLink = window.document.createElement("a");
        downloadLink.href = fileURL;
        downloadLink.download = this.fileName || 'export.csv';
        downloadLink.target = '_self';
        downloadLink.click();
        window.URL.revokeObjectURL(fileURL);
    }
};
__decorate([
    core_1.Input('grid-export'),
    __metadata("design:type", grid_component_1.GridComponent)
], ExportButtonDirective.prototype, "gridInstance", void 0);
__decorate([
    core_1.Input('file-name'),
    __metadata("design:type", String)
], ExportButtonDirective.prototype, "fileName", void 0);
__decorate([
    core_1.HostListener('click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], ExportButtonDirective.prototype, "onClick", null);
ExportButtonDirective = __decorate([
    core_1.Directive({
        selector: '[grid-export]'
    })
], ExportButtonDirective);
exports.ExportButtonDirective = ExportButtonDirective;

this.tubular2 = gridexport_directive;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GridPageInfo {
    constructor() {
        this.currentInitial = 0;
        this.currentTop = 0;
        this.currentPage = 0;
        this.totalPages = 0;
        this.totalRecordCount = 0;
        this.filteredRecordCount = 0;
    }
}
exports.GridPageInfo = GridPageInfo;

this.tubular2 = gridpageinfo;
}).call(this);

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
const grid_component_1 = require("./grid.component");
const grid_page_info_1 = require("./grid-page-info");
let GridPagerInfoComponent = class GridPagerInfoComponent {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this.pageInfo = new grid_page_info_1.GridPageInfo();
        this.currentTop = 0;
        this.currentInitial = 0;
        this.filteredRecordCount = 0;
    }
    ngOnInit() {
        // live update properties
        this.tbGrid.pageInfo.subscribe((pageInfo) => {
            this.pageInfo = pageInfo;
            this.filtered = this.pageInfo.totalRecordCount !== this.pageInfo.filteredRecordCount;
        });
    }
};
GridPagerInfoComponent = __decorate([
    core_1.Component({
        selector: 'tb-grid-pager-info',
        template: `<div>
        Showing {{this.pageInfo.currentInitial}} to {{this.pageInfo.currentTop}} of {{pageInfo.filteredRecordCount}} records 
        <span [hidden]="!filtered">(Filtered from {{pageInfo.totalRecordCount}} total records)</span>
    </div>`,
        styles: [
            ':host /deep/ div { font-size: 12px; }',
        ]
    }),
    __metadata("design:paramtypes", [grid_component_1.GridComponent])
], GridPagerInfoComponent);
exports.GridPagerInfoComponent = GridPagerInfoComponent;

this.tubular2 = gridpagerinfo_component;
}).call(this);

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
const grid_component_1 = require("./grid.component");
let PrintButtonDirective = class PrintButtonDirective {
    onClick(event) {
        this.gridInstance.getFullDataSource()
            .subscribe((data) => {
            let headers = this.gridInstance.columns.getValue().reduce((a, b) => a + '<th>' + b.label + '</th>', '');
            let rows = data.Payload.reduce((prev, row) => prev + '<tr>' +
                row.reduce((a, b) => a + '<td>' + b + '</td>', '') + '</tr>', '');
            let tableHtml = `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
            let popup = window.open('', '', 'menubar=0,location3=0,height=500,width=800');
            popup.document.write('<body onload="window.print();">');
            popup.document.write(tableHtml);
            popup.document.write('</body>');
            popup.document.close();
        });
    }
};
__decorate([
    core_1.Input('grid-print'),
    __metadata("design:type", grid_component_1.GridComponent)
], PrintButtonDirective.prototype, "gridInstance", void 0);
__decorate([
    core_1.HostListener('click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], PrintButtonDirective.prototype, "onClick", null);
PrintButtonDirective = __decorate([
    core_1.Directive({
        selector: '[grid-print]'
    })
], PrintButtonDirective);
exports.PrintButtonDirective = PrintButtonDirective;

this.tubular2 = gridprint_directive;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

this.tubular2 = gridrequest;
}).call(this);

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const grid_component_1 = require("./grid.component");
const tubular_settings_service_1 = require("./tubular-settings.service");
let GridSearchComponent = class GridSearchComponent {
    constructor(settingsProvider, tbGrid) {
        this.settingsProvider = settingsProvider;
        this.tbGrid = tbGrid;
    }
    ngOnInit() {
        // TODO: Restore value from localstorage?
    }
    clearInput() {
        this.tbGrid.freeTextSearch.next('');
        this.search = '';
    }
    setSearch(event) {
        this.tbGrid.freeTextSearch.next(event);
    }
};
GridSearchComponent = __decorate([
    core_1.Component({
        selector: 'tb-grid-search',
        template: `<div fxLayout="row" class="search-container">
        <md-icon (click)="inputField.focus()" class="icon-gray">search</md-icon>
        <input type="text" 
            [(ngModel)]="search"
            (ngModelChange)="setSearch($event)"
            #inputField
            fxFlex
            placeholder="Search..." />
        <md-icon *ngIf="search" (click)="clearInput()" class="icon-gray">close</md-icon>
    </div>`,
        styles: [
            ':host /deep/ input { border-width: 0; background-color: transparent; }',
            ':host /deep/ input:focus { outline:none; }',
            ':host /deep/ .search-container { border: 1px solid #CCC; padding: 6px;     box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); position: relative; display: inline-flex; }',
            ':host /deep/ .icon-gray { cursor: pointer; color: #CCC; }'
        ]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, grid_component_1.GridComponent])
], GridSearchComponent);
exports.GridSearchComponent = GridSearchComponent;

this.tubular2 = gridsearch_component;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const column_model_1 = require("./column.model");
class GridTable {
    constructor(tbGrid) {
        this.tbGrid = tbGrid;
        this.columnObservable = new BehaviorSubject_1.BehaviorSubject([]);
        this.columns = this.columnObservable.asObservable();
        this.tbGrid.dataStream.subscribe((payload) => {
            this.rows = payload;
            this.isEmpty = !this.rows || this.rows.length === 0;
        });
        this.columnObservable.subscribe((payload) => this.tbGrid.columns.next(payload));
    }
    addColumns(columns) {
        columns.forEach((c) => {
            let val = this.columnObservable.getValue();
            val.push(c);
            this.columnObservable.next(val);
        });
    }
    sort(column) {
        let value = this.columnObservable.getValue();
        if (!column.sortable) {
            return;
        }
        if (column.direction === column_model_1.ColumnSortDirection.None) {
            column.direction = column_model_1.ColumnSortDirection.Asc;
        }
        else if (column.direction === column_model_1.ColumnSortDirection.Asc) {
            column.direction = column_model_1.ColumnSortDirection.Desc;
        }
        else if (column.direction === column_model_1.ColumnSortDirection.Desc) {
            column.direction = column_model_1.ColumnSortDirection.None;
        }
        column.sortOrder = column.direction === column_model_1.ColumnSortDirection.None ? 0 : Number.MAX_VALUE;
        if (!column.isMultiSort) {
            value.forEach((v) => v.sortOrder = v.name === column.name ? v.sortOrder : 0);
            value.forEach((v) => v.direction = v.name === column.name ?
                column.direction :
                column_model_1.ColumnSortDirection.None);
        }
        let currentlySortedColumns = value.filter((col) => col.sortOrder > 0);
        currentlySortedColumns.sort((a, b) => a.sortOrder === b.sortOrder ? 0 : 1);
        currentlySortedColumns.forEach((col, index) => { col.sortOrder = index + 1; });
        this.columnObservable.next(value);
    }
    applyFilter(column) {
        let val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    }
}
exports.GridTable = GridTable;

this.tubular2 = gridtable;
}).call(this);

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const moment = require("moment");
const tubular_settings_service_1 = require("./tubular-settings.service");
const column_model_1 = require("./column.model");
const grid_page_info_1 = require("./grid-page-info");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
// TODO: Add animation to sortable
let GridComponent = class GridComponent {
    constructor(settingsProvider, http) {
        this.settingsProvider = settingsProvider;
        this.http = http;
        // data is just observable and children can't push
        this.data = new BehaviorSubject_1.BehaviorSubject([]);
        this.dataStream = this.data.asObservable();
        this._pageInfo = new BehaviorSubject_1.BehaviorSubject(new grid_page_info_1.GridPageInfo());
        this.pageInfo = this._pageInfo.asObservable();
        this._pageSize = new BehaviorSubject_1.BehaviorSubject(this.getPageSizeSettingValue());
        this.pageSize = this._pageSize.asObservable();
        // values that to observe and allow to push from children
        this.page = new BehaviorSubject_1.BehaviorSubject(this.getPageSettingValue());
        this.columns = new BehaviorSubject_1.BehaviorSubject([]);
        this.freeTextSearch = new BehaviorSubject_1.BehaviorSubject('');
        this.pageSet = false;
        this.isLoading = false;
        this.search = {
            text: '',
            operator: 'None'
        };
        this.requestCount = 0;
        this.beforeRequest = new core_1.EventEmitter();
    }
    goToPage(page) {
        this.pageSet = true;
        this.page.next(page);
    }
    refresh() {
        if (this.pageSet && this.columns.getValue().length > 0 && this._pageSize.getValue() > 0) {
            this.getCurrentPage()
                .subscribe((data) => {
                this.transformDataset(data, this.tbRequestRunning);
            });
        }
    }
    getCurrentPage() {
        this.isLoading = true;
        this.tbRequestRunning = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: this.page.getValue() * this._pageSize.getValue(),
            take: this._pageSize.getValue(),
            search: this.search,
            timezoneOffset: new Date().getTimezoneOffset()
        };
        return this.requestData(this.tbRequestRunning);
    }
    getFullDataSource() {
        let tbRequest = {
            count: this.requestCount++,
            columns: this.columns.getValue(),
            skip: 0,
            take: -1,
            search: {
                text: '',
                operator: 'None'
            }
        };
        return this.requestData(tbRequest);
    }
    changePagesData() {
        if (this.settingsProvider != null) {
            this.settingsProvider.put('gridPage', this.page.getValue());
        }
    }
    changePageSizeData() {
        if (this.settingsProvider != null) {
            this.settingsProvider.put('gridPageSize', this._pageSize.getValue());
        }
    }
    getPageSettingValue() {
        if (this.settingsProvider != null) {
            return this.settingsProvider.get("gridPage") || 0;
        }
        return 0;
    }
    getPageSizeSettingValue() {
        if (this.settingsProvider != null) {
            return this.settingsProvider.get("gridPageSize") || 10;
        }
        return 10;
    }
    ngOnInit() {
        // just a logging
        this.dataStream.subscribe((p) => console.log('New data', p));
        // subscriptions to events
        this.pageSize.subscribe((c) => {
            this.refresh();
            this.changePageSizeData();
        });
        this.columns.subscribe((c) => this.refresh());
        this.page.subscribe((c) => {
            this.refresh();
            this.changePagesData();
        });
        this.freeTextSearch
            .debounceTime(500)
            .subscribe((c) => {
            if (c === this.search.text) {
                return;
            }
            this.search.text = c;
            this.search.operator = !c ? 'None' : 'Auto';
            this.refresh();
        });
        this.goToPage(0);
    }
    requestData(tbRequest) {
        // transform direction values to strings
        tbRequest.columns.forEach(this.transformSortDirection);
        let ngRequestOptions = new http_1.RequestOptions({
            body: tbRequest,
            url: this.dataUrl,
            method: this.requestMethod || 'POST',
            withCredentials: false,
            responseType: http_1.ResponseContentType.Json
        });
        this.beforeRequest.emit(ngRequestOptions);
        let ngRequest = new http_1.Request(ngRequestOptions);
        return this.http.request(ngRequest).map(response => {
            this.isLoading = false;
            return response.json();
        });
    }
    transformSortDirection(column) {
        switch (column.direction) {
            case column_model_1.ColumnSortDirection.Asc:
                column.sortDirection = 'Ascending';
                break;
            case column_model_1.ColumnSortDirection.Desc:
                column.sortDirection = 'Descending';
                break;
            default:
                column.sortDirection = 'None';
        }
    }
    transformToObj(columns, data) {
        let obj = {};
        columns.forEach((column, key) => {
            obj[column.name] = data[key] || data[column.name];
            if (column.dataType === column_model_1.ColumnDataType.DateTimeUtc) {
                obj[column.name] = moment.utc(obj[column.name]);
            }
            if (column.dataType === column_model_1.ColumnDataType.Date || column.dataType === column_model_1.ColumnDataType.DateTime) {
                obj[column.name] = moment(obj[column.name]);
            }
        });
        return obj;
    }
    transformDataset(data, req) {
        let transform = (d) => this.transformToObj(req.columns, d);
        let payload = (data.Payload || {}).map(transform);
        // push data
        this.data.next(payload);
        let pageInfo = new grid_page_info_1.GridPageInfo();
        pageInfo.currentPage = data.CurrentPage;
        pageInfo.totalPages = data.TotalPages;
        pageInfo.filteredRecordCount = data.FilteredRecordCount;
        pageInfo.totalRecordCount = data.TotalRecordCount;
        pageInfo.currentInitial = ((pageInfo.currentPage - 1) * this._pageSize.getValue()) + 1;
        if (pageInfo.currentInitial <= 0) {
            pageInfo.currentInitial = data.TotalRecordCount > 0 ? 1 : 0;
        }
        pageInfo.currentTop = this._pageSize.getValue() * pageInfo.currentPage;
        if (pageInfo.currentTop <= 0 || pageInfo.currentTop > data.filteredRecordCount) {
            pageInfo.currentTop = data.filteredRecordCount;
        }
        // push page Info
        this._pageInfo.next(pageInfo);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GridComponent.prototype, "dataUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GridComponent.prototype, "requestMethod", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], GridComponent.prototype, "requestTimeout", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GridComponent.prototype, "beforeRequest", void 0);
GridComponent = __decorate([
    core_1.Component({
        selector: 'tb-grid',
        template: `
    <div>
        <ng-content></ng-content>
    </div>`,
        styles: [
            ':host /deep/ .sortable { cursor: pointer; }',
            ':host /deep/ .sortable:hover { font-weight: bold }',
            ':host /deep/ .sortAsc::after { font-family: "Material Icons"; content: "\\E5D8"; }',
            ':host /deep/ .sortDesc::after { font-family: "Material Icons"; content: "\\E5DB"; }',
            ':host /deep/ table { width: 100%; border-spacing: 0; overflow: hidden; }',
            ':host /deep/ thead > tr { height: 56px }',
            ':host /deep/ th { vertical-align: middle; text-align: left; color: rgba(0,0,0,.54); font-size: 12px; font-weight: 700; white-space: nowrap }',
            ':host /deep/ td { vertical-align: middle; text-align: left; color: rgba(0,0,0,.87); font-size: 13px; border-top: 1px rgba(0,0,0,.12) solid; }',
            ':host /deep/ tbody > tr, tfoot > tr { height: 48px; }'
        ]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(tubular_settings_service_1.SETTINGS_PROVIDER)),
    __metadata("design:paramtypes", [Object, http_1.Http])
], GridComponent);
exports.GridComponent = GridComponent;

this.tubular2 = grid_component;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {ReflectiveInjector} from '@angular/core'
const http_1 = require("@angular/http");
//import {TubularDataService} from './tubular-data.service';
//import { SETTINGS_PROVIDER } from './tubular-settings.service';
class HttpOptions extends http_1.BaseRequestOptions {
    constructor() {
        // constructor() {
        //     super();
        super(...arguments);
        //     let injector = ReflectiveInjector.resolveAndCreate([TubularDataService, HttpModule]);
        //     let dataService = injector.get(TubularDataService);
        //     this.headers = new Headers({ 'Authorization': dataService.getToken() })
        // }
        //The is try to use Injector 
        this.headers = new http_1.Headers({ 'Authorization': JSON.parse(localStorage.getItem('auth_Header')) });
    }
}
exports.HttpOptions = HttpOptions;

this.tubular2 = httpoptions;
}).call(this);

;(function () {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// export module
__export(require("./tubular.module"));
// export services
__export(require("./tubular-settings.service"));
// export components and directives
__export(require("./grid.component"));
__export(require("./grid-table"));
__export(require("./grid-search.component"));
__export(require("./grid-pager.component"));
__export(require("./grid-pager-info.component"));
__export(require("./column-header.component"));
__export(require("./column.model"));
__export(require("./grid-export.directive"));
__export(require("./mdate.pipe"));
__export(require("./http-options"));
__export(require("./grid-print.directive"));

this.tubular2 = index;
}).call(this);

;(function () {
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const moment = require("moment");
let MDatePipe = class MDatePipe {
    transform(value, format) {
        if (moment.isMoment(value)) {
            return format ? value.format(format) : value.format();
        }
        return value;
    }
};
MDatePipe = __decorate([
    core_1.Pipe({ name: 'mdate' })
], MDatePipe);
exports.MDatePipe = MDatePipe;

this.tubular2 = mdate_pipe;
}).call(this);

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
const grid_component_1 = require("./grid.component");
require("rxjs/add/operator/debounceTime");
class PageSizeInfo {
    constructor() {
        this.value = 0;
        this.selected = false;
    }
}
exports.PageSizeInfo = PageSizeInfo;
let PageSizeSelectorComponent = class PageSizeSelectorComponent {
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
};
__decorate([
    core_1.Input('options'),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], PageSizeSelectorComponent.prototype, "in", null);
PageSizeSelectorComponent = __decorate([
    core_1.Component({
        selector: 'tb-page-size-selector',
        template: `
    <md-select placeholder="Page Size" (change)="onChange($event.value)"
        [(ngModel)]="selected" [ngModelOptions]="{standalone: true}">
        <md-option *ngFor="let obj of _options" [value]="obj">{{obj}}</md-option>
    </md-select>`
    }),
    __metadata("design:paramtypes", [grid_component_1.GridComponent])
], PageSizeSelectorComponent);
exports.PageSizeSelectorComponent = PageSizeSelectorComponent;

this.tubular2 = pagesizeselector_component;
}).call(this);

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
const triggers_1 = require("./triggers");
const positioning_1 = require("./positioning");
const popup_1 = require("./popup");
let nextId = 0;
let NgbPopoverWindow = class NgbPopoverWindow {
    constructor() {
        this.placement = 'top';
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopoverWindow.prototype, "placement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopoverWindow.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopoverWindow.prototype, "id", void 0);
NgbPopoverWindow = __decorate([
    core_1.Component({
        selector: 'ngb-popover-window',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        host: { '[class]': '"popover show popover-" + placement', 'role': 'tooltip', '[id]': 'id' },
        template: `
    <h3 class="popover-title">{{title}}</h3><div class="popover-content"><ng-content></ng-content></div>
    `
    })
], NgbPopoverWindow);
exports.NgbPopoverWindow = NgbPopoverWindow;
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
let NgbPopover = class NgbPopover {
    // TODO: Ignoring config for now
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, //config: NgbPopoverConfig,
        ngZone) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * Emits an event when the popover is shown
         */
        this.shown = new core_1.EventEmitter();
        /**
         * Emits an event when the popover is hidden
         */
        this.hidden = new core_1.EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId++}`;
        //this.placement = config.placement;
        //this.triggers = config.triggers;
        //this.container = config.container;
        this._popupService = new popup_1.PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(() => {
            if (this._windowRef) {
                positioning_1.positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body');
            }
        });
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     */
    open(context) {
        if (!this._windowRef) {
            this._windowRef = this._popupService.open(this.ngbPopover, context);
            this._windowRef.instance.placement = this.placement;
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // we need to manually invoke change detection since events registered via
            // Renderer::listen() are not picked up by change detection with the OnPush strategy
            this._windowRef.changeDetectorRef.markForCheck();
            this.shown.emit();
        }
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
     */
    close() {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
        }
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns whether or not the popover is currently being shown
     */
    isOpen() { return this._windowRef != null; }
    ngOnInit() {
        this._unregisterListenersFn = triggers_1.listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
    }
    ngOnDestroy() {
        this.close();
        this._unregisterListenersFn();
        this._zoneSubscription.unsubscribe();
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgbPopover.prototype, "ngbPopover", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopover.prototype, "popoverTitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopover.prototype, "placement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopover.prototype, "triggers", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopover.prototype, "container", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NgbPopover.prototype, "shown", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NgbPopover.prototype, "hidden", void 0);
NgbPopover = __decorate([
    core_1.Directive({ selector: '[ngbPopover]', exportAs: 'ngbPopover' }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, core_1.Injector,
        core_1.ComponentFactoryResolver, core_1.ViewContainerRef,
        core_1.NgZone])
], NgbPopover);
exports.NgbPopover = NgbPopover;

this.tubular2 = popover;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class ContentRef {
    constructor(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
}
exports.ContentRef = ContentRef;
class PopupService {
    constructor(type, _injector, _viewContainerRef, _renderer, componentFactoryResolver) {
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._windowFactory = componentFactoryResolver.resolveComponentFactory(type);
    }
    open(content, context) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowRef =
                this._viewContainerRef.createComponent(this._windowFactory, 0, this._injector, this._contentRef.nodes);
        }
        return this._windowRef;
    }
    close() {
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;
            if (this._contentRef.viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
                this._contentRef = null;
            }
        }
    }
    _getContentRef(content, context) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof core_1.TemplateRef) {
            const viewRef = this._viewContainerRef.createEmbeddedView(content, context);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._renderer.createText(`${content}`)]]);
        }
    }
}
exports.PopupService = PopupService;

this.tubular2 = popup;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Positioning {
    getStyle(element, prop) { return window.getComputedStyle(element)[prop]; }
    isStaticPositioned(element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    }
    offsetParent(element) {
        let offsetParentEl = element.offsetParent || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = offsetParentEl.offsetParent;
        }
        return offsetParentEl || document.documentElement;
    }
    position(element, round = true) {
        let elPosition;
        let parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
        }
        else {
            const offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    }
    offset(element, round = true) {
        const elBcr = element.getBoundingClientRect();
        const viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        let elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    }
    positionElements(hostElement, targetElement, placement, appendToBody) {
        const hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        const targetElBCR = targetElement.getBoundingClientRect();
        const placementPrimary = placement.split('-')[0] || 'top';
        const placementSecondary = placement.split('-')[1] || 'center';
        let targetElPosition = {
            height: targetElBCR.height || targetElement.offsetHeight,
            width: targetElBCR.width || targetElement.offsetWidth,
            top: 0,
            bottom: targetElBCR.height || targetElement.offsetHeight,
            left: 0,
            right: targetElBCR.width || targetElement.offsetWidth
        };
        switch (placementPrimary) {
            case 'top':
                targetElPosition.top = hostElPosition.top - targetElement.offsetHeight;
                break;
            case 'bottom':
                targetElPosition.top = hostElPosition.top + hostElPosition.height;
                break;
            case 'left':
                targetElPosition.left = hostElPosition.left - targetElement.offsetWidth;
                break;
            case 'right':
                targetElPosition.left = hostElPosition.left + hostElPosition.width;
                break;
        }
        switch (placementSecondary) {
            case 'top':
                targetElPosition.top = hostElPosition.top;
                break;
            case 'bottom':
                targetElPosition.top = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight;
                break;
            case 'left':
                targetElPosition.left = hostElPosition.left;
                break;
            case 'right':
                targetElPosition.left = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth;
                break;
            case 'center':
                if (placementPrimary === 'top' || placementPrimary === 'bottom') {
                    targetElPosition.left = hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2;
                }
                else {
                    targetElPosition.top = hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2;
                }
                break;
        }
        targetElPosition.top = Math.round(targetElPosition.top);
        targetElPosition.bottom = Math.round(targetElPosition.bottom);
        targetElPosition.left = Math.round(targetElPosition.left);
        targetElPosition.right = Math.round(targetElPosition.right);
        return targetElPosition;
    }
}
exports.Positioning = Positioning;
const positionService = new Positioning();
function positionElements(hostElement, targetElement, placement, appendToBody) {
    const pos = positionService.positionElements(hostElement, targetElement, placement, appendToBody);
    targetElement.style.top = `${pos.top}px`;
    targetElement.style.left = `${pos.left}px`;
}
exports.positionElements = positionElements;

this.tubular2 = positioning;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Trigger {
    constructor(open, close) {
        this.open = open;
        this.close = close;
        if (!close) {
            this.close = open;
        }
    }
    isManual() { return this.open === 'manual' || this.close === 'manual'; }
}
exports.Trigger = Trigger;
const DEFAULT_ALIASES = {
    hover: ['mouseenter', 'mouseleave']
};
function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
    const trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    const parsedTriggers = trimmedTriggers.split(/\s+/).map(trigger => trigger.split(':')).map((triggerPair) => {
        let alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    const manualTriggers = parsedTriggers.filter(triggerPair => triggerPair.isManual());
    if (manualTriggers.length > 1) {
        throw 'Triggers parse error: only one manual trigger is allowed';
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
    }
    return parsedTriggers;
}
exports.parseTriggers = parseTriggers;
const noopFn = () => { };
function listenToTriggers(renderer, nativeElement, triggers, openFn, closeFn, toggleFn) {
    const parsedTriggers = parseTriggers(triggers);
    const listeners = [];
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return noopFn;
    }
    parsedTriggers.forEach((trigger) => {
        if (trigger.open === trigger.close) {
            listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
        }
        else {
            listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
        }
    });
    return () => { listeners.forEach(unsubscribeFn => unsubscribeFn()); };
}
exports.listenToTriggers = listenToTriggers;

this.tubular2 = triggers;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
exports.SETTINGS_PROVIDER = new core_1.OpaqueToken('tubular-settings.service');
class TubularLocalStorageService {
    constructor() {
        this.existLocalStorage = true;
        if (!window.localStorage) {
            this.existLocalStorage = false;
            console.log('Browser does not support localStorage');
        }
    }
    put(id, value) {
        if (this.existLocalStorage) {
            localStorage.setItem(id, JSON.stringify(value));
        }
        else {
            this._data[id] = String(value);
        }
    }
    get(key) {
        if (this.existLocalStorage) {
            return JSON.parse(localStorage.getItem(key)) || false;
        }
        return this._data.hasOwnProperty(key) ? this._data[key] : false;
    }
    delete(key) {
        if (this.existLocalStorage) {
            localStorage.removeItem(key);
        }
        else {
            delete this._data[key];
        }
    }
}
exports.TubularLocalStorageService = TubularLocalStorageService;

this.tubular2 = tubularsettings_service;
}).call(this);

;(function () {
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const material_1 = require("@angular/material");
const grid_component_1 = require("./grid.component");
const column_header_component_1 = require("./column-header.component");
const grid_search_component_1 = require("./grid-search.component");
const grid_pager_component_1 = require("./grid-pager.component");
const column_filter_dialog_component_1 = require("./column-filter-dialog.component");
const grid_pager_info_component_1 = require("./grid-pager-info.component");
const page_size_selector_component_1 = require("./page-size-selector.component");
const grid_export_directive_1 = require("./grid-export.directive");
const grid_print_directive_1 = require("./grid-print.directive");
const mdate_pipe_1 = require("./mdate.pipe");
// NbBootstrap special guest (https://github.com/ng-bootstrap/ng-bootstrap)
const popover_1 = require("./popover");
let TubularModule = class TubularModule {
};
TubularModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            material_1.MaterialModule
        ],
        declarations: [
            grid_component_1.GridComponent, column_header_component_1.ColumnHeaderComponent, grid_search_component_1.GridSearchComponent,
            grid_pager_component_1.GridPagerComponent, grid_pager_info_component_1.GridPagerInfoComponent, column_filter_dialog_component_1.ColumnFilterDialogComponent,
            page_size_selector_component_1.PageSizeSelectorComponent, grid_export_directive_1.ExportButtonDirective, grid_print_directive_1.PrintButtonDirective,
            mdate_pipe_1.MDatePipe, popover_1.NgbPopover, popover_1.NgbPopoverWindow
        ],
        exports: [
            grid_component_1.GridComponent, column_header_component_1.ColumnHeaderComponent, grid_search_component_1.GridSearchComponent,
            grid_pager_component_1.GridPagerComponent, grid_pager_info_component_1.GridPagerInfoComponent, column_filter_dialog_component_1.ColumnFilterDialogComponent,
            page_size_selector_component_1.PageSizeSelectorComponent, grid_export_directive_1.ExportButtonDirective, grid_print_directive_1.PrintButtonDirective,
            mdate_pipe_1.MDatePipe, popover_1.NgbPopover
        ],
        entryComponents: [
            popover_1.NgbPopoverWindow
        ]
    })
], TubularModule);
exports.TubularModule = TubularModule;

this.tubular2 = tubular_module;
}).call(this);

;(function () {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toInteger(value) {
    return parseInt(`${value}`, 10);
}
exports.toInteger = toInteger;
function toString(value) {
    return (value !== undefined && value !== null) ? `${value}` : '';
}
exports.toString = toString;
function getValueInRange(value, max, min = 0) {
    return Math.max(Math.min(value, max), min);
}
exports.getValueInRange = getValueInRange;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isNumber(value) {
    return !isNaN(toInteger(value));
}
exports.isNumber = isNumber;
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
exports.isInteger = isInteger;
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function padNumber(value) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    }
    else {
        return '';
    }
}
exports.padNumber = padNumber;
function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
exports.regExpEscape = regExpEscape;

this.tubular2 = util;
}).call(this);
