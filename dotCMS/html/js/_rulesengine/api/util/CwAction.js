System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var CwAction, AddAction;
    return {
        setters:[],
        execute: function() {
            CwAction = (function () {
                function CwAction(key, target) {
                    this.key = key;
                    this.target = target;
                }
                return CwAction;
            }());
            exports_1("CwAction", CwAction);
            AddAction = (function (_super) {
                __extends(AddAction, _super);
                function AddAction(key, target) {
                    _super.call(this, key, target);
                }
                return AddAction;
            }(CwAction));
            exports_1("AddAction", AddAction);
        }
    }
});
//# sourceMappingURL=CwAction.js.map