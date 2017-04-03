System.register(['./Verify'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Verify_1;
    var CustomValidators;
    return {
        setters:[
            function (Verify_1_1) {
                Verify_1 = Verify_1_1;
            }],
        execute: function() {
            CustomValidators = (function () {
                function CustomValidators() {
                }
                CustomValidators.required = function () {
                    return function (control) {
                        var v = control.value;
                        return Verify_1.Verify.empty(v) ? { "required": true } : null;
                    };
                };
                CustomValidators.isString = function (allowEmpty) {
                    if (allowEmpty === void 0) { allowEmpty = false; }
                    return function (control) {
                        var v = control.value;
                        return !Verify_1.Verify.isString(v, allowEmpty) ? { "isString": { "emptyAllowed": allowEmpty } } : null;
                    };
                };
                CustomValidators.noQuotes = function () {
                    return function (control) {
                        var v = control.value;
                        var failed = false;
                        if (!Verify_1.Verify.empty(v) && (v.indexOf('"') != -1 || v.indexOf("'") != -1)) {
                            failed = true;
                        }
                        return failed ? { "noQuotes": true } : null;
                    };
                };
                CustomValidators.maxLength = function (max) {
                    return function (control) {
                        var v = control.value;
                        return !Verify_1.Verify.maxLength(v, max) ? { "maxLength": { "maximumLength": max, "actualLength": (v ? v.length : 0) } } : null;
                    };
                };
                CustomValidators.minLength = function (min) {
                    return function (control) {
                        var v = control.value;
                        return !Verify_1.Verify.minLength(v, min) ? { "minLength": { "minimumLength": min, "actualLength": (v ? v.length : 0) } } : null;
                    };
                };
                CustomValidators.isNumber = function () {
                    return function (control) {
                        var v = control.value;
                        return !Verify_1.Verify.isNumber(v) ? { "isNumber": true } : null;
                    };
                };
                CustomValidators.isInteger = function () {
                    return function (control) {
                        var v = control.value;
                        return !Verify_1.Verify.isInteger(v) ? { "isInteger": true } : null;
                    };
                };
                CustomValidators.min = function (min) {
                    return function (control) {
                        var v = control.value;
                        return !Verify_1.Verify.min(v, min) ? { "min": { "minimumValue": min, "actualValue": v } } : null;
                    };
                };
                CustomValidators.max = function (max) {
                    return function (control) {
                        var v = control.value;
                        return !Verify_1.Verify.max(v, max) ? { "max": { "maximumValue": max, "actualValue": v } } : null;
                    };
                };
                CustomValidators.minSelections = function (minSelections) {
                    var _this = this;
                    return function (control) {
                        var v = control.value;
                        var valid = null;
                        if (Verify_1.Verify.isString(v)) {
                            v = [v];
                        }
                        if (minSelections > 0) {
                            if (v == null || v.length < minSelections) {
                                valid = { "minSelections": {
                                        "minSelectionCount": _this.minSelections,
                                        "actualSelectionCount": (v ? v.length : 0) } };
                            }
                        }
                        return valid;
                    };
                };
                CustomValidators.maxSelections = function (maxSelections) {
                    var _this = this;
                    return function (control) {
                        var v = control.value;
                        var valid = null;
                        if (Verify_1.Verify.isString(v)) {
                            v = [v];
                        }
                        if (v != null && v.length > maxSelections) {
                            valid = valid ? valid : {};
                            valid["maxSelections"] = {
                                "maxSelectionCount": _this.maxSelections,
                                "actualSelectionCount": (v ? v.length : 0)
                            };
                        }
                        return valid;
                    };
                };
                return CustomValidators;
            }());
            exports_1("CustomValidators", CustomValidators);
        }
    }
});
//# sourceMappingURL=CustomValidators.js.map