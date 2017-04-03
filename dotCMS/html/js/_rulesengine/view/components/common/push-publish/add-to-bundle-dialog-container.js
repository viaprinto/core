System.register(["@angular/core", "@angular/common", "./add-to-bundle-dialog-component", "rxjs/Rx", "../../../../api/services/bundle-service"], function(exports_1, context_1) {
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
    var core_1, common_1, add_to_bundle_dialog_component_1, Rx_1, bundle_service_1;
    var AddToBundleDialogContainer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (add_to_bundle_dialog_component_1_1) {
                add_to_bundle_dialog_component_1 = add_to_bundle_dialog_component_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (bundle_service_1_1) {
                bundle_service_1 = bundle_service_1_1;
            }],
        execute: function() {
            AddToBundleDialogContainer = (function () {
                function AddToBundleDialogContainer(bundleService) {
                    this.bundleService = bundleService;
                    this.hidden = false;
                    this.close = new core_1.EventEmitter(false);
                    this.cancel = new core_1.EventEmitter(false);
                    this.errorMessage = new Rx_1.BehaviorSubject(null);
                    this.bundlesLoaded = false;
                }
                AddToBundleDialogContainer.prototype.ngOnChanges = function (change) {
                    if (change.hidden && !this.hidden && !this.bundlesLoaded) {
                        this.bundlesLoaded = true;
                        this.bundleService.loadBundleStores();
                    }
                };
                AddToBundleDialogContainer.prototype.addToBundle = function (bundle) {
                    var _this = this;
                    this.bundleService.addRuleToBundle(this.assetId, bundle).subscribe(function (result) {
                        if (!result.errors) {
                            _this.close.emit({ isCanceled: false });
                            _this.errorMessage = null;
                        }
                        else {
                            _this.errorMessage.next(result.errors);
                        }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AddToBundleDialogContainer.prototype, "assetId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], AddToBundleDialogContainer.prototype, "hidden", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AddToBundleDialogContainer.prototype, "close", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AddToBundleDialogContainer.prototype, "cancel", void 0);
                AddToBundleDialogContainer = __decorate([
                    core_1.Component({
                        selector: 'cw-add-to-bundle-dialog-container',
                        directives: [common_1.CORE_DIRECTIVES, add_to_bundle_dialog_component_1.AddToBundleDialogComponent],
                        template: "\n  <cw-add-to-bundle-dialog-component\n  [bundleStores]=\"bundleService.bundles$ | async\"\n  [hidden]=\"hidden\"\n  [errorMessage]=\"errorMessage | async\"\n  (cancel)=\"hidden = true; close.emit($event); errorMessage = null;\"\n  (addToBundle)=\"addToBundle($event)\"\n  ></cw-add-to-bundle-dialog-component>",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [bundle_service_1.BundleService])
                ], AddToBundleDialogContainer);
                return AddToBundleDialogContainer;
            }());
            exports_1("AddToBundleDialogContainer", AddToBundleDialogContainer);
        }
    }
});
//# sourceMappingURL=add-to-bundle-dialog-container.js.map