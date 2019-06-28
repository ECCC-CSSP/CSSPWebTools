var CSSP;
(function (CSSP) {
    var HelpDoc = (function () {
        // Variables
        // Constructor
        function HelpDoc() {
            // Function
            this.HelpDocHTMLTextModify = function (tinymce) {
                var content = tinymce.activeEditor.getContent();
                var $form = $(tinymce.activeEditor.targetElm).closest("form");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("form", "HelpDocTop");
                    return;
                }
                var DocKey = $form.find("input[name='DocKey']").val();
                var Language = $form.find("input[name='Language']").val();
                var DocHTMLText = content;
                var command = "HelpDoc/HelpDocSaveJSON";
                $.post(cssp.BaseURL + command, {
                    DocKey: DocKey,
                    Language: Language,
                    DocHTMLText: DocHTMLText
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.HelpDocShowEdit = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".HelpDocTop").find(".HelpDocEdit").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".HelpDocTop").find(".HelpDocEdit").removeClass("hidden").addClass("hidden");
                }
            };
            this.HelpDocShowEN = function ($bjs) {
                $bjs.closest(".HelpDocTop").find(".jbHelpDocShowFR").removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".HelpDocTop").find(".jbHelpDocShowEN").removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".HelpDocTop").find(".HelpDocFR").removeClass("hidden").addClass("hidden");
                $bjs.closest(".HelpDocTop").find(".HelpDocEN").removeClass("hidden");
            };
            this.HelpDocShowFR = function ($bjs) {
                $bjs.closest(".HelpDocTop").find(".jbHelpDocShowEN").removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".HelpDocTop").find(".jbHelpDocShowFR").removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".HelpDocTop").find(".HelpDocEN").removeClass("hidden").addClass("hidden");
                $bjs.closest(".HelpDocTop").find(".HelpDocFR").removeClass("hidden");
            };
            this.HelpDocShowDialog = function ($bjs) {
                var DocKey = $bjs.data("dockey");
                var Title = $bjs.data("title");
                var command = "HelpDoc/_HelpDocViewAndEdit";
                $.get(cssp.BaseURL + command, {
                    DocKey: DocKey,
                    Title: Title
                })
                    .done(function (ret) {
                    cssp.Dialog.ShowDialogHelp(Title, ret);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.TinymceInit = function () {
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
        return HelpDoc;
    }());
    CSSP.HelpDoc = HelpDoc;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.HelpDoc.js.map