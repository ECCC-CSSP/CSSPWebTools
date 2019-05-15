var CSSP;
(function (CSSP) {
    var ForgotPassword = (function () {
        // Constructors
        function ForgotPassword() {
            // Variables
            this.FormName = "#TryToSendEmailJSON";
            // Functions
            this.FormSubmit = function () {
                var $form = $(cssp.ForgotPassword.FormName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.ForgotPassword.FormName, "ForgotPasswordDiv");
                    return;
                }
                // We check if jQuery.validator exists on the form
                if (!$form.valid || $form.valid()) {
                    var tempEmail = $form.find("input[name='Email']").val();
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret == "") {
                            var command2 = "Account/_ForgotPasswordEmailSent";
                            $.get(cssp.BaseURL + command2)
                                .done(function (data) {
                                $("#level0-content").html(data);
                                $("#ForgotPasswordJSONForm").find(".EmailSendTo").text(tempEmail);
                                $("#ForgotPasswordJSONForm").find("input[name='Email']").val(tempEmail);
                            })
                                .fail(function () {
                                cssp.Dialog.ShowDialogErrorWithFail(command2);
                            });
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.Init = function () {
                $(cssp.ForgotPassword.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            Email: {
                                required: true,
                                email: true,
                                remote: {
                                    url: cssp.BaseURL + "Contact/" + "CheckEmailExistJSON",
                                    type: "post",
                                    data: {
                                        Email: function () {
                                            return $(cssp.ForgotPassword.FormName + " :input[name='Email']").val();
                                        }
                                    }
                                }
                            }
                        }
                    });
                });
                //if (cssp.Test) {
                //    cssp.Test.ShowTestButtons();
                //}
            };
        }
        return ForgotPassword;
    }());
    CSSP.ForgotPassword = ForgotPassword;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.ForgotPassword.js.map