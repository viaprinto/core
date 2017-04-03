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
    var InputText;
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
            InputText = (function () {
                function InputText(control, _elementRef) {
                    this._elementRef = _elementRef;
                    this.placeholder = "";
                    this.type = "text";
                    this.disabled = false;
                    this.readonly = false;
                    this.focused = false;
                    this.tabIndex = null;
                    this.required = false;
                    this.blur = new core_1.EventEmitter();
                    if (control) {
                        control.valueAccessor = this;
                    }
                }
                InputText.prototype.ngOnChanges = function (change) {
                    if (change.focused) {
                        var f = change.focused.currentValue === true || change.focused.currentValue == 'true';
                        if (f) {
                            var el_1 = this._elementRef.nativeElement;
                            // More info: http://stackoverflow.com/questions/36332418/angular-2-exception-expression-ngclassuntouched-has-changed-after-it-was-che
                            setTimeout(function () {
                                el_1.querySelector('input').focus();
                            }, 0);
                        }
                    }
                };
                Object.defineProperty(InputText.prototype, "value", {
                    get: function () {
                        return this._modelValue;
                    },
                    set: function (v) {
                        this.writeValue(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                InputText.prototype.onBlur = function (value) {
                    this.onTouched();
                    this.blur.emit(value);
                };
                InputText.prototype.writeValue = function (value) {
                    this._modelValue = lang_1.isBlank(value) ? '' : value;
                    this._elementRef.nativeElement.firstElementChild.firstElementChild.setAttribute('value', this._modelValue);
                };
                InputText.prototype.registerOnChange = function (fn) {
                    this.onChange = fn;
                };
                InputText.prototype.registerOnTouched = function (fn) {
                    this.onTouched = fn;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], InputText.prototype, "placeholder", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], InputText.prototype, "type", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], InputText.prototype, "icon", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputText.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputText.prototype, "readonly", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputText.prototype, "focused", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], InputText.prototype, "tabIndex", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputText.prototype, "required", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], InputText.prototype, "blur", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], InputText.prototype, "value", null);
                InputText = __decorate([
                    core_1.Component({
                        selector: 'cw-input-text',
                        host: { 'role': 'text' },
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: "<div flex layout=\"row\" layout-wrap class=\"ui fluid input\"  [ngClass]=\"{disabled: disabled, icon: icon, required: required}\">\n    <input flex\n           type=\"{{type}}\"\n           [value]=\"_modelValue\"\n           [disabled]=\"disabled\"\n           [readonly]=\"readonly\"\n           tabindex=\"{{tabIndex || ''}}\"\n           placeholder=\"{{placeholder}}\"\n           (blur)=\"onBlur($event)\"\n           (change)=\"$event.stopPropagation()\"\n           (input)=\"onChange($event.target.value)\" />\n    <i [ngClass]=\"icon\" *ngIf=\"icon\"></i>\n</div>\n  ",
                        directives: []
                    }),
                    __param(0, core_1.Optional()), 
                    __metadata('design:paramtypes', [common_1.NgControl, core_1.ElementRef])
                ], InputText);
                return InputText;
            }());
            exports_1("InputText", InputText);
        }
    }
});
//# sourceMappingURL=input-text.js.map