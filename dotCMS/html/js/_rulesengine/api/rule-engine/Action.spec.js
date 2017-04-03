System.register(["./ServerSideFieldModel", "./Rule"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ServerSideFieldModel_1, Rule_1;
    return {
        setters:[
            function (ServerSideFieldModel_1_1) {
                ServerSideFieldModel_1 = ServerSideFieldModel_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            }],
        execute: function() {
            describe('Unit.api.rule-engine.Action', function () {
                beforeEach(function () {
                });
                it("Isn't valid when no rule.", function () {
                    var foo = new Rule_1.ActionModel(null, new ServerSideFieldModel_1.ServerSideTypeModel(), null);
                    expect(foo.isValid()).toEqual(false);
                });
            });
        }
    }
});
//# sourceMappingURL=Action.spec.js.map