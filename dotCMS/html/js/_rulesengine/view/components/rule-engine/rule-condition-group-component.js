System.register(['@angular/core', '@angular/common', './rule-condition-component', "../../../api/rule-engine/ServerSideFieldModel", "../../../api/system/locale/I18n", "../../../api/rule-engine/Rule"], function(exports_1, context_1) {
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
    var core_1, common_1, rule_condition_component_1, ServerSideFieldModel_1, I18n_1, Rule_1;
    var ConditionGroupComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (rule_condition_component_1_1) {
                rule_condition_component_1 = rule_condition_component_1_1;
            },
            function (ServerSideFieldModel_1_1) {
                ServerSideFieldModel_1 = ServerSideFieldModel_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            }],
        execute: function() {
            ConditionGroupComponent = (function () {
                function ConditionGroupComponent(resources) {
                    this.groupIndex = 0;
                    this.deleteConditionGroup = new core_1.EventEmitter(false);
                    this.updateConditionGroupOperator = new core_1.EventEmitter(false);
                    this.createCondition = new core_1.EventEmitter(false);
                    this.deleteCondition = new core_1.EventEmitter(false);
                    this.updateConditionType = new core_1.EventEmitter(false);
                    this.updateConditionParameter = new core_1.EventEmitter(false);
                    this.updateConditionOperator = new core_1.EventEmitter(false);
                    this.resources = resources;
                    this._rsrcCache = {};
                }
                ConditionGroupComponent.prototype.ngOnChanges = function (changes) {
                    if (changes.group && this.group && this.group._conditions.length === 0) {
                        this.group._conditions.push(new Rule_1.ConditionModel({ _type: new ServerSideFieldModel_1.ServerSideTypeModel() }));
                    }
                };
                ConditionGroupComponent.prototype.rsrc = function (subkey) {
                    var x = this._rsrcCache[subkey];
                    if (!x) {
                        x = this.resources.get(ConditionGroupComponent.I8N_BASE + '.' + subkey);
                        this._rsrcCache[subkey] = x;
                    }
                    return x;
                };
                ConditionGroupComponent.prototype.onCreateCondition = function () {
                    console.log("ConditionGroupComponent", "onCreateCondition");
                    this.createCondition.emit({ type: Rule_1.RULE_CONDITION_CREATE, payload: { conditionGroup: this.group, index: this.groupIndex } });
                };
                ConditionGroupComponent.prototype.toggleGroupOperator = function () {
                    var value = this.group.operator === "AND" ? "OR" : "AND";
                    this.updateConditionGroupOperator.emit({ type: Rule_1.RULE_CONDITION_GROUP_UPDATE_OPERATOR, payload: { conditionGroup: this.group, value: value, index: this.groupIndex } });
                };
                ConditionGroupComponent.I8N_BASE = 'api.sites.ruleengine.rules';
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Rule_1.ConditionGroupModel)
                ], ConditionGroupComponent.prototype, "group", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ConditionGroupComponent.prototype, "conditionTypePlaceholder", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], ConditionGroupComponent.prototype, "groupIndex", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ConditionGroupComponent.prototype, "conditionTypes", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionGroupComponent.prototype, "deleteConditionGroup", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionGroupComponent.prototype, "updateConditionGroupOperator", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionGroupComponent.prototype, "createCondition", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionGroupComponent.prototype, "deleteCondition", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionGroupComponent.prototype, "updateConditionType", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionGroupComponent.prototype, "updateConditionParameter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionGroupComponent.prototype, "updateConditionOperator", void 0);
                ConditionGroupComponent = __decorate([
                    core_1.Component({
                        selector: 'condition-group',
                        directives: [common_1.CORE_DIRECTIVES, rule_condition_component_1.ConditionComponent],
                        template: "<div class=\"cw-rule-group\">\n  <div class=\"cw-condition-group-separator\" *ngIf=\"groupIndex === 0\">\n    {{rsrc('inputs.group.whenConditions.label') | async}}\n  </div>\n  <div class=\"cw-condition-group-separator\" *ngIf=\"groupIndex !== 0\">\n    <div class=\"ui basic icon buttons\">\n      <button class=\"ui small button cw-group-operator\" (click)=\"toggleGroupOperator()\">\n        <div>{{group.operator}}</div>\n      </button>\n    </div>\n    <span flex class=\"cw-header-text\">\n    {{rsrc('inputs.group.whenFurtherConditions.label') | async}}</span>\n  </div>\n  <div flex layout=\"column\" class=\"cw-conditions\">\n    <div layout=\"row\"\n         class=\"cw-condition-row\"\n         *ngFor=\"let condition of group?._conditions; let i=index\">\n      <rule-condition flex layout=\"row\"\n                      [condition]=\"condition\"\n                      [conditionTypes]=\"conditionTypes\"\n                      [conditionTypePlaceholder]=\"conditionTypePlaceholder\"\n                      [index]=\"i\"\n                      (deleteCondition)=\"deleteCondition.emit($event)\"\n                      (updateConditionType)=\"updateConditionType.emit($event)\"\n                      (updateConditionParameter)=\"updateConditionParameter.emit($event)\"\n                      (updateConditionOperator)=\"updateConditionOperator.emit($event)\"\n                      ></rule-condition>\n      <div class=\"cw-btn-group cw-add-btn\">\n        <div class=\"ui basic icon buttons\" *ngIf=\"i === (group?._conditions.length - 1)\">\n          <button class=\"cw-button-add-item ui button\" arial-label=\"Add Condition\" (click)=\"onCreateCondition()\" [disabled]=\"!condition.isPersisted()\">\n            <i class=\"plus icon\" aria-hidden=\"true\"></i>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n"
                    }), 
                    __metadata('design:paramtypes', [I18n_1.I18nService])
                ], ConditionGroupComponent);
                return ConditionGroupComponent;
            }());
            exports_1("ConditionGroupComponent", ConditionGroupComponent);
        }
    }
});
//# sourceMappingURL=rule-condition-group-component.js.map