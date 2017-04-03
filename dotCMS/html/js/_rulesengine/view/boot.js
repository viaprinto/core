System.register(['@angular/platform-browser-dynamic', '@angular/http', '../api/persistence/ApiRoot', "../api/maps/GoogleMapService", "../api/auth/UserModel", "../api/rule-engine/Rule", "../api/rule-engine/Action", "../api/rule-engine/ConditionGroup", "../api/rule-engine/Condition", "../api/system/locale/I18n", "./components/rule-engine/rule-engine.container", "../api/services/bundle-service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, http_1, ApiRoot_1, GoogleMapService_1, UserModel_1, Rule_1, Action_1, ConditionGroup_1, Condition_1, I18n_1, rule_engine_container_1, bundle_service_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ApiRoot_1_1) {
                ApiRoot_1 = ApiRoot_1_1;
            },
            function (GoogleMapService_1_1) {
                GoogleMapService_1 = GoogleMapService_1_1;
            },
            function (UserModel_1_1) {
                UserModel_1 = UserModel_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            },
            function (Action_1_1) {
                Action_1 = Action_1_1;
            },
            function (ConditionGroup_1_1) {
                ConditionGroup_1 = ConditionGroup_1_1;
            },
            function (Condition_1_1) {
                Condition_1 = Condition_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (rule_engine_container_1_1) {
                rule_engine_container_1 = rule_engine_container_1_1;
            },
            function (bundle_service_1_1) {
                bundle_service_1 = bundle_service_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(rule_engine_container_1.RuleEngineContainer, [
                ApiRoot_1.ApiRoot,
                GoogleMapService_1.GoogleMapService,
                I18n_1.I18nService,
                UserModel_1.UserModel,
                Rule_1.RuleService,
                bundle_service_1.BundleService,
                Action_1.ActionService,
                ConditionGroup_1.ConditionGroupService,
                Condition_1.ConditionService,
                http_1.HTTP_PROVIDERS
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map