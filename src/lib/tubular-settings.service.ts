import { Injectable } from '@angular/core';

export interface ITubularSettingsProvider {
    put(id: string, value: string): void;
    get(key: string): any;
    delete(key: string): void;
}

@Injectable()
export class TubularSettingsService {

    constructor() {
    }

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
