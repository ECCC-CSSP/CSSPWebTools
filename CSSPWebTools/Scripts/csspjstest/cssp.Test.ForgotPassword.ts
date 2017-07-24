module CSSP.Test {
    export class ForgotPassword {
        // Variables
        public TSName: string = "cssp.ForgotPassword.ts";
        public appName: string = "cssp.ForgotPassword";
        public EmailTestList: Array<string>;
        public ForgotPasswordTestOK: Array<boolean>;

        // Constructors
        constructor() {
        }

        // Function

        // **********************************************************
        // **********************************************************
        // **********************************************************



        public TestContents: Function = (): void => {

            $("#qunit-tests").html("");

            cssp.Test.RunCheckVariablesAndFunctions(this.TSName, this.appName, ["FormName", "FormSubmit", "Init", ]);

            QUnit.module("#ForgotPasswordDiv and children");

            var $cssPath: JQuery;
            $cssPath = $("#ForgotPasswordDiv");
            test("#ForgotPasswordDiv attributes", () => {
                equal($cssPath.attr("id"), "ForgotPasswordDiv", "id [ForgotPasswordDiv]");
                equal($cssPath.attr("class"), "container-fluid", "class [container-fluid]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(0)");
            test("#ForgotPasswordDiv > div:eq(0) attributes", () => {
                equal($cssPath.attr("id"), "ForgotPasswordVariables", "id [ForgotPasswordVariables]");
                equal($cssPath.attr("class"), "hidden", "class [hidden]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(0) > span:eq(0)");
            test("#ForgotPasswordDiv > div:eq(0) > span:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "varError", "class [varError]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(0) > span:eq(1)");
            test("#ForgotPasswordDiv > div:eq(0) > span:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "varCouldNotFind_Within_", "class [varCouldNotFind_Within_]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1)");
            test("#ForgotPasswordDiv > div:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "row", "class [row]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form");
            cssp.Test.TestForm.DoTest($cssPath, "#ForgotPasswordDiv > div:eq(1) > form");
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > input");
            test("#ForgotPasswordDiv > div:eq(1) > form > input [__RequestVerificationToken] attributes", () => {
                equal($cssPath.attr("name"), "__RequestVerificationToken", "name [__RequestVerificationToken]");
                equal($cssPath.attr("type"), "hidden", "type [hidden]");
                ok($("#ForgotPasswordDiv > div:eq(1) > form > input").attr("value").length > 0, "value [does exist]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0)");
            test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "form-group", "class [form-group]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > label");
            test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > label attributes", () => {
                equal($cssPath.attr("class"), " col-sm-2 control-label", "class [ col-sm-2 control-label]");
                equal($cssPath.attr("for"), "Email", "for [Email]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div");
            test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div attributes", () => {
                equal($cssPath.attr("class"), "col-sm-10", "class [col-sm-10]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input");
            cssp.Test.TestInput.DoTest($cssPath, "#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input");
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > span");
            test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > span attributes", () => {
                equal($cssPath.attr("class"), "help-block", "class [help-block]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1)");
            test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "btn-block col-sm-offset-2 col-sm-10", "class [btn-block col-sm-offset-2 col-sm-10]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > button");
            test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > button attributes", () => {
                equal($cssPath.attr("class"), "jbForgotPassword btn btn-primary", "class [jbForgotPassword btn btn-primary]");
                equal($cssPath.attr("type"), "submit", "type [submit]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > button > span");
            test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > button > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-check", "class [glyphicon glyphicon-check]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > a");
            test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > a attributes", () => {
                equal($cssPath.attr("href"), "#!Login", "href [#!Login]");
                equal($cssPath.attr("class"), "appJSLogin btn btn-default", "class [appJSLogin btn btn-default]");
                equal($cssPath.attr("role"), "button", "role [button]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > a > span");
            test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-log-in", "class [glyphicon glyphicon-log-in]");
            });
            $cssPath = $("#ForgotPasswordDiv > div:eq(1) > div");
            test("#ForgotPasswordDiv > div:eq(1) > div attributes", () => {
                equal($cssPath.attr("class"), "col-lg-6 col-md-4 col-sm-2", "class [col-lg-6 col-md-4 col-sm-2]");
            });
        };
        public TestFields: Function = (): void => {

            $("#qunit-tests").html("");
            cssp.Test.FuncTextArr = [new CSSP.Test.FuncField("TestRequired", "Email", "#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input"),
                new CSSP.Test.FuncField("TestEmail", "Email", "#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input"),
                new CSSP.Test.FuncField("TestRemote", "Email", "#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input"),
            ];
            cssp.Test.RunFunc(0);
        };




        // **********************************************************
        // **********************************************************
        // **********************************************************

        public TestForgotPasswordSetupPart2: Function = (): void => {
            var $Form: JQuery = $("#TryToSendEmailJSON");
            var $EmailInput: JQuery = $Form.find("input[name=Email]").val("charles.leblanc2@canada.ca");
            $Form.find("button.jbForgotPassword").click();
        };
        public TestSendFormLoop: Function = (i: number): void => {
            if (i == 0) {
                $("#qunit-tests").html("");

                QUnit.module("ForgotPassword Send Form tests");

                this.ResetTestVariables();
            }
            this.FillAndExecuteFormLoop(i);
        };


        // Function private
        // _______________________________________________________________________________________
        // _______________________________________________________________________________________
        // Function private

        private ClickForgotPassword: Function = (i: number): void => {
            $("a[href='#!ForgotPassword']").click();
            setTimeout(() => {
                cssp.Test.ForgotPassword.DoNextItem(i);
            }, 200);
        };
        private ClickLogin: Function = (i: number): void => {
            $("a[href='#!Login']").click();
            setTimeout(() => {
                cssp.Test.ForgotPassword.ClickForgotPassword(i);
            }, 200);
        };
        private CloseDialog: Function = (i: number): void => {
            $("#DialogBasic").find(".close").click();
            setTimeout(() => {
                cssp.Test.ForgotPassword.DoNextItem(i);
            }, 300);
        };
        private DoNextItem: Function = (i: number): void => {
            i++;
            if (i < cssp.Test.ForgotPassword.EmailTestList.length) {
                cssp.Test.ForgotPassword.TestSendFormLoop(i);
            }
            else {
                test("Finished", () => {
                    equal(true, true);
                });
            }
        };
        private FillAndExecuteFormLoop: Function = (i: number): void => {
            var $Form: JQuery = $("#TryToSendEmailJSON");
            var $EmailInput: JQuery = $Form.find("input[name=Email]").val(cssp.Test.ForgotPassword.EmailTestList[i]);
            $Form.find("button.jbForgotPassword").click();
            setTimeout(() => {
                if (!cssp.Test.ForgotPassword.ForgotPasswordTestOK[i]) {
                    test("ForgotPassword Send Form testing (" + i + ") [" + cssp.Test.ForgotPassword.EmailTestList[i] + "]", () => {
                        equal($EmailInput.next(".help-block").text(), $.validator.format(cssp.Test._DoesNotExist, cssp.Test.ForgotPassword.EmailTestList[i]), "[" + cssp.Test.ForgotPassword.EmailTestList[i] + "] does not exist");
                    });
                    cssp.Test.ForgotPassword.CloseDialog(i);
                }
                else {
                    test("ForgotPassword Send Form testing (" + i + ") [" + cssp.Test.ForgotPassword.EmailTestList[i] + "]", () => {
                        ok($("#ForgotPasswordEmailSentDiv").length == 1, "Forgot password sent email");
                    });
                    cssp.Test.ForgotPassword.ClickLogin(i);
                }
            }, 500);
        };
        private ResetTestVariables: Function = (): void => {
            cssp.Test.ForgotPassword.EmailTestList = [];
            cssp.Test.ForgotPassword.ForgotPasswordTestOK = [];

            // index 0
            cssp.Test.ForgotPassword.EmailTestList.push("charles.leblanc2@canada.ca");
            cssp.Test.ForgotPassword.ForgotPasswordTestOK.push(true);

            // index 1
            cssp.Test.ForgotPassword.EmailTestList.push("NotExistcharles.leblanc2@canada.ca");
            cssp.Test.ForgotPassword.ForgotPasswordTestOK.push(false);
        };
    }
}      