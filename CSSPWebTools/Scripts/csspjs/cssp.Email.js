var CSSP;
(function (CSSP) {
    var Email = /** @class */ (function () {
        // Constructors
        function Email() {
            // Variables
            this.FormName = ".EmailEditForm";
            // Functions
            this.FormSubmitAddOrUpdate = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Email.FormName);
                $form.attr("action", "Email/EmailSaveJSON");
                cssp.Email.FormSubmit($bjs);
            };
            this.FormSubmitDelete = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Email.FormName);
                $form.attr("action", "Email/EmailDeleteJSON");
                cssp.Email.FormSubmit($bjs);
            };
            this.FormSubmit = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Email.FormName);
                var $ParentLi = $bjs.closest("li.EmailItemTop");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Email.FormName, "contentEmail");
                    return;
                }
                var ContactTVItemID = $form.find("input[name='ContactTVItemID']").val();
                var EmailAddress = $form.find("input[name='EmailAddress']").val();
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            if (command == "Email/EmailDeleteJSON") {
                                $ParentLi.remove();
                            }
                            else {
                                cssp.Email.ReloadEmailEditList(ContactTVItemID);
                            }
                            cssp.Dialog.ShowDialogSuccess(EmailAddress);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                        cssp.Login.CheckIfAdmin();
                    });
                }
            };
            this.Init = function () {
                $(cssp.Email.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            EmailType: {
                                min: 1,
                            },
                            EmailAddress: {
                                required: true,
                                maxlength: 150,
                                email: true,
                            },
                            messages: {
                                EmailType: cssp.GetHTMLVariable("#LayoutVariables", "varPleaseSelectAnItem"),
                            },
                        }
                    });
                });
                //if (cssp.Test) {
                //    cssp.Test.ShowTestButtons();
                //}
            };
            this.ReloadEmailEditList = function (ContactTVItemID) {
                var command = "Email/_emailEditList";
                $.get(cssp.BaseURL + command, {
                    ContactTVItemID: ContactTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        $(".EmailEditDiv").html(ret);
                        cssp.Email.Init();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
        }
        return Email;
    }());
    CSSP.Email = Email;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Email.js.map