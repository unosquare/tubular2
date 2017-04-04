import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TubularModule } from './tubular.module';

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