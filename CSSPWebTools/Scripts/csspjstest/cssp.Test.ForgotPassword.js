var CSSP;
(function (CSSP) {
    var Test;
    (function (Test) {
        var ForgotPassword = (function () {
            // Constructors
            function ForgotPassword() {
                var _this = this;
                // Variables
                this.TSName = "cssp.ForgotPassword.ts";
                this.appName = "cssp.ForgotPassword";
                // Function
                // **********************************************************
                // **********************************************************
                // **********************************************************
                this.TestContents = function () {
                    $("#qunit-tests").html("");
                    cssp.Test.RunCheckVariablesAndFunctions(_this.TSName, _this.appName, ["FormName", "FormSubmit", "Init",]);
                    QUnit.module("#ForgotPasswordDiv and children");
                    var $cssPath;
                    $cssPath = $("#ForgotPasswordDiv");
                    test("#ForgotPasswordDiv attributes", function () {
                        equal($cssPath.attr("id"), "ForgotPasswordDiv", "id [ForgotPasswordDiv]");
                        equal($cssPath.attr("class"), "container-fluid", "class [container-fluid]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(0)");
                    test("#ForgotPasswordDiv > div:eq(0) attributes", function () {
                        equal($cssPath.attr("id"), "ForgotPasswordVariables", "id [ForgotPasswordVariables]");
                        equal($cssPath.attr("class"), "hidden", "class [hidden]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(0) > span:eq(0)");
                    test("#ForgotPasswordDiv > div:eq(0) > span:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "varError", "class [varError]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(0) > span:eq(1)");
                    test("#ForgotPasswordDiv > div:eq(0) > span:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "varCouldNotFind_Within_", "class [varCouldNotFind_Within_]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1)");
                    test("#ForgotPasswordDiv > div:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "row", "class [row]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form");
                    cssp.Test.TestForm.DoTest($cssPath, "#ForgotPasswordDiv > div:eq(1) > form");
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > input");
                    test("#ForgotPasswordDiv > div:eq(1) > form > input [__RequestVerificationToken] attributes", function () {
                        equal($cssPath.attr("name"), "__RequestVerificationToken", "name [__RequestVerificationToken]");
                        equal($cssPath.attr("type"), "hidden", "type [hidden]");
                        ok($("#ForgotPasswordDiv > div:eq(1) > form > input").attr("value").length > 0, "value [does exist]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0)");
                    test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "form-group", "class [form-group]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > label");
                    test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > label attributes", function () {
                        equal($cssPath.attr("class"), " col-sm-2 control-label", "class [ col-sm-2 control-label]");
                        equal($cssPath.attr("for"), "Email", "for [Email]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div");
                    test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-sm-10", "class [col-sm-10]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input");
                    cssp.Test.TestInput.DoTest($cssPath, "#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input");
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > span");
                    test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(0) > div > span attributes", function () {
                        equal($cssPath.attr("class"), "help-block", "class [help-block]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1)");
                    test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "btn-block col-sm-offset-2 col-sm-10", "class [btn-block col-sm-offset-2 col-sm-10]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > button");
                    test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > button attributes", function () {
                        equal($cssPath.attr("class"), "jbForgotPassword btn btn-primary", "class [jbForgotPassword btn btn-primary]");
                        equal($cssPath.attr("type"), "submit", "type [submit]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > button > span");
                    test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > button > span attributes", function () {
                        equal($cssPath.attr("class"), "glyphicon glyphicon-check", "class [glyphicon glyphicon-check]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > a");
                    test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > a attributes", function () {
                        equal($cssPath.attr("href"), "#!Login", "href [#!Login]");
                        equal($cssPath.attr("class"), "appJSLogin btn btn-default", "class [appJSLogin btn btn-default]");
                        equal($cssPath.attr("role"), "button", "role [button]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > a > span");
                    test("#ForgotPasswordDiv > div:eq(1) > form > fieldset > div:eq(1) > a > span attributes", function () {
                        equal($cssPath.attr("class"), "glyphicon glyphicon-log-in", "class [glyphicon glyphicon-log-in]");
                    });
                    $cssPath = $("#ForgotPasswordDiv > div:eq(1) > div");
                    test("#ForgotPasswordDiv > div:eq(1) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-lg-6 col-md-4 col-sm-2", "class [col-lg-6 col-md-4 col-sm-2]");
                    });
                };
                this.TestFields = function () {
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
                this.TestForgotPasswordSetupPart2 = function () {
                    var $Form = $("#TryToSendEmailJSON");
                    var $EmailInput = $Form.find("input[name=Email]").val("charles.leblanc2@canada.ca");
                    $Form.find("button.jbForgotPassword").click();
                };
                this.TestSendFormLoop = function (i) {
                    if (i == 0) {
                        $("#qunit-tests").html("");
                        QUnit.module("ForgotPassword Send Form tests");
                        _this.ResetTestVariables();
                    }
                    _this.FillAndExecuteFormLoop(i);
                };
                // Function private
                // _______________________________________________________________________________________
                // _______________________________________________________________________________________
                // Function private
                this.ClickForgotPassword = function (i) {
                    $("a[href='#!ForgotPassword']").click();
                    setTimeout(function () {
                        cssp.Test.ForgotPassword.DoNextItem(i);
                    }, 200);
                };
                this.ClickLogin = function (i) {
                    $("a[href='#!Login']").click();
                    setTimeout(function () {
                        cssp.Test.ForgotPassword.ClickForgotPassword(i);
                    }, 200);
                };
                this.CloseDialog = function (i) {
                    $("#DialogBasic").find(".close").click();
                    setTimeout(function () {
                        cssp.Test.ForgotPassword.DoNextItem(i);
                    }, 300);
                };
                this.DoNextItem = function (i) {
                    i++;
                    if (i < cssp.Test.ForgotPassword.EmailTestList.length) {
                        cssp.Test.ForgotPassword.TestSendFormLoop(i);
                    }
                    else {
                        test("Finished", function () {
                            equal(true, true);
                        });
                    }
                };
                this.FillAndExecuteFormLoop = function (i) {
                    var $Form = $("#TryToSendEmailJSON");
                    var $EmailInput = $Form.find("input[name=Email]").val(cssp.Test.ForgotPassword.EmailTestList[i]);
                    $Form.find("button.jbForgotPassword").click();
                    setTimeout(function () {
                        if (!cssp.Test.ForgotPassword.ForgotPasswordTestOK[i]) {
                            test("ForgotPassword Send Form testing (" + i + ") [" + cssp.Test.ForgotPassword.EmailTestList[i] + "]", function () {
                                equal($EmailInput.next(".help-block").text(), $.validator.format(cssp.Test._DoesNotExist, cssp.Test.ForgotPassword.EmailTestList[i]), "[" + cssp.Test.ForgotPassword.EmailTestList[i] + "] does not exist");
                            });
                            cssp.Test.ForgotPassword.CloseDialog(i);
                        }
                        else {
                            test("ForgotPassword Send Form testing (" + i + ") [" + cssp.Test.ForgotPassword.EmailTestList[i] + "]", function () {
                                ok($("#ForgotPasswordEmailSentDiv").length == 1, "Forgot password sent email");
                            });
                            cssp.Test.ForgotPassword.ClickLogin(i);
                        }
                    }, 500);
                };
                this.ResetTestVariables = function () {
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
            return ForgotPassword;
        }());
        Test.ForgotPassword = ForgotPassword;
    })(Test = CSSP.Test || (CSSP.Test = {}));
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Test.ForgotPassword.js.map