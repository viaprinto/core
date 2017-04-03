System.register(["rxjs/Rx"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rx_1;
    var ObservableHack;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            ObservableHack = (function () {
                function ObservableHack() {
                }
                /**
                 * @See https://github.com/angular/angular/issues/5992
                 * @param value
                 * @returns {Observable<string>}
                 */
                ObservableHack.of = function (value) {
                    return Rx_1.Observable.create(function (subscriber) {
                        subscriber.next(value);
                    }).subscribeOn(Rx_1.Scheduler.asap);
                };
                return ObservableHack;
            }());
            exports_1("ObservableHack", ObservableHack);
        }
    }
});
//# sourceMappingURL=ObservableHack.js.map