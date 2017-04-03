System.register(['@angular/bootstrap', '@angular/core', './InputToggle'], function(exports_1, context_1) {
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
    var bootstrap_1, core_1, InputToggle_1;
    var App;
    function main() {
        var app = bootstrap_1.bootstrap(App);
        app.then(function (appRef) {
            console.log("Bootstrapped App: ", appRef);
        }).catch(function (e) {
            console.log("Error bootstrapping app: ", e);
            throw e;
        });
        return app;
    }
    exports_1("main", main);
    return {
        setters:[
            function (bootstrap_1_1) {
                bootstrap_1 = bootstrap_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (InputToggle_1_1) {
                InputToggle_1 = InputToggle_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(id) {
                    this.changeDemoValue = true;
                }
                App = __decorate([
                    core_1.Component({
                        selector: 'demo',
                        directives: [InputToggle_1.InputToggle],
                        template: "\n  <div class=\"ui three column grid\">\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Default</h4>\n    <div class=\"ui buttom attached segment\">\n      <cw-toggle-input></cw-toggle-input>\n    </div>\n  </div>\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Value=true</h4>\n    <div class=\"ui buttom attached segment\">\n      <cw-toggle-input [value]=\"true\"></cw-toggle-input>\n    </div>\n  </div>\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Value=false</h4>\n    <div class=\"ui buttom attached segment\">\n      <cw-toggle-input [value]=\"false\"></cw-toggle-input>\n    </div>\n  </div>\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Change the Text</h4>\n    <div class=\"ui buttom attached segment\">\n      <cw-toggle-input [value]=\"true\" onText=\"Or\" offText=\"And\"></cw-toggle-input>\n      <cw-toggle-input [value]=\"false\" onText=\"Or\" offText=\"And\"></cw-toggle-input>\n    </div>\n  </div>\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Notify on change</h4>\n    <div class=\"ui buttom attached segment\">\n      <cw-toggle-input [value]=\"changeDemoValue\" (change)=\"changeDemoValue = $event\"></cw-toggle-input>\n      <span> The value is: {{changeDemoValue}}</span>\n    </div>\n  </div>\n</div>\n  "
                    }),
                    __param(0, core_1.Attribute('id')), 
                    __metadata('design:paramtypes', [String])
                ], App);
                return App;
            }());
        }
    }
});
//# sourceMappingURL=demo.js.map