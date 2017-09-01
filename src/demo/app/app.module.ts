import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import {
  FullscreenOverlayContainer,
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  OverlayContainer
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk';

import { FlexLayoutModule } from '@angular/flex-layout';

import { TubularModule, SETTINGS_PROVIDER, TubularLocalStorageService, HttpOptions } from '@tubular2/tubular2';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SampleGrid } from './sampleGrid.component';
import { MainGridComponent } from './main-grid.component';
import { LoginComponent } from './login.component';
import { OrderComponent } from './order.component';

@NgModule({
  exports: [
    CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdCoreModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdNativeDateModule
  ]
})
export class CustomMaterialModule {}

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
        TubularModule,
        FlexLayoutModule
    ],
    declarations: [
        AppComponent, SampleGrid, MainGridComponent,
        LoginComponent, OrderComponent
    ],
    entryComponents: [OrderComponent],
    providers: [
        { provide: SETTINGS_PROVIDER, useClass: TubularLocalStorageService },
        { provide: RequestOptions, useClass: HttpOptions }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
