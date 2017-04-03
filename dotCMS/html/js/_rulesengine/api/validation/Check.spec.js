System.register(['./Check'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Check_1;
    var errorMessage, errorRegex;
    return {
        setters:[
            function (Check_1_1) {
                Check_1 = Check_1_1;
            }],
        execute: function() {
            errorMessage = 'The message';
            describe('Unit.validation.Check.notEmpty', function () {
                var validCases = [
                    { args: ' ', description: 'a single space.' },
                    { args: 'some text', description: 'a couple of words' },
                    { args: 'null', description: 'the literal string `null`' },
                    { args: 'undefined', description: 'The literal string `undefined`' },
                    { args: '1', description: 'The quoted number 1' },
                    { args: '0', description: 'The quoted number zero' },
                    { args: new String(' '), description: 'a single space as an instance of String.' }
                ];
                var invalidCases = [
                    { args: '', description: 'an empty string literal' },
                    { args: 1, description: 'the number value 1' },
                    { args: 0, description: 'the number value zero' },
                    { args: null, description: 'a literal null' },
                    { args: undefined, description: 'a literal undefined' },
                    { args: /foo/, description: 'a regex' }
                ];
                beforeEach(function () {
                    errorRegex = RegExp(errorMessage);
                });
                validCases.forEach(function (testCase) {
                    it('to pass when provided ' + testCase.description + '.', function () {
                        expect(Check_1.Check.notEmpty(testCase.args, errorMessage)).toEqual(testCase.args);
                    });
                });
                invalidCases.forEach(function (testCase) {
                    it('to throw an error when provided ' + testCase.description + '.', function () {
                        expect(function () {
                            Check_1.Check.notEmpty(testCase.args, errorMessage);
                        }).toThrowError(errorRegex);
                    });
                });
                it('to return error result when provided a custom type.', function () {
                    var Foo = (function () {
                        function Foo() {
                            this.afield = "something";
                        }
                        return Foo;
                    }());
                    expect(function () {
                        Check_1.Check.notEmpty(new Foo(), errorMessage);
                    }).toThrowError(errorRegex);
                });
            });
            describe('Unit.validation.Check.Exists', function () {
                var validCases = [
                    { args: ' ', description: 'a single space.' },
                    { args: '', description: 'an empty string' },
                    { args: 1, description: 'a number' },
                    { args: 'null', description: 'the literal string `null`' },
                    { args: 'undefined', description: 'The literal string `undefined`' },
                    { args: '1', description: 'The quoted number 1' },
                    { args: '0', description: 'The quoted number zero' },
                    { args: new String(' '), description: 'a single space as an instance of String.' },
                    { args: /bob/, description: 'A regex.' },
                    { args: {}, description: 'An object literal (`{}`)' }
                ];
                var invalidCases = [
                    { args: null, description: 'a literal null' },
                    { args: undefined, description: 'a literal undefined' }
                ];
                beforeEach(function () {
                    errorRegex = RegExp(errorMessage, 'ig');
                });
                validCases.forEach(function (testCase) {
                    it('to pass when provided ' + testCase.description + '.', function () {
                        expect(Check_1.Check.exists(testCase.args, errorMessage)).toEqual(testCase.args);
                    });
                });
                invalidCases.forEach(function (testCase) {
                    it('to throw an error when provided ' + testCase.description + '.', function () {
                        expect(function () {
                            Check_1.Check.exists(testCase.args, errorMessage);
                        }).toThrowError(errorRegex);
                    });
                });
            });
            describe('Unit.validation.Check.isString', function () {
                var validCases = [
                    { args: '', description: 'an empty string literal' },
                    { args: ' ', description: 'a single space.' },
                    { args: 'some text', description: 'a couple of words' },
                    { args: 'null', description: 'the literal string `null`' },
                    { args: 'undefined', description: 'The literal string `undefined`' },
                    { args: '1', description: 'The quoted number 1' },
                    { args: '0', description: 'The quoted number zero' },
                    { args: new String(' '), description: 'a single space as an instance of String.' }
                ];
                var invalidCases = [
                    { args: 1, description: 'the number value 1' },
                    { args: 0, description: 'the number value zero' },
                    { args: null, description: 'a literal null' },
                    { args: undefined, description: 'a literal undefined' },
                    { args: /foo/, description: 'a regex' }
                ];
                beforeEach(function () {
                    errorRegex = RegExp(errorMessage);
                });
                validCases.forEach(function (testCase) {
                    it('to pass when provided ' + testCase.description + '.', function () {
                        expect(Check_1.Check.isString(testCase.args, errorMessage)).toEqual(testCase.args);
                    });
                });
                invalidCases.forEach(function (testCase) {
                    it('to throw an error when provided ' + testCase.description + '.', function () {
                        expect(function () {
                            Check_1.Check.isString(testCase.args, errorMessage);
                        }).toThrowError(errorRegex);
                    });
                });
                it('to return error result when provided a custom type.', function () {
                    var Foo = (function () {
                        function Foo() {
                            this.afield = "something";
                        }
                        return Foo;
                    }());
                    expect(function () {
                        Check_1.Check.isString(new Foo(), errorMessage);
                    }).toThrowError(errorRegex);
                });
            });
        }
    }
});
//# sourceMappingURL=Check.spec.js.map