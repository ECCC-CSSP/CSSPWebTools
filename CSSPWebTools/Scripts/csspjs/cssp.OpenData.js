var CSSP;
(function (CSSP) {
    var OpenData = (function () {
        // Variables
        // Constructors
        function OpenData() {
            // Functions
            this.OpenDataReloadSubsector = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".OpenDataSubsectorDiv").find(".OpenDataMWQMSiteListDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var SubsectorTVItemID = parseInt($bjs.data("subsectortvitemid"));
                    var command_1 = "OpenData/_OpenDataSubsector";
                    $.get(cssp.BaseURL + command_1, {
                        SubsectorTVItemID: SubsectorTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".OpenDataSubsectorDiv").find(".OpenDataMWQMSiteListDiv").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command_1);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                    });
                }
                else {
                    $bjs.closest(".OpenDataSubsectorDiv").find(".OpenDataMWQMSiteListDiv").html("");
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.OpenDataReloadMWQMSite = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".OpenDataMWQMSiteDiv").find(".OpenDataMWQMSamplesDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var TVItemID = parseInt($bjs.data("tvitemid"));
                    var command_2 = "OpenData/_OpenDataMWQMSite";
                    $.get(cssp.BaseURL + command_2, {
                        TVItemID: TVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".OpenDataMWQMSiteDiv").find(".OpenDataMWQMSamplesDiv").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command_2);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_2);
                    });
                }
                else {
                    $bjs.closest(".OpenDataMWQMSiteDiv").find(".OpenDataMWQMSamplesDiv").html("");
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.OpenDataMarkAllRoutineSamplesAsValidated = function ($bjs) {
                var TVItemID = parseInt($bjs.data("tvitemid"));
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
                var command = "OpenData/MarkAllRoutineSamplesAsValidatedJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden");
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden").addClass("hidden");
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataMarkAllRoutineSamplesAsNotValidated = function ($bjs) {
                var TVItemID = parseInt($bjs.data("tvitemid"));
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
                var command = "OpenData/MarkAllRoutineSamplesAsNotValidatedJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden");
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden").addClass("hidden");
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataMarkAllRoutineSamplesAsIsSensitive = function ($bjs) {
                var TVItemID = parseInt($bjs.data("tvitemid"));
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
                var command = "OpenData/MarkAllRoutineSamplesAsIsSensitiveJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden");
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden").addClass("hidden");
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataMarkAllRoutineSamplesAsNotSensitive = function ($bjs) {
                var TVItemID = parseInt($bjs.data("tvitemid"));
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
                var command = "OpenData/MarkAllRoutineSamplesAsNotSensitiveJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden");
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden").addClass("hidden");
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataMarkSamplesWithMWQMSampleIDAsValidated = function ($bjs) {
                var MWQMSampleID = parseInt($bjs.data("mwqmsampleid"));
                var command = "OpenData/MarkSamplesWithMWQMSampleIDAsValidatedJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMSampleID: MWQMSampleID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataMarkSamplesWithMWQMSampleIDAsNotValidated = function ($bjs) {
                var MWQMSampleID = parseInt($bjs.data("mwqmsampleid"));
                var command = "OpenData/MarkSamplesWithMWQMSampleIDAsNotValidatedJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMSampleID: MWQMSampleID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataMarkSamplesWithMWQMSampleIDAsIsSensitive = function ($bjs) {
                var MWQMSampleID = parseInt($bjs.data("mwqmsampleid"));
                var command = "OpenData/MarkSamplesWithMWQMSampleIDAsIsSensitiveJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMSampleID: MWQMSampleID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataMarkSamplesWithMWQMSampleIDAsNotSensitive = function ($bjs) {
                var MWQMSampleID = parseInt($bjs.data("mwqmsampleid"));
                var command = "OpenData/MarkSamplesWithMWQMSampleIDAsNotSensitiveJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMSampleID: MWQMSampleID,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataStat = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.next("span.OpenDataStatSpan").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var TVItemID = parseInt($bjs.data("tvitemid"));
                    var command_3 = "OpenData/_OpenDataStat";
                    $.get(cssp.BaseURL + command_3, {
                        TVItemID: TVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.next("span.OpenDataStatSpan").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command_3);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_3);
                    });
                }
                else {
                    $bjs.next("span.OpenDataStatSpan").html("");
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
        }
        return OpenData;
    }());
    CSSP.OpenData = OpenData;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.OpenData.js.map