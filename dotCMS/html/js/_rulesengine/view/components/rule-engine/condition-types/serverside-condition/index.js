System.register(['./demo'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var App;
    return {
        setters:[
            function (App_1) {
                App = App_1;
            }],
        execute: function() {
            App.main().then(function () {
                console.log("Loaded Demo.");
            });
            console.log("Loading Demo.");
        }
    }
});
//# sourceMappingURL=index.js.map