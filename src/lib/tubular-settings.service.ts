import {provide} from '@angular/core';

import { Observable }     from 'rxjs/Observable';

export class TubularLocalData {
    public tubularLocalData: any;

    constructor() { }

    public set(key: string, value: string): void {
        this.tubularLocalData[key] = value;
    }

    public get(key: string): string {
        return this.tubularLocalData[key] || false;
    }

    public setObject(key: string, value: any): void {
        this.tubularLocalData[key] = JSON.stringify(value);
    }

    public getObject(key: string): any {
        return JSON.parse(this.tubularLocalData[key] || '{}');
    }

    public remove(key: string): any {
        this.tubularLocalData.removeItem(key);
    }
}