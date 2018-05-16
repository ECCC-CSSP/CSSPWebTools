
module CSSP {
    export class OpenData {
        // Variables

        // Constructors
        constructor() {

        }

        // Functions
        public OpenDataInit: Function = (): void => {
            $('a[data-toggle="tab"]').off('shown.bs.tab');
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

                if ($(e.target).data("setup") == "y") {
                    $(e.target).closest(".OpenDataTopDiv").find(".OpenDataProvinceDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    let ProvinceTVItemID: number = parseInt($(e.target).data("provincetvitemid"));
                    let command: string = "OpenData/_OpenDataProvince";
                    $.get(cssp.BaseURL + command, {
                        ProvinceTVItemID: ProvinceTVItemID,
                    }).done((ret) => {
                        if (ret) {
                            $(e.target).closest(".OpenDataTopDiv").find(".OpenDataProvinceDiv").html(ret);
                        }
                        else {
                            cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                        }
                    }).fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            });
            $(document).off("change", "select[name='OpenDataStartYear'], select[name='OpenDataStartMonth']");
            $(document).on("change", "select[name='OpenDataStartYear'], select[name='OpenDataStartMonth']", (evt: Event) => {
                let Year: number = parseInt($("select[name='OpenDataStartYear']").val());
                let Month: number = parseInt($("select[name='OpenDataStartMonth']").val());
                let daysInMonth: number = new Date(Year, Month, 0).getDate();
                $("select[name='OpenDataStartDay']").html("");
                let optHTMLArr: Array<string> = [];
                for (var i = 1; i < daysInMonth + 1; i++) {
                    optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                }
                $("select[name='OpenDataStartDay']").html(optHTMLArr.join(""));
            });
            $(document).off("change", "select[name='OpenDataEndYear'], select[name='OpenDataEndMonth']");
            $(document).on("change", "select[name='OpenDataEndYear'], select[name='OpenDataEndMonth']", (evt: Event) => {
                let Year: number = parseInt($("select[name='OpenDataEndYear']").val());
                let Month: number = parseInt($("select[name='OpenDataEndMonth']").val());
                let daysInMonth: number = new Date(Year, Month, 0).getDate();
                $("select[name='OpenDataEndDay']").html("");
                let optHTMLArr: Array<string> = [];
                for (var i = 1; i < daysInMonth + 1; i++) {
                    optHTMLArr.push("<option value='" + i.toString() + "'>" + i.toString() + "</option>");
                }
                $("select[name='OpenDataEndDay']").html(optHTMLArr.join(""));
            });
        };
        public OpenDataGenerateCSVDocumentOfMWQMSites: Function = ($bjs: JQuery): void => {
            //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
            let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            let command: string = "OpenData/GenerateCSVDocumentOfMWQMSitesJSON";
            $.post(cssp.BaseURL + command, {
                ProvinceTVItemID: ProvinceTVItemID,
            }).done((ret) => {
                if (ret) {
                    cssp.Dialog.ShowDialogError(ret);
                }
                else {
                    cssp.Helper.PageRefresh();
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public OpenDataGenerateKMZDocumentOfMWQMSites: Function = ($bjs: JQuery): void => {
            //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
            let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            let command: string = "OpenData/GenerateKMZDocumentOfMWQMSitesJSON";
            $.post(cssp.BaseURL + command, {
                ProvinceTVItemID: ProvinceTVItemID,
            }).done((ret) => {
                if (ret) {
                    cssp.Dialog.ShowDialogError(ret);
                }
                else {
                    cssp.Helper.PageRefresh();
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public OpenDataGenerateCSVDocumentOfMWQMSamples: Function = ($bjs: JQuery): void => {
            //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
            let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            let command: string = "OpenData/GenerateCSVDocumentOfMWQMSamplesJSON";
            $.post(cssp.BaseURL + command, {
                ProvinceTVItemID: ProvinceTVItemID,
            }).done((ret) => {
                if (ret) {
                    cssp.Dialog.ShowDialogError(ret);
                }
                else {
                    cssp.Helper.PageRefresh();
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public OpenDataGenerateXlsxDocumentOfMWQMSitesAndSamples: Function = ($bjs: JQuery): void => {
            //cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
            let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            let command: string = "OpenData/GenerateXlsxDocumentOfMWQMSitesAndSamplesJSON";
            $.post(cssp.BaseURL + command, {
                ProvinceTVItemID: ProvinceTVItemID,
            }).done((ret) => {
                if (ret) {
                    cssp.Dialog.ShowDialogError(ret);
                }
                else {
                    cssp.Helper.PageRefresh();
                }
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
        public OpenDataReloadSubsector: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".OpenDataSubsectorDiv").find(".OpenDataMWQMSiteListDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                let SubsectorTVItemID: number = parseInt($bjs.data("subsectortvitemid"));
                let command: string = "OpenData/_OpenDataSubsector";
                $.get(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".OpenDataSubsectorDiv").find(".OpenDataMWQMSiteListDiv").html(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                $bjs.closest(".OpenDataSubsectorDiv").find(".OpenDataMWQMSiteListDiv").html("");
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };

        public OpenDataReloadMWQMSite: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".OpenDataMWQMSiteDiv").find(".OpenDataMWQMSamplesDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                let TVItemID: number = parseInt($bjs.data("tvitemid"));
                let command: string = "OpenData/_OpenDataMWQMSite";
                $.get(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.closest(".OpenDataMWQMSiteDiv").find(".OpenDataMWQMSamplesDiv").html(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                $bjs.closest(".OpenDataMWQMSiteDiv").find(".OpenDataMWQMSamplesDiv").html("");
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };

        public OpenDataMarkAllRoutineSamplesForOpenData: Function = ($bjs: JQuery): void => {
            let TVItemID: number = parseInt($bjs.data("tvitemid"));
            let StartYear: number = parseInt($("select[name='OpenDataStartYear']").val());
            let StartMonth: number = parseInt($("select[name='OpenDataStartMonth']").val());
            let StartDay: number = parseInt($("select[name='OpenDataStartDay']").val());
            let EndYear: number = parseInt($("select[name='OpenDataEndYear']").val());
            let EndMonth: number = parseInt($("select[name='OpenDataEndMonth']").val());
            let EndDay: number = parseInt($("select[name='OpenDataEndDay']").val());
            let UseForOpenData: boolean = $bjs.data("useforopendata");
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
            var command = "OpenData/MarkAllRoutineSamplesForOpenDataJSON";
            $.post(cssp.BaseURL + command,
                {
                    TVItemID: TVItemID,
                    StartYear: StartYear,
                    StartMonth: StartMonth,
                    StartDay: StartDay,
                    EndYear: EndYear,
                    EndMonth: EndMonth,
                    EndDay: EndDay,
                    UseForOpenData: UseForOpenData,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden");
                        $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden").addClass("hidden");
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public OpenDataMarkSamplesWithMWQMSampleIDForOpenData: Function = ($bjs: JQuery): void => {
            let MWQMSampleID: number = parseInt($bjs.data("mwqmsampleid"));
            let UseForOpenData: boolean = $bjs.data("useforopendata");
            var command = "OpenData/MarkSamplesWithMWQMSampleIDForOpenDataJSON";
            $.post(cssp.BaseURL + command,
                {
                    MWQMSampleID: MWQMSampleID,
                    UseForOpenData: UseForOpenData,
                })
                .done((ret) => {
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
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public OpenDataStat: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.next("span.OpenDataStatSpan").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                let TVItemID: number = parseInt($bjs.data("tvitemid"));
                let command: string = "OpenData/_OpenDataStat";
                $.get(cssp.BaseURL + command, {
                    TVItemID: TVItemID,
                }).done((ret) => {
                    if (ret) {
                        $bjs.next("span.OpenDataStatSpan").html(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogErrorWithCouldNotLoad_(command);
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                $bjs.next("span.OpenDataStatSpan").html("");
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
    }
}