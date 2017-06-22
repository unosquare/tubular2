"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const triggers_1 = require("./triggers");
const positioning_1 = require("./positioning");
const popup_1 = require("./popup");
let nextId = 0;
class NgbPopoverWindow {
    constructor() {
        this.placement = 'top';
    }
}
NgbPopoverWindow.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ngb-popover-window',
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                host: { '[class]': '"popover show popover-" + placement', 'role': 'tooltip', '[id]': 'id' },
                templateUrl: 'popover.html'
            },] },
];
/** @nocollapse */
NgbPopoverWindow.ctorParameters = () => [];
NgbPopoverWindow.propDecorators = {
    'placement': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'id': [{ type: core_1.Input },],
};
exports.NgbPopoverWindow = NgbPopoverWindow;
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
class NgbPopover {
    // TODO: Ignoring config for now
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, //config: NgbPopoverConfig,
        ngZone) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * Emits an event when the popover is shown
         */
        this.shown = new core_1.EventEmitter();
        /**
         * Emits an event when the popover is hidden
         */
        this.hidden = new core_1.EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId++}`;
        //this.placement = config.placement;
        //this.triggers = config.triggers;
        //this.container = config.container;
        this._popupService = new popup_1.PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(() => {
            if (this._windowRef) {
                positioning_1.positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body');
            }
        });
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     */
    open(context) {
        if (!this._windowRef) {
            this._windowRef = this._popupService.open(this.ngbPopover, context);
            this._windowRef.instance.placement = this.placement;
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // we need to manually invoke change detection since events registered via
            // Renderer::listen() are not picked up by change detection with the OnPush strategy
            this._windowRef.changeDetectorRef.markForCheck();
            this.shown.emit();
        }
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
     */
    close() {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
        }
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns whether or not the popover is currently being shown
     */
    isOpen() { return this._windowRef != null; }
    ngOnInit() {
        this._unregisterListenersFn = triggers_1.listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
    }
    ngOnDestroy() {
        this.close();
        this._unregisterListenersFn();
        this._zoneSubscription.unsubscribe();
    }
}
NgbPopover.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] },
];
/** @nocollapse */
NgbPopover.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: core_1.Injector, },
    { type: core_1.ComponentFactoryResolver, },
    { type: core_1.ViewContainerRef, },
    { type: core_1.NgZone, },
];
NgbPopover.propDecorators = {
    'ngbPopover': [{ type: core_1.Input },],
    'popoverTitle': [{ type: core_1.Input },],
    'placement': [{ type: core_1.Input },],
    'triggers': [{ type: core_1.Input },],
    'container': [{ type: core_1.Input },],
    'shown': [{ type: core_1.Output },],
    'hidden': [{ type: core_1.Output },],
};
exports.NgbPopover = NgbPopover;
//# sourceMappingURL=popover.js.map