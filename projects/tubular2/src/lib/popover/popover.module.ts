import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgbPopover, NgbPopoverWindow } from './popover';

export { NgbPopover } from './popover';

@NgModule({ declarations: [NgbPopover, NgbPopoverWindow], exports: [NgbPopover], entryComponents: [NgbPopoverWindow] })
export class PopoverModule {
    static forRoot(): ModuleWithProviders { return { ngModule: PopoverModule }; }
}
