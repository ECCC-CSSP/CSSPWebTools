var CSSP;
(function (CSSP) {
    var TestURL = (function () {
        function TestURL() {
            this.DoTest = function ($form, $input, $nextSpan, i) {
                cssp.Test.CleanFormVisibleInput($form);
                if (i == 0) {
                    cssp.Test.StringTestList = [];
                    cssp.Test.TestOKList = [];
                    cssp.Test.StringTestList.push("http://www.ibm.com");
                    cssp.Test.TestOKList.push(true);
                    cssp.Test.StringTestList.push("NotURL");
                    cssp.Test.TestOKList.push(false);
                }
                cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
                $form.valid();
                setTimeout(function () {
                    test("URL test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", function () {
                        if (cssp.Test.TestOKList[i]) {
                            equal($nextSpan.text(), "", "Span text compare");
                        }
                        else {
                            equal($nextSpan.text(), $.validator.messages.url, "Span text compare");
                        }
                    });
                    i++;
                    if (i < cssp.Test.StringTestList.length) {
                        cssp.Test.TestURL.DoTest($form, $input, $nextSpan, i);
                    }
                    else {
                        test("Finished URL test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", function () {
                            equal(true, true);
                            cssp.Test.IsRunning = false;
                        });
                    }
                }, 200);
            };
        }
        return TestURL;
    }());
    CSSP.TestURL = TestURL;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestURL.js.map