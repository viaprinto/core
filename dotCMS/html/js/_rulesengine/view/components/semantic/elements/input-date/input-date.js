System.register(['@angular/core', '@angular/common', '@angular/platform-browser-dynamic/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, common_1, lang_1;
    var InputDate;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Angular 2 wrapper around Semantic UI Input Element.
             * @see http://semantic-ui.com/elements/input.html
             */
            InputDate = (function () {
                function InputDate(control, _elementRef) {
                    this._elementRef = _elementRef;
                    this.placeholder = "";
                    this.type = "";
                    this.disabled = false;
                    this.focused = false;
                    this.tabIndex = null;
                    this.required = false;
                    this.blur = new core_1.EventEmitter();
                    if (control) {
                        control.valueAccessor = this;
                    }
                }
                InputDate.prototype.ngOnChanges = function (change) {
                    if (change.focused) {
                        var f = change.focused.currentValue === true || change.focused.currentValue == 'true';
                        if (f) {
                            var el = this._elementRef.nativeElement;
                            el.children[0].children[0].focus();
                        }
                    }
                };
                InputDate.prototype.onBlur = function (value) {
                    this.onTouched();
                    this.blur.emit(value);
                };
                InputDate.prototype.writeValue = function (value) {
                    this._modelValue = lang_1.isBlank(value) ? InputDate.DEFAULT_VALUE : value;
                    this._elementRef.nativeElement.firstElementChild.firstElementChild.setAttribute('value', this._modelValue);
                };
                InputDate.prototype.registerOnChange = function (fn) {
                    this.onChange = fn;
                };
                InputDate.prototype.registerOnTouched = function (fn) {
                    this.onTouched = fn;
                };
                InputDate._defaultValue = function () {
                    var d = new Date();
                    var off = d.getTimezoneOffset();
                    d.setHours(0);
                    d.setMinutes(0);
                    d.setSeconds(0);
                    d.setMilliseconds(0);
                    d.setMonth(d.getMonth() + 1);
                    d.setDate(1);
                    var r = d.toISOString();
                    r = r.substring(0, r.indexOf('T') + 1);
                    r = r + "00:00:00";
                    return r;
                };
                InputDate.DEFAULT_VALUE = InputDate._defaultValue();
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], InputDate.prototype, "placeholder", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], InputDate.prototype, "type", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], InputDate.prototype, "icon", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputDate.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputDate.prototype, "focused", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], InputDate.prototype, "tabIndex", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputDate.prototype, "required", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], InputDate.prototype, "blur", void 0);
                InputDate = __decorate([
                    core_1.Component({
                        selector: 'cw-input-date',
                        host: { 'role': 'text' },
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: "<div flex layout=\"row\" layout-wrap class=\"ui fluid input\"  [ngClass]=\"{disabled: disabled, icon: icon, required: required}\">\n    <input flex\n           type=\"datetime-local\"\n           [value]=\"_modelValue\"\n           [disabled]=\"disabled\"\n           tabindex=\"{{tabIndex || ''}}\"\n           placeholder=\"{{placeholder}}\"\n           (blur)=\"onBlur($event)\"\n           (change)=\"$event.stopPropagation()\"\n           (input)=\"onChange($event.target.value)\" />\n    <i [ngClass]=\"icon\" *ngIf=\"icon\"></i>\n</div>\n  ",
                        directives: []
                    }),
                    __param(0, core_1.Optional()), 
                    __metadata('design:paramtypes', [common_1.NgControl, core_1.ElementRef])
                ], InputDate);
                return InputDate;
            }());
            exports_1("InputDate", InputDate);
        }
    }
});
//# sourceMappingURL=input-date.js.map