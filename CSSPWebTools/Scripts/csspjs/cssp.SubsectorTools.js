var CSSP;
(function (CSSP) {
    var SubsectorTools = /** @class */ (function () {
        // Variables
        // Constructors
        function SubsectorTools() {
            // Functions
            this.SubsectorToolsLoadSubPage = function ($bjs) {
                cssp.GoogleMap.TVItemObjects = [];
                var mapItems = [];
                cssp.GoogleMap.FillTVItemObjects(mapItems, true);
                var $SubsectorToolsSubDiv = $bjs.closest(".SubsectorToolsTopDiv").find(".SubsectorToolsSubDiv");
                $SubsectorToolsSubDiv.html(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                $bjs.removeClass("btn-default").addClass("btn-success");
                var command = $bjs.data("page");
                $(".jbSubsectorToolsLoadSubPage").each(function (index, elem) {
                    if ($(elem).hasClass("btn-success")) {
                        $(elem).removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
                    }
                });
                $.get(cssp.BaseURL + command)
                    .done(function (ret) {
                    $SubsectorToolsSubDiv.html(ret);
                    $bjs.removeClass("btn-default").removeClass("btn-success").addClass("btn-success");
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                    $bjs.removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
                });
            };
            this.Init = function () {
                if ($("a.GlobeIcon").hasClass("btn-default")) {
                    $("#MunicipalityDiv").find(".ClickGlobeToViewOnMap").removeClass("hidden");
                }
                else {
                    $("#MunicipalityDiv").find(".jbMunicipalitiesShowOnMap").removeClass("hidden");
                }
            };
            this.MunicipalitiesShowOnMap = function () {
                var MunicipalityDiv$ = $("#MunicipalityDiv");
                if ($("a.GlobeIcon").hasClass("btn-success")) {
                    var mapItems_1 = [];
                    cssp.GoogleMap.FillTVItemObjects(mapItems_1, true);
                    MunicipalityDiv$.find("button.jbMapShowItem").removeClass("hidden");
                    MunicipalityDiv$.find("div.MunicipalityUsedAndWithinDistance").each(function (ind, elem) {
                        var TVItemID = parseInt($(elem).data("municipalitytvitemid"));
                        var TVText = $(elem).find(".MunicipalityCount").text() + " - " + $(elem).find(".jbMunicipalitiesAddToUse").text();
                        var TVType = CSSP.TVTypeEnum.MWQMSite;
                        var SubTVType = ($(elem).find(".jbMunicipalitiesAddToUse").hasClass("btn-default") ? CSSP.TVTypeEnum.Failed : CSSP.TVTypeEnum.Passed);
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
                    $("#MunicipalityDiv").find(".jbMapShowItem").removeClass("hidden");
                }
            };
            this.MunicipalitiesFindWithinDistance = function () {
                var MunicipalityDiv$ = $("#MunicipalityDiv");
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var Radius_km = parseInt($("#MunicipalityDiv").find("input[name='Radius_km']").val());
                var command = "SubsectorTools/_subsectorMunicipalities";
                $.get(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    Radius_km: Radius_km
                })
                    .done(function (ret) {
                    MunicipalityDiv$.find(".MunicipalityInfoDiv").html(ret);
                    cssp.GoogleMap.ReadAndShowObjects(true);
                    $("#MunicipalityDiv").find(".jbMapShowItem").removeClass("hidden").addClass("hidden");
                })
                    .fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MunicipalitiesAddToUse = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.MunicipalitiesToUseForSubsectorVerifyAndSave = function ($bjs) {
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var MunicipalityTVItemIDList = "";
                $("#MunicipalityDiv").find("button.jbMunicipalitiesAddToUse").each(function (ind, elem) {
                    if ($(elem).hasClass("btn-success")) {
                        var MunicipalityTVItemID = parseInt($(elem).closest(".MunicipalityUsedAndWithinDistance").data("municipalitytvitemid"));
                        MunicipalityTVItemIDList = MunicipalityTVItemIDList + MunicipalityTVItemID + ",";
                    }
                });
                var command = "SubsectorTools/MunicipalitiesToUseForSubsectorVerifyAndSaveJSON";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    MunicipalityTVItemIDList: MunicipalityTVItemIDList
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
        return SubsectorTools;
    }());
    CSSP.SubsectorTools = SubsectorTools;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.SubsectorTools.js.map