//import {ReflectiveInjector} from '@angular/core'
import { HttpModule, Headers, BaseRequestOptions} from '@angular/http';
//import {TubularDataService} from './tubular-data.service';
//import { SETTINGS_PROVIDER } from './tubular-settings.service';

export class HttpOptions extends BaseRequestOptions {
    // constructor() {
    //     super();

    //     let injector = ReflectiveInjector.resolveAndCreate([TubularDataService, HttpModule]);
    //     let dataService = injector.get(TubularDataService);
    //     this.headers = new Headers({ 'Authorization': dataService.getToken() })
    // }

    //The is try to use Injector
    headers: Headers = new Headers({ Authorization: JSON.parse(localStorage.getItem('auth_Header'))});
}
