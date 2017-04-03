System.register(['@angular/core', '@angular/http', 'rxjs/Rx', "../../persistence/ApiRoot", "../../validation/Verify"], function(exports_1, context_1) {
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
    var core_1, http_1, Rx_1, ApiRoot_1, Verify_1;
    var TreeNode, I18nService;
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
            function (Verify_1_1) {
                Verify_1 = Verify_1_1;
            }],
        execute: function() {
            TreeNode = (function () {
                function TreeNode(parent, key) {
                    this._p = parent;
                    this._k = key;
                    this._loading = null;
                    this._loaded = false;
                }
                TreeNode.prototype.$addAllFromJson = function (key, childJson) {
                    var cNode = this.$child(key);
                    if (Verify_1.Verify.isString(childJson)) {
                        cNode._value = childJson;
                    }
                    else {
                        Object.keys(childJson).forEach(function (cKey) {
                            cNode.$addAllFromJson(cKey, childJson[cKey]);
                        });
                    }
                    cNode._loaded = true;
                };
                TreeNode.prototype.$isLeaf = function () {
                    return this._value !== undefined;
                };
                TreeNode.prototype.$isLoaded = function () {
                    return this._p == null ? false : this._loaded || this._p.$isLoaded();
                };
                TreeNode.prototype.$isLoading = function () {
                    return this._p == null ? false : (this._loading != null) || this._p.$isLoading();
                };
                TreeNode.prototype.$markAsLoaded = function () {
                    this._loaded = true;
                    this.$children().forEach(function (child) { return child.$markAsLoaded(); });
                };
                TreeNode.prototype.$markAsLoading = function (promise) {
                    this._loaded = false;
                    this._loading = promise;
                    this.$children().forEach(function (child) { return child.$markAsLoading(promise); });
                };
                TreeNode.prototype.$children = function () {
                    var _this = this;
                    return Object.keys(this).filter(function (key) { return key[0] != '_'; }).map(function (cKey) { return _this[cKey]; });
                };
                TreeNode.prototype.$child = function (cKey) {
                    var child;
                    child = this[cKey];
                    if (child == null) {
                        child = new TreeNode(this, cKey);
                        child._loading = this._loading;
                        this[cKey] = child;
                    }
                    return child;
                };
                TreeNode.prototype.$descendant = function (path) {
                    var cKey = path[0];
                    var child = this.$child(cKey);
                    if (path.length > 1) {
                        child = child.$descendant(path.slice(1));
                    }
                    return child;
                };
                TreeNode.prototype.$isPathLoaded = function (path) {
                    return this.$descendant(path).$isLoaded();
                };
                return TreeNode;
            }());
            exports_1("TreeNode", TreeNode);
            I18nService = (function () {
                function I18nService(apiRoot, http) {
                    this._http = http;
                    this._apiRoot = apiRoot;
                    this._baseUrl = apiRoot.baseUrl + 'api/v1/system/i18n';
                    this.root = new TreeNode(null, 'root');
                }
                I18nService.prototype.makeRequest = function (url) {
                    var opts = this._apiRoot.getDefaultRequestOptions();
                    return this._http.get(this._baseUrl + '/' + url, opts).map(function (res) {
                        return res.json();
                    });
                };
                I18nService.prototype.get = function (msgKey, defaultValue) {
                    if (defaultValue === void 0) { defaultValue = "-error loading resource-"; }
                    return this.getForLocale(this._apiRoot.authUser.locale, msgKey, true, defaultValue);
                };
                I18nService.prototype.getForLocale = function (locale, msgKey, forceText, defaultValue) {
                    var _this = this;
                    if (forceText === void 0) { forceText = true; }
                    if (defaultValue === void 0) { defaultValue = "-error loading resource-"; }
                    msgKey = locale + '.' + msgKey;
                    var path = msgKey.split('.');
                    var cNode = this.root.$descendant(path);
                    if (!cNode.$isLoaded() && !cNode.$isLoading()) {
                        var promise = new Promise(function (resolve, reject) {
                            //console.log("I18n", "Requesting: ", msgKey)
                            _this.makeRequest(path.join('/')).catch(function (err, source) {
                                if (err && err.status === 404) {
                                    console.log("Missing Resource: '", msgKey, "'");
                                }
                                else {
                                    console.log("I18n", "Failed:: ", msgKey, "=", cNode, 'error:', err);
                                }
                                return Rx_1.Observable.create(function (obs) {
                                    obs.next(defaultValue);
                                });
                            }).subscribe(function (jsonVal) {
                                cNode._p.$addAllFromJson(cNode._k, jsonVal);
                                cNode.$markAsLoaded();
                                resolve(cNode);
                            });
                        });
                        cNode.$markAsLoading(promise);
                    }
                    else {
                    }
                    return Rx_1.Observable.defer(function () {
                        return Rx_1.Observable.create(function (obs) {
                            if (cNode._loading == null) {
                                console.log("I18n", "Failed: ", msgKey, "=", cNode);
                                obs.next("-I18nLoadFailed-");
                                obs.complete();
                            }
                            else {
                                cNode._loading.then(function () {
                                    var v;
                                    if (!cNode.$isLeaf()) {
                                        if (forceText) {
                                            v = defaultValue;
                                        }
                                        else {
                                            v = cNode;
                                        }
                                    }
                                    else {
                                        v = cNode._value;
                                    }
                                    // console.log("I18n", "Providing: ", msgKey, "=", v)
                                    obs.next(v);
                                    obs.complete();
                                });
                            }
                        });
                    });
                };
                I18nService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [ApiRoot_1.ApiRoot, http_1.Http])
                ], I18nService);
                return I18nService;
            }());
            exports_1("I18nService", I18nService);
        }
    }
});
//# sourceMappingURL=I18n.js.map