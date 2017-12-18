var CSSP;
(function (CSSP) {
    var Tel = /** @class */ (function () {
        // Constructors
        function Tel() {
            // Variables
            this.FormName = ".TelEditForm";
            // Functions
            this.FormSubmitAddOrUpdate = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Tel.FormName);
                $form.attr("action", "Tel/TelSaveJSON");
                cssp.Tel.FormSubmit($bjs);
            };
            this.FormSubmitDelete = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Tel.FormName);
                $form.attr("action", "Tel/TelDeleteJSON");
                cssp.Tel.FormSubmit($bjs);
            };
            this.FormSubmit = function ($bjs) {
                var $form = $bjs.closest("form" + cssp.Tel.FormName);
                var $ParentLi = $bjs.closest("li.TelItemTop");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Tel.FormName, "contentTel");
                    return;
                }
                var ContactTVItemID = $form.find("input[name='ContactTVItemID']").val();
                var TelNumber = $form.find("input[name='TelNumber']").val();
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            if (command == "Tel/TelDeleteJSON") {
                                $ParentLi.remove();
                            }
                            else {
                                cssp.Tel.ReloadTelEditList(ContactTVItemID);
                            }
                            cssp.Dialog.ShowDialogSuccess(TelNumber);
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
                $(cssp.Tel.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            TelType: {
                                min: 1,
                            },
                            TelNumber: {
                                required: true,
                                minlength: 7,
                                maxlength: 50,
                                TelCan: true,
                            },
                            messages: {
                                TelType: cssp.GetHTMLVariable("#LayoutVariables", "varPleaseSelectAnItem"),
                            },
                        }
                    });
                });
                if (cssp.Test) {
                    cssp.Test.ShowTestButtons();
                }
            };
            this.ReloadTelEditList = function (ContactTVItemID) {
                var command = "Tel/_telEditList";
                $.get(cssp.BaseURL + command, {
                    ContactTVItemID: ContactTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        $(".TelEditDiv").html(ret);
                        cssp.Tel.Init();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
        }
        return Tel;
    }());
    CSSP.Tel = Tel;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Tel.js.map