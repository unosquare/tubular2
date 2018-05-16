import { HttpHeaders } from '@angular/common/http';

export class HttpOptions {
    // The is try to use Injector
    headers: Headers = new Headers({ Authorization: JSON.parse(localStorage.getItem('auth_Header'))});
}
