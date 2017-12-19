var CSSP;
(function (CSSP) {
    var Testing = /** @class */ (function () {
        // Constructor
        function Testing() {
            var _this = this;
            // Variables
            this.TestingFormName = "#TestingForm";
            this.Init = function () {
                $(cssp.Testing.TestingFormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            TTT: {
                                maxlength: 17,
                            },
                        }
                    });
                });
                $(cssp.Testing.TestingFormName).submit(function () {
                    _this.TestingFormSubmit();
                    return false;
                }).focus();
                if (cssp.Variables.VariableShow.charAt(CSSP.URLVarShowEnum.ShowTesting) == "1") {
                    $(".testing").removeClass("hidden");
                }
                else {
                    $(".testing").addClass("hidden");
                }
            };
            // Functions
            this.TestingFormSubmit = function () {
                var $form = $("#TestingForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Testing.TestingFormName, "TestingDiv");
                    return;
                }
                // We check if jQuery.validator exists on the form
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret == "Allo") {
                            cssp.Dialog.ShowDialogSuccess(ret.Error);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(function () {
                    });
                }
            };
        }
        return Testing;
    }());
    CSSP.Testing = Testing;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Testing.js.map