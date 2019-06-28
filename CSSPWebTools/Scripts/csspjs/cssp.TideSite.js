var CSSP;
(function (CSSP) {
    var TideSite = (function () {
        // Variables
        // Constructors
        function TideSite() {
            // Functions
            this.Init = function () {
                if ($("a.GlobeIcon").hasClass("btn-default")) {
                    $("#TideSiteDiv").find(".ClickGlobeToViewOnMap").removeClass("hidden");
                }
                else {
                    $("#TideSiteDiv").find(".jbTideSitesShowOnMap").removeClass("hidden");
                }
            };
            this.TideSitesShowOnMap = function () {
                var TideSiteDiv$ = $("#TideSiteDiv");
                if ($("a.GlobeIcon").hasClass("btn-success")) {
                    var mapItems_1 = [];
                    cssp.GoogleMap.FillTVItemObjects(mapItems_1, true);
                    TideSiteDiv$.find("button.jbMapShowItem").removeClass("hidden");
                    TideSiteDiv$.find("div.TideSiteUsedAndWithinDistance").each(function (ind, elem) {
                        var TVItemID = parseInt($(elem).data("tidesitetvitemid"));
                        var TVText = $(elem).find(".TideSiteCount").text() + " - " + $(elem).find(".jbTideSiteAddToUse").text();
                        var TVType = CSSP.TVTypeEnum.MWQMSite;
                        var SubTVType = ($(elem).find(".jbTideSiteAddToUse").hasClass("btn-default") ? CSSP.TVTypeEnum.Failed : CSSP.TVTypeEnum.Passed);
                        var MapInfoID = parseInt($(elem).data("mapinfoid"));
                        var Lat = parseFloat($(elem).data("lat"));
                        var Lng = parseFloat($(elem).data("lng"));
                        var coordList = [];
                        coordList.push(new CSSP.Coord(Lat, Lng, 0));
                        var MapObjList = [];
                        MapObjList.push(new CSSP.MapObj(MapInfoID, CSSP.DrawTypeEnum.Point, coordList));
                        var tvLoc = new CSSP.tvLocation(TVItemID, TVText, TVType, SubTVType, MapObjList);
                        mapItems_1.push(tvLoc);
                    });
                    if (cssp.GoogleMap.MarkerTextLength < 3) {
                        cssp.GoogleMap.MarkerTextLength = 3;
                    }
                    cssp.GoogleMap.FillTVItemObjects(mapItems_1, true);
                    $("#TideSiteDiv").find(".jbMapShowItem").removeClass("hidden");
                }
            };
            this.TideSitesFindWithinDistance = function () {
                var TideSiteDiv$ = $("#TideSiteDiv");
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var Radius_km = parseInt($("#TideSiteDiv").find("input[name='Radius_km']").val());
                var command = "TideSite/_subsectorTideSites";
                $.get(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    Radius_km: Radius_km
                })
                    .done(function (ret) {
                    TideSiteDiv$.find(".TideSiteInfoDiv").html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                    $("#TideSiteDiv").find(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.TideSitesAddToUse = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.TideSitesToUseForSubsectorVerifyAndSave = function ($bjs) {
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var TideSiteTVItemIDList = "";
                $("#TideSiteDiv").find("button.jbTideSiteAddToUse").each(function (ind, elem) {
                    if ($(elem).hasClass("btn-success")) {
                        var TideSiteTVItemID = parseInt($(elem).closest(".TideSiteUsedAndWithinDistance").data("tidesitetvitemid"));
                        TideSiteTVItemIDList = TideSiteTVItemIDList + TideSiteTVItemID + ",";
                    }
                });
                var command = "TideSite/TideSitesToUseForSubsectorVerifyAndSaveJSON";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    TideSiteTVItemIDList: TideSiteTVItemIDList
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
        }
        return TideSite;
    }());
    CSSP.TideSite = TideSite;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.TideSite.js.map