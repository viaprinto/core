System.register(["@angular/core", "@angular/common", "./push-publish-dialog-component", "rxjs/Rx", "../../../../api/services/bundle-service"], function(exports_1, context_1) {
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
    var core_1, common_1, push_publish_dialog_component_1, Rx_1, bundle_service_1;
    var PushPublishDialogContainer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (push_publish_dialog_component_1_1) {
                push_publish_dialog_component_1 = push_publish_dialog_component_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (bundle_service_1_1) {
                bundle_service_1 = bundle_service_1_1;
            }],
        execute: function() {
            PushPublishDialogContainer = (function () {
                function PushPublishDialogContainer(bundleService) {
                    this.bundleService = bundleService;
                    this.hidden = false;
                    this.close = new core_1.EventEmitter(false);
                    this.cancel = new core_1.EventEmitter(false);
                    this.errorMessage = new Rx_1.BehaviorSubject(null);
                }
                PushPublishDialogContainer.prototype.ngOnChanges = function (change) {
                };
                PushPublishDialogContainer.prototype.doPushPublish = function (environment) {
                    var _this = this;
                    this.bundleService.pushPublishRule(this.assetId, environment.id).subscribe(function (result) {
                        if (!result.errors) {
                            _this.close.emit({ isCanceled: false });
                            _this.errorMessage = null;
                        }
                        else {
                            _this.errorMessage.next("Sorry there was an error please try again");
                        }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PushPublishDialogContainer.prototype, "assetId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], PushPublishDialogContainer.prototype, "hidden", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PushPublishDialogContainer.prototype, "environmentStores", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PushPublishDialogContainer.prototype, "close", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], PushPublishDialogContainer.prototype, "cancel", void 0);
                PushPublishDialogContainer = __decorate([
                    core_1.Component({
                        selector: 'cw-push-publish-dialog-container',
                        directives: [common_1.CORE_DIRECTIVES, push_publish_dialog_component_1.PushPublishDialogComponent],
                        template: "\n  <cw-push-publish-dialog-component\n  [environmentStores]=\"environmentStores\"\n  [hidden]=\"hidden\"\n  [errorMessage]=\"errorMessage | async\"\n  (cancel)=\"hidden = true; close.emit($event); errorMessage = null;\"\n  (doPushPublish)=\"doPushPublish($event)\"\n  ></cw-push-publish-dialog-component>",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [bundle_service_1.BundleService])
                ], PushPublishDialogContainer);
                return PushPublishDialogContainer;
            }());
            exports_1("PushPublishDialogContainer", PushPublishDialogContainer);
        }
    }
});
//# sourceMappingURL=push-publish-dialog-container.js.map