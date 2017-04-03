System.register(['@angular/core', '@angular/common', "../../../api/rule-engine/Rule", "../../../api/rule-engine/ServerSideFieldModel", "./rule-engine", "../../../api/rule-engine/Condition", "../../../api/rule-engine/Action", "../../../api/rule-engine/ConditionGroup", "../../../api/system/locale/I18n", "rxjs/Observable", "../../../api/services/bundle-service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, Rule_1, ServerSideFieldModel_1, rule_engine_1, Condition_1, Action_1, ConditionGroup_1, I18n_1, Observable_1, bundle_service_1;
    var I8N_BASE, RuleEngineContainer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            },
            function (ServerSideFieldModel_1_1) {
                ServerSideFieldModel_1 = ServerSideFieldModel_1_1;
            },
            function (rule_engine_1_1) {
                rule_engine_1 = rule_engine_1_1;
            },
            function (Condition_1_1) {
                Condition_1 = Condition_1_1;
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
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (bundle_service_1_1) {
                bundle_service_1 = bundle_service_1_1;
            }],
        execute: function() {
            I8N_BASE = 'api.sites.ruleengine';
            /**
             *
             */
            RuleEngineContainer = (function () {
                function RuleEngineContainer(_ruleService, _ruleActionService, _conditionGroupService, _conditionService, _resources, bundleService) {
                    var _this = this;
                    this._ruleService = _ruleService;
                    this._ruleActionService = _ruleActionService;
                    this._conditionGroupService = _conditionGroupService;
                    this._conditionService = _conditionService;
                    this._resources = _resources;
                    this.bundleService = bundleService;
                    this.rules = [];
                    this.state = new Rule_1.RuleEngineState();
                    this.environments = [];
                    this.rules$ = new core_1.EventEmitter();
                    this.ruleActions$ = new core_1.EventEmitter();
                    this.conditionGroups$ = new core_1.EventEmitter();
                    this.rules$.subscribe(function (rules) {
                        //console.log("RuleEngineContainer", "rules$.subscribe", rules)
                        _this.rules = rules;
                    });
                    this.bundleService.loadPublishEnvironments().subscribe(function (environments) { return _this.environments = environments; });
                    this.initRules();
                }
                RuleEngineContainer.prototype.preCacheCommonResources = function (resources) {
                    resources.get('api.sites.ruleengine').subscribe(function (rsrc) { });
                    resources.get('api.ruleengine.system').subscribe(function (rsrc) { });
                    resources.get('api.system.ruleengine').subscribe(function (rsrc) { });
                };
                RuleEngineContainer.prototype.initRules = function () {
                    var _this = this;
                    this.state.loading = true;
                    this._ruleService.loadRules().subscribe(function (rules) {
                        rules.sort(function (a, b) {
                            return b.priority - a.priority;
                        });
                        _this.rules$.emit(rules);
                        _this.state.loading = false;
                    }, function (err) {
                        _this.state.loading = false;
                        if (err.response.status === 403) {
                            _this.state.showRules = false;
                            _this._handle403Error(err);
                        }
                    });
                };
                RuleEngineContainer.prototype.alphaSort = function (key) {
                    return function (a, b) {
                        var x;
                        if (a[key] > b[key]) {
                            x = 1;
                        }
                        else if (a[key] < b[key]) {
                            x = -1;
                        }
                        else {
                            x = 0;
                        }
                        return x;
                    };
                };
                /**
                 *
                 export const RULE_CREATE = 'RULE_CREATE'
                 export const RULE_DELETE = 'RULE_DELETE'
                 export const RULE_UPDATE_NAME = 'RULE_UPDATE_NAME'
                 export const RULE_UPDATE_FIRE_ON = 'RULE_UPDATE_FIRE_ON'
              
                 * @param event
                 */
                RuleEngineContainer.prototype.onCreateRule = function (event) {
                    console.log("RuleEngineContainer", "onCreateRule", event);
                    var priority = this.rules.length ? this.rules[0].priority + 1 : 1;
                    var rule = new Rule_1.RuleModel({ priority: priority });
                    var group = new Rule_1.ConditionGroupModel({ priority: 1, operator: 'AND' });
                    group._conditions.push(new Rule_1.ConditionModel({ _type: new ServerSideFieldModel_1.ServerSideTypeModel() }));
                    rule._conditionGroups.push(group);
                    var action = new Rule_1.ActionModel(null, new ServerSideFieldModel_1.ServerSideTypeModel());
                    action._owningRule = rule;
                    rule._ruleActions.push(action);
                    rule._saved = false;
                    rule._expanded = true;
                    this.rules$.emit([rule].concat(this.rules));
                };
                RuleEngineContainer.prototype.onDeleteRule = function (event) {
                    var _this = this;
                    //console.log("RuleEngineContainer", "onDeleteRule")
                    var rule = event.payload.rule;
                    rule._deleting = true;
                    this.state.deleting = true;
                    if (rule.isPersisted()) {
                        this._ruleService.deleteRule(rule.key).subscribe(function (result) {
                            _this.state.deleting = false;
                        });
                    }
                    var rules = this.rules.filter(function (arrayRule) { return arrayRule.key !== rule.key; });
                    this.rules$.emit(rules);
                };
                RuleEngineContainer.prototype.onUpdateEnabledState = function (event) {
                    //console.log("RuleEngineContainer", "onUpdateEnabledState", event)
                    event.payload.rule.enabled = event.payload.value;
                    this.patchRule(event.payload.rule, false);
                };
                RuleEngineContainer.prototype.onUpdateRuleName = function (event) {
                    //console.log("RuleEngineContainer", "onUpdateRuleName", event)
                    event.payload.rule.name = event.payload.value;
                    this.patchRule(event.payload.rule, false);
                };
                RuleEngineContainer.prototype.onUpdateFireOn = function (event) {
                    console.log("RuleEngineContainer", "onUpdateFireOn", event);
                    event.payload.rule.fireOn = event.payload.value;
                    this.patchRule(event.payload.rule, false);
                };
                RuleEngineContainer.prototype.onUpdateExpandedState = function (event) {
                    var _this = this;
                    /**
                     * .flatMap(conditionJson => {
                      return this._conditionTypeService.get(conditionJson.conditionlet).map((type:ServerSideTypeModel) => {
                        return ConditionService.fromJson(group, conditionId, conditionJson, type)
                      })
                    })
                     */
                    var rule = event.payload.rule;
                    rule._expanded = event.payload.value;
                    if (rule._expanded) {
                        var obs2 = void 0;
                        if (rule._conditionGroups.length == 0) {
                            var obs = this._conditionGroupService.allAsArray(rule.key, Object.keys(rule.conditionGroups));
                            obs2 = obs.flatMap(function (groups) { return Observable_1.Observable.from(groups); });
                        }
                        else {
                            obs2 = Observable_1.Observable.from(rule._conditionGroups);
                        }
                        var obs3 = obs2.flatMap(function (group) { return _this._conditionService.listForGroup(group, _this._ruleService._conditionTypes); }, function (group, conditions) {
                            if (conditions) {
                                conditions.forEach(function (condition) {
                                    condition.type = _this._ruleService._conditionTypes[condition.conditionlet];
                                });
                            }
                            group._conditions = conditions;
                            return group;
                        });
                        var obs4 = obs3.reduce(function (acc, group) {
                            acc.push(group);
                            return acc;
                        }, []);
                        obs4.subscribe(function (groups) {
                            rule._conditionGroups = groups;
                            if (rule._conditionGroups.length === 0) {
                                console.log("RuleEngineContainer", "conditionGroups", "Add stub group");
                                var group = new Rule_1.ConditionGroupModel({ operator: 'AND', priority: 1 });
                                group._conditions.push(new Rule_1.ConditionModel({ priority: 1, _type: new ServerSideFieldModel_1.ServerSideTypeModel(), operator: 'AND' }));
                                rule._conditionGroups.push(group);
                            }
                            else {
                                rule._conditionGroups.sort(_this.prioritySortFn);
                                rule._conditionGroups.forEach(function (group) {
                                    group._conditions.sort(_this.prioritySortFn);
                                    if (group._conditions.length === 0) {
                                        group._conditions.push(new Rule_1.ConditionModel({ priority: 1, _type: new ServerSideFieldModel_1.ServerSideTypeModel(), operator: 'AND' }));
                                    }
                                });
                            }
                        }, function (e) {
                            console.error("RuleEngineContainer", e);
                        });
                        if (rule._ruleActions.length == 0) {
                            this._ruleActionService.allAsArray(rule.key, Object.keys(rule.ruleActions), this._ruleService._ruleActionTypes).subscribe(function (actions) {
                                rule._ruleActions = actions;
                                if (rule._ruleActions.length === 0) {
                                    var action = new Rule_1.ActionModel(null, new ServerSideFieldModel_1.ServerSideTypeModel(), 1);
                                    rule._ruleActions.push(action);
                                    rule._ruleActions.sort(_this.prioritySortFn);
                                }
                                else {
                                    rule._ruleActions.sort(_this.prioritySortFn);
                                }
                            });
                        }
                    }
                };
                RuleEngineContainer.prototype.onCreateRuleAction = function (event) {
                    console.log("RuleEngineContainer", "onCreateRuleAction", event);
                    var rule = event.payload.rule;
                    var priority = rule._ruleActions.length ? rule._ruleActions[rule._ruleActions.length - 1].priority + 1 : 1;
                    var entity = new Rule_1.ActionModel(null, new ServerSideFieldModel_1.ServerSideTypeModel(), priority);
                    this.patchRule(rule, true);
                    rule._ruleActions.push(entity);
                    rule._saved = false;
                };
                RuleEngineContainer.prototype.onDeleteRuleAction = function (event) {
                    console.log("RuleEngineContainer", "onDeleteRuleAction", event);
                    var rule = event.payload.rule;
                    var ruleAction = event.payload.ruleAction;
                    if (ruleAction.isPersisted()) {
                        this._ruleActionService.remove(rule.key, ruleAction).subscribe(function (result) {
                            rule._ruleActions = rule._ruleActions.filter(function (aryAction) {
                                return aryAction.key != ruleAction.key;
                            });
                            if (rule._ruleActions.length === 0) {
                                rule._ruleActions.push(new Rule_1.ActionModel(null, new ServerSideFieldModel_1.ServerSideTypeModel(), 1));
                            }
                        });
                    }
                };
                RuleEngineContainer.prototype.onUpdateRuleActionType = function (event) {
                    console.log("RuleEngineContainer", "onUpdateRuleActionType");
                    try {
                        var ruleAction = event.payload.ruleAction;
                        var rule = event.payload.rule;
                        var idx = event.payload.index;
                        var type = this._ruleService._ruleActionTypes[event.payload.value];
                        rule._ruleActions[idx] = new Rule_1.ActionModel(ruleAction.key, type, ruleAction.priority);
                        this.patchAction(rule, ruleAction);
                    }
                    catch (e) {
                        console.error("RuleComponent", "onActionTypeChange", e);
                    }
                };
                RuleEngineContainer.prototype.onUpdateRuleActionParameter = function (event) {
                    console.log("RuleEngineContainer", "onUpdateRuleActionParameter");
                    var ruleAction = event.payload.ruleAction;
                    ruleAction.setParameter(event.payload.name, event.payload.value);
                    this.patchAction(event.payload.rule, ruleAction);
                };
                RuleEngineContainer.prototype.onCreateConditionGroup = function (event) {
                    console.log("RuleEngineContainer", "onCreateConditionGroup");
                    var rule = event.payload.rule;
                    var priority = rule._conditionGroups.length ? rule._conditionGroups[rule._conditionGroups.length - 1].priority + 1 : 1;
                    var group = new Rule_1.ConditionGroupModel({ operator: 'AND', priority: priority });
                    group._conditions.push(new Rule_1.ConditionModel({ priority: 1, _type: new ServerSideFieldModel_1.ServerSideTypeModel(), operator: 'AND' }));
                    rule._conditionGroups.push(group);
                    rule._conditionGroups.sort(this.prioritySortFn);
                };
                RuleEngineContainer.prototype.onUpdateConditionGroupOperator = function (event) {
                    console.log("RuleEngineContainer", "onUpdateConditionGroupOperator");
                    var group = event.payload.conditionGroup;
                    group.operator = event.payload.value;
                    if (group.key != null) {
                        this.patchConditionGroup(event.payload.rule, group);
                        this.patchRule(event.payload.rule);
                    }
                };
                RuleEngineContainer.prototype.onDeleteConditionGroup = function (event) {
                    var rule = event.payload.rule;
                    var group = event.payload.conditionGroup;
                    this._conditionGroupService.remove(rule.key, group).subscribe();
                    rule._conditionGroups = rule._conditionGroups.filter(function (aryGroup) { return aryGroup.key != group.key; });
                };
                RuleEngineContainer.prototype.onCreateCondition = function (event) {
                    var rule = event.payload.rule;
                    this.ruleUpdating(rule, true);
                    try {
                        var group = event.payload.conditionGroup;
                        var priority = group._conditions.length ? group._conditions[group._conditions.length - 1].priority + 1 : 1;
                        var entity = new Rule_1.ConditionModel({ priority: priority, _type: new ServerSideFieldModel_1.ServerSideTypeModel(), operator: 'AND' });
                        group._conditions.push(entity);
                        this.ruleUpdated(rule);
                    }
                    catch (e) {
                        console.error("RuleEngineContainer", "onCreateCondition", e);
                        this.ruleUpdated(rule, [{ unhandledError: e }]);
                    }
                };
                RuleEngineContainer.prototype.onUpdateConditionType = function (event) {
                    console.log("RuleEngineContainer", "onUpdateConditionType");
                    try {
                        var condition = event.payload.condition;
                        var group = event.payload.conditionGroup;
                        var rule = event.payload.rule;
                        var idx = event.payload.index;
                        var type = this._ruleService._conditionTypes[event.payload.value];
                        // replace the condition rather than mutate it to force event for 'onPush' NG2 components.
                        condition = new Rule_1.ConditionModel({ id: condition.key, _type: type, priority: condition.priority, operator: condition.operator });
                        group._conditions[idx] = condition;
                        this.patchCondition(rule, group, condition);
                    }
                    catch (e) {
                        console.error("RuleComponent", "onActionTypeChange", e);
                    }
                };
                RuleEngineContainer.prototype.onUpdateConditionParameter = function (event) {
                    console.log("RuleEngineContainer", "onUpdateConditionParameter");
                    var condition = event.payload.condition;
                    condition.setParameter(event.payload.name, event.payload.value);
                    this.patchCondition(event.payload.rule, event.payload.conditionGroup, condition);
                };
                RuleEngineContainer.prototype.onUpdateConditionOperator = function (event) {
                    console.log("RuleEngineContainer", "onUpdateConditionOperator");
                    var condition = event.payload.condition;
                    condition.operator = event.payload.value;
                    this.patchCondition(event.payload.rule, event.payload.conditionGroup, condition);
                };
                RuleEngineContainer.prototype.onDeleteCondition = function (event) {
                    var _this = this;
                    console.log("RuleEngineContainer", "onDeleteCondition", event);
                    var rule = event.payload.rule;
                    var group = event.payload.conditionGroup;
                    var condition = event.payload.condition;
                    if (condition.isPersisted()) {
                        this._conditionService.remove(condition).subscribe(function (result) {
                            group._conditions = group._conditions.filter(function (aryCondition) {
                                return aryCondition.key != condition.key;
                            });
                            if (group._conditions.length === 0) {
                                console.log("RuleEngineContainer", "condition", "Remove Condition and remove Groups is empty");
                                _this._conditionGroupService.remove(rule.key, group).subscribe();
                                rule._conditionGroups = rule._conditionGroups.filter(function (aryGroup) { return aryGroup.key != group.key; });
                            }
                            if (rule._conditionGroups.length === 0) {
                                console.log("RuleEngineContainer", "conditionGroups", "Add stub group if Groups are empty");
                                var group_1 = new Rule_1.ConditionGroupModel({ operator: 'AND', priority: 1 });
                                group_1._conditions.push(new Rule_1.ConditionModel({ priority: 1, _type: new ServerSideFieldModel_1.ServerSideTypeModel(), operator: 'AND' }));
                                rule._conditionGroups.push(group_1);
                            }
                        });
                    }
                };
                RuleEngineContainer.prototype.ruleUpdating = function (rule, disable) {
                    if (disable === void 0) { disable = true; }
                    if (disable && rule.enabled && rule.key) {
                        console.log("RuleEngineContainer", "ruleUpdating", "disabling rule due for edit.");
                        this.patchRule(rule, true);
                    }
                    rule._saved = false;
                    rule._saving = true;
                    rule._errors = null;
                };
                RuleEngineContainer.prototype.ruleUpdated = function (rule, errors) {
                    rule._saving = false;
                    if (!errors) {
                        rule._saved = true;
                    }
                    else {
                        console.error(errors);
                        rule._errors = errors;
                    }
                };
                RuleEngineContainer.prototype.patchConditionGroup = function (rule, group, disable) {
                    if (disable === void 0) { disable = true; }
                    this.ruleUpdating(rule, false);
                    if (disable && rule.enabled) {
                        rule.enabled = false;
                    }
                    this._conditionGroupService.updateConditionGroup(rule.key, group).subscribe(function (result) {
                    });
                };
                RuleEngineContainer.prototype.patchRule = function (rule, disable) {
                    var _this = this;
                    if (disable === void 0) { disable = true; }
                    this.ruleUpdating(rule, false);
                    if (disable && rule.enabled) {
                        rule.enabled = false;
                    }
                    if (rule.isValid()) {
                        if (rule.isPersisted()) {
                            this._ruleService.updateRule(rule.key, rule).subscribe(function () {
                                _this.ruleUpdated(rule);
                            }, function (e) {
                                var ruleError = _this._handle403Error(e) ? null : { invalid: e.message };
                                _this.ruleUpdated(rule, ruleError);
                            });
                        }
                        else {
                            this._ruleService.createRule(rule).subscribe(function () {
                                _this.ruleUpdated(rule);
                            }, function (e) {
                                var ruleError = _this._handle403Error(e) ? null : { invalid: e.message };
                                _this.ruleUpdated(rule, ruleError);
                            });
                        }
                    }
                    else {
                        this.ruleUpdated(rule, {
                            invalid: "Cannot save, rule is not valid."
                        });
                    }
                    // this.updateActiveRuleCount()
                };
                RuleEngineContainer.prototype.patchAction = function (rule, ruleAction) {
                    var _this = this;
                    this.ruleUpdating(rule);
                    if (ruleAction.isValid()) {
                        if (!ruleAction.isPersisted()) {
                            this._ruleActionService.createRuleAction(rule.key, ruleAction).subscribe(function (result) {
                                _this.ruleUpdated(rule);
                            }, function (e) {
                                var ruleError = _this._handle403Error(e) ? null : { invalid: e.message };
                                _this.ruleUpdated(rule, ruleError);
                            });
                        }
                        else {
                            this._ruleActionService.updateRuleAction(rule.key, ruleAction).subscribe(function (result) {
                                _this.ruleUpdated(rule);
                            }, function (e) {
                                var ruleError = _this._handle403Error(e) ? null : { invalid: e.message };
                                _this.ruleUpdated(rule, ruleError);
                            });
                        }
                    }
                    else {
                        this.ruleUpdated(rule, {
                            invalid: "Cannot save, action is not valid."
                        });
                    }
                };
                RuleEngineContainer.prototype.patchCondition = function (rule, group, condition) {
                    var _this = this;
                    this.ruleUpdating(rule);
                    try {
                        if (condition.isValid()) {
                            if (condition.isPersisted()) {
                                this._conditionService.save(group.key, condition).subscribe(function (result) {
                                    _this.ruleUpdated(rule);
                                }, function (e) {
                                    var ruleError = _this._handle403Error(e) ? null : { invalid: e.message };
                                    _this.ruleUpdated(rule, ruleError);
                                });
                            }
                            else {
                                if (!group.isPersisted()) {
                                    this._conditionGroupService.createConditionGroup(rule.key, group).subscribe(function (foo) {
                                        _this._conditionService.add(group.key, condition).subscribe(function () {
                                            group.conditions[condition.key] = true;
                                            _this.ruleUpdated(rule);
                                        }, function (e) {
                                            var ruleError = _this._handle403Error(e) ? null : { invalid: e.message };
                                            _this.ruleUpdated(rule, ruleError);
                                        });
                                    });
                                }
                                else {
                                    this._conditionService.add(group.key, condition).subscribe(function () {
                                        group.conditions[condition.key] = true;
                                        _this.ruleUpdated(rule);
                                    }, function (e) {
                                        var ruleError = _this._handle403Error(e) ? null : { invalid: e.message };
                                        _this.ruleUpdated(rule, ruleError);
                                    });
                                }
                            }
                        }
                        else {
                            console.log("RuleEngineContainer", "patchCondition", "Not valid");
                            rule._saving = false;
                            rule._errors = { invalid: "Condition not valid." };
                        }
                    }
                    catch (e) {
                        console.error(e);
                        this.ruleUpdated(rule, { invalid: e.message });
                    }
                };
                RuleEngineContainer.prototype.prioritySortFn = function (a, b) {
                    return a.priority - b.priority;
                };
                RuleEngineContainer.prototype._handle403Error = function (e) {
                    var handled = false;
                    try {
                        if (e && e.response.status == 403) {
                            var errorJson = e.response.json();
                            if (errorJson && errorJson.error) {
                                this.state.globalError = errorJson.error.replace('dotcms.api.error.forbidden: ', '');
                                handled = true;
                            }
                        }
                    }
                    catch (e) {
                        console.error("Error while processing invalid response: ", e);
                    }
                    return handled;
                };
                RuleEngineContainer = __decorate([
                    core_1.Component({
                        selector: 'cw-rule-engine-container',
                        directives: [common_1.CORE_DIRECTIVES, rule_engine_1.RuleEngineComponent],
                        template: "\n    <cw-rule-engine\n      [environmentStores]=\"environments\"\n      [rules]=\"rules\"\n      [ruleActionTypes]=\"_ruleService._ruleActionTypes\"\n      [conditionTypes]=\"_ruleService._conditionTypes\"\n      [loading]=\"state.loading\"\n      [showRules]=\"state.showRules\"\n      [globalError]=\"state.globalError\"\n      (createRule)=\"onCreateRule($event)\"\n      (deleteRule)=\"onDeleteRule($event)\"\n      (updateName)=\"onUpdateRuleName($event)\"\n      (updateFireOn)=\"onUpdateFireOn($event)\"\n      (updateEnabledState)=\"onUpdateEnabledState($event)\"\n      (updateExpandedState)=\"onUpdateExpandedState($event)\"\n\n      (createRuleAction)=\"onCreateRuleAction($event)\"\n      (updateRuleActionType)=\"onUpdateRuleActionType($event)\"\n      (updateRuleActionParameter)=\"onUpdateRuleActionParameter($event)\"\n      (deleteRuleAction)=\"onDeleteRuleAction($event)\"\n\n      (createConditionGroup)=\"onCreateConditionGroup($event)\"\n      (updateConditionGroupOperator)=\"onUpdateConditionGroupOperator($event)\"\n      (createCondition)=\"onCreateCondition($event)\"\n      (updateConditionType)=\"onUpdateConditionType($event)\"\n      (updateConditionParameter)=\"onUpdateConditionParameter($event)\"\n      (updateConditionOperator)=\"onUpdateConditionOperator($event)\"\n      (deleteCondition)=\"onDeleteCondition($event)\"\n    ></cw-rule-engine>\n"
                    }), 
                    __metadata('design:paramtypes', [Rule_1.RuleService, Action_1.ActionService, ConditionGroup_1.ConditionGroupService, Condition_1.ConditionService, I18n_1.I18nService, bundle_service_1.BundleService])
                ], RuleEngineContainer);
                return RuleEngineContainer;
            }());
            exports_1("RuleEngineContainer", RuleEngineContainer);
        }
    }
});
//# sourceMappingURL=rule-engine.container.js.map