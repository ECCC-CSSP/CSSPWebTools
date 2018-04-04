module CSSP {
    export class Login {
        // Variables
        private FormName: string = "#LoginForm";

        // Constructor
        constructor() {
        }

        // Functions
        public Init: Function = (): void => {
            $(cssp.Login.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            Email: {
                                required: true,
                                email: true,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckEmailExistJSON",
                                    type: "post",
                                    data: {
                                        Email: () => {
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

            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
        // Functions
        public FormSubmit: Function = (): void => {
            var $form: JQuery = $(cssp.Login.FormName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Login.FormName, "LoginDiv");
                return;
            }

            // We check if jQuery.validator exists on the form
            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret: LoginModel) => {
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
                    .fail(() => {
                        cssp.Variables.LoginEmail = "";
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        cssp.Login.CheckIfAdmin();
                    });
            }
        };
        public LogOff: Function = (): void => {
            var command: string = "Account/LogOffJSON";
            $.post(cssp.BaseURL + command)
                .done((ret) => {
                    location.href = cssp.BaseURL + "#!Home";
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                }).always(() => {
                    cssp.Variables.LoginEmail = "";
                    cssp.Login.CheckIfAdmin();
                });
        };
        public CheckIfAdmin: Function = (): void => {
            var command: string = "Account/IsAdminJSON";
            $.post(cssp.BaseURL + command)
                .done((ret: string) => {
                    cssp.Variables.IsAdmin = ret;
                    cssp.SetVisibility();
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
    }
}