module CSSP {
    export class TestMaxLength {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
            cssp.Test.CleanFormVisibleInput($form);
            var Length = $input.rules()["maxlength"];
            if (i == 0) {
                cssp.Test.StringTestList = [];
                var TempText = cssp.Test.RandomString(Length - 1);
                cssp.Test.StringTestList.push(TempText);
                cssp.Test.StringTestList.push(TempText + "a");
                cssp.Test.StringTestList.push(TempText + "ab");
            }
            cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
            $form.valid();
            setTimeout(() => {
                test("Max Length test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", () => {
                    if (cssp.Test.StringTestList[i].length <= Length) {
                        equal($nextSpan.text(), "", "Span text compare");
                    }
                    else {
                        equal($nextSpan.text(), $.validator.messages.maxlength(Length), "Span text compare");
                    }
                });

                i++;
                if (i < cssp.Test.StringTestList.length) {
                    cssp.Test.TestMaxLength.DoTest($form, $input, $nextSpan, i);
                }
                else {
                    test("Finished Max Length test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
} 