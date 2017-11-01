﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestOptions } from '@angular/http';

import {
    MatButtonModule,
    MatCardModule,
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

import { FlexLayoutModule } from '@angular/flex-layout';

import { TubularModule, SETTINGS_PROVIDER, TubularLocalStorageService, HttpOptions } from '@tubular2/tubular2';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainGridComponent } from './main-grid.component';
import { LoginComponent } from './login.component';
import { OrderComponent } from './order.component';

@NgModule({
    exports: [
        CdkTableModule,
        MatButtonModule,
        MatCardModule,
        MatCommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule
    ]
})
export class CustomMaterialModule { }

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
        AppComponent, MainGridComponent,
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
