System.register(['../../api/rule-engine/Rule', '../../api/rule-engine/Condition', '@angular/core', '../../api/persistence/ApiRoot', '../../api/auth/UserModel', '../../api/rule-engine/Action', '../../api/rule-engine/ConditionGroup', "../system/locale/I18n", "@angular/http"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rule_1, Condition_1, core_1, ApiRoot_1, UserModel_1, Action_1, ConditionGroup_1, I18n_1, http_1;
    var injector, Gen;
    return {
        setters:[
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            },
            function (Condition_1_1) {
                Condition_1 = Condition_1_1;
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
            describe('Integration.api.rule-engine.ConditionService', function () {
                var ruleService;
                var ruleOnAddSub;
                var conditionGroupService;
                var conditionService;
                var ruleUnderTest;
                var groupUnderTest;
                var conditionTypes = {};
                var usersCountryConditionType;
                var requestHeaderConditionType;
                beforeAll(function (done) {
                    ruleService = injector.get(Rule_1.RuleService);
                    conditionGroupService = injector.get(ConditionGroup_1.ConditionGroupService);
                    conditionService = injector.get(Condition_1.ConditionService);
                    ruleService.getConditionTypes().subscribe(function (typesAry) {
                        typesAry.forEach(function (item) { return conditionTypes[item.key] = item; });
                        usersCountryConditionType = conditionTypes["UsersCountryConditionlet"];
                        requestHeaderConditionType = conditionTypes["RequestHeaderConditionlet"];
                        done();
                    });
                });
                beforeEach(function (done) {
                    ruleUnderTest = null;
                    groupUnderTest = null;
                    Gen.createRules(ruleService);
                    ruleOnAddSub = ruleService.loadRules().subscribe(function (rule) {
                        ruleUnderTest = rule[0];
                        groupUnderTest = new Rule_1.ConditionGroupModel({ operator: 'OR', priority: 1 });
                        conditionGroupService.createConditionGroup(ruleUnderTest.key, groupUnderTest).subscribe(function () { return done; });
                    });
                });
                afterEach(function (done) {
                    ruleService.deleteRule(ruleUnderTest.key).subscribe(function () {
                        ruleUnderTest = null;
                        ruleOnAddSub.unsubscribe();
                        done();
                    });
                });
                it("Has a rule and group that we can add conditions to", function () {
                    expect(ruleUnderTest.isPersisted()).toBe(true);
                    expect(groupUnderTest.isPersisted()).toBe(true);
                });
                it("Can add a new Condition", function (done) {
                    var aCondition = new Rule_1.ConditionModel({ _type: usersCountryConditionType });
                    aCondition.setParameter("sessionKey", "foo");
                    aCondition.setParameter("sessionValue", "bar");
                    conditionService.add(groupUnderTest.key, aCondition).subscribe(function (condition) {
                        //noinspection TypeScriptUnresolvedFunction
                        expect(condition.isPersisted()).toBe(true, "Condition is not persisted!");
                        done();
                    });
                });
                it("Condition being added to the owning group is persisted to server.", function (done) {
                    var aCondition = new Rule_1.ConditionModel({ _type: usersCountryConditionType });
                    aCondition.setParameter("comparatorValue", "is");
                    aCondition.setParameter("isoCode", "US");
                    // save the condition to the group:
                    conditionService.add(ruleUnderTest.key, aCondition).subscribe(function (condition) {
                        ruleService.loadRule(ruleUnderTest.key).subscribe(function (rule) {
                            var rehydratedGroup = rule.conditionGroups[groupUnderTest.key];
                            expect(rehydratedGroup).toBeDefined("The condition group should still exist");
                            expect(rehydratedGroup.conditions[condition.key]).toBeDefined("The condition should still exist as a child of the group.");
                            done();
                        });
                    });
                });
                it("Will add new condition parameters to an existing condition.", function (done) {
                    console.log("will add new ", "", requestHeaderConditionType);
                    var clientCondition = new Rule_1.ConditionModel({ type: requestHeaderConditionType });
                    clientCondition.setParameter("browser-header", "foo");
                    clientCondition.setParameter("header-value", "bar");
                    var key = "browser-header";
                    var value = "aParamValue";
                    conditionService.add(groupUnderTest.key, clientCondition).subscribe(function (resultCondition) {
                        // serverCondition is the same instance as resultCondition
                        expect(clientCondition.isPersisted()).toBe(true, "Condition is not persisted!");
                        clientCondition.setParameter(key, value);
                        conditionService.save(groupUnderTest.key, clientCondition).subscribe(function (savedCondition) {
                            // savedCondition is also the same instance as resultCondition
                            conditionService.get(clientCondition.key).subscribe(function (updatedCondition) {
                                updatedCondition['abc123'] = 100;
                                expect(clientCondition['abc123']).toBeUndefined("updatedCondition and clientCondition SHOULD NOT be the same instance object.");
                                expect(clientCondition.getParameterValue(key)).toBe(value);
                                expect(updatedCondition.getParameterValue(key)).toBe(value);
                                done();
                            });
                        });
                    });
                });
                it("Can update condition parameter values on existing condition.", function (done) {
                    var param1 = { key: 'browser-header', v1: 'value1', v2: 'value2' };
                    var param2 = { key: 'header-value', v1: 'abc123', v2: 'def456' };
                    var clientCondition = new Rule_1.ConditionModel({ type: requestHeaderConditionType });
                    clientCondition.setParameter(param1.key, param1.v1);
                    clientCondition.setParameter(param2.key, param2.v1);
                    conditionService.add(groupUnderTest.key, clientCondition).subscribe(function (resultCondition) {
                        clientCondition.setParameter(param1.key, param1.v2);
                        conditionService.save(groupUnderTest.key, clientCondition).subscribe(function (savedCondition) {
                            conditionService.get(clientCondition.key).subscribe(function (updatedCondition) {
                                expect(updatedCondition.getParameterValue(param1.key)).toBe(param1.v2);
                                expect(updatedCondition.getParameterValue(param2.key)).toBe(param2.v1);
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
//# sourceMappingURL=Condition.it-spec.js.map