module CSSP {
    export class Tel {
        // Variables
        public FormName: string = ".TelEditForm";

        // Constructors
        constructor() {
        }
        // Functions
       
        public FormSubmitAddOrUpdate: Function = ($bjs): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Tel.FormName);
            $form.attr("action", "Tel/TelSaveJSON");
            cssp.Tel.FormSubmit($bjs);
        };
       
        public FormSubmitDelete: Function = ($bjs): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Tel.FormName);
            $form.attr("action", "Tel/TelDeleteJSON");
            cssp.Tel.FormSubmit($bjs);
        };
       
        public FormSubmit: Function = ($bjs): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Tel.FormName);
            var $ParentLi: JQuery = $bjs.closest("li.TelItemTop");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Tel.FormName, "contentTel");
                return;
            }

            var ContactTVItemID: string = $form.find("input[name='ContactTVItemID']").val();
            var TelNumber: string = $form.find("input[name='TelNumber']").val();

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
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
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        cssp.Login.CheckIfAdmin();
                    });
            }
        };
        public Init: Function = (): void => {
            $(cssp.Tel.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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
        public ReloadTelEditList: Function = (ContactTVItemID: number) => {
            var command: string = "Tel/_telEditList";
            $.get(cssp.BaseURL + command, {
                ContactTVItemID: ContactTVItemID,
            }).done((ret) => {
                    if (ret) {
                        $(".TelEditDiv").html(ret);
                        cssp.Tel.Init();
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
    }
} 