 import { Directive, Input, HostListener } from '@angular/core';
import { GridComponent } from '../grid/index';

@Directive({
    selector: '[tbGridPrint]'
})
export class GridPrintButtonDirective {
    @Input() gridInstance: GridComponent;

    @HostListener('click', ['$event.target'])
    onClick(event: MouseEvent) {
        this.gridInstance.getFullDataSource()
            .subscribe((data: any) => {
                const headers = this.gridInstance.columns.getValue().reduce(
                    (a, b) => a + '<th>' + b.Label + '</th>', '');
                const rows = data.Payload.reduce(
                    (prev: string, row) => prev + '<tr>' +
                        row.reduce((a: string, b: string) => a + '<td>' + b + '</td>', '') + '</tr>', '');

                const tableHtml =
                    `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;

                const popup = window.open('', '', 'menubar=0,location3=0,height=500,width=800');
                popup.document.write('<body onload="window.print();">');
                popup.document.write(tableHtml);
                popup.document.write('</body>');
                popup.document.close();
            });
    }
}
