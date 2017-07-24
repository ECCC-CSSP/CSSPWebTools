module CSSP {
    export class Profile {
        // Variables
        public FormName: string = "#profileForm";

        // Constructors
        constructor() {

        }
        // Functions
        public CleanFNInitLNError: Function = (): void => {
            $("#profileForm :input[name='FirstName']").attr("class", "valid").next("label").remove();
            $("#profileForm :input[name='Initial']").attr("class", "valid").next("label").remove();
            $("#profileForm :input[name='LastName']").attr("class", "valid").next("label").remove();
        };
        public FNInitLNcsv: Function = (): any => {
                return ($("#profileForm :input[name='FirstName']").val() + "," +
                $("#profileForm :input[name='Initial']").val() + "," +
                $("#profileForm :input[name='LastName']").val())
            };
        public FormSubmit: Function = (): Function => {
            var $form: JQuery = $(cssp.Profile.FormName);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Profile.FormName, "ProfileDiv");
                return;
            }

            // We check if jQuery.validator exists on the form
            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            location.href = cssp.BaseURL;
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public Init: Function = (): void => {
            $(cssp.Profile.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            LoginEmail: {
                                required: true,
                                email: true,
                                maxlength: 255,
                                remote: {
                                    url: cssp.BaseURL + "Contact/CheckEmailUniquenessJSON",
                                    type: "post",
                                    data: {
                                        LoginEmail: () => {
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
                                        WebName: () => {
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
                                        FullName: (evt) => {
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
                                        FullName: () => {
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
                                        FullName: () => {
                                            cssp.Profile.CleanFNInitLNError();
                                            return cssp.Profile.FNInitLNcsv();
                                        }
                                    }
                                }
                            },
                        }
                    });
            });

            if (cssp.Test) {
                cssp.Test.ShowTestButtons();
            }
        };
    }
}