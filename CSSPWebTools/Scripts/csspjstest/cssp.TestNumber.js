var CSSP;
(function (CSSP) {
    var TestNumber = /** @class */ (function () {
        function TestNumber() {
            this.DoTest = function ($form, $input, $nextSpan, i) {
                cssp.Test.CleanFormVisibleInput($form);
                if (i == 0) {
                    cssp.Test.StringTestList = [];
                    cssp.Test.TestOKList = [];
                    cssp.Test.StringTestList.push("asfeea");
                    cssp.Test.TestOKList.push(false);
                    cssp.Test.StringTestList.push("2");
                    cssp.Test.TestOKList.push(true);
                    cssp.Test.StringTestList.push("asfeea");
                    cssp.Test.TestOKList.push(false);
                    cssp.Test.StringTestList.push("2.2");
                    cssp.Test.TestOKList.push(true);
                }
                cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
                $form.valid();
                setTimeout(function () {
                    test("Number test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", function () {
                        if (cssp.Test.TestOKList[i]) {
                            equal($nextSpan.text(), "", "Span text compare");
                        }
                        else {
                            equal($nextSpan.text(), $.validator.messages.number, "Span text compare");
                        }
                    });
                    i++;
                    if (i < cssp.Test.StringTestList.length) {
                        cssp.Test.TestNumber.DoTest($form, $input, $nextSpan, i);
                    }
                    else {
                        test("Finished number test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", function () {
                            equal(true, true);
                            cssp.Test.IsRunning = false;
                        });
                    }
                }, 200);
            };
        }
        return TestNumber;
    }());
    CSSP.TestNumber = TestNumber;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestNumber.js.map