System.register(['@angular/core', "@angular/common", "../../../../../view/components/common/google-map/area-picker-dialog.component", "../../../semantic/modules/dropdown/dropdown", "../../../semantic/elements/input-text/input-text"], function(exports_1, context_1) {
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
    var core_1, common_1, area_picker_dialog_component_1, dropdown_1, input_text_1;
    var UNITS, I8N_BASE, VisitorsLocationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (area_picker_dialog_component_1_1) {
                area_picker_dialog_component_1 = area_picker_dialog_component_1_1;
            },
            function (dropdown_1_1) {
                dropdown_1 = dropdown_1_1;
            },
            function (input_text_1_1) {
                input_text_1 = input_text_1_1;
            }],
        execute: function() {
            UNITS = {
                mi: {
                    m: (function (len) { return len * 1609.34; }),
                    mi: (function (len) { return len; }),
                    km: (function (len) { return len / 1.60934; }),
                },
                km: {
                    m: (function (len) { return len * 1000; }),
                    mi: (function (len) { return len / 1.60934; }),
                    km: (function (len) { return len; }),
                },
                m: {
                    m: (function (len) { return len; }),
                    mi: (function (len) { return len / 1609.34; }),
                    km: (function (len) { return len / 1000; }),
                }
            };
            I8N_BASE = 'api.sites.ruleengine';
            VisitorsLocationComponent = (function () {
                function VisitorsLocationComponent(decimalPipe) {
                    this.decimalPipe = decimalPipe;
                    this.circle = { center: { lat: 38.89, lng: -77.04 }, radius: 10000 };
                    this.fromLabel = 'of';
                    this.changedHook = 0;
                    this.preferredUnit = 'm';
                    this.areaChange = new core_1.EventEmitter(false);
                    this.comparisonChange = new core_1.EventEmitter(false);
                    this.showingMap = false;
                    console.log("VisitorsLocationComponent", "constructor");
                }
                VisitorsLocationComponent.prototype.ngOnChanges = function (change) {
                    console.log("VisitorsLocationComponent", "ngOnChanges", change);
                    if (change.comparisonOptions) {
                        this.comparisonDropdown = {
                            name: 'comparison',
                            control: this.comparisonControl,
                            placeholder: '',
                            value: this.comparisonValue,
                            options: this.comparisonOptions
                        };
                    }
                };
                VisitorsLocationComponent.prototype.getLatLong = function () {
                    var lat = this.circle.center.lat;
                    var lng = this.circle.center.lng;
                    var latStr = this.decimalPipe.transform(parseFloat(lat + ''), ['1.6-6']);
                    var lngStr = this.decimalPipe.transform(parseFloat(lng + ''), ['1.6-6']);
                    return latStr + ', ' + lngStr;
                };
                VisitorsLocationComponent.prototype.getRadiusInPreferredUnit = function () {
                    var r = this.circle.radius;
                    console.log("VisitorsLocationComponent", "getRadiusInPreferredUnit", r);
                    return UNITS.m[this.preferredUnit](r);
                };
                VisitorsLocationComponent.prototype.toggleMap = function () {
                    this.showingMap = !this.showingMap;
                };
                VisitorsLocationComponent.prototype.onUpdate = function (circle) {
                    this.showingMap = false;
                    this.areaChange.emit(circle);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], VisitorsLocationComponent.prototype, "circle", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], VisitorsLocationComponent.prototype, "comparisonValue", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', common_1.Control)
                ], VisitorsLocationComponent.prototype, "comparisonControl", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], VisitorsLocationComponent.prototype, "comparisonOptions", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], VisitorsLocationComponent.prototype, "fromLabel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], VisitorsLocationComponent.prototype, "changedHook", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], VisitorsLocationComponent.prototype, "preferredUnit", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], VisitorsLocationComponent.prototype, "areaChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], VisitorsLocationComponent.prototype, "comparisonChange", void 0);
                VisitorsLocationComponent = __decorate([
                    core_1.Component({
                        selector: 'cw-visitors-location-component',
                        providers: [common_1.DecimalPipe],
                        directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, area_picker_dialog_component_1.AreaPickerDialogComponent, dropdown_1.Dropdown, dropdown_1.InputOption, input_text_1.InputText],
                        template: "<div flex layout=\"row\" class=\"cw-visitors-location cw-condition-component-body\" *ngIf=\"comparisonDropdown != null\">\n\n  <cw-input-dropdown flex\n                     class=\"cw-input\"\n                     [ngFormControl]=\"comparisonDropdown.control\"\n                     [required]=\"true\"\n                     [class.cw-comparator-selector]=\"true\"\n                     (change)=\"comparisonChange.emit($event)\"\n                     placeholder=\"{{comparisonDropdown.placeholder}}\">\n    <cw-input-option *ngFor=\"let opt of comparisonDropdown.options\"\n                     [value]=\"opt.value\"\n                     [label]=\"opt.label | async\"\n                     icon=\"{{opt.icon}}\"></cw-input-option>\n  </cw-input-dropdown>\n  <div flex=\"15\" layout-fill layout=\"row\" layout-align=\"start center\" class=\"cw-input\">\n    <cw-input-text\n        flex\n        class=\"cw-latLong\"\n        [type]=\"text\"\n        [value]=\"getRadiusInPreferredUnit() | number:'1.0-0'\"\n        [readonly]=\"true\">\n    </cw-input-text>\n    <label class=\"cw-input-label-right\">{{preferredUnit}}</label>\n  </div>\n  <div flex layout-fill layout=\"row\" layout-align=\"start center\" class=\"cw-input\">\n    <label class=\"cw-input-label-left\">{{fromLabel}}</label>\n    <cw-input-text\n        flex\n        class=\"cw-radius\"\n        [type]=\"text\"\n        [value]=\"getLatLong()\"\n        [readonly]=\"true\">\n    </cw-input-text>\n  </div>\n  <div flex layout=\"column\" class=\"cw-input cw-last\">\n    <button class=\"ui button cw-button-add\" aria-label=\"Show Map\" (click)=\"toggleMap()\">\n      <i class=\"plus icon\" aria-hidden=\"true\"></i>Show Map\n    </button>\n  </div>\n</div>\n<cw-area-picker-dialog-component\n    [headerText]=\"'Select an area'\"\n    [hidden]=\"!showingMap\"\n    [apiKey]=\"apiKey\"\n    [circle]=\"circle\"\n    (circleUpdate)=\"onUpdate($event)\"\n    (cancel)=\"showingMap = !showingMap\"\n></cw-area-picker-dialog-component>\n", changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    }), 
                    __metadata('design:paramtypes', [common_1.DecimalPipe])
                ], VisitorsLocationComponent);
                return VisitorsLocationComponent;
            }());
            exports_1("VisitorsLocationComponent", VisitorsLocationComponent);
        }
    }
});
//# sourceMappingURL=visitors-location.component.js.map