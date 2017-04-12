import { TubularModule } from './tubular.module';

describe('module: tubular', () => {
    let tubularModule: TubularModule;
    
    beforeEach(() => {
        tubularModule = new TubularModule();
    });     

    it('should be defined', () => {
        expect(tubularModule).toBeDefined();
    });
});