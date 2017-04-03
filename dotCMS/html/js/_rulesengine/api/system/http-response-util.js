System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NETWORK_CONNECTION_ERROR, UNKNOWN_RESPONSE_ERROR, SERVER_RESPONSE_ERROR, CLIENTS_ONLY_MESSAGES, CwError;
    function isSuccess(resp) {
        return resp.status > 199 && resp.status < 300;
    }
    exports_1("isSuccess", isSuccess);
    function hasContent(resp) {
        return isSuccess(resp) && resp.status != 204;
    }
    exports_1("hasContent", hasContent);
    return {
        setters:[],
        execute: function() {
            exports_1("NETWORK_CONNECTION_ERROR", NETWORK_CONNECTION_ERROR = 1);
            exports_1("UNKNOWN_RESPONSE_ERROR", UNKNOWN_RESPONSE_ERROR = 2);
            exports_1("SERVER_RESPONSE_ERROR", SERVER_RESPONSE_ERROR = 3);
            exports_1("CLIENTS_ONLY_MESSAGES", CLIENTS_ONLY_MESSAGES = {
                1: "Could not connect to server."
            });
            CwError = (function () {
                function CwError(code, message, request, response, source) {
                    this.code = code;
                    this.message = message;
                    this.request = request;
                    this.response = response;
                    this.source = source;
                }
                return CwError;
            }());
            exports_1("CwError", CwError);
        }
    }
});
//# sourceMappingURL=http-response-util.js.map