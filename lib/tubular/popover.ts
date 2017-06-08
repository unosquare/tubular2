import {
    Component,
    Directive,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    OnInit,
    OnDestroy,
    Injector,
    Renderer2,
    ComponentRef,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    NgZone
} from '@angular/core';

import { listenToTriggers } from './triggers';
import { positionElements } from './positioning';
import { PopupService } from './popup';

let nextId = 0;

@Component({
    selector: 'ngb-popover-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[class]': '"popover show popover-" + placement', 'role': 'tooltip', '[id]': 'id' },
    template: `
    <h3 class="popover-title">{{title}}</h3><div class="popover-content"><ng-content></ng-content></div>
    `
})
export class NgbPopoverWindow {
    @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
    @Input() title: string;
    @Input() id: string;
}

/**
 * A lightweight, extensible directive for fancy popover creation.
 */
@Directive({ selector: '[ngbPopover]', exportAs: 'ngbPopover' })
export class NgbPopover implements OnInit, OnDestroy {
    /**
     * Content to be displayed as popover.
     */
    @Input() ngbPopover: string | TemplateRef<any>;
    /**
     * Title of a popover.
     */
    @Input() popoverTitle: string;
    /**
     * Placement of a popover. Accepts: "top", "bottom", "left", "right"
     */
    @Input() placement: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Specifies events that should trigger. Supports a space separated list of event names.
     */
    @Input() triggers: string;
    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     */
    @Input() container: string;
    /**
     * Emits an event when the popover is shown
     */
    @Output() shown = new EventEmitter();
    /**
     * Emits an event when the popover is hidden
     */
    @Output() hidden = new EventEmitter();

    private _ngbPopoverWindowId = `ngb-popover-${nextId++}`;
    private _popupService: PopupService<NgbPopoverWindow>;
    private _windowRef: ComponentRef<NgbPopoverWindow>;
    private _unregisterListenersFn;
    private _zoneSubscription: any;

    // TODO: Ignoring config for now
    constructor(
        private _elementRef: ElementRef, private _renderer: Renderer2, injector: Injector,
        componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, //config: NgbPopoverConfig,
        ngZone: NgZone) {
        //this.placement = config.placement;
        //this.triggers = config.triggers;
        //this.container = config.container;
        this._popupService = new PopupService<NgbPopoverWindow>(
            NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);

        this._zoneSubscription = ngZone.onStable.subscribe(() => {
            if (this._windowRef) {
                positionElements(
                    this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
                    this.container === 'body');
            }
        });
    }

    /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     */
    open(context?: any) {
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
    close(): void {
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
    toggle(): void {
        if (this._windowRef) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Returns whether or not the popover is currently being shown
     */
    isOpen(): boolean { return this._windowRef != null; }

    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(
            this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this),
            this.toggle.bind(this));
    }

    ngOnDestroy() {
        this.close();
        this._unregisterListenersFn();
        this._zoneSubscription.unsubscribe();
    }
}
