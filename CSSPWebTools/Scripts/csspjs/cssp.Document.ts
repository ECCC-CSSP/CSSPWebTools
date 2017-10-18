module CSSP {
    export class Document {
        // Variables

        // Constructor
        constructor() {
        }

        // Function
        public FormSubmit: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form.GenerateReport").eq(0);
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("form.GenerateReport", "GenerateReportTopDiv");
                return;
            }

            if (!$form.valid || $form.valid()) {
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.Helper.PageRefresh();
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };

    }
}
