/**
 * Exception thrown when popover trigger doesn't have a valid md-popover instance
 * @docs-private
 */
export class MdPopoverMissingError extends Error  {
  constructor() {
    super();
    
    this.message = `md-popover-trigger: must pass in an md-popover instance.

    Example:
      <md-popover #popover="mdPopover"></md-popover>
      <button [mdPopoverTriggerFor]="popover"></button>
    `;
  }
}

/**
 * Exception thrown when popover's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
export class MdPopoverInvalidPositionX extends Error  {
  constructor() {
    super();
    
    this.message = `x-position value must be either 'before' or after'.
      Example: <md-popover x-position="before" #popover="mdPopover"></md-popover>
    `;
  }
}

/**
 * Exception thrown when popover's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
export class MdPopoverInvalidPositionY extends Error {
  constructor() {
    super();
    
    this.message = `y-position value must be either 'above' or below'.
      Example: <md-popover y-position="above" #popover="mdPopover"></md-popover>
    `;
  }
}
