module CSSP {
    export class Testing {
        // Variables
        public TestingFormName: string = "#TestingForm";

        // Constructor
        constructor() {
        }
        public Init: Function = (): void => {
            $(cssp.Testing.TestingFormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
                        rules: {
                            TTT: {
                                maxlength: 17,
                            },
                        }
                    });
            });

            $(cssp.Testing.TestingFormName).submit(() => {
                this.TestingFormSubmit();
                return false;
            }).focus();

            if (cssp.Variables.VariableShow.charAt(URLVarShowEnum.ShowTesting) == "1") {
                $(".testing").removeClass("hidden");
            }
            else {
                $(".testing").addClass("hidden");
            }
        };
        // Functions
        public TestingFormSubmit: Function = (): void => {
            var $form: JQuery = $("#TestingForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Testing.TestingFormName, "TestingDiv");
                return;
            }

            // We check if jQuery.validator exists on the form
            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret == "Allo") {
                            cssp.Dialog.ShowDialogSuccess(ret.Error);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                    });
            }
        };
    }
}