
module CSSP {
    export class SubsectorTools {
        // Variables

        // Constructors
        constructor() {

        }

        // Functions
        public SubsectorToolsLoadSubPage: Function = ($bjs: JQuery): void => {
            cssp.GoogleMap.TVItemObjects = [];
            let mapItems: CSSP.tvLocation[] = [];
            cssp.GoogleMap.FillTVItemObjects(mapItems, true);

            let $SubsectorToolsSubDiv: JQuery = $bjs.closest(".SubsectorToolsTopDiv").find(".SubsectorToolsSubDiv")
            $SubsectorToolsSubDiv.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            $bjs.removeClass("btn-default").addClass("btn-success");
            let command: string = $bjs.data("page");
            $(".jbSubsectorToolsLoadSubPage").each((index: number, elem: HTMLElement) => {
                if ($(elem).hasClass("btn-success")) {
                    $(elem).removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
                }
            });
            $.get(cssp.BaseURL + command)
                .done((ret) => {
                    $SubsectorToolsSubDiv.html(ret);
                    $bjs.removeClass("btn-default").removeClass("btn-success").addClass("btn-success");
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    $bjs.removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
                });

        };
        public Init: Function = (): void => {
            if ($("a.GlobeIcon").hasClass("btn-default")) {
                $("#MunicipalityDiv").find(".ClickGlobeToViewOnMap").removeClass("hidden");
            }
            else {
                $("#MunicipalityDiv").find(".jbMunicipalitiesShowOnMap").removeClass("hidden");
            }
        };
        public MunicipalitiesShowOnMap: Function = (): void => {
            let MunicipalityDiv$: JQuery = $("#MunicipalityDiv");
            if ($("a.GlobeIcon").hasClass("btn-success")) {
                let mapItems: CSSP.tvLocation[] = [];
                cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                MunicipalityDiv$.find("button.jbMapShowItem").removeClass("hidden");
                MunicipalityDiv$.find("div.MunicipalityUsedAndWithinDistance").each((ind: number, elem: Element) => {
                    let TVItemID: number = parseInt($(elem).data("municipalitytvitemid"));
                    let TVText: string = $(elem).find(".MunicipalityCount").text() + " - " + $(elem).find(".jbMunicipalitiesAddToUse").text();
                    let TVType: number = TVTypeEnum.MWQMSite;
                    let SubTVType: number = ($(elem).find(".jbMunicipalitiesAddToUse").hasClass("btn-default") ? TVTypeEnum.Failed : TVTypeEnum.Passed);
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
                $("#MunicipalityDiv").find(".jbMapShowItem").removeClass("hidden");
            }
        };
        public MunicipalitiesFindWithinDistance: Function = (): void => {
            let MunicipalityDiv$: JQuery = $("#MunicipalityDiv");
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let Radius_km: number = parseInt($("#MunicipalityDiv").find("input[name='Radius_km']").val());
            let command: string = "SubsectorTools/_subsectorMunicipalities";
            $.get(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    Radius_km: Radius_km
                })
                .done((ret) => {
                    MunicipalityDiv$.find(".MunicipalityInfoDiv").html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                    $("#MunicipalityDiv").find(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public MunicipalitiesAddToUse: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public MunicipalitiesToUseForSubsectorVerifyAndSave: Function = ($bjs: JQuery): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let MunicipalityTVItemIDList: string = "";

            $("#MunicipalityDiv").find("button.jbMunicipalitiesAddToUse").each((ind: number, elem: Element) => {
                if ($(elem).hasClass("btn-success")) {
                    let MunicipalityTVItemID: number = parseInt($(elem).closest(".MunicipalityUsedAndWithinDistance").data("municipalitytvitemid"));

                    MunicipalityTVItemIDList = MunicipalityTVItemIDList + MunicipalityTVItemID + ",";
                }
            });
            let command: string = "SubsectorTools/MunicipalitiesToUseForSubsectorVerifyAndSaveJSON";
            $.post(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    MunicipalityTVItemIDList: MunicipalityTVItemIDList
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

    }
}