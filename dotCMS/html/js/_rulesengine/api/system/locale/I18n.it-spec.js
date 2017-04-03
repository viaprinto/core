System.register(['@angular/core', '../../../api/auth/UserModel', '../../../api/persistence/ApiRoot', "./I18n", "@angular/http"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, UserModel_1, ApiRoot_1, I18n_1, http_1;
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
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            injector = core_1.Injector.resolveAndCreate([
                UserModel_1.UserModel,
                ApiRoot_1.ApiRoot,
                I18n_1.I18nService,
                http_1.HTTP_PROVIDERS
            ]);
            describe('Integration.api.system.locale.I18n', function () {
                var rsrcService;
                beforeAll(function () {
                    rsrcService = injector.get(I18n_1.I18nService);
                });
                beforeEach(function () {
                });
                it("Can get a specific message.", function (done) {
                    console.log("Called - 01", "can get specific");
                    rsrcService.getForLocale('en-US', 'message.comment.success', true).subscribe(function (rsrc) {
                        console.log("Called - 02", "can get specific");
                        expect(rsrc).toBe("Your comment has been saved");
                        rsrcService.getForLocale('de', 'message.comment.success', true).subscribe(function (rsrc) {
                            expect(rsrc).toBe("Ihr Kommentar wurde gespeichert");
                            done();
                        });
                    });
                });
                it("Can get all message under a particular path.", function (done) {
                    var base = 'message.comment';
                    rsrcService.getForLocale('en-US', base, false).subscribe(function (rsrc) {
                        rsrcService.get(base + '.delete').subscribe(function (v) {
                            expect(v).toBe("Your comment has been delete");
                            rsrcService.get(base + '.failure').subscribe(function (v) {
                                expect(v).toBe("Your comment couldn't be created");
                                rsrcService.get(base + '.success').subscribe(function (v) {
                                    expect(v).toBe("Your comment has been saved");
                                    done();
                                });
                            });
                        });
                    });
                });
                it("Can get all message under a particular path in a non-default language.", function (done) {
                    var base = 'message.comment';
                    rsrcService.getForLocale('de', base, false).subscribe(function (rsrc) {
                        rsrcService.getForLocale('de', base + '.delete').subscribe(function (v) {
                            expect(v).toBe("Ihr Kommentar wurde gelöscht");
                            rsrcService.getForLocale('de', base + '.failure').subscribe(function (v) {
                                expect(v).toBe("Ihr Kommentar konnte nicht erstellt werden");
                                rsrcService.getForLocale('de', base + '.success').subscribe(function (v) {
                                    expect(v).toBe("Ihr Kommentar wurde gespeichert");
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=I18n.it-spec.js.map