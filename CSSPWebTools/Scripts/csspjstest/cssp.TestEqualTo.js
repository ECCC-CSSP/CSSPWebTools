var CSSP;
(function (CSSP) {
    var TestEqualTo = (function () {
        function TestEqualTo() {
            this.DoTest = function ($form, $input, $nextSpan, i) {
                cssp.Test.CleanFormVisibleInput($form);
                var $Comparer = $($input.rules()["equalTo"]);
                test("EqualTo test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", function () {
                    equal($Comparer.length, 1, "Finding comparer element");
                });
                if (i == 0) {
                    cssp.Test.StringTestList = [];
                    cssp.Test.StringTestList.push("asfeea"); // comparer
                    cssp.Test.StringTestList.push("not equal"); // equal to
                    cssp.Test.StringTestList.push("asfeea"); // comparer
                    cssp.Test.StringTestList.push("asfeea"); // equal to
                    cssp.Test.StringTestList.push("rrrrrr"); // comparer
                    cssp.Test.StringTestList.push("not equal"); // equal to
                }
                cssp.Test.AddValueInInput($Comparer, $nextSpan, cssp.Test.StringTestList[i]);
                cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i + 1]);
                $form.valid();
                setTimeout(function () {
                    test("EqualTo test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]  [" + cssp.Test.StringTestList[i + 1] + "]", function () {
                        if (cssp.Test.StringTestList[i] == cssp.Test.StringTestList[i + 1]) {
                            equal($nextSpan.text(), "", "Span text compare");
                        }
                        else {
                            equal($nextSpan.text(), $.validator.messages.equalTo, "Span text compare");
                        }
                    });
                    i++;
                    i++;
                    if (i < cssp.Test.StringTestList.length) {
                        cssp.Test.TestEqualTo.DoTest($form, $input, $nextSpan, i);
                    }
                    else {
                        test("Finished equalTo test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", function () {
                            equal(true, true);
                            cssp.Test.IsRunning = false;
                        });
                    }
                }, 500);
            };
        }
        return TestEqualTo;
    }());
    CSSP.TestEqualTo = TestEqualTo;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestEqualTo.js.map