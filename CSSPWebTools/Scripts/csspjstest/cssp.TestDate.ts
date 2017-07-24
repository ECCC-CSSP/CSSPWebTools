module CSSP {
    export class TestDate {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
            cssp.Test.CleanFormVisibleInput($form);
            if (i == 0) {
                cssp.Test.StringTestList = [];
                cssp.Test.TestOKList = [];
                cssp.Test.StringTestList.push("2 feb");
                cssp.Test.TestOKList.push(true);
                cssp.Test.StringTestList.push("sdf");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("2012");
                cssp.Test.TestOKList.push(true);
                cssp.Test.StringTestList.push("sefilj");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("2 feb 2014");
                cssp.Test.TestOKList.push(true);
                cssp.Test.StringTestList.push("orange");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("feb 2014");
                cssp.Test.TestOKList.push(true);
                cssp.Test.StringTestList.push("moi");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("2feb2014");
                cssp.Test.TestOKList.push(true);
            }
            cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
            $form.valid();
            setTimeout(() => {
                test("Date test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", () => {
                    if (cssp.Test.TestOKList[i]) {
                        equal($nextSpan.text(), "", "Span text compare");
                    }
                    else {
                        equal($nextSpan.text(), $.validator.messages.date, "Span text compare");
                    }
                });

                i++;
                if (i < cssp.Test.StringTestList.length) {
                    cssp.Test.TestDate.DoTest($form, $input, $nextSpan, i);
                }
                else {
                    test("Finished date test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
}  