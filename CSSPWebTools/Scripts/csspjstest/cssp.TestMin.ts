module CSSP {
    export class TestMin {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
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
            setTimeout(() => {
                test("Min test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.NumberTestList[i] + "]", () => {
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
                    test("Finished Min test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
} 