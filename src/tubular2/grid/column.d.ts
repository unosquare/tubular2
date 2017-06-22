export declare enum ColumnDataType {
    String = 1,
    Number = 2,
    Boolean = 3,
    Date = 4,
    DateTime = 5,
    DateTimeUtc = 6,
}
export declare enum ColumnSortDirection {
    None = 0,
    Asc = 1,
    Desc = 2,
}
export declare enum ColumnFilterMode {
    None = 0,
    String = 1,
    Number = 2,
    Boolean = 3,
    Date = 4,
    DateTime = 5,
}
export declare class ColumnFilter {
    text: string;
    argument: string | string[];
    operator: string;
}
export declare class ColumnModel {
    name: string;
    label: string;
    searchable: boolean;
    sortable: boolean;
    sortOrder: number;
    direction: ColumnSortDirection;
    visible: boolean;
    dataType: ColumnDataType;
    hasFilter: boolean;
    filterMode: ColumnFilterMode;
    filter: ColumnFilter;
    isMultiSort: boolean;
    sortDirection: string;
    constructor(name: string, searchable?: boolean, sortable?: boolean);
    getInputType(): "number" | "text" | "date" | "datetime-local";
    getOperators(): Object[];
}
