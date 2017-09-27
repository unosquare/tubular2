import {
    Component, Input, Output, EventEmitter,
    OnInit, Inject, Optional
} from '@angular/core';

@Component({
    selector: 'tb-column',
    templateUrl: './tb-column.html'
})
export class TbColumn {
    @Input() columnDef: string;
    @Input() header: string;
}