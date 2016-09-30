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
    Number
}

export enum FilterOperator {
    None = 0,
    Equals
}

export class ColumnFilter {
    text: string;
    text2: string;
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

    getOperators(type): Object[] {
        switch (type) {
            case "1":
                return [
                    { name: "None", value: "None" },
                    { name: "Contains", value: "Contains" },
                    { name: "Equals", value: "Equals" },
                    { name: "Not Equals", value: "NotEquals" }
                ];
            case "2":
                return [
                    { name: "None", value: "None" },
                    { name: "Equals", value: "Equals" },
                    { name: "Between", value: "Between" },
                    { name: ">=", value: ">=" },
                    { name: ">", value: ">" },
                    { name: "<=", value: "<=" },
                    { name: "<", value: "<" },
                ]

        }
        
    }
}