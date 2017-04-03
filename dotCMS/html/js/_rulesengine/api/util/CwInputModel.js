System.register(["@angular/common", "../validation/CustomValidators"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var common_1, CustomValidators_1;
    var CwValidationResults, VALIDATIONS, DataTypeModel, Registry, CwInputDefinition, CwSpacerInputDefinition, CwDropdownInputModel, CwRestDropdownInputModel, ParameterDefinition;
    return {
        setters:[
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (CustomValidators_1_1) {
                CustomValidators_1 = CustomValidators_1_1;
            }],
        execute: function() {
            CwValidationResults = (function () {
                function CwValidationResults(valid) {
                    this.valid = valid;
                }
                return CwValidationResults;
            }());
            exports_1("CwValidationResults", CwValidationResults);
            VALIDATIONS = {
                required: {
                    key: 'required',
                    providerFn: function (constraint) { return CustomValidators_1.CustomValidators.required(); }
                },
                minLength: {
                    key: 'minLength',
                    providerFn: function (constraint) { return CustomValidators_1.CustomValidators.minLength(constraint.args['value']); }
                },
                maxLength: {
                    key: 'maxLength',
                    providerFn: function (constraint) { return CustomValidators_1.CustomValidators.maxLength(constraint.args['value']); }
                },
                maxValue: {
                    key: 'maxValue',
                    providerFn: function (constraint) { return CustomValidators_1.CustomValidators.max(constraint.args['value']); }
                },
                minValue: {
                    key: 'minValue',
                    providerFn: function (constraint) { return CustomValidators_1.CustomValidators.min(constraint.args['value']); }
                }
            };
            DataTypeModel = (function () {
                function DataTypeModel(id, errorMessageKey, _constraints, defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    this.id = id;
                    this.errorMessageKey = errorMessageKey;
                    this._constraints = _constraints;
                    this.defaultValue = defaultValue;
                }
                DataTypeModel.prototype.validators = function () {
                    var _this = this;
                    if (this._vFns == null) {
                        this._vFns = [];
                        Object.keys(VALIDATIONS).forEach(function (vDefKey) {
                            var vDef = VALIDATIONS[vDefKey];
                            var constraint = _this._constraints[vDef.key];
                            if (constraint) {
                                var fn = vDef.providerFn(constraint);
                                _this._vFns.push(fn);
                            }
                        });
                    }
                    return this._vFns;
                };
                DataTypeModel.prototype.validator = function () {
                    return common_1.Validators.compose(this.validators());
                };
                return DataTypeModel;
            }());
            exports_1("DataTypeModel", DataTypeModel);
            Registry = {};
            CwInputDefinition = (function () {
                function CwInputDefinition(json, type, name, placeholder, dataType, _validators) {
                    if (_validators === void 0) { _validators = []; }
                    this.json = json;
                    this.type = type;
                    this.name = name;
                    this.placeholder = placeholder;
                    this.dataType = dataType;
                    this._validators = _validators;
                }
                CwInputDefinition.prototype.validators = function () {
                    if (this._vFns == null) {
                        this._vFns = this.dataType.validators().concat(this._validators);
                    }
                    return this._vFns;
                };
                CwInputDefinition.prototype.validator = function () {
                    if (this._validator == null) {
                        this._vFns = this.validators();
                        if (this._vFns && this._vFns.length) {
                            this._validator = common_1.Validators.compose(this._vFns);
                        }
                        else {
                            this._validator = function () { return null; };
                        }
                    }
                    return this._validator;
                };
                CwInputDefinition.prototype.verify = function (value) {
                    return this.validator()({ value: value });
                };
                CwInputDefinition.registerType = function (typeId, type) {
                    Registry[typeId] = type;
                };
                CwInputDefinition.fromJson = function (json, name) {
                    var typeId = json.id || json.type;
                    var type = Registry[typeId];
                    if (!type) {
                        var msg = "No input definition registered for '" + (json.id || json.type) + "'. Using default.";
                        console.error(msg, json);
                        type = 'text';
                    }
                    var dataType = null;
                    if (json.dataType) {
                        dataType = new DataTypeModel(json.dataType.id, json.dataType.errorMessageKey, json.dataType.constraints, json.dataType.defaultValue);
                    }
                    return new type(json, typeId, name, json.placeholder, dataType);
                };
                return CwInputDefinition;
            }());
            exports_1("CwInputDefinition", CwInputDefinition);
            CwSpacerInputDefinition = (function (_super) {
                __extends(CwSpacerInputDefinition, _super);
                function CwSpacerInputDefinition(flex) {
                    _super.call(this, {}, "spacer", null, null, null);
                    this.flex = flex;
                }
                return CwSpacerInputDefinition;
            }(CwInputDefinition));
            exports_1("CwSpacerInputDefinition", CwSpacerInputDefinition);
            CwInputDefinition.registerType("text", CwInputDefinition);
            CwInputDefinition.registerType("datetime", CwInputDefinition);
            CwInputDefinition.registerType("number", CwInputDefinition);
            CwDropdownInputModel = (function (_super) {
                __extends(CwDropdownInputModel, _super);
                function CwDropdownInputModel(json, type, name, placeholder, dataType) {
                    _super.call(this, json, type, name, placeholder, dataType, CwDropdownInputModel.createValidators(json));
                    this.minSelections = 0;
                    this.maxSelections = 1;
                    this.selected = [];
                    this.options = json.options;
                    this.allowAdditions = json.allowAdditions;
                    this.minSelections = json.minSelections;
                    this.maxSelections = json.maxSelections;
                    var defV = json.dataType.defaultValue;
                    this.selected = (defV == null || defV === '') ? [] : [defV];
                }
                CwDropdownInputModel.createValidators = function (json) {
                    var ary = [];
                    ary.push(CustomValidators_1.CustomValidators.minSelections(json.minSelections || 0));
                    ary.push(CustomValidators_1.CustomValidators.maxSelections(json.maxSelections || 1));
                    return ary;
                };
                return CwDropdownInputModel;
            }(CwInputDefinition));
            exports_1("CwDropdownInputModel", CwDropdownInputModel);
            CwInputDefinition.registerType("dropdown", CwDropdownInputModel);
            CwRestDropdownInputModel = (function (_super) {
                __extends(CwRestDropdownInputModel, _super);
                function CwRestDropdownInputModel(json, type, name, placeholder, dataType) {
                    _super.call(this, json, type, name, placeholder, dataType, CwDropdownInputModel.createValidators(json));
                    this.minSelections = 0;
                    this.maxSelections = 1;
                    this.selected = [];
                    this.optionUrl = json.optionUrl;
                    this.optionValueField = json.jsonValueField;
                    this.optionLabelField = json.jsonLabelField;
                    this.allowAdditions = json.allowAdditions;
                    this.minSelections = json.minSelections;
                    this.maxSelections = json.maxSelections;
                    var defV = json.dataType.defaultValue;
                    this.selected = (defV == null || defV === '') ? [] : [defV];
                }
                return CwRestDropdownInputModel;
            }(CwInputDefinition));
            exports_1("CwRestDropdownInputModel", CwRestDropdownInputModel);
            CwInputDefinition.registerType("restDropdown", CwRestDropdownInputModel);
            ParameterDefinition = (function () {
                function ParameterDefinition() {
                }
                ParameterDefinition.fromJson = function (json) {
                    var m = new ParameterDefinition;
                    var defV = json.defaultValue;
                    m.defaultValue = (defV == null || defV === '') ? null : defV;
                    m.priority = json.priority;
                    m.key = json.key;
                    m.inputType = CwInputDefinition.fromJson(json.inputType, m.key);
                    m.i18nBaseKey = json.i18nBaseKey;
                    return m;
                };
                return ParameterDefinition;
            }());
            exports_1("ParameterDefinition", ParameterDefinition);
        }
    }
});
//# sourceMappingURL=CwInputModel.js.map