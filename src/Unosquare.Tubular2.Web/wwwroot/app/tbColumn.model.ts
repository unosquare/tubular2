export enum TbColumnType {
    String = 1,
    Number,
    Boolean,
    Date,
    DateTime,
    DateTimeUtc,
}

export enum TbColumnSortDirection {
    None = 0,
    Asc,
    Desc
}

export class TbColumnModel {
    name: string;
    label: string;
    searchable: boolean = true;
    sortable: boolean = true;
    sortOrder: number = 0;
    direction: TbColumnSortDirection = TbColumnSortDirection.None;
    visible: boolean = true;
    columnType: TbColumnType = TbColumnType.String;
    hasFilter: boolean = false;

    constructor(name: string, searchable?: boolean, sortable?: boolean) {
        this.name = name;
        this.label = name.replace(/([a-z])([A-Z])/g, '$1 $2');

        if (searchable != null) this.searchable = searchable;
        if (sortable != null) this.sortable = sortable;
    }
}