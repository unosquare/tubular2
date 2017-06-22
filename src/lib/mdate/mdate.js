"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const moment = require("moment");
class MDatePipe {
    transform(value, format) {
        if (moment.isMoment(value)) {
            return format ? value.format(format) : value.format();
        }
        return value;
    }
}
MDatePipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'mdate' },] },
];
/** @nocollapse */
MDatePipe.ctorParameters = () => [];
exports.MDatePipe = MDatePipe;
//# sourceMappingURL=mdate.js.map