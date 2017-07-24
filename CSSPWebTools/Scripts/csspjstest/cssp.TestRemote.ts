module CSSP {
    export class TestRemote {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
            cssp.Test.CleanFormVisibleInput($form);
            if (i == 0) {
                cssp.Test.StringTestList = [];
                cssp.Test.StringTestList.push("");
            }
            cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
            $form.valid();
            i++;
            if (i < cssp.Test.StringTestList.length) {
                cssp.Test.TestRemote.DoTest($form, $input, $nextSpan, i);
            }
            else {
                test("Finished Remote test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                    equal(true, true);
                    cssp.Test.IsRunning = false;
                });
            }
        };
    }
} 