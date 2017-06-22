import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDatePipe } from './mdate';

describe('Pipe: MDatePipe', () => {
    let pipe: MDatePipe;

    beforeEach(()  => {
        pipe = new MDatePipe();
    });

    it('should return the same value if not date', () => {
        expect(pipe.transform('abc')).toBe('abc');
    });

});
