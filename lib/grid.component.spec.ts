import { ComponentFixture, TestBed, getTestBed, async, inject } from '@angular/core/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http , ResponseOptions, Response } from '@angular/http';

import { GridComponent } from './grid.component';

describe('Component: GridComponent', () => {
    let gridComponent:      GridComponent;
    let fixture:            ComponentFixture<GridComponent>;
    let mockBackend:        MockBackend;
    let mockUrl = "/mock/api";  
    let mockJson: any[] = [{"Counter":0,"Payload":[[500,"Vesta","2016-11-03T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[499,"Oxxo","2016-11-12T00:00:00","2015-12-30T00:00:00","Portland, OR, USA"],[498,"Unosquare LLC","2016-11-09T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[497,"Microsoft","2016-11-04T00:00:00","2016-01-01T00:00:00","Los Angeles, CA, USA"],[496,"Vesta","2016-11-06T00:00:00","2016-01-01T00:00:00","Guadalajara, JAL, Mexico"],[495,"Oxxo","2016-11-11T00:00:00","2015-12-30T00:00:00","Guadalajara, JAL, Mexico"],[494,"Vesta","2016-11-04T00:00:00","2015-12-30T00:00:00","Portland, OR, USA"],[493,"Vesta","2016-11-12T00:00:00","2016-01-01T00:00:00","Leon, GTO, Mexico"],[492,"Oxxo","2016-11-10T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[491,"Unosquare LLC","2016-11-03T00:00:00","2016-01-01T00:00:00","Los Angeles, CA, USA"],[490,"Vesta","2016-11-06T00:00:00","2015-12-30T00:00:00","Guadalajara, JAL, Mexico"],[489,"Unosquare LLC","2016-11-11T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[488,"Microsoft","2016-11-03T00:00:00","2016-01-01T00:00:00","Guadalajara, JAL, Mexico"],[487,"Unosquare LLC","2016-11-06T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[486,"Oxxo","2016-11-11T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[485,"Advanced Technology Systems","2016-11-05T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[484,"Advanced Technology Systems","2016-11-04T00:00:00","2016-01-01T00:00:00","Leon, GTO, Mexico"],[483,"Vesta","2016-11-12T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[482,"Super La Playa","2016-11-07T00:00:00","2016-01-01T00:00:00","Leon, GTO, Mexico"],[481,"Oxxo","2015-02-24T12:00:00","2015-12-30T00:00:00","Guadalajara, JAL, Mexico"]],"TotalRecordCount":500,"FilteredRecordCount":500,"TotalPages":25,"CurrentPage":1,"AggregationPayload":{}}];
    let mockJsonTest = {"Counter":1,"Payload":[[1,"Microsoft","2017-02-01T23:00:00","2015-12-30T00:00:00","Guadalajara, JAL, Mexico"],[3,"Unosquare LLC","2016-12-18T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[11,"Vesta","2016-11-12T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[7,"Microsoft","2016-11-12T00:00:00","2016-01-01T00:00:00","Leon, GTO, Mexico"],[21,"Unosquare LLC","2016-11-12T00:00:00","2016-01-01T00:00:00","Leon, GTO, Mexico"],[31,"Super La Playa","2016-11-12T00:00:00","2015-12-30T00:00:00","Leon, GTO, Mexico"],[36,"Super La Playa","2016-11-12T00:00:00","2015-12-30T00:00:00","Leon, GTO, Mexico"],[45,"Unosquare LLC","2016-11-12T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[48,"Unosquare LLC","2016-11-12T00:00:00","2015-12-30T00:00:00","Leon, GTO, Mexico"],[51,"Vesta","2016-11-12T00:00:00","2015-12-30T00:00:00","Portland, OR, USA"],[59,"Microsoft","2016-11-12T00:00:00","2016-01-01T00:00:00","Los Angeles, CA, USA"],[63,"Vesta","2016-11-12T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[72,"Microsoft","2016-11-12T00:00:00","2016-01-01T00:00:00","Guadalajara, JAL, Mexico"],[95,"Vesta","2016-11-12T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[127,"Microsoft","2016-11-12T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[130,"Super La Playa","2016-11-12T00:00:00","2016-01-01T00:00:00","Los Angeles, CA, USA"],[137,"Unosquare LLC","2016-11-12T00:00:00","2015-12-30T00:00:00","Guadalajara, JAL, Mexico"],[141,"Vesta","2016-11-12T00:00:00","2016-01-01T00:00:00","Los Angeles, CA, USA"],[144,"Oxxo","2016-11-12T00:00:00","2016-01-01T00:00:00","Leon, GTO, Mexico"],[145,"Super La Playa","2016-11-12T00:00:00","2016-01-01T00:00:00","Guadalajara, JAL, Mexico"]],"TotalRecordCount":500,"FilteredRecordCount":500,"TotalPages":25,"CurrentPage":3,"AggregationPayload":{}};
    let response: ResponseOptions;

    const mockHttpProvider = 
    { 
       provide: Http,
       deps: [MockBackend, BaseRequestOptions],
       useFactory: ( backend: MockBackend, options: BaseRequestOptions ) =>  
       { new Http( backend, options ) }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GridComponent],
            providers:   
             [ 
                BaseRequestOptions,
                MockBackend, 
                mockHttpProvider
            ]
        });

        fixture = TestBed.createComponent(GridComponent);
        gridComponent = fixture.componentInstance;
        
        gridComponent.dataUrl = mockUrl;

        //MockedBackend
        mockBackend = getTestBed().get(MockBackend);

        getTestBed().compileComponents().then( () => {
            mockBackend.connections.subscribe((c: MockConnection) =>  {         
                response = new ResponseOptions( { body: JSON.stringify( mockJson ) });
                c.mockRespond(new Response(response));   
            });
        })
        fixture.autoDetectChanges();
    });  

    afterEach(() => {
        mockBackend.verifyNoPendingRequests();
    });


    fit('should have some data', done =>{
        gridComponent.dataStream.subscribe( data => {        
            expect(data.length).toBe(1);
            console.info(data);
            done();
        });
    });
            
    it('should goToPage', () => {
        expect(gridComponent.page.getValue()).toBe(0);
        gridComponent.goToPage(2);
        expect(gridComponent.page.getValue()).toBe(2);
    });
    
    it('should refresh', () => {
        expect(gridComponent.refresh()).toBeDefined();
    });

    it('should getCurrentPage', () => {
        
    });

    it('should get the full data source', () => {
        expect(gridComponent.getFullDataSource()).not.toBe(null);
    });

    it('should change page data', () => {
        expect(gridComponent.changePagesData()).toBeUndefined();
    });

    it('should change page size data', () => {
        expect(gridComponent.changePageSizeData()).toBeUndefined();
    });

    it('should get page setting value', () => {
        expect(gridComponent.getPageSettingValue()).not.toBe(null);
    });

    it('should get page size setting value', () => {
        expect(gridComponent.getPageSizeSettingValue()).not.toBe(null);
    });
});
