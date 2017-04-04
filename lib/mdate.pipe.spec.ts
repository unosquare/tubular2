import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDatePipe } from './mdate.pipe';

describe('Mdate pipe Component: MDataType ',function(){
    let mDate: MDatePipe;
    let fixture: ComponentFixture<MDatePipe>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MDatePipe]
        });
        fixture = TestBed.createComponent(MDatePipe);
        mDate = fixture.componentInstance;
    });  

    it('should have a defined component', () => {
        expect(mDate).toBeDefined();
    });
});