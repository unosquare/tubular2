export enum TbColumnType {
    String = 1,
    Number,
    Boolean,
    Date,
    DateTime,
    DateTimeUtc,
}

export class TbColumnModel {
    name: string;
    searchable: boolean = true;
    sortable: boolean = true;
    sortOrder: number = 0;
    visible: boolean = true;
    columnType: TbColumnType = TbColumnType.String;

    constructor(name: string, searchable?: boolean, sortable?: boolean) {
        this.name = name;
        if (searchable != null) this.searchable = searchable;
        if (sortable != null) this.sortable = sortable;
    }
}