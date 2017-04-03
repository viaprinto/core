System.register(['@angular/core', "@angular/common", "../../../../../api/rule-engine/ServerSideFieldModel", "../../../../../api/system/locale/I18n", "./visitors-location.component", "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, common_1, ServerSideFieldModel_1, I18n_1, visitors_location_component_1, Rx_1;
    var UNITS, I8N_BASE, VisitorsLocationContainer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ServerSideFieldModel_1_1) {
                ServerSideFieldModel_1 = ServerSideFieldModel_1_1;
            },
            function (I18n_1_1) {
                I18n_1 = I18n_1_1;
            },
            function (visitors_location_component_1_1) {
                visitors_location_component_1 = visitors_location_component_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            UNITS = {
                mi: {
                    toMeters: (function (len) { return len * 1609.34; }),
                    toMiles: (function (len) { return len; }),
                    toKm: (function (len) { return len / 1.60934; }),
                },
                km: {
                    toMeters: (function (len) { return len * 1000; }),
                    toMiles: (function (len) { return len / 1.60934; }),
                    toKm: (function (len) { return len; }),
                },
                m: {
                    toMeters: (function (len) { return len; }),
                    toKm: (function (len) { return len / 1000; }),
                    toMiles: (function (len) { return len / 1609.34; }),
                }
            };
            I8N_BASE = 'api.sites.ruleengine';
            VisitorsLocationContainer = (function () {
                function VisitorsLocationContainer(resources, decimalPipe) {
                    this.resources = resources;
                    this.decimalPipe = decimalPipe;
                    this.parameterValuesChange = new core_1.EventEmitter(false);
                    this.circle$ = new Rx_1.BehaviorSubject({ center: { lat: 38.89, lng: -77.04 }, radius: 10000 });
                    this.preferredUnit = 'm';
                    this.lat = 0;
                    this.lng = 0;
                    this.radius = 50000;
                    this.comparisonValue = 'within';
                    this.fromLabel = 'of';
                    resources.get(I8N_BASE).subscribe(function (rsrc) { });
                    this._rsrcCache = {};
                    this.circle$.subscribe(function (e) {
                    }, function (e) {
                        console.error("VisitorsLocationContainer", "Error updating area", e);
                    }, function () { });
                }
                VisitorsLocationContainer.prototype.rsrc = function (subkey) {
                    var x = this._rsrcCache[subkey];
                    if (!x) {
                        x = this.resources.get(subkey);
                        this._rsrcCache[subkey] = x;
                    }
                    return x;
                };
                VisitorsLocationContainer.prototype.ngOnChanges = function (change) {
                    var _this = this;
                    if (change.componentInstance && this.componentInstance != null) {
                        var temp = this.componentInstance.parameters;
                        var params = temp;
                        var comparisonDef = this.componentInstance.parameterDefs['comparison'];
                        var opts_1 = comparisonDef.inputType['options'];
                        var i18nBaseKey = comparisonDef.i18nBaseKey || this.componentInstance.type.i18nKey;
                        var rsrcKey_1 = i18nBaseKey + '.inputs.comparison.';
                        var optsAry = Object.keys(opts_1).map(function (key) {
                            var sOpt = opts_1[key];
                            return { value: sOpt.value, label: _this.rsrc(rsrcKey_1 + sOpt.i18nKey), icon: sOpt.icon };
                        });
                        this.comparisonValue = params.comparison.value || comparisonDef.defaultValue;
                        this.comparisonOptions = optsAry;
                        this.comparisonControl = ServerSideFieldModel_1.ServerSideFieldModel.createNgControl(this.componentInstance, 'comparison');
                        this.lat = parseFloat(params.latitude.value) || this.lat;
                        this.lng = parseFloat(params.longitude.value) || this.lng;
                        this.radius = parseFloat(params.radius.value) || 50000;
                        this.preferredUnit = params.preferredDisplayUnits.value || this.componentInstance.parameterDefs['preferredDisplayUnits'].defaultValue;
                        this.circle$.next({ center: { lat: this.lat, lng: this.lng }, radius: this.radius });
                    }
                };
                VisitorsLocationContainer.prototype.onComparisonChange = function (value) {
                    this.parameterValuesChange.emit([{ name: 'comparison', value: value }]);
                };
                VisitorsLocationContainer.prototype.onUpdate = function (circle) {
                    console.log("App", "onUpdate", circle);
                    this.parameterValuesChange.emit([
                        { name: 'latitude', value: circle.center.lat + '' },
                        { name: 'longitude', value: circle.center.lng + '' },
                        { name: 'radius', value: circle.radius + '' }]);
                    this.lat = circle.center.lat;
                    this.lng = circle.center.lng;
                    this.radius = circle.radius;
                    this.circle$.next(circle);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', ServerSideFieldModel_1.ServerSideFieldModel)
                ], VisitorsLocationContainer.prototype, "componentInstance", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], VisitorsLocationContainer.prototype, "parameterValuesChange", void 0);
                VisitorsLocationContainer = __decorate([
                    core_1.Component({
                        selector: 'cw-visitors-location-container',
                        providers: [common_1.DecimalPipe],
                        directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, visitors_location_component_1.VisitorsLocationComponent],
                        template: "<cw-visitors-location-component \n    [circle]=\"circle$ | async\"\n    [preferredUnit]=\"preferredUnit\"\n    [comparisonValue]=\"comparisonValue\"\n    [comparisonControl]=\"comparisonControl\"\n    [comparisonOptions]=\"comparisonOptions\"\n    [fromLabel]=\"fromLabel\"\n    (comparisonChange)=\"onComparisonChange($event)\"\n    (areaChange)=\"onUpdate($event)\"\n></cw-visitors-location-component>\n", changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    }), 
                    __metadata('design:paramtypes', [I18n_1.I18nService, common_1.DecimalPipe])
                ], VisitorsLocationContainer);
                return VisitorsLocationContainer;
            }());
            exports_1("VisitorsLocationContainer", VisitorsLocationContainer);
        }
    }
});
//# sourceMappingURL=visitors-location.container.js.map