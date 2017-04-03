System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var LazyVerify, Verify;
    return {
        setters:[],
        execute: function() {
            /**
             * Lazy Verifiers DO NOT CHECK ASSUMPTIONS before executing the validation logic.
             *
             * It is important to realize that executing LazyVerify methods in the wrong order can result in false positives,
             * not just errors. For example 'LazyVerify.isInteger("")' will return true.
             *
             * For example, a non-lazy
             * minLength(value) function would normally ensure that 'value' exists and is in fact a string. The lazy version
             * simply assumes those tests have already been done.
             *
             * Lazy verifiers are useful for Validation chains, where it is necessary to run each specific check to obtain
             * a accurate error messages, while not forcing users to add each validation into the chain themselves.
             *
             */
            LazyVerify = (function () {
                function LazyVerify() {
                }
                LazyVerify.exists = function (value) {
                    return !(value === null || value === undefined);
                };
                LazyVerify.empty = function (value) {
                    var empty = !LazyVerify.exists(value);
                    if (!empty) {
                        if (LazyVerify.isString(value)) {
                            empty = LazyVerify.maxLength(value, 0);
                        }
                        else if (LazyVerify.isObject(value)) {
                            empty = LazyVerify.emptyObject(value);
                        }
                    }
                    return empty;
                };
                LazyVerify.isObject = function (value) {
                    return (typeof value === 'object' || value.constructor === Object);
                };
                LazyVerify.isString = function (value) {
                    return (typeof value === 'string' || value instanceof String);
                };
                LazyVerify.isFunction = function (value) {
                    return (typeof value === 'function' || value instanceof Function);
                };
                LazyVerify.isArray = function (value) {
                    return (typeof value === 'array' || value instanceof Array);
                };
                LazyVerify.emptyObject = function (value) {
                    return Object.getOwnPropertyNames(value).length === 0;
                };
                /**
                 * The object has only the specified property keys, and by default must have all of the specified keys.
                 * Setting allowMissing to true
                 * @param object anything that works with Object.keys
                 * @param properties Array of strings that represent keys to check for
                 * @param allowMissing If true this test will fail if the object has a key that is not specified in properties,
                 * but will not fail if a key is not present on the object.
                 * @returns {boolean}
                 */
                LazyVerify.hasOnly = function (object, properties, allowMissing) {
                    if (properties === void 0) { properties = []; }
                    if (allowMissing === void 0) { allowMissing = false; }
                    var keys = Object.keys(object);
                    var has = {};
                    var count = 0;
                    keys.forEach(function (key) {
                        has[key] = true;
                        count++;
                    });
                    var hasAllOfDems = properties.every(function (propKey) {
                        count--;
                        var x = has[propKey];
                        return x === undefined || x === true;
                    });
                    return (hasAllOfDems && (allowMissing ? count <= 0 : count === 0));
                };
                /**
                 * The object has all the specified keys, and perhaps others.
                 * @param object anything that works with Object.keys
                 * @param properties Array of strings that represent keys to check for
                 * @returns {boolean}
                 */
                LazyVerify.hasAll = function (object, properties) {
                    if (properties === void 0) { properties = []; }
                    var keys = Object.keys(object);
                    var has = {};
                    keys.forEach(function (key) {
                        has[key] = true;
                    });
                    var hasAllOfDems = properties.every(function (propKey) {
                        return has[propKey];
                    });
                    return hasAllOfDems;
                };
                LazyVerify.maxLength = function (value, max) {
                    return value.length <= max;
                };
                LazyVerify.minLength = function (value, min) {
                    return value.length >= min;
                };
                LazyVerify.isNumber = function (value) {
                    return (typeof value === 'number' || value instanceof Number);
                };
                LazyVerify.isInteger = function (value) {
                    return (value % 1 === 0);
                };
                LazyVerify.min = function (value, min) {
                    return value >= min;
                };
                LazyVerify.max = function (value, max) {
                    return value <= max;
                };
                LazyVerify.isBoolean = function (value) {
                    return value === true || value === false;
                };
                return LazyVerify;
            }());
            exports_1("LazyVerify", LazyVerify);
            Verify = (function (_super) {
                __extends(Verify, _super);
                function Verify() {
                    _super.apply(this, arguments);
                }
                Verify.isString = function (value, allowEmpty) {
                    if (allowEmpty === void 0) { allowEmpty = false; }
                    return (!LazyVerify.exists(value)) ? allowEmpty === true : LazyVerify.isString(value);
                };
                Verify.maxLength = function (value, max) {
                    return Verify.isString(value) && LazyVerify.maxLength(value, max);
                };
                Verify.minLength = function (value, min) {
                    return Verify.isString(value) && LazyVerify.minLength(value, min);
                };
                Verify.isNumber = function (value) {
                    return LazyVerify.exists(value) && LazyVerify.isNumber(value);
                };
                Verify.isInteger = function (value) {
                    return Verify.isNumber(value) && LazyVerify.isInteger(value);
                };
                Verify.min = function (value, min) {
                    return Verify.isNumber(value) && LazyVerify.min(value, min);
                };
                Verify.max = function (value, max) {
                    return Verify.isNumber(value) && LazyVerify.max(value, max);
                };
                Verify.isFunction = function (value) {
                    return LazyVerify.exists(value) && LazyVerify.isFunction(value);
                };
                Verify.isArray = function (value) {
                    return LazyVerify.exists(value) && LazyVerify.isArray(value);
                };
                return Verify;
            }(LazyVerify));
            exports_1("Verify", Verify);
        }
    }
});
//# sourceMappingURL=Verify.js.map