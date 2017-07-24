module CSSP {
    export class TestDigits {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
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
                cssp.Test.StringTestList.push("2763 746");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("2.2");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("2763");
                cssp.Test.TestOKList.push(true);
            }
            cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
            $form.valid();
            setTimeout(() => {
                test("Digits test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", () => {
                    if (cssp.Test.TestOKList[i]) {
                        equal($nextSpan.text(), "", "Span text compare");
                    }
                    else {
                        equal($nextSpan.text(), $.validator.messages.digits, "Span text compare");
                    }
                });

                i++;
                if (i < cssp.Test.StringTestList.length) {
                    cssp.Test.TestDigits.DoTest($form, $input, $nextSpan, i);
                }
                else {
                    test("Finished digits test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
} 