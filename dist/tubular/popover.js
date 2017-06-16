;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Popover = factory();
  }
}(this, function() {
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const triggers_1 = require("./triggers");
const positioning_1 = require("./positioning");
const popup_1 = require("./popup");
let nextId = 0;
let NgbPopoverWindow = class NgbPopoverWindow {
    constructor() {
        this.placement = 'top';
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopoverWindow.prototype, "placement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopoverWindow.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopoverWindow.prototype, "id", void 0);
NgbPopoverWindow = __decorate([
    core_1.Component({
        selector: 'ngb-popover-window',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        host: { '[class]': '"popover show popover-" + placement', 'role': 'tooltip', '[id]': 'id' },
        template: `
    <h3 class="popover-title">{{title}}</h3><div class="popover-content"><ng-content></ng-content></div>
    `
    })
], NgbPopoverWindow);
exports.NgbPopoverWindow = NgbPopoverWindow;
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
let NgbPopover = class NgbPopover {
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
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgbPopover.prototype, "ngbPopover", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopover.prototype, "popoverTitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopover.prototype, "placement", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopover.prototype, "triggers", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgbPopover.prototype, "container", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NgbPopover.prototype, "shown", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NgbPopover.prototype, "hidden", void 0);
NgbPopover = __decorate([
    core_1.Directive({ selector: '[ngbPopover]', exportAs: 'ngbPopover' }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, core_1.Injector,
        core_1.ComponentFactoryResolver, core_1.ViewContainerRef,
        core_1.NgZone])
], NgbPopover);
exports.NgbPopover = NgbPopover;

return Popover;
}));
