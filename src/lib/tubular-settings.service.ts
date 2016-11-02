import { OpaqueToken } from '@angular/core';

export let SETTINGS_PROVIDER = new OpaqueToken('tubular-settings.service');

export interface ITubularSettingsProvider {
    put(id: string, value: string): void;
    get(key: string): any;
    delete(key: string): void;
}

export class TubularLocalStorageService implements ITubularSettingsProvider {
    // TODO: Add Check if localStorage exists at constructor
    
    public put(id: string, value: string) {
        localStorage.setItem(id, JSON.stringify(value));
    }

    public get(key: string): any {
        return JSON.parse(localStorage.getItem(key)) || false;
    }
    
    public delete(key: string) {
        localStorage.removeItem(key);
    }
}