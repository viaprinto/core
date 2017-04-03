System.register(['@angular/core', '@angular/http', 'rxjs/Rx', "../persistence/ApiRoot", "./ServerSideFieldModel", "../system/locale/I18n", "../services/core-web-service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Rx_1, ApiRoot_1, ServerSideFieldModel_1, I18n_1, core_web_service_1;
    var RULE_CREATE, RULE_DELETE, RULE_UPDATE_NAME, RULE_UPDATE_ENABLED_STATE, V_RULE_UPDATE_EXPANDED_STATE, RULE_UPDATE_FIRE_ON, RULE_RULE_ACTION_CREATE, RULE_RULE_ACTION_DELETE, RULE_RULE_ACTION_UPDATE_TYPE, RULE_RULE_ACTION_UPDATE_PARAMETER, RULE_CONDITION_GROUP_UPDATE_OPERATOR, RULE_CONDITION_GROUP_DELETE, RULE_CONDITION_GROUP_CREATE, RULE_CONDITION_CREATE, RULE_CONDITION_DELETE, RULE_CONDITION_UPDATE_TYPE, RULE_CONDITION_UPDATE_PARAMETER, RULE_CONDITION_UPDATE_OPERATOR, idCounter, RuleEngineState, ActionModel, ConditionModel, ConditionGroupModel, RuleModel, DEFAULT_RULE, RuleService;
    function getNextId() {
        return 'tempId' + ++idCounter;
    }
    exports_1("getNextId", getNextId);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (ApiRoot_1_1) {
                ApiRoot_1 = ApiRoot_1_1;
            },
            function (ServerSideFieldModel_1_1) {
                ServerSideFieldModel_1 = ServerSideFieldModel_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (core_web_service_1_1) {
                core_web_service_1 = core_web_service_1_1;
            }],
        execute: function() {
            exports_1("RULE_CREATE", RULE_CREATE = 'RULE_CREATE');
            exports_1("RULE_DELETE", RULE_DELETE = 'RULE_DELETE');
            exports_1("RULE_UPDATE_NAME", RULE_UPDATE_NAME = 'RULE_UPDATE_NAME');
            exports_1("RULE_UPDATE_ENABLED_STATE", RULE_UPDATE_ENABLED_STATE = 'RULE_UPDATE_ENABLED_STATE');
            exports_1("V_RULE_UPDATE_EXPANDED_STATE", V_RULE_UPDATE_EXPANDED_STATE = 'V_RULE_UPDATE_EXPANDED_STATE');
            exports_1("RULE_UPDATE_FIRE_ON", RULE_UPDATE_FIRE_ON = 'RULE_UPDATE_FIRE_ON');
            exports_1("RULE_RULE_ACTION_CREATE", RULE_RULE_ACTION_CREATE = 'RULE_RULE_ACTION_CREATE');
            exports_1("RULE_RULE_ACTION_DELETE", RULE_RULE_ACTION_DELETE = 'RULE_RULE_ACTION_DELETE');
            exports_1("RULE_RULE_ACTION_UPDATE_TYPE", RULE_RULE_ACTION_UPDATE_TYPE = 'RULE_RULE_ACTION_UPDATE_TYPE');
            exports_1("RULE_RULE_ACTION_UPDATE_PARAMETER", RULE_RULE_ACTION_UPDATE_PARAMETER = 'RULE_RULE_ACTION_UPDATE_PARAMETER');
            exports_1("RULE_CONDITION_GROUP_UPDATE_OPERATOR", RULE_CONDITION_GROUP_UPDATE_OPERATOR = 'RULE_CONDITION_GROUP_UPDATE_OPERATOR');
            exports_1("RULE_CONDITION_GROUP_DELETE", RULE_CONDITION_GROUP_DELETE = 'RULE_CONDITION_GROUP_DELETE');
            exports_1("RULE_CONDITION_GROUP_CREATE", RULE_CONDITION_GROUP_CREATE = 'RULE_CONDITION_GROUP_CREATE');
            exports_1("RULE_CONDITION_CREATE", RULE_CONDITION_CREATE = 'RULE_CONDITION_CREATE');
            exports_1("RULE_CONDITION_DELETE", RULE_CONDITION_DELETE = 'RULE_CONDITION_DELETE');
            exports_1("RULE_CONDITION_UPDATE_TYPE", RULE_CONDITION_UPDATE_TYPE = 'RULE_CONDITION_UPDATE_TYPE');
            exports_1("RULE_CONDITION_UPDATE_PARAMETER", RULE_CONDITION_UPDATE_PARAMETER = 'RULE_CONDITION_UPDATE_PARAMETER');
            exports_1("RULE_CONDITION_UPDATE_OPERATOR", RULE_CONDITION_UPDATE_OPERATOR = 'RULE_CONDITION_UPDATE_OPERATOR');
            idCounter = 1000;
            RuleEngineState = (function () {
                function RuleEngineState() {
                    this.showRules = true;
                    this.globalError = null;
                    this.loading = true;
                    this.saving = false;
                    this.hasError = false;
                    this.filter = '';
                    this.deleting = false;
                }
                return RuleEngineState;
            }());
            exports_1("RuleEngineState", RuleEngineState);
            ActionModel = (function (_super) {
                __extends(ActionModel, _super);
                function ActionModel(key, type, priority) {
                    if (priority === void 0) { priority = 1; }
                    _super.call(this, key, type, priority);
                    this.priority = priority || 1;
                    this.type = type;
                }
                ActionModel.prototype.isValid = function () {
                    try {
                        return _super.prototype.isValid.call(this);
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                return ActionModel;
            }(ServerSideFieldModel_1.ServerSideFieldModel));
            exports_1("ActionModel", ActionModel);
            ConditionModel = (function (_super) {
                __extends(ConditionModel, _super);
                function ConditionModel(iCondition) {
                    _super.call(this, iCondition.id, iCondition._type);
                    this.operator = 'AND';
                    this.conditionlet = iCondition.conditionlet;
                    this.key = iCondition.id;
                    this.priority = iCondition.priority || 1;
                    this.type = iCondition._type;
                    this.operator = iCondition.operator || 'AND';
                }
                ConditionModel.prototype.isValid = function () {
                    try {
                        return !!this.getParameterValue('comparison') && _super.prototype.isValid.call(this);
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                return ConditionModel;
            }(ServerSideFieldModel_1.ServerSideFieldModel));
            exports_1("ConditionModel", ConditionModel);
            ConditionGroupModel = (function () {
                function ConditionGroupModel(iGroup) {
                    this._conditions = [];
                    Object.assign(this, iGroup);
                    this.key = iGroup.id;
                    this._id = this.key != null ? this.key : getNextId();
                    this.conditions = iGroup.conditions || {};
                }
                ConditionGroupModel.prototype.isPersisted = function () {
                    return this.key != null;
                };
                ConditionGroupModel.prototype.isValid = function () {
                    var valid = this.operator && (this.operator === 'AND' || this.operator === 'OR');
                    return valid;
                };
                return ConditionGroupModel;
            }());
            exports_1("ConditionGroupModel", ConditionGroupModel);
            RuleModel = (function () {
                function RuleModel(iRule) {
                    var _this = this;
                    this.enabled = false;
                    this.conditionGroups = {};
                    this.ruleActions = {};
                    this._expanded = false;
                    this._conditionGroups = [];
                    this._ruleActions = [];
                    this._saved = true;
                    this._saving = false;
                    this._deleting = true;
                    Object.assign(this, iRule);
                    this.key = iRule.id;
                    this._id = this.key != null ? this.key : getNextId();
                    var conGroups = Object.keys(iRule.conditionGroups || {});
                    conGroups.forEach(function (groupId) {
                        var g = _this.conditionGroups[groupId];
                        var mg = new ConditionGroupModel(Object.assign({ id: groupId }, g));
                        _this.conditionGroups[groupId] = mg;
                        _this._conditionGroups.push(mg);
                    });
                }
                RuleModel.prototype.isPersisted = function () {
                    return this.key != null;
                };
                RuleModel.prototype.isValid = function () {
                    var valid = !!this.name;
                    valid = valid && this.name.trim().length > 0;
                    return valid;
                };
                return RuleModel;
            }());
            exports_1("RuleModel", RuleModel);
            exports_1("DEFAULT_RULE", DEFAULT_RULE = {
                priority: 1,
                name: null,
                fireOn: "EVERY_PAGE",
                enabled: false,
                conditionGroups: {},
                ruleActions: {},
                _id: -1 + '',
                _expanded: false,
                _ruleActions: [],
                _conditionGroups: []
            });
            RuleService = (function (_super) {
                __extends(RuleService, _super);
                function RuleService(_apiRoot, _http, _resources) {
                    var _this = this;
                    _super.call(this, _apiRoot, _http);
                    this._apiRoot = _apiRoot;
                    this._resources = _resources;
                    this.ruleActionTypes$ = new Rx_1.BehaviorSubject([]);
                    this.conditionTypes$ = new Rx_1.BehaviorSubject([]);
                    this._ruleActions = {};
                    this._conditions = {};
                    this._ruleActionTypes = {};
                    this._ruleActionTypesAry = [];
                    this._conditionTypes = {};
                    this._conditionTypesAry = [];
                    this._rulesEndpointUrl = this._apiRoot.defaultSiteUrl + "/ruleengine/rules";
                    this._actionsEndpointUrl = this._apiRoot.defaultSiteUrl + "/ruleengine/actions";
                    this._conditionTypesEndpointUrl = this._apiRoot.baseUrl + "api/v1/system/ruleengine/conditionlets";
                    this._ruleActionTypesEndpointUrl = this._apiRoot.baseUrl + "api/v1/system/ruleengine/actionlets";
                    this._preCacheCommonResources(_resources);
                    this.loadActionTypes().subscribe(function (types) { return _this.ruleActionTypes$.next(types); });
                    this.loadConditionTypes().subscribe(function (types) { return _this.conditionTypes$.next(types); });
                }
                RuleService.prototype._preCacheCommonResources = function (resources) {
                    resources.get('api.sites.ruleengine').subscribe(function (rsrc) { });
                    resources.get('api.ruleengine.system').subscribe(function (rsrc) { });
                    resources.get('api.system.ruleengine').subscribe(function (rsrc) { });
                };
                RuleService.prototype.createRule = function (body) {
                    return this.request({
                        body: RuleService.fromClientRuleTransformFn(body),
                        method: http_1.RequestMethod.Post,
                        url: this._rulesEndpointUrl
                    }).map(function (result) {
                        body.key = result['id']; // @todo:ggranum type the POST result correctly.
                        return Object.assign({}, DEFAULT_RULE, body, result);
                    });
                };
                RuleService.prototype.deleteRule = function (ruleId) {
                    return this.request({
                        method: http_1.RequestMethod.Delete,
                        url: this._rulesEndpointUrl + "/" + ruleId
                    }).map(function (result) {
                        return { success: true };
                    });
                };
                RuleService.prototype.loadRules = function () {
                    return this.request({
                        method: http_1.RequestMethod.Get,
                        url: this._rulesEndpointUrl
                    }).map(RuleService.fromServerRulesTransformFn);
                };
                RuleService.prototype.loadRule = function (id) {
                    return this.request({
                        method: http_1.RequestMethod.Get,
                        url: this._rulesEndpointUrl + "/" + id
                    }).map(function (result) {
                        return Object.assign({ key: id }, DEFAULT_RULE, result);
                    });
                };
                RuleService.prototype.updateRule = function (id, rule) {
                    var result;
                    if (!id) {
                        result = this.createRule(rule);
                    }
                    else {
                        result = this.request({
                            body: RuleService.fromClientRuleTransformFn(rule),
                            method: http_1.RequestMethod.Put,
                            url: this._rulesEndpointUrl + "/" + id
                        }).map(function (result) {
                            var r = Object.assign({}, DEFAULT_RULE, result);
                            r.id = id;
                            return r;
                        });
                    }
                    return result;
                };
                RuleService.prototype.getConditionTypes = function () {
                    return this.request({
                        method: http_1.RequestMethod.Get,
                        url: this._conditionTypesEndpointUrl,
                    }).map(RuleService.fromServerServersideTypesTransformFn);
                };
                RuleService.prototype.getRuleActionTypes = function () {
                    return this.request({
                        method: http_1.RequestMethod.Get,
                        url: this._ruleActionTypesEndpointUrl,
                    }).map(RuleService.fromServerServersideTypesTransformFn);
                };
                RuleService.prototype.loadActionTypes = function () {
                    var obs;
                    if (this._ruleActionTypesAry.length) {
                        obs = Rx_1.Observable.from(this._ruleActionTypesAry);
                    }
                    else {
                        return this.actionAndConditionTypeLoader(this._doLoadRuleActionTypes(), this._ruleActionTypes);
                    }
                    return obs;
                };
                RuleService.prototype._doLoadRuleActionTypes = function () {
                    return this.request({
                        method: http_1.RequestMethod.Get,
                        url: this._ruleActionTypesEndpointUrl,
                    }).map(RuleService.fromServerServersideTypesTransformFn);
                };
                RuleService.prototype.actionAndConditionTypeLoader = function (requestObserver, typeMap) {
                    var _this = this;
                    return requestObserver.flatMap(function (types) {
                        return Rx_1.Observable.from(types).flatMap(function (type) {
                            return _this._resources.get(type.i18nKey + '.name', type.i18nKey).map(function (label) {
                                type._opt = { value: type.key, label: label };
                                return type;
                            });
                        }).reduce(function (types, type) {
                            types.push(type);
                            return types;
                        }, []).do(function (types) {
                            types = types.sort(function (typeA, typeB) {
                                return typeA._opt.label.localeCompare(typeB._opt.label);
                            });
                            types.forEach(function (type) {
                                typeMap[type.key] = type;
                            });
                            return types;
                        });
                    });
                };
                RuleService.prototype.loadConditionTypes = function () {
                    var obs;
                    if (this._conditionTypesAry.length) {
                        obs = Rx_1.Observable.from(this._conditionTypesAry);
                    }
                    else {
                        return this.actionAndConditionTypeLoader(this._doLoadConditionTypes(), this._conditionTypes);
                    }
                    return obs;
                };
                RuleService.prototype._doLoadConditionTypes = function () {
                    return this.request({
                        method: http_1.RequestMethod.Get,
                        url: this._conditionTypesEndpointUrl,
                    }).map(RuleService.fromServerServersideTypesTransformFn);
                };
                RuleService.fromServerRulesTransformFn = function (ruleMap) {
                    return Object.keys(ruleMap).map(function (id) {
                        var r = ruleMap[id];
                        r.id = id;
                        return new RuleModel(r);
                    });
                };
                RuleService.fromClientRuleTransformFn = function (rule) {
                    var sendRule = Object.assign({}, DEFAULT_RULE, rule);
                    sendRule.key = rule.key;
                    delete sendRule.id;
                    sendRule.conditionGroups = {};
                    sendRule._conditionGroups.forEach(function (conditionGroup) {
                        if (conditionGroup.key) {
                            var sendGroup_1 = {
                                operator: conditionGroup.operator,
                                priority: conditionGroup.priority,
                                conditions: {}
                            };
                            conditionGroup._conditions.forEach(function (condition) {
                                sendGroup_1.conditions[condition.key] = true;
                            });
                            sendRule.conditionGroups[conditionGroup.key] = sendGroup_1;
                        }
                    });
                    RuleService.removeMeta(sendRule);
                    return sendRule;
                };
                RuleService.removeMeta = function (entity) {
                    Object.keys(entity).forEach(function (key) {
                        if (key[0] == '_') {
                            delete entity[key];
                        }
                    });
                };
                RuleService.alphaSort = function (key) {
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
                RuleService.fromServerServersideTypesTransformFn = function (typesMap) {
                    var types = Object.keys(typesMap).map(function (key) {
                        var json = typesMap[key];
                        json.key = key;
                        return ServerSideFieldModel_1.ServerSideTypeModel.fromJson(json);
                    });
                    //console.log("RuleService", "fromServerServersideTypesTransformFn - loaded", types)
                    return types.filter(function (type) { return type.key != 'CountRulesActionlet'; });
                };
                RuleService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [ApiRoot_1.ApiRoot, http_1.Http, I18n_1.I18nService])
                ], RuleService);
                return RuleService;
            }(core_web_service_1.CoreWebService));
            exports_1("RuleService", RuleService);
        }
    }
});
//# sourceMappingURL=Rule.js.map