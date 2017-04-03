System.register(['@angular/core', 'rxjs/Rx', "../persistence/ApiRoot", "@angular/http", "./Rule", "../system/http-response-util"], function(exports_1, context_1) {
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
    var core_1, Rx_1, ApiRoot_1, http_1, Rule_1, http_response_util_1;
    var noop, ActionService;
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
            },
            function (http_response_util_1_1) {
                http_response_util_1 = http_response_util_1_1;
            }],
        execute: function() {
            noop = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i - 0] = arguments[_i];
                }
            };
            ActionService = (function () {
                function ActionService(apiRoot, http) {
                    this._typeName = "Action";
                    this._apiRoot = apiRoot;
                    this._http = http;
                    this._actionsEndpointUrl = apiRoot.baseUrl + "api/v1/sites/" + apiRoot.siteId + "/ruleengine/actions/";
                }
                ActionService.fromJson = function (type, json) {
                    var ra = new Rule_1.ActionModel(json.key, type, json.priority);
                    Object.keys(json.parameters).forEach(function (key) {
                        var param = json.parameters[key];
                        ra.setParameter(key, param.value);
                    });
                    return ra;
                };
                ActionService.toJson = function (action) {
                    var json = {};
                    json.actionlet = action.type.key;
                    json.priority = action.priority;
                    json.parameters = action.parameters;
                    return json;
                };
                ActionService.prototype.makeRequest = function (childPath) {
                    var _this = this;
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    var path = this._actionsEndpointUrl;
                    if (childPath) {
                        path = "" + path + childPath;
                    }
                    return this._http.get(path, opts).map(function (res) {
                        return res.json();
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
                ActionService.prototype.allAsArray = function (ruleKey, keys, ruleActionTypes) {
                    return this.all(ruleKey, keys, ruleActionTypes).reduce(function (acc, item) {
                        acc.push(item);
                        return acc;
                    }, []);
                };
                ActionService.prototype.all = function (ruleKey, keys, ruleActionTypes) {
                    var _this = this;
                    return Rx_1.Observable.from(keys).flatMap(function (groupKey) {
                        return _this.get(ruleKey, groupKey, ruleActionTypes);
                    });
                };
                ActionService.prototype.get = function (ruleKey, key, ruleActionTypes) {
                    var result;
                    return this.makeRequest(key).map(function (json) {
                        json.id = key;
                        json.key = key;
                        return ActionService.fromJson(ruleActionTypes[json.actionlet], json);
                    });
                };
                ActionService.prototype.createRuleAction = function (ruleId, model) {
                    console.log("Action", "add", model);
                    if (!model.isValid()) {
                        throw new Error("This should be thrown from a checkValid function on the model, and should provide the info needed to make the user aware of the fix.");
                    }
                    var json = ActionService.toJson(model);
                    json.owningRule = ruleId;
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    var path = this._getPath(ruleId);
                    var add = this._http.post(path, JSON.stringify(json), opts).map(function (res) {
                        var json = res.json();
                        model.key = json.id;
                        return model;
                    });
                    return add.catch(this._catchRequestError('add'));
                };
                ActionService.prototype._getPath = function (ruleKey, key) {
                    var p = this._actionsEndpointUrl;
                    if (key) {
                        p = p + key;
                    }
                    return p;
                };
                ActionService.prototype.updateRuleAction = function (ruleId, model) {
                    console.log("actionService", "save");
                    if (!model.isValid()) {
                        throw new Error("This should be thrown from a checkValid function on the model, and should provide the info needed to make the user aware of the fix.");
                    }
                    if (!model.isPersisted()) {
                        this.createRuleAction(ruleId, model);
                    }
                    else {
                        var json = ActionService.toJson(model);
                        json.owningRule = ruleId;
                        var opts = this._apiRoot.getDefaultRequestOptions();
                        var save = this._http.put(this._getPath(ruleId, model.key), JSON.stringify(json), opts).map(function (res) {
                            return model;
                        });
                        return save.catch(this._catchRequestError("save"));
                    }
                };
                ActionService.prototype.remove = function (ruleId, model) {
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    var remove = this._http.delete(this._getPath(ruleId, model.key), opts).map(function (res) {
                        return model;
                    });
                    return remove.catch(this._catchRequestError('remove'));
                };
                ActionService.prototype._catchRequestError = function (operation) {
                    return function (response, original) {
                        if (response) {
                            if (response.status === 500) {
                                if (response.text() && response.text().indexOf("ECONNREFUSED") >= 0) {
                                    throw new http_response_util_1.CwError(http_response_util_1.NETWORK_CONNECTION_ERROR, http_response_util_1.CLIENTS_ONLY_MESSAGES[http_response_util_1.NETWORK_CONNECTION_ERROR]);
                                }
                                else {
                                    throw new http_response_util_1.CwError(http_response_util_1.SERVER_RESPONSE_ERROR, response.headers.get('error-message'));
                                }
                            }
                            else if (response.status === 404) {
                                console.error("Could not execute request: 404 path not valid.");
                                throw new http_response_util_1.CwError(http_response_util_1.UNKNOWN_RESPONSE_ERROR, response.headers.get('error-message'));
                            }
                            else {
                                console.log("Could not execute request: Response status code: ", response.status, 'error:', response);
                                throw new http_response_util_1.CwError(http_response_util_1.UNKNOWN_RESPONSE_ERROR, response.headers.get('error-message'));
                            }
                        }
                        return null;
                    };
                };
                ActionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [ApiRoot_1.ApiRoot, http_1.Http])
                ], ActionService);
                return ActionService;
            }());
            exports_1("ActionService", ActionService);
        }
    }
});
//# sourceMappingURL=Action.js.map