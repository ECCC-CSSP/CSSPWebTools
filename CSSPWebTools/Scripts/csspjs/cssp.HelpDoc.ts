declare var tinymce;

module CSSP {
    export class HelpDoc {
        // Variables

        // Constructor
        constructor() {
        }

        // Function
        public HelpDocHTMLTextModify: Function = (tinymce: any): void => {
            let content = tinymce.activeEditor.getContent();

            let $form: JQuery = $(tinymce.activeEditor.targetElm).closest("form");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("form", "HelpDocTop");
                return;
            }

            let DocKey: string = $form.find("input[name='DocKey']").val();
            let Language: string = $form.find("input[name='Language']").val();
            let DocHTMLText: string = content;
            let command: string = "HelpDoc/HelpDocSaveJSON";
            $.post(cssp.BaseURL + command,
                {
                    DocKey: DocKey,
                    Language: Language,
                    DocHTMLText: DocHTMLText
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public HelpDocShowEdit: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".HelpDocTop").find(".HelpDocEdit").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".HelpDocTop").find(".HelpDocEdit").removeClass("hidden").addClass("hidden");
            }
        };
        public HelpDocShowEN: Function = ($bjs): void => {
            $bjs.closest(".HelpDocTop").find(".jbHelpDocShowFR").removeClass("btn-success").addClass("btn-default");
            $bjs.closest(".HelpDocTop").find(".jbHelpDocShowEN").removeClass("btn-default").addClass("btn-success");
            $bjs.closest(".HelpDocTop").find(".HelpDocFR").removeClass("hidden").addClass("hidden");
            $bjs.closest(".HelpDocTop").find(".HelpDocEN").removeClass("hidden");
        };
        public HelpDocShowFR: Function = ($bjs): void => {
            $bjs.closest(".HelpDocTop").find(".jbHelpDocShowEN").removeClass("btn-success").addClass("btn-default");
            $bjs.closest(".HelpDocTop").find(".jbHelpDocShowFR").removeClass("btn-default").addClass("btn-success");
            $bjs.closest(".HelpDocTop").find(".HelpDocEN").removeClass("hidden").addClass("hidden");
            $bjs.closest(".HelpDocTop").find(".HelpDocFR").removeClass("hidden");
        };
        public HelpDocShowDialog: Function = ($bjs: JQuery): void => {
            let DocKey: string = $bjs.data("dockey");
            let Title: string = $bjs.data("title");
            let command: string = "HelpDoc/_HelpDocViewAndEdit";
            $.get(cssp.BaseURL + command,
                {
                    DocKey: DocKey,
                    Title: Title
                })
                .done((ret) => {
                    cssp.Dialog.ShowDialogHelp(Title, ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public TinymceInit: Function = (): void => {
            tinymce.init({
                selector: ".HelpDocHMTLTextArea",
                height: 200,
                menubar: true,
                plugins: "fullpage searchreplace autolink visualblocks visualchars fullscreen table charmap hr insertdatetime advlist lists textcolor contextmenu colorpicker textpattern help save",
                toolbar: "save undo redo | formatselect | bold italic strikethrough forecolor backcolor alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
                spellchecker_language: 'en',
                spellchecker_dialog: true,

                save_onsavecallback: function () {
                    cssp.HelpDoc.HelpDocHTMLTextModify(tinymce);
                }
            });
        };
   }
}