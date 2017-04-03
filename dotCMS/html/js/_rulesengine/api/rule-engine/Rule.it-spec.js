System.register(['../../api/rule-engine/Rule', '../../api/rule-engine/Condition', '@angular/core', '../../api/persistence/ApiRoot', '../../api/auth/UserModel', '../../api/rule-engine/Action', '../../api/rule-engine/ConditionGroup', "../system/locale/I18n", "@angular/http", "rxjs/Observable", "./ServerSideFieldModel"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rule_1, Condition_1, core_1, ApiRoot_1, UserModel_1, Action_1, ConditionGroup_1, I18n_1, http_1, Observable_1, ServerSideFieldModel_1;
    var injector;
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
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ServerSideFieldModel_1_1) {
                ServerSideFieldModel_1 = ServerSideFieldModel_1_1;
            }],
        execute: function() {
            injector = core_1.Injector.resolveAndCreate([
                ApiRoot_1.ApiRoot,
                I18n_1.I18nService,
                UserModel_1.UserModel,
                Rule_1.RuleService,
                Action_1.ActionService,
                Condition_1.ConditionService,
                ConditionGroup_1.ConditionGroupService,
                http_1.HTTP_PROVIDERS
            ]);
            describe('Integration.api.rule-engine.RuleService', function () {
                var ruleService;
                var ruleActionService;
                var conditionService;
                var conditionGroupService;
                var rulesToRemove;
                beforeEach(function () {
                    ruleService = injector.get(Rule_1.RuleService);
                    ruleActionService = injector.get(Action_1.ActionService);
                    conditionService = injector.get(Condition_1.ConditionService);
                    conditionGroupService = injector.get(ConditionGroup_1.ConditionGroupService);
                    rulesToRemove = [];
                });
                afterAll(function (done) {
                    Observable_1.Observable.from(rulesToRemove).flatMap(function (ruleId) {
                        console.log("Removing rule: ", ruleId);
                        return ruleService.deleteRule(ruleId);
                    }).subscribe(function () { }, function (e) {
                        console.error("Error deleting rules after test", e);
                    }, function () {
                        done();
                    });
                });
                it("can create a rule when only name is specified.", function (done) {
                    var clientRule = {
                        name: "Test-Rule-" + new Date().getTime()
                    };
                    ruleService.createRule(new Rule_1.RuleModel(clientRule)).subscribe(function (serverRule) {
                        rulesToRemove.push(serverRule.key);
                        expect(serverRule.key).toBeDefined("Should have a key");
                        expect(serverRule.enabled).toBe(false);
                        expect(serverRule.name).toBe(clientRule.name);
                        expect(serverRule.fireOn).toBe(Rule_1.DEFAULT_RULE.fireOn);
                        expect(serverRule.priority).toBe(Rule_1.DEFAULT_RULE.priority);
                        var randomKey = 'abc_' + Math.round(Math.random() * 1000);
                        serverRule[randomKey] = "The object provided by the observer is not the same instance as the one added.";
                        expect(clientRule[randomKey]).not.toBe(serverRule[randomKey]);
                    }, function (e) { return console.error("error", e); }, done);
                });
                it("can update a rule's name.", function (done) {
                    var clientRule = {
                        name: "Test-Rule-" + new Date().getTime()
                    };
                    var name2 = clientRule.name + '-Updated';
                    ruleService.createRule(new Rule_1.RuleModel(clientRule)).flatMap(function (serverRule1) {
                        rulesToRemove.push(serverRule1.key);
                        expect(serverRule1.key).toBeDefined();
                        expect(serverRule1.name).toBe(clientRule.name);
                        serverRule1.name = name2;
                        return ruleService.updateRule(serverRule1.key, serverRule1);
                    }).subscribe(function (serverRule2) {
                        expect(serverRule2.id).toBeDefined();
                        expect(serverRule2.name).toBe(name2);
                        console.log("yay", serverRule2);
                    }, function (e) { return console.error("error", e); }, done);
                });
                it("can remove a rule.", function (done) {
                    var clientRule = {
                        name: "Test-Rule-" + new Date().getTime()
                    };
                    ruleService.createRule(new Rule_1.RuleModel(clientRule))
                        .flatMap(function (serverRule1) { return ruleService.deleteRule(serverRule1.key); })
                        .subscribe(function (result) {
                        expect(result.success).toBeTruthy("Result should be 'success:true'");
                    }, function (e) { return console.error("error", e); }, done);
                });
                it("can load a rule.", function (done) {
                    var clientRule = {
                        name: "Test-Rule-" + new Date().getTime()
                    };
                    var id;
                    ruleService.createRule(new Rule_1.RuleModel(clientRule))
                        .flatMap(function (serverRule) {
                        id = serverRule.key;
                        rulesToRemove.push(serverRule.key);
                        return ruleService.loadRule(serverRule.key);
                    })
                        .subscribe(function (result) {
                        expect(result.key).toBe(id);
                        expect(result.name).toBe(clientRule.name);
                    }, function (e) { return console.error("error", e); }, done);
                });
                it("can load all rules.", function (done) {
                    var clientRule1 = {
                        name: "Test-Rule-" + new Date().getTime()
                    };
                    var clientRule2 = {
                        name: "Test-Rule-" + new Date().getTime() + "-2"
                    };
                    var id;
                    var ourSavedRules;
                    Observable_1.Observable.merge(ruleService.createRule(new Rule_1.RuleModel(clientRule1)), ruleService.createRule(new Rule_1.RuleModel(clientRule2)))
                        .bufferCount(2, 0)
                        .flatMap(function (ourRules) {
                        ourSavedRules = ourRules;
                        ourRules.forEach(function (r) {
                            rulesToRemove.push(r.key);
                        });
                        return ruleService.loadRules();
                    })
                        .subscribe(function (rules) {
                        var onlyTestRules = rules.filter(function (rule) { return (rule.key == ourSavedRules[0].key || rule.key == ourSavedRules[1].key); });
                        console.log("alksdjf", onlyTestRules);
                        expect(onlyTestRules.length).toBe(2, "Both created rules should be in the loaded rules.");
                        done();
                    }, function (e) { return console.error("error", e); }, done);
                });
                it("Can create a rule for each fireOn type.", function (done) {
                    var fireOns = ["EVERY_PAGE",
                        "ONCE_PER_VISIT",
                        "ONCE_PER_VISITOR",
                        "EVERY_REQUEST"];
                    Observable_1.Observable.from(fireOns).subscribe(function (fireOn) {
                        var name = "Test-create_fireOn" + new Date().getTime();
                        ruleService.createRule(new Rule_1.RuleModel({
                            name: name,
                            enabled: true,
                            fireOn: fireOn,
                            priority: Math.floor(Math.random() * 100)
                        })).subscribe(function (serverRule) {
                            rulesToRemove.push(serverRule.key);
                            expect(serverRule.key).toBeDefined();
                            expect(serverRule.enabled).toBe(true);
                            expect(serverRule.name).toBe(name);
                            expect(serverRule.fireOn).toBe(fireOn);
                        }, function (e) {
                            expect(true).toBe(false, "Should not throw an error.");
                            done();
                        }, function () {
                            done();
                        });
                    });
                });
                it("Provides an error if no name specified.", function (done) {
                    var name = "";
                    ruleService.createRule(new Rule_1.RuleModel({
                        name: name,
                        enabled: true,
                        fireOn: "EVERY_REQUEST",
                        priority: Math.floor(Math.random() * 100)
                    })).subscribe(function (serverRule) {
                        expect(true).toBe(false, "Rule should require a name.");
                        done();
                    }, function (e) {
                        expect(e.message).toContain("'name' may not be empty");
                        done();
                    });
                });
                it("Provides an error if no fireOn specified.", function (done) {
                    var name = "ErrorIfNoFireOn-" + new Date().getTime();
                    ruleService.createRule(new Rule_1.RuleModel({
                        name: name,
                        enabled: true,
                        fireOn: "",
                        priority: Math.floor(Math.random() * 100)
                    })).subscribe(function (serverRule) {
                        expect(true).toBe(false, "Rule should require a fireOn value.");
                        done();
                    }, function (e) {
                        expect(e.message).toContain("'fireOn' {javax.validation.constraints.FireOn.message}");
                        done();
                    });
                });
                it("Can delete a persisted rule.", function (done) {
                    var name = "CanDelete-" + new Date().getTime();
                    ruleService.createRule(new Rule_1.RuleModel({
                        name: name,
                        enabled: true,
                        fireOn: "EVERY_REQUEST",
                        priority: Math.floor(Math.random() * 100)
                    })).subscribe(function (serverRule) {
                        expect(serverRule.key).toBeDefined();
                        ruleService.deleteRule(serverRule.key).subscribe(function (result) {
                            expect(result.success).toBe(true);
                            done();
                        }, function (e) {
                            fail(e);
                            done();
                        }, done);
                    });
                });
                xit("can create an action.", function (done) {
                    var clientRule = {
                        name: "Test-Rule-" + new Date().getTime()
                    };
                    var clientRuleAction = {
                        type: 'SetResponseHeaderActionlet',
                        priority: 10,
                        parameters: {
                            'headerKey': { key: 'headerKey', value: 'Hi', priority: 0 },
                            'headerValue': { key: 'headerValue', value: 'Bob', priority: 1 },
                        }
                    };
                    var serverRule;
                    ruleService.createRule(new Rule_1.RuleModel(clientRule)).flatMap(function (rule) {
                        serverRule = rule;
                        rulesToRemove.push(serverRule.key);
                        return ruleActionService.createRuleAction(serverRule.key, new Rule_1.ActionModel(null, null, clientRuleAction.priority));
                    }).subscribe(function (action) {
                        expect(action).toBeDefined();
                        expect(action.key).toBeDefined();
                        expect(serverRule.ruleActions[action.key]).toBeTruthy();
                        done();
                    }, function (e) {
                        fail(e);
                        done();
                    }, done);
                });
                xit("can update an action.", function (done) {
                    var clientRule = {
                        name: "Test-Rule-" + new Date().getTime()
                    };
                    var clientRuleAction = {
                        type: 'SetResponseHeaderActionlet',
                        priority: 10,
                        parameters: {
                            'headerKey': { key: 'headerKey', value: 'Hi', priority: 0 },
                            'headerValue': { key: 'headerValue', value: 'Bob', priority: 1 },
                        }
                    };
                    var serverRule;
                    ruleService.createRule(new Rule_1.RuleModel(clientRule)).flatMap(function (rule) {
                        serverRule = rule;
                        rulesToRemove.push(serverRule.key);
                        return ruleActionService.createRuleAction(serverRule.key, new Rule_1.ActionModel(null, new ServerSideFieldModel_1.ServerSideTypeModel(clientRuleAction.type, '', clientRuleAction.parameters), clientRuleAction.priority));
                    }).flatMap(function (action) {
                        return ruleActionService.updateRuleAction(serverRule.key, action);
                    }).subscribe(function (action) {
                        expect(action.key).toBeDefined("Action should be provided, with key applied.");
                        expect(action.priority).toBe(clientRuleAction.priority, "Priority should have been saved.");
                        done();
                    }, function (e) {
                        fail(e);
                        done();
                    }, done);
                });
                it("can create a condition group.", function (done) {
                    var clientRule = {
                        name: "Test-Rule-" + new Date().getTime()
                    };
                    var conditionGroup = {
                        priority: 10,
                        operator: 'AND',
                    };
                    var serverRule;
                    ruleService.createRule(new Rule_1.RuleModel(clientRule)).flatMap(function (rule) {
                        serverRule = rule;
                        rulesToRemove.push(serverRule.key);
                        return conditionGroupService.createConditionGroup(serverRule.key, new Rule_1.ConditionGroupModel(conditionGroup));
                    }).subscribe(function (serverGroup) {
                        expect(serverGroup).toBeDefined("Should create and provide a condition group.");
                        expect(serverGroup.key).toBeDefined("Group should have been assigned an ID by the PUT response.");
                    }, function (e) {
                        fail(e);
                        done();
                    }, done);
                });
                it("adds the conditionGroup to the owning rule.", function (done) {
                    var aConditionGroup = new Rule_1.ConditionGroupModel({ operator: 'OR', priority: 99 });
                    var clientRule = {
                        name: "Test-Rule-" + new Date().getTime()
                    };
                    var conditionGroup = {
                        priority: 10,
                        operator: 'AND',
                    };
                    var serverRule;
                    ruleService.createRule(new Rule_1.RuleModel(clientRule)).flatMap(function (rule) {
                        serverRule = rule;
                        rulesToRemove.push(serverRule.key);
                        return conditionGroupService.createConditionGroup(serverRule.key, aConditionGroup);
                    })
                        .subscribe(function (conditionGroup) {
                        ruleService.loadRule(serverRule.key).subscribe(function (rule) {
                            expect(rule.conditionGroups[conditionGroup.key]).toBeDefined("Well that's odd");
                            expect(rule.conditionGroups[conditionGroup.key].operator).toEqual("OR");
                            /* Now read the ConditionGroups off the rule we just got back. Add listener first, then trigger call. */
                            conditionGroupService.all(rule.key, Object.keys(rule.conditionGroups)).subscribe(function (conditionGroups) {
                                var condGroup = conditionGroups[0];
                                expect(conditionGroup.operator).toEqual("OR");
                                expect(conditionGroup.priority).toEqual(99);
                                done();
                            });
                        });
                    });
                });
                it("Can list condition types, and they are all persisted and valid.", function (done) {
                    var count = 0;
                    var subscription = ruleService.getConditionTypes().subscribe(function (types) {
                        types.forEach(function (type) {
                            expect(type.key).toBeDefined("Condition types are readonly and should always be persisted.");
                            expect(type.isValid()).toBe(true, "Condition types are readonly and should always be valid.");
                        });
                        done();
                    }, function (err) {
                        expect(err).toBeUndefined("error was thrown creating Rule.");
                        done();
                    }, function () {
                    });
                });
                it("There are (n) active condition types.", function (done) {
                    var implementedConditionTypeCount = 19;
                    ruleService.getConditionTypes().subscribe(function (types) {
                        expect(types.length).toEqual(implementedConditionTypeCount, "We have " + implementedConditionTypeCount + " implemented condition types.");
                        done();
                    });
                });
                it("There are (n) active rule action types.", function (done) {
                    var implementedActionTypeCount = 6;
                    ruleService.getRuleActionTypes().subscribe(function (types) {
                        expect(types.length).toEqual(implementedActionTypeCount, "We have " + implementedActionTypeCount + " implemented rule action types.");
                        done();
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=Rule.it-spec.js.map