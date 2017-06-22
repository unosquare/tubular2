"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class GridExportButtonDirective {
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
        const downloadLink = window.document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = this.fileName || 'export.csv';
        downloadLink.target = '_self';
        downloadLink.click();
        window.URL.revokeObjectURL(fileURL);
    }
}
GridExportButtonDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[grid-export]'
            },] },
];
/** @nocollapse */
GridExportButtonDirective.ctorParameters = () => [];
GridExportButtonDirective.propDecorators = {
    'gridInstance': [{ type: core_1.Input, args: ['grid-export',] },],
    'fileName': [{ type: core_1.Input, args: ['file-name',] },],
    'onClick': [{ type: core_1.HostListener, args: ['click', ['$event.target'],] },],
};
exports.GridExportButtonDirective = GridExportButtonDirective;
//# sourceMappingURL=grid-export.js.map