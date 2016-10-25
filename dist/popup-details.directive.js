"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var PopupDetails = (function () {
    function PopupDetails(modalService) {
        this.modalService = modalService;
        this.popupUpdated = new core_1.EventEmitter();
    }
    PopupDetails.prototype.onClick = function ($event) {
        var winRef = this.modalService.open(this.popupDetails);
        this.popupUpdated.emit(winRef);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PopupDetails.prototype, "popupDetails", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PopupDetails.prototype, "popupUpdated", void 0);
    PopupDetails = __decorate([
        core_1.Directive({
            selector: '[popupDetails]',
            host: {
                '(click)': 'onClick($event)',
            }
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbModal])
    ], PopupDetails);
    return PopupDetails;
}());
exports.PopupDetails = PopupDetails;
