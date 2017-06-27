import { ComponentFixture, TestBed, getTestBed, inject, tick } from '@angular/core/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule, ResponseOptions, Response } from '@angular/http';

import { GridComponent } from './grid';

describe('Component: GridComponent', () => {
    let gridComponent: GridComponent;
    let fixture: ComponentFixture<GridComponent>;
    let mockBackend: MockBackend;
    const mockUrl = '/mock/api';
    const mockJson = {
        Counter: 0,
        Payload: [
            [500, 'Vesta', '2016-11-03T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
            [499, 'Oxxo', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Portland, OR, USA'],
            [498, 'Unosquare LLC', '2016-11-09T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
            [497, 'Microsoft', '2016-11-04T00:00:00', '2016-01-01T00:00:00', 'Los Angeles, CA, USA'],
            [496, 'Vesta', '2016-11-06T00:00:00', '2016-01-01T00:00:00', 'Guadalajara, JAL, Mexico'],
            [495, 'Oxxo', '2016-11-11T00:00:00', '2015-12-30T00:00:00', 'Guadalajara, JAL, Mexico'],
            [494, 'Vesta', '2016-11-04T00:00:00', '2015-12-30T00:00:00', 'Portland, OR, USA'],
            [493, 'Vesta', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Leon, GTO, Mexico'],
            [492, 'Oxxo', '2016-11-10T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
            [491, 'Unosquare LLC', '2016-11-03T00:00:00', '2016-01-01T00:00:00', 'Los Angeles, CA, USA'],
            [490, 'Vesta', '2016-11-06T00:00:00', '2015-12-30T00:00:00', 'Guadalajara, JAL, Mexico'],
            [489, 'Unosquare LLC', '2016-11-11T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
            [488, 'Microsoft', '2016-11-03T00:00:00', '2016-01-01T00:00:00', 'Guadalajara, JAL, Mexico'],
            [487, 'Unosquare LLC', '2016-11-06T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
            [486, 'Oxxo', '2016-11-11T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
            [485, 'Advanced Technology Systems', '2016-11-05T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
            [484, 'Advanced Technology Systems', '2016-11-04T00:00:00', '2016-01-01T00:00:00', 'Leon, GTO, Mexico'],
            [483, 'Vesta', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
            [482, 'Super La Playa', '2016-11-07T00:00:00', '2016-01-01T00:00:00', 'Leon, GTO, Mexico'],
            [481, 'Oxxo', '2015-02-24T12:00:00', '2015-12-30T00:00:00', 'Guadalajara, JAL, Mexico']
            ],
        TotalRecordCount: 500,
        FilteredRecordCount: 500,
        TotalPages: 25,
        CurrentPage: 1,
        AggregationPayload: {}
    };
    const mockJsonTest = {
        Counter: 1,
        Payload: [[
            1, 'Microsoft', '2017-02-01T23:00:00', '2015-12-30T00:00:00', 'Guadalajara, JAL, Mexico'],
            [3, 'Unosquare LLC', '2016-12-18T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
            [11, 'Vesta', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
            [7, 'Microsoft', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Leon, GTO, Mexico'],
            [21, 'Unosquare LLC', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Leon, GTO, Mexico'],
            [31, 'Super La Playa', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Leon, GTO, Mexico'],
            [36, 'Super La Playa', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Leon, GTO, Mexico'],
            [45, 'Unosquare LLC', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
            [48, 'Unosquare LLC', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Leon, GTO, Mexico'],
            [51, 'Vesta', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Portland, OR, USA'],
            [59, 'Microsoft', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Los Angeles, CA, USA'],
            [63, 'Vesta', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
            [72, 'Microsoft', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Guadalajara, JAL, Mexico'],
            [95, 'Vesta', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
            [127, 'Microsoft', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
            [130, 'Super La Playa', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Los Angeles, CA, USA'],
            [137, 'Unosquare LLC', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Guadalajara, JAL, Mexico'],
            [141, 'Vesta', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Los Angeles, CA, USA'],
            [144, 'Oxxo', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Leon, GTO, Mexico'],
            [145, 'Super La Playa', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Guadalajara, JAL, Mexico']
        ],
        TotalRecordCount: 500,
        FilteredRecordCount: 500,
        TotalPages: 25,
        CurrentPage: 3,
        AggregationPayload: {}
    };
    let response: ResponseOptions;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [GridComponent],
            providers:
            [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory: (backend: MockBackend, options: BaseRequestOptions) => { new Http(backend, options); }
                }
            ],
            imports: [HttpModule]
        });
    });

    it('should be defined', () => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(GridComponent);
            gridComponent = fixture.componentInstance;
            expect(gridComponent).toBeDefined();
        });
    });

    describe('MockBackend', () => {

        beforeEach(() => {
            gridComponent.dataUrl = '/mock/api'; // http://0.0.0.0:9876/
            // MockedBackend
            mockBackend = getTestBed().get(MockBackend);
            getTestBed().compileComponents().then(() => {
                mockBackend.connections.subscribe((c: MockConnection) => {
                    if (c.request.url === '/mock/api') {
                        response = new ResponseOptions({ body: JSON.stringify(mockJson) });
                        c.mockRespond(new Response(response));
                    }
                });
            });
        });

        xit('should get data', (done) => {
            expect(gridComponent.dataUrl).toBeDefined();
            // gridComponent((response) => {
            //     expect(response).toBeDefined();
            //     done();
            // });
        });
    });
});
