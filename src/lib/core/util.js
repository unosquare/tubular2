"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toInteger(value) {
    return parseInt(`${value}`, 10);
}
exports.toInteger = toInteger;
function toString(value) {
    return (value !== undefined && value !== null) ? `${value}` : '';
}
exports.toString = toString;
function getValueInRange(value, max, min = 0) {
    return Math.max(Math.min(value, max), min);
}
exports.getValueInRange = getValueInRange;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isNumber(value) {
    return !isNaN(toInteger(value));
}
exports.isNumber = isNumber;
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
exports.isInteger = isInteger;
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function padNumber(value) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    }
    else {
        return '';
    }
}
exports.padNumber = padNumber;
function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
exports.regExpEscape = regExpEscape;
//# sourceMappingURL=util.js.map