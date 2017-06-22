import { OpaqueToken } from '@angular/core';
export declare let SETTINGS_PROVIDER: OpaqueToken;
export interface ITubularSettingsProvider {
    put(id: string, value: string): void;
    get(key: string): any;
    delete(key: string): void;
}
export declare class TubularLocalStorageService implements ITubularSettingsProvider {
    private existLocalStorage;
    private _data;
    constructor();
    put(id: string, value: string): void;
    get(key: string): any;
    delete(key: string): void;
}
