var CSSP;
(function (CSSP) {
    var ReportType = (function () {
        // Variables
        // Constructor
        function ReportType() {
            // Function
            this.ReportTypeAddOrModify = function ($bjs) {
                var IsAdd = $bjs.data("addormodify") == "add" ? true : false;
                var $form = $bjs.closest("form.ReportTypeForm");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(".ReportTypeForm", "Form tag");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    var command_1 = $form.attr("action");
                    $.post(cssp.BaseURL + command_1, $form.serializeArray())
                        .done(function (ret) {
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
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                    });
                }
            };
            this.ReportTypeDelete = function ($bjs) {
                var ReportTypeID = parseInt($bjs.data("reporttypeid"));
                var command = "ReportType/ReportTypeDeleteJSON";
                $.post(cssp.BaseURL + command, { ReportTypeID: ReportTypeID })
                    .done(function (ret) {
                    if (ret.Error != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReportTypeEdit = function ($bjs) {
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
            this.ShowParametersOfFile = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    var ReportTypeID = parseInt($bjs.data("reporttypeid"));
                    var TVItemID = parseInt($bjs.data("tvitemid"));
                    var TVFileTVItemID = parseInt($bjs.data("tvfiletvitemid"));
                    var command_2 = "Document/_documentParameters";
                    $.get(cssp.BaseURL + command_2, {
                        ReportTypeID: ReportTypeID,
                        TVItemID: TVItemID,
                        TVFileTVItemID: TVFileTVItemID,
                    })
                        .done(function (ret) {
                        $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html(ret);
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_2);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".ReportFileTopDiv").find(".ReportFileParametersDiv").html("");
                }
            };
            this.ReportTypeRelaod = function ($bjs) {
                var TVType = parseInt($bjs.data("tvtype"));
                var TVItemID = parseInt($bjs.data("tvitemid"));
                if (!TVItemID) {
                    cssp.Helper.PageRefresh();
                    return;
                }
                var command = "ReportType/_reportTypeList";
                $.get(cssp.BaseURL + command, {
                    TVType: TVType,
                    TVItemID: TVItemID,
                })
                    .done(function (ret) {
                    $bjs.closest(".ReportTypeListTopDiv").html(ret);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
        }
        return ReportType;
    }());
    CSSP.ReportType = ReportType;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.ReportType.js.map