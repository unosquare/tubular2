"use strict";
(function (TbColumnType) {
    TbColumnType[TbColumnType["String"] = 1] = "String";
    TbColumnType[TbColumnType["Number"] = 2] = "Number";
    TbColumnType[TbColumnType["Boolean"] = 3] = "Boolean";
    TbColumnType[TbColumnType["Date"] = 4] = "Date";
    TbColumnType[TbColumnType["DateTime"] = 5] = "DateTime";
    TbColumnType[TbColumnType["DateTimeUtc"] = 6] = "DateTimeUtc";
})(exports.TbColumnType || (exports.TbColumnType = {}));
var TbColumnType = exports.TbColumnType;
var TbColumnModel = (function () {
    function TbColumnModel(name, searchable, sortable) {
        this.searchable = true;
        this.sortable = true;
        this.sortOrder = 0;
        this.visible = true;
        this.columnType = TbColumnType.String;
        this.name = name;
        if (searchable != null)
            this.searchable = searchable;
        if (sortable != null)
            this.sortable = sortable;
    }
    return TbColumnModel;
}());
exports.TbColumnModel = TbColumnModel;
//# sourceMappingURL=tbColumn.model.js.map