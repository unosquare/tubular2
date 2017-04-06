import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDatePipe } from './mdate.pipe';

describe('Component: MDatePipe', () => {
    let mDate: MDatePipe;
    let fixture: ComponentFixture<MDatePipe>;

    beforeEach(() => {

    });

    it('should have a defined component', async () => {
        TestBed.configureTestingModule({
            declarations: [MDatePipe]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(MDatePipe);
            mDate = fixture.componentInstance;
            expect(mDate).toBeDefined();
        })


    });
});
