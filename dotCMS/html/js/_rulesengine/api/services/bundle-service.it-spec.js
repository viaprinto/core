System.register(['@angular/core', '../../api/persistence/ApiRoot', '../../api/auth/UserModel', "../system/locale/I18n", "@angular/http", "./bundle-service", "../rule-engine/Rule"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, ApiRoot_1, UserModel_1, I18n_1, http_1, bundle_service_1, Rule_1;
    var injector;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ApiRoot_1_1) {
                ApiRoot_1 = ApiRoot_1_1;
            },
            function (UserModel_1_1) {
                UserModel_1 = UserModel_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (bundle_service_1_1) {
                bundle_service_1 = bundle_service_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            }],
        execute: function() {
            injector = core_1.Injector.resolveAndCreate([
                ApiRoot_1.ApiRoot,
                Rule_1.RuleService,
                bundle_service_1.BundleService,
                I18n_1.I18nService,
                UserModel_1.UserModel,
                http_1.HTTP_PROVIDERS
            ]);
            describe('Integration.api.services.bundle-service', function () {
                var ruleService;
                var bundleService;
                beforeEach(function () {
                    ruleService = injector.get(Rule_1.RuleService);
                    bundleService = injector.get(bundle_service_1.BundleService);
                });
                it("Should get logged user information", function (done) {
                    bundleService.getLoggedUser().subscribe(function (user) {
                        expect(user).toEqual({
                            givenName: "Admin",
                            surname: "User",
                            roleId: "e7d4e34e-5127-45fc-8123-d48b62d510e3",
                            userId: "dotcms.org.1"
                        }, "We get user information correctly");
                        done();
                    });
                });
                it("Should get bundle store information", function (done) {
                    bundleService._doLoadBundleStores().subscribe(function (bundles) {
                        expect(bundles).toBeDefined();
                        done();
                    });
                });
                it("Should add rule to bundle", function (done) {
                    var clientRule = {
                        name: "TestRule-" + new Date().getTime()
                    };
                    ruleService.createRule(new Rule_1.RuleModel(clientRule)).subscribe(function (serverRule) {
                        bundleService.addRuleToBundle(serverRule.key, { id: "bundleTest", name: "bundleTest" }).subscribe(function (result) {
                            expect(result.errors).toBe(0, "error count should be zero");
                            expect(result.total).toBe(1, "'total' count should be 1");
                            done();
                        });
                    }, function (e) {
                        expect(true).toBe(false, "Should not throw an error.");
                        done();
                    });
                });
                it("Should get push publish environments", function (done) {
                    bundleService._doLoadPublishEnvironments().subscribe(function (publishEnvironments) {
                        console.log(publishEnvironments);
                        expect(publishEnvironments).toBeDefined();
                        done();
                    });
                });
                it("Should push publish rule directly", function (done) {
                    var clientRule = {
                        name: "TestRule-" + new Date().getTime()
                    };
                    ruleService.createRule(new Rule_1.RuleModel(clientRule)).subscribe(function (serverRule) {
                        bundleService.pushPublishRule(serverRule.key, "34e427cf-d7e4-4ff2-8b5f-b432bf0f60e5").subscribe(function (result) {
                            expect(result.errors).toBe(0, "error count should be zero");
                            expect(result.total).toBe(1, "'total' count should be 1");
                            done();
                        });
                    }, function (e) {
                        expect(true).toBe(false, "Should not throw an error.");
                        done();
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=bundle-service.it-spec.js.map