var CSSP;
(function (CSSP) {
    var ForgotPasswordEmailSent = (function () {
        // Constructors
        function ForgotPasswordEmailSent() {
            // Variables
            this.FormName = "#ForgotPasswordJSONForm";
            // Functions
            this.FormSubmit = function () {
                var $form = $(cssp.ForgotPasswordEmailSent.FormName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.ForgotPasswordEmailSent.FormName, "ForgotPasswordEmailSentDiv");
                    return;
                }
                // We check if jQuery.validator exists on the form
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            document.location.href = cssp.BaseURL + "#!Login";
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.Init = function () {
                $(cssp.ForgotPasswordEmailSent.FormName).each(function (ind, elem) {
                    $(elem).validate({
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
                                        CodeEmail: function () {
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
        return ForgotPasswordEmailSent;
    }());
    CSSP.ForgotPasswordEmailSent = ForgotPasswordEmailSent;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.ForgotPasswordEmailSent.js.map