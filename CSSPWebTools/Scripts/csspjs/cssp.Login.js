var CSSP;
(function (CSSP) {
    var Login = /** @class */ (function () {
        // Constructor
        function Login() {
            // Variables
            this.FormName = "#LoginForm";
            // Functions
            this.Init = function () {
                $(cssp.Login.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            Email: {
                                required: true,
                                email: true,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckEmailExistJSON",
                                    type: "post",
                                    data: {
                                        Email: function () {
                                            return $("input[name='Email']").val();
                                        }
                                    }
                                }
                            },
                            Password: {
                                required: true,
                                minlength: 6,
                                maxlength: 100,
                            }
                        }
                    });
                });
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
            // Functions
            this.FormSubmit = function () {
                var $form = $(cssp.Login.FormName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Login.FormName, "LoginDiv");
                    return;
                }
                // We check if jQuery.validator exists on the form
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret.Error != "") {
                            cssp.Variables.LoginEmail = "";
                            cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LoginVariables", "varLoginFailed"), ret.Error);
                        }
                        else if (ret.Email) {
                            cssp.Variables.LoginEmail = ret.Email;
                            if (ret.ReturnURL != "") {
                                location.href = ret.ReturnURL;
                            }
                            else {
                                location.href = cssp.BaseURL + "#!Home";
                            }
                        }
                    })
                        .fail(function () {
                        cssp.Variables.LoginEmail = "";
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        cssp.Login.CheckIfAdmin();
                    });
                }
            };
            this.LogOff = function () {
                var command = "Account/LogOffJSON";
                $.post(cssp.BaseURL + command)
                    .done(function (ret) {
                    location.href = cssp.BaseURL + "#!Home";
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(function () {
                    cssp.Variables.LoginEmail = "";
                    cssp.Login.CheckIfAdmin();
                });
            };
            this.CheckIfAdmin = function () {
                var command = "Account/IsAdminJSON";
                $.post(cssp.BaseURL + command)
                    .done(function (ret) {
                    cssp.Variables.IsAdmin = ret;
                    cssp.SetVisibility();
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
        }
        return Login;
    }());
    CSSP.Login = Login;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Login.js.map