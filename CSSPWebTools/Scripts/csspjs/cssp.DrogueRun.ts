module CSSP {
    export class DrogueRun {
        // Variables
        private polyArr: google.maps.Polyline[] = [];
        private polyCrossArr: google.maps.Polyline[] = [];

        // Constructor
        constructor() {
        }

        // Function
        public DrogueRunAskToDelete: Function = ($bjs: JQuery): void => {
            let DrogueNumberText: string = $bjs.data("droguenumber");
            cssp.Dialog.ShowDialogAreYouSure(DrogueNumberText);
            cssp.Dialog.CheckDialogAndButtonsExist(["#DialogBasic", "#DialogBasicYes"], 5, "cssp.DrogueRun.SetDialogEvents", $bjs);
        };
        public DrogueRunAddOrEditSave: Function = ($bjs: JQuery): void => {
            var $form: JQuery = $bjs.closest("form");
            if ($form.length == 0) {
                cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_("form", "DrogueRunAdd");
                return;
            }

            if (!$form.valid || $form.valid()) {
                if (cssp.CheckInputWithNumbers()) {
                    cssp.Dialog.ShowDialogErrorWithPleaseEnterValidNumber(cssp.GetHTMLVariable("#LayoutVariables", "varPleaseUseCommaOrDotForDecimal"));
                    return;
                }
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
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
            }
        };
        public DrogueRunShowAdd: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".DrogueRunsTop").find(".DrogueRunAdd").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".DrogueRunsTop").find(".DrogueRunAdd").removeClass("hidden").addClass("hidden");
            }
        };
        public DrogueRunShowEdit: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".DrogueRunDiv").find(".DrogueRunEdit").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".DrogueRunDiv").find(".DrogueRunEdit").removeClass("hidden").addClass("hidden");
            }
        };
        public DrogueRunViewData: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                $bjs.closest(".DrogueRunDiv").find(".DrogueRunDataDiv").removeClass("hidden");
            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                $bjs.closest(".DrogueRunDiv").find(".DrogueRunDataDiv").removeClass("hidden").addClass("hidden");
            }
        };
        public DrogueRunShowOnMap: Function = ($bjs: JQuery): void => {
            let DrogueRunID: number = parseInt($bjs.data("droguerunid"));
            if ($bjs.hasClass("btn-default")) {
                $bjs.removeClass("btn-default").addClass("btn-success");
                let MiLat: number = 90.0;
                let MiLng: number = 180.0;
                let MaLat: number = -90.0;
                let MaLng: number = -180.0;
                let CoordList = [];
                let map: google.maps.Map = cssp.GoogleMap.Map;
                let lineSymbol = { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW };
                cssp.GoogleMap.CrossVisible = false;
                $bjs.closest(".DrogueRunBody").find(".jbDrogueRunPointerShowOnMap").each((index: number, elem: Element) => {
                    let lat: number = parseFloat($(elem).data("lat"));
                    let lng: number = parseFloat($(elem).data("lng"));
                    if (MiLat > lat) {
                        MiLat = lat;
                    }
                    if (MaLat < lat) {
                        MaLat = lat;
                    }
                    if (MiLng > lng) {
                        MiLng = lng;
                    }
                    if (MaLng < lng) {
                        MaLng = lng;
                    }

                    CoordList.push(new google.maps.LatLng(lat, lng));
                });

                let polyl: google.maps.Polyline = new google.maps.Polyline({
                    path: CoordList,
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

                var sw: google.maps.LatLng = new google.maps.LatLng(MiLat - 0.01, MiLng - 0.01);
                var ne: google.maps.LatLng = new google.maps.LatLng(MaLat + 0.01, MaLng + 0.01);
                if (CoordList.length > 0) {
                    var fBounds = new google.maps.LatLngBounds(sw, ne);

                    if (map)
                        map.fitBounds(fBounds);
                }

            }
            else {
                $bjs.removeClass("btn-success").addClass("btn-default");
                for (let i = 0, count = cssp.DrogueRun.polyArr.length; i < count; i++) {
                    if (cssp.DrogueRun.polyArr[i].zIndex == DrogueRunID) {
                        cssp.DrogueRun.polyArr[i].setMap(null);
                        cssp.DrogueRun.polyArr.splice(i, 1);
                    }
                }
            }
        };
        public DrogueRunPointerShowOnMap: Function = ($bjs: JQuery): void => {
            let lat: number = parseFloat($bjs.data("lat"));
            let lng: number = parseFloat($bjs.data("lng"));

            $bjs.closest(".DrogueRunsTop").find(".jbDrogueRunPointerShowOnMap").each((index: number, elem: Element) => {
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
                for (let i = 0, count = cssp.DrogueRun.polyCrossArr.length; i < count; i++) {
                    cssp.DrogueRun.polyCrossArr[i].setMap(null);
                }
                cssp.DrogueRun.polyArr = [];
            }
        };
        public DrogueRunPositionDrawCrossAtLatLng: Function = (Lat: number, Lng: number): void => {
            for (let i = 0, count = cssp.DrogueRun.polyCrossArr.length; i < count; i++) {
                    cssp.DrogueRun.polyCrossArr[i].setMap(null);
            }
            cssp.DrogueRun.polyArr = [];
            var CurrentPoint: google.maps.LatLng = new google.maps.LatLng(Lat, Lng);
            if (Lat != 0.0) {
                var CurrentBound: google.maps.LatLngBounds = cssp.GoogleMap.Map.getBounds()
                var sw = CurrentBound.getSouthWest();
                var ne = CurrentBound.getNorthEast();

                var CoordList = [];
                CoordList.push(new google.maps.LatLng(sw.lat(), sw.lng()));
                CoordList.push(new google.maps.LatLng(CurrentPoint.lat(), CurrentPoint.lng()));
                CoordList.push(new google.maps.LatLng(sw.lat(), ne.lng()));
                var polyl1: google.maps.Polyline = new google.maps.Polyline({
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
                var polyl2: google.maps.Polyline = new google.maps.Polyline({
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
        public SetDialogEvents: Function = ($bjs: JQuery) => {
            $("#DialogBasicYes").one("click", (evt) => {
                $("#DialogBasic").one('hidden.bs.modal', () => {
                    let DrogueRunID: number = parseInt($bjs.data("droguerunid"));
                    var command: string = "DrogueRun/DroguerunDeleteJSON";
                    $.post(cssp.BaseURL + command,
                        {
                            DrogueRunID: DrogueRunID,
                        }).done((ret) => {
                            if (ret) {
                                cssp.Dialog.ShowDialogErrorWithError(ret);
                            }
                            else {
                                cssp.Helper.PageRefresh();
                            }
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                        });
                });
            });
        };
    }
}