var CSSP;
(function (CSSP) {
    var Profile = /** @class */ (function () {
        // Constructors
        function Profile() {
            // Variables
            this.FormName = "#profileForm";
            // Functions
            this.CleanFNInitLNError = function () {
                $("#profileForm :input[name='FirstName']").attr("class", "valid").next("label").remove();
                $("#profileForm :input[name='Initial']").attr("class", "valid").next("label").remove();
                $("#profileForm :input[name='LastName']").attr("class", "valid").next("label").remove();
            };
            this.FNInitLNcsv = function () {
                return ($("#profileForm :input[name='FirstName']").val() + "," +
                    $("#profileForm :input[name='Initial']").val() + "," +
                    $("#profileForm :input[name='LastName']").val());
            };
            this.FormSubmit = function () {
                var $form = $(cssp.Profile.FormName);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Profile.FormName, "ProfileDiv");
                    return;
                }
                // We check if jQuery.validator exists on the form
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            location.href = cssp.BaseURL;
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.Init = function () {
                $(cssp.Profile.FormName).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            LoginEmail: {
                                required: true,
                                email: true,
                                maxlength: 255,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckEmailUniquenessJSON",
                                    type: "post",
                                    data: {
                                        LoginEmail: function () {
                                            return $(cssp.Profile.FormName + " :input[name='LoginEmail']").val();
                                        }
                                    }
                                }
                            },
                            WebName: {
                                required: true,
                                maxlength: 255,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckWebNameUniquenessJSON",
                                    type: "post",
                                    data: {
                                        WebName: function () {
                                            return $(cssp.Profile.FormName + " :input[name='WebName']").val();
                                        }
                                    }
                                }
                            },
                            FirstName: {
                                required: true,
                                maxlength: 100,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckFullNameUniquenessJSON",
                                    type: "post",
                                    data: {
                                        FullName: function (evt) {
                                            cssp.Profile.CleanFNInitLNError();
                                            return cssp.Profile.FNInitLNcsv();
                                        }
                                    }
                                }
                            },
                            Initial: {
                                maxlength: 50,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckFullNameUniquenessJSON",
                                    type: "post",
                                    data: {
                                        FullName: function () {
                                            cssp.Profile.CleanFNInitLNError();
                                            return cssp.Profile.FNInitLNcsv();
                                        }
                                    }
                                }
                            },
                            LastName: {
                                required: true,
                                maxlength: 100,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckFullNameUniquenessJSON",
                                    type: "post",
                                    data: {
                                        FullName: function () {
                                            cssp.Profile.CleanFNInitLNError();
                                            return cssp.Profile.FNInitLNcsv();
                                        }
                                    }
                                }
                            },
                        }
                    });
                });
                //if (cssp.Test) {
                //    cssp.Test.ShowTestButtons();
                //}
            };
        }
        return Profile;
    }());
    CSSP.Profile = Profile;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Profile.js.map