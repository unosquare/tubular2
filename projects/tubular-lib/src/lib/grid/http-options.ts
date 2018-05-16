import { Headers, BaseRequestOptions} from '@angular/http';

export class HttpOptions extends BaseRequestOptions {
    // The is try to use Injector
    headers: Headers = new Headers({ Authorization: JSON.parse(localStorage.getItem('auth_Header'))});
}
