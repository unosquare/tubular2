import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, ResponseOptions } from '@angular/http';

import { GridComponent } from './grid.component';

describe('Component: GridComponent', () => {
    let gridComponent:      GridComponent;
    let fixture:            ComponentFixture<GridComponent>;
    let mockBackend:        MockBackend;
 

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GridComponent],
            providers:   
             [ 
                BaseRequestOptions,
                MockBackend, 
                { provide: Http, deps: [MockBackend, BaseRequestOptions], useFactory: (backend,options) => { return new Http(backend, options)} } 
            ]
        });

        fixture = TestBed.createComponent(GridComponent);
        gridComponent = fixture.componentInstance;

        //MockedBackend
        mockBackend = getTestBed().get(MockBackend);

        getTestBed().compileComponents().then(() => {
            mockBackend.connections.suscribe(
                (connection: MockConnection) => {
                    const url = "/mockgrid"
                    new ResponseOptions ({                     
                        body : {"Counter":0,"Payload":[[500,"Vesta","2016-11-03T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[499,"Oxxo","2016-11-12T00:00:00","2015-12-30T00:00:00","Portland, OR, USA"],[498,"Unosquare LLC","2016-11-09T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[497,"Microsoft","2016-11-04T00:00:00","2016-01-01T00:00:00","Los Angeles, CA, USA"],[496,"Vesta","2016-11-06T00:00:00","2016-01-01T00:00:00","Guadalajara, JAL, Mexico"],[495,"Oxxo","2016-11-11T00:00:00","2015-12-30T00:00:00","Guadalajara, JAL, Mexico"],[494,"Vesta","2016-11-04T00:00:00","2015-12-30T00:00:00","Portland, OR, USA"],[493,"Vesta","2016-11-12T00:00:00","2016-01-01T00:00:00","Leon, GTO, Mexico"],[492,"Oxxo","2016-11-10T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[491,"Unosquare LLC","2016-11-03T00:00:00","2016-01-01T00:00:00","Los Angeles, CA, USA"],[490,"Vesta","2016-11-06T00:00:00","2015-12-30T00:00:00","Guadalajara, JAL, Mexico"],[489,"Unosquare LLC","2016-11-11T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[488,"Microsoft","2016-11-03T00:00:00","2016-01-01T00:00:00","Guadalajara, JAL, Mexico"],[487,"Unosquare LLC","2016-11-06T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[486,"Oxxo","2016-11-11T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[485,"Advanced Technology Systems","2016-11-05T00:00:00","2016-01-01T00:00:00","Portland, OR, USA"],[484,"Advanced Technology Systems","2016-11-04T00:00:00","2016-01-01T00:00:00","Leon, GTO, Mexico"],[483,"Vesta","2016-11-12T00:00:00","2015-12-30T00:00:00","Los Angeles, CA, USA"],[482,"Super La Playa","2016-11-07T00:00:00","2016-01-01T00:00:00","Leon, GTO, Mexico"],[481,"Oxxo","2015-02-24T12:00:00","2015-12-30T00:00:00","Guadalajara, JAL, Mexico"]],"TotalRecordCount":500,"FilteredRecordCount":500,"TotalPages":25,"CurrentPage":1,"AggregationPayload":{}}
                    });
                }
            );
        });
    });  

    fit('should goToPage', () => {
        gridComponent.dataUrl = '/mockgrid';
        gridComponent.goToPage(3);
        expect(gridComponent.pageSet).toBe(true);
    });

    it('should refresh', () => {
        expect(gridComponent.refresh()).not.toBe(null);
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
