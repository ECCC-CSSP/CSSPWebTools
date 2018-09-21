var CSSP;
(function (CSSP) {
    var HydrometricSite = (function () {
        // Variables
        // Constructors
        function HydrometricSite() {
            // Functions
            this.Init = function () {
                if ($("a.GlobeIcon").hasClass("btn-default")) {
                    $("#HydrometricSiteDiv").find(".ClickGlobeToViewOnMap").removeClass("hidden");
                }
                else {
                    $("#HydrometricSiteDiv").find(".jbHydrometricSitesShowOnMap").removeClass("hidden");
                }
            };
            this.HydrometricSitesShowOnMap = function () {
                var mapItems = [];
                cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                var HydrometricSiteDiv$ = $("#HydrometricSiteDiv");
                if ($("a.GlobeIcon").hasClass("btn-success")) {
                    HydrometricSiteDiv$.find("button.jbMapShowItem").removeClass("hidden");
                    HydrometricSiteDiv$.find("div.HydrometricSiteUsedAndWithinDistance").each(function (ind, elem) {
                        var TVItemID = parseInt($(elem).data("hydrometricsitetvitemid"));
                        var TVText = $(elem).find(".HydrometricSiteCount").text() + " - " + $(elem).find(".jbHydrometricSiteAddToUse").text();
                        var TVType = CSSP.TVTypeEnum.MWQMSite;
                        var SubTVType = ($(elem).find(".jbHydrometricSiteAddToUse").hasClass("btn-default") ? CSSP.TVTypeEnum.Failed : CSSP.TVTypeEnum.Passed);
                        var MapInfoID = parseInt($(elem).data("mapinfoid"));
                        var Lat = parseFloat($(elem).data("lat"));
                        var Lng = parseFloat($(elem).data("lng"));
                        var coordList = [];
                        coordList.push(new CSSP.Coord(Lat, Lng, 0));
                        var MapObjList = [];
                        MapObjList.push(new CSSP.MapObj(MapInfoID, CSSP.DrawTypeEnum.Point, coordList));
                        var tvLoc = new CSSP.tvLocation(TVItemID, TVText, TVType, SubTVType, MapObjList);
                        mapItems.push(tvLoc);
                    });
                    if (cssp.GoogleMap.MarkerTextLength < 3) {
                        cssp.GoogleMap.MarkerTextLength = 3;
                    }
                    cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                    $("#HydrometricSiteDiv").find(".jbMapShowItem").removeClass("hidden");
                }
            };
            this.HydrometricSitesFindWithinDistance = function () {
                var HydrometricSiteDiv$ = $("#HydrometricSiteDiv");
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var Radius_km = parseInt($("#HydrometricSiteDiv").find("input[name='Radius_km']").val());
                var command = "HydrometricSite/_subsectorHydrometricSites";
                $.get(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    Radius_km: Radius_km
                })
                    .done(function (ret) {
                    HydrometricSiteDiv$.find(".HydrometricSiteInfoDiv").html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                    $("#HydrometricSiteDiv").find(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.HydrometricSitesAddToUse = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest("div.HydrometricSiteUsedAndWithinDistance").find(".ShowYearsOfUse").removeClass("hidden");
                    var InputVal = $bjs.closest("div.HydrometricSiteUsedAndWithinDistance").find(".ShowYearsOfUse").find("input[name='UseForYears']").val();
                    if (InputVal.length == 0) {
                        $bjs.closest("div.HydrometricSiteUsedAndWithinDistance").find(".ShowYearsOfUse").find("input[name='UseForYears']").val($bjs.data("startyear") + "-" + $bjs.data("endyear"));
                    }
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest("div.HydrometricSiteUsedAndWithinDistance").find(".ShowYearsOfUse").removeClass("hidden").addClass("hidden");
                }
            };
            this.CheckUseForYearsText = function (useForYearsText) {
                var YearTextIsOK = true;
                var StartYear = "";
                var EndYear = "";
                var IsStartYear = false;
                var IsEndYear = false;
                for (var i = 0, count = useForYearsText.length; i < count; i++) {
                    if (useForYearsText[i] == " ") {
                        // skip
                    }
                    else if (useForYearsText[i] == ",") {
                        if (IsStartYear) {
                            if (StartYear.length != 4) {
                                return false;
                            }
                        }
                        if (IsEndYear) {
                            if (EndYear.length != 4) {
                                return false;
                            }
                        }
                        IsStartYear = false;
                        IsEndYear = false;
                        StartYear = "";
                        EndYear = "";
                    }
                    else if (useForYearsText[i] == "-") {
                        if (IsStartYear) {
                            if (StartYear.length != 4) {
                                return false;
                            }
                        }
                        if (IsEndYear) {
                            if (EndYear.length != 4) {
                                return false;
                            }
                        }
                        if (i != count - 1) {
                            if (IsStartYear && !IsEndYear) {
                                IsStartYear = false;
                                IsEndYear = true;
                            }
                        }
                        StartYear = "";
                        EndYear = "";
                    }
                    else if (useForYearsText[i] >= "0" && useForYearsText[i] <= "9") {
                        if (IsStartYear) {
                            StartYear = StartYear + useForYearsText[i];
                        }
                        else if (IsEndYear) {
                            EndYear = EndYear + useForYearsText[i];
                        }
                        else if (!IsStartYear && !IsEndYear) {
                            IsStartYear = true;
                            StartYear = useForYearsText[i];
                        }
                    }
                    else {
                        return false;
                    }
                }
                return true;
            };
            this.HydrometricSitesToUseForSubsectorVerifyAndSave = function ($bjs) {
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var HydrometricSiteTVItemIDYearsTextList = [];
                $("#HydrometricSiteDiv").find("button.jbHydrometricSiteAddToUse").each(function (ind, elem) {
                    if ($(elem).hasClass("btn-success")) {
                        var HydrometricSiteText = $(elem).text();
                        var HydrometricSiteTVItemID = parseInt($(elem).closest(".HydrometricSiteUsedAndWithinDistance").data("hydrometricsitetvitemid"));
                        var YearsText = $(elem).closest(".HydrometricSiteUsedAndWithinDistance").find("input[name='UseForYears']").val();
                        if (!cssp.HydrometricSite.CheckUseForYearsText(YearsText)) {
                            cssp.Dialog.ShowDialogError(HydrometricSiteText + " " + YearsText);
                        }
                        HydrometricSiteTVItemIDYearsTextList.push(new CSSP.HydrometricSiteTVItemIDYearsText(HydrometricSiteTVItemID, YearsText));
                    }
                });
                var command = "HydrometricSite/HydrometricSitesToUseForSubsectorVerifyAndSaveJSON";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    HydrometricSiteYearsList: HydrometricSiteTVItemIDYearsTextList
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varHydrometricSitePrioritiesMightNeedResetting") + " ... " +
                            cssp.GetHTMLVariable("#LayoutVariables", "varCheckUnderHydrometricSitePrioritiesTab"));
                        cssp.Helper.PageRefresh();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.HydrometricSiteOpenDialogToShowExOfYearsToEnter = function () {
                var command = "HydrometricSite/_dialogToShowExOfYearsToEnter";
                $.get(cssp.BaseURL + command)
                    .done(function (ret) {
                    cssp.Dialog.ShowDialogMessage(ret);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
                cssp.Dialog.ShowDialogMessage("<div>");
            };
        }
        return HydrometricSite;
    }());
    CSSP.HydrometricSite = HydrometricSite;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.HydrometricSite.js.map