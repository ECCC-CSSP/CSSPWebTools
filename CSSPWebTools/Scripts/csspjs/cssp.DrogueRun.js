var CSSP;
(function (CSSP) {
    var DrogueRun = (function () {
        // Variables
        // Constructor
        function DrogueRun() {
            // Function
            this.DrogueRunAskToDelete = function ($bjs) {
                var DrogueNumberText = $bjs.data("droguenumber");
                cssp.Dialog.ShowDialogAreYouSure(DrogueNumberText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.DrogueRun.SetDialogEvents", $bjs);
            };
            this.DrogueRunAddOrEditSave = function ($bjs) {
                var $form = $bjs.closest("form");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("form", "DrogueRunAdd");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    if (cssp.CheckInputWithNumbers()) {
                        cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                        return;
                    }
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
            this.DrogueRunShowAdd = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".DrogueRunTop").find(".DrogueRunAdd").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".DrogueRunTop").find(".DrogueRunAdd").removeClass("hidden").addClass("hidden");
                }
            };
            this.DrogueRunShowEdit = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".DrogueRunTop").find(".DrogueRunEdit").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".DrogueRunTop").find(".DrogueRunEdit").removeClass("hidden").addClass("hidden");
                }
            };
            this.SetDialogEvents = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var DrogueRunID = parseInt($bjs.data("droguerunid"));
                        var command = "DrogueRun/DroguerunDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            DrogueRunID: DrogueRunID,
                        }).done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.Helper.PageRefresh();
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
        }
        return DrogueRun;
    }());
    CSSP.DrogueRun = DrogueRun;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.DrogueRun.js.map