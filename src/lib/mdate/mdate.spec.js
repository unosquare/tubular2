"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mdate_1 = require("./mdate");
describe('Pipe: MDatePipe', () => {
    let pipe;
    beforeEach(() => {
        pipe = new mdate_1.MDatePipe();
    });
    it('should return the same value if not date', () => {
        expect(pipe.transform('abc')).toBe('abc');
    });
});
//# sourceMappingURL=mdate.spec.js.map