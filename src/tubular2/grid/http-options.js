"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/http");
class HttpOptions extends http_1.BaseRequestOptions {
    constructor() {
        super(...arguments);
        //The is try to use Injector
        this.headers = new http_1.Headers({ Authorization: JSON.parse(localStorage.getItem('auth_Header')) });
    }
}
exports.HttpOptions = HttpOptions;
//# sourceMappingURL=http-options.js.map