module CSSP {
    export class TestEmail {
        constructor() {
        }
        public DoTest: Function = ($form: JQuery, $input: JQuery, $nextSpan: JQuery, i: number): void => {
            cssp.Test.CleanFormVisibleInput($form);
            if (i == 0) {
                cssp.Test.EmailTestList = [];
                cssp.Test.EmailTestExistList = [];
                cssp.Test.EmailTestNotWellFormedList = [];
                cssp.Test.EmailTestList.push("charles.leblanc2@canada.ca");
                cssp.Test.EmailTestExistList.push(true);
                cssp.Test.EmailTestNotWellFormedList.push(false);
                cssp.Test.EmailTestList.push("NotExistcharles.leblanc2@canada.ca");
                cssp.Test.EmailTestExistList.push(false);
                cssp.Test.EmailTestNotWellFormedList.push(false);
                cssp.Test.EmailTestList.push("NotwellformedCharles.LeBlanc.ec.gc.ca");
                cssp.Test.EmailTestExistList.push(false);
                cssp.Test.EmailTestNotWellFormedList.push(true);
                cssp.Test.EmailTestList.push("");
                cssp.Test.EmailTestExistList.push(false);
                cssp.Test.EmailTestNotWellFormedList.push(true);
            }
            var CheckEmailExistJSON = false;
            var CheckEmailUniquenessJSON = false;
            if ($input.rules()["remote"] != undefined) {
                if ($input.rules()["remote"].url != undefined) {
                    if ($input.rules()["remote"].url == cssp.BaseURL + "Contact/CheckEmailExistJSON") {
                        CheckEmailExistJSON = true;
                    }
                    else if ($input.rules()["remote"].url == cssp.BaseURL + "Contact/CheckEmailUniquenessJSON") {
                        CheckEmailUniquenessJSON = true;
                    }
                    else {
                    }
                }
            }
            cssp.Test.AddValueInInput($input, $nextSpan, cssp.Test.EmailTestList[i]);
            $form.valid();
            setTimeout(() => {
                test("Email testing (" + i + ") [" + cssp.Test.EmailTestList[i] + "]", () => {
                    if (cssp.Test.EmailTestExistList[i] == true) {
                        if (CheckEmailExistJSON) {
                            equal($nextSpan.text(), "", "Span text compare");
                        }
                        else if (CheckEmailUniquenessJSON) {
                            equal($nextSpan.text(), $.validator.format(cssp.Test._IsAlreadyTaken, cssp.Test.EmailTestList[i]), "Span text compare");
                        }
                        else {
                        }
                    }
                    else {
                        if (cssp.Test.EmailTestNotWellFormedList[i] == true) {
                            if (cssp.Test.EmailTestList[i].length == 0) {
                                equal($nextSpan.text(), $.validator.messages.required, "Span text compare");
                            }
                            else {
                                equal($nextSpan.text(), $.validator.messages.email, "Span text compare");
                            }
                        }
                        else {
                            if (CheckEmailExistJSON) {
                                equal($nextSpan.text(), $.validator.format(cssp.Test._DoesNotExist, cssp.Test.EmailTestList[i]), "Span text compare");
                            }
                            else if (CheckEmailUniquenessJSON) {
                                equal($nextSpan.text(), "", "Span text compare");
                            }
                            else {
                            }
                        }
                    }
                });

                i++;
                if (i < cssp.Test.EmailTestList.length) {
                    cssp.Test.TestEmail.DoTest($form, $input, $nextSpan, i);
                }
                else {
                    test("Finished email test for form [" + $form.attr("id") + "] field [" + $input.attr("name") + "]", () => {
                        equal(true, true);
                        cssp.Test.IsRunning = false;
                    });
                }
            }, 200);
        };
    }
} 