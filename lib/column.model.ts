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
    public text: string;
    public argument: string | string[];
    public operator: string;
}

export class ColumnModel {
    public name: string;
    public label: string;
    public searchable = true;
    public sortable = true;
    public sortOrder = 0;
    public direction = ColumnSortDirection.None;
    public visible = true;
    public dataType = DataType.String;
    public hasFilter = false;
    public filterMode = ColumnFilterMode.None;
    public filter = new ColumnFilter();
    public isMultiSort = false;
    public sortDirection = 'None';

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

    public getInputType() {
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

    public getOperators(): Object[] {
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
