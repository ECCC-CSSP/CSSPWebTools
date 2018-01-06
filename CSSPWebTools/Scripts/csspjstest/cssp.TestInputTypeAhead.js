var CSSP;
(function (CSSP) {
    var TestInputTypeAhead = /** @class */ (function () {
        function TestInputTypeAhead() {
            this.DoTest = function ($cssPath, CurrentCSSPath) {
                test(CurrentCSSPath + " [typeahead]", function () {
                    var $parent = $cssPath.closest("span");
                    ok($parent.hasClass("twitter-typeahead"), "[parent tag of input is span with class twitter-typeahead]");
                    ok($parent.children("input").length == 2, "[parent tag has 2 input tag as children]");
                });
            };
        }
        return TestInputTypeAhead;
    }());
    CSSP.TestInputTypeAhead = TestInputTypeAhead;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestInputTypeAhead.js.map