module CSSP {
    export class DrogueRun {
        // Variables

        // Constructor
        constructor() {
        }

        // Function
        public DrogueRunAskToDelete: Function = ($bjs: JQuery): void => {
            let DrogueNumberText: string = $bjs.data("droguenumber");
            cssp.Dialog.ShowDialogAreYouSure(DrogueNumberText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.DrogueRun.SetDialogEvents", $bjs);
        };
        public DrogueRunAddOrEditSave: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("form", "DrogueRunAdd");
                return;
            }

            if (!$form.valid || $form.valid()) {
                if (cssp.CheckInputWithNumbers()) {
                    cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                    return;
                }
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
        public DrogueRunShowAdd: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".DrogueRunTop").find(".DrogueRunAdd").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".DrogueRunTop").find(".DrogueRunAdd").removeClass("hidden").addClass("hidden");
            }
        };
        public DrogueRunShowEdit: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".DrogueRunTop").find(".DrogueRunEdit").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".DrogueRunTop").find(".DrogueRunEdit").removeClass("hidden").addClass("hidden");
            }
        };
        public SetDialogEvents: Function = ($bjs: JQuery) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    let DrogueRunID: number = parseInt($bjs.data("droguerunid"));
                    var command: string = "DrogueRun/DroguerunDeleteJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            DrogueRunID: DrogueRunID,
                        }).done((ret) => {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.Helper.PageRefresh();
                            }
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
   }
}