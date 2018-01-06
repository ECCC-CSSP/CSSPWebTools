var CSSP;
(function (CSSP) {
    var TestRangeLength = /** @class */ (function () {
        function TestRangeLength() {
            this.DoTest = function ($form, $input, $nextSpan, i) {
                cssp.Test.CleanFormVisibleInput($form);
                var minLength = $input.rules()["rangelength"][0];
                var maxLength = $input.rules()["rangelength"][1];
                if (i == 0) {
                    cssp.Test.StringTestList = [];
                    var TempText = cssp.Test.RandomString(minLength - 1);
                    cssp.Test.StringTestList.push(TempText);
                    cssp.Test.StringTestList.push(TempText + "a");
                    cssp.Test.StringTestList.push(TempText + "ab");
                    var TempText = cssp.Test.RandomString(maxLength - 1);
                    cssp.Test.StringTestList.push(TempText);
                    cssp.Test.StringTestList.push(TempText + "a");
                    cssp.Test.StringTestList.push(TempText + "ab");
                }
                cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
                $form.valid();
                setTimeout(function () {
                    test("Range Length test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", function () {
                        if (cssp.Test.StringTestList[i].length >= minLength && cssp.Test.StringTestList[i].length <= maxLength) {
                            equal($nextSpan.text(), "", "Span text compare");
                        }
                        else {
                            equal($nextSpan.text(), $.validator.messages.rangelength([minLength, maxLength]), "Span text compare");
                        }
                    });
                    i++;
                    if (i < cssp.Test.StringTestList.length) {
                        cssp.Test.TestRangeLength.DoTest($form, $input, $nextSpan, i);
                    }
                    else {
                        test("Finished Range Length test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", function () {
                            equal(true, true);
                            cssp.Test.IsRunning = false;
                        });
                    }
                }, 200);
            };
        }
        return TestRangeLength;
    }());
    CSSP.TestRangeLength = TestRangeLength;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TestRangeLength.js.map