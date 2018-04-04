
module CSSP {
    export class ForgotPasswordEmailSent {
        // Variables
        public FormName: string = "#ForgotPasswordJSONForm";

        // Constructors
        constructor() {
        }

        // Functions
        public FormSubmit: Function = (): void => {

            var $form: JQuery = $(cssp.ForgotPasswordEmailSent.FormName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.ForgotPasswordEmailSent.FormName, "ForgotPasswordEmailSentDiv");
                return;
            }

            // We check if jQuery.validator exists on the form
            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            document.location.href = cssp.BaseURL + "#!Login";
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public Init: Function = (): void => {
            $(cssp.ForgotPasswordEmailSent.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            Email: {
                                email: true,
                            },
                            Code: {
                                rangelength: [8, 8],
                                remote: {
                                    url: cssp.BaseURL + "Contact/" + "CheckCodeEmailExistJSON",
                                    type: "post",
                                    data: {
                                        CodeEmail: () => {
                                            return ($(cssp.ForgotPasswordEmailSent.FormName + " :input[name='Code']").val() + "," + $(".EmailSendTo").text());
                                        }
                                    }
                                }
                            },
                            Password: {
                                minlength: 6,
                                maxlength: 25,
                            },
                            ConfirmPassword: {
                                equalTo: "input[name='Password']",
                            }
                        }
                    });
            });

            //if (cssp.Test) {
            //    cssp.Test.ShowTestButtons();
            //}
        };
    }
}