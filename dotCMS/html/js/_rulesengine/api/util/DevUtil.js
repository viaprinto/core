System.register(["../validation/Verify"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Verify_1;
    var DevUtil;
    return {
        setters:[
            function (Verify_1_1) {
                Verify_1 = Verify_1_1;
            }],
        execute: function() {
            DevUtil = (function () {
                function DevUtil() {
                }
                DevUtil.objToProperties = function (rsrcTree, base) {
                    Object.keys(rsrcTree).forEach(function (key) {
                        var subtreeOrValue = rsrcTree[key];
                        if (!Verify_1.Verify.isString(subtreeOrValue)) {
                            DevUtil.objToProperties(subtreeOrValue, base + '.' + key);
                        }
                        else {
                            console.log(base + '.' + key + '=' + subtreeOrValue);
                        }
                    });
                };
                return DevUtil;
            }());
            exports_1("DevUtil", DevUtil);
        }
    }
});
//# sourceMappingURL=DevUtil.js.map