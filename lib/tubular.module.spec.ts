import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TubularModule } from './tubular.module';
import { MDatePipe } from './mdate.pipe';

describe('module: tubular', () => {
    let tubularModule: TubularModule;
    let fixture: ComponentFixture<TubularModule>;

    beforeEach(() => {
        //tubularModule = new TubularModule();
        TestBed.configureTestingModule({
            declarations: [TubularModule],
        });
        
        fixture = TestBed.createComponent(TubularModule);
        tubularModule = fixture.componentInstance;
    });     
     
    it('should success', () => {
        expect(true).toBe(true);
    });
    it('should be defined', () => {
        expect(tubularModule).toBeDefined();
    });
});

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