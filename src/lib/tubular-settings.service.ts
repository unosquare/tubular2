import { Injectable } from '@angular/core';

export interface Settings {
    id: any;
    value: any;
}

@Injectable()
export class TubularSettingsService {

    constructor() {
    }

    public put(setting: Settings) {
        localStorage.setItem(setting.id, JSON.stringify(setting.value));
    }

    public get(key: string): any {
        return JSON.parse(localStorage.getItem(key)) || false;
    }

    public delete(key: string): any {
        localStorage.removeItem(key);
    }
}
