System.register(['@angular/core', "../../api/auth/UserModel", '../../api/persistence/ApiRoot'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, UserModel_1, ApiRoot_1;
    var injector;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (UserModel_1_1) {
                UserModel_1 = UserModel_1_1;
            },
            function (ApiRoot_1_1) {
                ApiRoot_1 = ApiRoot_1_1;
            }],
        execute: function() {
            injector = core_1.Injector.resolveAndCreate([
                UserModel_1.UserModel,
                ApiRoot_1.ApiRoot
            ]);
            describe('Unit.api.persistence.ApiRoot', function () {
                var apiRoot;
                beforeEach(function () {
                    apiRoot = injector.get(ApiRoot_1.ApiRoot);
                });
                it("The ApiRoot is injected.", function () {
                    expect(apiRoot).not.toBeNull();
                });
                it("Parses a query param correctly when it's the last query parameter.", function () {
                    var siteId = '48190c8c-42c4-46af-8d1a-0cd5db894797';
                    expect(ApiRoot_1.ApiRoot.parseQueryParam("foo=bar&baz=1&realmId=" + siteId, 'realmId')).toEqual(siteId);
                });
                it("Parses a query param correctly when it's the first query parameter.", function () {
                    var siteId = '48190c8c-42c4-46af-8d1a-0cd5db894797';
                    expect(ApiRoot_1.ApiRoot.parseQueryParam("realmId=" + siteId + "&foo=bar&baz=1", 'realmId')).toEqual(siteId);
                });
                it("Parses a query param correctly when it's the in the middle of the query.", function () {
                    var siteId = '48190c8c-42c4-46af-8d1a-0cd5db894797';
                    expect(ApiRoot_1.ApiRoot.parseQueryParam("blarg=99thousand&realmId=" + siteId + "&foo=bar&baz=1", 'realmId')).toEqual(siteId);
                });
            });
        }
    }
});
//# sourceMappingURL=ApiRoot.spec.js.map