System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Page, TestButton, TestInputComponent, TestInputText, TestInputDropdown, TestInputToggle;
    return {
        setters:[],
        execute: function() {
            Page = (function () {
                function Page(baseUrl, title, queryParams) {
                    if (queryParams === void 0) { queryParams = {}; }
                    this.baseUrl = baseUrl;
                    this.title = title;
                    this.queryParams = queryParams;
                }
                Page.prototype.getFullUrl = function () {
                    var _this = this;
                    var sep = '?';
                    var v = Object.keys(this.queryParams).reduce(function (url, param) {
                        var next = sep + url + param + '=' + _this.queryParams[param] + '&';
                        sep = '&';
                        return next;
                    }, "");
                    return this.baseUrl + v;
                };
                Page.prototype.navigateTo = function () {
                    var _this = this;
                    var result = browser.get(this.getFullUrl());
                    expect(browser.getTitle()).toEqual(this.title);
                    return result.then(function () { return _this; });
                };
                Page.logBrowserConsole = function () {
                    browser.manage().logs().get('browser').then(function (browserLog) {
                        //noinspection TypeScriptUnresolvedFunction
                        console.log('log: ' + require('util').inspect(browserLog));
                    });
                };
                return Page;
            }());
            exports_1("Page", Page);
            TestButton = (function () {
                function TestButton(el) {
                    this.el = el;
                }
                TestButton.prototype.click = function () {
                    return this.el.click();
                };
                /**
                 * Alt/Opt + Shift + Click is an undocumented convenience for supressing alerts that would
                 * otherwise be displayed. Note that this method of 'clicking' does not work on Safari.
                 * @returns {webdriver.promise.Promise<void>}
                 */
                TestButton.prototype.optShiftClick = function () {
                    return this.el.sendKeys(protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.ALT, ' '));
                };
                return TestButton;
            }());
            exports_1("TestButton", TestButton);
            TestInputComponent = (function () {
                function TestInputComponent(el) {
                    this.el = el;
                }
                return TestInputComponent;
            }());
            exports_1("TestInputComponent", TestInputComponent);
            TestInputText = (function (_super) {
                __extends(TestInputText, _super);
                function TestInputText(el) {
                    _super.call(this, el);
                    this.valueInput = this.el.element(by.tagName('INPUT'));
                    this.icon = this.el.element(by.tagName('I'));
                }
                TestInputText.prototype.focus = function () {
                    return this.valueInput.click();
                };
                TestInputText.prototype.placeholder = function () {
                    return this.valueInput.getAttribute('placeholder');
                };
                TestInputText.prototype.getValue = function () {
                    return this.valueInput.getAttribute('value');
                };
                TestInputText.prototype.setValue = function (value, el) {
                    this.valueInput.clear();
                    var p = this.valueInput.sendKeys(value);
                    if (el) {
                        p = el.click();
                    }
                    return p;
                };
                return TestInputText;
            }(TestInputComponent));
            exports_1("TestInputText", TestInputText);
            TestInputDropdown = (function (_super) {
                __extends(TestInputDropdown, _super);
                function TestInputDropdown(root) {
                    _super.call(this, root);
                    this.search = root.element(by.css('cw-input-dropdown INPUT.search'));
                    this.valueInput = root.element(by.css('cw-input-dropdown INPUT[type="hidden"]'));
                    this.valueDisplay = root.element(by.css('cw-input-dropdown DIV.text'));
                    this.menu = root.element(by.css('[class~="menu"]'));
                    this.items = this.menu.all(by.css('[class~="item"]'));
                }
                TestInputDropdown.prototype.setSearch = function (value) {
                    this.search.clear();
                    var p = this.search.sendKeys(value);
                    p = browser.element(by.css('body')).click();
                    return p;
                };
                TestInputDropdown.prototype.getValueText = function () {
                    return this.valueDisplay.getText();
                };
                return TestInputDropdown;
            }(TestInputComponent));
            exports_1("TestInputDropdown", TestInputDropdown);
            TestInputToggle = (function (_super) {
                __extends(TestInputToggle, _super);
                function TestInputToggle(root) {
                    _super.call(this, root);
                    this.valueInput = root.element(by.tagName('INPUT'));
                    this.button = root.element(by.css('.ui.toggle')).element(by.tagName('input'));
                }
                TestInputToggle.prototype.toggle = function () {
                    return this.button.click();
                };
                TestInputToggle.prototype.setValue = function (enabled) {
                    var _this = this;
                    return this.value().then(function (b) {
                        if (b !== enabled) {
                            return _this.toggle();
                        }
                    });
                };
                TestInputToggle.prototype.value = function () {
                    return this.valueInput.getAttribute('value').then(function (v) {
                        return v === 'true';
                    });
                };
                TestInputToggle.prototype.getValueText = function () {
                    return this.valueInput.getText();
                };
                return TestInputToggle;
            }(TestInputComponent));
            exports_1("TestInputToggle", TestInputToggle);
        }
    }
});
//# sourceMappingURL=CwProtractor.js.map