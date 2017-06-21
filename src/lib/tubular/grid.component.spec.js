"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/http/testing");
const http_1 = require("@angular/http");
const grid_component_1 = require("./grid.component");
describe('Component: GridComponent', () => {
    let gridComponent;
    let fixture;
    let mockBackend;
    let mockUrl = "/mock/api";
    let mockJson = { "Counter": 0, "Payload": [[500, "Vesta", "2016-11-03T00:00:00", "2015-12-30T00:00:00", "Los Angeles, CA, USA"], [499, "Oxxo", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Portland, OR, USA"], [498, "Unosquare LLC", "2016-11-09T00:00:00", "2016-01-01T00:00:00", "Portland, OR, USA"], [497, "Microsoft", "2016-11-04T00:00:00", "2016-01-01T00:00:00", "Los Angeles, CA, USA"], [496, "Vesta", "2016-11-06T00:00:00", "2016-01-01T00:00:00", "Guadalajara, JAL, Mexico"], [495, "Oxxo", "2016-11-11T00:00:00", "2015-12-30T00:00:00", "Guadalajara, JAL, Mexico"], [494, "Vesta", "2016-11-04T00:00:00", "2015-12-30T00:00:00", "Portland, OR, USA"], [493, "Vesta", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Leon, GTO, Mexico"], [492, "Oxxo", "2016-11-10T00:00:00", "2015-12-30T00:00:00", "Los Angeles, CA, USA"], [491, "Unosquare LLC", "2016-11-03T00:00:00", "2016-01-01T00:00:00", "Los Angeles, CA, USA"], [490, "Vesta", "2016-11-06T00:00:00", "2015-12-30T00:00:00", "Guadalajara, JAL, Mexico"], [489, "Unosquare LLC", "2016-11-11T00:00:00", "2016-01-01T00:00:00", "Portland, OR, USA"], [488, "Microsoft", "2016-11-03T00:00:00", "2016-01-01T00:00:00", "Guadalajara, JAL, Mexico"], [487, "Unosquare LLC", "2016-11-06T00:00:00", "2016-01-01T00:00:00", "Portland, OR, USA"], [486, "Oxxo", "2016-11-11T00:00:00", "2015-12-30T00:00:00", "Los Angeles, CA, USA"], [485, "Advanced Technology Systems", "2016-11-05T00:00:00", "2016-01-01T00:00:00", "Portland, OR, USA"], [484, "Advanced Technology Systems", "2016-11-04T00:00:00", "2016-01-01T00:00:00", "Leon, GTO, Mexico"], [483, "Vesta", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Los Angeles, CA, USA"], [482, "Super La Playa", "2016-11-07T00:00:00", "2016-01-01T00:00:00", "Leon, GTO, Mexico"], [481, "Oxxo", "2015-02-24T12:00:00", "2015-12-30T00:00:00", "Guadalajara, JAL, Mexico"]], "TotalRecordCount": 500, "FilteredRecordCount": 500, "TotalPages": 25, "CurrentPage": 1, "AggregationPayload": {} };
    let mockJsonTest = { "Counter": 1, "Payload": [[1, "Microsoft", "2017-02-01T23:00:00", "2015-12-30T00:00:00", "Guadalajara, JAL, Mexico"], [3, "Unosquare LLC", "2016-12-18T00:00:00", "2016-01-01T00:00:00", "Portland, OR, USA"], [11, "Vesta", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Los Angeles, CA, USA"], [7, "Microsoft", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Leon, GTO, Mexico"], [21, "Unosquare LLC", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Leon, GTO, Mexico"], [31, "Super La Playa", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Leon, GTO, Mexico"], [36, "Super La Playa", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Leon, GTO, Mexico"], [45, "Unosquare LLC", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Los Angeles, CA, USA"], [48, "Unosquare LLC", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Leon, GTO, Mexico"], [51, "Vesta", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Portland, OR, USA"], [59, "Microsoft", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Los Angeles, CA, USA"], [63, "Vesta", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Los Angeles, CA, USA"], [72, "Microsoft", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Guadalajara, JAL, Mexico"], [95, "Vesta", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Los Angeles, CA, USA"], [127, "Microsoft", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Portland, OR, USA"], [130, "Super La Playa", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Los Angeles, CA, USA"], [137, "Unosquare LLC", "2016-11-12T00:00:00", "2015-12-30T00:00:00", "Guadalajara, JAL, Mexico"], [141, "Vesta", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Los Angeles, CA, USA"], [144, "Oxxo", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Leon, GTO, Mexico"], [145, "Super La Playa", "2016-11-12T00:00:00", "2016-01-01T00:00:00", "Guadalajara, JAL, Mexico"]], "TotalRecordCount": 500, "FilteredRecordCount": 500, "TotalPages": 25, "CurrentPage": 3, "AggregationPayload": {} };
    let response;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [grid_component_1.GridComponent],
            providers: [
                testing_2.MockBackend,
                http_1.BaseRequestOptions,
                {
                    provide: http_1.Http,
                    deps: [testing_2.MockBackend, http_1.BaseRequestOptions],
                    useFactory: (backend, options) => { new http_1.Http(backend, options); }
                }
            ],
            imports: [http_1.HttpModule]
        });
        fixture = testing_1.TestBed.createComponent(grid_component_1.GridComponent);
        gridComponent = fixture.componentInstance;
    });
    it('should be defined', () => {
        expect(gridComponent).toBeDefined();
    });
    describe('MockBackend', () => {
        beforeEach(() => {
            gridComponent.dataUrl = '/mock/api'; // http://0.0.0.0:9876/    
            //MockedBackend
            mockBackend = testing_1.getTestBed().get(testing_2.MockBackend);
            testing_1.getTestBed().compileComponents().then(() => {
                mockBackend.connections.subscribe((c) => {
                    if (c.request.url === '/mock/api') {
                        response = new http_1.ResponseOptions({ body: JSON.stringify(mockJson) });
                        c.mockRespond(new http_1.Response(response));
                    }
                });
            });
        });
        it('should get data', done => {
            expect(gridComponent.dataUrl).toBeDefined();
            gridComponent.testRemove((response) => {
                expect(response).toBeDefined();
                done();
            });
        });
    }); //Describe MockBackend
});
