System.register(["@angular/core", "@angular/common"], function(exports_1, context_1) {
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
    var core_1, common_1;
    var ModalDialogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ModalDialogComponent = (function () {
                function ModalDialogComponent() {
                    this.okEnabled = true;
                    this.hidden = true;
                    this.headerText = "";
                    this.okButtonText = "Ok";
                    this.errorMessage = null;
                    this.height = '60%';
                    this.width = '50%';
                    this.maxHeight = '300em';
                    this.maxWidth = '200em';
                    this.close = new core_1.EventEmitter(false);
                    this.cancel = new core_1.EventEmitter(false);
                    this.ok = new core_1.EventEmitter(false);
                    this.open = new core_1.EventEmitter(false);
                }
                ModalDialogComponent.prototype.ngOnChanges = function (change) {
                    var _this = this;
                    if (change.hidden) {
                        if (!this.hidden) {
                            this.addEscapeListener();
                            //wait until the dialog is really show up
                            setTimeout(function () { return _this.open.emit(false); }, 2);
                        }
                        else {
                            this.removeEscapeListener();
                        }
                    }
                };
                ModalDialogComponent.prototype.addEscapeListener = function () {
                    var _this = this;
                    if (!this._keyListener) {
                        this._keyListener = function (e) {
                            if (e.keyCode == 27) {
                                e.preventDefault();
                                e.stopPropagation();
                                _this.cancel.emit(false);
                            }
                            else if (e.keyCode == 13) {
                                e.stopPropagation();
                                e.preventDefault();
                                _this.ok.emit(true);
                            }
                        };
                        document.body.addEventListener('keyup', this._keyListener);
                    }
                };
                ModalDialogComponent.prototype.removeEscapeListener = function () {
                    if (this._keyListener) {
                        document.body.removeEventListener('keyup', this._keyListener);
                        this._keyListener = null;
                    }
                };
                ModalDialogComponent.prototype.onCancel = function (e) {
                    this.cancel.emit(true);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ModalDialogComponent.prototype, "okEnabled", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ModalDialogComponent.prototype, "hidden", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ModalDialogComponent.prototype, "headerText", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ModalDialogComponent.prototype, "okButtonText", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ModalDialogComponent.prototype, "errorMessage", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ModalDialogComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ModalDialogComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ModalDialogComponent.prototype, "maxHeight", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ModalDialogComponent.prototype, "maxWidth", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalDialogComponent.prototype, "close", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalDialogComponent.prototype, "cancel", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalDialogComponent.prototype, "ok", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalDialogComponent.prototype, "open", void 0);
                ModalDialogComponent = __decorate([
                    core_1.Component({
                        selector: 'cw-modal-dialog',
                        directives: [common_1.CORE_DIRECTIVES],
                        template: "\n  <div class=\"ui dimmer modals page transition visible active\" *ngIf=\"!hidden\" (click)=\"onCancel($event)\">\n    <div class=\"ui modal cw-modal-dialog\" style=\"height:{{height}};width:{{width}};max-height:{{maxHeight}};max-width:{{maxWidth}}\" (click)=\"$event.stopPropagation()\">\n      <div class=\"header\">{{headerText}}</div>\n      <div flex layout-fill layout=\"column\" class=\"content\">\n        <div *ngIf=\"errorMessage != null\" class=\"ui negative message\">{{errorMessage}}</div>\n        <ng-content></ng-content>\n      </div>\n      <div class=\"actions\">\n        <div class=\"ui positive right labeled icon button\" [class.disabled]=\"!okEnabled\" (click)=\"ok.emit()\">{{okButtonText}}\n          <i class=\"checkmark icon\"></i>\n        </div>\n        <div class=\"ui black deny button\" (click)=\"cancel.emit(true)\">Cancel</div>\n      </div>\n    </div>\n  </div>\n", changeDetection: core_1.ChangeDetectionStrategy.OnPush
                    }), 
                    __metadata('design:paramtypes', [])
                ], ModalDialogComponent);
                return ModalDialogComponent;
            }());
            exports_1("ModalDialogComponent", ModalDialogComponent);
        }
    }
});
//# sourceMappingURL=dialog-component.js.map