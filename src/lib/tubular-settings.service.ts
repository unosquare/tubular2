import { Injectable } from '@angular/core';

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

    public delete(key: string): any {
        localStorage.removeItem(key);
    }
}
