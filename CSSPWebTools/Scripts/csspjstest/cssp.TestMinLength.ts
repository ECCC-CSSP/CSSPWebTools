module CSSP {
    export class TestMinLength {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
            cssp.Test.CleanFormVisibleInput($form);
            var Length = $input.rules()["minlength"];
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
                test("Min Length test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", () => {
                    if (cssp.Test.StringTestList[i].length < Length) {
                        equal($nextSpan.text(), $.validator.messages.minlength(Length), "Span text compare");
                    }
                    else {
                        equal($nextSpan.text(), "", "Span text compare");
                    }
                });

                i++;
                if (i < cssp.Test.StringTestList.length) {
                    cssp.Test.TestMinLength.DoTest($form, $input, $nextSpan, i);
                }
                else {
                    test("Finished Min Length test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
} 