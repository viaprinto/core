System.register(['../../api/rule-engine/Rule', '@angular/core', '../../api/persistence/ApiRoot', "../../api/auth/UserModel", "../../api/rule-engine/Action", "../../api/rule-engine/ConditionGroup", "../../api/rule-engine/Condition", "../system/locale/I18n", "@angular/http"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rule_1, core_1, ApiRoot_1, UserModel_1, Action_1, ConditionGroup_1, Condition_1, I18n_1, http_1;
    var injector, Gen;
    return {
        setters:[
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ApiRoot_1_1) {
                ApiRoot_1 = ApiRoot_1_1;
            },
            function (UserModel_1_1) {
                UserModel_1 = UserModel_1_1;
            },
            function (Action_1_1) {
                Action_1 = Action_1_1;
            },
            function (ConditionGroup_1_1) {
                ConditionGroup_1 = ConditionGroup_1_1;
            },
            function (Condition_1_1) {
                Condition_1 = Condition_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            injector = core_1.Injector.resolveAndCreate([ApiRoot_1.ApiRoot,
                I18n_1.I18nService,
                UserModel_1.UserModel,
                Rule_1.RuleService,
                Action_1.ActionService,
                Condition_1.ConditionService,
                ConditionGroup_1.ConditionGroupService,
                http_1.HTTP_PROVIDERS
            ]);
            describe('Integration.api.rule-engine.ActionService', function () {
                var ruleService;
                var ruleOnAddSub;
                var actionService;
                var ruleUnderTest;
                var actionTypes = {};
                var setSessionActionlet;
                beforeAll(function (done) {
                    ruleService = injector.get(Rule_1.RuleService);
                    actionService = injector.get(Action_1.ActionService);
                    ruleService.getRuleActionTypes().subscribe(function (typesAry) {
                        typesAry.forEach(function (item) { return actionTypes[item.key] = item; });
                        setSessionActionlet = actionTypes["SetSessionAttributeActionlet"];
                        done();
                    });
                });
                beforeEach(function (done) {
                    Gen.createRules(ruleService);
                    ruleOnAddSub = ruleService.loadRules().subscribe(function (rule) {
                        ruleUnderTest = rule[0];
                        done();
                    }, function (err) {
                        expect(err).toBeUndefined("error was thrown.");
                        done();
                    });
                });
                afterEach(function (done) {
                    ruleService.deleteRule(ruleUnderTest.key).subscribe(function () {
                        ruleUnderTest = null;
                        ruleOnAddSub.unsubscribe();
                        done();
                    });
                });
                it("Has rules that we can add actions to", function () {
                    expect(ruleUnderTest.isPersisted()).toBe(true);
                });
                it("Can add a new Action", function (done) {
                    console.log("can add new", setSessionActionlet);
                    var anAction = new Rule_1.ActionModel(null, setSessionActionlet);
                    anAction.setParameter("sessionKey", "foo");
                    anAction.setParameter("sessionValue", "bar");
                    actionService.createRuleAction(ruleUnderTest.key, anAction).subscribe(function (action) {
                        expect(action.isPersisted()).toBe(true, "Action is not persisted!");
                        done();
                    });
                });
                it("Action being added to the owning rule is persisted to server.", function (done) {
                    var anAction = new Rule_1.ActionModel(null, setSessionActionlet);
                    anAction.setParameter("sessionKey", "foo");
                    anAction.setParameter("sessionValue", "bar");
                    actionService.createRuleAction(ruleUnderTest.key, anAction).subscribe(function (action) {
                        ruleService.updateRule(ruleUnderTest.key, ruleUnderTest).subscribe(function () {
                            ruleService.loadRule(ruleUnderTest.key).subscribe(function (rule) {
                                expect(rule.ruleActions[action.key]).toBe(true);
                                var sub = actionService.allAsArray(rule.key, Object.keys(rule.ruleActions)).subscribe(function (actions) {
                                    console.log("Rule: ", rule);
                                    console.log("Rehydrated Rule: ", rule);
                                    console.log("Rehydrated Actions: ", actions);
                                    var rehydratedAction = actions[0];
                                    expect(rehydratedAction.getParameterValue("sessionKey")).toEqual("foo");
                                    sub.unsubscribe();
                                    done();
                                }, function (e) {
                                    console.log(e);
                                    expect(e).toBeUndefined("Test Failed");
                                });
                            });
                        });
                    });
                });
                it("Will add a new action parameters to an existing action.", function (done) {
                    var clientAction = new Rule_1.ActionModel(null, setSessionActionlet);
                    clientAction.setParameter("sessionKey", "foo");
                    clientAction.setParameter("sessionValue", "bar");
                    var key = "sessionKey";
                    var value = "aParamValue";
                    actionService.createRuleAction(ruleUnderTest.key, clientAction).subscribe(function () {
                        expect(clientAction.isPersisted()).toBe(true, "Action is not persisted!");
                        clientAction.setParameter(key, value);
                        actionService.updateRuleAction(ruleUnderTest.key, clientAction).subscribe(function () {
                            // savedAction is also the same instance as resultAction
                            actionService.get(ruleUnderTest.key, clientAction.key).subscribe(function (updatedAction) {
                                // updatedAction and clientAction SHOULD NOT be the same instance object.
                                updatedAction['abc123'] = 100;
                                expect(clientAction['abc123']).toBeUndefined();
                                expect(clientAction.getParameterValue(key)).toBe(value);
                                expect(updatedAction.getParameterValue(key)).toBe(value);
                                done();
                            });
                        });
                    });
                });
                it("Can update action parameter values on existing action.", function (done) {
                    var param1 = { key: 'sessionKey', v1: 'value1', v2: 'value2' };
                    var param2 = { key: 'sessionValue', v1: 'abc123', v2: 'def456' };
                    var clientAction = new Rule_1.ActionModel(null, setSessionActionlet);
                    clientAction.setParameter(param1.key, param1.v1);
                    clientAction.setParameter(param2.key, param2.v1);
                    actionService.createRuleAction(ruleUnderTest.key, clientAction).subscribe(function () {
                        clientAction.setParameter(param1.key, param1.v2);
                        actionService.updateRuleAction(ruleUnderTest.key, clientAction).subscribe(function () {
                            actionService.get(ruleUnderTest.key, clientAction.key).subscribe(function (updatedAction) {
                                expect(updatedAction.getParameterValue(param1.key)).toBe(param1.v2);
                                expect(updatedAction.getParameterValue(param2.key)).toBe(param2.v1);
                                done();
                            });
                        });
                    });
                });
            });
            Gen = (function () {
                function Gen() {
                }
                Gen.createRules = function (ruleService) {
                    console.log('Attempting to create rule.');
                    var rule = new Rule_1.RuleModel(null);
                    rule.enabled = true;
                    rule.name = "TestRule-" + new Date().getTime();
                    return ruleService.createRule(rule);
                };
                return Gen;
            }());
        }
    }
});
//# sourceMappingURL=Action.it-spec.js.map