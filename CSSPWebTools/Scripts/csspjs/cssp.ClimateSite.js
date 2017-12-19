var CSSP;
(function (CSSP) {
    var ClimateSite = (function () {
        // Variables
        // Constructors
        function ClimateSite() {
            // Functions
            this.Init = function () {
                if ($("a.GlobeIcon").hasClass("btn-default")) {
                    $("#ClimateSiteDiv").find(".ClickGlobeToViewOnMap").removeClass("hidden");
                }
                else {
                    $("#ClimateSiteDiv").find(".jbClimateSitesShowOnMap").removeClass("hidden");
                }
                $(document).off("click", "a.ClimateSitePrioritiesLink");
                $(document).on("click", "a.ClimateSitePrioritiesLink", function (evt) {
                    cssp.ClimateSite.ReloadClimateSitePriorities();
                });
                $(document).off("click", "a.ClimateSiteRunsLink");
                $(document).on("click", "a.ClimateSiteRunsLink", function (evt) {
                    cssp.ClimateSite.ReloadRunsAndClimateSitePrecipitation();
                });
                $(document).off("change", "select.SelectedRunDataType");
                $(document).on("change", "select.SelectedRunDataType", function (evt) {
                    cssp.ClimateSite.ClimateSiteSelectRunDataType($(evt.target));
                });
            };
            this.ClimateSitesUseSameAsSelectedSubsector = function ($bjs) {
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var UseSubsectorTVItemID = parseInt($bjs.closest(".ClimateSiteSetupDiv").find("select[name='AdjacentSubsectors']").val());
                var command = "ClimateSite/ClimateSitesUseSameAsSelectedSubsectorJSON";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    UseSubsectorTVItemID: UseSubsectorTVItemID
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ClimateSiteSelectRunDataType = function ($bjs) {
                var MWQMRunModel$ = $bjs.closest("li.MWQMRunModel");
                var SelectText = $bjs.find(":selected").val();
                MWQMRunModel$.find("td.RainData").each(function (ind, elem) {
                    var value = parseFloat($(elem).data(SelectText));
                    if (value == -999) {
                        $(elem).text("E");
                    }
                    else if (value == -1) {
                        $(elem).text("--");
                    }
                    else {
                        $(elem).text($(elem).data(SelectText));
                    }
                });
            };
            this.ClimateSiteOpenRadarHistoricalSite = function ($bjs) {
                var DayValue$ = $bjs.closest("th.DayValue");
                DayValue$.find("a.FirstRadar").trigger("click");
                DayValue$.find("a.SecondRadar").trigger("click");
            };
            this.ClimateSiteRainEnteredFillUsingSelected = function ($bjs) {
                var ClimateSiteTVItemID = $bjs.closest(".SelectedRunPrecipitationInfo").find("input[name='ClimateSiteFillPrec']:checked").data("climatesitetvitemid");
                var ClimateSiteRains$ = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemID.toString() + "]");
                for (var i = 0; i < 11; i++) {
                    var totalPrecip = ClimateSiteRains$.find("td").eq(i + 1).data("totalprecip");
                    $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val(totalPrecip);
                }
            };
            this.ClimateSiteRainEnteredFillUsingAverage = function ($bjs) {
                var _loop_1 = function (i) {
                    var PrecArray = [];
                    $bjs.closest(".SelectedRunPrecipitationInfo").find("input[name='ClimateSiteFillPrec']").each(function (ind, elem) {
                        var ClimateSiteTVItemID = parseInt($(elem).data("climatesitetvitemid"));
                        var ClimateSiteRains$ = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemID.toString() + "]");
                        var totalPrecip = parseFloat(ClimateSiteRains$.find("td").eq(i + 1).data("totalprecip"));
                        PrecArray.push(totalPrecip);
                    });
                    var Average = -1;
                    var Total = 0;
                    var ValueCount = 0;
                    for (var j = 0, count = PrecArray.length; j < count; j++) {
                        if (PrecArray[j] != -999.0 && PrecArray[j] != -1) {
                            ValueCount += 1;
                            Total += PrecArray[j];
                        }
                    }
                    if (ValueCount > 0) {
                        Average = Total / ValueCount;
                        $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val(Average.toFixed(2));
                    }
                };
                for (var i = 0; i < 11; i++) {
                    _loop_1(i);
                }
            };
            this.ClimateSiteRainEnteredFillUsingPriority = function ($bjs) {
                var MinOrdinal = 99999;
                var ClimateSiteTVItemIDList = [];
                var OrdinalList = [];
                var OrderedList = [];
                var ClimateSiteTVItemIDOrderedList = [];
                $bjs.closest(".SelectedRunPrecipitationInfo").find("input[name='ClimateSiteFillPrec']").each(function (ind, elem) {
                    OrdinalList.push(parseInt($(elem).data("ordinal")));
                    ClimateSiteTVItemIDList.push(parseInt($(elem).data("climatesitetvitemid")));
                });
                for (var i = 0, count = OrdinalList.length; i < count; i++) {
                    OrderedList = OrdinalList.sort(function (a, b) { return a - b; });
                }
                for (var i = 0, count = OrderedList.length; i < count; i++) {
                    for (var j = 0; j < count; j++) {
                        if (OrderedList[i] == OrdinalList[j]) {
                            ClimateSiteTVItemIDOrderedList.push(ClimateSiteTVItemIDList[j]);
                            break;
                        }
                    }
                }
                var ClimateSiteRains$ = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemIDOrderedList[0].toString() + "]");
                for (var i = 0; i < 11; i++) {
                    var totalPrecip = ClimateSiteRains$.find("td").eq(i + 1).data("totalprecip");
                    if (totalPrecip != "-999.0") {
                        $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val(totalPrecip);
                    }
                    else {
                        for (var j = 1, count = ClimateSiteTVItemIDOrderedList.length; j < count; j++) {
                            var ClimateSiteRains2$ = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemIDOrderedList[j].toString() + "]");
                            totalPrecip = ClimateSiteRains2$.find("td").eq(i + 1).data("totalprecip");
                            if (totalPrecip != "-999") {
                                $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val(totalPrecip);
                                break;
                            }
                        }
                    }
                }
            };
            this.ClimateSiteRainEnteredFillUsingWeighted = function ($bjs) {
                var _loop_2 = function (i) {
                    var PrecArray = [];
                    var WeightArray = [];
                    var WeightAverage = -1;
                    $bjs.closest(".SelectedRunPrecipitationInfo").find("input[name='ClimateSiteFillPrec']").each(function (ind, elem) {
                        var ClimateSiteTVItemID = parseInt($(elem).data("climatesitetvitemid"));
                        var ClimateSiteRains$ = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemID.toString() + "]");
                        var ClimateSiteRainsWeight$ = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.FillClimateSiteLI[data-climatesitetvitemid=" + ClimateSiteTVItemID.toString() + "]");
                        var weigthText = ClimateSiteRainsWeight$.find("input[name='Weight']").val();
                        if (weigthText != "") {
                            var totalPrecip = parseFloat(ClimateSiteRains$.find("td").eq(i + 1).data("totalprecip"));
                            PrecArray.push(totalPrecip);
                            var weight = parseFloat(weigthText);
                            WeightArray.push(weight);
                        }
                    });
                    for (var j = 0, count = WeightArray.length; j < count; j++) {
                        if (isNaN(WeightArray[j])) {
                            cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varWeightNeedsToBeEmptyOrContainANumber"));
                            return { value: void 0 };
                        }
                    }
                    var TotalValue = 0;
                    var TotalWeight = 0;
                    for (var j = 0, count = PrecArray.length; j < count; j++) {
                        if (PrecArray[j] != -999.0 && PrecArray[j] != -1) {
                            TotalWeight += WeightArray[j];
                            TotalValue += PrecArray[j] * WeightArray[j];
                        }
                    }
                    if (TotalWeight > 0) {
                        WeightAverage = TotalValue / TotalWeight;
                        $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val(WeightAverage.toFixed(2));
                    }
                    else {
                        $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val("-1");
                    }
                };
                for (var i = 0; i < 11; i++) {
                    var state_1 = _loop_2(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            };
            this.ReloadRunsAndClimateSitePrecipitation = function () {
                $("#ClimateSitesRuns").html("<br /><h1>" + cssp.GetHTMLVariable("#LayoutVariables", "varLoading") + "</h1>");
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "ClimateSite/_runsAndClimateSitePrecipitation";
                $.get(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                })
                    .done(function (ret) {
                    $("#ClimateSitesRuns").html(ret);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ReloadClimateSitePriorities = function () {
                $("#ClimateSitesPriorities").html("<br /><h1>" + cssp.GetHTMLVariable("#LayoutVariables", "varLoading") + "</h1>");
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var command = "ClimateSite/_climateSitePriorities";
                $.get(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                })
                    .done(function (ret) {
                    $("#ClimateSitesPriorities").html(ret);
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ClimateSiteShowHideEditEnteredDiv = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $(".jbClimateSiteRainEnteredAreYouSureToSave").removeClass("hidden");
                    $bjs.closest(".SelectedRunPrecipitationInfo").find(".ClimateSiteRainEdit").each(function (ind, elem) {
                        $(elem).removeClass("hidden");
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $(".jbClimateSiteRainEnteredAreYouSureToSave").removeClass("hidden").addClass("hidden");
                    $bjs.closest(".SelectedRunPrecipitationInfo").find(".ClimateSiteRainEdit").each(function (ind, elem) {
                        $(elem).removeClass("hidden").addClass("hidden");
                    });
                }
            };
            this.ClimateSiteRainEnteredSave = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var OldButtonName = $bjs.text();
                        var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                        var MWQMRunTVItemID = parseInt($bjs.data("mwqmruntvitemid"));
                        var SelectedRun$ = $bjs.closest(".SelectedRunPrecipitationInfo");
                        var RainDay0_mm = SelectedRun$.find("input[name='RainDay0_mm']").val();
                        var RainDay1_mm = SelectedRun$.find("input[name='RainDay1_mm']").val();
                        var RainDay2_mm = SelectedRun$.find("input[name='RainDay2_mm']").val();
                        var RainDay3_mm = SelectedRun$.find("input[name='RainDay3_mm']").val();
                        var RainDay4_mm = SelectedRun$.find("input[name='RainDay4_mm']").val();
                        var RainDay5_mm = SelectedRun$.find("input[name='RainDay5_mm']").val();
                        var RainDay6_mm = SelectedRun$.find("input[name='RainDay6_mm']").val();
                        var RainDay7_mm = SelectedRun$.find("input[name='RainDay7_mm']").val();
                        var RainDay8_mm = SelectedRun$.find("input[name='RainDay8_mm']").val();
                        var RainDay9_mm = SelectedRun$.find("input[name='RainDay9_mm']").val();
                        var RainDay10_mm = SelectedRun$.find("input[name='RainDay10_mm']").val();
                        var command = "ClimateSite/ClimateSitePrecipitationEnteredSaveJSON";
                        $.post(cssp.BaseURL + command, {
                            SubsectorTVItemID: SubsectorTVItemID,
                            MWQMRunTVItemID: MWQMRunTVItemID,
                            RainDay0_mm: RainDay0_mm,
                            RainDay1_mm: RainDay1_mm,
                            RainDay2_mm: RainDay2_mm,
                            RainDay3_mm: RainDay3_mm,
                            RainDay4_mm: RainDay4_mm,
                            RainDay5_mm: RainDay5_mm,
                            RainDay6_mm: RainDay6_mm,
                            RainDay7_mm: RainDay7_mm,
                            RainDay8_mm: RainDay8_mm,
                            RainDay9_mm: RainDay9_mm,
                            RainDay10_mm: RainDay10_mm,
                        })
                            .done(function (ret) {
                            if (ret != "") {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                var $bjsNew = $bjs.closest("li.MWQMRunModel").find(".jbLoadClimateSiteSelectRun").removeClass("btn-success").addClass("btn-default");
                                cssp.ClimateSite.LoadClimateSiteSelectRun($bjsNew);
                            }
                        })
                            .fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
            this.ClimateSiteRainEnteredAreYouSureToSave = function ($bjs) {
                cssp.Dialog.ShowDialogContinueSaving($bjs.closest("button.jbLoadClimateSiteSelectRun").text());
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.ClimateSite.ClimateSiteRainEnteredSave", $bjs);
            };
            this.ClimateSitesShowOnMap = function () {
                var mapItems = [];
                cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                var ClimateSiteDiv$ = $("#ClimateSiteDiv");
                if ($("a.GlobeIcon").hasClass("btn-success")) {
                    ClimateSiteDiv$.find("button.jbMapShowItem").removeClass("hidden");
                    ClimateSiteDiv$.find("div.ClimateSiteUsedAndWithinDistance").each(function (ind, elem) {
                        var TVItemID = parseInt($(elem).data("climatesitetvitemid"));
                        var TVText = $(elem).find(".ClimateSiteCount").text() + " - " + $(elem).find(".jbClimateSiteAddToUse").text();
                        var TVType = CSSP.TVTypeEnum.MWQMSite;
                        var SubTVType = ($(elem).find(".jbClimateSiteAddToUse").hasClass("btn-default") ? CSSP.TVTypeEnum.Failed : CSSP.TVTypeEnum.Passed);
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
                    $("#ClimateSiteDiv").find(".jbMapShowItem").removeClass("hidden");
                }
            };
            this.ClimateSitesFindWithinDistance = function () {
                var ClimateSiteDiv$ = $("#ClimateSiteDiv");
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var Radius_km = parseInt($("#ClimateSiteDiv").find("input[name='Radius_km']").val());
                var command = "ClimateSite/_subsectorClimateSites";
                $.get(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    Radius_km: Radius_km
                })
                    .done(function (ret) {
                    ClimateSiteDiv$.find(".ClimateSiteInfoDiv").html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                    $("#ClimateSiteDiv").find(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ClimateSitesAddToUse = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest("div.ClimateSiteUsedAndWithinDistance").find(".ShowYearsOfUse").removeClass("hidden");
                    var InputVal = $bjs.closest("div.ClimateSiteUsedAndWithinDistance").find(".ShowYearsOfUse").find("input[name='UseForYears']").val();
                    if (InputVal.length == 0) {
                        $bjs.closest("div.ClimateSiteUsedAndWithinDistance").find(".ShowYearsOfUse").find("input[name='UseForYears']").val($bjs.data("startyear") + "-" + $bjs.data("endyear"));
                    }
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest("div.ClimateSiteUsedAndWithinDistance").find(".ShowYearsOfUse").removeClass("hidden").addClass("hidden");
                }
            };
            this.LoadClimateSiteSelectRun = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest("li.MWQMRunModel").find(".SelectedRunPrecipitationDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                    var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    var MWQMRunTVItemID = parseInt($bjs.closest("li.MWQMRunModel").data("mwqmruntvitemid"));
                    var command_1 = "ClimateSite/_selectedRunPrecipitation";
                    $.get(cssp.BaseURL + command_1, {
                        SubsectorTVItemID: SubsectorTVItemID,
                        MWQMRunTVItemID: MWQMRunTVItemID
                    })
                        .done(function (ret) {
                        $bjs.closest("li.MWQMRunModel").find(".SelectedRunPrecipitationDiv").html(ret);
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_1);
                    });
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest("li.MWQMRunModel").find(".SelectedRunPrecipitationDiv").html("");
                }
            };
            this.ClimateSiteWaitingTaskToComplete = function ($bjs, OldButtonText, AppTaskID) {
                var interv = setInterval(function () {
                    var command = "ClimateSite/CheckPercentCompletedJSON";
                    $.post(cssp.BaseURL + command, {
                        AppTaskID: AppTaskID
                    })
                        .done(function (PercentCompleted) {
                        if (PercentCompleted == 100) {
                            $bjs.text(OldButtonText);
                            var $bjsNew = $bjs.closest("li.MWQMRunModel").find(".jbLoadClimateSiteSelectRun").removeClass("btn-success").addClass("btn-default");
                            cssp.ClimateSite.LoadClimateSiteSelectRun($bjsNew);
                            clearInterval(interv);
                        }
                        else {
                            $bjs.closest(".SelectedRunPrecipitationInfo").find(".TaskStatus").text(PercentCompleted.toString() + " %");
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }, 3000);
            };
            this.ClimateSiteGetDataForRunsOfYear = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.closest(".SelectedRunPrecipitationInfo").find(".TaskStatus").text("1 %");
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var OldButtonText_1 = $bjs.text();
                    $bjs.text(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    var Year = parseInt($bjs.data("year"));
                    var command_2 = "ClimateSite/ClimateSiteGetDataForRunsOfYearJSON";
                    $.post(cssp.BaseURL + command_2, {
                        SubsectorTVItemID: SubsectorTVItemID,
                        Year: Year
                    })
                        .done(function (AppTaskModel) {
                        if (AppTaskModel.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(AppTaskModel.Error);
                        }
                        else {
                            cssp.ClimateSite.ClimateSiteWaitingTaskToComplete($bjs, OldButtonText_1, AppTaskModel.AppTaskID);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_2);
                    });
                }
            };
            this.ClimateSiteSetDataToUseByAverageOrPriority = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var OldButtonText_2 = $bjs.text();
                    $bjs.text(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                    var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                    var Year = parseInt($bjs.data("year"));
                    var AverageOrPriority = $bjs.data("averageorpriority");
                    var command_3 = "ClimateSite/ClimateSiteSetDataToUseByAverageOrPriorityJSON";
                    $.post(cssp.BaseURL + command_3, {
                        SubsectorTVItemID: SubsectorTVItemID,
                        Year: Year,
                        AverageOrPriority: AverageOrPriority
                    })
                        .done(function (ret) {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                            $bjs.text(OldButtonText_2);
                            var $bjsNew = $bjs.closest("li.MWQMRunModel").find(".jbLoadClimateSiteSelectRun").removeClass("btn-success").addClass("btn-default");
                            cssp.ClimateSite.LoadClimateSiteSelectRun($bjsNew);
                        }
                        else {
                            $bjs.text(OldButtonText_2);
                            var $bjsNew = $bjs.closest("li.MWQMRunModel").find(".jbLoadClimateSiteSelectRun").removeClass("btn-success").addClass("btn-default");
                            cssp.ClimateSite.LoadClimateSiteSelectRun($bjsNew);
                        }
                    })
                        .fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command_3);
                    });
                }
            };
            this.ClimateSitePrioritiesSetPriorityByDistance = function () {
                var ClimateSiteTVItemIDDistance = [];
                $("tr.ClimateSitePriorityRow").each(function (ind, elem) {
                    var ClimateSiteTVItemID = parseInt($(elem).data("climatesitetvitemid"));
                    var Distance = parseInt($(elem).data("climatesitedistance"));
                    ClimateSiteTVItemIDDistance.push({ ClimateSiteTVItemID: ClimateSiteTVItemID, Distance: Distance });
                });
                ClimateSiteTVItemIDDistance = ClimateSiteTVItemIDDistance.sort(function (a, b) {
                    return parseFloat(a.Distance) - parseFloat(b.Distance);
                });
                var counter = 0;
                for (var i = 0, count = ClimateSiteTVItemIDDistance.length; i < count; i++) {
                    $("tr.ClimateSitePriorityRow[data-climatesitetvitemid='" + ClimateSiteTVItemIDDistance[i].ClimateSiteTVItemID + "']").find("input[name='UseOfSite']").each(function (ind, elem) {
                        counter += 1;
                        $(elem).val(counter);
                    });
                }
            };
            this.ClimateSitePrioritiesSave = function () {
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var ClimateSiteUseOfSiteOrdinalList = [];
                var ExistOrdinalList = [];
                $("#ClimateSiteDiv").find("input[name='UseOfSite']").each(function (ind, elem) {
                    var UseOfSiteID = parseInt($(elem).data("useofsiteid"));
                    var Ordinal = parseInt($(elem).val());
                    for (var i = 0, count = ExistOrdinalList.length; i < count; i++) {
                        if (ExistOrdinalList[i] == Ordinal) {
                            cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varAllPriorityNumbersNeedToBeUnique"));
                            return;
                        }
                    }
                    ExistOrdinalList.push(Ordinal);
                    ClimateSiteUseOfSiteOrdinalList.push(new CSSP.ClimateSiteUseOfSiteOrdinal(UseOfSiteID, Ordinal));
                });
                $("#ClimateSitesPriorities").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "ClimateSite/ClimateSitePrioritiesSaveJSON";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    ClimateSiteUseOfSiteOrdinalList: ClimateSiteUseOfSiteOrdinalList
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ClimateSite.ReloadClimateSitePriorities();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
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
            this.ClimateSitesToUseForSubsectorVerifyAndSave = function ($bjs) {
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var ClimateSiteTVItemIDYearsTextList = [];
                $("#ClimateSiteDiv").find("button.jbClimateSiteAddToUse").each(function (ind, elem) {
                    if ($(elem).hasClass("btn-success")) {
                        var ClimateSiteText = $(elem).text();
                        var ClimateSiteTVItemID = parseInt($(elem).closest(".ClimateSiteUsedAndWithinDistance").data("climatesitetvitemid"));
                        var YearsText = $(elem).closest(".ClimateSiteUsedAndWithinDistance").find("input[name='UseForYears']").val();
                        if (!cssp.ClimateSite.CheckUseForYearsText(YearsText)) {
                            cssp.Dialog.ShowDialogError(ClimateSiteText + " " + YearsText);
                        }
                        ClimateSiteTVItemIDYearsTextList.push(new CSSP.ClimateSiteTVItemIDYearsText(ClimateSiteTVItemID, YearsText));
                    }
                });
                var command = "ClimateSite/ClimateSitesToUseForSubsectorVerifyAndSaveJSON";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    ClimateSiteYearsList: ClimateSiteTVItemIDYearsTextList
                })
                    .done(function (ret) {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogMessage(cssp.GetHTMLVariable("#LayoutVariables", "varClimateSitePrioritiesMightNeedResetting") + " ... " +
                            cssp.GetHTMLVariable("#LayoutVariables", "varCheckUnderClimateSitePrioritiesTab"));
                        cssp.Helper.PageRefresh();
                    }
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.ClimateSiteOpenDialogToShowExOfYearsToEnter = function () {
                var command = "ClimateSite/_dialogToShowExOfYearsToEnter";
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
        return ClimateSite;
    }());
    CSSP.ClimateSite = ClimateSite;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.ClimateSite.js.map