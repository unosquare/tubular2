"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mdate_pipe_1 = require("./mdate.pipe");
describe('Pipe: MDatePipe', () => {
    let pipe;
    beforeEach(() => {
        pipe = new mdate_pipe_1.MDatePipe();
    });
    it('should return the same value if not date', () => {
        expect(pipe.transform('abc')).toBe('abc');
    });
});
