var CSSP;
(function (CSSP) {
    var Test;
    (function (Test) {
        var ForgotPasswordEmailSent = (function () {
            // Constructors
            function ForgotPasswordEmailSent() {
                var _this = this;
                // Variables
                this.TSName = "cssp.ForgotPasswordEmailSent.ts";
                this.appName = "cssp.ForgotPasswordEmailSent";
                // Function
                // **********************************************************
                // **********************************************************
                // **********************************************************
                this.TestContents = function () {
                    $("#qunit-tests").html("");
                    cssp.Test.RunCheckVariablesAndFunctions(_this.TSName, _this.appName, ["FormName", "FormSubmit", "Init",]);
                    QUnit.module("#ForgotPasswordEmailSentDiv and children");
                    var $cssPath;
                    $cssPath = $("#ForgotPasswordEmailSentDiv");
                    test("#ForgotPasswordEmailSentDiv attributes", function () {
                        equal($cssPath.attr("id"), "ForgotPasswordEmailSentDiv", "id [ForgotPasswordEmailSentDiv]");
                        equal($cssPath.attr("class"), "container-fluid", "class [container-fluid]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(0)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(0) attributes", function () {
                        equal($cssPath.attr("id"), "ForgotPasswordEmailSentVariables", "id [ForgotPasswordEmailSentVariables]");
                        equal($cssPath.attr("class"), "hidden", "class [hidden]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(0) > span:eq(0)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(0) > span:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "varError", "class [varError]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(0) > span:eq(1)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(0) > span:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "varCouldNotFind_Within_", "class [varCouldNotFind_Within_]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "row", "class [row]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form");
                    cssp.Test.TestForm.DoTest($cssPath, "#ForgotPasswordEmailSentDiv > div:eq(1) > form");
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > input");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > input [__RequestVerificationToken] attributes", function () {
                        equal($cssPath.attr("name"), "__RequestVerificationToken", "name [__RequestVerificationToken]");
                        equal($cssPath.attr("type"), "hidden", "type [hidden]");
                        ok($("#ForgotPasswordEmailSentDiv > div:eq(1) > form > input").attr("value").length > 0, "value [does exist]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(0)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "well well-sm", "class [well well-sm]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(0) > h4 > span");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(0) > h4 > span attributes", function () {
                        equal($cssPath.attr("class"), "EmailSendTo text-primary lead", "class [EmailSendTo text-primary lead]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "form-group hidden", "class [form-group hidden]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) > label");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) > label attributes", function () {
                        equal($cssPath.attr("class"), "control-label  col-sm-2", "class [control-label  col-sm-2]");
                        equal($cssPath.attr("for"), "Email", "for [Email]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) > div");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-sm-10", "class [col-sm-10]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input");
                    cssp.Test.TestInput.DoTest($cssPath, "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input");
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) > div > span");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) > div > span attributes", function () {
                        equal($cssPath.attr("class"), "help-block", "class [help-block]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) attributes", function () {
                        equal($cssPath.attr("class"), "form-group", "class [form-group]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > label");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > label attributes", function () {
                        equal($cssPath.attr("class"), "control-label col-sm-2", "class [control-label col-sm-2]");
                        equal($cssPath.attr("for"), "Code", "for [Code]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > label > span");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > label > span attributes", function () {
                        equal($cssPath.attr("id"), "example", "id [example]");
                        equal($cssPath.attr("data-container"), "body", "data-container [body]");
                        equal($cssPath.attr("data-toggle"), "popover", "data-toggle [popover]");
                        equal($cssPath.attr("data-placement"), "right", "data-placement [right]");
                        equal($cssPath.attr("data-content"), "Please use code sent to your email in order to reset your password.", "data-content [Please use code sent to your email in order to reset your password.]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > label > span > span");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > label > span > span attributes", function () {
                        equal($cssPath.attr("class"), "glyphicon glyphicon-info-sign text-primary", "class [glyphicon glyphicon-info-sign text-primary]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > div");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-sm-10", "class [col-sm-10]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > div > input");
                    cssp.Test.TestInput.DoTest($cssPath, "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > div > input");
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > div > span");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > div > span attributes", function () {
                        equal($cssPath.attr("class"), "help-block", "class [help-block]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) attributes", function () {
                        equal($cssPath.attr("class"), "form-group", "class [form-group]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > label");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > label attributes", function () {
                        equal($cssPath.attr("class"), "control-label col-sm-2", "class [control-label col-sm-2]");
                        equal($cssPath.attr("for"), "Password", "for [Password]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > div");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-sm-10", "class [col-sm-10]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > div > input");
                    cssp.Test.TestInput.DoTest($cssPath, "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > div > input");
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > div > span");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > div > span attributes", function () {
                        equal($cssPath.attr("class"), "help-block", "class [help-block]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) attributes", function () {
                        equal($cssPath.attr("class"), "form-group", "class [form-group]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) > label");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) > label attributes", function () {
                        equal($cssPath.attr("class"), "control-label col-sm-2", "class [control-label col-sm-2]");
                        equal($cssPath.attr("for"), "ConfirmPassword", "for [ConfirmPassword]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) > div");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-sm-10", "class [col-sm-10]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) > div > input");
                    cssp.Test.TestInput.DoTest($cssPath, "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) > div > input");
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) > div > span");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) > div > span attributes", function () {
                        equal($cssPath.attr("class"), "help-block", "class [help-block]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5)");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5) attributes", function () {
                        equal($cssPath.attr("class"), "btn-block  col-sm-offset-2 col-sm-10", "class [btn-block  col-sm-offset-2 col-sm-10]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5) > button");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5) > button attributes", function () {
                        equal($cssPath.attr("class"), "jbForgotPasswordEmailSent btn btn-primary", "class [jbForgotPasswordEmailSent btn btn-primary]");
                        equal($cssPath.attr("type"), "submit", "type [submit]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5) > button > span");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5) > button > span attributes", function () {
                        equal($cssPath.attr("class"), "glyphicon glyphicon-check", "class [glyphicon glyphicon-check]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5) > a");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5) > a attributes", function () {
                        equal($cssPath.attr("href"), "#!Login", "href [#!Login]");
                        equal($cssPath.attr("class"), "appJSLogin btn btn-default", "class [appJSLogin btn btn-default]");
                        equal($cssPath.attr("role"), "button", "role [button]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5) > a > span");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(5) > a > span attributes", function () {
                        equal($cssPath.attr("class"), "glyphicon glyphicon-log-in", "class [glyphicon glyphicon-log-in]");
                    });
                    $cssPath = $("#ForgotPasswordEmailSentDiv > div:eq(1) > div");
                    test("#ForgotPasswordEmailSentDiv > div:eq(1) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-lg-6 col-md-4 col-sm-2", "class [col-lg-6 col-md-4 col-sm-2]");
                    });
                };
                this.TestFields = function () {
                    $("#qunit-tests").html("");
                    cssp.Test.FuncTextArr = [new CSSP.Test.FuncField("TestEmail", "Email", "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input"),
                        new CSSP.Test.FuncField("TestRangeLength", "Code", "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > div > input"),
                        new CSSP.Test.FuncField("TestRemote", "Code", "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(2) > div > input"),
                        new CSSP.Test.FuncField("TestMinLength", "Password", "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > div > input"),
                        new CSSP.Test.FuncField("TestMaxLength", "Password", "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(3) > div > input"),
                        new CSSP.Test.FuncField("TestEqualTo", "ConfirmPassword", "#ForgotPasswordEmailSentDiv > div:eq(1) > form > fieldset > div:eq(4) > div > input"),
                    ];
                    cssp.Test.RunFunc(0);
                };
                // **********************************************************
                // **********************************************************
                // **********************************************************
                this.TestSendFormLoop = function (i) {
                    if (i == 0) {
                        $("#qunit-tests").html("");
                        QUnit.module("ForgotPasswordEmailSent Send Form tests");
                        _this.ResetTestVariables();
                    }
                    _this.FillAndExecuteFormLoop(i);
                };
                // Function private
                // __________________________________________________________________________________
                // __________________________________________________________________________________
                // Function private
                this.CloseDialog = function (i) {
                    $("#DialogBasic").find(".close").click();
                    setTimeout(function () {
                        _this.DoNextItem(i);
                    }, 300);
                };
                this.DoNextItem = function (i) {
                    i++;
                    if (i < cssp.Test.ForgotPasswordEmailSent.EmailTestList.length) {
                        cssp.Test.ForgotPasswordEmailSent.TestSendFormLoop(i);
                    }
                    else {
                        test("Finished", function () {
                            equal(true, true);
                        });
                    }
                };
                this.FillAndExecuteFormLoop = function (i) {
                    var $Form = $("#ForgotPasswordJSONForm");
                    var $EmailInput = $Form.find("input[name='Email']").val(cssp.Test.ForgotPasswordEmailSent.EmailTestList[i]);
                    var $CodeInput = $Form.find("input[name='Code']").val(cssp.Test.ForgotPasswordEmailSent.CodeTestList[i]);
                    var $PasswordInput = $Form.find("input[name='Password']").val(cssp.Test.ForgotPasswordEmailSent.CodeTestList[i]);
                    var $ConfirmPasswordInput = $Form.find("input[name='ConfirmPassword']").val(cssp.Test.ForgotPasswordEmailSent.CodeTestList[i]);
                    $Form.find("button.jbForgotPasswordEmailSent").click();
                    setTimeout(function () {
                        test("ForgotPasswordEmailSent Send Form testing (" + i + ") [" + cssp.Test.ForgotPasswordEmailSent.CodeTestList[i] + ", "
                            + cssp.Test.ForgotPasswordEmailSent.PasswordTestList[i] + ", "
                            + cssp.Test.ForgotPasswordEmailSent.ConfirmPasswordTestList[i] + "]", function () {
                            equal($("#DialogBasic").hasClass("in"), (!cssp.Test.ForgotPasswordEmailSent.ForgotPasswordEmailSentTestOK[i]));
                        });
                        if (!cssp.Test.ForgotPasswordEmailSent.ForgotPasswordEmailSentTestOK[i]) {
                            _this.CloseDialog(i);
                        }
                        else {
                            // nothing for now
                        }
                    }, 500);
                };
                this.ResetTestVariables = function () {
                    cssp.Test.ForgotPasswordEmailSent.EmailTestList = [];
                    cssp.Test.ForgotPasswordEmailSent.CodeTestList = [];
                    cssp.Test.ForgotPasswordEmailSent.PasswordTestList = [];
                    cssp.Test.ForgotPasswordEmailSent.ConfirmPasswordTestList = [];
                    cssp.Test.ForgotPasswordEmailSent.ForgotPasswordEmailSentTestOK = [];
                    // index 0
                    cssp.Test.ForgotPasswordEmailSent.EmailTestList.push("charles.leblanc2@canada.ca");
                    cssp.Test.ForgotPasswordEmailSent.CodeTestList.push("12345678");
                    cssp.Test.ForgotPasswordEmailSent.CodeTestList.push("abcdef2!");
                    cssp.Test.ForgotPasswordEmailSent.CodeTestList.push("abcdef2!");
                    cssp.Test.ForgotPasswordEmailSent.ForgotPasswordEmailSentTestOK.push(false);
                };
            }
            return ForgotPasswordEmailSent;
        }());
        Test.ForgotPasswordEmailSent = ForgotPasswordEmailSent;
    })(Test = CSSP.Test || (CSSP.Test = {}));
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Test.ForgotPasswordEmailSent.js.map