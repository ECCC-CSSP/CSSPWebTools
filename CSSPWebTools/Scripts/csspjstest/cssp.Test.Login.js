var CSSP;
(function (CSSP) {
    var Test;
    (function (Test) {
        var Login = /** @class */ (function () {
            // Constructors
            function Login() {
                var _this = this;
                // Variables
                this.TSName = "cssp.Login.ts";
                this.appName = "cssp.Login";
                // Functions
                // *****************************************************************
                // *****************************************************************
                // *****************************************************************
                this.TestContents = function () {
                    $("#qunit-tests").html("");
                    cssp.Test.RunCheckVariablesAndFunctions(_this.TSName, _this.appName, ["FormName", "Init", "FormSubmit", "LogOff", "CheckIfAdmin",]);
                    QUnit.module("#LoginDiv and children");
                    var $cssPath;
                    $cssPath = $("#LoginDiv");
                    test("#LoginDiv attributes", function () {
                        equal($cssPath.attr("id"), "LoginDiv", "id [LoginDiv]");
                        equal($cssPath.attr("class"), "container-fluid", "class [container-fluid]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(0)");
                    test("#LoginDiv > div:eq(0) attributes", function () {
                        equal($cssPath.attr("id"), "LoginVariables", "id [LoginVariables]");
                        equal($cssPath.attr("class"), "hidden", "class [hidden]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(0) > span");
                    test("#LoginDiv > div:eq(0) > span attributes", function () {
                        equal($cssPath.attr("class"), "varLoginUn", "class [varLoginUn]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1)");
                    test("#LoginDiv > div:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "row", "class [row]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form");
                    cssp.Test.TestForm.DoTest($cssPath, "#LoginDiv > div:eq(1) > form");
                    $cssPath = $("#LoginDiv > div:eq(1) > form > input");
                    test("#LoginDiv > div:eq(1) > form > input [__RequestVerificationToken] attributes", function () {
                        equal($cssPath.attr("name"), "__RequestVerificationToken", "name [__RequestVerificationToken]");
                        equal($cssPath.attr("type"), "hidden", "type [hidden]");
                        ok($("#LoginDiv > div:eq(1) > form > input").attr("value").length > 0, "value [does exist]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(0)");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) attributes", function () {
                        equal($cssPath.attr("class"), "form-group", "class [form-group]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > label");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > label attributes", function () {
                        equal($cssPath.attr("class"), "control-label col-sm-2", "class [control-label col-sm-2]");
                        equal($cssPath.attr("for"), "Email", "for [Email]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > div");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-sm-10", "class [col-sm-10]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input");
                    cssp.Test.TestInput.DoTest($cssPath, "#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input");
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > div > span");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > div > span attributes", function () {
                        equal($cssPath.attr("class"), "help-block", "class [help-block]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1)");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) attributes", function () {
                        equal($cssPath.attr("class"), "form-group", "class [form-group]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > label");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > label attributes", function () {
                        equal($cssPath.attr("class"), "control-label col-sm-2", "class [control-label col-sm-2]");
                        equal($cssPath.attr("for"), "Password", "for [Password]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-sm-10", "class [col-sm-10]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input:eq(0)");
                    cssp.Test.TestInput.DoTest($cssPath, "#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input:eq(0)");
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input:eq(1)");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input:eq(1) [ReturnURL] attributes", function () {
                        equal($cssPath.attr("name"), "ReturnURL", "name [ReturnURL]");
                        equal($cssPath.attr("type"), "hidden", "type [hidden]");
                        equal($cssPath.attr("value"), "", "value []");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input:eq(2)");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input:eq(2) [RememberMe] attributes", function () {
                        equal($cssPath.attr("name"), "RememberMe", "name [RememberMe]");
                        equal($cssPath.attr("type"), "hidden", "type [hidden]");
                        equal($cssPath.attr("value"), "true", "value [true]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > span");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > span attributes", function () {
                        equal($cssPath.attr("class"), "help-block", "class [help-block]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2)");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) attributes", function () {
                        equal($cssPath.attr("class"), "btn-block  col-sm-offset-2 col-sm-10", "class [btn-block  col-sm-offset-2 col-sm-10]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > button");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > button attributes", function () {
                        equal($cssPath.attr("class"), "jbLogin btn btn-primary", "class [jbLogin btn btn-primary]");
                        equal($cssPath.attr("type"), "submit", "type [submit]");
                        equal($cssPath.attr("tabindex"), "3", "tabindex [3]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > button > span");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > button > span attributes", function () {
                        equal($cssPath.attr("class"), "glyphicon glyphicon-log-in", "class [glyphicon glyphicon-log-in]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > a:eq(0)");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > a:eq(0) attributes", function () {
                        equal($cssPath.attr("href"), "#!ForgotPassword", "href [#!ForgotPassword]");
                        equal($cssPath.attr("class"), "btn btn-default", "class [btn btn-default]");
                        equal($cssPath.attr("role"), "button", "role [button]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > a:eq(0) > span");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > a:eq(0) > span attributes", function () {
                        equal($cssPath.attr("class"), "glyphicon glyphicon-question-sign", "class [glyphicon glyphicon-question-sign]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > a:eq(1)");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > a:eq(1) attributes", function () {
                        equal($cssPath.attr("href"), "#!Register", "href [#!Register]");
                        equal($cssPath.attr("class"), "btn btn-default", "class [btn btn-default]");
                        equal($cssPath.attr("role"), "button", "role [button]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > a:eq(1) > span");
                    test("#LoginDiv > div:eq(1) > form > fieldset > div:eq(2) > a:eq(1) > span attributes", function () {
                        equal($cssPath.attr("class"), "glyphicon glyphicon-asterisk", "class [glyphicon glyphicon-asterisk]");
                    });
                    $cssPath = $("#LoginDiv > div:eq(1) > div");
                    test("#LoginDiv > div:eq(1) > div attributes", function () {
                        equal($cssPath.attr("class"), "col-lg-6 col-md-4 col-sm-2", "class [col-lg-6 col-md-4 col-sm-2]");
                    });
                };
                this.TestFields = function () {
                    $("#qunit-tests").html("");
                    cssp.Test.FuncTextArr = [new CSSP.Test.FuncField("TestRequired", "Email", "#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input"),
                        new CSSP.Test.FuncField("TestEmail", "Email", "#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input"),
                        new CSSP.Test.FuncField("TestRemote", "Email", "#LoginDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input"),
                        new CSSP.Test.FuncField("TestRequired", "Password", "#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input:eq(0)"),
                        new CSSP.Test.FuncField("TestMinLength", "Password", "#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input:eq(0)"),
                        new CSSP.Test.FuncField("TestMaxLength", "Password", "#LoginDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input:eq(0)"),
                    ];
                    cssp.Test.RunFunc(0);
                };
                // *****************************************************************
                // *****************************************************************
                // *****************************************************************
                this.TestSendFormLoop = function (i) {
                    if (i == 0) {
                        $("#qunit-tests").html("");
                        QUnit.module("Login Send Form tests");
                        _this.ResetTestVariables();
                    }
                    _this.FillAndExecuteFormLoop(i);
                };
                this.CharlesLogin = function () {
                    var $Form = $("#LoginForm");
                    var $EmailInput = $Form.find("input[name=Email]").val("charles.leblanc2@canada.ca");
                    var $PasswordInput = $Form.find("input[name=Password]").val("abcde2!");
                    $Form.find("button.jbLogin").click();
                };
                this.TestUser1Login = function () {
                    var $Form = $("#LoginForm");
                    var $EmailInput = $Form.find("input[name=Email]").val("Test.User1@ec.gc.ca");
                    var $PasswordInput = $Form.find("input[name=Password]").val("abcde2!");
                    $Form.find("button.jbLogin").click();
                };
                this.TestUser2Login = function () {
                    var $Form = $("#LoginForm");
                    var $EmailInput = $Form.find("input[name=Email]").val("Test.User2@ec.gc.ca");
                    var $PasswordInput = $Form.find("input[name=Password]").val("abcde2!");
                    $Form.find("button.jbLogin").click();
                };
                // Functions private
                // ________________________________________________________________________________________
                // ________________________________________________________________________________________
                // Functions private
                this.ClickLogin = function (i) {
                    $("a[href='#!Login']").click();
                    setTimeout(function () {
                        _this.DoNextItem(i);
                    }, 500);
                };
                this.ClickLogoff = function (i) {
                    $("a.jaLogOff").click();
                    setTimeout(function () {
                        _this.ClickLogin(i);
                    }, 500);
                };
                this.CloseDialog = function (i) {
                    $("#DialogBasic").find(".close").click();
                    setTimeout(function () {
                        _this.ClickLogin(i);
                    }, 500);
                };
                this.DoNextItem = function (i) {
                    i++;
                    if (i < cssp.Test.Login.EmailTestList.length) {
                        cssp.Test.Login.TestSendFormLoop(i);
                    }
                    else {
                        test("Finished", function () {
                            equal(true, true);
                        });
                    }
                };
                this.DoLogoff = function (i) {
                    cssp.Login.LogOff();
                    setTimeout(function () {
                        _this.ClickLogoff(i);
                    }, 500);
                };
                this.FillAndExecuteFormLoop = function (i) {
                    var $Form = $("#LoginForm");
                    var $EmailInput = $Form.find("input[name=Email]").val(cssp.Test.Login.EmailTestList[i]);
                    var $PasswordInput = $Form.find("input[name=Password]").val(cssp.Test.Login.PasswordTestList[i]);
                    $Form.find("button.jbLogin").click();
                    setTimeout(function () {
                        test("Login Send Form testing (" + i + ") [" + cssp.Test.Login.EmailTestList[i] + "] [" + cssp.Test.Login.PasswordTestList[i] + "]", function () {
                            equal($("#DialogBasic").hasClass("in"), (!cssp.Test.Login.LoginTestOK[i]), "DialogBasic hasClass 'in' is [" + !cssp.Test.Login.LoginTestOK[i] + "]");
                        });
                        if (!cssp.Test.Login.LoginTestOK[i]) {
                            _this.CloseDialog(i);
                        }
                        else {
                            _this.DoLogoff(i);
                        }
                    }, 1000);
                };
                this.ResetTestVariables = function () {
                    cssp.Test.Login.EmailTestList = [];
                    cssp.Test.Login.PasswordTestList = [];
                    cssp.Test.Login.LoginTestOK = [];
                    // index 0
                    cssp.Test.Login.EmailTestList.push("charles.leblanc2@canada.ca");
                    cssp.Test.Login.PasswordTestList.push("abcde2!");
                    cssp.Test.Login.LoginTestOK.push(true);
                    // index 1
                    cssp.Test.Login.EmailTestList.push("charles.leblanc2@canada.ca");
                    cssp.Test.Login.PasswordTestList.push("NotWorkingabcde2!");
                    cssp.Test.Login.LoginTestOK.push(false);
                };
            }
            return Login;
        }());
        Test.Login = Login;
    })(Test = CSSP.Test || (CSSP.Test = {}));
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Test.Login.js.map