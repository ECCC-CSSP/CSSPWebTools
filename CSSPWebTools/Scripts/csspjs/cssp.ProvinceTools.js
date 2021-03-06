var CSSP;
(function (CSSP) {
    var ProvinceTools = /** @class */ (function () {
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
                        window.location.href = window.location.href.replace("050", "020");
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
                        window.location.href = window.location.href.replace("050", "020");
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
                        window.location.href = window.location.href.replace("050", "020");
                        cssp.Helper.PageRefresh();
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_3);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.FillRunDischargeByHydrometricSitePriorityForYear = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var Year = parseInt($bjs.closest(".ProvinceToolsHydrometricSiteDiv").find("select[name='Year']").val());
                    var command_4 = "ProvinceTools/FillRunPrecipByHydrometricSitePriorityForYearJSON";
                    $.post(cssp.BaseURL + command_4, {
                        ProvinceTVItemID: ProvinceTVItemID,
                        Year: Year,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                        window.location.href = window.location.href.replace("050", "020");
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_4);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.FindMissingDischargeForProvince = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var command_5 = "ProvinceTools/FindMissingDischargeForProvinceJSON";
                    $.post(cssp.BaseURL + command_5, {
                        ProvinceTVItemID: ProvinceTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                        window.location.href = window.location.href.replace("050", "020");
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_5);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.GetAllDischargeForYear = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var Year = parseInt($bjs.closest(".ProvinceToolsHydrometricSiteDiv").find("select[name='Year']").val());
                    var command_6 = "ProvinceTools/GetAllDischargeForYearJSON";
                    $.post(cssp.BaseURL + command_6, {
                        ProvinceTVItemID: ProvinceTVItemID,
                        Year: Year,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                        window.location.href = window.location.href.replace("050", "020");
                        cssp.Helper.PageRefresh();
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_6);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.GenerateClassificationForCSSPWebToolsVisualization = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var command_7 = "ProvinceTools/GenerateClassificationForCSSPWebToolsVisualizationJSON";
                    $.post(cssp.BaseURL + command_7, {
                        ProvinceTVItemID: ProvinceTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                        window.location.href = window.location.href.replace("050", "020");
                        cssp.Helper.PageRefresh();
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_7);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.GenerateKMLFileClassificationForCSSPWebToolsVisualization = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var command_8 = "ProvinceTools/GenerateKMLFileClassificationForCSSPWebToolsVisualizationJSON";
                    $.post(cssp.BaseURL + command_8, {
                        ProvinceTVItemID: ProvinceTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                        window.location.href = window.location.href.replace("050", "020");
                        cssp.Helper.PageRefresh();
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_8);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.GenerateClassificationInputs_XX_FromDB_kmlFromDataInCSSPDB = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var command_9 = "ProvinceTools/GenerateClassificationInputs_XX_FromDB_kmlFromDataInCSSPDBJSON";
                    $.post(cssp.BaseURL + command_9, {
                        ProvinceTVItemID: ProvinceTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                        window.location.href = window.location.href.replace("050", "020");
                        cssp.Helper.PageRefresh();
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_9);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.GenerateLinksBetweenMWQMSitesAndPolSourceSitesForCSSPWebToolsVisualization = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var command_10 = "ProvinceTools/GenerateLinksBetweenMWQMSitesAndPolSourceSitesForCSSPWebToolsVisualizationJSON";
                    $.post(cssp.BaseURL + command_10, {
                        ProvinceTVItemID: ProvinceTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                        window.location.href = window.location.href.replace("050", "020");
                        cssp.Helper.PageRefresh();
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_10);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.ProvinceToolsGenerateStats = function ($bjs) {
                if ($bjs.hasClass("btn-primary")) {
                    $bjs.removeClass("btn-primary").addClass("btn-success");
                    $bjs.removeAttr("disabled").attr("disabled", "disabled");
                    $bjs.find(".working").removeClass("hidden");
                    $bjs.find(".percent").html("3 %");
                    var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                    var command_11 = "ProvinceTools/ProvinceToolsGenerateStatsJSON";
                    $.post(cssp.BaseURL + command_11, {
                        ProvinceTVItemID: ProvinceTVItemID,
                    }).done(function (ret) {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        cssp.ProvinceTools.ReenableButton($bjs);
                        window.location.href = window.location.href.replace("050", "020");
                        cssp.Helper.PageRefresh();
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_11);
                    });
                }
                else {
                    cssp.ProvinceTools.ReenableButton($bjs);
                }
            };
            this.ProvinceToolsCreateClassificationInputsKML = function ($bjs) {
                var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                var command = "ProvinceTools/ProvinceToolsCreateClassificationInputsKMLJSON";
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
            this.ProvinceToolsCreateGroupingInputsKML = function ($bjs) {
                var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                var command = "ProvinceTools/ProvinceToolsCreateGroupingInputsKMLJSON";
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
            this.ProvinceToolsCreateMWQMSitesAndPolSourceSitesKML = function ($bjs) {
                var ProvinceTVItemID = parseInt($bjs.data("provincetvitemid"));
                var command = "ProvinceTools/ProvinceToolsCreateMWQMSitesAndPolSourceSitesKMLJSON";
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
        }
        return ProvinceTools;
    }());
    CSSP.ProvinceTools = ProvinceTools;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.ProvinceTools.js.map