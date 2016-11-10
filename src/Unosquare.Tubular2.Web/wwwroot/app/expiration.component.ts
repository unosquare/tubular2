import {Component, Inject} from '@angular/core';
import {TubularDataService, TubularLocalStorageService, SETTINGS_PROVIDER} from '@tubular2/tubular2';
import { Router } from '@angular/router'

@Component({
    selector: 'exp',
    templateUrl: '/app/expiration.component.html'
})

export class ExpirationComponent{
    redirected:string;
    isAuth:string;
    retSavData:string;

    constructor(private tds:TubularDataService, private rt:Router, @Inject(SETTINGS_PROVIDER) private tlss:TubularLocalStorageService){}

    changeExpirationDate(){
        this.tds.removeAuthentication();
        this.tds.setRequireAuthentication(true);
        this.rt.navigate(['/exp']);
        if(!this.tds.isAuthenticated())
            this.redirected = 'not auth';
        else
            this.redirected = 'auth';
    }

    isAuthenticated(){
        if(!this.tds.isAuthenticated())
            this.isAuth = 'auth';
        else
            this.isAuth = 'no auth';
    }

    retrireveSaveData(){
        this.retSavData = this.tlss.get('auth_data');
    }

}