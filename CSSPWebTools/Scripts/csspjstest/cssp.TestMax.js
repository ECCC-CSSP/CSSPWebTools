var CSSP;
(function (CSSP) {
    var TestMax = (function () {
        function TestMax() {
            this.DoTest = function ($form, $input, $nextSpan, i) {
                cssp.Test.CleanFormVisibleInput($form);
                var max = $input.rules()["max"];
                if (i == 0) {
                    cssp.Test.NumberTestList = [];
                    cssp.Test.NumberTestList.push(max - 1);
                    cssp.Test.NumberTestList.push(max);
                    cssp.Test.NumberTestList.push(max + 1);
                }
                cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.NumberTestList[i].toString());
                $form.valid();
                setTimeout(function () {
                    test("Max test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.NumberTestList[i] + "]", function () {
                        if (cssp.Test.NumberTestList[i] <= max) {
                            equal($nextSpan.text(), "", "Span text compare");
                        }
                        else {
                            equal($nextSpan.text(), $.validator.messages.max(max), "Span text compare");
                        }
                    });
                    i++;
                    if (i < cssp.Test.NumberTestList.length) {
                        cssp.Test.TestMax.DoTest($form, $input, $nextSpan, i);
                    }
                    else {
                        test("Finished Max test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", function () {
                            equal(true, true);
                            cssp.Test.IsRunning = false;
                        });
                    }
                }, 200);
            };
        }
        return TestMax;
    }());
    CSSP.TestMax = TestMax;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestMax.js.map