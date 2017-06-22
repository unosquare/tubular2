"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const index_1 = require("../grid/index");
const tubular_local_storage_service_1 = require("../core/tubular-local-storage-service");
class GridSearchComponent {
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
}
GridSearchComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tb-grid-search',
                templateUrl: 'grid-search.html',
                styleUrls: ['grid-search.css']
            },] },
];
/** @nocollapse */
GridSearchComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [tubular_local_storage_service_1.SETTINGS_PROVIDER,] },] },
    { type: index_1.GridComponent, },
];
exports.GridSearchComponent = GridSearchComponent;
//# sourceMappingURL=grid-search.js.map