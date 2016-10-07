export enum DataType {
    String = 1,
    Number,
    Boolean,
    Date,
    DateTime,
    DateTimeUtc,
}

export enum ColumnSortDirection {
    None = 0,
    Asc,
    Desc
}

export enum ColumnFilterMode {
    None = 0,
    String,
    Number,
    Boolean,
    Date,
    DateTime
}

export enum FilterOperator {
    None = 0,
    Equals
}

export class ColumnFilter {
    text: string;
    argument: string | string[];
    operator: FilterOperator;
}


export class ColumnModel {
    name: string;
    label: string;
    searchable: boolean = true;
    sortable: boolean = true;
    sortOrder: number = 0;
    direction: ColumnSortDirection = ColumnSortDirection.None;
    visible: boolean = true;
    dataType: DataType = DataType.String;
    hasFilter: boolean = false;
    filterMode: ColumnFilterMode = ColumnFilterMode.None;
    filter: ColumnFilter = new ColumnFilter();
    isMultiSort: boolean = false;

    constructor(name: string, searchable?: boolean, sortable?: boolean) {
        this.name = name;
        this.label = name.replace(/([a-z])([A-Z])/g, '$1 $2');

        if (searchable != null) this.searchable = searchable;
        if (sortable != null) this.sortable = sortable;
    }
    getInputType() {
        switch (this.filterMode) {
            case ColumnFilterMode.Number:
                return "number";
            case ColumnFilterMode.Date:
                return "date";
            case ColumnFilterMode.DateTime:
                return "datetime-local";
            default:
                return "text";
        }
    }
    getOperators(): Object[] {
        switch (this.filterMode) {
            case ColumnFilterMode.String:
                return [
                    { name: "None", value: "None" },
                    { name: "Contains", value: "Contains" },
                    { name: "Not Contains", value: "NotContains" },
                    { name: "Equals", value: "Equals" },
                    { name: "Not Equals", value: "NotEquals" },
                    { name: "Starts With", value: "StartsWith" },
                    { name: "Not Starts With", value: "NotStartsWith" },
                    { name: "Ends With", value: "EndsWith" },
                    { name: "Not Ends With", value: "NotEndsWith" }
                ];
            case ColumnFilterMode.Number:
                return [
                    { name: "None", value: "None" },
                    { name: "Equals", value: "Equals" },
                    { name: "Between", value: "Between" },
                    { name: ">=", value: ">=" },
                    { name: ">", value: ">" },
                    { name: "<=", value: "<=" },
                    { name: "<", value: "<" },
                ];
            case ColumnFilterMode.Boolean:
                return [
                    { name: "None", value: "None" },
                    { name: "Equals", value: "Equals" },
                    { name: "Not Equals", value: "NotEquals" }
                ];
            case ColumnFilterMode.Date:
            case ColumnFilterMode.DateTime:
                return [
                    { name: "None", value: "None" },
                    { name: "Equals", value: "Equals" },
                    { name: "Not Equals", value: "NotEquals" },
                    { name: "Between", value: "Between" },
                    { name: ">=", value: ">=" },
                    { name: ">", value: ">" },
                    { name: "<=", value: "<=" },
                    { name: "<", value: "<" },
                ]
            default:
                return [];
        }
    }
}