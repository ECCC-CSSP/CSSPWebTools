var CSSP;
(function (CSSP) {
    var DrogueRun = (function () {
        // Constructor
        function DrogueRun() {
            // Variables
            this.polyArr = [];
            this.polyCrossArr = [];
            // Function
            this.DrogueRunAskToDelete = function ($bjs) {
                var DrogueNumberText = $bjs.data("droguenumber");
                cssp.Dialog.ShowDialogAreYouSure(DrogueNumberText);
                cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.DrogueRun.SetDialogEvents", $bjs);
            };
            this.DrogueRunAddOrEditSave = function ($bjs) {
                var $form = $bjs.closest("form");
                if ($form.length == 0) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("form", "DrogueRunAdd");
                    return;
                }
                if (!$form.valid || $form.valid()) {
                    if (cssp.CheckInputWithNumbers()) {
                        cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                        return;
                    }
                    var command = $form.attr("action");
                    $.post(cssp.BaseURL + command, $form.serializeArray())
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
                }
            };
            this.DrogueRunShowAdd = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".DrogueRunsTop").find(".DrogueRunAdd").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".DrogueRunsTop").find(".DrogueRunAdd").removeClass("hidden").addClass("hidden");
                }
            };
            this.DrogueRunShowEdit = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".DrogueRunDiv").find(".DrogueRunEdit").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".DrogueRunDiv").find(".DrogueRunEdit").removeClass("hidden").addClass("hidden");
                }
            };
            this.DrogueRunViewData = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    $bjs.closest(".DrogueRunDiv").find(".DrogueRunDataDiv").removeClass("hidden");
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    $bjs.closest(".DrogueRunDiv").find(".DrogueRunDataDiv").removeClass("hidden").addClass("hidden");
                }
            };
            this.DrogueRunShowOnMap = function ($bjs) {
                var DrogueRunID = parseInt($bjs.data("droguerunid"));
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    var MiLat_1 = 90.0;
                    var MiLng_1 = 180.0;
                    var MaLat_1 = -90.0;
                    var MaLng_1 = -180.0;
                    var CoordList_1 = [];
                    var map = cssp.GoogleMap.Map;
                    var lineSymbol = { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW };
                    cssp.GoogleMap.CrossVisible = false;
                    $bjs.closest(".DrogueRunBody").find(".jbDrogueRunPointerShowOnMap").each(function (index, elem) {
                        var lat = parseFloat($(elem).data("lat"));
                        var lng = parseFloat($(elem).data("lng"));
                        if (MiLat_1 > lat) {
                            MiLat_1 = lat;
                        }
                        if (MaLat_1 < lat) {
                            MaLat_1 = lat;
                        }
                        if (MiLng_1 > lng) {
                            MiLng_1 = lng;
                        }
                        if (MaLng_1 < lng) {
                            MaLng_1 = lng;
                        }
                        CoordList_1.push(new google.maps.LatLng(lat, lng));
                    });
                    var polyl = new google.maps.Polyline({
                        path: CoordList_1,
                        strokeColor: '#00FF00',
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        map: cssp.GoogleMap.Map,
                        icons: [{
                                icon: lineSymbol,
                                offset: '100%'
                            }],
                        zIndex: DrogueRunID,
                    });
                    cssp.DrogueRun.polyArr.push(polyl);
                    var sw = new google.maps.LatLng(MiLat_1 - 0.01, MiLng_1 - 0.01);
                    var ne = new google.maps.LatLng(MaLat_1 + 0.01, MaLng_1 + 0.01);
                    if (CoordList_1.length > 0) {
                        var fBounds = new google.maps.LatLngBounds(sw, ne);
                        if (map)
                            map.fitBounds(fBounds);
                    }
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    for (var i = 0, count = cssp.DrogueRun.polyArr.length; i < count; i++) {
                        if (cssp.DrogueRun.polyArr[i].zIndex == DrogueRunID) {
                            cssp.DrogueRun.polyArr[i].setMap(null);
                            cssp.DrogueRun.polyArr.splice(i, 1);
                        }
                    }
                }
            };
            this.DrogueRunPointerShowOnMap = function ($bjs) {
                var lat = parseFloat($bjs.data("lat"));
                var lng = parseFloat($bjs.data("lng"));
                $bjs.closest(".DrogueRunsTop").find(".jbDrogueRunPointerShowOnMap").each(function (index, elem) {
                    if ($(elem).data("droguerunpositionid") != $bjs.data("droguerunpositionid")) {
                        if ($(elem).hasClass("btn-success")) {
                            $(elem).removeClass("btn-success").addClass("btn-default");
                        }
                    }
                });
                if ($bjs.hasClass("btn-default")) {
                    $bjs.removeClass("btn-default").addClass("btn-success");
                    cssp.DrogueRun.DrogueRunPositionDrawCrossAtLatLng(lat, lng);
                }
                else {
                    $bjs.removeClass("btn-success").addClass("btn-default");
                    for (var i = 0, count = cssp.DrogueRun.polyCrossArr.length; i < count; i++) {
                        cssp.DrogueRun.polyCrossArr[i].setMap(null);
                    }
                    cssp.DrogueRun.polyArr = [];
                }
            };
            this.DrogueRunPositionDrawCrossAtLatLng = function (Lat, Lng) {
                for (var i = 0, count = cssp.DrogueRun.polyCrossArr.length; i < count; i++) {
                    cssp.DrogueRun.polyCrossArr[i].setMap(null);
                }
                cssp.DrogueRun.polyArr = [];
                var CurrentPoint = new google.maps.LatLng(Lat, Lng);
                if (Lat != 0.0) {
                    var CurrentBound = cssp.GoogleMap.Map.getBounds();
                    var sw = CurrentBound.getSouthWest();
                    var ne = CurrentBound.getNorthEast();
                    var CoordList = [];
                    CoordList.push(new google.maps.LatLng(sw.lat(), sw.lng()));
                    CoordList.push(new google.maps.LatLng(CurrentPoint.lat(), CurrentPoint.lng()));
                    CoordList.push(new google.maps.LatLng(sw.lat(), ne.lng()));
                    var polyl1 = new google.maps.Polyline({
                        path: CoordList,
                        strokeColor: '#FCF',
                        strokeOpacity: 0.5,
                        strokeWeight: 2,
                        map: cssp.GoogleMap.Map,
                        zIndex: 200,
                    });
                    cssp.DrogueRun.polyCrossArr.push(polyl1);
                    var CoordList2 = [];
                    CoordList2.push(new google.maps.LatLng(ne.lat(), sw.lng()));
                    CoordList2.push(new google.maps.LatLng(CurrentPoint.lat(), CurrentPoint.lng()));
                    CoordList2.push(new google.maps.LatLng(ne.lat(), ne.lng()));
                    var polyl2 = new google.maps.Polyline({
                        path: CoordList2,
                        strokeColor: '#FCF',
                        strokeOpacity: 0.5,
                        strokeWeight: 2,
                        map: cssp.GoogleMap.Map,
                        zIndex: 200,
                    });
                    cssp.DrogueRun.polyCrossArr.push(polyl2);
                }
            };
            this.SetDialogEvents = function ($bjs) {
                $("#DialogBasicYes").one("click", function (evt) {
                    $("#DialogBasic").one('hidden.bs.modal', function () {
                        var DrogueRunID = parseInt($bjs.data("droguerunid"));
                        var command = "DrogueRun/DroguerunDeleteJSON";
                        $.post(cssp.BaseURL + command, {
                            DrogueRunID: DrogueRunID,
                        }).done(function (ret) {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.Helper.PageRefresh();
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                    });
                });
            };
        }
        return DrogueRun;
    }());
    CSSP.DrogueRun = DrogueRun;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.DrogueRun.js.map