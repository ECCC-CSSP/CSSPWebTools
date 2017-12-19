var CSSP;
(function (CSSP) {
    var Register = /** @class */ (function () {
        // Constructors
        function Register() {
            // Variables
            this.FormName = "#RegisterForm";
            // Functions
            this.CleanFNInitLNError = function () {
                $(cssp.Register.FormName + " :input[name='FirstName']").next(".help-block").text("").parent("div").eq(0).removeClass("has-error");
                $(cssp.Register.FormName + " :input[name='Initial']").next(".help-block").text("").parent("div").eq(0).removeClass("has-error");
                $(cssp.Register.FormName + " :input[name='LastName']").next(".help-block").text("").parent("div").eq(0).removeClass("has-error");
            };
            this.FNInitLNcsv = function () {
                return ($(cssp.Register.FormName + " :input[name='FirstName']").val() + "," +
                    $(cssp.Register.FormName + " :input[name='Initial']").val() + "," +
                    $(cssp.Register.FormName + " :input[name='LastName']").val());
            };
            this.FormSubmit = function () {
                var $form = $(cssp.Register.FormName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Register.FormName, "RegisterDiv");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            cssp.Variables.LoginEmail = ret.LoginEmail;
                            cssp.Login.CheckIfAdmin();
                            location.href = cssp.BaseURL + "#!Home";
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.Init = function () {
                $(cssp.Register.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            FirstName: {
                                required: true,
                                maxlength: 100,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckFullNameUniquenessJSON",
                                    type: "post",
                                    data: {
                                        FullName: function (evt) {
                                            cssp.Register.CleanFNInitLNError();
                                            return cssp.Register.FNInitLNcsv();
                                        }
                                    }
                                },
                            },
                            Initial: {
                                maxlength: 50,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckFullNameUniquenessJSON",
                                    type: "post",
                                    data: {
                                        FullName: function () {
                                            cssp.Register.CleanFNInitLNError();
                                            return cssp.Register.FNInitLNcsv();
                                        }
                                    }
                                },
                            },
                            LastName: {
                                required: true,
                                maxlength: 100,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckFullNameUniquenessJSON",
                                    type: "post",
                                    data: {
                                        FullName: function () {
                                            cssp.Register.CleanFNInitLNError();
                                            return cssp.Register.FNInitLNcsv();
                                        }
                                    }
                                },
                            },
                            WebName: {
                                minlength: 3,
                                maxlength: 25,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckWebNameUniquenessJSON",
                                    type: "post",
                                    data: {
                                        WebName: function () {
                                            return $(cssp.Register.FormName + " :input[name='WebName']").val();
                                        }
                                    }
                                },
                            },
                            LoginEmail: {
                                email: true,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckEmailUniquenessJSON",
                                    type: "post",
                                    data: {
                                        Email: function () {
                                            return $(cssp.Register.FormName + " :input[name='Email']").val();
                                        }
                                    }
                                },
                            },
                            Password: {
                                required: true,
                                minlength: 6,
                                maxlength: 25,
                            },
                            ConfirmPassword: {
                                equalTo: "#Password",
                            }
                        }
                    });
                });
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
        }
        return Register;
    }());
    CSSP.Register = Register;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Register.js.map