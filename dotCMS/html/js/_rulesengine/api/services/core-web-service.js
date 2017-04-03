System.register(['@angular/http', "../system/http-response-util"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, http_response_util_1;
    var RULE_CREATE, RULE_DELETE, RULE_UPDATE_NAME, RULE_UPDATE_ENABLED_STATE, V_RULE_UPDATE_EXPANDED_STATE, RULE_UPDATE_FIRE_ON, RULE_RULE_ACTION_CREATE, RULE_RULE_ACTION_DELETE, RULE_RULE_ACTION_UPDATE_TYPE, RULE_RULE_ACTION_UPDATE_PARAMETER, RULE_CONDITION_GROUP_UPDATE_OPERATOR, RULE_CONDITION_GROUP_DELETE, RULE_CONDITION_GROUP_CREATE, RULE_CONDITION_CREATE, RULE_CONDITION_DELETE, RULE_CONDITION_UPDATE_TYPE, RULE_CONDITION_UPDATE_PARAMETER, RULE_CONDITION_UPDATE_OPERATOR, CoreWebService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (http_response_util_1_1) {
                http_response_util_1 = http_response_util_1_1;
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
            CoreWebService = (function () {
                function CoreWebService(_apiRoot, _http) {
                    this._apiRoot = _apiRoot;
                    this._http = _http;
                }
                CoreWebService.prototype.request = function (options) {
                    var headers = this._apiRoot.getDefaultRequestHeaders();
                    var tempHeaders = options.headers ? options.headers : { "Content-Type": "application/json" };
                    Object.keys(tempHeaders).forEach(function (key) {
                        headers.set(key, tempHeaders[key]);
                    });
                    var source = options.body;
                    if (options.body) {
                        if (typeof options.body !== 'string') {
                            options.body = JSON.stringify(options.body);
                        }
                    }
                    options.headers = headers;
                    var request = new http_1.Request(options);
                    return this._http.request(request)
                        .map(function (resp) {
                        return http_response_util_1.hasContent(resp) ? resp.json() : resp;
                    })
                        .catch(function (response, original) {
                        if (response) {
                            if (response.status === 500) {
                                if (response.text() && response.text().indexOf("ECONNREFUSED") >= 0) {
                                    throw new http_response_util_1.CwError(http_response_util_1.NETWORK_CONNECTION_ERROR, http_response_util_1.CLIENTS_ONLY_MESSAGES[http_response_util_1.NETWORK_CONNECTION_ERROR], request, response, source);
                                }
                                else {
                                    throw new http_response_util_1.CwError(http_response_util_1.SERVER_RESPONSE_ERROR, response.headers.get('error-message'), request, response, source);
                                }
                            }
                            else if (response.status === 403) {
                                console.error("Could not execute request: 403 user not authorized", options.url);
                                throw new http_response_util_1.CwError(http_response_util_1.UNKNOWN_RESPONSE_ERROR, response.headers.get('error-message'), request, response, source);
                            }
                            else if (response.status === 404) {
                                console.error("Could not execute request: 404 path not valid.", options.url);
                                throw new http_response_util_1.CwError(http_response_util_1.UNKNOWN_RESPONSE_ERROR, response.headers.get('error-message'), request, response, source);
                            }
                            else {
                                console.log("Could not execute request: Response status code: ", response.status, 'error:', response, options.url);
                                throw new http_response_util_1.CwError(http_response_util_1.UNKNOWN_RESPONSE_ERROR, response.headers.get('error-message'), request, response, source);
                            }
                        }
                        return null;
                    });
                };
                return CoreWebService;
            }());
            exports_1("CoreWebService", CoreWebService);
        }
    }
});
//# sourceMappingURL=core-web-service.js.map