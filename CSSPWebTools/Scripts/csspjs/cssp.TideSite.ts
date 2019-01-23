module CSSP {
    export class TideSite {
        // Variables

        // Constructors
        constructor() {
        }

        // Functions
        public Init: Function = (): void => {
            if ($("a.GlobeIcon").hasClass("btn-default")) {
                $("#TideSiteDiv").find(".ClickGlobeToViewOnMap").removeClass("hidden");
            }
            else {
                $("#TideSiteDiv").find(".jbTideSitesShowOnMap").removeClass("hidden");
            }
        };
        public TideSitesShowOnMap: Function = (): void => {
            let TideSiteDiv$: JQuery = $("#TideSiteDiv");
            if ($("a.GlobeIcon").hasClass("btn-success")) {
                let mapItems: CSSP.tvLocation[] = [];
                cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                TideSiteDiv$.find("button.jbMapShowItem").removeClass("hidden");
                TideSiteDiv$.find("div.TideSiteUsedAndWithinDistance").each((ind: number, elem: Element) => {
                    let TVItemID: number = parseInt($(elem).data("tidesitetvitemid"));
                    let TVText: string = $(elem).find(".TideSiteCount").text() + " - " + $(elem).find(".jbTideSiteAddToUse").text();
                    let TVType: number = TVTypeEnum.MWQMSite;
                    let SubTVType: number = ($(elem).find(".jbTideSiteAddToUse").hasClass("btn-default") ? TVTypeEnum.Failed : TVTypeEnum.Passed);
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
                $("#TideSiteDiv").find(".jbMapShowItem").removeClass("hidden");
            }
        };
        public TideSitesFindWithinDistance: Function = (): void => {
            let TideSiteDiv$: JQuery = $("#TideSiteDiv");
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let Radius_km: number = parseInt($("#TideSiteDiv").find("input[name='Radius_km']").val());
            let command: string = "TideSite/_subsectorTideSites";
            $.get(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    Radius_km: Radius_km
                })
                .done((ret) => {
                    TideSiteDiv$.find(".TideSiteInfoDiv").html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                    $("#TideSiteDiv").find(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                })
                .fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
        };
        public TideSitesAddToUse: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public TideSitesToUseForSubsectorVerifyAndSave: Function = ($bjs: JQuery): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let TideSiteTVItemIDList: string = "";

            $("#TideSiteDiv").find("button.jbTideSiteAddToUse").each((ind: number, elem: Element) => {
                if ($(elem).hasClass("btn-success")) {
                    let TideSiteTVItemID: number = parseInt($(elem).closest(".TideSiteUsedAndWithinDistance").data("tidesitetvitemid"));

                    TideSiteTVItemIDList = TideSiteTVItemIDList + TideSiteTVItemID + ",";
                }
            });
            let command: string = "TideSite/TideSitesToUseForSubsectorVerifyAndSaveJSON";
            $.post(cssp.BaseURL + command,
                {
                    SubsectorTVItemID: SubsectorTVItemID,
                    TideSiteTVItemIDList: TideSiteTVItemIDList
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