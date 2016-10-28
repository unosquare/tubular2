///<reference path="../node_modules/@types/jasmine/index.d.ts"/>
"use strict";
var built_1 = require('../node_modules/protractor/built');
describe('QuickStart E2E Tests', function () {
    var expectedMsg = 'Tubular2';
    beforeEach(function () {
        built_1.browser.get('');
    });
    it('should display: ' + expectedMsg, function () {
        expect(built_1.element(built_1.by.css('h1')).getText()).toEqual(expectedMsg);
    });
});
//# sourceMappingURL=app.e2e-spec.js.map