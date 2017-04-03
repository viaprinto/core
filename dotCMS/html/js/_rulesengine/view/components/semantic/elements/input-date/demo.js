System.register(['@angular/bootstrap', '@angular/core', './input-date'], function(exports_1, context_1) {
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
    var bootstrap_1, core_1, input_date_1;
    var InputDateModel, App;
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
            function (input_date_1_1) {
                input_date_1 = input_date_1_1;
            }],
        execute: function() {
            InputDateModel = (function () {
                function InputDateModel(name, placeholder, type, value, disabled, icon) {
                    if (name === void 0) { name = null; }
                    if (placeholder === void 0) { placeholder = ''; }
                    if (type === void 0) { type = 'date'; }
                    if (value === void 0) { value = null; }
                    if (disabled === void 0) { disabled = null; }
                    if (icon === void 0) { icon = ''; }
                    this.name = !!name ? name : 'field-' + new Date().getTime() + Math.floor(Math.random() * 1000);
                    this.placeholder = placeholder;
                    this.type = type;
                    this.value = value;
                    this.disabled = disabled;
                    this.icon = icon || '';
                    if (this.icon.indexOf(' ') == -1 && this.icon.length > 0) {
                        this.icon = (this.icon + ' icon').trim();
                    }
                }
                InputDateModel.prototype.validateDate = function (date) {
                    var date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
                    if (!date_regex.test(date)) {
                        throw new Error("Insert a valid date dd/mm/yyyy,dd-mm-yyyy or dd.mm.yyyy");
                    }
                };
                InputDateModel.prototype.validateTime = function (time) {
                    var time_regex = /^(10|11|12|[1-9]):[0-5][0-9]$/;
                    if (!time_regex.test(time)) {
                        throw new Error("Insert a valid time HH:MM");
                    }
                };
                InputDateModel.prototype.validateDateTime = function (dateTime) {
                    // TODO: better match this regex for MM/DD/YYYY HH:MM
                    var date_time_regex = /^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$/;
                    if (!date_time_regex.test(dateTime)) {
                        throw new Error("Insert a valid date time");
                    }
                };
                InputDateModel.prototype.validate = function (value) {
                    console.log(this.type);
                    if (this.type === 'date') {
                        this.validateDate(value);
                    }
                    else if (this.type === 'time') {
                        this.validateTime(value);
                    }
                    else if (this.type === 'datetime-local') {
                        this.validateDateTime(value);
                    }
                };
                ;
                return InputDateModel;
            }());
            exports_1("InputDateModel", InputDateModel);
            App = (function () {
                function App(id) {
                    this.initDemoValue();
                    this.initDemoDisabled();
                    this.initDemoError();
                    this.initDemoIcon();
                }
                App.prototype.initDemoValue = function () {
                    var model = new InputDateModel();
                    model.name = "field-" + new Date().getTime() + Math.floor(Math.random() * 1000);
                    model.value = "Costa Rica";
                    model.type = 'datetime-local';
                    this.demoValue = model;
                };
                App.prototype.initDemoDisabled = function () {
                    var model = new InputDateModel();
                    model.name = "field-" + new Date().getTime() + Math.floor(Math.random() * 1000);
                    model.disabled = true;
                    model.placeholder = "Disabled";
                    this.demoDisabled = model;
                };
                App.prototype.initDemoError = function () {
                    var model = new InputDateModel();
                    model.type = 'time';
                    model.name = "field-" + new Date().getTime() + Math.floor(Math.random() * 1000);
                    model.value = "Required Field";
                    model.validate = function (newValue) {
                        var biggerThanFive = /^([5-9]|0[5-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                        if (!newValue) {
                            throw new Error("Required Field");
                        }
                        else if (!biggerThanFive.test(newValue)) {
                            throw new Error("Time should be bigger than 5AM");
                        }
                    };
                    this.demoError = model;
                };
                App.prototype.initDemoIcon = function () {
                    var model = new InputDateModel();
                    model.name = "field-" + new Date().getTime() + Math.floor(Math.random() * 1000);
                    model.icon = "icon circular calendar link";
                    model.placeholder = "Icon";
                    this.demoIcon = model;
                };
                App.prototype.customChange = function (event) {
                    console.log("Value of field: " + event.target.value);
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'demo',
                        directives: [input_date_1.InputDate],
                        template: "<div class=\"ui three column grid\">\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Default</h4>\n    <div class=\"ui attached segment\">\n      <cw-input-date></cw-input-date>\n    </div>\n  </div>\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">datetime-local</h4>\n    <div class=\"ui attached segment\">\n      <cw-input-date [model]=\"demoValue\"></cw-input-date>\n    </div>\n  </div>\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Disabled</h4>\n    <div class=\"ui attached segment\">\n      <cw-input-date [model]=\"demoDisabled\"></cw-input-date>\n    </div>\n  </div>\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Required and bigger than 5</h4>\n    <div class=\"ui attached segment\">\n      <cw-input-date [model]=\"demoError\" (change)=\"customChange($event)\"></cw-input-date>\n    </div>\n  </div>\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Icon</h4>\n    <div class=\"ui attached segment\">\n      <cw-input-date [model]=\"demoIcon\"></cw-input-date>\n    </div>\n  </div>\n</div>\n"
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