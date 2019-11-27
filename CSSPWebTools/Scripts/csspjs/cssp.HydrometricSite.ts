module CSSP {
    export class HydrometricSite {
        // Variables

        // Constructors
        constructor() {
        }

        // Functions
        public Init: Function = (): void => {
            if ($("a.GlobeIcon").hasClass("btn-default")) {
                $("#HydrometricSiteDiv").find(".ClickGlobeToViewOnMap").removeClass("hidden");
            }
            else {
                $("#HydrometricSiteDiv").find(".jbHydrometricSitesShowOnMap").removeClass("hidden");
            }
        };
        public HydrometricSitesShowOnMap: Function = (): void => {
            let HydrometricSiteDiv$: JQuery = $("#HydrometricSiteDiv");
            if ($("a.GlobeIcon").hasClass("btn-success")) {
                let mapItems: CSSP.tvLocation[] = [];
                cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                HydrometricSiteDiv$.find("button.jbMapShowItem").removeClass("hidden");
                HydrometricSiteDiv$.find("div.HydrometricSiteUsedAndWithinDistance").each((ind: number, elem: Element) => {
                    let TVItemID: number = parseInt($(elem).data("hydrometricsitetvitemid"));
                    let TVText: string = $(elem).find(".HydrometricSiteCount").text() + " - " + $(elem).find(".jbHydrometricSiteAddToUse").text();
                    let TVType: number = TVTypeEnum.MWQMSite;
                    let SubTVType: number = ($(elem).find(".jbHydrometricSiteAddToUse").hasClass("btn-default") ? TVTypeEnum.Failed : TVTypeEnum.Passed);
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
                $("#HydrometricSiteDiv").find(".jbMapShowItem").removeClass("hidden");
            }
        };
        public HydrometricSitesFindWithinDistance: Function = (): void => {
            let HydrometricSiteDiv$: JQuery = $("#HydrometricSiteDiv");
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let Radius_km: number = parseInt($("#HydrometricSiteDiv").find("input[name='Radius_km']").val());
            let command: string = "HydrometricSite/_subsectorHydrometricSites";
            $.get(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    Radius_km: Radius_km
                })
                .done((ret) => {
                    HydrometricSiteDiv$.find(".HydrometricSiteInfoDiv").html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                    $("#HydrometricSiteDiv").find(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public HydrometricSitesAddToUse: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest("div.HydrometricSiteUsedAndWithinDistance").find(".ShowYearsOfUse").removeClass("hidden");
                let InputVal: string = $bjs.closest("div.HydrometricSiteUsedAndWithinDistance").find(".ShowYearsOfUse").find("input[name='UseForYears']").val();
                if (InputVal.length == 0) {
                    $bjs.closest("div.HydrometricSiteUsedAndWithinDistance").find(".ShowYearsOfUse").find("input[name='UseForYears']").val($bjs.data("startyear") + "-" + $bjs.data("endyear"));
                }
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest("div.HydrometricSiteUsedAndWithinDistance").find(".ShowYearsOfUse").removeClass("hidden").addClass("hidden");
            }
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
        public HydrometricSitesToUseForSubsectorVerifyAndSave: Function = ($bjs: JQuery): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let HydrometricSiteTVItemIDYearsTextList: HydrometricSiteTVItemIDYearsText[] = [];

            $("#HydrometricSiteDiv").find("button.jbHydrometricSiteAddToUse").each((ind: number, elem: Element) => {
                if ($(elem).hasClass("btn-success")) {
                    let HydrometricSiteText: string = $(elem).text();
                    let HydrometricSiteTVItemID: number = parseInt($(elem).closest(".HydrometricSiteUsedAndWithinDistance").data("hydrometricsitetvitemid"));
                    let YearsText: string = $(elem).closest(".HydrometricSiteUsedAndWithinDistance").find("input[name='UseForYears']").val();

                    if (!cssp.HydrometricSite.CheckUseForYearsText(YearsText)) {
                        cssp.Dialog.ShowDialogError(HydrometricSiteText + " " + YearsText);
                    }

                    HydrometricSiteTVItemIDYearsTextList.push(new HydrometricSiteTVItemIDYearsText(HydrometricSiteTVItemID, YearsText));
                }
            });
            let command: string = "HydrometricSite/HydrometricSitesToUseForSubsectorVerifyAndSaveJSON";
            $.post(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    HydrometricSiteYearsList: HydrometricSiteTVItemIDYearsTextList
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
        public HydrometricSiteOpenDialogToShowExOfYearsToEnter: Function = (): void => {
            let command: string = "HydrometricSite/_dialogToShowExOfYearsToEnter";
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