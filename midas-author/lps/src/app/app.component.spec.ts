import { TestBed, waitForAsync  } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'oarlps';
import { FrameModule } from 'oarng';
import { GoogleAnalyticsService } from "oarlps";
import { ConfigModule } from 'oarlps';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferState, StateKey } from '@angular/platform-browser';
import { AppConfig } from 'oarlps';
import { AngularEnvironmentConfigService } from 'oarlps';
import { CartService } from 'oarlps';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { IEnvironment } from '../environments/ienvironment';
import * as environment from '../environments/environment';

describe('AppComponent', () => {
    let cfg: AppConfig;
    let plid: Object = "browser";
    let ts: TransferState = new TransferState();
    let ienv : IEnvironment;

    beforeEach(waitForAsync(() => {
        cfg = (new AngularEnvironmentConfigService(environment,plid, ts)).getConfig() as AppConfig;

        TestBed.configureTestingModule({

            declarations: [
                AppComponent,
            ], providers: [GoogleAnalyticsService, CartService, { provide: AppConfig, useValue: cfg }]
            , imports: [RouterTestingModule, FrameModule, ConfigModule, BrowserTransferStateModule, BrowserModule, HttpClientTestingModule, ToastrModule.forRoot()],
        }).compileComponents();
    }));

    it('should create the app', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        fixture.whenStable().then(() => {
            expect(app).toBeTruthy();
        })
    }));

    it(`should have as title 'PDR Resource Landing Page'`, waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        fixture.whenStable().then(() => {
            expect(app.title).toEqual('PDR Resource Landing Page');
        })
    }));

    it(`should contain 'DATA REPOSITORY' in the first span`, waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const compiled = fixture.debugElement.nativeElement;
            console.log("span", compiled.querySelector('span').textContent);
            expect(compiled.querySelector('span').textContent).toContain('DATA REPOSITORY');
        })
    }));
});
