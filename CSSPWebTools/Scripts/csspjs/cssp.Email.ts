module CSSP {
    export class Email {
        // Variables
        public FormName: string = ".EmailEditForm";

        // Constructors
        constructor() {
        }
        // Functions
        public FormSubmitAddOrUpdate: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Email.FormName);
            $form.attr("action", "Email/EmailSaveJSON");
            cssp.Email.FormSubmit($bjs);
        };
        public FormSubmitDelete: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Email.FormName);
            $form.attr("action", "Email/EmailDeleteJSON");
            cssp.Email.FormSubmit($bjs);
        };
        public FormSubmit: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form" + cssp.Email.FormName);
            var $ParentLi: JQuery = $bjs.closest("li.EmailItemTop");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.Email.FormName, "contentEmail");
                return;
            }

            var ContactTVItemID: string = $form.find("input[name='ContactTVItemID']").val();
            var EmailAddress: string = $form.find("input[name='EmailAddress']").val();

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
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
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    }).always(() => {
                        cssp.Login.CheckIfAdmin();
                    });
            }
        };
        public Init: Function = (): void => {
            $(cssp.Email.FormName).each((ind: number, elem: Element) => {
                $(elem).validate(
                    {
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
        public ReloadEmailEditList: Function = (ContactTVItemID: number) => {
            var command: string = "Email/_emailEditList";
            $.get(cssp.BaseURL + command, {
                ContactTVItemID: ContactTVItemID,
            }).done((ret) => {
                    if (ret) {
                        $(".EmailEditDiv").html(ret);
                        cssp.Email.Init();
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