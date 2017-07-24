
module CSSP {
    export class ForgotPassword {
        // Variables
        private FormName: string = "#TryToSendEmailJSON";

        // Constructors
        constructor() {
        }

        // Functions
        public FormSubmit: Function = (): void => {
            var $form: JQuery = $(cssp.ForgotPassword.FormName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.ForgotPassword.FormName, "ForgotPasswordDiv");
                return;
            }

            // We check if jQuery.validator exists on the form
            if (!$form.valid || $form.valid()) {
                var tempEmail = $form.find("input[name='Email']").val();
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret == "") {
                            var command2: string = "Account/_ForgotPasswordEmailSent";
                            $.get(cssp.BaseURL + command2)
                                .done((data) => {
                                    $("#level0-content").html(data);
                                    $("#ForgotPasswordJSONForm").find(".EmailSendTo").text(tempEmail);
                                    $("#ForgotPasswordJSONForm").find("input[name='Email']").val(tempEmail);
                                })
                                .fail(() => {
                                    cssp.Dialog.ShowDialogErrorWithFail(command2);
                                });
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public Init: Function = (): void => {
            $(cssp.ForgotPassword.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            Email: {
                                required: true,
                                email: true,
                                remote: {
                                    url: cssp.BaseURL + "Contact/" + "CheckEmailExistJSON",
                                    type: "post",
                                    data: {
                                        Email: () => {
                                            return $(cssp.ForgotPassword.FormName + " :input[name='Email']").val();
                                        }
                                    }
                                }
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