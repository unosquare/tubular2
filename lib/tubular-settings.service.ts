import { OpaqueToken } from '@angular/core';

export let SETTINGS_PROVIDER = new OpaqueToken('tubular-settings.service');

export interface ITubularSettingsProvider {
    put(id: string, value: string): void;
    get(key: string): any;
    delete(key: string): void;
}

export class TubularLocalStorageService implements ITubularSettingsProvider {

    existLocalStorage: boolean = true;
    _data: {};

    constructor() {
        if (!window.localStorage) {
            this.existLocalStorage = false;
            console.log("Browser does not support localStorage");
        }
    }
    
    public put(id: string, value: string) {
        if (this.existLocalStorage) localStorage.setItem(id, JSON.stringify(value));
        else this._data[id] = String(value);
    }

    public get(key: string): any {
        if (this.existLocalStorage) return JSON.parse(localStorage.getItem(key)) || false;
        else return this._data.hasOwnProperty(key) ? this._data[key] : false;
    }
    
    public delete(key: string) {
        if (this.existLocalStorage) localStorage.removeItem(key);
        else return delete this._data[key];
    }
}