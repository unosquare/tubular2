;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Mdate.pipe = factory();
  }
}(this, function() {
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const moment = require("moment");
let MDatePipe = class MDatePipe {
    transform(value, format) {
        if (moment.isMoment(value)) {
            return format ? value.format(format) : value.format();
        }
        return value;
    }
};
MDatePipe = __decorate([
    core_1.Pipe({ name: 'mdate' })
], MDatePipe);
exports.MDatePipe = MDatePipe;

return Mdate.pipe;
}));
