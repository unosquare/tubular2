"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class GridPrintButtonDirective {
    onClick(event) {
        this.gridInstance.getFullDataSource()
            .subscribe((data) => {
            const headers = this.gridInstance.columns.getValue().reduce((a, b) => a + '<th>' + b.label + '</th>', '');
            const rows = data.Payload.reduce((prev, row) => prev + '<tr>' +
                row.reduce((a, b) => a + '<td>' + b + '</td>', '') + '</tr>', '');
            const tableHtml = `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
            const popup = window.open('', '', 'menubar=0,location3=0,height=500,width=800');
            popup.document.write('<body onload="window.print();">');
            popup.document.write(tableHtml);
            popup.document.write('</body>');
            popup.document.close();
        });
    }
}
GridPrintButtonDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[grid-print]'
            },] },
];
/** @nocollapse */
GridPrintButtonDirective.ctorParameters = () => [];
GridPrintButtonDirective.propDecorators = {
    'gridInstance': [{ type: core_1.Input, args: ['grid-print',] },],
    'onClick': [{ type: core_1.HostListener, args: ['click', ['$event.target'],] },],
};
exports.GridPrintButtonDirective = GridPrintButtonDirective;
//# sourceMappingURL=grid-print.js.map