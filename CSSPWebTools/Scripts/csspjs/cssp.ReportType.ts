module CSSP {
    export class ReportType {
        // Variables

        // Constructor
        constructor() {
        }

        // Function
        public ReportTypeAddOrModify: Function = ($bjs: JQuery): void => {
            let IsAdd: boolean = $bjs.data("addormodify") == "add" ? true : false;
            let $form: JQuery = $bjs.closest("form.ReportTypeForm");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".ReportTypeForm", "Form tag");
                return;
            }

            if (!$form.valid || $form.valid()) {
                let command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                        }
                        else {
                            if (IsAdd) {
                                cssp.Helper.PageRefresh();
                                cssp.Dialog.ShowDialogSuccess("Added successfully");
                            }
                            else {
                                cssp.Dialog.ShowDialogSuccess("Modified successfully");
                                cssp.ReportType.ReportTypeRelaod($bjs);
                            }
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public ReportTypeDelete: Function = ($bjs: JQuery): void => {
            let ReportTypeID: number = parseInt($bjs.data("reporttypeid"));

            let command: string = "ReportType/ReportTypeDeleteJSON";
            $.post(cssp.BaseURL + command, { ReportTypeID: ReportTypeID })
                .done((ret) => {
                    if (ret.Error != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public ReportTypeEdit: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".ReportTypeItemTop").find(".ReportTypeEdit").removeClass("hidden");
                $bjs.closest(".ReportTypeItemTop").find(".ParametersTop").removeClass("hidden").addClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".ReportTypeItemTop").find(".ReportTypeEdit").removeClass("hidden").addClass("hidden");
                $bjs.closest(".ReportTypeItemTop").find(".ParametersTop").removeClass("hidden");
            }
        };
        public ShowParametersOfFile: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                let ReportTypeID: number = parseInt($bjs.data("reporttypeid"));
                let TVItemID: number = parseInt($bjs.data("tvitemid"));
                let TVFileTVItemID: number = parseInt($bjs.data("tvfiletvitemid"));
                let command: string = "Document/_documentParameters";
                $.get(cssp.BaseURL + command,
                    {
                        ReportTypeID: ReportTypeID,
                        TVItemID: TVItemID,
                        TVFileTVItemID: TVFileTVItemID,
                    })
                    .done((ret) => {
                        $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html(ret);
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html("");
            }
        };
        public ReportTypeRelaod: Function = ($bjs: JQuery): void => {
            let TVType: number = parseInt($bjs.data("tvtype"));
            let TVItemID: number = parseInt($bjs.data("tvitemid"));

            if (!TVItemID) {
                cssp.Helper.PageRefresh();
                return;
            }

            let command: string = "ReportType/_reportTypeList";
            $.get(cssp.BaseURL + command,
                {
                    TVType: TVType,
                    TVItemID: TVItemID,
                })
                .done((ret) => {
                    $bjs.closest(".ReportTypeListTopDiv").html(ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
    }
}