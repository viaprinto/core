System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var InputToggle;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            InputToggle = (function () {
                function InputToggle() {
                    this.value = false;
                    this.disabled = false;
                    this.onText = 'On';
                    this.offText = 'Off';
                    this.change = new core_1.EventEmitter();
                }
                InputToggle.prototype.ngOnChanges = function (change) {
                    if (change.value) {
                        this.value = change.value.currentValue === true;
                    }
                };
                InputToggle.prototype.updateValue = function ($event) {
                    $event.stopPropagation(); // grrr.
                    var value = $event.target.checked;
                    console.log("InputToggle", "updateValue", 'input value changed: [from / to]', this.value, value);
                    this.value = value;
                    this.change.emit(value);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputToggle.prototype, "value", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputToggle.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], InputToggle.prototype, "onText", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], InputToggle.prototype, "offText", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], InputToggle.prototype, "change", void 0);
                InputToggle = __decorate([
                    core_1.Component({
                        selector: 'cw-toggle-input',
                        template: "<style>\n  .ui.toggle.checkbox label {\n    float: left\n  }\n\n  .on-label, .off-label {\n    position: absolute;\n    top: 0;\n    padding-top: .3em;\n    font-weight: 900;\n    font-size: 75%;\n    z-index: 2;\n  }\n\n  .on-label {\n    left: .75em;\n    color: white;\n  }\n\n  .off-label {\n    right: .75em;\n    color:#555;\n  }\n\n  .off .on-label, .on .off-label {\n    display: none;\n  }\n\n</style>\n  <span class=\"ui toggle fitted checkbox\" [class.on]=\"value === true\" [class.off]=\"value === false\">\n    <input type=\"checkbox\" [value]=\"value\" [checked]=\"value\" (change)=\"updateValue($event)\" [disabled]=\"disabled\">\n    <label></label>\n    <span class=\"on-label\">{{onText}}</span>\n    <span class=\"off-label\">{{offText}}</span>\n  </span>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], InputToggle);
                return InputToggle;
            }());
            exports_1("InputToggle", InputToggle);
        }
    }
});
//# sourceMappingURL=InputToggle.js.map