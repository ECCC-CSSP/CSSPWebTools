module CSSP {
    export class TestMax {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
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
            setTimeout(() => {
                test("Max test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.NumberTestList[i] + "]", () => {
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
                    test("Finished Max test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
} 