module CSSP {
    export class TestRequired {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
            cssp.Test.CleanFormVisibleInput($form);
            if (i == 0) {
                cssp.Test.StringTestList = [];
                cssp.Test.StringTestList.push("something");
                cssp.Test.StringTestList.push("");
            }
            cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
            $form.valid();
            setTimeout(() => {
                test("Required test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", () => {
                    if (cssp.Test.StringTestList[i].length != 0) {
                        if ($input.attr("type") == "email") {
                            equal($nextSpan.text(), $.validator.messages.email, "Span text compare");
                        }
                        else {
                            equal($nextSpan.text(), "", "Span text compare");
                        }
                    }
                    else {
                        equal($nextSpan.text(), $.validator.messages.required, "Span text compare");
                    }
                });

                i++;
                if (i < cssp.Test.StringTestList.length) {
                    cssp.Test.TestRequired.DoTest($form, $input, $nextSpan, i);
                }
                else {
                    test("Finished required test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
} 