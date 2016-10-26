///<reference path="../node_modules/@types/jasmine/index.d.ts"/>

import { browser, element, by } from '../node_modules/protractor/built';

describe('QuickStart E2E Tests', function () {

    let expectedMsg = 'Tubular2';


    beforeEach(function () {
        browser.get('');
    });

    it('should display: ' + expectedMsg, function () {
        expect(element(by.css('h1')).getText()).toEqual(expectedMsg);
    });

});