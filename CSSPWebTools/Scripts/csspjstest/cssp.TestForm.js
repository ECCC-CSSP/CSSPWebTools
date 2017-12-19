var CSSP;
(function (CSSP) {
    var TestForm = /** @class */ (function () {
        function TestForm() {
            this.DoTest = function ($cssPath, CurrentCSSPath) {
                test(CurrentCSSPath, function () {
                    ok($cssPath.children("input[name=__RequestVerificationToken]").length == 1, " Form does contain a hidden __RequestVerificationToken");
                    ok($cssPath.attr("method") != undefined, " Form has method [" + $cssPath.attr("method") + "]");
                    ok($cssPath.attr("role") != undefined, " Form has role [" + $cssPath.attr("role") + "]");
                    ok($cssPath.attr("action") != undefined, " Form has action [" + $cssPath.attr("action") + "]");
                });
            };
        }
        return TestForm;
    }());
    CSSP.TestForm = TestForm;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestForm.js.map