import { Component, Inject } from '@angular/core';
import { TubularAuthService, TubularLocalStorageService, SETTINGS_PROVIDER } from '@tubular2/tubular2';
import { Router } from '@angular/router'

@Component({
    selector: 'exp',
    templateUrl: '/app/expiration.component.html'
})

export class ExpirationComponent {
    isAuth: string;
    retSavData: string;

    constructor(private tbAuthService: TubularAuthService) { }

    forceAuthTokenToExpire() {
        this.tbAuthService.setAccessTokenAsExpired();
    }

    isAuthenticated() {
        if (this.tbAuthService.isValidSession())
            this.isAuth = 'valid session';
        else
            this.isAuth = 'invalid session';
    }
}