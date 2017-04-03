System.register(['@angular/core', '@angular/http', 'rxjs/Rx', "../persistence/ApiRoot", "../system/locale/I18n", "../services/core-web-service"], function(exports_1, context_1) {
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
    var core_1, http_1, Rx_1, ApiRoot_1, I18n_1, core_web_service_1;
    var BundleService;
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
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (core_web_service_1_1) {
                core_web_service_1 = core_web_service_1_1;
            }],
        execute: function() {
            BundleService = (function (_super) {
                __extends(BundleService, _super);
                function BundleService(_apiRoot, _http, _resources) {
                    _super.call(this, _apiRoot, _http);
                    this._apiRoot = _apiRoot;
                    this._resources = _resources;
                    this.bundles$ = new Rx_1.BehaviorSubject([]);
                    this.environments$ = new Rx_1.BehaviorSubject([]);
                    this._bundlesAry = [];
                    this._environmentsAry = [];
                    this._bundleStoreUrl = this._apiRoot.baseUrl + "api/bundle/getunsendbundles/userid";
                    this._loggedUserUrl = this._apiRoot.baseUrl + "api/v1/users/current/";
                    this._addToBundleUrl = this._apiRoot.baseUrl + "DotAjaxDirector/com.dotcms.publisher.ajax.RemotePublishAjaxAction/cmd/addToBundle";
                    this._pushEnvironementsUrl = this._apiRoot.baseUrl + "api/environment/loadenvironments/roleId";
                    this._pushRuleUrl = this._apiRoot.baseUrl + "DotAjaxDirector/com.dotcms.publisher.ajax.RemotePublishAjaxAction/cmd/publish";
                }
                BundleService.prototype.getLoggedUser = function () {
                    return this.request({
                        method: http_1.RequestMethod.Get,
                        url: this._loggedUserUrl,
                    });
                };
                BundleService.prototype.loadBundleStores = function () {
                    var _this = this;
                    var obs;
                    if (this._bundlesAry.length) {
                        obs = Rx_1.Observable.from(this._bundlesAry);
                    }
                    else {
                        obs = this._doLoadBundleStores().map(function (bundles) {
                            _this._bundlesAry = bundles;
                            return bundles;
                        });
                    }
                    obs.subscribe(function (bundles) { return _this.bundles$.next(bundles); });
                };
                BundleService.prototype._doLoadBundleStores = function () {
                    var _this = this;
                    return this.getLoggedUser().flatMap(function (user) {
                        return _this.request({
                            method: http_1.RequestMethod.Get,
                            url: _this._bundleStoreUrl + "/" + user.userId,
                        }).map(BundleService.fromServerBundleTransformFn);
                    });
                };
                BundleService.prototype.loadPublishEnvironments = function () {
                    var _this = this;
                    var obs;
                    if (this._environmentsAry.length) {
                        obs = Rx_1.Observable.from(this._environmentsAry);
                    }
                    else {
                        obs = this._doLoadPublishEnvironments().map(function (environments) {
                            _this._environmentsAry = environments;
                            return environments;
                        });
                    }
                    return obs;
                };
                BundleService.prototype._doLoadPublishEnvironments = function () {
                    var _this = this;
                    return this.getLoggedUser().flatMap(function (user) {
                        return _this.request({
                            method: http_1.RequestMethod.Get,
                            url: _this._pushEnvironementsUrl + "/" + user.roleId + "/?name=0",
                        }).map(BundleService.fromServerEnvironmentTransformFn);
                    });
                };
                BundleService.prototype.addRuleToBundle = function (ruleId, bundle) {
                    return this.request({
                        body: "assetIdentifier=" + ruleId + "&bundleName=" + bundle.name + "&bundleSelect=" + bundle.id,
                        method: http_1.RequestMethod.Post,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        url: this._addToBundleUrl
                    });
                };
                BundleService.prototype.getFormattedDate = function (date) {
                    var yyyy = date.getFullYear().toString();
                    var mm = (date.getMonth() + 1).toString();
                    var dd = date.getDate().toString();
                    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
                };
                BundleService.prototype.getPublishRuleData = function (ruleId, environmentId) {
                    var resul = "";
                    resul += "assetIdentifier=" + ruleId;
                    resul += "&remotePublishDate=" + this.getFormattedDate(new Date());
                    resul += "&remotePublishTime=00-00";
                    resul += "&remotePublishExpireDate=" + this.getFormattedDate(new Date());
                    resul += "&remotePublishExpireTime=00-00";
                    resul += "&iWantTo=publish";
                    resul += "&whoToSend=" + environmentId;
                    resul += "&bundleName=";
                    resul += "&bundleSelect=";
                    resul += "&forcePush=false";
                    return resul;
                };
                BundleService.prototype.pushPublishRule = function (ruleId, environmentId) {
                    return this.request({
                        body: this.getPublishRuleData(ruleId, environmentId),
                        method: http_1.RequestMethod.Post,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        url: this._pushRuleUrl
                    });
                };
                BundleService.fromServerBundleTransformFn = function (data) {
                    return data.items || [];
                };
                BundleService.fromServerEnvironmentTransformFn = function (data) {
                    // Endpoint return extra empty environment
                    data.shift();
                    return data;
                };
                BundleService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [ApiRoot_1.ApiRoot, http_1.Http, I18n_1.I18nService])
                ], BundleService);
                return BundleService;
            }(core_web_service_1.CoreWebService));
            exports_1("BundleService", BundleService);
        }
    }
});
//# sourceMappingURL=bundle-service.js.map