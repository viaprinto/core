System.register(['@angular/core', 'rxjs/Rx', "../persistence/ApiRoot", "@angular/http", "./Rule"], function(exports_1, context_1) {
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
    var core_1, Rx_1, ApiRoot_1, http_1, Rule_1;
    var noop, ConditionService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (ApiRoot_1_1) {
                ApiRoot_1 = ApiRoot_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            }],
        execute: function() {
            noop = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i - 0] = arguments[_i];
                }
            };
            ConditionService = (function () {
                function ConditionService(apiRoot, http) {
                    this._apiRoot = apiRoot;
                    this._http = http;
                    this._baseUrl = apiRoot.baseUrl + "api/v1/sites/" + apiRoot.siteId + "/ruleengine/conditions";
                }
                ConditionService.prototype.makeRequest = function (childPath) {
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    return this._http.get(this._baseUrl + '/' + childPath, opts).map(function (res) {
                        return res.json();
                    }).catch(function (err, source) {
                        if (err && err.status === 404) {
                            console.log("Could not retrieve Condition Types: URL not valid.");
                        }
                        else if (err) {
                            console.log("Could not retrieve Condition Types.", "response status code: ", err.status, 'error:', err);
                        }
                        return Rx_1.Observable.empty();
                    });
                };
                ConditionService.toJson = function (condition) {
                    var json = {};
                    json.id = condition.key;
                    json.conditionlet = condition.type.key;
                    json.priority = condition.priority;
                    json.operator = condition.operator;
                    json.values = condition.parameters;
                    return json;
                };
                ConditionService.prototype.listForGroup = function (group, conditionTypes) {
                    var _this = this;
                    return Rx_1.Observable.from(Object.keys(group.conditions)).flatMap(function (conditionId) {
                        return _this.get(conditionId, conditionTypes);
                    }).reduce(function (acc, entity) {
                        acc.push(entity);
                        return acc;
                    }, []);
                };
                ConditionService.prototype.get = function (conditionId, conditionTypes) {
                    var conditionModelResult;
                    conditionModelResult = this.makeRequest(conditionId);
                    return conditionModelResult.map(function (entity) {
                        entity.id = conditionId;
                        entity._type = conditionTypes ? conditionTypes[entity.conditionlet] : null;
                        return ConditionService.fromServerConditionTransformFn(entity);
                    });
                };
                ConditionService.prototype.add = function (groupId, model) {
                    //console.log("api.rule-engine.ConditionService", "add", model)
                    if (!model.isValid()) {
                        throw new Error("This should be thrown from a checkValid function on the model, and should provide the info needed to make the user aware of the fix.");
                    }
                    var json = ConditionService.toJson(model);
                    json.owningGroup = groupId;
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    var add = this._http.post(this._baseUrl + '/', JSON.stringify(json), opts).map(function (res) {
                        var json = res.json();
                        model.key = json.id;
                        return model;
                    });
                    return add.catch(this._catchRequestError('add'));
                };
                ConditionService.prototype.save = function (groupId, model) {
                    console.log("api.rule-engine.ConditionService", "save", model);
                    if (!model.isValid()) {
                        throw new Error("This should be thrown from a checkValid function on the model, and should provide the info needed to make the user aware of the fix.");
                    }
                    if (!model.isPersisted()) {
                        this.add(groupId, model);
                    }
                    else {
                        var json = ConditionService.toJson(model);
                        json.owningGroup = groupId;
                        var opts = this._apiRoot.getDefaultRequestOptions();
                        var body = JSON.stringify(json);
                        var save = this._http.put(this._baseUrl + '/' + model.key, body, opts).map(function (res) {
                            return model;
                        });
                        return save.catch(this._catchRequestError("save"));
                    }
                };
                ConditionService.prototype.remove = function (model) {
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    var remove = this._http.delete(this._baseUrl + '/' + model.key, opts).map(function (res) {
                        return model;
                    });
                    return remove.catch(this._catchRequestError('remove'));
                };
                ConditionService.fromServerConditionTransformFn = function (condition) {
                    var conditionModel = null;
                    try {
                        conditionModel = new Rule_1.ConditionModel(condition);
                        var values_1 = condition['values'];
                        Object.keys(values_1).forEach(function (key) {
                            var x = values_1[key];
                            conditionModel.setParameter(key, x.value, x.priority);
                            console.log("ConditionService", "setting parameter", key, x);
                        });
                    }
                    catch (e) {
                        console.error("Error reading Condition.", e);
                        throw e;
                    }
                    return conditionModel;
                };
                ConditionService.prototype._catchRequestError = function (operation) {
                    return function (err) {
                        if (err && err.status === 404) {
                            console.log("Could not " + operation + " Condition: URL not valid.");
                        }
                        else if (err) {
                            console.log("Could not " + operation + " Condition.", "response status code: ", err.status, 'error:', err);
                        }
                        return Rx_1.Observable.empty();
                    };
                };
                ConditionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [ApiRoot_1.ApiRoot, http_1.Http])
                ], ConditionService);
                return ConditionService;
            }());
            exports_1("ConditionService", ConditionService);
        }
    }
});
//# sourceMappingURL=Condition.js.map