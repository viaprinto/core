System.register(['@angular/bootstrap', '@angular/core', '@angular/http', './serverside-condition', "../../../../../api/rule-engine/ServerSideFieldModel", "../../../../../api/system/locale/I18n", "../../../../../api/persistence/ApiRoot", "../../../../../api/auth/UserModel", "../../../../../api/rule-engine/Rule"], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var bootstrap_1, core_1, http_1, serverside_condition_1, ServerSideFieldModel_1, I18n_1, ApiRoot_1, UserModel_1, Rule_1;
    var App, MOCK_CONDITIONLET;
    function main() {
        var app = bootstrap_1.bootstrap(App, [
            ApiRoot_1.ApiRoot,
            I18n_1.I18nService,
            UserModel_1.UserModel,
            http_1.HTTP_PROVIDERS
        ]);
        app.then(function (appRef) {
            console.log("Bootstrapped App: ", appRef);
        }).catch(function (e) {
            console.log("Error bootstrapping app: ", e);
            throw e;
        });
        return app;
    }
    exports_1("main", main);
    return {
        setters:[
            function (bootstrap_1_1) {
                bootstrap_1 = bootstrap_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (serverside_condition_1_1) {
                serverside_condition_1 = serverside_condition_1_1;
            },
            function (ServerSideFieldModel_1_1) {
                ServerSideFieldModel_1 = ServerSideFieldModel_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (ApiRoot_1_1) {
                ApiRoot_1 = ApiRoot_1_1;
            },
            function (UserModel_1_1) {
                UserModel_1 = UserModel_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(id) {
                    this.paramDefs = MOCK_CONDITIONLET.parameterDefinitions;
                    this.demo = {
                        'one': new Rule_1.ConditionModel({ id: "test2", _type: new ServerSideFieldModel_1.ServerSideTypeModel("Demo1Condition", "demo1", MOCK_CONDITIONLET.parameterDefinitions) }),
                        'two': {},
                        'three': {}
                    };
                }
                App.prototype.demoOneChange = function (model) {
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'demo',
                        directives: [serverside_condition_1.ServersideCondition],
                        template: "<div flex layout=\"row\" layout-wrap layout-align=\"start start\" style=\"height:5em\">\n  <div flex=\"100\" layout=\"row\" layout-wrap >\n    <div flex=\"100\"> Dropdown, Comparisons, Text Input </div>\n    <cw-serverside-condition flex=\"100\" [model]=\"demo.one\" [paramDefs]=\"paramDefs\" (change)=\"demoOneChange($event)\"></cw-serverside-condition>\n  </div>\n</div>\n  "
                    }),
                    __param(0, core_1.Attribute('id')), 
                    __metadata('design:paramtypes', [String])
                ], App);
                return App;
            }());
            MOCK_CONDITIONLET = {
                "id": "UsersBrowserHeaderConditionlet",
                "i18nKey": "api.system.ruleengine.conditionlet.RequestHeader",
                "parameterDefinitions": {
                    "browser-header": {
                        "key": "browser-header",
                        "defaultValue": "Accept",
                        "inputType": {
                            "id": "dropdown",
                            "dataType": {
                                "id": "text",
                                "minLength": 0,
                                "maxLength": 255,
                                "defaultValue": ""
                            },
                            "placeholder": "",
                            "options": {
                                "Accept": {
                                    "i18nKey": "Accept",
                                    "value": "Accept",
                                    "priority": 1
                                },
                                "Accept-Charset": {
                                    "i18nKey": "Accept-Charset",
                                    "value": "Accept-Charset",
                                    "priority": 2
                                },
                                "Accept-Encoding": {
                                    "i18nKey": "Accept-Encoding",
                                    "value": "Accept-Encoding",
                                    "priority": 3
                                },
                                "Accept-Language": {
                                    "i18nKey": "Accept-Language",
                                    "value": "Accept-Language",
                                    "priority": 4
                                },
                                "Accept-Datetime": {
                                    "i18nKey": "Accept-Datetime",
                                    "value": "Accept-Datetime",
                                    "priority": 5
                                },
                                "Authorization": {
                                    "i18nKey": "Authorization",
                                    "value": "Authorization",
                                    "priority": 6
                                },
                                "Cache-Control": {
                                    "i18nKey": "Cache-Control",
                                    "value": "Cache-Control",
                                    "priority": 7
                                },
                                "Connection": {
                                    "i18nKey": "Connection",
                                    "value": "Connection",
                                    "priority": 8
                                },
                                "Cookie": {
                                    "i18nKey": "Cookie",
                                    "value": "Cookie",
                                    "priority": 9
                                },
                                "Content-Length": {
                                    "i18nKey": "Content-Length",
                                    "value": "Content-Length",
                                    "priority": 10
                                },
                                "Content-MD5": {
                                    "i18nKey": "Content-MD5",
                                    "value": "Content-MD5",
                                    "priority": 11
                                },
                                "Content-Type": {
                                    "i18nKey": "Content-Type",
                                    "value": "Content-Type",
                                    "priority": 12
                                },
                                "Date": {
                                    "i18nKey": "Date",
                                    "value": "Date",
                                    "priority": 13
                                },
                                "Expect": {
                                    "i18nKey": "Expect",
                                    "value": "Expect",
                                    "priority": 14
                                },
                                "From": {
                                    "i18nKey": "From",
                                    "value": "From",
                                    "priority": 15
                                },
                                "Host": {
                                    "i18nKey": "Host",
                                    "value": "Host",
                                    "priority": 16
                                },
                                "If-Match": {
                                    "i18nKey": "If-Match",
                                    "value": "If-Match",
                                    "priority": 17
                                },
                                "If-Modified-Since": {
                                    "i18nKey": "If-Modified-Since",
                                    "value": "If-Modified-Since",
                                    "priority": 19
                                },
                                "If-None-Match": {
                                    "i18nKey": "If-None-Match",
                                    "value": "If-None-Match",
                                    "priority": 19
                                },
                                "If-Range": {
                                    "i18nKey": "If-Range",
                                    "value": "If-Range",
                                    "priority": 20
                                },
                                "If-Unmodified-Since": {
                                    "i18nKey": "If-Unmodified-Since",
                                    "value": "If-Unmodified-Since",
                                    "priority": 22
                                },
                                "Max-Forwards": {
                                    "i18nKey": "Max-Forwards",
                                    "value": "Max-Forwards",
                                    "priority": 22
                                },
                                "Origin": {
                                    "i18nKey": "Origin",
                                    "value": "Origin",
                                    "priority": 23
                                },
                                "Pragma": {
                                    "i18nKey": "Pragma",
                                    "value": "Pragma",
                                    "priority": 24
                                },
                                "Proxy-Authorization": {
                                    "i18nKey": "Proxy-Authorization",
                                    "value": "Proxy-Authorization",
                                    "priority": 26
                                },
                                "Range": {
                                    "i18nKey": "Range",
                                    "value": "Range",
                                    "priority": 26
                                },
                                "Referer": {
                                    "i18nKey": "Referer",
                                    "value": "Referer",
                                    "priority": 27
                                },
                                "TE": {
                                    "i18nKey": "TE",
                                    "value": "TE",
                                    "priority": 28
                                },
                                "User-Agent": {
                                    "i18nKey": "User-Agent",
                                    "value": "User-Agent",
                                    "priority": 29
                                },
                                "Upgrade": {
                                    "i18nKey": "Upgrade",
                                    "value": "Upgrade",
                                    "priority": 30
                                },
                                "Via": {
                                    "i18nKey": "Via",
                                    "value": "Via",
                                    "priority": 31
                                },
                                "Warning": {
                                    "i18nKey": "Warning",
                                    "value": "Warning",
                                    "priority": 32
                                },
                                "X-Requested-With": {
                                    "i18nKey": "X-Requested-With",
                                    "value": "X-Requested-With",
                                    "priority": 33
                                },
                                "DNT": {
                                    "i18nKey": "DNT",
                                    "value": "DNT",
                                    "priority": 34
                                },
                                "X-Forwarded-For": {
                                    "i18nKey": "X-Forwarded-For",
                                    "value": "X-Forwarded-For",
                                    "priority": 35
                                },
                                "X-Forwarded-Host": {
                                    "i18nKey": "X-Forwarded-Host",
                                    "value": "X-Forwarded-Host",
                                    "priority": 36
                                },
                                "Front-End-Https": {
                                    "i18nKey": "Front-End-Https",
                                    "value": "Front-End-Https",
                                    "priority": 37
                                },
                                "X-Http-Method-Override": {
                                    "i18nKey": "X-Http-Method-Override",
                                    "value": "X-Http-Method-Override",
                                    "priority": 39
                                },
                                "X-ATT-DeviceId": {
                                    "i18nKey": "X-ATT-DeviceId",
                                    "value": "X-ATT-DeviceId",
                                    "priority": 39
                                },
                                "X-Wap-Profile": {
                                    "i18nKey": "X-Wap-Profile",
                                    "value": "X-Wap-Profile",
                                    "priority": 40
                                },
                                "Proxy-Connection": {
                                    "i18nKey": "Proxy-Connection",
                                    "value": "Proxy-Connection",
                                    "priority": 41
                                },
                                "X-UIDH": {
                                    "i18nKey": "X-UIDH",
                                    "value": "X-UIDH",
                                    "priority": 42
                                },
                                "X-Csrf-Token": {
                                    "i18nKey": "X-Csrf-Token",
                                    "value": "X-Csrf-Token",
                                    "priority": 43
                                }
                            },
                            "allowAdditions": true,
                            "minSelections": 1,
                            "maxSelections": 1
                        },
                        "priority": 1
                    },
                    "comparison": {
                        "key": "comparison",
                        "defaultValue": "",
                        "inputType": {
                            "id": "dropdown",
                            "dataType": {
                                "id": "text",
                                "minLength": 0,
                                "maxLength": 255,
                                "defaultValue": ""
                            },
                            "placeholder": "",
                            "options": {
                                "exists": {
                                    "i18nKey": "exists",
                                    "value": "exists",
                                    "priority": 1
                                },
                                "is": {
                                    "i18nKey": "is",
                                    "value": "is",
                                    "priority": 2
                                },
                                "isNot": {
                                    "i18nKey": "isNot",
                                    "value": "isNot",
                                    "priority": 3
                                },
                                "startsWith": {
                                    "i18nKey": "startsWith",
                                    "value": "startsWith",
                                    "priority": 4
                                },
                                "endsWith": {
                                    "i18nKey": "endsWith",
                                    "value": "endsWith",
                                    "priority": 5
                                },
                                "contains": {
                                    "i18nKey": "contains",
                                    "value": "contains",
                                    "priority": 6
                                },
                                "regex": {
                                    "i18nKey": "regex",
                                    "value": "regex",
                                    "priority": 7
                                }
                            },
                            "allowAdditions": false,
                            "minSelections": 1,
                            "maxSelections": 1
                        },
                        "priority": 2
                    },
                    "header-value": {
                        "key": "header-value",
                        "defaultValue": "",
                        "inputType": {
                            "id": "text",
                            "dataType": {
                                "id": "text",
                                "minLength": 0,
                                "maxLength": 255,
                                "defaultValue": ""
                            },
                            "placeholder": ""
                        },
                        "priority": 2
                    }
                }
            };
        }
    }
});
//# sourceMappingURL=demo.js.map