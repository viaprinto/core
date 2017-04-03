System.register(['@angular/core', '@angular/common', '../../../../../view/components/semantic/modules/dropdown/dropdown', "../../../semantic/elements/input-text/input-text", "../../../semantic/elements/input-date/input-date", "../../../../../api/rule-engine/ServerSideFieldModel", "../../../../../api/system/locale/I18n", "../../../../../api/util/ObservableHack", "../../../semantic/modules/restdropdown/RestDropdown", "../../../../../api/validation/Verify"], function(exports_1, context_1) {
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
    var core_1, common_1, dropdown_1, input_text_1, input_date_1, ServerSideFieldModel_1, I18n_1, ObservableHack_1, RestDropdown_1, Verify_1;
    var ServersideCondition;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dropdown_1_1) {
                dropdown_1 = dropdown_1_1;
            },
            function (input_text_1_1) {
                input_text_1 = input_text_1_1;
            },
            function (input_date_1_1) {
                input_date_1 = input_date_1_1;
            },
            function (ServerSideFieldModel_1_1) {
                ServerSideFieldModel_1 = ServerSideFieldModel_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (ObservableHack_1_1) {
                ObservableHack_1 = ObservableHack_1_1;
            },
            function (RestDropdown_1_1) {
                RestDropdown_1 = RestDropdown_1_1;
            },
            function (Verify_1_1) {
                Verify_1 = Verify_1_1;
            }],
        execute: function() {
            ServersideCondition = (function () {
                function ServersideCondition(fb, resources) {
                    this.parameterValueChange = new core_1.EventEmitter(false);
                    this._errorMessageFormatters = {
                        required: "Required",
                        minLength: "Input must be at least ${len} characters long.",
                        noQuotes: "Input cannot contain quote [\" or '] characters."
                    };
                    this._resources = resources;
                    this._inputs = [];
                }
                ServersideCondition.prototype.ngOnChanges = function (change) {
                    var _this = this;
                    var paramDefs = null;
                    if (change.componentInstance) {
                        this._rhArgCount = null;
                        paramDefs = this.componentInstance.type.parameters;
                    }
                    if (paramDefs) {
                        var prevPriority_1 = 0;
                        this._inputs = [];
                        Object.keys(paramDefs).forEach(function (key) {
                            var paramDef = _this.componentInstance.getParameterDef(key);
                            var param = _this.componentInstance.getParameter(key);
                            if (paramDef.priority > (prevPriority_1 + 1)) {
                                _this._inputs.push({ type: 'spacer', flex: 40 });
                            }
                            prevPriority_1 = paramDef.priority;
                            console.log("ServersideCondition", "onChange", "params", key, param);
                            var input = _this.getInputFor(paramDef.inputType.type, param, paramDef);
                            _this._inputs.push(input);
                        });
                        var comparison_1;
                        var comparisonIdx_1 = null;
                        this._inputs.forEach(function (input, idx) {
                            if (ServersideCondition.isComparisonParameter(input)) {
                                comparison_1 = input;
                                _this.applyRhsCount(comparison_1.value);
                                comparisonIdx_1 = idx;
                            }
                            else if (comparisonIdx_1 !== null) {
                                if (_this._rhArgCount !== null) {
                                    input.argIndex = idx - comparisonIdx_1 - 1;
                                }
                            }
                        });
                        if (comparison_1) {
                            this.applyRhsCount(comparison_1.value);
                        }
                    }
                };
                /**
                 * Brute force error messages from lookup table for now.
                 * @todo look up the known error formatters by key ('required', 'minLength', etc) from the I18NResource endpoint
                 * and pre-cache them, so that we can retrieve them synchronously.
                 */
                ServersideCondition.prototype.getErrorMessage = function (input) {
                    var _this = this;
                    var control = input.control;
                    var message = "";
                    Object.keys(control.errors || {}).forEach(function (key) {
                        var err = control.errors[key];
                        message += _this._errorMessageFormatters[key];
                        if (Object.keys(err).length) {
                            debugger;
                        }
                    });
                    return message;
                };
                ServersideCondition.prototype.onBlur = function (input) {
                    if (input.control.dirty) {
                        this.setParameterValue(input.name, input.control.value, input.control.valid, true);
                    }
                };
                ServersideCondition.prototype.setParameterValue = function (name, value, valid, isBlur) {
                    if (isBlur === void 0) { isBlur = false; }
                    this.parameterValueChange.emit({ name: name, value: value });
                    if (name == 'comparison') {
                        this.applyRhsCount(value);
                    }
                };
                ServersideCondition.prototype.getInputFor = function (type, param, paramDef) {
                    var i18nBaseKey = paramDef.i18nBaseKey || this.componentInstance.type.i18nKey;
                    /* Save a potentially large number of requests by loading parent key: */
                    this._resources.get(i18nBaseKey).subscribe(function () { });
                    var input;
                    if (type === 'text' || type === 'number') {
                        input = this.getTextInput(param, paramDef, i18nBaseKey);
                        console.log("ServersideCondition", "getInputFor", type, paramDef);
                    }
                    else if (type === 'datetime') {
                        input = this.getDateTimeInput(param, paramDef, i18nBaseKey);
                    }
                    else if (type === 'restDropdown') {
                        input = this.getRestDropdownInput(param, paramDef, i18nBaseKey);
                    }
                    else if (type === 'dropdown') {
                        input = this.getDropdownInput(param, paramDef, i18nBaseKey);
                    }
                    input.type = type;
                    return input;
                };
                ServersideCondition.prototype.getTextInput = function (param, paramDef, i18nBaseKey) {
                    var rsrcKey = i18nBaseKey + '.inputs.' + paramDef.key;
                    var placeholderKey = rsrcKey + '.placeholder';
                    var control = ServerSideFieldModel_1.ServerSideFieldModel.createNgControl(this.componentInstance, param.key);
                    return {
                        name: param.key,
                        placeholder: this._resources.get(placeholderKey, paramDef.key),
                        control: control,
                        required: paramDef.inputType.dataType['minLength'] > 0
                    };
                };
                ServersideCondition.prototype.getDateTimeInput = function (param, paramDef, i18nBaseKey) {
                    var rsrcKey = i18nBaseKey + '.inputs.' + paramDef.key;
                    return {
                        name: param.key,
                        value: this.componentInstance.getParameterValue(param.key),
                        control: ServerSideFieldModel_1.ServerSideFieldModel.createNgControl(this.componentInstance, param.key),
                        required: paramDef.inputType.dataType['minLength'] > 0,
                        visible: true
                    };
                };
                ServersideCondition.prototype.getRestDropdownInput = function (param, paramDef, i18nBaseKey) {
                    var inputType = paramDef.inputType;
                    var rsrcKey = i18nBaseKey + '.inputs.' + paramDef.key;
                    var placeholderKey = rsrcKey + '.placeholder';
                    var currentValue = this.componentInstance.getParameterValue(param.key);
                    if (currentValue && (currentValue.indexOf('"') != -1 || currentValue.indexOf("'") != -1)) {
                        currentValue = currentValue.replace(/["']/g, '');
                        this.componentInstance.setParameter(param.key, currentValue);
                    }
                    var control = ServerSideFieldModel_1.ServerSideFieldModel.createNgControl(this.componentInstance, param.key);
                    var input = {
                        value: currentValue,
                        name: param.key,
                        control: control,
                        placeholder: this._resources.get(placeholderKey, paramDef.key),
                        optionUrl: inputType.optionUrl,
                        optionValueField: inputType.optionValueField,
                        optionLabelField: inputType.optionLabelField,
                        minSelections: inputType.minSelections,
                        maxSelections: inputType.maxSelections,
                        required: inputType.minSelections > 0,
                        allowAdditions: inputType.allowAdditions
                    };
                    if (!input.value) {
                        input.value = inputType.selected != null ? inputType.selected : '';
                    }
                    return input;
                };
                ServersideCondition.prototype.getDropdownInput = function (param, paramDef, i18nBaseKey) {
                    var _this = this;
                    var inputType = paramDef.inputType;
                    var opts = [];
                    var options = inputType.options;
                    var rsrcKey = i18nBaseKey + '.inputs.' + paramDef.key;
                    var placeholderKey = rsrcKey + '.placeholder';
                    if (param.key == 'comparison') {
                        rsrcKey = 'api.sites.ruleengine.rules.inputs.comparison';
                    }
                    else {
                        rsrcKey = rsrcKey + '.options';
                    }
                    var currentValue = this.componentInstance.getParameterValue(param.key);
                    var needsCustomAttribute = currentValue != null;
                    Object.keys(options).forEach(function (key) {
                        var option = options[key];
                        if (needsCustomAttribute && key == currentValue) {
                            needsCustomAttribute = false;
                        }
                        var labelKey = rsrcKey + '.' + option.i18nKey;
                        // hack for country - @todo ggranum: kill 'name' on locale?
                        if (param.key === 'country') {
                            labelKey = i18nBaseKey + '.' + option.i18nKey + '.name';
                        }
                        opts.push({
                            value: key,
                            label: _this._resources.get(labelKey, option.i18nKey),
                            icon: option.icon,
                            rightHandArgCount: option.rightHandArgCount
                        });
                    });
                    if (needsCustomAttribute) {
                        opts.push({
                            value: currentValue,
                            label: ObservableHack_1.ObservableHack.of(currentValue)
                        });
                    }
                    var input = {
                        value: currentValue,
                        name: param.key,
                        control: ServerSideFieldModel_1.ServerSideFieldModel.createNgControl(this.componentInstance, param.key),
                        placeholder: this._resources.get(placeholderKey, paramDef.key),
                        options: opts,
                        minSelections: inputType.minSelections,
                        maxSelections: inputType.maxSelections,
                        required: inputType.minSelections > 0,
                        allowAdditions: inputType.allowAdditions,
                    };
                    if (!input.value) {
                        input.value = inputType.selected != null ? inputType.selected : '';
                    }
                    return input;
                };
                ServersideCondition.prototype.applyRhsCount = function (selectedComparison) {
                    var comparisonDef = this.componentInstance.getParameterDef('comparison');
                    var comparisonType = comparisonDef.inputType;
                    var selectedComparisonDef = comparisonType.options[selectedComparison];
                    this._rhArgCount = ServersideCondition.getRightHandArgCount(selectedComparisonDef);
                };
                ServersideCondition.getRightHandArgCount = function (selectedComparison) {
                    var argCount = null;
                    if (selectedComparison) {
                        argCount = Verify_1.Verify.isNumber(selectedComparison.rightHandArgCount)
                            ? selectedComparison.rightHandArgCount
                            : 1;
                    }
                    return argCount;
                };
                ServersideCondition.isComparisonParameter = function (input) {
                    return input && input.name === 'comparison';
                };
                ServersideCondition.getSelectedOption = function (input, value) {
                    var opt = null;
                    var optAry = input.options.filter(function (e) { return e.value == value; });
                    if (optAry && optAry.length === 1) {
                        opt = optAry[0];
                    }
                    return opt;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', ServerSideFieldModel_1.ServerSideFieldModel)
                ], ServersideCondition.prototype, "componentInstance", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ServersideCondition.prototype, "parameterValueChange", void 0);
                ServersideCondition = __decorate([
                    core_1.Component({
                        selector: 'cw-serverside-condition',
                        directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, RestDropdown_1.RestDropdown, dropdown_1.Dropdown, dropdown_1.InputOption, input_text_1.InputText, input_date_1.InputDate],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: "<form>\n  <div flex layout=\"row\" class=\"cw-condition-component-body\">\n    <template ngFor let-input [ngForOf]=\"_inputs\">\n      <div *ngIf=\"input.type == 'spacer'\" flex class=\"cw-input cw-input-placeholder\">&nbsp;</div>\n      <cw-input-dropdown *ngIf=\"input.type == 'dropdown'\"\n                         flex\n                         class=\"cw-input\"\n                         [hidden]=\"input.argIndex !== null && input.argIndex >= _rhArgCount\"\n                         [ngFormControl]=\"input.control\"\n                         [required]=\"input.required\"\n                         [allowAdditions]=\"input.allowAdditions\"\n                         [class.cw-comparator-selector]=\"input.name == 'comparison'\"\n                         [class.cw-last]=\"islast\"\n                         (touch)=\"onBlur(input)\"\n                         placeholder=\"{{input.placeholder | async}}\">\n        <cw-input-option\n            *ngFor=\"let opt of input.options\"\n            [value]=\"opt.value\"\n            [label]=\"opt.label | async\"\n            icon=\"{{opt.icon}}\"></cw-input-option>\n      </cw-input-dropdown>\n\n      <div flex layout-fill layout=\"column\" class=\"cw-input\" [class.cw-last]=\"islast\" *ngIf=\"input.type == 'restDropdown'\">\n        <cw-input-rest-dropdown flex\n                                class=\"cw-input\"\n                                [value]=\"input.value\"\n                                [ngFormControl]=\"input.control\"\n                                [hidden]=\"input.argIndex !== null && input.argIndex >= _rhArgCount\"\n                                placeholder=\"{{input.placeholder | async}}\"\n                                [minSelections]=\"input.minSelections\"\n                                [maxSelections]=\"input.maxSelections\"\n                                optionUrl=\"{{input.optionUrl}}\"\n                                optionValueField=\"{{input.optionValueField}}\"\n                                optionLabelField=\"{{input.optionLabelField}}\"\n                                [required]=\"input.required\"\n                                [allowAdditions]=\"input.allowAdditions\"\n                                [class.cw-comparator-selector]=\"input.name == 'comparison'\"\n                                [class.cw-last]=\"islast\"\n                                (touch)=\"onBlur(input)\"\n                                #rdInput=\"ngForm\"\n                                >\n        </cw-input-rest-dropdown>\n        <div flex=\"50\" *ngIf=\"rdInput.touched && !rdInput.valid && (input.argIndex == null || input.argIndex < _rhArgCount)\"\n            class=\"name cw-warn basic label\">{{getErrorMessage(input)}}</div>\n      </div>\n\n      <div flex layout-fill layout=\"column\" class=\"cw-input\" [class.cw-last]=\"islast\" *ngIf=\"input.type == 'text' || input.type == 'number'\">\n        <cw-input-text\n            flex\n            [placeholder]=\"input.placeholder | async\"\n            [ngFormControl]=\"input.control\"\n            [type]=\"input.type\"\n            [hidden]=\"input.argIndex !== null && input.argIndex >= _rhArgCount\"\n            (blur)=\"onBlur(input)\"\n            #fInput=\"ngForm\"\n        ></cw-input-text>\n        <div flex=\"50\" *ngIf=\"fInput.touched && !fInput.valid && (input.argIndex == null || input.argIndex < _rhArgCount)\"\n            class=\"name cw-warn basic label\">{{getErrorMessage(input)}}</div>\n      </div>\n\n      <cw-input-date *ngIf=\"input.type == 'datetime'\"\n                     flex\n                    layout-fill\n                     class=\"cw-input\"\n                     [ngFormControl]=\"input.control\"\n                     [class.cw-last]=\"islast\"\n                     [placeholder]=\"input.placeholder | async\"\n                     [hidden]=\"input.argIndex !== null && input.argIndex >= _rhArgCount\"\n                     [value]=\"input.value\"\n                     (blur)=\"onBlur(input)\"\n                     #gInput=\"ngForm\"\n      ></cw-input-date>\n    </template>\n  </div>\n</form>"
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, I18n_1.I18nService])
                ], ServersideCondition);
                return ServersideCondition;
            }());
            exports_1("ServersideCondition", ServersideCondition);
        }
    }
});
//# sourceMappingURL=serverside-condition.js.map