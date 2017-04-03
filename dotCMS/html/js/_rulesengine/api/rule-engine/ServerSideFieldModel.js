System.register(["../util/CwModel", "../util/CwInputModel", "@angular/common", "../validation/CustomValidators"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var CwModel_1, CwInputModel_1, common_1, CustomValidators_1;
    var ServerSideFieldModel, ServerSideTypeModel;
    return {
        setters:[
            function (CwModel_1_1) {
                CwModel_1 = CwModel_1_1;
            },
            function (CwInputModel_1_1) {
                CwInputModel_1 = CwInputModel_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (CustomValidators_1_1) {
                CustomValidators_1 = CustomValidators_1_1;
            }],
        execute: function() {
            ServerSideFieldModel = (function (_super) {
                __extends(ServerSideFieldModel, _super);
                function ServerSideFieldModel(key, type, priority) {
                    if (priority === void 0) { priority = 1; }
                    _super.call(this, key);
                    this.parameters = {};
                    this.parameterDefs = {};
                }
                Object.defineProperty(ServerSideFieldModel.prototype, "type", {
                    get: function () {
                        return this._type;
                    },
                    set: function (type) {
                        var _this = this;
                        if (type && this._type != type) {
                            this._type = type;
                            this.parameterDefs = {};
                            this.parameters = {};
                            Object.keys(type.parameters).forEach(function (key) {
                                var x = type.parameters[key];
                                var paramDef = CwInputModel_1.ParameterDefinition.fromJson(x);
                                var defaultValue = paramDef.defaultValue || paramDef.inputType.dataType.defaultValue;
                                _this.parameterDefs[key] = paramDef;
                                _this.parameters[key] = { key: key, value: defaultValue, priority: paramDef.priority };
                            });
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ServerSideFieldModel.prototype.setParameter = function (key, value, priority) {
                    if (priority === void 0) { priority = 1; }
                    if (this.parameterDefs[key] === undefined) {
                        console.log("Unsupported parameter: ", key, "Valid parameters: ", Object.keys(this.parameterDefs));
                        return;
                    }
                    this.parameters[key] = { key: key, value: value, priority: priority };
                };
                ServerSideFieldModel.prototype.getParameter = function (key) {
                    var v = '';
                    if (this.parameters[key] !== undefined) {
                        v = this.parameters[key];
                    }
                    return v;
                };
                ServerSideFieldModel.prototype.getParameterValue = function (key) {
                    var v = null;
                    if (this.parameters[key] !== undefined) {
                        v = this.parameters[key].value;
                    }
                    return v;
                };
                ServerSideFieldModel.prototype.getParameterDef = function (key) {
                    var v = '';
                    if (this.parameterDefs[key] !== undefined) {
                        v = this.parameterDefs[key];
                    }
                    return v;
                };
                ServerSideFieldModel.prototype.isValid = function () {
                    var _this = this;
                    var valid = true;
                    if (this.parameterDefs) {
                        Object.keys(this.parameterDefs).some(function (key) {
                            var paramDef = _this.getParameterDef(key);
                            var param = _this.parameters[key];
                            var value = param.value;
                            try {
                                valid = valid && (paramDef.inputType.verify(value) == null);
                            }
                            catch (e) {
                                console.error(e);
                            }
                            if (paramDef.inputType.name == 'comparison' && paramDef.inputType['options'][value].rightHandArgCount == 0) {
                                return true;
                            }
                        });
                    }
                    valid = valid && this._type && this._type.key && this._type.key != 'NoSelection';
                    return valid;
                };
                ServerSideFieldModel.createNgControl = function (model, paramName) {
                    var param = model.parameters[paramName];
                    var paramDef = model.parameterDefs[paramName];
                    var vFn = paramDef.inputType.dataType.validators();
                    vFn.push(CustomValidators_1.CustomValidators.noQuotes());
                    var control = new common_1.Control(model.getParameterValue(param.key), common_1.Validators.compose(vFn));
                    control.statusChanges.subscribe(function (value) {
                    });
                    return control;
                };
                return ServerSideFieldModel;
            }(CwModel_1.CwModel));
            exports_1("ServerSideFieldModel", ServerSideFieldModel);
            ServerSideTypeModel = (function () {
                function ServerSideTypeModel(key, i18nKey, parameters) {
                    if (key === void 0) { key = 'NoSelection'; }
                    if (i18nKey === void 0) { i18nKey = null; }
                    if (parameters === void 0) { parameters = {}; }
                    this.key = key ? key : 'NoSelection';
                    this.i18nKey = i18nKey;
                    this.parameters = parameters;
                }
                ServerSideTypeModel.prototype.isValid = function () {
                    return !!this.i18nKey && !!this.parameters;
                };
                ServerSideTypeModel.fromJson = function (json) {
                    return new ServerSideTypeModel(json.key, json.i18nKey, json.parameterDefinitions);
                };
                return ServerSideTypeModel;
            }());
            exports_1("ServerSideTypeModel", ServerSideTypeModel);
        }
    }
});
//# sourceMappingURL=ServerSideFieldModel.js.map