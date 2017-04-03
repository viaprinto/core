System.register(["../../../e2e/CwProtractor", "../../../e2e/view/rule-engine/rule-engine-page"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var CwProtractor_1, rule_engine_page_1;
    var RobotsTxtPage;
    function initSpec(TestUtil) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
        describe('The Rules Engine', function () {
            var rulePage;
            beforeEach(function () {
                rulePage = new rule_engine_page_1.RulePage();
                rulePage.suppressAlerts(browser['browserName'] != 'chrome');
                rulePage.navigateTo();
            });
            it('should have a title.', function () {
                expect(browser.getTitle()).toEqual(rulePage.title);
            });
            it('should have a filter box.', function () {
                rulePage.setFilter("Hello").then(function () {
                    return rulePage.getFilter();
                }).then(function (filterText) {
                    expect(filterText).toEqual('Hello');
                });
            });
            it('should have translations for the filter box placeholder text.', function () {
                rulePage = new rule_engine_page_1.RulePage("es");
                rulePage.navigateTo().then(function () {
                    expect(rulePage.getFilterPlaceholder()).toEqual('Empieza a escribir para filtrar reglas...');
                });
            });
            it('should save a rule when a name is typed', function (done) {
                rulePage.addRule('should save a rule when a name is typed').then(function (rule) {
                    var name = rule.name;
                    rulePage.waitForSave();
                    rulePage.navigateTo().then(function () {
                        rule = rulePage.findRule(name);
                        expect(rule.getName()).toEqual(name, "Rule should still exist.");
                        rule.remove().then(done);
                    });
                });
            });
            it('should remove a rule with no alert when it has no conditionlets or actionlets.', function (done) {
                rulePage.addRule('should remove a rule with no alert when no ').then(function (rule) {
                    rule.removeBtn.click();
                    var hadAlert = null;
                    browser.switchTo().alert().accept().then(function () {
                        hadAlert = true;
                        expect(hadAlert).toEqual(false, "No alert should have been displayed.");
                        done();
                    }, function () {
                        hadAlert = false;
                        expect(hadAlert).toEqual(false, "No alert should have been displayed.");
                        done();
                    });
                });
            });
            it('should save the fire-on value when changed.', function (done) {
                var name;
                rulePage.addRule('should save the fire-on value when changed.').then(function (rule) {
                    name = rule.name;
                    return rule.setFireOn('Every Request');
                }).then(function () { return rulePage.navigateTo(); })
                    .then(function (rulePage) { return rulePage.findRule(name); })
                    .then(function (rule) {
                    return rule.getFireOn().then(function (fireOn) {
                        var expected = 'Every Request';
                        expect(fireOn).toEqual(expected, "FireOn value should have been saved and restored.");
                        if (fireOn == expected) {
                            rule.remove().then(done);
                        }
                        else {
                            done();
                        }
                    });
                });
            });
            it('should save the enabled value when changed.', function (done) {
                var name, rule;
                rulePage.addRule('should save the enabled value when changed.').then(function (r) {
                    rule = r;
                    name = rule.name;
                    return rule.toggleEnable.toggle();
                })
                    .then(function () { return rulePage.saveAndReload(); })
                    .then(function (rulePage) { return rulePage.findRule(name); })
                    .then(function (rule) { return rule.toggleEnable.value(); })
                    .then(function (newValue) {
                    expect(newValue).toEqual(true, "New rule should have been toggled to 'on' state.");
                    if (newValue) {
                        rule.remove().then(done);
                    }
                    else {
                        done();
                    }
                });
            });
            it('should expand when the expando icon is clicked.', function (done) {
                var rule;
                rulePage.addRule('should expand when the expando icon is clicked.')
                    .then(function (r) { rule = r; return rule.expand(); })
                    .then(function () { return rule.isShowingBody(); })
                    .then(function (showing) {
                    expect(showing).toEqual(true);
                    if (showing) {
                        rule.remove().then(done);
                    }
                });
            });
            it('should expand when the name field is focused.', function (done) {
                rulePage.addRule('should expand when the name field is focused.').then(function (rule) {
                    rule.expand();
                    expect(rule.isShowingBody()).toEqual(true);
                    rule.remove().then(done);
                });
            });
            it('should save a valid condition.', function (done) {
                rulePage.addRule('should save a valid condition.').then(function (rule) {
                    var name = rule.name;
                    var conditionDef = rule.createRequestHeaderCondition();
                    rulePage.waitForSave();
                    rulePage.navigateTo().then(function () {
                        rule = rulePage.findRule(name);
                        rule.expand().then(function () {
                            rule.firstGroup().first().typeSelect.getValueText().then(function (text) {
                                var expected = "Request Header";
                                expect(text).toEqual(expected, "Should have persisted.");
                                if (text == expected) {
                                    rule.remove().then(done);
                                }
                            });
                        });
                    });
                });
            });
            it('should allow a comparison change on a valid Request Header Condition.', function (done) {
                rulePage.addRule('should allow a comparison change on a valid Request Header Condition.').then(function (rule) {
                    var name = rule.name;
                    var conditionDef = rule.createRequestHeaderCondition();
                    rulePage.waitForSave();
                    rulePage.navigateTo().then(function () {
                        rule = rulePage.findRule(name);
                        rule.expand().then(function () {
                            conditionDef = rule.firstGroup().first();
                            conditionDef.setComparison(rule_engine_page_1.TestConditionComponent.COMPARE_IS_NOT);
                            rulePage.waitForSave();
                            rulePage.navigateTo();
                            rule = rulePage.findRule(name);
                            rule.expand().then(function () {
                                var cond3 = rule.firstGroup().first();
                                expect(cond3.compareDD.getValueText()).toEqual("Is not", "Should have persisted.");
                                rule.remove().then(done);
                            });
                        });
                    });
                });
            });
            it('should save a valid Response Header action.', function (done) {
                rulePage.addRule('should save a valid Response Header action.').then(function (rule) {
                    var name = rule.name;
                    var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                    actionDef.typeSelect.setSearch("Set Response").then(function () {
                        rule.fireOn.el.click().then(function () {
                            actionDef.headerKeyTF.setValue("key-AbcDef");
                            actionDef.headerValueTF.setValue("value-AbcDef");
                            rule.fireOn.el.click();
                            rulePage.waitForSave();
                            rulePage.navigateTo();
                            rule = rulePage.findRule(name);
                            rule.expand().then(function () {
                                rule.firstAction().typeSelect.getValueText().then(function (text) {
                                    var expected = "Set Response Header";
                                    expect(text).toEqual(expected, "Should have persisted.");
                                    if (text == expected) {
                                        rule.remove().then(done);
                                    }
                                });
                            });
                        });
                    });
                });
            });
            it('should fire when enabled with no condition and one Set Response Header action.', function (done) {
                var key;
                rulePage.addRule('should fire when enabled with no condition and one Set Response Header action.').then(function (rule) {
                    var name = rule.name;
                    var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                    actionDef.typeSelect.setSearch("Set Response").then(function () {
                        rule.fireOn.el.click().then(function () {
                            key = name.substring(0, name.indexOf('-should'));
                            actionDef.headerKeyTF.setValue(key);
                            actionDef.headerValueTF.setValue("value-AbcDef");
                            rule.fireOn.setSearch("Every Req");
                            rule.toggleEnable.setValue(true);
                            rule.fireOn.el.click();
                            return rulePage.waitForSave();
                        }).then(function () {
                            var robots = new RobotsTxtPage(TestUtil);
                            return robots.getResponseHeader(key);
                        }).then(function (respName) {
                            var expected = "value-AbcDef";
                            expect(respName).toEqual(expected);
                            if (respName == expected) {
                                rule.remove().then(done);
                            }
                            else {
                                done();
                            }
                        });
                    });
                });
            });
            it('should fire when enabled with a Request Header "Connection Is Not" condition and one Set Response Header action.', function (done) {
                var key;
                rulePage.addRule('should fire when enabled with a Request Header ').then(function (rule) {
                    var name = rule.name;
                    var condDef = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Connection, "is not", "fake value");
                    var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                    actionDef.typeSelect.setSearch("Set Response").then(function () {
                        rule.fireOn.el.click().then(function () {
                            key = name.substring(0, name.indexOf('-should'));
                            actionDef.headerKeyTF.setValue(key);
                            actionDef.headerValueTF.setValue("value-AbcDef");
                            rule.fireOn.setSearch("Every Req");
                            rule.toggleEnable.setValue(true);
                            rule.fireOn.el.click();
                            return rulePage.waitForSave();
                        }).then(function () {
                            var robots = new RobotsTxtPage(TestUtil);
                            return robots.getResponseHeader(key);
                        }).then(function (respName) {
                            var expected = "value-AbcDef";
                            expect(respName).toEqual(expected);
                            if (respName == expected) {
                                rule.remove().then(done);
                            }
                            else {
                                done();
                            }
                        });
                    });
                });
            });
            it('should create a second condition.', function (done) {
                rulePage.addRule('should create a second condition.').then(function (rule) {
                    var name = rule.name;
                    var condDef = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Connection, "is not", "fake value");
                    var condDef2 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value");
                    rule.fireOn.el.click().then(function () {
                        rulePage.waitForSave();
                        rulePage.navigateTo();
                        rule = rulePage.findRule(name);
                        rule.expand().then(function () {
                            expect(rule.firstGroup().conditionEls.count()).toBe(2);
                            rule.remove().then(done);
                        });
                    });
                });
            });
            it('should save group logical condition changes on create.', function (done) {
                rulePage.addRule('should save group logical condition changes on create.').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef0 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value A");
                    rule.addGroup(false).then(function () {
                        var condDef1 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value B");
                        rule.addGroup(false).then(function () {
                            var condDef2 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is", "fake value C");
                            rulePage.waitForSave();
                            rulePage.navigateTo();
                            rule = rulePage.findRule(name);
                            rule.expand().then(function () {
                                expect(rule.getGroup(1).getLogicalOperator()).toBe("OR");
                                expect(rule.getGroup(2).getLogicalOperator()).toBe("OR");
                                rule.remove().then(done);
                            });
                        });
                    });
                });
            });
            it('should save group logical condition changes on edit', function (done) {
                rulePage.addRule('should save group logical condition changes on edit').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value A");
                    rule.addGroup().then(function () {
                        var condDef2 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value B");
                        rule.addGroup().then(function () {
                            var condDef3 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is", "fake value C");
                            rulePage.waitForSave();
                            rulePage.navigateTo();
                            rule = rulePage.findRule(name);
                            rule.expand().then(function () {
                                var condDef1 = rule.getGroup(1);
                                var condDef2 = rule.getGroup(2);
                                expect(condDef1.getLogicalOperator()).toBe("AND");
                                expect(condDef2.getLogicalOperator()).toBe("AND");
                                condDef1.toggleLogicalOperator();
                                condDef2.toggleLogicalOperator();
                                rulePage.waitForSave();
                                rulePage.navigateTo();
                                rule = rulePage.findRule(name);
                                rule.expand().then(function () {
                                    var condDef1 = rule.getGroup(1);
                                    var condDef2 = rule.getGroup(2);
                                    expect(condDef1.getLogicalOperator()).toBe("OR");
                                    expect(condDef2.getLogicalOperator()).toBe("OR");
                                    rule.remove().then(done);
                                });
                            });
                        });
                    });
                });
            });
            it('should fire action for two true conditions ANDed together.', function (done) {
                rulePage.addRule('should fire action for two true conditions ANDed together.').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Connection, "is not", "fake value");
                    var condDef2 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value");
                    var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                    actionDef.typeSelect.setSearch("Set Response").then(function () {
                        rule.fireOn.el.click().then(function () {
                            var key = name.substring(0, name.indexOf('-should'));
                            actionDef.headerKeyTF.setValue(key);
                            actionDef.headerValueTF.setValue("value-AbcDef");
                            rule.toggleEnable.setValue(true);
                            rulePage.waitForSave(500).then(function () {
                                var robots = new RobotsTxtPage(TestUtil);
                                var respName = robots.getResponseHeader(key);
                                browser.driver.wait(respName, 1000, 'Wait failed');
                                expect(respName).toEqual("value-AbcDef");
                                rule.remove().then(done);
                            });
                        });
                    });
                });
            });
            it('should fire action for one true and one false condition ORed together.', function (done) {
                rulePage.addRule('should fire action for one true and one false condition ORed together.').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef0 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Connection, "is not", "fake value");
                    var condDef1 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is", "fake value", false);
                    var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                    actionDef.typeSelect.setSearch("Set Response").then(function () {
                        rule.fireOn.el.click().then(function () {
                            var key = name.substring(0, name.indexOf('-should'));
                            actionDef.headerKeyTF.setValue(key);
                            actionDef.headerValueTF.setValue("value-AbcDef");
                            rule.toggleEnable.setValue(true);
                            rulePage.waitForSave(500).then(function () {
                                var robots = new RobotsTxtPage(TestUtil);
                                var respName = robots.getResponseHeader(key);
                                browser.driver.wait(respName, 1000, 'Wait failed');
                                expect(respName).toEqual("value-AbcDef");
                                rule.remove().then(done);
                            });
                        });
                    });
                });
            });
            it('should not fire action for one true and one false condition ANDed together.', function (done) {
                rulePage.addRule('should not fire action for one true and one false condition ANDed together.').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef0 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Connection, "is not", "fake value");
                    var condDef1 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is", "fake value");
                    var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                    actionDef.typeSelect.setSearch("Set Response").then(function () {
                        rule.fireOn.el.click().then(function () {
                            var key = name.substring(0, name.indexOf('-should'));
                            actionDef.headerKeyTF.setValue(key);
                            actionDef.headerValueTF.setValue("value-AbcDef");
                            rule.toggleEnable.setValue(true);
                            rulePage.waitForSave(500).then(function () {
                                var robots = new RobotsTxtPage(TestUtil);
                                var respName = robots.getResponseHeader(key);
                                browser.driver.wait(respName, 1000, 'Wait failed');
                                expect(respName).toBeUndefined();
                                rule.remove().then(done);
                            });
                        });
                    });
                });
            });
            it('should not fire action for two false condition ORed together.', function (done) {
                rulePage.addRule('should not fire action for two false condition ORed together.').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef0 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Connection, "is", "fake value");
                    var condDef1 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is", "fake value", false);
                    var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                    actionDef.typeSelect.setSearch("Set Response").then(function () {
                        rule.fireOn.el.click().then(function () {
                            var key = name.substring(0, name.indexOf('-should'));
                            actionDef.headerKeyTF.setValue(key);
                            actionDef.headerValueTF.setValue("value-AbcDef");
                            rule.toggleEnable.setValue(true);
                            rulePage.waitForSave(500).then(function () {
                                var robots = new RobotsTxtPage(TestUtil);
                                var respName = robots.getResponseHeader(key);
                                browser.driver.wait(respName, 1000, 'Wait failed');
                                expect(respName).toBeUndefined();
                                rule.remove().then(done);
                            });
                        });
                    });
                });
            });
            it('should fire action for two true condition groups ANDed together.', function (done) {
                rulePage.addRule('should fire action for two true condition groups ANDed together.').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef0 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Connection, "is not", "fake value");
                    rule.addGroup().then(function () {
                        var condDef1 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value");
                        var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                        actionDef.typeSelect.setSearch("Set Response").then(function () {
                            rule.fireOn.el.click().then(function () {
                                var key = name.substring(0, name.indexOf('-should'));
                                actionDef.headerKeyTF.setValue(key);
                                actionDef.headerValueTF.setValue("value-AbcDef");
                                rule.toggleEnable.setValue(true);
                                rulePage.waitForSave(500).then(function () {
                                    var robots = new RobotsTxtPage(TestUtil);
                                    var respName = robots.getResponseHeader(key);
                                    browser.driver.wait(respName, 1000, 'Wait failed');
                                    expect(respName).toEqual("value-AbcDef");
                                    rule.remove().then(done);
                                });
                            });
                        });
                    });
                });
            });
            it('should fire action for group logic (true || false).', function (done) {
                rulePage.addRule('should fire action for group logic (true || false).').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef0 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Connection, "is not", "fake value");
                    rule.addGroup(false).then(function () {
                        var condDef1 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is", "fake value");
                        var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                        actionDef.typeSelect.setSearch("Set Response").then(function () {
                            rule.fireOn.el.click().then(function () {
                                var key = name.substring(0, name.indexOf('-should'));
                                actionDef.headerKeyTF.setValue(key);
                                actionDef.headerValueTF.setValue("value-AbcDef");
                                rule.toggleEnable.setValue(true);
                                rulePage.waitForSave(500).then(function () {
                                    var robots = new RobotsTxtPage(TestUtil);
                                    var respName = robots.getResponseHeader(key);
                                    browser.driver.wait(respName, 1000, 'Wait failed');
                                    expect(respName).toEqual("value-AbcDef");
                                    rule.remove().then(done);
                                });
                            });
                        });
                    });
                });
            });
            it('should fire action for group logic (false || true).', function (done) {
                rulePage.addRule('should fire action for group logic (false || true).').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef0 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Connection, "is", "fake value");
                    rule.addGroup(false).then(function () {
                        var condDef1 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value");
                        var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                        actionDef.typeSelect.setSearch("Set Response").then(function () {
                            rule.fireOn.el.click().then(function () {
                                var key = name.substring(0, name.indexOf('-should'));
                                actionDef.headerKeyTF.setValue(key);
                                actionDef.headerValueTF.setValue("value-AbcDef");
                                rule.toggleEnable.setValue(true);
                                rulePage.waitForSave(500).then(function () {
                                    var robots = new RobotsTxtPage(TestUtil);
                                    var respName = robots.getResponseHeader(key);
                                    browser.driver.wait(respName, 1000, 'Wait failed');
                                    expect(respName).toEqual("value-AbcDef");
                                    rule.remove().then(done);
                                });
                            });
                        });
                    });
                });
            });
            it('should not fire action for one false and one true condition groups ANDed together.', function (done) {
                rulePage.addRule('should not fire action for one false and one true condition groups ANDed together.').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef0 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is", "fake value A");
                    rule.addGroup().then(function () {
                        var condDef1 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value B");
                        var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                        actionDef.typeSelect.setSearch("Set Response").then(function () {
                            rule.fireOn.el.click().then(function () {
                                var key = name.substring(0, name.indexOf('-should'));
                                actionDef.headerKeyTF.setValue(key);
                                actionDef.headerValueTF.setValue("value-AbcDef");
                                rule.toggleEnable.setValue(true);
                                rulePage.waitForSave(500).then(function () {
                                    var robots = new RobotsTxtPage(TestUtil);
                                    var respName = robots.getResponseHeader(key);
                                    browser.driver.wait(respName, 1000, 'Wait failed');
                                    expect(respName).toBeUndefined();
                                    rule.remove().then(done);
                                });
                            });
                        });
                    });
                });
            });
            it('should fire action when group logic is: (true || true && false).', function (done) {
                rulePage.addRule('should fire action when group logic is: (true || true && false).').then(function (rule) {
                    var name = rule.name;
                    rule.fireOn.setSearch("Every Req");
                    var condDef0 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value A");
                    rule.addGroup(false).then(function () {
                        var condDef1 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is not", "fake value B");
                        rule.addGroup(false).then(function () {
                            var condDef2 = rule.createRequestHeaderCondition(rule_engine_page_1.TestRequestHeaderCondition.HEADER_KEYS.Accept, "is", "fake value C");
                            var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.actionEls.first());
                            actionDef.typeSelect.setSearch("Set Response").then(function () {
                                rule.fireOn.el.click().then(function () {
                                    var key = name.substring(0, name.indexOf('-should'));
                                    actionDef.headerKeyTF.setValue(key);
                                    actionDef.headerValueTF.setValue("value-AbcDef");
                                    rule.toggleEnable.setValue(true);
                                    rulePage.waitForSave(500).then(function () {
                                        var robots = new RobotsTxtPage(TestUtil);
                                        var respName = robots.getResponseHeader(key);
                                        browser.driver.wait(respName, 1000, 'Wait failed');
                                        expect(respName).toBe("value-AbcDef");
                                        rule.remove().then(done);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        describe('Rule Engine Actions', function () {
            var rulePage;
            beforeEach(function () {
                rulePage = new rule_engine_page_1.RulePage();
                rulePage.suppressAlerts(browser['browserName'] != 'chrome');
                rulePage.navigateTo();
            });
            it('should allow a value change on a valid Set Request Header Action.', function (done) {
                rulePage.addRule('should allow a value change on a valid Set Request Header Action.').then(function (rule) {
                    var name = rule.name;
                    var actionDef = rule.newSetResponseHeaderAction("someHeaderKey", "someHeaderValue");
                    rulePage.waitForSave();
                    rulePage.navigateTo();
                    rule = rulePage.findRule(name);
                    rule.expand().then(function () {
                        actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.firstAction().el);
                        expect(actionDef.getKey()).toEqual("someHeaderKey", "Key should have persisted.");
                        expect(actionDef.getValue()).toEqual("someHeaderValue", "Value should have persisted.");
                        actionDef.setHeaderKey("someHeaderKey2");
                        actionDef.setHeaderValue("someHeaderValue2");
                        rulePage.waitForSave();
                        rulePage.navigateTo();
                        rule = rulePage.findRule(name);
                        rule.expand().then(function () {
                            var actionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.firstAction().el);
                            var expectedKey = "someHeaderKey2";
                            var expectedValue = "someHeaderValue2";
                            actionDef.getKey().then(function (key) {
                                actionDef.getValue().then(function (value) {
                                    expect(key).toEqual(expectedKey, "Key change should have persisted.");
                                    expect(value).toEqual(expectedValue, "Value change should have persisted.");
                                    if (key == expectedKey && value == expectedValue) {
                                        rule.remove().then(done);
                                    }
                                });
                            });
                        });
                    });
                });
            });
            it('should allow action type to be changed to a Set Attribute Header from Set Response Header.', function (done) {
                rulePage.addRule('should allow action type to be changed to a Set Attribute Header from Set Response Header.').then(function (rule) {
                    var name = rule.name;
                    var headerActionDef = rule.newSetResponseHeaderAction("someHeaderKey", "someHeaderValue");
                    rulePage.waitForSave();
                    rulePage.navigateTo();
                    rule = rulePage.findRule(name);
                    rule.expand().then(function () {
                        var headerActionDef = new rule_engine_page_1.TestResponseHeaderAction(rule.firstAction().el);
                        headerActionDef.setType(rule_engine_page_1.TestSetRequestAttributeAction.TYPE_NAME);
                        var attributeActionDef = new rule_engine_page_1.TestSetRequestAttributeAction(headerActionDef.el);
                        attributeActionDef.setAttributeKey("someAttributeKey");
                        attributeActionDef.setAttributeValue("someAttributeValue");
                        rulePage.waitForSave();
                        rulePage.navigateTo();
                        rule = rulePage.findRule(name);
                        rule.expand().then(function () {
                            var attributeActionDef = new rule_engine_page_1.TestSetRequestAttributeAction(rule.firstAction().el);
                            attributeActionDef.getKey().then(function (key) {
                                attributeActionDef.getValue().then(function (value) {
                                    var expectedKey = "someAttributeKey";
                                    var expectedValue = "someAttributeValue";
                                    expect(key).toEqual(expectedKey, "Key change should have persisted.");
                                    expect(value).toEqual(expectedValue, "Value change should have persisted.");
                                    if (key == expectedKey && value == expectedValue) {
                                        rule.remove().then(done);
                                    }
                                });
                            });
                        });
                    });
                });
            });
            it('should allow multiple actions to be added if all existing actions are valid', function (done) {
                rulePage.addRule('should allow multiple actions to be added if all existing actions are valid').then(function (rule) {
                    var name = rule.name;
                    rule.newSetPersonaAction(rule_engine_page_1.TestPersonaAction.STARTER_VALUES.Retiree.label);
                    rule.addAction();
                    var actionDef = rule.newSetPersonaAction(rule_engine_page_1.TestPersonaAction.STARTER_VALUES.GlobalInvestor.label);
                    expect(actionDef.el.isPresent()).toBe(true);
                    expect(rule.actionEls.count()).toBe(2);
                    rule.remove().then(done);
                });
            });
        });
        describe('Rule Engine - Persona Action Type', function () {
            var rulePage;
            beforeEach(function () {
                rulePage = new rule_engine_page_1.RulePage();
                rulePage.suppressAlerts(browser['browserName'] != 'chrome');
                rulePage.navigateTo();
            });
            it('should have four values', function (done) {
                rulePage.addRule('should have four values').then(function (rule) {
                    var name = rule.name;
                    var actionDef = rule.newSetPersonaAction();
                    expect(actionDef.personaDD.items.count()).toEqual(4);
                    rule.remove().then(done);
                });
            });
            it('should save when a value is selected', function (done) {
                rulePage.addRule("should save when a value is selected").then(function (rule) {
                    var name = rule.name;
                    var actionDef = rule.newSetPersonaAction(rule_engine_page_1.TestPersonaAction.STARTER_VALUES.Retiree.label);
                    rulePage.waitForSave();
                    rulePage.navigateTo();
                    rule = rulePage.findRule(name);
                    rule.expand().then(function () {
                        actionDef = new rule_engine_page_1.TestPersonaAction(rule.firstAction().el);
                        actionDef.el.isPresent().then(function (present) {
                            browser.sleep(250);
                            actionDef.getPersonaName().then(function (personaName) {
                                var expected = rule_engine_page_1.TestPersonaAction.STARTER_VALUES.Retiree.label;
                                expect(present).toBe(true);
                                expect(personaName).toBe(expected);
                                if (present && personaName == expected) {
                                    rule.remove().then(function () {
                                        done();
                                    });
                                }
                            });
                        });
                    });
                });
            });
        });
    }
    exports_1("initSpec", initSpec);
    return {
        setters:[
            function (CwProtractor_1_1) {
                CwProtractor_1 = CwProtractor_1_1;
            },
            function (rule_engine_page_1_1) {
                rule_engine_page_1 = rule_engine_page_1_1;
            }],
        execute: function() {
            RobotsTxtPage = (function (_super) {
                __extends(RobotsTxtPage, _super);
                function RobotsTxtPage(TestUtil) {
                    _super.call(this, browser['testLoc']['core'] + '/robots.txt', '');
                    this.TestUtil = TestUtil;
                }
                RobotsTxtPage.prototype.getResponseHeader = function (key) {
                    var defer = protractor.promise.defer();
                    this.TestUtil.httpGet(this.getFullUrl()).then(function (result) {
                        var resp = result.response;
                        var headers = resp.headers;
                        defer.fulfill(headers[key]);
                    });
                    return defer;
                };
                return RobotsTxtPage;
            }(CwProtractor_1.Page));
        }
    }
});
//# sourceMappingURL=rule-engine.e2e.js.map