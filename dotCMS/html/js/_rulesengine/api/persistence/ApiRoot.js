System.register(['@angular/core', '@angular/http', "../auth/UserModel"], function(exports_1, context_1) {
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
    var core_1, http_1, UserModel_1;
    var ApiRoot;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (UserModel_1_1) {
                UserModel_1 = UserModel_1_1;
            }],
        execute: function() {
            ApiRoot = (function () {
                function ApiRoot(authUser) {
                    this.baseUrl = "http://localhost:8080/";
                    this.siteId = '48190c8c-42c4-46af-8d1a-0cd5db894797';
                    this.hideFireOn = false;
                    this.hideRulePushOptions = false;
                    this.authUser = authUser;
                    this.authToken = ApiRoot.createAuthToken(authUser);
                    try {
                        var query = document.location.search.substring(1);
                        var siteId = ApiRoot.parseQueryParam(query, "realmId");
                        if (siteId) {
                            this.siteId = siteId;
                        }
                        var hideFireOn = ApiRoot.parseQueryParam(query, "hideFireOn");
                        if (hideFireOn) {
                            this.hideFireOn = (hideFireOn === 'true' || hideFireOn === '1');
                            console.log('hideFireOn set to ', this.hideFireOn);
                        }
                        var hideRulePushOptions = ApiRoot.parseQueryParam(query, "hideRulePushOptions");
                        if (hideRulePushOptions) {
                            this.hideRulePushOptions = (hideRulePushOptions === 'true' || hideRulePushOptions === '1');
                            console.log('hideRulePushOptions set to ', this.hideRulePushOptions);
                        }
                        var baseUrl = ApiRoot.parseQueryParam(query, 'baseUrl');
                        //console.log('Proxy server Base URL set to ', baseUrl)
                        this.setBaseUrl(baseUrl); // if null, just uses the base of the current URL
                        this.configureUser(query, authUser);
                    }
                    catch (e) {
                        console.log("Could not set baseUrl automatically.", e);
                    }
                }
                ApiRoot.prototype.configureUser = function (query, user) {
                    user.suppressAlerts = ApiRoot.parseQueryParam(query, "suppressAlerts") === 'true';
                };
                ApiRoot.prototype.getDefaultRequestHeaders = function () {
                    var headers = new http_1.Headers();
                    headers.append("com.dotmarketing.session_host", this.siteId);
                    headers.append('Accept', 'application/json');
                    //headers.append('Content-Type', 'application/json')
                    if (this.authToken) {
                        headers.append('Authorization', this.authToken);
                    }
                    return headers;
                };
                ApiRoot.prototype.getDefaultRequestOptions = function () {
                    var headers = new http_1.Headers();
                    headers.append("com.dotmarketing.session_host", this.siteId);
                    if (this.authToken) {
                        headers.append('Authorization', this.authToken);
                    }
                    headers.append('Content-Type', 'application/json');
                    return new http_1.RequestOptions({
                        headers: headers
                    });
                };
                ApiRoot.createAuthToken = function (authUser) {
                    var token = null;
                    if (authUser && authUser.username && authUser.password) {
                        token = 'Basic ' + btoa(authUser.username + ':' + authUser.password);
                    }
                    return token;
                };
                ApiRoot.parseQueryParam = function (query, token) {
                    var idx = -1;
                    var result = null;
                    token = token + '=';
                    if (query && query.length) {
                        idx = query.indexOf(token);
                    }
                    if (idx >= 0) {
                        var end = query.indexOf('&', idx);
                        end = end != -1 ? end : query.length;
                        result = query.substring(idx + token.length, end);
                    }
                    return result;
                };
                ;
                ApiRoot.prototype.setBaseUrl = function (url) {
                    if (url === void 0) { url = null; }
                    if (url === null) {
                        // set to same as current request
                        var loc = document.location;
                        this.baseUrl = loc.protocol + '//' + loc.host + '/';
                    }
                    else if (url && (url.startsWith('http://' || url.startsWith('https://')))) {
                        this.baseUrl = url.endsWith('/') ? url : url + '/';
                    }
                    else {
                        throw new Error("Invalid proxy server base url: '" + url + "'");
                    }
                    this.defaultSiteUrl = this.baseUrl + 'api/v1/sites/' + this.siteId;
                };
                ApiRoot = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [UserModel_1.UserModel])
                ], ApiRoot);
                return ApiRoot;
            }());
            exports_1("ApiRoot", ApiRoot);
        }
    }
});
//# sourceMappingURL=ApiRoot.js.map