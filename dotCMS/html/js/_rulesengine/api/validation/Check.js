System.register(['./Verify'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Verify_1;
    var createCheckError, Check;
    return {
        setters:[
            function (Verify_1_1) {
                Verify_1 = Verify_1_1;
            }],
        execute: function() {
            createCheckError = function (validation, value, message) {
                var e = new Error('Check.' + validation + " failed: '" + message + "'.");
                e['validation'] = validation;
                e['validatedValue'] = value;
                return e;
            };
            exports_1("Check", Check = {
                exists: function (value, message) {
                    if (message === void 0) { message = 'Value does not exist'; }
                    if (!Verify_1.Verify.exists(value)) {
                        throw createCheckError('exists', value, message);
                    }
                    return value;
                },
                isString: function (value, message) {
                    if (message === void 0) { message = 'Value is not a string'; }
                    if (!Verify_1.Verify.isString(value)) {
                        throw createCheckError('isString', value, message);
                    }
                    return value;
                },
                notEmpty: function (value, message) {
                    if (message === void 0) { message = 'The value is empty'; }
                    if (!Verify_1.Verify.minLength(value, 1)) {
                        throw createCheckError('notEmpty', value, message);
                    }
                    return value;
                }
            });
        }
    }
});
//# sourceMappingURL=Check.js.map