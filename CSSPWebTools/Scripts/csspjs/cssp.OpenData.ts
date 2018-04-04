
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
            })
        };
        public OpenDataGenerateCSVDocumentOfMWQMSites: Function = ($bjs: JQuery): void => {
            cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
            //let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            //let command: string = "OpenData/GenerateCSVDocumentOfMWQMSitesJSON";
            //$.post(cssp.BaseURL + command, {
            //    ProvinceTVItemID: ProvinceTVItemID,
            //}).done((ret) => {
            //    if (ret) {
            //        cssp.Dialog.ShowDialogError(ret);
            //    }
            //    else {
            //        cssp.Helper.PageRefresh();
            //    }
            //}).fail(() => {
            //    cssp.Dialog.ShowDialogErrorWithFail(command);
            //});
        };
        public OpenDataGenerateKMZDocumentOfMWQMSites: Function = ($bjs: JQuery): void => {
            cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
            //let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            //let command: string = "OpenData/GenerateKMZDocumentOfMWQMSitesJSON";
            //$.post(cssp.BaseURL + command, {
            //    ProvinceTVItemID: ProvinceTVItemID,
            //}).done((ret) => {
            //    if (ret) {
            //        cssp.Dialog.ShowDialogError(ret);
            //    }
            //    else {
            //        cssp.Helper.PageRefresh();
            //    }
            //}).fail(() => {
            //    cssp.Dialog.ShowDialogErrorWithFail(command);
            //});
        };
        public OpenDataGenerateCSVDocumentOfMWQMSamples: Function = ($bjs: JQuery): void => {
            cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
            //let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            //let command: string = "OpenData/GenerateCSVDocumentOfMWQMSamplesJSON";
            //$.post(cssp.BaseURL + command, {
            //    ProvinceTVItemID: ProvinceTVItemID,
            //}).done((ret) => {
            //    if (ret) {
            //        cssp.Dialog.ShowDialogError(ret);
            //    }
            //    else {
            //        cssp.Helper.PageRefresh();
            //    }
            //}).fail(() => {
            //    cssp.Dialog.ShowDialogErrorWithFail(command);
            //});
        };
        public OpenDataGenerateXlsxDocumentOfMWQMSamples: Function = ($bjs: JQuery): void => {
            cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varNotImplementedYet"));
            //let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            //let command: string = "OpenData/GenerateXlsxDocumentOfMWQMSamplesJSON";
            //$.post(cssp.BaseURL + command, {
            //    ProvinceTVItemID: ProvinceTVItemID,
            //}).done((ret) => {
            //    if (ret) {
            //        cssp.Dialog.ShowDialogError(ret);
            //    }
            //    else {
            //        cssp.Helper.PageRefresh();
            //    }
            //}).fail(() => {
            //    cssp.Dialog.ShowDialogErrorWithFail(command);
            //});
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

        public OpenDataMarkAllRoutineSamplesAsValidated: Function = ($bjs: JQuery): void => {
            let TVItemID: number = parseInt($bjs.data("tvitemid"));
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
            var command = "OpenData/MarkAllRoutineSamplesAsValidatedJSON";
            $.post(cssp.BaseURL + command,
                {
                    TVItemID: TVItemID,
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
        public OpenDataMarkAllRoutineSamplesAsNotValidated: Function = ($bjs: JQuery): void => {
            let TVItemID: number = parseInt($bjs.data("tvitemid"));
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
            var command = "OpenData/MarkAllRoutineSamplesAsNotValidatedJSON";
            $.post(cssp.BaseURL + command,
                {
                    TVItemID: TVItemID,
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
        public OpenDataMarkAllRoutineSamplesAsIsSensitive: Function = ($bjs: JQuery): void => {
            let TVItemID: number = parseInt($bjs.data("tvitemid"));
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
            var command = "OpenData/MarkAllRoutineSamplesAsIsSensitiveJSON";
            $.post(cssp.BaseURL + command,
                {
                    TVItemID: TVItemID,
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
        public OpenDataMarkAllRoutineSamplesAsNotSensitive: Function = ($bjs: JQuery): void => {
            let TVItemID: number = parseInt($bjs.data("tvitemid"));
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataButtonsDiv").removeClass("hidden").addClass("hidden");
            $bjs.closest(".OpenDataButtonsTopDiv").find(".OpenDataWorkingDiv").removeClass("hidden");
            var command = "OpenData/MarkAllRoutineSamplesAsNotSensitiveJSON";
            $.post(cssp.BaseURL + command,
                {
                    TVItemID: TVItemID,
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
        public OpenDataMarkSamplesWithMWQMSampleIDAsValidated: Function = ($bjs: JQuery): void => {
            let MWQMSampleID: number = parseInt($bjs.data("mwqmsampleid"));
            var command = "OpenData/MarkSamplesWithMWQMSampleIDAsValidatedJSON";
            $.post(cssp.BaseURL + command,
                {
                    MWQMSampleID: MWQMSampleID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public OpenDataMarkSamplesWithMWQMSampleIDAsNotValidated: Function = ($bjs: JQuery): void => {
            let MWQMSampleID: number = parseInt($bjs.data("mwqmsampleid"));
            var command = "OpenData/MarkSamplesWithMWQMSampleIDAsNotValidatedJSON";
            $.post(cssp.BaseURL + command,
                {
                    MWQMSampleID: MWQMSampleID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public OpenDataMarkSamplesWithMWQMSampleIDAsIsSensitive: Function = ($bjs: JQuery): void => {
            let MWQMSampleID: number = parseInt($bjs.data("mwqmsampleid"));
            var command = "OpenData/MarkSamplesWithMWQMSampleIDAsIsSensitiveJSON";
            $.post(cssp.BaseURL + command,
                {
                    MWQMSampleID: MWQMSampleID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                    }
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public OpenDataMarkSamplesWithMWQMSampleIDAsNotSensitive: Function = ($bjs: JQuery): void => {
            let MWQMSampleID: number = parseInt($bjs.data("mwqmsampleid"));
            var command = "OpenData/MarkSamplesWithMWQMSampleIDAsNotSensitiveJSON";
            $.post(cssp.BaseURL + command,
                {
                    MWQMSampleID: MWQMSampleID,
                })
                .done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogSuccess(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
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