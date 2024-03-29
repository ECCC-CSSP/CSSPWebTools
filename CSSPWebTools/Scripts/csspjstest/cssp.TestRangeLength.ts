﻿module CSSP {
    export class TestRangeLength {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
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
            setTimeout(() => {
                test("Range Length test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", () => {
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
                    test("Finished Range Length test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
} 