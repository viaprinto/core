System.register(['@angular/core', '@angular/common', 'rxjs/Rx', '@angular/platform-browser-dynamic/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, core_2, common_1, Rx_1, lang_1;
    var $, DO_NOT_SEARCH_ON_THESE_KEY_EVENTS, Dropdown, InputOption;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Angular 2 wrapper around Semantic UI Dropdown Module.
             * @see http://semantic-ui.com/modules/dropdown.html#/usage
             * Comments for event handlers, etc, copied directly from semantic-ui documentation.
             *
             * @todo ggranum: Extract semantic UI components into a separate github repo and include them via npm.
             */
            $ = window['$'];
            DO_NOT_SEARCH_ON_THESE_KEY_EVENTS = {
                13: 'enter',
                33: 'pageUp',
                34: 'pageDown',
                37: 'leftArrow',
                38: 'upArrow',
                39: 'rightArrow',
                40: 'downArrow',
            };
            Dropdown = (function () {
                function Dropdown(elementRef, control) {
                    this.change = new core_1.EventEmitter();
                    this.touch = new core_1.EventEmitter();
                    this.enter = new core_1.EventEmitter(false);
                    this.onChange = function () { };
                    this.onTouched = function () { };
                    this._optionsAry = [];
                    if (control && !control.valueAccessor) {
                        control.valueAccessor = this;
                    }
                    this.placeholder = "";
                    this.allowAdditions = false;
                    this.minSelections = 0;
                    this.maxSelections = 1;
                    this._options = new Rx_1.BehaviorSubject(this._optionsAry);
                    this.elementRef = elementRef;
                }
                Object.defineProperty(Dropdown.prototype, "value", {
                    set: function (value) {
                        this._modelValue = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Dropdown.prototype.focus = function () {
                    try {
                        this._$dropdown.children('input.search')[0].focus();
                    }
                    catch (e) {
                        console.log("Dropdown", "could not focus search element");
                    }
                };
                Dropdown.prototype.writeValue = function (value) {
                    this._modelValue = lang_1.isBlank(value) ? '' : value;
                    this.applyValue(this._modelValue);
                };
                Dropdown.prototype.registerOnChange = function (fn) {
                    this.onChange = fn;
                };
                Dropdown.prototype.registerOnTouched = function (fn) {
                    this.onTouched = fn;
                };
                Dropdown.prototype.fireChange = function ($event) {
                    if (this.change) {
                        this.change.emit($event);
                        this.onChange($event);
                    }
                };
                Dropdown.prototype.fireTouch = function ($event) {
                    this.touch.emit($event);
                    this.onTouched($event);
                };
                Dropdown.prototype.ngOnChanges = function (change) {
                };
                Dropdown.prototype.applyValue = function (value) {
                    var _this = this;
                    var count = 0;
                    Rx_1.Observable.interval(10).takeWhile(function () {
                        count++;
                        if (count > 100) {
                            throw "Dropdown element not found.";
                        }
                        return _this._$dropdown == null;
                    }).subscribe(function () {
                        // still null!
                    }, function (e) {
                        console.log("Dropdown", "Error", e);
                    }, function () {
                        console.log("Dropdown", "onComplete");
                        _this._$dropdown.dropdown('set selected', value);
                    });
                };
                Dropdown.prototype.hasOption = function (option) {
                    var x = this._optionsAry.filter(function (opt) {
                        return option.value == opt.value;
                    });
                    return x.length !== 0;
                };
                Dropdown.prototype.addOption = function (option) {
                    this._optionsAry = this._optionsAry.concat(option);
                    this._options.next(this._optionsAry);
                    if (option.value === this._modelValue) {
                        this.refreshDisplayText(option.label);
                    }
                };
                Dropdown.prototype.updateOption = function (option) {
                    this._optionsAry = this._optionsAry.filter(function (opt) {
                        return opt.value !== option.value;
                    });
                    this.addOption(option);
                };
                Dropdown.prototype.ngAfterViewInit = function () {
                    this.initDropdown();
                };
                Dropdown.prototype.ngOnDestroy = function () {
                    // remove the change emitter so that we don't fire changes when we clear the dropdown.
                    this.change = null;
                    this._$dropdown.dropdown('clear');
                };
                Dropdown.prototype.refreshDisplayText = function (label) {
                    if (this._$dropdown) {
                        this._$dropdown.dropdown('set text', label);
                    }
                };
                Dropdown.prototype.initDropdown = function () {
                    var _this = this;
                    var self = this;
                    var badSearch = null;
                    var config = {
                        allowAdditions: this.allowAdditions,
                        allowTab: true,
                        placeholder: 'auto',
                        onChange: function (value, text, $choice) {
                            badSearch = null;
                            return _this.onChangeSemantic(value, text, $choice);
                        },
                        onAdd: function (addedValue, addedText, $addedChoice) {
                            return _this.onAdd(addedValue, addedText, $addedChoice);
                        },
                        onRemove: function (removedValue, removedText, $removedChoice) {
                            return _this.onRemove(removedValue, removedText, $removedChoice);
                        },
                        onLabelCreate: function (value, text) {
                            var $label = this;
                            return self.onLabelCreate($label, value, text);
                        },
                        onLabelSelect: function ($selectedLabels) {
                            return _this.onLabelSelect($selectedLabels);
                        },
                        onNoResults: function (searchValue) {
                            if (!_this.allowAdditions) {
                                badSearch = searchValue;
                            }
                            return _this.onNoResults(searchValue);
                        },
                        onShow: function () {
                            return _this.onShow();
                        },
                        onHide: function () {
                            if (badSearch !== null) {
                                badSearch = null;
                                _this._$dropdown.children('input.search')[0].value = '';
                                if (!_this._modelValue || (_this._modelValue && _this._modelValue.length === 0)) {
                                    _this._$dropdown.dropdown('set text', _this.placeholder);
                                }
                                else {
                                    _this._$dropdown.dropdown('set selected', _this._modelValue);
                                }
                            }
                            return _this.onHide();
                        }
                    };
                    if (this.maxSelections > 1) {
                        config.maxSelections = this.maxSelections;
                    }
                    var el = this.elementRef.nativeElement;
                    this._$dropdown = $(el).children('.ui.dropdown');
                    this._$dropdown.dropdown(config);
                    this._applyArrowNavFix(this._$dropdown);
                };
                Dropdown.prototype.isMultiSelect = function () {
                    return this.maxSelections > 1;
                };
                /**
                 * Fixes an issue with up and down arrows triggering a search in the dropdown, which auto selects the first result
                 * after a short buffering period.
                 * @param $dropdown The JQuery dropdown element, after calling #.dropdown(config).
                 * @private
                 */
                Dropdown.prototype._applyArrowNavFix = function ($dropdown) {
                    var $searchField = $dropdown.children('input.search');
                    var enterEvent = this.enter;
                    $searchField.on('keyup', function (event) {
                        if (DO_NOT_SEARCH_ON_THESE_KEY_EVENTS[event.keyCode]) {
                            if (event.keyCode == 13 && enterEvent) {
                                enterEvent.emit(true);
                            }
                            event.stopPropagation();
                        }
                    });
                };
                ;
                /**
                 * Is called after a dropdown value changes. Receives the name and value of selection and the active menu element
                 * @param value
                 * @param text
                 * @param $choice
                 */
                Dropdown.prototype.onChangeSemantic = function (value, text, $choice) {
                    this._modelValue = value;
                    this.fireChange(value);
                };
                /**
                 * Is called after a dropdown selection is added using a multiple select dropdown, only receives the added value
                 * @param addedValue
                 * @param addedText
                 * @param $addedChoice
                 */
                Dropdown.prototype.onAdd = function (addedValue, addedText, $addedChoice) {
                };
                /**
                 * Is called after a dropdown selection is removed using a multiple select dropdown, only receives the removed value
                 * @param removedValue
                 * @param removedText
                 * @param $removedChoice
                 */
                Dropdown.prototype.onRemove = function (removedValue, removedText, $removedChoice) {
                };
                /**
                 * Allows you to modify a label before it is added. Expects $label to be returned.
                 * @param $label
                 * @param value
                 * @param text
                 */
                Dropdown.prototype.onLabelCreate = function ($label, value, text) {
                    return $label;
                };
                /**
                 * Is called after a label is selected by a user
                 * @param $selectedLabels
                 */
                Dropdown.prototype.onLabelSelect = function ($selectedLabels) {
                };
                /**
                 * Is called after a dropdown is searched with no matching values
                 * @param searchValue
                 */
                Dropdown.prototype.onNoResults = function (searchValue) {
                };
                /**
                 * Is called before a dropdown is shown. If false is returned, dropdown will not be shown.
                 */
                Dropdown.prototype.onShow = function () {
                };
                /**
                 * Is called before a dropdown is hidden. If false is returned, dropdown will not be hidden.
                 */
                Dropdown.prototype.onHide = function () {
                    this.touch.emit(this._modelValue);
                    this.onTouched();
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], Dropdown.prototype, "name", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], Dropdown.prototype, "placeholder", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Boolean)
                ], Dropdown.prototype, "allowAdditions", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Number)
                ], Dropdown.prototype, "minSelections", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Number)
                ], Dropdown.prototype, "maxSelections", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dropdown.prototype, "change", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dropdown.prototype, "touch", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dropdown.prototype, "enter", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], Dropdown.prototype, "value", null);
                Dropdown = __decorate([
                    core_1.Component({
                        selector: 'cw-input-dropdown',
                        directives: [common_1.CORE_DIRECTIVES],
                        template: "<div class=\"ui fluid selection dropdown search ng-valid\"\n     [class.required]=\"minSelections > 0\"\n     [class.multiple]=\"maxSelections > 1\"\n     tabindex=\"0\"\n     (change)=\"$event.stopPropagation()\"\n     (blur)=\"$event.stopPropagation()\">\n  <input type=\"hidden\" [name]=\"name\" [value]=\"_modelValue\" />\n  <i class=\"dropdown icon\"></i>\n  <div class=\"default text\">{{placeholder}}</div>\n  <div class=\"menu\" tabindex=\"-1\">\n    <div *ngFor=\"let opt of _options | async\" class=\"item\" [attr.data-value]=\"opt.value\" [attr.data-text]=\"opt.label\">\n      <i [ngClass]=\"opt.icon\" ></i>\n      {{opt.label}}\n    </div>\n  </div>\n</div>\n  ",
                        changeDetection: core_2.ChangeDetectionStrategy.OnPush,
                    }),
                    __param(1, core_1.Optional()), 
                    __metadata('design:paramtypes', [core_1.ElementRef, common_1.NgControl])
                ], Dropdown);
                return Dropdown;
            }());
            exports_1("Dropdown", Dropdown);
            InputOption = (function () {
                function InputOption(dropdown) {
                    this._dropdown = dropdown;
                }
                InputOption.prototype.ngOnChanges = function (change) {
                    if (!this._isRegistered) {
                        if (this._dropdown.hasOption(this)) {
                            this._dropdown.updateOption(this);
                        }
                        else {
                            this._dropdown.addOption(this);
                        }
                        this._isRegistered = true;
                    }
                    else {
                        if (!this.label) {
                            this.label = this.value;
                        }
                        this._dropdown.updateOption(this);
                    }
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], InputOption.prototype, "value", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], InputOption.prototype, "label", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], InputOption.prototype, "icon", void 0);
                InputOption = __decorate([
                    core_1.Directive({
                        selector: 'cw-input-option'
                    }),
                    __param(0, core_2.Host()), 
                    __metadata('design:paramtypes', [Dropdown])
                ], InputOption);
                return InputOption;
            }());
            exports_1("InputOption", InputOption);
        }
    }
});
//# sourceMappingURL=dropdown.js.map