// TODO(kara): prevent-close functionality

import {
  AfterContentInit,
  Attribute,
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {PopoverPositionX, PopoverPositionY} from './popover-positions';
import {MdPopoverInvalidPositionX, MdPopoverInvalidPositionY} from './popover-errors';
// import {FocusKeyManager} from '../core/a11y/focus-key-manager';
import {MdPopoverPanel} from './popover-panel';
import {Subscription} from 'rxjs/Subscription';
import {transformPopover, fadeInItems} from './popover-animations';

@Component({
  //moduleId: module.id,
  selector: 'md-popover, mat-popover',
  host: {'role': 'dialog'},
  template: 
    `<ng-template>
        <div class="md-popover-panel" [class.md-popover-overlap]="overlapTrigger" [ngClass]="_classList"
            (click)="_emitCloseEvent()" [@transformPopover]="'showing'">
            <div class="direction-arrow" *ngIf="!overlapTrigger"></div>
            <div class="md-popover-content" [@fadeInItems]="'showing'" (mouseover)="onMouseOver()" (mouseleave)="onMouseLeave()">
            <ng-content></ng-content>
            </div>
        </div>
    </ng-template>`,
  styles: ["/** The mixins below are shared between md-menu and md-select */ /** * This mixin adds the correct panel transform styles based * on the direction that the menu panel opens. */ /** * Applies styles for users in high contrast mode. Note that this only applies * to Microsoft browsers. Chrome can be included by checking for the `html[hc]` * attribute, however Chrome handles high contrast differently. */ .md-popover-panel { max-height: calc(100vh + 48px); } .md-popover-panel.md-menu-after.md-menu-below { transform-origin: left top; } .md-popover-panel.md-menu-after.md-menu-above { transform-origin: left bottom; } .md-popover-panel.md-menu-before.md-menu-below { transform-origin: right top; } .md-popover-panel.md-menu-before.md-menu-above { transform-origin: right bottom; } [dir='rtl'] .md-popover-panel.md-menu-after.md-menu-below { transform-origin: right top; } [dir='rtl'] .md-popover-panel.md-menu-after.md-menu-above { transform-origin: right bottom; } [dir='rtl'] .md-popover-panel.md-menu-before.md-menu-below { transform-origin: left top; } [dir='rtl'] .md-popover-panel.md-menu-before.md-menu-above { transform-origin: left bottom; } @media screen and (-ms-high-contrast: active) { .md-popover-panel { outline: solid 1px; } } .md-popover-content { padding: 15px 0; } [md-popover-item] { cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: block; line-height: 48px; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: start; text-decoration: none; position: relative; } [md-popover-item][disabled] { cursor: default; } [md-popover-item] md-icon { margin-right: 16px; } [dir='rtl'] [md-popover-item] md-icon { margin-left: 16px; } button[md-popover-item] { width: 100%; } .md-popover-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } .md-popover-below .direction-arrow { position: absolute; top: 0px; width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-bottom: 15px solid rgba(0, 0, 0, 0.12); } .md-popover-above .direction-arrow { position: absolute; bottom: -1px; width: 0; height: 0; border-top: 15px solid rgba(0, 0, 0, 0.12); border-left: 15px solid transparent; border-right: 15px solid transparent; } .md-popover-after .direction-arrow { left: 20px; } .md-popover-before .direction-arrow { right: 20px; } .md-popover-above.md-popover-overlap .md-popover-content { padding: 30px 0 0 0; } .md-popover-below.md-popover-overlap .md-popover-content { padding: 0; } /*# sourceMappingURL=popover.css.map */ "],
  encapsulation: ViewEncapsulation.None,
  animations: [
    transformPopover,
    fadeInItems
  ],
  exportAs: 'mdPopover'
})
export class MdPopover implements AfterContentInit, MdPopoverPanel, OnDestroy {
  // private _keyManager: FocusKeyManager;

  /** Subscription to tab events on the popover panel */
  private _tabSubscription: Subscription;

  /** Config object to be passed into the popover's ngClass */
  _classList: any = {};

  /** Position of the popover in the X axis. */
  positionX: PopoverPositionX = 'after';

  /** Position of the popover in the Y axis. */
  positionY: PopoverPositionY = 'below';

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  //@ContentChildren(MdPopoverItem) items: QueryList<MdPopoverItem>;
  @Input() overlapTrigger = true;

  /** @NEW Custom Start */

  closeDisabled = false;

  /** Popover Trigger event */
  @Input() mdPopoverTrigger = 'hover';

  /** Popover placement */
  @Input() mdPopoverPlacement = 'bottom';

  /** Popover delay */
  @Input() mdPopoverDelay = 300;


  @HostListener('mouseover') onMouseOver() {
    if (this.mdPopoverTrigger == 'hover') {
      this.closeDisabled = true;
      console.log('mouseover: md-popover');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.mdPopoverTrigger == 'hover') {
      this.closeDisabled = false;
      this.close.emit();
      console.log('mouseleave: md-popover');
    }
  }

  /** @NEW Custom End */

  constructor(@Attribute('x-position') posX: PopoverPositionX,
              @Attribute('y-position') posY: PopoverPositionY) {
    if (posX) { this._setPositionX(posX); }
    if (posY) { this._setPositionY(posY); }
    this.setPositionClasses(this.positionX, this.positionY);
  }

  ngAfterContentInit() {
    //this._keyManager = new FocusKeyManager(this.items).withWrap();
    //this._tabSubscription = this._keyManager.tabOut.subscribe(() => {
      //this._emitCloseEvent();
    //});
  }

  ngOnDestroy() {
    this._tabSubscription.unsubscribe();
  }

  /**
   * This method takes classes set on the host md-popover element and applies them on the
   * popover template that displays in the overlay container.  Otherwise, it's difficult
   * to style the containing popover from outside the component.
   * @param classes list of class names
   */
  @Input('class')
  set classList(classes: string) {
    this._classList = classes.split(' ').reduce((obj: any, className: string) => {
      obj[className] = true;
      return obj;
    }, {});
    this.setPositionClasses(this.positionX, this.positionY);
  }

  /** Event emitted when the popover is closed. */
  @Output() close = new EventEmitter<void>();

  /**
   * Focus the first item in the popover. This method is used by the popover trigger
   * to focus the first item when the popover is opened by the ENTER key.
   */
  focusFirstItem() {
    //this._keyManager.setFirstItemActive();
  }

  /**
   * This emits a close event to which the trigger is subscribed. When emitted, the
   * trigger will close the popover.
   */
  _emitCloseEvent(): void {
    this.close.emit();
  }

  private _setPositionX(pos: PopoverPositionX): void {
    if ( pos !== 'before' && pos !== 'after') {
      throw new MdPopoverInvalidPositionX();
    }
    this.positionX = pos;
  }

  private _setPositionY(pos: PopoverPositionY): void {
    if ( pos !== 'above' && pos !== 'below') {
      throw new MdPopoverInvalidPositionY();
    }
    this.positionY = pos;
  }

  /**
   * It's necessary to set position-based classes to ensure the popover panel animation
   * folds out from the correct direction.
   */
  setPositionClasses(posX: PopoverPositionX, posY: PopoverPositionY): void {
    this._classList['md-popover-before'] = posX == 'before';
    this._classList['md-popover-after'] = posX == 'after';
    this._classList['md-popover-above'] = posY == 'above';
    this._classList['md-popover-below'] = posY == 'below';
  }

}
