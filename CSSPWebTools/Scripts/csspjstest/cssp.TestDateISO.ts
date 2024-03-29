﻿module CSSP {
    export class TestDateISO {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
            cssp.Test.CleanFormVisibleInput($form);
            if (i == 0) {
                cssp.Test.StringTestList = [];
                cssp.Test.TestOKList = [];
                cssp.Test.StringTestList.push("2");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("2013-2-23");
                cssp.Test.TestOKList.push(true);
                cssp.Test.StringTestList.push("sefilj");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("2014/3/23");
                cssp.Test.TestOKList.push(true);
                cssp.Test.StringTestList.push("orange");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("2014-3-24");
                cssp.Test.TestOKList.push(true);
                cssp.Test.StringTestList.push("moi");
                cssp.Test.TestOKList.push(false);
                cssp.Test.StringTestList.push("2013/5/25");
                cssp.Test.TestOKList.push(true);
            }
            cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.StringTestList[i]);
            $form.valid();
            setTimeout(() => {
                test("Date ISO test for field [" + $input.attr("name") + "]  (" + i + ") [" + cssp.Test.StringTestList[i] + "]", () => {
                    if (cssp.Test.TestOKList[i]) {
                        equal($nextSpan.text(), "", "Span text compare");
                    }
                    else {
                        equal($nextSpan.text(), $.validator.messages.dateISO, "Span text compare");
                    }
                });

                i++;
                if (i < cssp.Test.StringTestList.length) {
                    cssp.Test.TestDateISO.DoTest($form, $input, $nextSpan, i);
                }
                else {
                    test("Finished date ISO test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
} 