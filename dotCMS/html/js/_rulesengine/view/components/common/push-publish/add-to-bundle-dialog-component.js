System.register(["@angular/core", "@angular/common", "../modal-dialog/dialog-component", "../../semantic/modules/dropdown/dropdown"], function(exports_1, context_1) {
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
    var core_1, common_1, dialog_component_1, dropdown_1, core_2;
    var AddToBundleDialogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dialog_component_1_1) {
                dialog_component_1 = dialog_component_1_1;
            },
            function (dropdown_1_1) {
                dropdown_1 = dropdown_1_1;
            }],
        execute: function() {
            AddToBundleDialogComponent = (function () {
                function AddToBundleDialogComponent() {
                    this.hidden = false;
                    this.errorMessage = null;
                    this.close = new core_1.EventEmitter(false);
                    this.cancel = new core_1.EventEmitter(false);
                    this.addToBundle = new core_1.EventEmitter(false);
                    this.selectedBundle = null;
                }
                AddToBundleDialogComponent.prototype.ngOnChanges = function (change) {
                    if (change.bundleStores) {
                        this.selectedBundle = change.bundleStores.currentValue[0];
                    }
                };
                AddToBundleDialogComponent.prototype.setSelectedBundle = function (bundleId) {
                    var _this = this;
                    this.selectedBundle = {
                        id: bundleId,
                        name: bundleId
                    };
                    this.bundleStores.forEach(function (bundle) {
                        if (bundle.id === bundleId) {
                            _this.selectedBundle = bundle;
                        }
                    });
                };
                AddToBundleDialogComponent.prototype.focusDropDown = function () {
                    this.dropdown.focus();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], AddToBundleDialogComponent.prototype, "hidden", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], AddToBundleDialogComponent.prototype, "bundleStores", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AddToBundleDialogComponent.prototype, "errorMessage", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AddToBundleDialogComponent.prototype, "close", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AddToBundleDialogComponent.prototype, "cancel", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AddToBundleDialogComponent.prototype, "addToBundle", void 0);
                __decorate([
                    core_2.ViewChild(dropdown_1.Dropdown), 
                    __metadata('design:type', dropdown_1.Dropdown)
                ], AddToBundleDialogComponent.prototype, "dropdown", void 0);
                AddToBundleDialogComponent = __decorate([
                    core_1.Component({
                        selector: 'cw-add-to-bundle-dialog-component',
                        directives: [common_1.CORE_DIRECTIVES, dialog_component_1.ModalDialogComponent, dropdown_1.Dropdown, dropdown_1.InputOption],
                        template: "<cw-modal-dialog\n    [headerText]=\"'Add to Bundle'\"\n    [okText]=\"'Add'\"\n    [hidden]=\"hidden\"\n    [okEnabled]=\"selectedBundle != null\"\n    [errorMessage]=\"errorMessage\"\n    width=\"25em\"\n    height=\"auto\"\n    (ok)=\"addToBundle.emit(selectedBundle)\"\n    (cancel)=\"cancel.emit()\"\n    (open)=\"focusDropDown()\">\n  <cw-input-dropdown\n      flex\n      [value]=\"bundleStores[0]?.id\"\n      allowAdditions=\"true\"\n      (click)=\"$event.stopPropagation()\"\n      (change)=\"setSelectedBundle($event)\"\n      (enter)=\"addToBundle.emit(selectedBundle)\">\n    <cw-input-option\n        *ngFor=\"let opt of bundleStores\"\n        [value]=\"opt.id\"\n        [label]=\"opt.name\"\n    ></cw-input-option>\n  </cw-input-dropdown>\n</cw-modal-dialog>",
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [])
                ], AddToBundleDialogComponent);
                return AddToBundleDialogComponent;
            }());
            exports_1("AddToBundleDialogComponent", AddToBundleDialogComponent);
        }
    }
});
//# sourceMappingURL=add-to-bundle-dialog-component.js.map