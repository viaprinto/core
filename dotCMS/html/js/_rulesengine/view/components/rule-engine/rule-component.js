System.register(['@angular/core', '@angular/common', './rule-action-component', './rule-condition-group-component', '../../../view/components/input/toggle/InputToggle', "../../../api/rule-engine/Rule", "../semantic/modules/dropdown/dropdown", "../semantic/elements/input-text/input-text", "../../../api/system/locale/I18n", "../../../api/auth/UserModel", "../../../api/persistence/ApiRoot", "../common/push-publish/add-to-bundle-dialog-container", "../common/push-publish/push-publish-dialog-container"], function(exports_1, context_1) {
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
    var core_1, common_1, rule_action_component_1, rule_condition_group_component_1, InputToggle_1, Rule_1, dropdown_1, input_text_1, I18n_1, UserModel_1, ApiRoot_1, add_to_bundle_dialog_container_1, push_publish_dialog_container_1;
    var I8N_BASE, rsrc, RuleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (rule_action_component_1_1) {
                rule_action_component_1 = rule_action_component_1_1;
            },
            function (rule_condition_group_component_1_1) {
                rule_condition_group_component_1 = rule_condition_group_component_1_1;
            },
            function (InputToggle_1_1) {
                InputToggle_1 = InputToggle_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            },
            function (dropdown_1_1) {
                dropdown_1 = dropdown_1_1;
            },
            function (input_text_1_1) {
                input_text_1 = input_text_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (UserModel_1_1) {
                UserModel_1 = UserModel_1_1;
            },
            function (ApiRoot_1_1) {
                ApiRoot_1 = ApiRoot_1_1;
            },
            function (add_to_bundle_dialog_container_1_1) {
                add_to_bundle_dialog_container_1 = add_to_bundle_dialog_container_1_1;
            },
            function (push_publish_dialog_container_1_1) {
                push_publish_dialog_container_1 = push_publish_dialog_container_1_1;
            }],
        execute: function() {
            I8N_BASE = 'api.sites.ruleengine';
            rsrc = {
                fireOn: {
                    EVERY_PAGE: 'Every Page',
                    ONCE_PER_VISIT: 'Once per visit',
                    ONCE_PER_VISITOR: 'Once per visitor',
                    EVERY_REQUEST: 'Every Request'
                }
            };
            RuleComponent = (function () {
                function RuleComponent(_user, elementRef, resources, ruleService, apiRoot, fb) {
                    var _this = this;
                    this._user = _user;
                    this.elementRef = elementRef;
                    this.resources = resources;
                    this.ruleService = ruleService;
                    this.apiRoot = apiRoot;
                    this.ruleActionTypes = {};
                    this.hidden = false;
                    this.deleteRule = new core_1.EventEmitter(false);
                    this.updateExpandedState = new core_1.EventEmitter(false);
                    this.updateName = new core_1.EventEmitter(false);
                    this.updateEnabledState = new core_1.EventEmitter(false);
                    this.updateFireOn = new core_1.EventEmitter(false);
                    this.createRuleAction = new core_1.EventEmitter(false);
                    this.updateRuleActionType = new core_1.EventEmitter(false);
                    this.updateRuleActionParameter = new core_1.EventEmitter(false);
                    this.deleteRuleAction = new core_1.EventEmitter(false);
                    this.updateConditionGroupOperator = new core_1.EventEmitter(false);
                    this.createConditionGroup = new core_1.EventEmitter(false);
                    this.createCondition = new core_1.EventEmitter(false);
                    this.deleteCondition = new core_1.EventEmitter(false);
                    this.updateConditionType = new core_1.EventEmitter(false);
                    this.updateConditionParameter = new core_1.EventEmitter(false);
                    this.updateConditionOperator = new core_1.EventEmitter(false);
                    this._updateEnabledStateDelay = new core_1.EventEmitter(false);
                    this.showMoreMenu = false;
                    this.showAddToBundleDialog = false;
                    this.showPushPublishDialog = false;
                    this.actionTypePlaceholder = "";
                    this.conditionTypePlaceholder = "";
                    this._rsrcCache = {};
                    this.hideFireOn = apiRoot.hideFireOn;
                    /* Need to delay the firing of the state change toggle, to give any blur events time to fire. */
                    this._updateEnabledStateDelay.debounceTime(20).subscribe(function (event) {
                        _this.updateEnabledState.emit(event);
                    });
                    this.fireOn = {
                        value: 'EVERY_PAGE',
                        placeholder: this.rsrc('inputs.fireOn.placeholder', "Select One"),
                        options: [
                            { value: 'EVERY_PAGE', label: this.rsrc('inputs.fireOn.options.EveryPage') },
                            { value: 'ONCE_PER_VISIT', label: this.rsrc('inputs.fireOn.options.OncePerVisit') },
                            { value: 'ONCE_PER_VISITOR', label: this.rsrc('inputs.fireOn.options.OncePerVisitor') },
                            { value: 'EVERY_REQUEST', label: this.rsrc('inputs.fireOn.options.EveryRequest') }
                        ]
                    };
                    this.initFormModel(fb);
                    this.resources.get("api.sites.ruleengine.rules.inputs.action.type.placeholder").subscribe(function (label) {
                        _this.actionTypePlaceholder = label;
                    });
                    this.resources.get("api.sites.ruleengine.rules.inputs.condition.type.placeholder").subscribe(function (label) {
                        _this.conditionTypePlaceholder = label;
                    });
                }
                RuleComponent.prototype.initFormModel = function (fb) {
                    var vFns = [];
                    vFns.push(common_1.Validators.required);
                    vFns.push(common_1.Validators.minLength(3));
                    this.formModel = fb.group({
                        name: new common_1.Control(this.rule ? this.rule.name : '', common_1.Validators.compose(vFns))
                    });
                };
                RuleComponent.prototype.rsrc = function (subkey, defVal) {
                    if (defVal === void 0) { defVal = '-missing-'; }
                    var msgObserver = this._rsrcCache[subkey];
                    if (!msgObserver) {
                        msgObserver = this.resources.get(I8N_BASE + '.rules.' + subkey, defVal);
                        this._rsrcCache[subkey] = msgObserver;
                    }
                    return msgObserver;
                };
                RuleComponent.prototype.ngOnChanges = function (change) {
                    var _this = this;
                    if (change.rule) {
                        var rule = this.rule;
                        var ctrl_1 = this.formModel.controls['name'];
                        ctrl_1.updateValue(this.rule.name, {});
                        ctrl_1.valueChanges.debounceTime(250).subscribe(function (name) {
                            if (ctrl_1.valid) {
                                _this.updateName.emit({ type: Rule_1.RULE_UPDATE_NAME, payload: { rule: _this.rule, value: name } });
                            }
                        });
                        if (rule.isPersisted()) {
                            this.fireOn.value = rule.fireOn;
                        }
                    }
                };
                RuleComponent.prototype.statusText = function (length) {
                    if (length === void 0) { length = 0; }
                    var t = "";
                    if (this.saved) {
                        t = "All changes saved";
                    }
                    else if (this.saving) {
                        t = "Saving...";
                    }
                    else if (this.errors) {
                        t = this.errors['invalid'] || this.errors['serverError'] || "Unsaved changes...";
                    }
                    if (length) {
                        t = t.substring(0, length) + '...';
                    }
                    return t;
                };
                RuleComponent.prototype.setRuleExpandedState = function (expanded) {
                    this.updateExpandedState.emit({ type: Rule_1.V_RULE_UPDATE_EXPANDED_STATE, payload: { rule: this.rule, value: expanded } });
                };
                RuleComponent.prototype.setRuleEnabledState = function (enabled) {
                    this._updateEnabledStateDelay.emit({
                        type: Rule_1.RULE_UPDATE_ENABLED_STATE,
                        payload: { rule: this.rule, value: enabled }
                    });
                };
                RuleComponent.prototype.onCreateRuleAction = function () {
                    console.log("RuleComponent", "onCreateRuleAction");
                    this.createRuleAction.emit({ type: Rule_1.RULE_RULE_ACTION_CREATE, payload: { rule: this.rule } });
                };
                RuleComponent.prototype.onDeleteCondition = function (event, conditionGroup) {
                    Object.assign(event.payload, { rule: this.rule, conditionGroup: conditionGroup });
                    this.deleteCondition.emit(event);
                };
                RuleComponent.prototype.onCreateConditionGroupClicked = function () {
                    var len = this.rule._conditionGroups.length;
                    var priority = len ? this.rule._conditionGroups[len - 1].priority : 1;
                    this.createConditionGroup.emit({ type: Rule_1.RULE_CONDITION_GROUP_CREATE, payload: { rule: this.rule, priority: priority } });
                };
                RuleComponent.prototype.onCreateCondition = function (event) {
                    console.log("RuleComponent", "onCreateCondition");
                    Object.assign(event.payload, { rule: this.rule });
                    this.createCondition.emit(event);
                };
                RuleComponent.prototype.onUpdateRuleActionType = function (event) {
                    console.log("RuleComponent", "onUpdateRuleActionType");
                    this.updateRuleActionType.emit({ type: Rule_1.RULE_RULE_ACTION_UPDATE_TYPE, payload: Object.assign({ rule: this.rule }, event.payload) });
                };
                RuleComponent.prototype.onUpdateRuleActionParameter = function (event) {
                    console.log("RuleComponent", "onUpdateRuleActionParameter");
                    this.updateRuleActionParameter.emit({ type: Rule_1.RULE_RULE_ACTION_UPDATE_PARAMETER, payload: Object.assign({ rule: this.rule }, event.payload) });
                };
                RuleComponent.prototype.onDeleteRuleAction = function (event) {
                    console.log("RuleComponent", "onDeleteRuleAction");
                    this.deleteRuleAction.emit({ type: Rule_1.RULE_RULE_ACTION_DELETE, payload: Object.assign({ rule: this.rule }, event.payload) });
                };
                RuleComponent.prototype.onUpdateConditionGroupOperator = function (event, conditionGroup) {
                    this.updateConditionGroupOperator.emit({ type: Rule_1.RULE_CONDITION_UPDATE_TYPE, payload: Object.assign({ rule: this.rule, conditionGroup: conditionGroup }, event.payload) });
                };
                RuleComponent.prototype.onUpdateConditionType = function (event, conditionGroup) {
                    console.log("RuleComponent", "onUpdateConditionType");
                    this.updateConditionType.emit({ type: Rule_1.RULE_CONDITION_UPDATE_TYPE, payload: Object.assign({ rule: this.rule, conditionGroup: conditionGroup }, event.payload) });
                };
                RuleComponent.prototype.onUpdateConditionParameter = function (event, conditionGroup) {
                    console.log("RuleComponent", "onUpdateConditionParameter");
                    this.updateConditionParameter.emit({ type: Rule_1.RULE_CONDITION_UPDATE_PARAMETER, payload: Object.assign({ rule: this.rule, conditionGroup: conditionGroup }, event.payload) });
                };
                RuleComponent.prototype.onUpdateConditionOperator = function (event, conditionGroup) {
                    console.log("RuleComponent", "onUpdateConditionOperator");
                    this.updateConditionOperator.emit({ type: Rule_1.RULE_CONDITION_UPDATE_OPERATOR, payload: Object.assign({ rule: this.rule, conditionGroup: conditionGroup }, event.payload) });
                };
                RuleComponent.prototype.deleteRuleClicked = function (event) {
                    event.stopPropagation();
                    var noWarn = this._user.suppressAlerts || (event.altKey && event.shiftKey);
                    if (!noWarn) {
                        noWarn = this.ruleActions.length === 1 && !this.ruleActions[0].isPersisted();
                        noWarn = noWarn && this.rule._conditionGroups.length === 1;
                        if (noWarn) {
                            var conditions = this.rule._conditionGroups[0].conditions;
                            var keys = Object.keys(conditions);
                            noWarn = noWarn && (keys.length === 0);
                        }
                    }
                    if (noWarn || confirm('Are you sure you want delete this rule?')) {
                        this.deleteRule.emit({ type: Rule_1.RULE_DELETE, payload: { rule: this.rule } });
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Rule_1.RuleModel)
                ], RuleComponent.prototype, "rule", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], RuleComponent.prototype, "saved", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], RuleComponent.prototype, "saving", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RuleComponent.prototype, "errors", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], RuleComponent.prototype, "ruleActions", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RuleComponent.prototype, "ruleActionTypes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RuleComponent.prototype, "conditionTypes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], RuleComponent.prototype, "environmentStores", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], RuleComponent.prototype, "hidden", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "deleteRule", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateExpandedState", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateName", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateEnabledState", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateFireOn", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "createRuleAction", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateRuleActionType", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateRuleActionParameter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "deleteRuleAction", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateConditionGroupOperator", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "createConditionGroup", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "createCondition", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "deleteCondition", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateConditionType", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateConditionParameter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RuleComponent.prototype, "updateConditionOperator", void 0);
                RuleComponent = __decorate([
                    core_1.Component({
                        selector: 'rule',
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, common_1.NgFormModel, InputToggle_1.InputToggle,
                            rule_action_component_1.RuleActionComponent,
                            rule_condition_group_component_1.ConditionGroupComponent,
                            input_text_1.InputText,
                            dropdown_1.Dropdown,
                            dropdown_1.InputOption,
                            add_to_bundle_dialog_container_1.AddToBundleDialogContainer,
                            push_publish_dialog_container_1.PushPublishDialogContainer],
                        template: "<form [ngFormModel]=\"formModel\" let rf=\"ngForm\">\n  <cw-add-to-bundle-dialog-container\n      [assetId]=\"rule.id || rule.key\"\n      [hidden]=\"!showAddToBundleDialog\"\n      (close)=\"showAddToBundleDialog = false; showMoreMenu = false\"></cw-add-to-bundle-dialog-container>\n  <cw-push-publish-dialog-container\n      [environmentStores]=\"environmentStores\"\n      [assetId]=\"rule.id || rule.key\"\n      [hidden]=\"!showPushPublishDialog\"\n      (close)=\"showPushPublishDialog = false; showMoreMenu = false\"></cw-push-publish-dialog-container>\n  <div class=\"cw-rule\" [class.cw-hidden]=\"hidden\" [class.cw-disabled]=\"!rule.enabled\" [class.cw-saving]=\"saving\" [class.cw-saved]=\"saved\" [class.cw-out-of-sync]=\"!saved && !saving\">\n  <div flex layout=\"row\" class=\"cw-header\" *ngIf=\"!hidden\" (click)=\"setRuleExpandedState(!rule._expanded)\">\n    <div flex=\"70\" layout=\"row\" layout-align=\"start center\" class=\"cw-header-info\" >\n      <i flex=\"none\" class=\"caret icon cw-rule-caret large\" [class.right]=\"!rule._expanded\" [class.down]=\"rule._expanded\" aria-hidden=\"true\"></i>\n      <div flex=\"70\" layout=\"column\">\n      <cw-input-text class=\"cw-rule-name-input\"\n                     focused=\"{{rule.key == null}}\"\n                     placeholder=\"{{rsrc('inputs.name.placeholder') | async}}\"\n                     ngControl=\"name\"\n                     (click)=\"$event.stopPropagation()\" #fName=\"ngForm\">\n      </cw-input-text>\n      <div flex=\"50\" [hidden]=\"!fName.touched || fName.valid\" class=\"name cw-warn basic label\">Name is required</div>\n      </div>\n      <span class=\"cw-fire-on-label\" *ngIf=\"!hideFireOn\">{{rsrc('inputs.fireOn.label') | async}}</span>\n      <cw-input-dropdown flex=\"none\"\n                         *ngIf=\"!hideFireOn\"\n                         class=\"cw-fire-on-dropdown\"\n                         [value]=\"fireOn.value\"\n                         placeholder=\"{{fireOn.placeholder | async}}\"\n                         (change)=\"updateFireOn.emit({type: 'RULE_UPDATE_FIRE_ON', payload:{rule:rule, value:$event}})\"\n                         (click)=\"$event.stopPropagation()\">\n        <cw-input-option *ngFor=\"let opt of fireOn.options\"\n            [value]=\"opt.value\"\n            [label]=\"opt.label | async\"\n            icon=\"{{opt.icon}}\"></cw-input-option>\n      </cw-input-dropdown>\n    </div>\n    <div flex=\"30\" layout=\"row\" layout-align=\"end center\" class=\"cw-header-actions\" >\n      <span class=\"cw-rule-status-text\" title=\"{{statusText()}}\">{{statusText(30)}}</span>\n      <cw-toggle-input class=\"cw-input\"\n                       [on-text]=\"rsrc('inputs.onOff.on.label') | async\"\n                       [off-text]=\"rsrc('inputs.onOff.off.label') | async\"\n                       [disabled]=\"!saved\"\n                       [value]=\"rule.enabled\"\n                       (change)=\"setRuleEnabledState($event)\"\n                       (click)=\"$event.stopPropagation()\">\n      </cw-toggle-input>\n      <div class=\"cw-btn-group\">\n        <div class=\"ui basic icon buttons\">\n          <button class=\"ui button cw-delete-rule\" aria-label=\"More Actions\" (click)=\"showMoreMenu = !showMoreMenu; $event.stopPropagation()\">\n            <i class=\"ellipsis vertical icon\"></i>\n          </button>\n          <button class=\"ui button cw-add-group\" arial-label=\"Add Group\" (click)=\"onCreateConditionGroupClicked(); setRuleExpandedState(true); $event.stopPropagation()\" [disabled]=\"!rule.isPersisted()\">\n            <i class=\"plus icon\" aria-hidden=\"true\"></i>\n          </button>\n        </div>\n      </div>\n      <div class=\"ui vertical menu\" *ngIf=\"showMoreMenu\">\n        <a class=\"item\" *ngIf=\"(rule.id || rule.key) &&  !apiRoot.hideRulePushOptions\" (click)=\"showAddToBundleDialog = true; $event.stopPropagation()\">Add to bundle</a>\n        <a class=\"item\" *ngIf=\"environmentStores.length > 0 && (rule.id || rule.key) &&  !apiRoot.hideRulePushOptions\" (click)=\"showPushPublishDialog = true; $event.stopPropagation()\">Push Publish</a>\n        <a class=\"item\" (click)=\"deleteRuleClicked($event)\">Delete rule</a>\n      </div>\n    </div>\n  </div>\n  <div class=\"cw-accordion-body\" *ngIf=\"rule._expanded\">\n    <condition-group *ngFor=\"let group of rule._conditionGroups; let i=index\"\n                     [rule]=\"rule\"\n                     [group]=\"group\"\n                     [conditionTypes]=\"conditionTypes\"\n                     [groupIndex]=\"i\"\n                     [conditionTypePlaceholder]=\"conditionTypePlaceholder\"\n                     (createCondition)=\"onCreateCondition($event)\"\n                     (deleteCondition)=\"onDeleteCondition($event, group)\"\n                     (updateConditionGroupOperator)=\"onUpdateConditionGroupOperator($event, group)\"\n                     (updateConditionType)=\"onUpdateConditionType($event, group)\"\n                     (updateConditionParameter)=\"onUpdateConditionParameter($event, group)\"\n                     (updateConditionOperator)=\"onUpdateConditionOperator($event, group)\"\n                     ></condition-group>\n    <div class=\"cw-action-group\">\n      <div class=\"cw-action-separator\">\n        {{rsrc('inputs.action.firesActions') | async}}\n      </div>\n      <div flex layout=\"column\" class=\"cw-rule-actions\">\n        <div layout=\"row\" class=\"cw-action-row\" *ngFor=\"let ruleAction of ruleActions; let i=index\">\n          <rule-action flex layout=\"row\" [action]=\"ruleAction\" [index]=\"i\" \n              [actionTypePlaceholder]=\"actionTypePlaceholder\"\n              [ruleActionTypes]=\"ruleActionTypes\"\n              (updateRuleActionType)=\"onUpdateRuleActionType($event)\"\n               (updateRuleActionParameter)=\"onUpdateRuleActionParameter($event)\"\n              (deleteRuleAction)=\"onDeleteRuleAction($event)\"></rule-action>\n          <div class=\"cw-btn-group cw-add-btn\">\n            <div class=\"ui basic icon buttons\" *ngIf=\"i === (ruleActions.length - 1)\">\n              <button class=\"cw-button-add-item ui button\" arial-label=\"Add Action\" (click)=\"onCreateRuleAction();\" [disabled]=\"!ruleAction.isPersisted()\">\n                <i class=\"plus icon\" aria-hidden=\"true\"></i>\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n</form>\n",
                        changeDetection: core_1.ChangeDetectionStrategy.Default
                    }), 
                    __metadata('design:paramtypes', [UserModel_1.UserModel, core_1.ElementRef, I18n_1.I18nService, Rule_1.RuleService, ApiRoot_1.ApiRoot, common_1.FormBuilder])
                ], RuleComponent);
                return RuleComponent;
            }());
            exports_1("RuleComponent", RuleComponent);
        }
    }
});
//# sourceMappingURL=rule-component.js.map