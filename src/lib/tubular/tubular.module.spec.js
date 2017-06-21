"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tubular_module_1 = require("./tubular.module");
describe('module: tubular', () => {
    let tubularModule;
    beforeEach(() => {
        tubularModule = new tubular_module_1.TubularModule();
    });
    it('should be defined', () => {
        expect(tubularModule).toBeDefined();
    });
});
