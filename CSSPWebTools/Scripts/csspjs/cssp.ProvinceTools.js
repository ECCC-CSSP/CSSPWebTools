var CSSP;
(function (CSSP) {
    var ProvinceTools = (function () {
        // Variables
        // Constructors
        function ProvinceTools() {
            // Functions
            this.ReenableButton = function ($bjs) {
                $bjs.removeClass("btn-success").addClass("btn-primary");
                $bjs.removeAttr("disabled");
                $bjs.find(".working").addClass("hidden");
                $bjs.find(".percent").html("");
            };
            this.FillRunPrecipByClimateSitePriorityForYear = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var Year = parseInt($bjs.closest(".ProvinceToolsClimateSiteDiv").find("select[name='Year']").val());
                    var command_1 = "ProvinceTools/FillRunPrecipByClimateSitePriorityForYearJSON";
                    $.post(cssp.BaseURL + command_1, {
                        ProvinceTVItemID: ProvinceTVItemID,
                        Year: Year,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.FindMissingPrecipForProvince = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var command_2 = "ProvinceTools/FindMissingPrecipForProvinceJSON";
                    $.post(cssp.BaseURL + command_2, {
                        ProvinceTVItemID: ProvinceTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_2);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.GetAllPrecipitationForYear = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var Year = parseInt($bjs.closest(".ProvinceToolsClimateSiteDiv").find("select[name='Year']").val());
                    var command_3 = "ProvinceTools/GetAllPrecipitationForYearJSON";
                    $.post(cssp.BaseURL + command_3, {
                        ProvinceTVItemID: ProvinceTVItemID,
                        Year: Year,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_3);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
        }
        return ProvinceTools;
    }());
    CSSP.ProvinceTools = ProvinceTools;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.ProvinceTools.js.map