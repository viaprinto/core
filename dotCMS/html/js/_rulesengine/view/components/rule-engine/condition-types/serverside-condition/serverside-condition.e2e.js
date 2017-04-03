System.register(["../../../../../e2e/CwProtractor"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CwProtractor_1;
    var TextInput, PageInputs, ServerSideConditionPage;
    return {
        setters:[
            function (CwProtractor_1_1) {
                CwProtractor_1 = CwProtractor_1_1;
            }],
        execute: function() {
            TextInput = (function () {
                function TextInput(root) {
                    this.root = root;
                    this.valueInput = this.root.element(by.tagName('INPUT'));
                }
                return TextInput;
            }());
            PageInputs = (function () {
                function PageInputs() {
                    this.demoOneRequestHeaderDD = new CwProtractor_1.TestInputDropdown(element.all(by.tagName('cw-input-dropdown')).get(0));
                    this.demoOneComparisonDD = new CwProtractor_1.TestInputDropdown(element.all(by.tagName('cw-input-dropdown')).get(1));
                    this.demoOneRequestValueTF = new TextInput(element.all(by.tagName('cw-input-text')).get(0));
                }
                return PageInputs;
            }());
            ServerSideConditionPage = (function () {
                function ServerSideConditionPage() {
                    this.url = 'http://localhost:9000/build/view/components/rule-engine/condition-types/serverside-condition/index.html';
                    this.title = 'Serverside Condition Demo';
                    this.inputs = new PageInputs();
                }
                return ServerSideConditionPage;
            }());
            describe('The serverside condtion demo', function () {
                it('should have a title.', function () {
                    var page = new ServerSideConditionPage();
                    browser.get(page.url);
                    expect(browser.getTitle()).toEqual(page.title);
                });
                it('should have three inputs from demo one.', function () {
                    var page = new ServerSideConditionPage();
                    browser.get(page.url);
                    expect(page.inputs.demoOneRequestHeaderDD.el).toBeDefined("Dropdown for demo 1 should exist");
                    expect(page.inputs.demoOneRequestHeaderDD.search).toBeDefined("Search box demo 1 should exist");
                    expect(page.inputs.demoOneRequestHeaderDD.valueInput).toBeDefined("Hidden input for demo 1 should exist");
                });
                it('has 43 pre-defined optoin values for the header-value dropdown.', function () {
                    var page = new ServerSideConditionPage();
                    browser.get(page.url);
                    var dd = page.inputs.demoOneRequestHeaderDD;
                    expect(dd.items.count()).toEqual(43);
                });
                it('has 7 pre-defined option values for the comparison dropdown.', function () {
                    var page = new ServerSideConditionPage();
                    browser.get(page.url);
                    var dd = page.inputs.demoOneComparisonDD;
                    expect(dd.items.count()).toEqual(7);
                });
                it('has a text-input field for the user value.', function () {
                    var page = new ServerSideConditionPage();
                    browser.get(page.url);
                    var tf = page.inputs.demoOneRequestValueTF;
                    expect(tf.root).toBeDefined("The header value textfield should exist.");
                    expect(tf.valueInput).toBeDefined("The header value textfield should have an input element child.");
                    expect(tf.valueInput.getAttribute('placeholder')).toEqual("header-value", "The placeholder should be set.");
                });
                it('allows searching on the header-value dropdown.', function () {
                    var page = new ServerSideConditionPage();
                    browser.get(page.url);
                    page = new ServerSideConditionPage();
                    var dd = page.inputs.demoOneRequestHeaderDD;
                    var compareDD = page.inputs.demoOneComparisonDD;
                    dd.search.sendKeys("Conn");
                    var visibleItems = dd.menu.all(by.css('[class="item selected"]'));
                    expect(visibleItems.count()).toEqual(1, "There should only be one element unfiltered, and it should be selected.");
                    compareDD.el.click(); // click away from this dd to close menu and set value.
                    var value = dd.getValueText();
                    expect(value).toEqual("Connection", "Value should have been set to Connection because it was only search result.");
                });
            });
        }
    }
});
//# sourceMappingURL=serverside-condition.e2e.js.map