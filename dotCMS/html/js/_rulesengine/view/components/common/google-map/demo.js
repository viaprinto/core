System.register(['@angular/core', "./area-picker-dialog.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, area_picker_dialog_component_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (area_picker_dialog_component_1_1) {
                area_picker_dialog_component_1 = area_picker_dialog_component_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(id) {
                    this.showingMap = false;
                    this.circle = { center: { lat: 38.89, lng: -77.04 }, radius: 10000 };
                }
                App.prototype.toggleMap = function () {
                    this.showingMap = !this.showingMap;
                    // this.apiKey = "AIzaSyBqi1S9mgFHW7J-PkAp1hd1VWRKILgkL-8"
                    this.apiKey = "";
                    console.log("App", "toggleMap", this.showingMap);
                };
                App.prototype.onUpdate = function (circle) {
                    this.showingMap = false;
                    console.log("App", "onUpdate", circle);
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'demo',
                        directives: [area_picker_dialog_component_1.AreaPickerDialogComponent],
                        template: "\n    <cw-google-map-dialog-component \n    [hidden]=\"!showingMap\" \n    [apiKey]=\"apiKey\"\n    [circle]=\"circle\"\n    (circleUpdate)=\"onUpdate($event)\"\n    ></cw-google-map-dialog-component>\n    <button class=\"ui button cw-button-add\" aria-label=\"Show Map\" (click)=\"toggleMap()\">\n        <i class=\"plus icon\" aria-hidden=\"true\"></i>Show Map\n      </button>\n  "
                    }),
                    __param(0, core_1.Attribute('id')), 
                    __metadata('design:paramtypes', [String])
                ], App);
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=demo.js.map