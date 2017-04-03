System.register(['@angular/core', "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, Rx_1;
    var GoogleMapService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            window['mapsApi$'] = new Rx_1.BehaviorSubject({ ready: false });
            window['mapsApiReady'] = function () {
                window['mapsApi$'].next({ ready: true });
                window['mapsApi$'].complete();
            };
            GoogleMapService = (function () {
                function GoogleMapService() {
                    var _this = this;
                    this.apiKey = null;
                    this.apiReady = false;
                    this.loadingApi = false;
                    this.mapsApi$ = window['mapsApi$'];
                    this.mapsApi$.subscribe(function (gMapApi) {
                        if (gMapApi != null) {
                            _this.apiReady = true;
                        }
                    });
                }
                GoogleMapService.prototype.loadApi = function () {
                    if (!this.loadingApi) {
                        this.loadingApi = true;
                        var url = void 0;
                        if (this.apiKey) {
                            url = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKey + "&callback=mapsApiReady";
                        }
                        else {
                            url = "https://maps.googleapis.com/maps/api/js?callback=mapsApiReady";
                        }
                        this.addScript(url);
                    }
                };
                GoogleMapService.prototype.addScript = function (url, callback) {
                    var script = document.createElement('script');
                    if (callback) {
                        script.onload = callback;
                    }
                    script.type = 'text/javascript';
                    script.src = url;
                    document.body.appendChild(script);
                };
                GoogleMapService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], GoogleMapService);
                return GoogleMapService;
            }());
            exports_1("GoogleMapService", GoogleMapService);
        }
    }
});
//# sourceMappingURL=GoogleMapService.js.map