import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[columnHeader]'
})
export class TbColumnHeader {
    @Input() sortable: boolean = true;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        if (!this.sortable) return;

        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
    }
}