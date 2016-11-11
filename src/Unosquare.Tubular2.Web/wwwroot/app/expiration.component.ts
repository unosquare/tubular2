import {Component, Inject} from '@angular/core';
import {TubularDataService, TubularLocalStorageService, SETTINGS_PROVIDER} from '@tubular2/tubular2';
import { Router } from '@angular/router'

@Component({
    selector: 'exp',
    templateUrl: '/app/expiration.component.html'
})

export class ExpirationComponent{
    isAuth:string;
    retSavData:string;

    constructor(private tds:TubularDataService, private rt:Router, @Inject(SETTINGS_PROVIDER) private tlss:TubularLocalStorageService){}

    changeExpirationDate(){
        this.tds.removeAuthentication();
    }

    isAuthenticated(){
        if(this.tds.isAuthenticated())
            this.isAuth = 'auth';
        else
            this.isAuth = 'no auth';
    }
    
    retrieveData(){
        this.retSavData = this.tlss.get('auth_data') ? JSON.parse(this.tlss.get('auth_data')).username : 'no data!';
    }

}