var CSSP;
(function (CSSP) {
    var Document = /** @class */ (function () {
        // Variables
        // Constructor
        function Document() {
            // Function
            this.FormSubmit = function ($bjs) {
                var $form = $bjs.closest("form.GenerateReport").eq(0);
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("form.GenerateReport", "GenerateReportTopDiv");
                    return;
                }
                var $GoogleEarthPath = $form.find("textarea[name='GoogleEarthPath']");
                if ($GoogleEarthPath) {
                    var TempVal = $GoogleEarthPath.val();
                    if (TempVal) {
                        TempVal = TempVal.replace(/</g, "!!!!!");
                        TempVal = TempVal.replace(/>/g, "@@@@@");
                        TempVal = TempVal.replace(/,/g, "%%%%%");
                        $GoogleEarthPath.val(TempVal);
                    }
                }
                if (!$form.valid || $form.valid()) {
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
                        .done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            cssp.Helper.PageRefresh();
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
        }
        return Document;
    }());
    CSSP.Document = Document;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Document.js.map