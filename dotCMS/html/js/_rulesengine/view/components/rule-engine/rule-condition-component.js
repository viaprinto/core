System.register(['@angular/core', '@angular/common', './condition-types/serverside-condition/serverside-condition', '../../../view/components/semantic/modules/dropdown/dropdown', "../../../api/system/locale/I18n", "../../../api/rule-engine/Rule", "./custom-types/visitors-location/visitors-location.container"], function(exports_1, context_1) {
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
    var core_1, common_1, serverside_condition_1, dropdown_1, I18n_1, Rule_1, visitors_location_container_1;
    var ConditionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (serverside_condition_1_1) {
                serverside_condition_1 = serverside_condition_1_1;
            },
            function (dropdown_1_1) {
                dropdown_1 = dropdown_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            },
            function (visitors_location_container_1_1) {
                visitors_location_container_1 = visitors_location_container_1_1;
            }],
        execute: function() {
            ConditionComponent = (function () {
                function ConditionComponent(_resources) {
                    this._resources = _resources;
                    this.conditionTypes = {};
                    this.conditionTypePlaceholder = "";
                    this.updateConditionType = new core_1.EventEmitter(false);
                    this.updateConditionParameter = new core_1.EventEmitter(false);
                    this.updateConditionOperator = new core_1.EventEmitter(false);
                    this.deleteCondition = new core_1.EventEmitter(false);
                }
                ConditionComponent.prototype.ngOnChanges = function (change) {
                    var _this = this;
                    try {
                        if (change.condition) {
                            if (this.typeDropdown && this.condition.type) {
                                if (this.condition.type.key != 'NoSelection') {
                                    this.typeDropdown.value = this.condition.type.key;
                                }
                            }
                        }
                        if (change.conditionTypes && !this.typeDropdown) {
                            this.typeDropdown = {
                                options: [],
                                placeholder: this._resources.get("api.sites.ruleengine.rules.inputs.condition.type.placeholder"),
                            };
                            Object.keys(this.conditionTypes).forEach(function (key) {
                                var type = _this.conditionTypes[key];
                                _this.typeDropdown.options.push(type._opt);
                            });
                        }
                    }
                    catch (e) {
                        console.error("ConditionComponent", "ngOnChanges", e);
                    }
                };
                ConditionComponent.prototype.onTypeChange = function (type) {
                    console.log("ConditionComponent", "onTypeChange");
                    this.updateConditionType.emit({ type: Rule_1.RULE_CONDITION_UPDATE_TYPE, payload: { condition: this.condition, value: type, index: this.index } });
                };
                ConditionComponent.prototype.onParameterValuesChange = function (event) {
                    var _this = this;
                    event.forEach(function (change) { return _this.onParameterValueChange(change); });
                };
                ConditionComponent.prototype.onParameterValueChange = function (event) {
                    console.log("ConditionComponent", "onParameterValueChange");
                    this.updateConditionParameter.emit({ type: Rule_1.RULE_CONDITION_UPDATE_PARAMETER, payload: { condition: this.condition, name: event.name, value: event.value, index: this.index } });
                };
                ConditionComponent.prototype.toggleOperator = function () {
                    var op = this.condition.operator === 'AND' ? 'OR' : 'AND';
                    this.updateConditionOperator.emit({ type: Rule_1.RULE_CONDITION_UPDATE_OPERATOR, payload: { condition: this.condition, value: op, index: this.index } });
                };
                ConditionComponent.prototype.onDeleteConditionClicked = function () {
                    this.deleteCondition.emit({ type: Rule_1.RULE_CONDITION_DELETE, payload: { condition: this.condition } });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Rule_1.ConditionModel)
                ], ConditionComponent.prototype, "condition", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], ConditionComponent.prototype, "index", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ConditionComponent.prototype, "conditionTypes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ConditionComponent.prototype, "conditionTypePlaceholder", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionComponent.prototype, "updateConditionType", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionComponent.prototype, "updateConditionParameter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionComponent.prototype, "updateConditionOperator", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ConditionComponent.prototype, "deleteCondition", void 0);
                ConditionComponent = __decorate([
                    core_1.Component({
                        selector: 'rule-condition',
                        directives: [common_1.CORE_DIRECTIVES,
                            serverside_condition_1.ServersideCondition,
                            visitors_location_container_1.VisitorsLocationContainer,
                            dropdown_1.Dropdown,
                            dropdown_1.InputOption
                        ],
                        template: "<div *ngIf=\"typeDropdown != null\" flex layout=\"row\" class=\"cw-condition cw-entry\">\n  <div class=\"cw-btn-group cw-condition-toggle\">\n    <button class=\"ui basic button cw-button-toggle-operator\" aria-label=\"Swap And/Or\" (click)=\"toggleOperator()\" *ngIf=\"index !== 0\">\n      {{condition.operator}}\n    </button>\n  </div>\n  <cw-input-dropdown\n      flex=\"25\"\n      class=\"cw-type-dropdown\"\n      [value]=\"condition.type?.key\"\n      placeholder=\"{{conditionTypePlaceholder}}\"\n      (change)=\"onTypeChange($event)\">\n    <cw-input-option\n        *ngFor=\"let opt of typeDropdown.options\"\n        [value]=\"opt.value\"\n        [label]=\"opt.label\"\n        icon=\"{{opt.icon}}\"></cw-input-option>\n  </cw-input-dropdown>\n  <div flex=\"75\" class=\"cw-condition-row-main\" [ngSwitch]=\"condition.type?.key\">\n    <template [ngSwitchWhen]=\"'NoSelection'\">\n      <div class=\"cw-condition-component\"></div>\n    </template>\n    <template [ngSwitchWhen]=\"'VisitorsGeolocationConditionlet'\">\n      <cw-visitors-location-container\n          [componentInstance]=\"condition\"\n          (parameterValuesChange)=\"onParameterValuesChange($event)\"></cw-visitors-location-container>\n    </template>\n    <template ngSwitchDefault>\n      <cw-serverside-condition class=\"cw-condition-component\"\n                               [componentInstance]=\"condition\"\n                               (parameterValueChange)=\"onParameterValueChange($event)\">\n      </cw-serverside-condition>\n    </template>\n  </div>\n</div>\n<div class=\"cw-btn-group cw-delete-btn\">\n  <div class=\"ui basic icon buttons\">\n    <button class=\"ui button\" aria-label=\"Delete Condition\" (click)=\"onDeleteConditionClicked()\" [disabled]=\"!condition.isPersisted()\">\n      <i class=\"trash icon\"></i>\n    </button>\n  </div>\n</div>\n"
                    }), 
                    __metadata('design:paramtypes', [I18n_1.I18nService])
                ], ConditionComponent);
                return ConditionComponent;
            }());
            exports_1("ConditionComponent", ConditionComponent);
        }
    }
});
//# sourceMappingURL=rule-condition-component.js.map