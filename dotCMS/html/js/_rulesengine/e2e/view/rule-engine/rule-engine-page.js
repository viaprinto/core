System.register(["../../../e2e/CwProtractor"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var CwProtractor_1;
    var RulePage, TestRuleComponent, TestConditionGroupComponent, TestRuleInputRow, TestParameter, TestConditionComponent, TestRequestHeaderCondition, TestActionComponent, TestResponseHeaderAction, TestSetRequestAttributeAction, TestPersonaAction;
    return {
        setters:[
            function (CwProtractor_1_1) {
                CwProtractor_1 = CwProtractor_1_1;
            }],
        execute: function() {
            RulePage = (function (_super) {
                __extends(RulePage, _super);
                function RulePage(locale) {
                    if (locale === void 0) { locale = null; }
                    _super.call(this, browser['testLoc']['coreWeb'] + '/build/index.html', '(Dev) dotCMS Core-Web');
                    if (locale) {
                        this.queryParams['locale'] = locale;
                    }
                    this.filterBox = element(by.css('.filter.icon + INPUT'));
                    this._addRuleButton = new CwProtractor_1.TestButton(element(by.css('.cw-button-add')));
                    this.ruleEls = element.all(by.tagName('rule'));
                }
                RulePage.prototype.setFilter = function (text) {
                    return this.filterBox.sendKeys(text);
                };
                RulePage.prototype.getFilter = function () {
                    return this.filterBox.getAttribute('value');
                };
                RulePage.prototype.getFilterPlaceholder = function () {
                    return this.filterBox.getAttribute('placeholder');
                };
                RulePage.prototype.suppressAlerts = function (value) {
                    this.queryParams['suppressAlerts'] = value ? 'true' : 'false';
                };
                RulePage.prototype.waitForSave = function (timeout) {
                    if (timeout === void 0) { timeout = 250; }
                    return browser.sleep(timeout);
                };
                RulePage.prototype.saveAndReload = function () {
                    var _this = this;
                    return this.waitForSave().then(function () { return _this.navigateTo(); });
                };
                RulePage.prototype.addRule = function (nameSuffix) {
                    var _this = this;
                    if (nameSuffix === void 0) { nameSuffix = null; }
                    var name = "e2e-" + browser['browserName'] + '-' + new Date().getTime();
                    if (nameSuffix) {
                        name = name + '-' + nameSuffix;
                    }
                    return this._addRuleButton.click().then(function () {
                        var rule = _this.firstRule();
                        rule.setName(name);
                        rule.fireOn.el.click();
                        return rule;
                    });
                };
                RulePage.prototype.ruleCount = function () {
                    return this.ruleEls.count();
                };
                RulePage.prototype.firstRule = function () {
                    return new TestRuleComponent(this.ruleEls.first());
                };
                RulePage.prototype.findRule = function (name) {
                    var rule = element(by.xpath("//input[@value='" + name + "']/ancestor::rule"));
                    return new TestRuleComponent(rule);
                };
                RulePage.prototype.rules = function () {
                    var _this = this;
                    return new Promise(function (accept, reject) {
                        var ary = [];
                        _this.ruleEls.then(function (resolvedRuleEls) {
                            resolvedRuleEls.forEach(function (ruleEl) {
                                ary.push(new TestRuleComponent(ruleEl));
                            });
                            accept(ary);
                        });
                    });
                };
                RulePage.prototype.removeAllRules = function () {
                    var _this = this;
                    return new Promise(function (a, r) {
                        _this.ruleEls.each(function (ruleEl) {
                            new TestRuleComponent(ruleEl).remove();
                        });
                        a();
                    });
                };
                return RulePage;
            }(CwProtractor_1.Page));
            exports_1("RulePage", RulePage);
            TestRuleComponent = (function () {
                function TestRuleComponent(root) {
                    this.el = root;
                    this.mainBody = root.element(by.css('.cw-accordion-body'));
                    this.header = root.element(by.css('.cw-header'));
                    this.expandoCaret = this.header.element(by.css('.cw-rule-caret'));
                    this.nameEl = new CwProtractor_1.TestInputText(root.element(by.css('.cw-rule-name-input')));
                    this.fireOn = new CwProtractor_1.TestInputDropdown(root.element(by.css('.cw-fire-on-dropdown')));
                    this.toggleEnable = new CwProtractor_1.TestInputToggle(root.element(by.tagName('cw-toggle-input')));
                    this.removeBtn = new CwProtractor_1.TestButton(root.element(by.css('.cw-delete-rule')));
                    this.addGroupBtn = new CwProtractor_1.TestButton(root.element(by.css('.cw-add-group')));
                    this.conditionGroupEls = root.all(by.tagName('condition-group'));
                    this.actionEls = root.all(by.tagName('rule-action'));
                    this.addActionButtonEl = new CwProtractor_1.TestButton(this.el.element(by.css(".cw-action-row .cw-button-add-item")));
                }
                TestRuleComponent.prototype.setName = function (name) {
                    this.name = name;
                    return this.nameEl.setValue(name);
                };
                TestRuleComponent.prototype.getName = function () {
                    var _this = this;
                    var v = this.nameEl.getValue();
                    v = v.then(function (name) { return _this.name = name; });
                    return v;
                };
                TestRuleComponent.prototype.getFireOn = function () {
                    return this.fireOn.getValueText();
                };
                TestRuleComponent.prototype.setFireOn = function (value) {
                    return this.fireOn.setSearch(value);
                };
                TestRuleComponent.prototype.isShowingBody = function () {
                    return this.mainBody.isPresent();
                };
                TestRuleComponent.prototype.expand = function () {
                    var _this = this;
                    return this.isShowingBody().then(function (yup) {
                        if (!yup) {
                            return _this.expandoCaret.click();
                        }
                    });
                };
                TestRuleComponent.prototype.firstGroup = function () {
                    return new TestConditionGroupComponent(this.conditionGroupEls.first());
                };
                TestRuleComponent.prototype.lastGroup = function () {
                    return new TestConditionGroupComponent(this.conditionGroupEls.last());
                };
                TestRuleComponent.prototype.getGroup = function (index) {
                    return new TestConditionGroupComponent(this.conditionGroupEls.get(index));
                };
                TestRuleComponent.prototype.addAction = function () {
                    return this.addActionButtonEl.click();
                };
                TestRuleComponent.prototype.firstAction = function () {
                    return new TestActionComponent(this.actionEls.first());
                };
                TestRuleComponent.prototype.lastAction = function () {
                    return new TestActionComponent(this.actionEls.last());
                };
                TestRuleComponent.prototype.addGroup = function (isAnd) {
                    var _this = this;
                    if (isAnd === void 0) { isAnd = true; }
                    var p = this.addGroupBtn.click();
                    if (!isAnd) {
                        p = p.then(function () { return _this.lastGroup().toggleLogicalOperator(); });
                    }
                    return p;
                };
                TestRuleComponent.prototype.createRequestHeaderCondition = function (key, condition, value, isAnd) {
                    if (key === void 0) { key = "Accept"; }
                    if (condition === void 0) { condition = TestConditionComponent.COMPARE_IS; }
                    if (value === void 0) { value = "AbcDef"; }
                    if (isAnd === void 0) { isAnd = true; }
                    var condGroup = this.lastGroup();
                    var conditionDef = new TestRequestHeaderCondition(condGroup.last().el);
                    conditionDef.typeSelect.setSearch("Request Hea");
                    conditionDef.setHeaderKey(key);
                    conditionDef.setComparison(condition);
                    conditionDef.setHeaderValue(value);
                    if (!isAnd) {
                        conditionDef.toggleLogicalTest();
                    }
                    condGroup.addCondition();
                    return conditionDef;
                };
                TestRuleComponent.prototype.newSetResponseHeaderAction = function (key, value) {
                    var actionDef = new TestResponseHeaderAction(this.firstAction().el);
                    actionDef.typeSelect.setSearch("Set Response Header");
                    this.fireOn.el.click();
                    if (key) {
                        actionDef.setHeaderKey(key);
                    }
                    if (value) {
                        actionDef.setHeaderValue(value);
                    }
                    this.fireOn.el.click();
                    return actionDef;
                };
                TestRuleComponent.prototype.newSetPersonaAction = function (value) {
                    var actionDef = new TestPersonaAction(this.actionEls.last());
                    actionDef.typeSelect.setSearch(TestPersonaAction.TYPE_NAME);
                    this.fireOn.el.click();
                    if (value) {
                        actionDef.setPersona(value);
                    }
                    this.fireOn.el.click();
                    return actionDef;
                };
                TestRuleComponent.prototype.newSetRequestAttributeAction = function (key, value) {
                    var actionDef = new TestSetRequestAttributeAction(this.firstAction().el);
                    actionDef.typeSelect.setSearch("Set Request Attribute");
                    this.fireOn.el.click();
                    if (key) {
                        actionDef.setAttributeKey(key);
                    }
                    if (value) {
                        actionDef.setAttributeValue(value);
                    }
                    this.fireOn.el.click();
                    return actionDef;
                };
                TestRuleComponent.prototype.remove = function () {
                    var result;
                    if ((browser['browserName'].indexOf('safari') !== -1) || (browser['browserName'].indexOf('internet explorer') !== -1)) {
                        result = this.removeBtn.click();
                    }
                    else {
                        result = this.removeBtn.optShiftClick();
                    }
                    result.then(function () {
                        return browser.sleep(250);
                    });
                    return result;
                };
                return TestRuleComponent;
            }());
            exports_1("TestRuleComponent", TestRuleComponent);
            TestConditionGroupComponent = (function () {
                function TestConditionGroupComponent(el) {
                    this.el = el;
                    this.conditionEls = el.all(by.tagName('rule-condition'));
                    this.addConditionBtn = new CwProtractor_1.TestButton(el.element(by.css('.cw-condition-row .cw-button-add-item')));
                    this.logicalTestBtn = new CwProtractor_1.TestButton(el.element(by.css('.cw-group-operator')));
                }
                TestConditionGroupComponent.prototype.first = function () {
                    return new TestRequestHeaderCondition(this.conditionEls.first());
                };
                TestConditionGroupComponent.prototype.last = function () {
                    return new TestRequestHeaderCondition(this.conditionEls.last());
                };
                TestConditionGroupComponent.prototype.addCondition = function () {
                    return this.addConditionBtn.click();
                };
                TestConditionGroupComponent.prototype.toggleLogicalOperator = function () {
                    return this.logicalTestBtn.click();
                };
                TestConditionGroupComponent.prototype.getLogicalOperator = function () {
                    return this.logicalTestBtn.el.element(by.tagName('div')).getText();
                };
                return TestConditionGroupComponent;
            }());
            exports_1("TestConditionGroupComponent", TestConditionGroupComponent);
            TestRuleInputRow = (function () {
                function TestRuleInputRow(el) {
                    this.el = el;
                    this.typeSelect = new CwProtractor_1.TestInputDropdown(el.element(by.css('.cw-type-dropdown')));
                    this.parameterEls = this.el.all(by.css('.cw-input'));
                }
                TestRuleInputRow.prototype.parameters = function () {
                    var _this = this;
                    return new Promise(function (accept, reject) {
                        var ary = [];
                        var proms = [];
                        _this.parameterEls.each(function (el, idx) {
                            var promise = new Promise(function (a, r) {
                                el.getTagName().then(function (name) {
                                    var comp = TestRuleInputRow.inputFromElName(el, name);
                                    ary.push(comp);
                                    a(comp);
                                });
                            });
                            proms.push(promise);
                        });
                        Promise.all(proms).then(function (x) {
                            accept(ary);
                        });
                    });
                };
                TestRuleInputRow.prototype.setType = function (typeName) {
                    this.typeSelect.setSearch(typeName + '\t');
                };
                TestRuleInputRow.inputFromElName = function (el, name) {
                    var component;
                    if (name == 'cw-input-text') {
                        component = new CwProtractor_1.TestInputText(el);
                    }
                    else if (name == 'cw-input-dropdown') {
                        component = new CwProtractor_1.TestInputDropdown(el);
                    }
                    return component;
                };
                return TestRuleInputRow;
            }());
            exports_1("TestRuleInputRow", TestRuleInputRow);
            TestParameter = (function () {
                function TestParameter(el) {
                    this.el = el;
                }
                return TestParameter;
            }());
            exports_1("TestParameter", TestParameter);
            TestConditionComponent = (function (_super) {
                __extends(TestConditionComponent, _super);
                function TestConditionComponent(el) {
                    _super.call(this, el);
                    this.compareDD = new CwProtractor_1.TestInputDropdown(el.element(by.css('.cw-comparator-selector')));
                    this.logicalTestBtn = new CwProtractor_1.TestButton(el.element(by.css('.cw-button-toggle-operator')));
                }
                /**
                 *
                 * @param to
                 * @param next The target to navigate to after setting the seach, in order to trigger a change event.
                 * @returns {webdriver.promise.Promise<void>}
                 */
                TestConditionComponent.prototype.setComparison = function (to) {
                    return this.compareDD.setSearch(to);
                };
                TestConditionComponent.prototype.toggleLogicalTest = function () {
                    return this.logicalTestBtn.click();
                };
                TestConditionComponent.COMPARE_IS = "Is";
                TestConditionComponent.COMPARE_IS_NOT = "Is not";
                return TestConditionComponent;
            }(TestRuleInputRow));
            exports_1("TestConditionComponent", TestConditionComponent);
            TestRequestHeaderCondition = (function (_super) {
                __extends(TestRequestHeaderCondition, _super);
                function TestRequestHeaderCondition(el) {
                    _super.call(this, el);
                    this.headerKeyDD = new CwProtractor_1.TestInputDropdown(this.parameterEls.first());
                    this.headerValueTF = new CwProtractor_1.TestInputText(this.parameterEls.last());
                }
                TestRequestHeaderCondition.prototype.setHeaderValue = function (val) {
                    var p = this.headerValueTF.setValue(val);
                    this.headerKeyDD.el.click();
                    return p;
                };
                TestRequestHeaderCondition.prototype.setHeaderKey = function (key) {
                    var p = this.headerKeyDD.setSearch(key);
                    this.headerValueTF.el.click();
                    return p;
                };
                TestRequestHeaderCondition.HEADER_KEYS = {
                    Accept: 'Accept',
                    Connection: 'Connection',
                    ContentLength: 'content-length',
                };
                return TestRequestHeaderCondition;
            }(TestConditionComponent));
            exports_1("TestRequestHeaderCondition", TestRequestHeaderCondition);
            TestActionComponent = (function (_super) {
                __extends(TestActionComponent, _super);
                function TestActionComponent(el) {
                    _super.call(this, el);
                }
                return TestActionComponent;
            }(TestRuleInputRow));
            exports_1("TestActionComponent", TestActionComponent);
            TestResponseHeaderAction = (function (_super) {
                __extends(TestResponseHeaderAction, _super);
                function TestResponseHeaderAction(el) {
                    _super.call(this, el);
                    this.headerKeyTF = new CwProtractor_1.TestInputText(this.parameterEls.first());
                    this.headerValueTF = new CwProtractor_1.TestInputText(this.parameterEls.last());
                }
                TestResponseHeaderAction.prototype.getKey = function () {
                    return this.headerKeyTF.getValue();
                };
                TestResponseHeaderAction.prototype.getValue = function () {
                    return this.headerValueTF.getValue();
                };
                TestResponseHeaderAction.prototype.setHeaderKey = function (val) {
                    return this.headerKeyTF.setValue(val, this.headerValueTF.el);
                };
                TestResponseHeaderAction.prototype.setHeaderValue = function (val) {
                    return this.headerValueTF.setValue(val, this.headerKeyTF.el);
                };
                TestResponseHeaderAction.TYPE_NAME = "Set Response Header";
                return TestResponseHeaderAction;
            }(TestActionComponent));
            exports_1("TestResponseHeaderAction", TestResponseHeaderAction);
            TestSetRequestAttributeAction = (function (_super) {
                __extends(TestSetRequestAttributeAction, _super);
                function TestSetRequestAttributeAction(el) {
                    _super.call(this, el);
                    this.attributeKeyTF = new CwProtractor_1.TestInputText(this.parameterEls.first());
                    this.attributeValueTF = new CwProtractor_1.TestInputText(this.parameterEls.last());
                }
                TestSetRequestAttributeAction.prototype.getKey = function () {
                    return this.attributeKeyTF.getValue();
                };
                TestSetRequestAttributeAction.prototype.getValue = function () {
                    return this.attributeValueTF.getValue();
                };
                TestSetRequestAttributeAction.prototype.setAttributeKey = function (val) {
                    return this.attributeKeyTF.setValue(val);
                };
                TestSetRequestAttributeAction.prototype.setAttributeValue = function (val) {
                    return this.attributeValueTF.setValue(val, this.attributeKeyTF.el);
                };
                TestSetRequestAttributeAction.TYPE_NAME = "Set Request Attribute";
                return TestSetRequestAttributeAction;
            }(TestActionComponent));
            exports_1("TestSetRequestAttributeAction", TestSetRequestAttributeAction);
            TestPersonaAction = (function (_super) {
                __extends(TestPersonaAction, _super);
                function TestPersonaAction(el) {
                    _super.call(this, el);
                    this.personaDD = new CwProtractor_1.TestInputDropdown(el.element(by.css('.cw-condition-component-body cw-input-dropdown')));
                }
                TestPersonaAction.prototype.getPersonaName = function () {
                    return this.personaDD.getValueText();
                };
                TestPersonaAction.prototype.getPersonaValue = function () {
                    return this.personaDD.getValueText();
                };
                TestPersonaAction.prototype.setPersona = function (value) {
                    return this.personaDD.setSearch(value);
                };
                TestPersonaAction.TYPE_NAME = "Set Persona";
                TestPersonaAction.STARTER_VALUES = {
                    "FirstTimeInvestor": { label: "First Time Investor", value: "34c720cd-4b46-4a67-9e4b-2117071d01f1" },
                    "Retiree": { label: "Retiree", value: "914c93c2-800a-4638-8832-349c221cc87a" },
                    "WealthyProspect": { label: "Wealthy Prospect", value: "d4ffa84f-8746-46f8-ac29-1f8ca2c7eaeb" },
                    "GlobalInvestor": { label: "Global Investor", value: "1c56ba62-1f41-4b81-bd62-b6eacff3ad23" },
                };
                return TestPersonaAction;
            }(TestActionComponent));
            exports_1("TestPersonaAction", TestPersonaAction);
        }
    }
});
//# sourceMappingURL=rule-engine-page.js.map