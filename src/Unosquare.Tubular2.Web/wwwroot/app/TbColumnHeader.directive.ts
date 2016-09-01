import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[columnHeader]'
})
export class TbColumnHeader {
    @Input() sortable: boolean = true;
    @Input() sortDirection: number = 0;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        if (!this.sortable) return;

        this.renderer.setElementClass(this.el.nativeElement, 'sortable', true);
    }
}