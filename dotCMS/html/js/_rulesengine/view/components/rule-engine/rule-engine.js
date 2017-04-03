System.register(['@angular/core', '@angular/common', './rule-component', "../../../api/rule-engine/Rule", "../../../api/system/locale/I18n", "../../../api/util/CwFilter"], function(exports_1, context_1) {
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
    var core_1, common_1, rule_component_1, Rule_1, I18n_1, CwFilter_1;
    var I8N_BASE, RuleEngineComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (rule_component_1_1) {
                rule_component_1 = rule_component_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (CwFilter_1_1) {
                CwFilter_1 = CwFilter_1_1;
            }],
        execute: function() {
            I8N_BASE = 'api.sites.ruleengine';
            /**
             *
             */
            RuleEngineComponent = (function () {
                function RuleEngineComponent(resources) {
                    this.ruleActionTypes = {};
                    this.conditionTypes = {};
                    this.createRule = new core_1.EventEmitter(false);
                    this.deleteRule = new core_1.EventEmitter(false);
                    this.updateName = new core_1.EventEmitter(false);
                    this.updateExpandedState = new core_1.EventEmitter(false);
                    this.updateEnabledState = new core_1.EventEmitter(false);
                    this.updateFireOn = new core_1.EventEmitter(false);
                    this.createRuleAction = new core_1.EventEmitter(false);
                    this.deleteRuleAction = new core_1.EventEmitter(false);
                    this.updateRuleActionType = new core_1.EventEmitter(false);
                    this.updateRuleActionParameter = new core_1.EventEmitter(false);
                    this.createConditionGroup = new core_1.EventEmitter(false);
                    this.updateConditionGroupOperator = new core_1.EventEmitter(false);
                    this.createCondition = new core_1.EventEmitter(false);
                    this.deleteCondition = new core_1.EventEmitter(false);
                    this.updateConditionType = new core_1.EventEmitter(false);
                    this.updateConditionParameter = new core_1.EventEmitter(false);
                    this.updateConditionOperator = new core_1.EventEmitter(false);
                    this.resources = resources;
                    resources.get(I8N_BASE).subscribe(function (rsrc) { });
                    this.filterText = "";
                    this.rules = [];
                    this._rsrcCache = {};
                    this.status = null;
                }
                RuleEngineComponent.prototype.rsrc = function (subkey) {
                    var x = this._rsrcCache[subkey];
                    if (!x) {
                        x = this.resources.get(I8N_BASE + '.rules.' + subkey);
                        this._rsrcCache[subkey] = x;
                    }
                    return x;
                };
                RuleEngineComponent.prototype.ngOnChange = function (change) {
                    if (change.rules) {
                        this.updateActiveRuleCount();
                    }
                };
                RuleEngineComponent.prototype.addRule = function () {
                    this.createRule.emit({ type: Rule_1.RULE_CREATE });
                };
                RuleEngineComponent.prototype.updateActiveRuleCount = function () {
                    this.activeRules = 0;
                    for (var i = 0; i < this.rules.length; i++) {
                        if (this.rules[i].enabled) {
                            this.activeRules++;
                        }
                    }
                };
                RuleEngineComponent.prototype.setFieldFilter = function (field, value) {
                    if (value === void 0) { value = null; }
                    // remove old status
                    var re = new RegExp(field + ':[\\w]*');
                    this.filterText = this.filterText.replace(re, ''); // whitespace issues: "blah:foo enabled:false mahRule"
                    if (value !== null) {
                        this.filterText = field + ':' + value + ' ' + this.filterText;
                    }
                };
                RuleEngineComponent.prototype.isFilteringField = function (field, value) {
                    if (value === void 0) { value = null; }
                    var isFiltering;
                    if (value === null) {
                        var re = new RegExp(field + ':[\\w]*');
                        isFiltering = this.filterText.match(re) != null;
                    }
                    else {
                        isFiltering = this.filterText.indexOf(field + ':' + value) >= 0;
                    }
                    return isFiltering;
                };
                RuleEngineComponent.prototype.isFiltered = function (rule) {
                    return CwFilter_1.CwFilter.isFiltered(rule, this.filterText);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], RuleEngineComponent.prototype, "rules", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RuleEngineComponent.prototype, "ruleActionTypes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], RuleEngineComponent.prototype, "loading", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], RuleEngineComponent.prototype, "globalError", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], RuleEngineComponent.prototype, "showRules", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RuleEngineComponent.prototype, "conditionTypes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], RuleEngineComponent.prototype, "environmentStores", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "createRule", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "deleteRule", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateName", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateExpandedState", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateEnabledState", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateFireOn", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "createRuleAction", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "deleteRuleAction", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateRuleActionType", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateRuleActionParameter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "createConditionGroup", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateConditionGroupOperator", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "createCondition", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "deleteCondition", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateConditionType", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateConditionParameter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleEngineComponent.prototype, "updateConditionOperator", void 0);
                RuleEngineComponent = __decorate([
                    core_1.Component({
                        selector: 'cw-rule-engine',
                        directives: [common_1.CORE_DIRECTIVES, rule_component_1.RuleComponent],
                        template: "\n  <div class=\"cw-modal-glasspane\"  [class.cw-loading]=\"loading\" *ngIf=\"loading\"></div>\n  <div *ngIf=\"!loading && globalError\" class=\"ui negative message cw-message\">\n    <div class=\"header\">{{globalError}}</div>\n    <p>Please contact an administrator</p>\n  </div>\n<div class=\"cw-rule-engine\" *ngIf=\"!loading && showRules\">\n  <div class=\"cw-header\">\n    <div flex layout=\"row\" layout-align=\"space-between center\">\n      <div flex layout=\"row\" layout-align=\"space-between center\" class=\"ui icon input\">\n        <i class=\"filter icon\"></i>\n        <input class=\"cw-rule-filter\" type=\"text\" placeholder=\"{{rsrc('inputs.filter.placeholder') | async}}\" [value]=\"filterText\" (keyup)=\"filterText = $event.target.value\">\n      </div>\n      <div flex=\"2\"></div>\n      <button class=\"ui button cw-button-add\" aria-label=\"Create a new rule\" (click)=\"addRule()\">\n        <i class=\"plus icon\" aria-hidden=\"true\"></i>{{rsrc('inputs.addRule.label') | async}}\n      </button>\n    </div>\n    <div class=\"cw-filter-links\">\n      <span>{{rsrc('inputs.filter.status.show.label') | async}}:</span>\n      <a href=\"javascript:void(0)\" class=\"cw-filter-link\" [class.active]=\"!isFilteringField('enabled')\" (click)=\"setFieldFilter('enabled',null)\">{{rsrc('inputs.filter.status.all.label') | async}}</a>\n      <span>&#124;</span>\n      <a href=\"javascript:void(0)\" class=\"cw-filter-link\" [class.active]=\"isFilteringField('enabled',true)\" (click)=\"setFieldFilter('enabled',true)\">{{rsrc('inputs.filter.status.active.label') | async}}</a>\n      <span>&#124;</span>\n      <a href=\"javascript:void(0)\" class=\"cw-filter-link\" [class.active]=\"isFilteringField('enabled',false)\" (click)=\"setFieldFilter('enabled',false)\">{{rsrc('inputs.filter.status.inactive.label') | async}}</a>\n    </div>\n  </div>\n  <rule *ngFor=\"let rule of rules\" [rule]=\"rule\" [hidden]=\"isFiltered(rule) == true\"\n        [environmentStores]=\"environmentStores\"\n        [ruleActions]=\"rule._ruleActions\"\n        [ruleActionTypes]=\"ruleActionTypes\"\n        [conditionTypes]=\"conditionTypes\"\n        [saved]=\"rule._saved\"\n        [saving]=\"rule._saving\"\n        [errors]=\"rule._errors\"\n        (updateName)=\"updateName.emit($event)\"\n        (updateFireOn)=\"updateFireOn.emit($event)\"\n        (updateEnabledState)=\"updateEnabledState.emit($event)\"\n        (updateExpandedState)=\"updateExpandedState.emit($event)\"\n        \n        (createRuleAction)=\"createRuleAction.emit($event)\"\n        (updateRuleActionType)=\"updateRuleActionType.emit($event)\"\n        (updateRuleActionParameter)=\"updateRuleActionParameter.emit($event)\"\n        (deleteRuleAction)=\"deleteRuleAction.emit($event)\"\n        \n        (createCondition)=\"createCondition.emit($event)\"\n        (createConditionGroup)=\"createConditionGroup.emit($event)\"\n        (updateConditionGroupOperator)=\"updateConditionGroupOperator.emit($event)\"\n        (updateConditionType)=\"updateConditionType.emit($event)\"\n        (updateConditionParameter)=\"updateConditionParameter.emit($event)\"\n        (updateConditionOperator)=\"updateConditionOperator.emit($event)\"\n        (deleteCondition)=\"deleteCondition.emit($event)\"\n\n        (deleteRule)=\"deleteRule.emit($event)\"></rule>\n</div>\n\n"
                    }), 
                    __metadata('design:paramtypes', [I18n_1.I18nService])
                ], RuleEngineComponent);
                return RuleEngineComponent;
            }());
            exports_1("RuleEngineComponent", RuleEngineComponent);
        }
    }
});
//# sourceMappingURL=rule-engine.js.map