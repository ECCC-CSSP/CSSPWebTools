var CSSP;
(function (CSSP) {
    var TestRemote = (function () {
        function TestRemote() {
            this.DoTest = function ($form, $input, $nextSpan, i) {
                cssp.Test.CleanFormVisibleInput($form);
                if (i == 0) {
                    cssp.Test.StringTestList = [];
                    cssp.Test.StringTestList.push("");
                }
                cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
                $form.valid();
                i++;
                if (i < cssp.Test.StringTestList.length) {
                    cssp.Test.TestRemote.DoTest($form, $input, $nextSpan, i);
                }
                else {
                    test("Finished Remote test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", function () {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            };
        }
        return TestRemote;
    }());
    CSSP.TestRemote = TestRemote;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestRemote.js.map