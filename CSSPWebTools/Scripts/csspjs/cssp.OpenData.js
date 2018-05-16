var CSSP;
(function (CSSP) {
    var OpenData = (function () {
        // Variables
        // Constructors
        function OpenData() {
            // Functions
            this.OpenDataInit = function () {
                $('a[data-toggle="tab"]').off('shown.bs.tab');
                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    if ($(e.target).data("setup") == "y") {
                        $(e.target).closest(".OpenDataTopDiv").find(".OpenDataProvinceDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                        var ProvinceTVItemID = parseInt($(e.target).data("provincetvitemid"));
                        var command_1 = "OpenData/_OpenDataProvince";
                        $.get(cssp.BaseURL + command_1, {
                            ProvinceTVItemID: ProvinceTVItemID,
                        }).done(function (ret) {
                            if (ret) {
                                $(e.target).closest(".OpenDataTopDiv").find(".OpenDataProvinceDiv").html(ret);
                            }
                            else {
                                cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command_1);
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command_1);
                        });
                    }
                });
                $(document).off("change", "select[name='OpenDataStartYear'], select[name='OpenDataStartMonth']");
                $(document).on("change", "select[name='OpenDataStartYear'], select[name='OpenDataStartMonth']", function (evt) {
                    var Year = parseInt($("select[name='OpenDataStartYear']").val());
                    var Month = parseInt($("select[name='OpenDataStartMonth']").val());
                    var daysInMonth = new Date(Year, Month, 0).getDate();
                    $("select[name='OpenDataStartDay']").html("");
                    var optHTMLArr = [];
                    for (var i = 1; i < daysInMonth + 1; i++) {
                        optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                    }
                    $("select[name='OpenDataStartDay']").html(optHTMLArr.join(""));
                });
                $(document).off("change", "select[name='OpenDataEndYear'], select[name='OpenDataEndMonth']");
                $(document).on("change", "select[name='OpenDataEndYear'], select[name='OpenDataEndMonth']", function (evt) {
                    var Year = parseInt($("select[name='OpenDataEndYear']").val());
                    var Month = parseInt($("select[name='OpenDataEndMonth']").val());
                    var daysInMonth = new Date(Year, Month, 0).getDate();
                    $("select[name='OpenDataEndDay']").html("");
                    var optHTMLArr = [];
                    for (var i = 1; i < daysInMonth + 1; i++) {
                        optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                    }
                    $("select[name='OpenDataEndDay']").html(optHTMLArr.join(""));
                });
            };
            this.OpenDataGenerateCSVDocumentOfMWQMSites = function ($bjs) {
                //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
                var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                var command = "OpenData/GenerateCSVDocumentOfMWQMSitesJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataGenerateKMZDocumentOfMWQMSites = function ($bjs) {
                //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
                var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                var command = "OpenData/GenerateKMZDocumentOfMWQMSitesJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataGenerateCSVDocumentOfMWQMSamples = function ($bjs) {
                //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
                var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                var command = "OpenData/GenerateCSVDocumentOfMWQMSamplesJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataGenerateXlsxDocumentOfMWQMSitesAndSamples = function ($bjs) {
                //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
                var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                var command = "OpenData/GenerateXlsxDocumentOfMWQMSitesAndSamplesJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.OpenDataReloadSubsector = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".OpenDataSubsectorDiv").find(".OpenDataMWQMSiteListDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var SubsectorTVItemID = parseInt($bjs.data("subsectortvitemid"));
                    var command_2 = "OpenData/_OpenDataSubsector";
                    $.get(cssp.BaseURL + command_2, {
                        SubsectorTVItemID: SubsectorTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".OpenDataSubsectorDiv").find(".OpenDataMWQMSiteListDiv").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command_2);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_2);
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
                    var command_3 = "OpenData/_OpenDataMWQMSite";
                    $.get(cssp.BaseURL + command_3, {
                        TVItemID: TVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.closest(".OpenDataMWQMSiteDiv").find(".OpenDataMWQMSamplesDiv").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command_3);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_3);
                    });
                }
                else {
                    $bjs.closest(".OpenDataMWQMSiteDiv").find(".OpenDataMWQMSamplesDiv").html("");
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.OpenDataMarkAllRoutineSamplesForOpenData = function ($bjs) {
                var TVItemID = parseInt($bjs.data("tvitemid"));
                var StartYear = parseInt($("select[name='OpenDataStartYear']").val());
                var StartMonth = parseInt($("select[name='OpenDataStartMonth']").val());
                var StartDay = parseInt($("select[name='OpenDataStartDay']").val());
                var EndYear = parseInt($("select[name='OpenDataEndYear']").val());
                var EndMonth = parseInt($("select[name='OpenDataEndMonth']").val());
                var EndDay = parseInt($("select[name='OpenDataEndDay']").val());
                var UseForOpenData = $bjs.data("useforopendata");
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
                $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
                var command = "OpenData/MarkAllRoutineSamplesForOpenDataJSON";
                $.post(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                    StartYear: StartYear,
                    StartMonth: StartMonth,
                    StartDay: StartDay,
                    EndYear: EndYear,
                    EndMonth: EndMonth,
                    EndDay: EndDay,
                    UseForOpenData: UseForOpenData,
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
            this.OpenDataMarkSamplesWithMWQMSampleIDForOpenData = function ($bjs) {
                var MWQMSampleID = parseInt($bjs.data("mwqmsampleid"));
                var UseForOpenData = $bjs.data("useforopendata");
                var command = "OpenData/MarkSamplesWithMWQMSampleIDForOpenDataJSON";
                $.post(cssp.BaseURL + command, {
                    MWQMSampleID: MWQMSampleID,
                    UseForOpenData: UseForOpenData,
                })
                    .done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        //cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        if (UseForOpenData) {
                            $bjs.closest(".OpenDataMWQMSampleButtonsDiv").find(".IsOpenData").removeClass("hidden");
                            $bjs.closest(".OpenDataMWQMSampleButtonsDiv").find(".NotOpenData").removeClass("hidden").addClass("hidden");
                        }
                        else {
                            $bjs.closest(".OpenDataMWQMSampleButtonsDiv").find(".IsOpenData").removeClass("hidden").addClass("hidden");
                            $bjs.closest(".OpenDataMWQMSampleButtonsDiv").find(".NotOpenData").removeClass("hidden");
                        }
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
                    var command_4 = "OpenData/_OpenDataStat";
                    $.get(cssp.BaseURL + command_4, {
                        TVItemID: TVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            $bjs.next("span.OpenDataStatSpan").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command_4);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_4);
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