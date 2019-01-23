module CSSP {
    export class ClimateSite {
        // Variables

        // Constructors
        constructor() {
        }

        // Functions
        public Init: Function = (): void => {
            if ($("a.GlobeIcon").hasClass("btn-default")) {
                $("#ClimateSiteDiv").find(".ClickGlobeToViewOnMap").removeClass("hidden");
            }
            else {
                $("#ClimateSiteDiv").find(".jbClimateSitesShowOnMap").removeClass("hidden");
            }
            $(document).off("click", "a.ClimateSitePrioritiesLink");
            $(document).on("click", "a.ClimateSitePrioritiesLink", (evt: Event) => {
                cssp.ClimateSite.ReloadClimateSitePriorities();
            });
            $(document).off("click", "a.ClimateSiteRunsLink");
            $(document).on("click", "a.ClimateSiteRunsLink", (evt: Event) => {
                cssp.ClimateSite.ReloadRunsAndClimateSitePrecipitation();
            });
            $(document).off("change", "select.SelectedRunDataType");
            $(document).on("change", "select.SelectedRunDataType", (evt: Event) => {
                cssp.ClimateSite.ClimateSiteSelectRunDataType($(evt.target));
            });
        };
        public ClimateSitesUseSameAsSelectedSubsector: Function = ($bjs: JQuery): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let UseSubsectorTVItemID: number = parseInt($bjs.closest(".ClimateSiteSetupDiv").find("select[name='AdjacentSubsectors']").val());
            let command: string = "ClimateSite/ClimateSitesUseSameAsSelectedSubsectorJSON";
            $.post(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    UseSubsectorTVItemID: UseSubsectorTVItemID
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Helper.PageRefresh();
                    }
                  })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });

        };
        public ClimateSiteSelectRunDataType: Function = ($bjs: JQuery): void => {
            let MWQMRunModel$: JQuery = $bjs.closest("li.MWQMRunModel");
            let SelectText: string = $bjs.find(":selected").val();
            MWQMRunModel$.find("td.RainData").each((ind: number, elem: Element) => {
                let value: number = parseFloat($(elem).data(SelectText));
                if ($(elem).data("hasbeenread") == true && value == -1) {
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
        public ClimateSiteOpenRadarHistoricalSite: Function = ($bjs: JQuery): void => {
            let DayValue$: JQuery = $bjs.closest("th.DayValue");
            DayValue$.find("a.FirstRadar").trigger("click");
            DayValue$.find("a.SecondRadar").trigger("click");
        };
        public ClimateSiteRainEnteredFillUsingSelected: Function = ($bjs: JQuery): void => {
            let ClimateSiteTVItemID: string = $bjs.closest(".SelectedRunPrecipitationInfo").find("input[name='ClimateSiteFillPrec']:checked").data("climatesitetvitemid");
            let ClimateSiteRains$: JQuery = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemID.toString() + "]");
            for (let i = 0; i < 11; i++) {
                let totalPrecip: string = ClimateSiteRains$.find("td").eq(i + 1).data("totalprecip");
                $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val(totalPrecip);
            }
        };
        public ClimateSiteRainEnteredFillUsingAverage: Function = ($bjs: JQuery): void => {
            for (let i = 0; i < 11; i++) {
                let PrecArray: number[] = [];
                $bjs.closest(".SelectedRunPrecipitationInfo").find("input[name='ClimateSiteFillPrec']").each((ind: number, elem: Element) => {
                    let ClimateSiteTVItemID: number = parseInt($(elem).data("climatesitetvitemid"));
                    let ClimateSiteRains$: JQuery = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemID.toString() + "]");
                    let totalPrecip: number = parseFloat(ClimateSiteRains$.find("td").eq(i + 1).data("totalprecip"));
                    PrecArray.push(totalPrecip);
                });

                let Average: number = -1;
                let Total: number = 0;
                let ValueCount: number = 0;
                for (let j = 0, count = PrecArray.length; j < count; j++)
                {
                    if (PrecArray[j] != -1) {
                        ValueCount += 1;
                        Total += PrecArray[j];
                    }
                }
                if (ValueCount > 0) {
                    Average = Total / ValueCount;
                    $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val(Average.toFixed(2));
                }
            }
        };
        public ClimateSiteRainEnteredFillUsingPriority: Function = ($bjs: JQuery): void => {
            let MinOrdinal: number = 99999;
            let ClimateSiteTVItemIDList: number[] = [];
            let OrdinalList: number[] = [];
            let OrderedList: number[] = [];
            let ClimateSiteTVItemIDOrderedList: number[] = [];

            $bjs.closest(".SelectedRunPrecipitationInfo").find("input[name='ClimateSiteFillPrec']").each((ind: number, elem: Element) => {
                OrdinalList.push(parseInt($(elem).data("ordinal")));
                ClimateSiteTVItemIDList.push(parseInt($(elem).data("climatesitetvitemid")));
            });
            for (let i = 0, count = OrdinalList.length; i < count; i++) {
                OrderedList = OrdinalList.sort((a, b) => { return a - b });
            }
            for (let i = 0, count = OrderedList.length; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    if (OrderedList[i] == OrdinalList[j]) {
                        ClimateSiteTVItemIDOrderedList.push(ClimateSiteTVItemIDList[j]);
                        break;
                    }
                }
            }

            let ClimateSiteRains$: JQuery = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemIDOrderedList[0].toString() + "]");
            for (let i = 0; i < 11; i++) {
                let totalPrecip: string = ClimateSiteRains$.find("td").eq(i + 1).data("totalprecip");
                if (totalPrecip != "-1") {
                    $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val(totalPrecip);
                }
                else {
                    for (let j = 1, count = ClimateSiteTVItemIDOrderedList.length; j < count; j++) {
                        let ClimateSiteRains2$: JQuery = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemIDOrderedList[j].toString() + "]");
                        totalPrecip = ClimateSiteRains2$.find("td").eq(i + 1).data("totalprecip");
                        if (totalPrecip != "-1") {
                            $bjs.closest("tr").find("input[name='RainDay" + i + "_mm']").val(totalPrecip);
                            break;
                        }
                    }
                }
            }
        };
        public ClimateSiteRainEnteredFillUsingWeighted: Function = ($bjs: JQuery): void => {
            for (let i = 0; i < 11; i++) {
                let PrecArray: number[] = [];
                let WeightArray: number[] = [];
                let WeightAverage: number = -1;

                $bjs.closest(".SelectedRunPrecipitationInfo").find("input[name='ClimateSiteFillPrec']").each((ind: number, elem: Element) => {
                    let ClimateSiteTVItemID: number = parseInt($(elem).data("climatesitetvitemid"));
                    let ClimateSiteRains$: JQuery = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.ClimateSiteRains[data-climatesitetvitemid=" + ClimateSiteTVItemID.toString() + "]");
                    let ClimateSiteRainsWeight$: JQuery = $bjs.closest(".SelectedRunPrecipitationInfo").find("tr.FillClimateSiteLI[data-climatesitetvitemid=" + ClimateSiteTVItemID.toString() + "]");
                    let weigthText: string = ClimateSiteRainsWeight$.find("input[name='Weight']").val();
                    if (weigthText != "") {
                        let totalPrecip: number = parseFloat(ClimateSiteRains$.find("td").eq(i + 1).data("totalprecip"));
                        PrecArray.push(totalPrecip);
                        let weight: number = parseFloat(weigthText);
                        WeightArray.push(weight);
                    }
                });

                for (let j = 0, count = WeightArray.length; j < count; j++) {
                    if (isNaN(WeightArray[j])) {
                        cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varWeightNeedsToBeEmptyOrContainANumber"));
                        return;
                    }
                }

                let TotalValue: number = 0;
                let TotalWeight: number = 0;
                for (let j = 0, count = PrecArray.length; j < count; j++) {
                    if (PrecArray[j] != -1) {
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
            }
        };
        public ReloadRunsAndClimateSitePrecipitation: Function = (): void => {
            $("#ClimateSitesRuns").html("<br /><h1>" + cssp.GetHTMLVariable("#LayoutVariables", "varLoading") + "</h1>");
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let command: string = "ClimateSite/_runsAndClimateSitePrecipitation";
            $.get(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                })
                .done((ret) => {
                    $("#ClimateSitesRuns").html(ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public ReloadClimateSitePriorities: Function = (): void => {
            $("#ClimateSitesPriorities").html("<br /><h1>" + cssp.GetHTMLVariable("#LayoutVariables", "varLoading") + "</h1>");
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let command: string = "ClimateSite/_climateSitePriorities";
            $.get(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                })
                .done((ret) => {
                    $("#ClimateSitesPriorities").html(ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public ClimateSiteShowHideEditEnteredDiv: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $(".jbClimateSiteRainEnteredAreYouSureToSave").removeClass("hidden");
                $bjs.closest(".SelectedRunPrecipitationInfo").find(".ClimateSiteRainEdit").each((ind: number, elem: Element) => {
                    $(elem).removeClass("hidden");
                });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $(".jbClimateSiteRainEnteredAreYouSureToSave").removeClass("hidden").addClass("hidden");
                $bjs.closest(".SelectedRunPrecipitationInfo").find(".ClimateSiteRainEdit").each((ind: number, elem: Element) => {
                    $(elem).removeClass("hidden").addClass("hidden");
                });
            }
        };
        public ClimateSiteRainEnteredSave: Function = ($bjs: JQuery): void => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    let OldButtonName: string = $bjs.text();
                    let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                    let MWQMRunTVItemID: number = parseInt($bjs.data("mwqmruntvitemid"));
                    let SelectedRun$: JQuery = $bjs.closest(".SelectedRunPrecipitationInfo");
                    let RainDay0_mm: string = SelectedRun$.find("input[name='RainDay0_mm']").val();
                    let RainDay1_mm: string = SelectedRun$.find("input[name='RainDay1_mm']").val();
                    let RainDay2_mm: string = SelectedRun$.find("input[name='RainDay2_mm']").val();
                    let RainDay3_mm: string = SelectedRun$.find("input[name='RainDay3_mm']").val();
                    let RainDay4_mm: string = SelectedRun$.find("input[name='RainDay4_mm']").val();
                    let RainDay5_mm: string = SelectedRun$.find("input[name='RainDay5_mm']").val();
                    let RainDay6_mm: string = SelectedRun$.find("input[name='RainDay6_mm']").val();
                    let RainDay7_mm: string = SelectedRun$.find("input[name='RainDay7_mm']").val();
                    let RainDay8_mm: string = SelectedRun$.find("input[name='RainDay8_mm']").val();
                    let RainDay9_mm: string = SelectedRun$.find("input[name='RainDay9_mm']").val();
                    let RainDay10_mm: string = SelectedRun$.find("input[name='RainDay10_mm']").val();
                    let command: string = "ClimateSite/ClimateSitePrecipitationEnteredSaveJSON";
                    $.post(cssp.BaseURL + command,
                        {
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
                        .done((ret: string) => {
                            if (ret != "") {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                let $bjsNew = $bjs.closest("li.MWQMRunModel").find(".jbLoadClimateSiteSelectRun").removeClass("btn-success").addClass("btn-default");
                                cssp.ClimateSite.LoadClimateSiteSelectRun($bjsNew);
                            }
                        })
                        .fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
        public ClimateSiteRainEnteredAreYouSureToSave: Function = ($bjs: JQuery): void => {
            cssp.Dialog.ShowDialogContinueSaving($bjs.closest("button.jbLoadClimateSiteSelectRun").text());
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.ClimateSite.ClimateSiteRainEnteredSave", $bjs);
        };
        public ClimateSitesShowOnMap: Function = (): void => {
            let ClimateSiteDiv$: JQuery = $("#ClimateSiteDiv");
            if ($("a.GlobeIcon").hasClass("btn-success")) {
                let mapItems: CSSP.tvLocation[] = [];
                cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                ClimateSiteDiv$.find("button.jbMapShowItem").removeClass("hidden");
                ClimateSiteDiv$.find("div.ClimateSiteUsedAndWithinDistance").each((ind: number, elem: Element) => {
                    let TVItemID: number = parseInt($(elem).data("climatesitetvitemid"));
                    let TVText: string = $(elem).find(".ClimateSiteCount").text() + " - " + $(elem).find(".jbClimateSiteAddToUse").text();
                    let TVType: number = TVTypeEnum.MWQMSite;
                    let SubTVType: number = ($(elem).find(".jbClimateSiteAddToUse").hasClass("btn-default") ? TVTypeEnum.Failed : TVTypeEnum.Passed);
                    let MapInfoID: number = parseInt($(elem).data("mapinfoid"));
                    let Lat: number = parseFloat($(elem).data("lat"));
                    let Lng: number = parseFloat($(elem).data("lng"));
                    let coordList: Coord[] = [];
                    coordList.push(new Coord(Lat, Lng, 0));
                    let MapObjList: MapObj[] = [];
                    MapObjList.push(new CSSP.MapObj(MapInfoID, DrawTypeEnum.Point, coordList));
                    let tvLoc: CSSP.tvLocation = new CSSP.tvLocation(TVItemID, TVText, TVType, SubTVType, MapObjList);
                    mapItems.push(tvLoc);
                });

                if (cssp.GoogleMap.MarkerTextLength < 3) {
                    cssp.GoogleMap.MarkerTextLength = 3;
                }
                cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                $("#ClimateSiteDiv").find(".jbMapShowItem").removeClass("hidden");
            }
        };
        public ClimateSitesFindWithinDistance: Function = (): void => {
            let ClimateSiteDiv$: JQuery = $("#ClimateSiteDiv");
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let Radius_km: number = parseInt($("#ClimateSiteDiv").find("input[name='Radius_km']").val());
            let command: string = "ClimateSite/_subsectorClimateSites";
            $.get(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    Radius_km: Radius_km
                })
                .done((ret) => {
                    ClimateSiteDiv$.find(".ClimateSiteInfoDiv").html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                    $("#ClimateSiteDiv").find(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public ClimateSitesAddToUse: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest("div.ClimateSiteUsedAndWithinDistance").find(".ShowYearsOfUse").removeClass("hidden");
                let InputVal: string = $bjs.closest("div.ClimateSiteUsedAndWithinDistance").find(".ShowYearsOfUse").find("input[name='UseForYears']").val();
                if (InputVal.length == 0) {
                    $bjs.closest("div.ClimateSiteUsedAndWithinDistance").find(".ShowYearsOfUse").find("input[name='UseForYears']").val($bjs.data("startyear") + "-" + $bjs.data("endyear"));
                }
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest("div.ClimateSiteUsedAndWithinDistance").find(".ShowYearsOfUse").removeClass("hidden").addClass("hidden");
            }
        };
        public LoadClimateSiteSelectRun: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest("li.MWQMRunModel").find(".SelectedRunPrecipitationDiv").html(cssp.GetHTMLVariable("#LayoutVariables", "varLoading"));
                let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                let MWQMRunTVItemID: number = parseInt($bjs.closest("li.MWQMRunModel").data("mwqmruntvitemid"));
                let command: string = "ClimateSite/_selectedRunPrecipitation";
                $.get(cssp.BaseURL + command,
                    {
                        SubsectorTVItemID: SubsectorTVItemID,
                        MWQMRunTVItemID: MWQMRunTVItemID
                    })
                    .done((ret) => {
                        $bjs.closest("li.MWQMRunModel").find(".SelectedRunPrecipitationDiv").html(ret);
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest("li.MWQMRunModel").find(".SelectedRunPrecipitationDiv").html("");
            }
        };
        public ClimateSiteWaitingTaskToComplete: Function = ($bjs: JQuery, OldButtonText: string, AppTaskID: number): void => {
            let interv = setInterval(() => {
                let command: string = "ClimateSite/CheckPercentCompletedJSON";
                $.post(cssp.BaseURL + command,
                    {
                        AppTaskID: AppTaskID
                    })
                    .done((PercentCompleted: number) => {
                        if (PercentCompleted == 100) {
                            $bjs.text(OldButtonText);
                            let $bjsNew = $bjs.closest("li.MWQMRunModel").find(".jbLoadClimateSiteSelectRun").removeClass("btn-success").addClass("btn-default");
                            cssp.ClimateSite.LoadClimateSiteSelectRun($bjsNew);
                            clearInterval(interv);
                        }
                        else {
                            $bjs.closest(".SelectedRunPrecipitationInfo").find(".TaskStatus").text(PercentCompleted.toString() + " %");
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }, 3000);
        };
        public ClimateSiteGetDataForRunsOfYear: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.closest(".SelectedRunPrecipitationInfo").find(".TaskStatus").text("1 %");
                $bjs.removeClass("btn-default").addClass("btn-success");
                let OldButtonText: string = $bjs.text();
                $bjs.text(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                let Year: number = parseInt($bjs.data("year"));
                let command: string = "ClimateSite/ClimateSiteGetDataForRunsOfYearJSON";
                $.post(cssp.BaseURL + command,
                    {
                        SubsectorTVItemID: SubsectorTVItemID,
                        Year: Year
                    })
                    .done((AppTaskModel) => {
                        if (AppTaskModel.Error != "") {
                            cssp.Dialog.ShowDialogErrorWithError(AppTaskModel.Error);
                        }
                        else {
                            cssp.ClimateSite.ClimateSiteWaitingTaskToComplete($bjs, OldButtonText, AppTaskModel.AppTaskID);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }

        };
        public ClimateSiteSetDataToUseByAverageOrPriority: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                let OldButtonText: string = $bjs.text();
                $bjs.text(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
                let Year: number = parseInt($bjs.data("year"));
                let AverageOrPriority: string = $bjs.data("averageorpriority");
                let command: string = "ClimateSite/ClimateSiteSetDataToUseByAverageOrPriorityJSON";
                $.post(cssp.BaseURL + command,
                    {
                        SubsectorTVItemID: SubsectorTVItemID,
                        Year: Year,
                        AverageOrPriority: AverageOrPriority
                    })
                    .done((ret) => {
                        if (ret != "") {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                            $bjs.text(OldButtonText);
                            let $bjsNew = $bjs.closest("li.MWQMRunModel").find(".jbLoadClimateSiteSelectRun").removeClass("btn-success").addClass("btn-default");
                            cssp.ClimateSite.LoadClimateSiteSelectRun($bjsNew);
                        }
                        else {
                            $bjs.text(OldButtonText);
                            let $bjsNew = $bjs.closest("li.MWQMRunModel").find(".jbLoadClimateSiteSelectRun").removeClass("btn-success").addClass("btn-default");
                            cssp.ClimateSite.LoadClimateSiteSelectRun($bjsNew);
                        }
                    })
                    .fail(() => {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
            }
        };
        public ClimateSitePrioritiesSetPriorityByDistance: Function = (): void => {
            let ClimateSiteTVItemIDDistance: Array<any> = [];
            $("tr.ClimateSitePriorityRow").each((ind: number, elem: Element) => {
                let ClimateSiteTVItemID: number = parseInt($(elem).data("climatesitetvitemid"));
                let Distance: number = parseInt($(elem).data("climatesitedistance"));
                ClimateSiteTVItemIDDistance.push({ ClimateSiteTVItemID: ClimateSiteTVItemID, Distance: Distance });
            });

            ClimateSiteTVItemIDDistance = ClimateSiteTVItemIDDistance.sort((a: any, b: any) => {
                return parseFloat(a.Distance) - parseFloat(b.Distance);
            });

            let counter = 0;
            for (let i = 0, count = ClimateSiteTVItemIDDistance.length; i < count; i++) {
                $("tr.ClimateSitePriorityRow[data-climatesitetvitemid='" + ClimateSiteTVItemIDDistance[i].ClimateSiteTVItemID + "']").find("input[name='UseOfSite']").each((ind: number, elem: Element) => {
                    counter += 1;
                    $(elem).val(counter);
                });
            }
        };
        public ClimateSitePrioritiesSave: Function = (): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let ClimateSiteUseOfSiteOrdinalList: ClimateSiteUseOfSiteOrdinal[] = [];
            let ExistOrdinalList: number[] = [];
            $("#ClimateSiteDiv").find("input[name='UseOfSite']").each((ind: number, elem: Element) => {
                let UseOfSiteID: number = parseInt($(elem).data("useofsiteid"));
                let Ordinal: number = parseInt($(elem).val());
                for (let i = 0, count = ExistOrdinalList.length; i < count; i++) {
                    if (ExistOrdinalList[i] == Ordinal) {
                        cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varAllPriorityNumbersNeedToBeUnique"));
                        return;
                    }
                }
                ExistOrdinalList.push(Ordinal);
                ClimateSiteUseOfSiteOrdinalList.push(new ClimateSiteUseOfSiteOrdinal(UseOfSiteID, Ordinal));
            });
            $("#ClimateSitesPriorities").html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            let command: string = "ClimateSite/ClimateSitePrioritiesSaveJSON";
            $.post(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    ClimateSiteUseOfSiteOrdinalList: ClimateSiteUseOfSiteOrdinalList
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.ClimateSite.ReloadClimateSitePriorities();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public CheckUseForYearsText: Function = (useForYearsText: string): boolean => {
            let YearTextIsOK: boolean = true;
            let StartYear: string = "";
            let EndYear: string = "";
            let IsStartYear: boolean = false;
            let IsEndYear: boolean = false;
            for (let i = 0, count = useForYearsText.length; i < count; i++) {
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
        public ClimateSitesToUseForSubsectorVerifyAndSave: Function = ($bjs: JQuery): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let ClimateSiteTVItemIDYearsTextList: ClimateSiteTVItemIDYearsText[] = [];

            $("#ClimateSiteDiv").find("button.jbClimateSiteAddToUse").each((ind: number, elem: Element) => {
                if ($(elem).hasClass("btn-success")) {
                    let ClimateSiteText: string = $(elem).text();
                    let ClimateSiteTVItemID: number = parseInt($(elem).closest(".ClimateSiteUsedAndWithinDistance").data("climatesitetvitemid"));
                    let YearsText: string = $(elem).closest(".ClimateSiteUsedAndWithinDistance").find("input[name='UseForYears']").val();

                    if (!cssp.ClimateSite.CheckUseForYearsText(YearsText)) {
                        cssp.Dialog.ShowDialogError(ClimateSiteText + " " + YearsText);
                    }

                    ClimateSiteTVItemIDYearsTextList.push(new ClimateSiteTVItemIDYearsText(ClimateSiteTVItemID, YearsText));
                }
            });
            let command: string = "ClimateSite/ClimateSitesToUseForSubsectorVerifyAndSaveJSON";
            $.post(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    ClimateSiteYearsList: ClimateSiteTVItemIDYearsTextList
                })
                .done((ret) => {
                    if (ret != "") {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        cssp.Dialog.ShowDialogMessage(
                            cssp.GetHTMLVariable("#LayoutVariables", "varClimateSitePrioritiesMightNeedResetting") + " ... " +
                            cssp.GetHTMLVariable("#LayoutVariables", "varCheckUnderClimateSitePrioritiesTab"));
                        cssp.Helper.PageRefresh();
                    }
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public ClimateSiteOpenDialogToShowExOfYearsToEnter: Function = (): void => {
            let command: string = "ClimateSite/_dialogToShowExOfYearsToEnter";
            $.get(cssp.BaseURL + command)
                .done((ret) => {
                    cssp.Dialog.ShowDialogMessage(ret);
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            cssp.Dialog.ShowDialogMessage("<div>")
        };
    }
}
