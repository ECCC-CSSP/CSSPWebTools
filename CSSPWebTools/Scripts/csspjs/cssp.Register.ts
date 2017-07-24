
module CSSP {
    export class Register {
        // Variables
        public FormName = "#RegisterForm";

        // Constructors
        constructor() {
        }

        // Functions
        public CleanFNInitLNError: Function = (): void => {
            $(cssp.Register.FormName + " :input[name='FirstName']").next(".help-block").text("").parent("div").eq(0).removeClass("has-error");
            $(cssp.Register.FormName + " :input[name='Initial']").next(".help-block").text("").parent("div").eq(0).removeClass("has-error");
            $(cssp.Register.FormName + " :input[name='LastName']").next(".help-block").text("").parent("div").eq(0).removeClass("has-error");
        };
        public FNInitLNcsv: Function = (): any => {
                return ($(cssp.Register.FormName + " :input[name='FirstName']").val() + "," +
                $(cssp.Register.FormName + " :input[name='Initial']").val() + "," +
                $(cssp.Register.FormName + " :input[name='LastName']").val())
            };
        public FormSubmit: Function = (): void => {
            var $form: JQuery = $(cssp.Register.FormName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Register.FormName, "RegisterDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            cssp.Variables.LoginEmail = ret.LoginEmail;
                            cssp.Login.CheckIfAdmin();
                            location.href = cssp.BaseURL + "#!Home";
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public Init: Function = (): void => {
            $(cssp.Register.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            FirstName: {
                                required: true,
                                maxlength: 100,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckFullNameUniquenessJSON",
                                    type: "post",
                                    data: {
                                        FullName: (evt) => {
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
                                        FullName: () => {
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
                                        FullName: () => {
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
                                        WebName: () => {
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
                                        Email: () => {
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
}