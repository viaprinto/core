System.register(['@angular/core', '@angular/common', "../semantic/modules/dropdown/dropdown", "../../../api/system/locale/I18n", "./condition-types/serverside-condition/serverside-condition", "../../../api/rule-engine/Rule"], function(exports_1, context_1) {
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
    var core_1, common_1, dropdown_1, I18n_1, serverside_condition_1, Rule_1;
    var RuleActionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dropdown_1_1) {
                dropdown_1 = dropdown_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (serverside_condition_1_1) {
                serverside_condition_1 = serverside_condition_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            }],
        execute: function() {
            RuleActionComponent = (function () {
                function RuleActionComponent(_resources) {
                    this._resources = _resources;
                    this.index = 0;
                    this.ruleActionTypes = {};
                    this.updateRuleActionType = new core_1.EventEmitter(false);
                    this.updateRuleActionParameter = new core_1.EventEmitter(false);
                    this.deleteRuleAction = new core_1.EventEmitter(false);
                }
                RuleActionComponent.prototype.ngOnChanges = function (change) {
                    var _this = this;
                    if (change.ruleActionTypes && !this.typeDropdown) {
                        this.typeDropdown = {
                            options: []
                        };
                        Object.keys(this.ruleActionTypes).forEach(function (key) {
                            var type = _this.ruleActionTypes[key];
                            _this.typeDropdown.options.push(type._opt);
                        });
                    }
                    if (change.action) {
                        if (this.typeDropdown && this.action.type) {
                            if (this.action.type.key != 'NoSelection') {
                                this.typeDropdown.value = this.action.type.key;
                            }
                        }
                    }
                };
                RuleActionComponent.prototype.onTypeChange = function (type) {
                    console.log("RuleActionComponent", "onTypeChange", type);
                    this.updateRuleActionType.emit({ type: Rule_1.RULE_RULE_ACTION_UPDATE_TYPE, payload: { ruleAction: this.action, value: type, index: this.index } });
                };
                RuleActionComponent.prototype.onParameterValueChange = function (event) {
                    console.log("RuleActionComponent", "onParameterValueChange", event);
                    this.updateRuleActionParameter.emit({ type: Rule_1.RULE_RULE_ACTION_UPDATE_PARAMETER, payload: { ruleAction: this.action, name: event.name, value: event.value, index: this.index } });
                };
                RuleActionComponent.prototype.onDeleteRuleActionClicked = function () {
                    this.deleteRuleAction.emit({ type: Rule_1.RULE_RULE_ACTION_DELETE, payload: { ruleAction: this.action, index: this.index } });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Rule_1.ActionModel)
                ], RuleActionComponent.prototype, "action", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], RuleActionComponent.prototype, "index", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], RuleActionComponent.prototype, "actionTypePlaceholder", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RuleActionComponent.prototype, "ruleActionTypes", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleActionComponent.prototype, "updateRuleActionType", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleActionComponent.prototype, "updateRuleActionParameter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleActionComponent.prototype, "deleteRuleAction", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RuleActionComponent.prototype, "typeDropdown", void 0);
                RuleActionComponent = __decorate([
                    core_1.Component({
                        selector: 'rule-action',
                        directives: [common_1.CORE_DIRECTIVES,
                            serverside_condition_1.ServersideCondition,
                            dropdown_1.Dropdown,
                            dropdown_1.InputOption
                        ],
                        template: "<div *ngIf=\"typeDropdown != null\" flex layout=\"row\" class=\"cw-rule-action cw-entry\">\n  <div flex=\"25\" layout=\"row\" class=\"cw-row-start-area\">\n    <cw-input-dropdown\n      flex\n      class=\"cw-type-dropdown\"\n      [value]=\"action.type?.key\"\n      placeholder=\"{{actionTypePlaceholder}}\"\n      (change)=\"onTypeChange($event)\">\n        <cw-input-option\n        *ngFor=\"let opt of typeDropdown.options\"\n        [value]=\"opt.value\"\n        [label]=\"opt.label\"\n        icon=\"{{opt.icon}}\"></cw-input-option>\n    </cw-input-dropdown>\n  </div>\n  <cw-serverside-condition flex=\"75\"\n                           class=\"cw-condition-component\"\n                           [componentInstance]=\"action\"\n                           (parameterValueChange)=\"onParameterValueChange($event)\">\n  </cw-serverside-condition>\n  <div class=\"cw-btn-group cw-delete-btn\">\n    <div class=\"ui basic icon buttons\">\n      <button class=\"ui button\" aria-label=\"Delete Action\" (click)=\"onDeleteRuleActionClicked()\" [disabled]=\"!action.isPersisted()\">\n        <i class=\"trash icon\"></i>\n      </button>\n    </div>\n  </div>\n</div>"
                    }), 
                    __metadata('design:paramtypes', [I18n_1.I18nService])
                ], RuleActionComponent);
                return RuleActionComponent;
            }());
            exports_1("RuleActionComponent", RuleActionComponent);
        }
    }
});
//# sourceMappingURL=rule-action-component.js.map