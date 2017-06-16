;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Grid-page-info = factory();
  }
}(this, function() {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GridPageInfo {
    constructor() {
        this.currentInitial = 0;
        this.currentTop = 0;
        this.currentPage = 0;
        this.totalPages = 0;
        this.totalRecordCount = 0;
        this.filteredRecordCount = 0;
    }
}
exports.GridPageInfo = GridPageInfo;

return Grid-page-info;
}));
