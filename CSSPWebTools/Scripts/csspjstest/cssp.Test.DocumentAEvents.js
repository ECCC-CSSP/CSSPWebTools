var CSSP;
(function (CSSP) {
    var Test;
    (function (Test) {
        var DocumentAEvents = /** @class */ (function () {
            // Variables
            // Constructor
            function DocumentAEvents() {
                // Functions
                this.Init = function () {
                    $(document).off("click", "a[class^='jt']");
                    $(document).on("click", "a[class^='jt']", function (evt) {
                        var $ajs = $(evt.target);
                        if (!$ajs.is("a")) {
                            $ajs = $ajs.closest("a");
                        }
                        switch ($ajs.attr("class").split(" ")[0]) {
                            case "jtGenerateHTMLTestCode":
                                {
                                    cssp.Test.GenerateHTMLTestCode();
                                }
                                break;
                            case "jtShowGenerateHTMLTestCodeDialog":
                                {
                                    $("#dropdownTestingID").removeClass("open");
                                    cssp.Test.ShowGenerateHTMLTestCodeDialog();
                                }
                                break;
                            case "jtTestDialogContents":
                                {
                                    cssp.Test.Dialog.TestContents();
                                }
                                break;
                            case "jtTestDialogFields":
                                {
                                    cssp.Test.Dialog.TestFields();
                                }
                                break;
                            case "jtTestForgotPasswordContents":
                                {
                                    cssp.Test.ForgotPassword.TestContents();
                                }
                                break;
                            case "jtTestForgotPasswordFields":
                                {
                                    cssp.Test.ForgotPassword.TestFields();
                                }
                                break;
                            case "jtTestForgotPasswordSendForm":
                                {
                                    cssp.Test.ForgotPassword.TestSendFormLoop(0);
                                }
                                break;
                            case "jtTestForgotPasswordSetupPart2":
                                {
                                    cssp.Test.ForgotPassword.TestForgotPasswordSetupPart2();
                                }
                                break;
                            case "jtTestForgotPasswordEmailSentContents":
                                {
                                    cssp.Test.ForgotPasswordEmailSent.TestContents();
                                }
                                break;
                            case "jtTestForgotPasswordEmailSentFields":
                                {
                                    cssp.Test.ForgotPasswordEmailSent.TestFields();
                                }
                                break;
                            case "jtTestForgotPasswordEmailSentSendForm":
                                {
                                    cssp.Test.ForgotPasswordEmailSent.TestSendFormLoop(0);
                                }
                                break;
                            case "jtTestHeaderContents":
                                {
                                    cssp.Test.Header.TestContents();
                                }
                                break;
                            case "jtTestHide":
                                {
                                    $("#dropdownTestingID").removeClass("open");
                                    cssp.Test.TestHide($ajs);
                                }
                                break;
                            case "jtTestLoginContents":
                                {
                                    cssp.Test.Login.TestContents();
                                }
                                break;
                            case "jtTestLoginFields":
                                {
                                    cssp.Test.Login.TestFields();
                                }
                                break;
                            case "jtTestLoginSendForm":
                                {
                                    cssp.Test.Login.TestSendFormLoop(0);
                                }
                                break;
                            case "jtTestLoginCharlesLogin":
                                {
                                    cssp.Test.Login.CharlesLogin();
                                }
                                break;
                            case "jtTestLoginTestUser1Login":
                                {
                                    cssp.Test.Login.TestUser1Login();
                                }
                                break;
                            case "jtTestLoginTestUser2Login":
                                {
                                    cssp.Test.Login.TestUser2Login();
                                }
                                break;
                            case "jtTestRegisterContents":
                                {
                                    cssp.Test.Register.TestContents();
                                }
                                break;
                            case "jtTestRegisterFields":
                                {
                                    cssp.Test.Register.TestFields();
                                }
                                break;
                            case "jtTestRegisterRandomUser":
                                {
                                    cssp.Test.Register.RandomUser();
                                }
                                break;
                            case "jtTestRegisterSendForm":
                                {
                                    cssp.Test.Register.TestSendFormLoop(0);
                                }
                                break;
                            case "jtTesting":
                                {
                                    $("#dropdownTestingID").removeClass("open");
                                    return true;
                                }
                            case "jtTestShow":
                                {
                                    $("#dropdownTestingID").removeClass("open");
                                    cssp.Test.TestShow($ajs);
                                }
                                break;
                            case "jtTestTestingContents":
                                {
                                    cssp.Test.Testing.TestContents();
                                }
                                break;
                            case "jtTestTestingFields":
                                {
                                    cssp.Test.Testing.TestFields();
                                }
                                break;
                            case "jtTestTestingSendForm":
                                {
                                    cssp.Test.Testing.TestSendFormLoop(0);
                                }
                                break;
                            default:
                                {
                                    cssp.Dialog.ShowDialogBasic(new CSSP.DialogModel(CSSP.DialogModelTypeEnum.Error, $ajs.attr("class").split(" ")[0], cssp.GetHTMLVariable("#TestVariables", "varNotImplemented") + " in cssp.Test.DocumentAEvents.ts"));
                                }
                                break;
                        }
                        return false;
                    });
                };
                this.Init();
            }
            return DocumentAEvents;
        }());
        Test.DocumentAEvents = DocumentAEvents;
    })(Test = CSSP.Test || (CSSP.Test = {}));
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Test.DocumentAEvents.js.map