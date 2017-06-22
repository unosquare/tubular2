 import { Directive, Input, HostListener } from '@angular/core';
import { GridComponent } from './grid.component';

@Directive({
    selector: '[grid-export]'
})
export class ExportButtonDirective {
    @Input('grid-export') gridInstance: GridComponent;
    @Input('file-name') fileName: string;

    @HostListener('click', ['$event.target'])
    onClick(event: MouseEvent) {
        this.gridInstance.getFullDataSource()
        .subscribe((data: any) => {
            const headers = this.gridInstance.columns.getValue().reduce((a, b) => a + b.label + ',', '').slice(0, -1) + '\r\n';
            const rows = data.Payload.map((row) => row.reduce((a, b) => a + '"' + b + '"' + ',', '').slice(0, -1) + '\r\n');
            const csv = rows.reduce((a, b) => a + b, headers);

            const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
            this.saveAs(blob);
        });
    }

    private saveAs(blob) {
          const fileURL = window.URL.createObjectURL(blob);
          const downloadLink = window.document.createElement('a');

          downloadLink.href = fileURL;
          downloadLink.download = this.fileName || 'export.csv';
          downloadLink.target = '_self';
          downloadLink.click();

          window.URL.revokeObjectURL(fileURL);
    }
}
