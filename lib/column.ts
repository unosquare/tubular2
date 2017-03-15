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

export class ColumnFilter {
    text: string;
    argument: string | string[];
    operator: string;
}


export class ColumnModel {
    name: string;
    label: string;
    searchable = true;
    sortable = true;
    sortOrder = 0;
    direction = ColumnSortDirection.None;
    visible = true;
    dataType = DataType.String;
    hasFilter = false;
    filterMode = ColumnFilterMode.None;
    filter = new ColumnFilter();
    isMultiSort = false;
    sortDirection = 'None';
    
    constructor(name: string, searchable?: boolean, sortable?: boolean) {
        this.name = name;
        this.label = name.replace(/([a-z])([A-Z])/g, '$1 $2');

        if (searchable != null) {
            this.searchable = searchable;
        }
        
        if (sortable != null) {
            this.sortable = sortable;
        }
    }

    getInputType() {
        switch (this.filterMode) {
            case ColumnFilterMode.Number:
                return 'number';
            case ColumnFilterMode.Date:
                return 'date';
            case ColumnFilterMode.DateTime:
                return 'datetime-local';
            default:
                return 'text';
        }
    }

    getOperators(): Object[] {
        switch (this.filterMode) {
            case ColumnFilterMode.String:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Contains', value: 'Contains' },
                    { name: 'Not Contains', value: 'NotContains' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Not Equals', value: 'NotEquals' },
                    { name: 'Starts With', value: 'StartsWith' },
                    { name: 'Not Starts With', value: 'NotStartsWith' },
                    { name: 'Ends With', value: 'EndsWith' },
                    { name: 'Not Ends With', value: 'NotEndsWith' }
                ];
            case ColumnFilterMode.Number:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Between', value: 'Between' },
                    { name: '>=', value: 'Gte' },
                    { name: '>', value: 'Gt' },
                    { name: '<=', value: 'Lte' },
                    { name: '<', value: 'Lt' }
                ];
            case ColumnFilterMode.Date:
            case ColumnFilterMode.DateTime:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Not Equals', value: 'NotEquals' },
                    { name: 'Between', value: 'Between' },
                    { name: '>=', value: 'Gte' },
                    { name: '>', value: 'Gt' },
                    { name: '<=', value: 'Lte' },
                    { name: '<', value: 'Lt' }
                ];
            case ColumnFilterMode.Boolean:
            default:
                return [
                    { name: 'None', value: 'None' },
                    { name: 'Equals', value: 'Equals' },
                    { name: 'Not Equals', value: 'NotEquals' }
                ];
        }
    }
}