System.register(['rxjs/Rx', "@angular/http", "@angular/core", "../persistence/ApiRoot", "./Rule"], function(exports_1, context_1) {
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
    var Rx_1, http_1, core_1, ApiRoot_1, Rule_1;
    var ConditionGroupService;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ApiRoot_1_1) {
                ApiRoot_1 = ApiRoot_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            }],
        execute: function() {
            ConditionGroupService = (function () {
                function ConditionGroupService(apiRoot, http) {
                    this._typeName = 'Condition Group';
                    this._apiRoot = apiRoot;
                    this._http = http;
                    this._baseUrl = apiRoot.baseUrl + 'api/v1/sites/' + apiRoot.siteId + '/ruleengine/rules';
                }
                ConditionGroupService.toJson = function (conditionGroup) {
                    var json = {};
                    json.id = conditionGroup.key;
                    json.operator = conditionGroup.operator;
                    json.priority = conditionGroup.priority;
                    json.conditions = conditionGroup.conditions;
                    return json;
                };
                ConditionGroupService.toJsonList = function (models) {
                    var list = {};
                    Object.keys(models).forEach(function (key) {
                        list[key] = ConditionGroupService.toJson(models[key]);
                    });
                    return list;
                };
                ConditionGroupService.prototype.makeRequest = function (path) {
                    var _this = this;
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    return this._http.get(path, opts).map(function (res) {
                        var json = res.json();
                        console.log("ConditionGroupService", "makeRequest-Response", json);
                        return json;
                    }).catch(function (err, source) {
                        if (err && err.status === 404) {
                            console.error("Could not retrieve " + _this._typeName + " : 404 path not valid.", path);
                        }
                        else if (err) {
                            console.log("Could not retrieve" + _this._typeName + ": Response status code: ", err.status, 'error:', err, path);
                        }
                        return Rx_1.Observable.empty();
                    });
                };
                ConditionGroupService.prototype.all = function (ruleKey, keys) {
                    var _this = this;
                    return Rx_1.Observable.from(keys).flatMap(function (groupKey) {
                        return _this.get(ruleKey, groupKey);
                    });
                };
                ConditionGroupService.prototype.allAsArray = function (ruleKey, keys) {
                    return this.all(ruleKey, keys).reduce(function (acc, group) {
                        acc.push(group);
                        return acc;
                    }, []);
                };
                ConditionGroupService.prototype.get = function (ruleKey, key) {
                    var result;
                    result = this.makeRequest(this._getPath(ruleKey, key)).map(function (json) {
                        json.id = key;
                        console.log("ConditionGroupService", "creatingConditionGroupFromJson≠≠");
                        return new Rule_1.ConditionGroupModel(json);
                    });
                    return result;
                };
                ConditionGroupService.prototype.createConditionGroup = function (ruleId, model) {
                    console.log("ConditionGroupService", "add", model);
                    if (!model.isValid()) {
                        throw new Error("This should be thrown from a checkValid function on the model, and should provide the info needed to make the user aware of the fix.");
                    }
                    var json = ConditionGroupService.toJson(model);
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    var path = this._getPath(ruleId);
                    var add = this._http.post(path, JSON.stringify(json), opts).map(function (res) {
                        var json = res.json();
                        model.key = json.id;
                        return model;
                    });
                    return add.catch(this._catchRequestError('add'));
                };
                ConditionGroupService.prototype._getPath = function (ruleKey, key) {
                    var p = this._baseUrl + '/' + ruleKey + '/conditionGroups/';
                    if (key) {
                        p = p + key;
                    }
                    return p;
                };
                ConditionGroupService.prototype.updateConditionGroup = function (ruleId, model) {
                    console.log("ConditionGroupService", "save");
                    if (!model.isValid()) {
                        throw new Error("This should be thrown from a checkValid function on the model, and should provide the info needed to make the user aware of the fix.");
                    }
                    if (!model.isPersisted()) {
                        this.createConditionGroup(ruleId, model);
                    }
                    else {
                        var json = ConditionGroupService.toJson(model);
                        var opts = this._apiRoot.getDefaultRequestOptions();
                        var save = this._http.put(this._getPath(ruleId, model.key), JSON.stringify(json), opts).map(function (res) {
                            return model;
                        });
                        return save.catch(this._catchRequestError("save"));
                    }
                };
                ConditionGroupService.prototype.remove = function (ruleId, model) {
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    var remove = this._http.delete(this._getPath(ruleId, model.key), opts).map(function (res) {
                        return model;
                    });
                    return remove.catch(this._catchRequestError('remove'));
                };
                ConditionGroupService.prototype._catchRequestError = function (operation) {
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
                ConditionGroupService._PATH = 'api/v1/ruleengine/rules';
                ConditionGroupService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [ApiRoot_1.ApiRoot, http_1.Http])
                ], ConditionGroupService);
                return ConditionGroupService;
            }());
            exports_1("ConditionGroupService", ConditionGroupService);
        }
    }
});
//# sourceMappingURL=ConditionGroup.js.map