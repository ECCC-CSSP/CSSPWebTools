
module CSSP {
    export class ProvinceTools {
        // Variables

        // Constructors
        constructor() {

        }

        // Functions
        public ReenableButton: Function = ($bjs: JQuery): void => {
            $bjs.removeClass("btn-success").addClass("btn-primary");
            $bjs.removeAttr("disabled");
            $bjs.find(".working").addClass("hidden");
            $bjs.find(".percent").html("");
        };
        public FillRunPrecipByClimateSitePriorityForYear: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let Year: number = parseInt($bjs.closest(".ProvinceToolsClimateSiteDiv").find("select[name='Year']").val());
                let command: string = "ProvinceTools/FillRunPrecipByClimateSitePriorityForYearJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                    Year: Year,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public FindMissingPrecipForProvince: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let command: string = "ProvinceTools/FindMissingPrecipForProvinceJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public GetAllPrecipitationForYear: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let Year: number = parseInt($bjs.closest(".ProvinceToolsClimateSiteDiv").find("select[name='Year']").val());
                let command: string = "ProvinceTools/GetAllPrecipitationForYearJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                    Year: Year,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                    cssp.Helper.PageRefresh();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public FillRunDischargeByHydrometricSitePriorityForYear: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let Year: number = parseInt($bjs.closest(".ProvinceToolsHydrometricSiteDiv").find("select[name='Year']").val());
                let command: string = "ProvinceTools/FillRunPrecipByHydrometricSitePriorityForYearJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                    Year: Year,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public FindMissingDischargeForProvince: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let command: string = "ProvinceTools/FindMissingDischargeForProvinceJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public GetAllDischargeForYear: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let Year: number = parseInt($bjs.closest(".ProvinceToolsHydrometricSiteDiv").find("select[name='Year']").val());
                let command: string = "ProvinceTools/GetAllDischargeForYearJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                    Year: Year,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                    cssp.Helper.PageRefresh();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public GenerateClassificationForCSSPWebToolsVisualization: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let command: string = "ProvinceTools/GenerateClassificationForCSSPWebToolsVisualizationJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                    cssp.Helper.PageRefresh();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public GenerateKMLFileClassificationForCSSPWebToolsVisualization: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let command: string = "ProvinceTools/GenerateKMLFileClassificationForCSSPWebToolsVisualizationJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                    cssp.Helper.PageRefresh();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public GenerateClassificationInputs_XX_FromDB_kmlFromDataInCSSPDB: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let command: string = "ProvinceTools/GenerateClassificationInputs_XX_FromDB_kmlFromDataInCSSPDBJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                    cssp.Helper.PageRefresh();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public GenerateLinksBetweenMWQMSitesAndPolSourceSitesForCSSPWebToolsVisualization: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let command: string = "ProvinceTools/GenerateLinksBetweenMWQMSitesAndPolSourceSitesForCSSPWebToolsVisualizationJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                    cssp.Helper.PageRefresh();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public ProvinceToolsGenerateStats: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-primary")) {
                $bjs.removeClass("btn-primary").addClass("btn-success");
                $bjs.removeAttr("disabled").attr("disabled", "disabled");
                $bjs.find(".working").removeClass("hidden");
                $bjs.find(".percent").html("3 %");
                let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
                let command: string = "ProvinceTools/ProvinceToolsGenerateStatsJSON";
                $.post(cssp.BaseURL + command, {
                    ProvinceTVItemID: ProvinceTVItemID,
                }).done((ret) => {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    cssp.ProvinceTools.ReenableButton($bjs);
                    window.location.href = window.location.href.replace("050", "020");
                    cssp.Helper.PageRefresh();
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            }
            else {
                cssp.ProvinceTools.ReenableButton($bjs);
            }
        };
        public ProvinceToolsCreateClassificationInputsKML: Function = ($bjs: JQuery): void => {
            let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            let command: string = "ProvinceTools/ProvinceToolsCreateClassificationInputsKMLJSON";
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
        public ProvinceToolsCreateGroupingInputsKML: Function = ($bjs: JQuery): void => {
            let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            let command: string = "ProvinceTools/ProvinceToolsCreateGroupingInputsKMLJSON";
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
        public ProvinceToolsCreateMWQMSitesAndPolSourceSitesKML: Function = ($bjs: JQuery): void => {
            let ProvinceTVItemID: number = parseInt($bjs.data("provincetvitemid"));
            let command: string = "ProvinceTools/ProvinceToolsCreateMWQMSitesAndPolSourceSitesKMLJSON";
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
    }
}