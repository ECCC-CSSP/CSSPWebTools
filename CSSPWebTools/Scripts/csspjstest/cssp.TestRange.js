var CSSP;
(function (CSSP) {
    var TestRange = /** @class */ (function () {
        function TestRange() {
            this.DoTest = function ($form, $input, $nextSpan, i) {
                cssp.Test.CleanFormVisibleInput($form);
                var min = $input.rules()["range"][0];
                var max = $input.rules()["range"][1];
                if (i == 0) {
                    cssp.Test.NumberTestList = [];
                    cssp.Test.NumberTestList.push(min - 1);
                    cssp.Test.NumberTestList.push(min);
                    cssp.Test.NumberTestList.push(min + 1);
                    cssp.Test.NumberTestList.push(max - 1);
                    cssp.Test.NumberTestList.push(max);
                    cssp.Test.NumberTestList.push(max + 1);
                }
                cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.NumberTestList[i].toString());
                $form.valid();
                setTimeout(function () {
                    test("Range test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.NumberTestList[i] + "]", function () {
                        if (cssp.Test.NumberTestList[i] >= min && cssp.Test.NumberTestList[i] <= max) {
                            equal($nextSpan.text(), "", "Span text compare");
                        }
                        else {
                            equal($nextSpan.text(), $.validator.messages.range(min, max), "Span text compare");
                        }
                    });
                    i++;
                    if (i < cssp.Test.NumberTestList.length) {
                        cssp.Test.TestRange.DoTest($form, $input, $nextSpan, i);
                    }
                    else {
                        test("Finished range test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", function () {
                            equal(true, true);
                            cssp.Test.IsRunning = false;
                        });
                    }
                }, 200);
            };
        }
        return TestRange;
    }());
    CSSP.TestRange = TestRange;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestRange.js.map