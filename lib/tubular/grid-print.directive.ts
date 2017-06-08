import { Directive, Input, HostListener } from '@angular/core';
import { GridComponent } from './grid.component';

@Directive({
    selector: '[grid-print]'
})
export class PrintButtonDirective {
    @Input('grid-print') gridInstance: GridComponent;

    @HostListener('click', ['$event.target'])
    onClick(event: MouseEvent) {
        this.gridInstance.getFullDataSource()
            .subscribe((data: any) => {
                let headers = this.gridInstance.columns.getValue().reduce(
                    (a, b) => a + '<th>' + b.label + '</th>', '');
                let rows = data.Payload.reduce(
                    (prev, row) => prev + '<tr>' +
                        row.reduce((a, b) => a + '<td>' + b + '</td>', '') + '</tr>', '');

                let tableHtml =
                    `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;

                let popup = window.open('', '', 'menubar=0,location3=0,height=500,width=800');
                popup.document.write('<body onload="window.print();">');
                popup.document.write(tableHtml);
                popup.document.write('</body>');
                popup.document.close();
            });
    }
}
