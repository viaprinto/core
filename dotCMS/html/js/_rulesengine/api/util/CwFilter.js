System.register(["../validation/Verify"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Verify_1;
    var numberRegex, CwFilter;
    return {
        setters:[
            function (Verify_1_1) {
                Verify_1 = Verify_1_1;
            }],
        execute: function() {
            numberRegex = /[\d.]/;
            CwFilter = (function () {
                function CwFilter() {
                }
                CwFilter.transformValue = function (fieldValue) {
                    var xform = fieldValue;
                    if (Verify_1.Verify.exists(fieldValue)) {
                        if (fieldValue === "true") {
                            xform = true;
                        }
                        else if (fieldValue === "false") {
                            xform = false;
                        }
                        else if (fieldValue.match(numberRegex)) {
                            xform = Number.parseFloat(fieldValue);
                        }
                    }
                    return xform;
                };
                CwFilter.isFiltered = function (obj, filterText) {
                    var _this = this;
                    var isFiltered = false;
                    if (filterText != '') {
                        var filter_1 = filterText;
                        var re = /([\w]*[:][\w]*)/g;
                        var matches = filterText.match(re);
                        if (matches != null) {
                            // 'match' is now an array of the field filters.
                            matches.forEach(function (match) {
                                var terms = match.split(':');
                                filter_1 = filter_1.replace(match, '');
                                if (!isFiltered) {
                                    var fieldName = terms[0];
                                    var fieldValue = terms[1];
                                    var hasField = obj.hasOwnProperty(fieldName) || obj.hasOwnProperty('_' + fieldName);
                                    if (hasField) {
                                        try {
                                            isFiltered = (obj[fieldName] !== fieldValue && obj[fieldName] !== _this.transformValue(fieldValue));
                                        }
                                        catch (e) {
                                            console.log("Error while trying to check a field value while filtering.", e);
                                        }
                                    }
                                }
                            });
                        }
                        filter_1 = filter_1.trim().toLowerCase();
                        if (filter_1) {
                            isFiltered = isFiltered || !(obj.name.toLowerCase().indexOf(filter_1) >= 0);
                        }
                    }
                    return isFiltered;
                };
                return CwFilter;
            }());
            exports_1("CwFilter", CwFilter);
        }
    }
});
//# sourceMappingURL=CwFilter.js.map