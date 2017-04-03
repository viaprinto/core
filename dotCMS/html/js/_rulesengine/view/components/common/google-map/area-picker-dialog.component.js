System.register(["@angular/core", "@angular/common", "../modal-dialog/dialog-component", "../../../../api/maps/GoogleMapService"], function(exports_1, context_1) {
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
    var core_1, common_1, dialog_component_1, GoogleMapService_1;
    var mapIdCounter, AreaPickerDialogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (dialog_component_1_1) {
                dialog_component_1 = dialog_component_1_1;
            },
            function (GoogleMapService_1_1) {
                GoogleMapService_1 = GoogleMapService_1_1;
            }],
        execute: function() {
            mapIdCounter = 1;
            AreaPickerDialogComponent = (function () {
                function AreaPickerDialogComponent(mapsService) {
                    this.mapsService = mapsService;
                    this.headerText = '';
                    this.hidden = false;
                    this.circle = { center: { lat: 38.8977, lng: -77.0365 }, radius: 50000 };
                    this.close = new core_1.EventEmitter(false);
                    this.cancel = new core_1.EventEmitter(false);
                    this.circleUpdate = new core_1.EventEmitter(false);
                    this.mapId = 'map_' + mapIdCounter++;
                    this.waitCount = 0;
                    console.log("AreaPickerDialogComponent", "constructor", this.mapId);
                }
                AreaPickerDialogComponent.prototype.ngOnChanges = function (change) {
                    var _this = this;
                    if (!this.hidden && this.map == null) {
                        this.mapsService.mapsApi$.subscribe(function (x) { }, function () { }, function () {
                            if (_this.mapsService.apiReady) {
                                _this.readyMap();
                            }
                        });
                        this.mapsService.loadApi();
                    }
                    if (change.hidden && this.hidden && this.map) {
                        console.log("AreaPickerDialogComponent", "ngOnChanges", 'hiding map: ', this.map.getDiv().getAttribute('id'), this.map.getDiv()['style']['height']);
                        /**
                         *
                         * Angular2 has a bug? Google Maps? Chrome? For whatever reason, loading a second map without forcing a reload
                         * will cause the first map loaded to always display, despite the maps actually living in separate
                         * divs, and the 'hidden' map divs actually not being in the active DOM (they have been cut out / moved into the
                         * shadow dom by the ngIf).
                         */
                        this.map = null;
                    }
                    if (change.hidden && !this.hidden && this.map) {
                        console.log("AreaPickerDialogComponent", "ngOnChanges", 'showing map: ', this.map.getDiv().getAttribute('id'));
                    }
                };
                AreaPickerDialogComponent.prototype.readyMap = function () {
                    var _this = this;
                    var el = document.getElementById(this.mapId);
                    if (!el) {
                        window.setTimeout(function () { return _this.readyMap(); }, 10);
                    }
                    else {
                        this._prevCircle = this.circle;
                        this.map = new google.maps.Map(el, {
                            zoom: 7,
                            center: new google.maps.LatLng(this.circle.center.lat, this.circle.center.lng),
                            mapTypeId: google.maps.MapTypeId.TERRAIN
                        });
                        var circle = new google.maps.Circle({
                            strokeColor: '#1111FF',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#1111FF',
                            fillOpacity: 0.35,
                            map: this.map,
                            center: new google.maps.LatLng(this.circle.center.lat, this.circle.center.lng),
                            radius: this.circle.radius,
                            editable: true
                        });
                        this.map.addListener('click', function (e) {
                            circle.setCenter(e.latLng);
                            _this.map.panTo(e.latLng);
                            var ll = circle.getCenter();
                            var center = { lat: ll.lat(), lng: ll.lng() };
                            _this.circle = { center: center, radius: circle.getRadius() };
                        });
                        google.maps.event.addListener(circle, 'radius_changed', function () {
                            console.log('radius changed', circle.getRadius(), _this.circle.radius);
                            var ll = circle.getCenter();
                            var center = { lat: ll.lat(), lng: ll.lng() };
                            _this.circle = { center: center, radius: circle.getRadius() };
                            console.log('radius changed to', circle.getRadius(), _this.circle.radius);
                        });
                    }
                };
                AreaPickerDialogComponent.prototype.onOkAction = function (event) {
                    this._prevCircle = this.circle;
                    this.circleUpdate.emit(this.circle);
                };
                AreaPickerDialogComponent.prototype.onCancelAction = function (event) {
                    this.circle = this._prevCircle;
                    this.cancel.emit(false);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AreaPickerDialogComponent.prototype, "headerText", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], AreaPickerDialogComponent.prototype, "hidden", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], AreaPickerDialogComponent.prototype, "circle", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AreaPickerDialogComponent.prototype, "close", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AreaPickerDialogComponent.prototype, "cancel", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AreaPickerDialogComponent.prototype, "circleUpdate", void 0);
                AreaPickerDialogComponent = __decorate([
                    core_1.Component({
                        selector: 'cw-area-picker-dialog-component',
                        directives: [common_1.CORE_DIRECTIVES, dialog_component_1.ModalDialogComponent],
                        template: "<cw-modal-dialog \n                 [headerText]=\"headerText\"\n                 [hidden]=\"hidden\"\n                 [okEnabled]=\"true\"\n                 (ok)=\"onOkAction($event)\"\n                 (cancel)=\"onCancelAction($event)\">\n  <div *ngIf=\"!hidden\" class=\"cw-dialog-body\">\n    <div id=\"{{mapId}}\" class=\"g-map\" *ngIf=\"!hidden\" > </div>\n  </div>\n</cw-modal-dialog>",
                        styles: ["\n  .g-map {\n    height:100%;\n    width:100%;\n  }"],
                        changeDetection: core_1.ChangeDetectionStrategy.Default
                    }), 
                    __metadata('design:paramtypes', [GoogleMapService_1.GoogleMapService])
                ], AreaPickerDialogComponent);
                return AreaPickerDialogComponent;
            }());
            exports_1("AreaPickerDialogComponent", AreaPickerDialogComponent);
        }
    }
});
//# sourceMappingURL=area-picker-dialog.component.js.map