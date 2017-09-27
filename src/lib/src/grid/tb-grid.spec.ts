import { ComponentFixture, TestBed, getTestBed, inject, tick, async, fakeAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';


import { By } from '@angular/platform-browser';

import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MaterialModule, MdDialog, MdTableModule, MdSelectModule, MdSelect, MdInput } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule, ResponseOptions, Response } from '@angular/http';

import { TbGridComponent } from './tb-grid.component';
import { DataService } from '../services/data.service';

import { ColumnModel, ColumnFilterMode, ColumnDataType } from './column';
import { ColumnFilterDialogComponent } from '../column-filter-dialog/column-filter-dialog';
import { PopoverModule } from '../popover/popover.module';
import { NgbPopoverWindow, NgbPopover } from '../popover/popover';
import { TbColumn } from './tb-column.component';


// import { GridExportButtonDirective } from '../grid-export/grid-export';
import { TubularDataSource } from '../grid-table/grid-table';
import { GridTable } from '../grid-table/grid-table';
import 'rxjs/add/observable/of';

import { Subject } from 'rxjs/Subject';



describe('Awesome component: TBGridComponent', () => {
    let simpleGridApp: SimpleGridApp;
    let fixture: ComponentFixture<SimpleGridApp>;
    let spy: jasmine.Spy;
    let dataService: DataService;
    let overlayContainerElement: HTMLElement;
    let dir: { value: 'ltr' | 'rtl' };
    let scrolledSubject = new Subject();

    const mockJsonDefault = {
        Counter: 0,
        Payload: [
            [1, 'Microsoft', '2016-03-19T20:00:00', 'Guadalajara, JAL, Mexico', 300.00],
            [2, 'Microsoft', '2016-04-23T11:00:00', 'Guadalajara, JAL, Mexico', 0.00],
            [3, 'Microsoft', '2016-12-22T09:00:00', 'Guadalajara, JAL, Mexico', 300.00],
            [4, 'Unosquare LLC', '2016-02-01T19:00:00', 'Los Angeles, CA, USA', 0.00],
            [5, 'Microsoft', '2016-11-10T19:00:00', 'Guadalajara, JAL, Mexico', 92.00],
            [6, 'Unosquare LLC', '2016-11-06T19:00:00', 'Los Angeles, CA, USA', 18.00],
            [7, 'Unosquare LLC', '2016-11-11T19:00:00', 'Leon, GTO, Mexico', 50.00],
            [8, 'Unosquare LLC', '2016-11-08T19:00:00', 'Portland, OR, USA', 9.00],
            [9, 'Vesta', '2016-11-07T19:00:00', 'Guadalajara, JAL, Mexico', 108.00],
            [10, 'Unosquare LLC', '2016-11-05T19:00:00', 'Portland, OR, USA', 15.00],
            [11, 'Unosquare LLC', '2016-11-11T19:00:00', 'Guadalajara, JAL, Mexico', 60.00],
            [12, 'Vesta', '2016-11-09T19:00:00', 'Leon, GTO, Mexico', 174.00],
            [13, 'Super La Playa', '2016-11-04T19:00:00', 'Portland, OR, USA', 16.00],
            [14, 'Advanced Technology Systems', '2016-11-09T19:00:00', 'Leon, GTO, Mexico', 0.00],
            [15, 'Unosquare LLC', '2016-11-08T19:00:00', 'Leon, GTO, Mexico', 78.00],
            [16, 'Super La Playa', '2016-11-08T19:00:00', 'Guadalajara, JAL, Mexico', 41.00],
            [17, 'Microsoft', '2016-11-07T19:00:00', 'Guadalajara, JAL, Mexico', 0.00],
            [18, 'Microsoft', '2016-11-03T19:00:00', 'Guadalajara, JAL, Mexico', 64.00],
            [19, 'Oxxo', '2016-11-10T19:00:00', 'Los Angeles, CA, USA', 25.00],
            [20, 'Microsoft', '2016-11-08T19:00:00', 'Guadalajara, JAL, Mexico', 3.00]
        ],
        TotalRecordCount: 500,
        FilteredRecordCount: 500,
        TotalPages: 25,
        CurrentPage: 1,
        AggregationPayload: {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleGridApp, TbGridComponent, TbColumn],
            imports: [
                MaterialModule,
                MdSelectModule,
                MdTableModule,
                CdkTableModule,
                ReactiveFormsModule,
                FormsModule,
                PopoverModule.forRoot(),
                HttpModule,
                NoopAnimationsModule
            ],
            providers: [
                DataService,
                {
                    provide: OverlayContainer, useFactory: () => {
                        overlayContainerElement = document.createElement('div') as HTMLElement;
                        overlayContainerElement.classList.add('cdk-overlay-container');

                        document.body.appendChild(overlayContainerElement);

                        // remove body padding to keep consistent cross-browser
                        document.body.style.padding = '0';
                        document.body.style.margin = '0';

                        return { getContainerElement: () => overlayContainerElement };
                    }
                }
                ,
                { provide: Directionality, useFactory: () => dir = { value: 'ltr' } },
                {
                    provide: ScrollDispatcher, useFactory: () => {
                        return {
                            scrolled: (_delay: number, callback: () => any) => {
                                return scrolledSubject.asObservable().subscribe(callback);
                            }
                        };
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleGridApp);

        dataService = fixture.debugElement.injector.get(DataService);

        spy = spyOn(dataService, 'getData')
            .and.callFake(request => {
                return Observable.of(mockJsonDefault).map(r => r);
            });
    });

    afterEach(() => {
        // document.body.removeChild(overlayContainerElement);
    });

    it('should instantiate fancy grid', async(() => {

        fixture.detectChanges();

        const myGrid = fixture.nativeElement.querySelector('.mat-table');
        expect(myGrid).toBeDefined();

    }));

});

@Component({
    template: `
    <tb-grid2 dataUrl="http://tubular.azurewebsites.net/api/orders/paged">
        <tb-column columnDef="position" header="My Position Header"></tb-column>
        <tb-column columnDef="name" header="My Name Header"></tb-column>
    </tb-grid2>
    `
})
class SimpleGridApp {

}

