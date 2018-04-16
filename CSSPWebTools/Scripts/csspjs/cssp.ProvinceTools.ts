
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
    }
}