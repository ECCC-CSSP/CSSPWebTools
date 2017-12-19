var CSSP;
(function (CSSP) {
    var TestMin = /** @class */ (function () {
        function TestMin() {
            this.DoTest = function ($form, $input, $nextSpan, i) {
                cssp.Test.CleanFormVisibleInput($form);
                var min = $input.rules()["min"];
                if (i == 0) {
                    cssp.Test.NumberTestList = [];
                    cssp.Test.NumberTestList.push(min - 1);
                    cssp.Test.NumberTestList.push(min);
                    cssp.Test.NumberTestList.push(min + 1);
                }
                cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.NumberTestList[i].toString());
                $form.valid();
                setTimeout(function () {
                    test("Min test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.NumberTestList[i] + "]", function () {
                        if (cssp.Test.NumberTestList[i] >= min) {
                            equal($nextSpan.text(), "", "Span text compare");
                        }
                        else {
                            equal($nextSpan.text(), $.validator.messages.min(min), "Span text compare");
                        }
                    });
                    i++;
                    if (i < cssp.Test.NumberTestList.length) {
                        cssp.Test.TestMin.DoTest($form, $input, $nextSpan, i);
                    }
                    else {
                        test("Finished Min test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", function () {
                            equal(true, true);
                            cssp.Test.IsRunning = false;
                        });
                    }
                }, 200);
            };
        }
        return TestMin;
    }());
    CSSP.TestMin = TestMin;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestMin.js.map