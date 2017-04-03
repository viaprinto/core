System.register(['../../api/rule-engine/Rule'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rule_1;
    return {
        setters:[
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            }],
        execute: function() {
            describe('Unit.api.rule-engine.Rule', function () {
                beforeEach(function () {
                });
                it("Isn't valid when new.", function () {
                    var foo = new Rule_1.RuleModel(null);
                    expect(foo.isValid()).toEqual(false);
                });
            });
        }
    }
});
//# sourceMappingURL=Rule.spec.js.map