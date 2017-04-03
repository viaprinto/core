System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CwModel;
    return {
        setters:[],
        execute: function() {
            CwModel = (function () {
                function CwModel(key) {
                    if (key === void 0) { key = null; }
                    this.key = key;
                }
                CwModel.prototype.isPersisted = function () {
                    return !!this.key;
                };
                /**
                 * Override me.
                 * @returns {boolean}
                 */
                CwModel.prototype.isValid = function () {
                    return true;
                };
                return CwModel;
            }());
            exports_1("CwModel", CwModel);
        }
    }
});
//# sourceMappingURL=CwModel.js.map