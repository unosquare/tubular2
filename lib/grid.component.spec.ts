import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement, Component }    from '@angular/core';

import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { GridComponent } from './grid.component';
import { TubularLocalStorageService } from './tubular-settings.service';

describe('Component: GridComponent', () => {
    let gridComponent:      GridComponent;
    let fixture:            ComponentFixture<GridComponent>;

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
        TestBed.compileComponents();

        fixture = TestBed.createComponent(GridComponent);
        gridComponent = fixture.componentInstance;
    });  

    it('should goToPage', () => {
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
