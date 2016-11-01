import { OpaqueToken } from '@angular/core';

export let SETTINGS_PROVIDER = new OpaqueToken('tubular-settings.service');

export interface ITubularSettingsProvider {
    put(id: string, value: string): void;
    get(key: string): any;
    delete(key: string): void;
}

export const TUBULAR_LOCAL_STORAGE: ITubularSettingsProvider = {
    put(id: string, value: string) {
        localStorage.setItem(id, JSON.stringify(value));
    },
    get(key: string): any {
        return JSON.parse(localStorage.getItem(key)) || false;
    },
    delete(key: string) {
        localStorage.removeItem(key);
    }
};