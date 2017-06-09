export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

export function toString(value: any): string {
    return (value !== undefined && value !== null) ? `${value}` : '';
}

export function getValueInRange(value: number, max: number, min = 0): number {
    return Math.max(Math.min(value, max), min);
}

export function isString(value: any): boolean {
    return typeof value === 'string';
}

export function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

export function isInteger(value: any): boolean {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

export function isDefined(value: any): boolean {
    return value !== undefined && value !== null;
}

export function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

export function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}