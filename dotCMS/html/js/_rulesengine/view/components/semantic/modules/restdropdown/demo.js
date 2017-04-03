System.register(['@angular/core', './RestDropdown', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, RestDropdown_1, Rx_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (RestDropdown_1_1) {
                RestDropdown_1 = RestDropdown_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(id) {
                    this.initDemo2();
                    this.initDemo3();
                    this.initDemo4();
                }
                App.prototype.initDemo2 = function () {
                    this.demo2 = {
                        name: "field-" + new Date().getTime() + Math.floor(Math.random() * 1000),
                        placeholder: Rx_1.Observable.of("Gender"),
                        value: null,
                        optionUrl: '/api/v1/sites/48190c8c-42c4-46af-8d1a-0cd5db894797/personas',
                        nameField: 'key',
                        valueField: 'value'
                    };
                };
                App.prototype.initDemo3 = function () {
                    var _this = this;
                    this.demo3 = {
                        name: "field-" + new Date().getTime() + Math.floor(Math.random() * 1000),
                        placeholder: Rx_1.Observable.from("Size"),
                        value: null,
                        options: [
                            //{valueId: '', value: '', label:  Observable.of('Gender')},
                            { value: 'L', label: this.delayedValue('Large', 100), icon: 'asterisk icon' },
                            { value: 'M', label: this.delayedValue('Medium', 1000), icon: 'cube icon' },
                            { value: 'S', label: this.delayedValue('Small', 2000), icon: 'cubes icon' }
                        ]
                    };
                    this.delayedValue('M', 2000).subscribe(function (v) {
                        console.log("Retrieved value for demo3:", v);
                        _this.demo3.value = v;
                    });
                };
                App.prototype.initDemo4 = function () {
                    var _this = this;
                    this.demo4 = {
                        name: "field-" + new Date().getTime() + Math.floor(Math.random() * 1000),
                        placeholder: Rx_1.Observable.of("Select a make"),
                        value: null,
                        options: [
                            //{valueId: '', value: '', label:  Observable.of('Gender')},
                            { value: 'BMW', label: this.delayedValue('BMW', 5000), icon: 'car icon' },
                            { value: 'Ford', label: this.delayedValue('Ford', 10), icon: 'car icon' },
                            { value: 'GMC', label: this.delayedValue('General Motors', 50), icon: 'car icon' },
                            { value: 'Toyota', label: this.delayedValue('Toyota', 100), icon: 'car icon' },
                        ]
                    };
                    this.delayedValue('BMW', 3000).subscribe(function (v) {
                        console.log("Retrieved value for demo3:", v);
                        _this.demo4.value = v;
                    });
                };
                App.prototype.delayedValue = function (value, delay) {
                    return Rx_1.Observable.timer(delay).map(function (x) { return value; });
                };
                //initDemo3() {
                //  this.demo3 = new DropdownModel(null,Observable.of("Color"), ["Y"], [
                //    new DropdownOption('R', {x: 'red'}, Observable.of('Red'), 'asterisk'),
                //    new DropdownOption('Y', 'yellow', Observable.of('Yellow'), 'certificate'),
                //    new DropdownOption('G', 92, Observable.of('Green'), 'circle'),
                //    new DropdownOption('B', 'blue', Observable.of('Blue'), 'square'),
                //    new DropdownOption('P', 'purple', Observable.of('Purple'), 'cube')], false, 0, 2);
                //}
                //
                //initDemo4() {
                //  let model = new DropdownModel(null, Observable.of("Color"), [], [
                //    new DropdownOption('R', 'red', Observable.of('Red'), 'asterisk'),
                //    new DropdownOption('Y', 'yellow', Observable.of('Yellow'), 'certificate'),
                //    new DropdownOption('G', 'green', Observable.of('Green'), 'circle'),
                //    new DropdownOption('B', 'blue', Observable.of('Blue'), 'square'),
                //    new DropdownOption('P', 'purple', Observable.of('Purple'), 'cube')], false, 0, 4)
                //
                //
                //  this.demo4 = {
                //    model: model,
                //    selected: []
                //  };
                //}
                App.prototype.demo4OnChange = function (event) {
                    var dd = event.target.model;
                    console.log(dd);
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'demo',
                        directives: [RestDropdown_1.RestDropdown],
                        template: "<div class=\"ui three column grid\">\n  <!--<div class=\"column\">-->\n    <!--<h4 class=\"ui top attached inverted header\">Default</h4>-->\n    <!--<div class=\"ui attached segment\">-->\n      <!--<cw-input-dropdown></cw-input-dropdown>-->\n    <!--</div>-->\n  <!--</div>-->\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Simple select, no default selection.</h4>\n    <div class=\"ui attached segment\">\n      <cw-input-rest-dropdown\n          optionUrl=\"{{demo2.optionUrl}}\"\n          optionNameField=\"{{demo2.nameField}}\"\n          optionValueField=\"{{demo2.valueField}}\"\n          [value]=\"demo2.value\"\n          placeholder=\"{{demo2.placeholder | async}}\"> </cw-input-rest-dropdown>\n    </div>\n  </div>\n  <!--<div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Simple select, default selection of 'Male'.</h4>\n    <div class=\"ui attached segment\">\n      <cw-input-dropdown [value]=\"demo3.value\" placeholder=\"{{demo3.placeholder | async}}\">\n        <cw-input-option *ngFor=\"#opt of demo3.options\" [value]=\"opt.value\" [label]=\"opt.label | async\" [icon]=\"opt.icon\"></cw-input-option>\n      </cw-input-dropdown>\n    </div>\n  </div>\n  <div class=\"column\">\n    <h4 class=\"ui top attached inverted header\">Default selection with delayed label update</h4>\n    <div class=\"ui attached segment\">\n      <cw-input-dropdown [value]=\"demo4.value\" placeholder=\"{{demo4.placeholder | async}}\">\n        <cw-input-option *ngFor=\"#opt of demo4.options\" [value]=\"opt.value\" [label]=\"opt.label | async\" [icon]=\"opt.icon\"></cw-input-option>\n      </cw-input-dropdown>\n    </div>\n  </div>-->\n  <!--<div class=\"column\">-->\n    <!--<h4 class=\"ui top attached inverted header\">Change the Text</h4>-->\n    <!--<div class=\"ui attached segment\">-->\n      <!--<cw-input-dropdown [model]=\"demo4.model\" (change)=\"demo4OnChange($event)\"></cw-input-dropdown>-->\n      <!--<div>Selected Ids: <em>{{demo4.selected}}</em></div>-->\n    <!--</div>-->\n  <!--</div>-->\n  <!--<div class=\"column\">-->\n    <!--<h4 class=\"ui top attached inverted header\">Notify on change</h4>-->\n    <!--<div class=\"ui buttom attached segment\">-->\n      <!--&lt;!&ndash;<cw-input-dropdown [value]=\"changeDemoValue\" (change)=\"changeDemoValue = $event\"></cw-input-dropdown>&ndash;&gt;-->\n      <!--&lt;!&ndash;<span> The value is: {{changeDemoValue}}</span>&ndash;&gt;-->\n    <!--</div>-->\n  <!--</div>-->\n</div>\n  "
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