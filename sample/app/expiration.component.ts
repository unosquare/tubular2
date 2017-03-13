import { Component, Inject } from '@angular/core';
import { TubularAuthService, TubularLocalStorageService, TubularHttpService, SETTINGS_PROVIDER } from '@tubular2/tubular2';
import { Router } from '@angular/router'

@Component({
    selector: 'exp',
    templateUrl: '/app/expiration.component.html'
})

export class ExpirationComponent {
    isAuth: string;
    retSavData: string;

    constructor(private tbAuthService: TubularAuthService, private tbHttpService: TubularHttpService) { }

    forceAuthTokenToExpire() {
        this.tbAuthService.setAccessTokenAsExpired();
    }

    doSimpleGet() {
        this.tbHttpService.get("http://tubular.azurewebsites.net/api/orders/30", true)
            .subscribe((data) => this.isAuthenticated());
    }

    isAuthenticated() {
        if (this.tbAuthService.isValidSession())
            this.isAuth = 'valid session';
        else
            this.isAuth = 'invalid session';
    }
}