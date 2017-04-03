System.register(["@angular/core", "@angular/common", "../../semantic/modules/dropdown/dropdown", "../modal-dialog/dialog-component"], function(exports_1, context_1) {
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
    var core_1, common_1, dropdown_1, dialog_component_1;
    var PushPublishDialogComponent;
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
            function (dialog_component_1_1) {
                dialog_component_1 = dialog_component_1_1;
            }],
        execute: function() {
            PushPublishDialogComponent = (function () {
                function PushPublishDialogComponent() {
                    this.hidden = false;
                    this.errorMessage = null;
                    this.close = new core_1.EventEmitter(false);
                    this.cancel = new core_1.EventEmitter(false);
                    this.doPushPublish = new core_1.EventEmitter(false);
                }
                PushPublishDialogComponent.prototype.ngOnChanges = function (change) {
                    if (change.environmentStores) {
                        this.selectedEnvironmentId = change.environmentStores.currentValue[0];
                    }
                };
                PushPublishDialogComponent.prototype.setSelectedEnvironment = function (environmentId) {
                    this.selectedEnvironmentId = environmentId;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], PushPublishDialogComponent.prototype, "hidden", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PushPublishDialogComponent.prototype, "environmentStores", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PushPublishDialogComponent.prototype, "errorMessage", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PushPublishDialogComponent.prototype, "close", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PushPublishDialogComponent.prototype, "cancel", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PushPublishDialogComponent.prototype, "doPushPublish", void 0);
                PushPublishDialogComponent = __decorate([
                    core_1.Component({
                        selector: 'cw-push-publish-dialog-component',
                        directives: [common_1.CORE_DIRECTIVES, dialog_component_1.ModalDialogComponent, dropdown_1.Dropdown, dropdown_1.InputOption],
                        template: "<cw-modal-dialog\n    [headerText]=\"'Push Publish'\"\n    [okText]=\"'Push'\"\n    [hidden]=\"hidden\"\n    [okEnabled]=\"selectedEnvironmentId != null\"\n    [errorMessage]=\"errorMessage\"\n    width=\"25em\"\n    height=\"auto\"\n    (ok)=\"doPushPublish.emit(selectedEnvironmentId)\"\n    (cancel)=\"cancel.emit()\">\n  <cw-input-dropdown\n      flex\n      [value]=\"environmentStores[0]?.id\"\n      (click)=\"$event.stopPropagation()\"\n      (change)=\"setSelectedEnvironment($event)\">\n    <cw-input-option\n        *ngFor=\"let opt of environmentStores\"\n        [value]=\"opt.id\"\n        [label]=\"opt.name\"\n    ></cw-input-option>\n  </cw-input-dropdown>\n</cw-modal-dialog>",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [])
                ], PushPublishDialogComponent);
                return PushPublishDialogComponent;
            }());
            exports_1("PushPublishDialogComponent", PushPublishDialogComponent);
        }
    }
});
//# sourceMappingURL=push-publish-dialog-component.js.map