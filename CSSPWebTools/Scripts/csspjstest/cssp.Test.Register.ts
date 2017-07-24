module CSSP.Test {
    export class Register {
        // Variables
        public TSName: string = "cssp.Register.ts";
        public appName: string = "cssp.Register";
        public FirstNameTestList: Array<string>;
        public InitialTestList: Array<string>;
        public LastNameTestList: Array<string>;
        public WebNameTestList: Array<string>;
        public LoginEmailTestList: Array<string>;
        public PasswordTestList: Array<string>;
        public ConfirmPasswordTestList: Array<string>;
        public RegisterOK: Array<boolean>;

        // Constructor
        constructor() {
        }

        // Functions

        // **********************************************************
        // **********************************************************
        // **********************************************************



        public TestContents: Function = (): void => {

            $("#qunit-tests").html("");

            cssp.Test.RunCheckVariablesAndFunctions(this.TSName, this.appName, ["FormName", "CleanFNInitLNError", "FNInitLNcsv", "FormSubmit", "Init", ]);

            QUnit.module("#RegisterDiv and children");

            var $cssPath: JQuery;
            $cssPath = $("#RegisterDiv");
            test("#RegisterDiv attributes", () => {
                equal($cssPath.attr("id"), "RegisterDiv", "id [RegisterDiv]");
                equal($cssPath.attr("class"), "container-fluid", "class [container-fluid]");
            });
            $cssPath = $("#RegisterDiv > div:eq(0)");
            test("#RegisterDiv > div:eq(0) attributes", () => {
                equal($cssPath.attr("id"), "RegisterVariables", "id [RegisterVariables]");
                equal($cssPath.attr("class"), "hidden", "class [hidden]");
            });
            $cssPath = $("#RegisterDiv > div:eq(0) > span:eq(0)");
            test("#RegisterDiv > div:eq(0) > span:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "varError", "class [varError]");
            });
            $cssPath = $("#RegisterDiv > div:eq(0) > span:eq(1)");
            test("#RegisterDiv > div:eq(0) > span:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "varFormFail", "class [varFormFail]");
            });
            $cssPath = $("#RegisterDiv > div:eq(0) > span:eq(2)");
            test("#RegisterDiv > div:eq(0) > span:eq(2) attributes", () => {
                equal($cssPath.attr("class"), "varCouldNotFind_Within_", "class [varCouldNotFind_Within_]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1)");
            test("#RegisterDiv > div:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "row", "class [row]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form");
            cssp.Test.TestForm.DoTest($cssPath, "#RegisterDiv > div:eq(1) > form");
            $cssPath = $("#RegisterDiv > div:eq(1) > form > input");
            test("#RegisterDiv > div:eq(1) > form > input [__RequestVerificationToken] attributes", () => {
                equal($cssPath.attr("name"), "__RequestVerificationToken", "name [__RequestVerificationToken]");
                equal($cssPath.attr("type"), "hidden", "type [hidden]");
                ok($("#RegisterDiv > div:eq(1) > form > input").attr("value").length > 0, "value [does exist]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0)");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) attributes", () => {
                equal($cssPath.attr("class"), "form-group", "class [form-group]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > label");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > label attributes", () => {
                equal($cssPath.attr("class"), "control-label col-sm-3", "class [control-label col-sm-3]");
                equal($cssPath.attr("for"), "FirstName", "for [FirstName]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > div");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > div attributes", () => {
                equal($cssPath.attr("class"), "col-sm-9", "class [col-sm-9]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input");
            cssp.Test.TestInput.DoTest($cssPath, "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input");
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > div > span");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > div > span attributes", () => {
                equal($cssPath.attr("class"), "help-block", "class [help-block]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1)");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) attributes", () => {
                equal($cssPath.attr("class"), "form-group", "class [form-group]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > label");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > label attributes", () => {
                equal($cssPath.attr("class"), "control-label col-sm-3", "class [control-label col-sm-3]");
                equal($cssPath.attr("for"), "LastName", "for [LastName]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > div");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > div attributes", () => {
                equal($cssPath.attr("class"), "col-sm-9", "class [col-sm-9]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input");
            cssp.Test.TestInput.DoTest($cssPath, "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input");
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > div > span");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > div > span attributes", () => {
                equal($cssPath.attr("class"), "help-block", "class [help-block]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2)");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) attributes", () => {
                equal($cssPath.attr("class"), "form-group", "class [form-group]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > label");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > label attributes", () => {
                equal($cssPath.attr("class"), "control-label col-sm-3", "class [control-label col-sm-3]");
                equal($cssPath.attr("for"), "Initial", "for [Initial]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > div");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > div attributes", () => {
                equal($cssPath.attr("class"), "col-sm-9", "class [col-sm-9]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > div > input");
            cssp.Test.TestInput.DoTest($cssPath, "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > div > input");
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > div > span");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > div > span attributes", () => {
                equal($cssPath.attr("class"), "help-block", "class [help-block]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3)");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) attributes", () => {
                equal($cssPath.attr("class"), "form-group", "class [form-group]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > label");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > label attributes", () => {
                equal($cssPath.attr("class"), "control-label col-sm-3", "class [control-label col-sm-3]");
                equal($cssPath.attr("for"), "WebName", "for [WebName]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > div");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > div attributes", () => {
                equal($cssPath.attr("class"), "col-sm-9", "class [col-sm-9]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > div > input");
            cssp.Test.TestInput.DoTest($cssPath, "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > div > input");
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > div > span");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > div > span attributes", () => {
                equal($cssPath.attr("class"), "help-block", "class [help-block]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4)");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) attributes", () => {
                equal($cssPath.attr("class"), "form-group", "class [form-group]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > label");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > label attributes", () => {
                equal($cssPath.attr("class"), "control-label col-sm-3", "class [control-label col-sm-3]");
                equal($cssPath.attr("for"), "LoginEmail", "for [LoginEmail]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > div");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > div attributes", () => {
                equal($cssPath.attr("class"), "col-sm-9", "class [col-sm-9]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > div > input");
            cssp.Test.TestInput.DoTest($cssPath, "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > div > input");
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > div > span");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > div > span attributes", () => {
                equal($cssPath.attr("class"), "help-block", "class [help-block]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5)");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) attributes", () => {
                equal($cssPath.attr("class"), "form-group", "class [form-group]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > label");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > label attributes", () => {
                equal($cssPath.attr("class"), "control-label col-sm-3", "class [control-label col-sm-3]");
                equal($cssPath.attr("for"), "Password", "for [Password]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > div");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > div attributes", () => {
                equal($cssPath.attr("class"), "col-sm-9", "class [col-sm-9]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > div > input");
            cssp.Test.TestInput.DoTest($cssPath, "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > div > input");
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > div > span");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > div > span attributes", () => {
                equal($cssPath.attr("class"), "help-block", "class [help-block]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6)");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) attributes", () => {
                equal($cssPath.attr("class"), "form-group", "class [form-group]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) > label");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) > label attributes", () => {
                equal($cssPath.attr("class"), "control-label col-sm-3", "class [control-label col-sm-3]");
                equal($cssPath.attr("for"), "ConfirmPassword", "for [ConfirmPassword]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) > div");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) > div attributes", () => {
                equal($cssPath.attr("class"), "col-sm-9", "class [col-sm-9]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) > div > input");
            cssp.Test.TestInput.DoTest($cssPath, "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) > div > input");
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) > div > span");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) > div > span attributes", () => {
                equal($cssPath.attr("class"), "help-block", "class [help-block]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7)");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7) attributes", () => {
                equal($cssPath.attr("class"), "btn-block  col-sm-offset-3 col-sm-9", "class [btn-block  col-sm-offset-3 col-sm-9]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7) > button");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7) > button attributes", () => {
                equal($cssPath.attr("class"), "jbRegister btn btn-primary", "class [jbRegister btn btn-primary]");
                equal($cssPath.attr("type"), "submit", "type [submit]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7) > button > span");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7) > button > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-ok-sign", "class [glyphicon glyphicon-ok-sign]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7) > a");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7) > a attributes", () => {
                equal($cssPath.attr("href"), "#!Login", "href [#!Login]");
                equal($cssPath.attr("class"), "btn btn-default appJSLogin", "class [btn btn-default appJSLogin]");
                equal($cssPath.attr("role"), "button", "role [button]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7) > a > span");
            test("#RegisterDiv > div:eq(1) > form > fieldset > div:eq(7) > a > span attributes", () => {
                equal($cssPath.attr("class"), "glyphicon glyphicon-log-in", "class [glyphicon glyphicon-log-in]");
            });
            $cssPath = $("#RegisterDiv > div:eq(1) > div");
            test("#RegisterDiv > div:eq(1) > div attributes", () => {
                equal($cssPath.attr("class"), "col-lg-6 col-md-4 col-sm-2", "class [col-lg-6 col-md-4 col-sm-2]");
            });
        };
        public TestFields: Function = (): void => {

            $("#qunit-tests").html("");
            cssp.Test.FuncTextArr = [new CSSP.Test.FuncField("TestRequired", "FirstName", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input"),
                new CSSP.Test.FuncField("TestMaxLength", "FirstName", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input"),
                new CSSP.Test.FuncField("TestRemote", "FirstName", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(0) > div > input"),
                new CSSP.Test.FuncField("TestRequired", "LastName", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input"),
                new CSSP.Test.FuncField("TestMaxLength", "LastName", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input"),
                new CSSP.Test.FuncField("TestRemote", "LastName", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(1) > div > input"),
                new CSSP.Test.FuncField("TestMaxLength", "Initial", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > div > input"),
                new CSSP.Test.FuncField("TestRemote", "Initial", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(2) > div > input"),
                new CSSP.Test.FuncField("TestMinLength", "WebName", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > div > input"),
                new CSSP.Test.FuncField("TestMaxLength", "WebName", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > div > input"),
                new CSSP.Test.FuncField("TestRemote", "WebName", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(3) > div > input"),
                new CSSP.Test.FuncField("TestEmail", "LoginEmail", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > div > input"),
                new CSSP.Test.FuncField("TestRemote", "LoginEmail", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(4) > div > input"),
                new CSSP.Test.FuncField("TestRequired", "Password", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > div > input"),
                new CSSP.Test.FuncField("TestMinLength", "Password", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > div > input"),
                new CSSP.Test.FuncField("TestMaxLength", "Password", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(5) > div > input"),
                new CSSP.Test.FuncField("TestEqualTo", "ConfirmPassword", "#RegisterDiv > div:eq(1) > form > fieldset > div:eq(6) > div > input"),
            ];
            cssp.Test.RunFunc(0);
        };



        // **********************************************************
        // **********************************************************
        // **********************************************************


        public TestSendFormLoop: Function = (i: number): void => {
            if (i == 0) {
                $("#qunit-tests").html("");

                QUnit.module("Register Send Form tests");

                this.ResetTestVariables();
            }
            this.FillAndExecuteFormLoop(i);
        };

        public RandomUser: Function = (): void => {
            var $Form: JQuery = $("#RegisterForm");
            var $FirstName: JQuery = $Form.find("input[name='FirstName']");
            var $Initial: JQuery = $Form.find("input[name='Initial']");
            var $LastName: JQuery = $Form.find("input[name='LastName']");
            var $WebName: JQuery = $Form.find("input[name='WebName']");
            var $LoginEmail: JQuery = $Form.find("input[name='LoginEmail']");
            var $Password: JQuery = $Form.find("input[name='Password']");
            var $ConfirmPassword: JQuery = $Form.find("input[name='ConfirmPassword']");
            test("Register Send Form testing [NewUser]", () => {
                ok($FirstName.length == 1, "FirstName input exist");
                ok($Initial.length == 1, "Initial input exist");
                ok($LastName.length == 1, "LastName input exist");
                ok($WebName.length == 1, "WebName input exist");
                ok($LoginEmail.length == 1, "Email input exist");
                ok($Password.length == 1, "Password input exist");
                ok($ConfirmPassword.length == 1, "ConfirmPassword input exist");
            });
            $FirstName.val("AA" + cssp.Test.RandomString(5) + "Charles");
            $Initial.val("AA" + cssp.Test.RandomString(5));
            $LastName.val("AA" + cssp.Test.RandomString(5) + "LeBlanc");
            $WebName.val("AA" + cssp.Test.RandomString(5) + "WebName");
            $LoginEmail.val("AA" + cssp.Test.RandomString(5) + "charles.leblanc2@canada.ca");
            $Password.val("AA" + cssp.Test.RandomString(5) + "2!");
            $ConfirmPassword.val($Password.val());
            $Form.find("button.jbRegister").click();
        };

        // Function private
        // __________________________________________________________________________________
        // __________________________________________________________________________________
        // Function private


        private ClickLogin: Function = (i: number, LoginEmail: string): void => {
            $("a[href='#!Login']").click();
            setTimeout(() => {
                cssp.Test.Register.DoLoginAdmin(i, LoginEmail);
            }, 200);
        };
        private ClickLogin2: Function = (i: number, LoginEmail: string): void => {
            $("a[href='#!Login']").click();
            setTimeout(() => {
                cssp.Test.Register.ClickRegister(i, LoginEmail);
            }, 200);
        };
        private ClickLogoff: Function = (i: number, LoginEmail: string): void => {
            $("a.jaLogOff").click();
            setTimeout(() => {
                cssp.Test.Register.ClickLogin(i, LoginEmail);
            }, 200);
        };
        private ClickLogoff2: Function = (i: number, LoginEmail: string): void => {
            $("a.jaLogOff").click();
            setTimeout(() => {
                cssp.Test.Register.ClickLogin2(i, LoginEmail);
            }, 200);
        };
        private ClickRegister: Function = (i: number, LoginEmail: string): void => {
            $("a[href='#!Register']").click();
            setTimeout(() => {
                cssp.Test.Register.DoNextItem(i);
            }, 200);
        };
        private CloseDialog: Function = (): void => {
            $("#DialogBasic").find(".close").click();
        };
        private DoLoginAdmin: Function = (i: number, LoginEmail: string): void => {
            var $Form: JQuery = $("#LoginForm");
            var $EmailInput: JQuery = $Form.find("input[name=Email]").val("charles.leblanc2@canada.ca");
            var $PasswordInput: JQuery = $Form.find("input[name=Password]").val("abcde2!");
            $Form.find("button.jbLogin").click();
            setTimeout(() => {
                cssp.Test.Register.DoRemoveUser(i, LoginEmail);
            }, 500);
        };
        private DoLogoff: Function = (i: number, LoginEmail: string): void => {
            cssp.Login.LogOff();
            setTimeout(() => {
                cssp.Test.Register.ClickLogoff(i, LoginEmail);
            }, 200);
        };
        private DoLogoffAdmin: Function = (i: number, LoginEmail: string): void => {
            cssp.Login.LogOff();
            setTimeout(() => {
                cssp.Test.Register.ClickLogoff2(i, LoginEmail);
            }, 200);
        };
        private DoNextItem: Function = (i: number): void => {
            i++;
            if (i < cssp.Test.Register.FirstNameTestList.length) {
                cssp.Test.Register.TestSendFormLoop(i);
            }
            else {
                test("Finished", () => {
                    equal(true, true);
                });
            }
        };
        private DoRemoveUser: Function = (i: number, LoginEmail: string): void => {
            
            $.post(cssp.BaseURL + "Admin/RemoveUserJSON", { LoginEmail: LoginEmail })
                .done((ret) => {
                    if (ret.Error != "") {
                        cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Error, "While trying to remove user [" + LoginEmail + "]", ret.Error));
                    }
                    else {
                        cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Success, "Removing user", "User [" + LoginEmail + "] removed successfully"));
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Error, "Form fail ", cssp.BaseURL + "Admin/RemoveUserJSON"));
                }).always(() => {
                    // nothing
                });
            setTimeout(() => {
                if ($("#DialogBasic").hasClass("in")) {
                    cssp.Test.Register.CloseDialog();
                }
                else if ($("#DialogBasic").hasClass("in")) {
                    cssp.Test.Register.CloseDialog();
                }
                else {
                    // nothing
                }
                cssp.Test.Register.DoLogoffAdmin(i, LoginEmail);
            }, 1000);
        };
        private FillAndExecuteFormLoop: Function = (i: number): void => {
            var $Form: JQuery = $("#RegisterForm");
            var $FirstName: JQuery = $Form.find("input[name='FirstName']");
            var $Initial: JQuery = $Form.find("input[name='Initial']");
            var $LastName: JQuery = $Form.find("input[name='LastName']");
            var $WebName: JQuery = $Form.find("input[name='WebName']");
            var $LoginEmail: JQuery = $Form.find("input[name='LoginEmail']");
            var $Password: JQuery = $Form.find("input[name='Password']");
            var $ConfirmPassword: JQuery = $Form.find("input[name='ConfirmPassword']");
            test("Register Send Form testing [NewUser]", () => {
                ok($FirstName.length == 1, "FirstName input exist");
                ok($Initial.length == 1, "Initial input exist");
                ok($LastName.length == 1, "LastName input exist");
                ok($WebName.length == 1, "WebName input exist");
                ok($LoginEmail.length == 1, "Email input exist");
                ok($Password.length == 1, "Password input exist");
                ok($ConfirmPassword.length == 1, "ConfirmPassword input exist");
            });
            $FirstName.val(cssp.Test.Register.FirstNameTestList[i]);
            $Initial.val(cssp.Test.Register.InitialTestList[i]);
            $LastName.val(cssp.Test.Register.LastNameTestList[i]);
            $WebName.val(cssp.Test.Register.WebNameTestList[i]);
            $LoginEmail.val(cssp.Test.Register.LoginEmailTestList[i]);
            $Password.val(cssp.Test.Register.PasswordTestList[i]);
            $ConfirmPassword.val(cssp.Test.Register.ConfirmPasswordTestList[i]);
            $Form.find("button.jbRegister").click();
            setTimeout(() => {
                if (cssp.Test.Register.RegisterOK[i]) {
                    test("Register Send Form testing [Good]", () => {
                        equal(document.location.hash, "#!Home", "document.location.hash == '#!Home'");
                    });
                    cssp.Test.Register.DoLogoff(i, $LoginEmail.val());
                }
                else {
                    test("Register Send Form testing [Not Good]", () => {
                        ok(false, "Should close Error Dialog Box");
                    });
                    cssp.Test.Register.DoNextItem(i);
                }
            }, 1000);
        };
        private ResetTestVariables: Function = (): void => {
            cssp.Test.Register.FirstNameTestList = [];
            cssp.Test.Register.InitialTestList = [];
            cssp.Test.Register.LastNameTestList = [];
            cssp.Test.Register.WebNameTestList = [];
            cssp.Test.Register.LoginEmailTestList = [];
            cssp.Test.Register.PasswordTestList = [];
            cssp.Test.Register.ConfirmPasswordTestList = [];
            cssp.Test.Register.RegisterOK = [];

            // index 0
            cssp.Test.Register.FirstNameTestList.push("U" + cssp.Test.RandomString(5) + "Charles");
            cssp.Test.Register.InitialTestList.push("G");
            cssp.Test.Register.LastNameTestList.push("U" + cssp.Test.RandomString(5) + "LeBlanc");
            cssp.Test.Register.WebNameTestList.push("U" + cssp.Test.RandomString(5) + "Charles");
            cssp.Test.Register.LoginEmailTestList.push("U" + cssp.Test.RandomString(5) + "charles.leblanc2@canada.ca");
            cssp.Test.Register.PasswordTestList.push("abcde2!");
            cssp.Test.Register.ConfirmPasswordTestList.push("abcde2!");
            cssp.Test.Register.RegisterOK.push(true);
        };
    }
}   