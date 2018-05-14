export interface GridSearchParameter {
    text: string;
    operator: string;
}

export interface GridRequest {
    count: number;
    columns: any[];
    skip: number;
    take: number;
    search: GridSearchParameter;
    timezoneOffset: number;
}
