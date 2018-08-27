var CSSP;
(function (CSSP) {
    var GoogleMap = (function () {
        // Function
        function GoogleMap() {
            // Variables
            this.MapEditPointForm = ".MapEditPointForm";
            this.MinLat = 90;
            this.MaxLat = -90;
            this.MinLng = 180;
            this.MaxLng = -180;
            this.url = "";
            this.url3 = "";
            this.url4 = "";
            this.UseImage = false;
            this.IsLabel = false;
            this.infoWindow = new google.maps.InfoWindow();
            this.drawingManager = new google.maps.drawing.DrawingManager();
            this.Editing = false;
            this.EditingZIndex = 0;
            this.ZIndexPointBase = 10000000;
            this.ZIndexPolylineBase = 1000000;
            this.ZIndexPolygonBase = 100000;
            this.MarkerTextLength = 1;
            this.MVCCrossPolylines = new google.maps.MVCArray([]);
            this.MVCObjPoints = new google.maps.MVCArray([]);
            this.MVCObjPolygons = new google.maps.MVCArray([]);
            this.MVCObjPolylines = new google.maps.MVCArray([]);
            this.ErrorText = "";
            this.GoogleMapStarted = false;
            this.TVItemObjects = [];
            this.CrossVisible = false;
            this.itemsDropDown = [];
            this.LegendArr = [];
            this.MoveLabel = false;
            // Functions
            this.ChangeNodesInMapObj = function (Poly, MIPID, i, j) {
                cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList.length = 0;
                for (var k = 0, CountCoords = Poly.getLength(); k < CountCoords; k++) {
                    cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList.push(new CSSP.Coord(Poly.getAt(k).lat(), Poly.getAt(k).lng(), k));
                }
            };
            this.ClearEdit = function () {
                cssp.GoogleMap.MVCObjPoints.forEach(function (elem, ind) {
                    elem.set("draggable", false);
                    elem.set("editable", false);
                });
                cssp.GoogleMap.MVCObjPolylines.forEach(function (elem, ind) {
                    elem.set("draggable", false);
                    elem.set("editable", false);
                });
                cssp.GoogleMap.MVCObjPolygons.forEach(function (elem, ind) {
                    elem.set("draggable", false);
                    elem.set("editable", false);
                });
            };
            this.CreateMarker = function (i, j, k, color, TVType, LatAverage, LngAverage) {
                //let LineLengthLat: number = 0.001;
                //let LineLengthLng: number = 0.001;
                var zIndex = cssp.GoogleMap.ZIndexPointBase + cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID;
                var mark = new google.maps.Marker();
                //if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList.length == 2) {
                //    if (cssp.GoogleMap.TVItemObjects[i].TVType == TVTypeEnum.MWQMSite || cssp.GoogleMap.TVItemObjects[i].TVType == TVTypeEnum.PolSourceSite) {
                //        let AnchorNumber: number = 0;
                //        if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat >= LatAverage && cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng >= LngAverage) {
                //            AnchorNumber = 7; //BOTTOM_LEFT
                //            LineLengthLat = LineLengthLat * 1;
                //            LineLengthLng = LineLengthLng * 1;
                //        }
                //        else if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat < LatAverage && cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng >= LngAverage) {
                //            AnchorNumber = 1; //TOP_LEFT
                //            LineLengthLat = LineLengthLat * -1;
                //            LineLengthLng = LineLengthLng * 1;
                //        }
                //        else if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat < LatAverage && cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng < LngAverage) {
                //            AnchorNumber = 3; //TOP_RIGHT
                //            LineLengthLat = LineLengthLat * -1;
                //            LineLengthLng = LineLengthLng * -1;
                //        }
                //        else if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat > LatAverage && cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng < LngAverage) {
                //            AnchorNumber = 9; //BOTTOM_RIGHT
                //            LineLengthLat = LineLengthLat * 1;
                //            LineLengthLng = LineLengthLng * -1;
                //        }
                //        else {
                //            AnchorNumber = 7; //BOTTOM_LEFT
                //        }
                //        var CoordList = [];
                //        CoordList.push(new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng));
                //        CoordList.push(new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat + LineLengthLat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng + LineLengthLng));
                //        let polyl: google.maps.Polyline = new google.maps.Polyline({
                //            path: CoordList,
                //            strokeColor: '#9F9',
                //            strokeOpacity: 1,
                //            strokeWeight: 1,
                //            map: cssp.GoogleMap.Map,
                //            zIndex: zIndex,
                //        });
                //        cssp.GoogleMap.MVCObjPolylines.push(polyl);
                //        let div = document.createElement('div');
                //        let text = (cssp.GoogleMap.TVItemObjects[i].TVText.length > 0 ?
                //            (cssp.GoogleMap.TVItemObjects[i].TVText.length <= cssp.GoogleMap.MarkerTextLength
                //                ? cssp.GoogleMap.TVItemObjects[i].TVText
                //                : cssp.GoogleMap.TVItemObjects[i].TVText.substring(0, cssp.GoogleMap.MarkerTextLength))
                //            : "");
                //        div.innerHTML = '<div class="my-other-marker" style="background-color:#' + color + '">' + text + '</div>';
                //        mark = new RichMarker(
                //            {
                //                map: cssp.GoogleMap.Map,
                //                position: new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat + LineLengthLat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng + LineLengthLng),
                //                draggable: true,
                //                flat: true,
                //                anchor: AnchorNumber,
                //                content: div
                //            });
                //    }
                //    else {
                //        let div = document.createElement('div');
                //        let text = (cssp.GoogleMap.TVItemObjects[i].TVText.length > 0 ?
                //            (cssp.GoogleMap.TVItemObjects[i].TVText.length <= cssp.GoogleMap.MarkerTextLength
                //                ? cssp.GoogleMap.TVItemObjects[i].TVText
                //                : cssp.GoogleMap.TVItemObjects[i].TVText.substring(0, cssp.GoogleMap.MarkerTextLength))
                //            : "");
                //        div.innerHTML = '<div class="my-other-marker" style="background-color:#' + color + '">' + text + '</div>';
                //        mark = new RichMarker(
                //            {
                //                map: cssp.GoogleMap.Map,
                //                position: new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng),
                //                draggable: true,
                //                flat: true,
                //                anchor: 5, //MIDDLE
                //                content: div
                //            });
                //    }
                //    //var CoordList = [];
                //    //CoordList.push(new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng));
                //    //CoordList.push(new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k + 1].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k + 1].Lng));
                //    //let polyl: google.maps.Polyline = new google.maps.Polyline({
                //    //    path: CoordList,
                //    //    strokeColor: '#9F9',
                //    //    strokeOpacity: 1,
                //    //    strokeWeight: 1,
                //    //    map: cssp.GoogleMap.Map,
                //    //    zIndex: zIndex,
                //    //});
                //    //cssp.GoogleMap.MVCObjPolylines.push(polyl);
                //    //mark = new StyledMarker(
                //    //    {
                //    //        styleIcon: (new StyledIcon(
                //    //            StyledIconTypes.BUBBLE,
                //    //            {
                //    //                color: color,
                //    //                text: (cssp.GoogleMap.TVItemObjects[i].TVText.length > 0 ?
                //    //                    (cssp.GoogleMap.TVItemObjects[i].TVText.length <= cssp.GoogleMap.MarkerTextLength
                //    //                        ? encodeURIComponent(cssp.GoogleMap.TVItemObjects[i].TVText)
                //    //                        : encodeURIComponent(cssp.GoogleMap.TVItemObjects[i].TVText.substring(0, cssp.GoogleMap.MarkerTextLength)))
                //    //                    : ""),
                //    //            })),
                //    //        position: new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k + 1].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k + 1].Lng),
                //    //        map: cssp.GoogleMap.Map,
                //    //        draggable: cssp.GoogleMap.Editing,
                //    //        raiseOnDrag: true,
                //    //        zIndex: zIndex,
                //    //    });
                //}
                //else {
                //    if (cssp.GoogleMap.TVItemObjects[i].TVType == TVTypeEnum.MWQMSite || cssp.GoogleMap.TVItemObjects[i].TVType == TVTypeEnum.PolSourceSite) {
                //        let AnchorNumber: number = 0;
                //        if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat >= LatAverage && cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng >= LngAverage) {
                //            AnchorNumber = 7; //BOTTOM_LEFT
                //            LineLengthLat = LineLengthLat * 1;
                //            LineLengthLng = LineLengthLng * 1;
                //        }
                //        else if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat < LatAverage && cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng >= LngAverage) {
                //            AnchorNumber = 1; //TOP_LEFT
                //            LineLengthLat = LineLengthLat * -1;
                //            LineLengthLng = LineLengthLng * 1;
                //        }
                //        else if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat < LatAverage && cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng < LngAverage) {
                //            AnchorNumber = 3; //TOP_RIGHT
                //            LineLengthLat = LineLengthLat * -1;
                //            LineLengthLng = LineLengthLng * -1;
                //        }
                //        else if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat > LatAverage && cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng < LngAverage) {
                //            AnchorNumber = 9; //BOTTOM_RIGHT
                //            LineLengthLat = LineLengthLat * 1;
                //            LineLengthLng = LineLengthLng * -1;
                //        }
                //        else {
                //            AnchorNumber = 7; //BOTTOM_LEFT
                //        }
                //        var CoordList = [];
                //        CoordList.push(new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng));
                //        CoordList.push(new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat + LineLengthLat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng + LineLengthLng));
                //        let polyl: google.maps.Polyline = new google.maps.Polyline({
                //            path: CoordList,
                //            strokeColor: '#9F9',
                //            strokeOpacity: 1,
                //            strokeWeight: 1,
                //            map: cssp.GoogleMap.Map,
                //            zIndex: zIndex,
                //        });
                //        cssp.GoogleMap.MVCObjPolylines.push(polyl);
                //        let div = document.createElement('div');
                //        let text = (cssp.GoogleMap.TVItemObjects[i].TVText.length > 0 ?
                //            (cssp.GoogleMap.TVItemObjects[i].TVText.length <= cssp.GoogleMap.MarkerTextLength
                //                ? cssp.GoogleMap.TVItemObjects[i].TVText
                //                : cssp.GoogleMap.TVItemObjects[i].TVText.substring(0, cssp.GoogleMap.MarkerTextLength))
                //            : "");
                //        div.innerHTML = '<div class="my-other-marker" style="background-color:#' + color + '">' + text + '</div>';
                //        mark = new RichMarker(
                //            {
                //                map: cssp.GoogleMap.Map,
                //                position: new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat + LineLengthLat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng + LineLengthLng),
                //                draggable: true,
                //                flat: true,
                //                anchor: AnchorNumber,
                //                content: div
                //            });
                //    }
                //    else {
                //        let div = document.createElement('div');
                //        let text = (cssp.GoogleMap.TVItemObjects[i].TVText.length > 0 ?
                //            (cssp.GoogleMap.TVItemObjects[i].TVText.length <= cssp.GoogleMap.MarkerTextLength
                //                ? cssp.GoogleMap.TVItemObjects[i].TVText
                //                : cssp.GoogleMap.TVItemObjects[i].TVText.substring(0, cssp.GoogleMap.MarkerTextLength))
                //            : "");
                //        div.innerHTML = '<div class="my-other-marker" style="background-color:#' + color + '">' + text + '</div>';
                //        mark = new RichMarker(
                //            {
                //                map: cssp.GoogleMap.Map,
                //                position: new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng),
                //                draggable: true,
                //                flat: true,
                //                anchor: 5, //MIDDLE
                //                content: div
                //            });
                //    }
                //    //mark = new StyledMarker(
                //    //    {
                //    //        styleIcon: (new StyledIcon(
                //    //            StyledIconTypes.BUBBLE,
                //    //            {
                //    //                color: color,
                //    //                text: (cssp.GoogleMap.TVItemObjects[i].TVText.length > 0 ?
                //    //                    (cssp.GoogleMap.TVItemObjects[i].TVText.length <= cssp.GoogleMap.MarkerTextLength
                //    //                        ? encodeURIComponent(cssp.GoogleMap.TVItemObjects[i].TVText)
                //    //                        : encodeURIComponent(cssp.GoogleMap.TVItemObjects[i].TVText.substring(0, cssp.GoogleMap.MarkerTextLength)))
                //    //                    : ""),
                //    //            })),
                //    //        position: new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng),
                //    //        map: cssp.GoogleMap.Map,
                //    //        draggable: cssp.GoogleMap.Editing,
                //    //        raiseOnDrag: true,
                //    //        zIndex: zIndex,
                //    //    });
                //}
                mark = new StyledMarker({
                    styleIcon: (new StyledIcon(StyledIconTypes.BUBBLE, {
                        color: color,
                        text: (cssp.GoogleMap.TVItemObjects[i].TVText.length > 0 ?
                            (cssp.GoogleMap.TVItemObjects[i].TVText.length <= cssp.GoogleMap.MarkerTextLength
                                ? encodeURIComponent(cssp.GoogleMap.TVItemObjects[i].TVText)
                                : encodeURIComponent(cssp.GoogleMap.TVItemObjects[i].TVText.substring(0, cssp.GoogleMap.MarkerTextLength)))
                            : ""),
                    })),
                    position: new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng),
                    map: cssp.GoogleMap.Map,
                    draggable: cssp.GoogleMap.Editing,
                    raiseOnDrag: true,
                    zIndex: zIndex,
                });
                //   http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/examples.html
                google.maps.event.addListener(mark, 'click', function () {
                    cssp.GoogleMap.infoWindow.setContent("<div class=\"MapMarkerDiv\">" + cssp.GetHTMLVariable("#LayoutVariables", "varInProgress") + "</div>");
                    cssp.GoogleMap.infoWindow.open(cssp.GoogleMap.Map, mark);
                    var command = "Map/_mapMarkerClickInfo";
                    $.get(cssp.BaseURL + command, {
                        Q: document.location.href.substring(document.location.href.indexOf("!View")),
                        TVItemID: cssp.GoogleMap.TVItemObjects[i].TVItemID,
                    }).done(function (ret) {
                        $(".MapMarkerDiv").replaceWith(ret);
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                });
                google.maps.event.addListener(mark, 'rightclick', function () {
                    if (cssp.GoogleMap.MoveLabel) {
                        var MapInfoID = mark.getZIndex() - cssp.GoogleMap.ZIndexPointBase;
                        var Lat = mark.getPosition().lat();
                        var Lng = mark.getPosition().lng();
                        cssp.GoogleMap.MapDeleteLabel(MapInfoID, Lat, Lng);
                    }
                });
                google.maps.event.addListener(mark, 'dragstart', function () {
                    cssp.GoogleMap.DragStartPos = mark.getPosition();
                });
                google.maps.event.addListener(mark, 'drag', function () {
                    if (cssp.GoogleMap.MoveLabel) {
                    }
                    else {
                        var contentString = "<div  class='ui-corner-all app-commentBox'>";
                        contentString += "<h4>" + cssp.GetHTMLVariable("#LayoutVariables", "varDraggingPoint") + "</h4 > ";
                        contentString += "Lat: " + mark.getPosition().lat().toFixed(6) + "<br />";
                        contentString += "Lng: " + mark.getPosition().lng().toFixed(6);
                        contentString += "</div>";
                        cssp.GoogleMap.infoWindow.setContent(contentString);
                        cssp.GoogleMap.infoWindow.open(cssp.GoogleMap.Map, mark);
                    }
                });
                google.maps.event.addListener(mark, 'dragend', function () {
                    if (cssp.GoogleMap.MoveLabel) {
                        var MapInfoID = mark.getZIndex() - cssp.GoogleMap.ZIndexPointBase;
                        var Lat = mark.getPosition().lat();
                        var Lng = mark.getPosition().lng();
                        cssp.GoogleMap.MapEditMoveLabelPointSave(MapInfoID, Lat, Lng);
                    }
                    else {
                        var contentString = "<div class='MapEditPointDiv app-infoBlock'>";
                        contentString += "<form name='MapEditPointForm' class='MapEditPointForm' method='post' action='Map/SavePointJSON'>";
                        contentString += "  <input type='hidden' name='MapInfoID' value='" + (mark.getZIndex() - cssp.GoogleMap.ZIndexPointBase).toString() + "' />";
                        contentString += "  <h5>" + cssp.GetHTMLVariable("#LayoutVariables", "varPreviousCoordinates") + "</h5>";
                        contentString += "  Lat: " + cssp.GoogleMap.DragStartPos.lat().toFixed(6) + ", Lng: " + cssp.GoogleMap.DragStartPos.lng().toFixed(6) + " <br / > ";
                        contentString += "  <h5>" + cssp.GetHTMLVariable("#LayoutVariables", "varActualCoordinates") + "</h5>";
                        contentString += "  Lat: <input type='text' name='Lat' class='isnumber form-control' value ='" + mark.getPosition().lat().toFixed(6) + "' / > ";
                        contentString += "  Lng: <input type='text' name='Lng' class='isnumber form-control' value='" + mark.getPosition().lng().toFixed(6) + "' /><br /></br> ";
                        contentString += "  <button class='jbMapEditPointSave btn btn-default'>" + cssp.GetHTMLVariable("#LayoutVariables", "varSave") + "</button>";
                        contentString += "  <button class='jbMapEditPointCancel btn btn-default'>" + cssp.GetHTMLVariable("#LayoutVariables", "varCancel") + "</button>";
                        contentString += "</form>";
                        contentString += "</div>";
                        cssp.GoogleMap.infoWindow.setContent(contentString);
                        cssp.GoogleMap.infoWindow.open(cssp.GoogleMap.Map, mark);
                    }
                });
                cssp.GoogleMap.MVCObjPoints.push(mark);
            };
            this.DoShowOrHideMap = function () {
                if ($(".GlobeIcon").hasClass("btn-success")) {
                    cssp.GoogleMap.ShowMap();
                }
                else {
                    cssp.GoogleMap.HideMap();
                }
            };
            this.DoMapResize = function (newColNumb) {
                $("#content").css("overflow", "auto").css("height", window.innerHeight - $("#content").offset().top - 60);
                $("#map_canvas").css("height", window.innerHeight - $("#TextPanelID").offset().top - 60);
                if (!$("#MapPanelID").hasClass("hidden")) {
                    cssp.GoogleMap.Resize();
                }
            };
            this.DrawCross = function (TVItemID) {
                for (var i = 0, CountObj = cssp.GoogleMap.MVCCrossPolylines.getLength(); i < CountObj; i++) {
                    google.maps.event.clearInstanceListeners(cssp.GoogleMap.MVCCrossPolylines.getAt(i));
                    cssp.GoogleMap.MVCCrossPolylines.getAt(i).setMap(null);
                }
                var CurrentPoint;
                for (var i = 0, CountItems = cssp.GoogleMap.TVItemObjects.length; i < CountItems; i++) {
                    if (cssp.GoogleMap.TVItemObjects[i].TVItemID == TVItemID) {
                        for (var j = 0, CountObj = cssp.GoogleMap.TVItemObjects[i].MapObjList.length; j < CountObj; j++) {
                            if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoDrawType == CSSP.DrawTypeEnum.Point) {
                                CurrentPoint = new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[0].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[0].Lng);
                            }
                        }
                    }
                }
                if (CurrentPoint) {
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
                    cssp.GoogleMap.MVCCrossPolylines.push(polyl1);
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
                    cssp.GoogleMap.MVCCrossPolylines.push(polyl2);
                    if (TVItemID == -1) {
                        cssp.GoogleMap.CrossVisible = false;
                    }
                    else {
                        cssp.GoogleMap.CrossVisible = true;
                    }
                }
            };
            this.DrawCrossAtLatLng = function (Lat, Lng) {
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
                    cssp.GoogleMap.MVCCrossPolylines.push(polyl1);
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
                    cssp.GoogleMap.MVCCrossPolylines.push(polyl2);
                }
            };
            this.DrawObjects = function () {
                for (var i = 0, CountObj = cssp.GoogleMap.MVCCrossPolylines.getLength(); i < CountObj; i++) {
                    google.maps.event.clearInstanceListeners(cssp.GoogleMap.MVCCrossPolylines.getAt(i));
                    cssp.GoogleMap.MVCCrossPolylines.getAt(i).setMap(null);
                }
                for (var i = 0, CountObj = cssp.GoogleMap.MVCObjPoints.getLength(); i < CountObj; i++) {
                    google.maps.event.clearInstanceListeners(cssp.GoogleMap.MVCObjPoints.getAt(i));
                    cssp.GoogleMap.MVCObjPoints.getAt(i).setMap(null);
                }
                for (var i = 0, CountObj = cssp.GoogleMap.MVCObjPolygons.getLength(); i < CountObj; i++) {
                    google.maps.event.clearInstanceListeners(cssp.GoogleMap.MVCObjPolygons.getAt(i));
                    cssp.GoogleMap.MVCObjPolygons.getAt(i).setMap(null);
                }
                for (var i = 0, CountObj = cssp.GoogleMap.MVCObjPolylines.getLength(); i < CountObj; i++) {
                    google.maps.event.clearInstanceListeners(cssp.GoogleMap.MVCObjPolylines.getAt(i));
                    cssp.GoogleMap.MVCObjPolylines.getAt(i).setMap(null);
                }
                cssp.GoogleMap.MVCCrossPolylines.clear();
                cssp.GoogleMap.MVCObjPoints.clear();
                cssp.GoogleMap.MVCObjPolygons.clear();
                cssp.GoogleMap.MVCObjPolylines.clear();
                cssp.GoogleMap.itemsDropDown = [];
                /*
                let LatAverage: number = 0.0;
                let LngAverage: number = 0.0;
                let LatTotal: number = 0.0;
                let LngTotal: number = 0.0;
                let count: number = 0.0;
                for (var i = 0, CountObj: number = cssp.GoogleMap.TVItemObjects.length; i < CountObj; i++) {
                    if (cssp.GoogleMap.TVItemObjects[i].TVType == TVTypeEnum.MWQMSite || cssp.GoogleMap.TVItemObjects[i].TVType == TVTypeEnum.PolSourceSite) {
                        count = count + 1;
                        LatTotal = LatTotal + cssp.GoogleMap.TVItemObjects[i].MapObjList[0].CoordList[0].Lat;
                        LngTotal = LngTotal + cssp.GoogleMap.TVItemObjects[i].MapObjList[0].CoordList[0].Lng;
                    }
                }
                LatAverage = LatTotal / count;
                LngAverage = LngTotal / count;
                */
                for (var i = 0, CountObj = cssp.GoogleMap.TVItemObjects.length; i < CountObj; i++) {
                    cssp.GoogleMap.DrawPolys(i, true);
                    cssp.GoogleMap.DrawPoints(i, true /*, LatAverage, LngAverage */);
                }
                $(".ObjLoaded").removeClass("hidden");
                $(".ObjNotLoaded").addClass("hidden");
                cssp.GoogleMap.CrossVisible = false;
            };
            this.DrawPoints = function (i, DoLatLng /*, LatAverage: number, LngAverage: number */) {
                var legendElem = undefined;
                var MapInfoID = cssp.GoogleMap.EditingZIndex - cssp.GoogleMap.ZIndexPointBase;
                for (var j = 0, CountObj = cssp.GoogleMap.TVItemObjects[i].MapObjList.length; j < CountObj; j++) {
                    if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoDrawType == CSSP.DrawTypeEnum.Point) {
                        if (DoLatLng) {
                            for (var k = 0, CountCoord = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList.length; k < CountCoord; k++) {
                                if (cssp.GoogleMap.MinLat > cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat) {
                                    cssp.GoogleMap.MinLat = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat;
                                }
                                if (cssp.GoogleMap.MaxLat < cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat) {
                                    cssp.GoogleMap.MaxLat = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat;
                                }
                                if (cssp.GoogleMap.MinLng > cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng) {
                                    cssp.GoogleMap.MinLng = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng;
                                }
                                if (cssp.GoogleMap.MaxLng < cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng) {
                                    cssp.GoogleMap.MaxLng = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng;
                                }
                            }
                        }
                        //for (var k = 0, CountCoord = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList.length; k < CountCoord; k++) {
                        for (var k = 0; k < 1; k++) {
                            var tempImage;
                            switch (cssp.GoogleMap.TVItemObjects[i].TVType) {
                                case CSSP.TVTypeEnum.Area:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Area, "00FFFF", cssp.GetHTMLVariable("#LayoutVariables", "varAreas")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.ClimateSite:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.ClimateSite, "33FFFF", cssp.GetHTMLVariable("#LayoutVariables", "varClimateSite")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.Country:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Country, "00FFFF", cssp.GetHTMLVariable("#LayoutVariables", "varCountry")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.HydrometricSite:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.HydrometricSite, "66CCFF", cssp.GetHTMLVariable("#LayoutVariables", "varHydrometricSite")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.TideSite:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.TideSite, "FFFF22", cssp.GetHTMLVariable("#LayoutVariables", "varTideSite")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.Sector:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Sector, "00FFFF", cssp.GetHTMLVariable("#LayoutVariables", "varSectors")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.Subsector:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Subsector, "00FFFF", cssp.GetHTMLVariable("#LayoutVariables", "varSubsectors")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.Province:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Province, "0000FF", cssp.GetHTMLVariable("#LayoutVariables", "varProvinces")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.MikeScenario:
                                    {
                                        switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                            case CSSP.TVTypeEnum.MeshNode:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.MeshNode, "777700", cssp.GetHTMLVariable("#LayoutVariables", "varMeshNode")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.WebTideNode:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.WebTideNode, "AA0000", cssp.GetHTMLVariable("#LayoutVariables", "varWebTideNode")));
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    break;
                                case CSSP.TVTypeEnum.MikeSource:
                                    {
                                        switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                            case CSSP.TVTypeEnum.MikeSourceIsRiver:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.MikeSourceIsRiver, "0000FF", cssp.GetHTMLVariable("#LayoutVariables", "varMikeSourceIsRiver")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.MikeSourceIncluded:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.MikeSourceIncluded, "00FF00", cssp.GetHTMLVariable("#LayoutVariables", "varMikeSourceIncluded")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.MikeSourceNotIncluded:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.MikeSourceNotIncluded, "CCCCCC", cssp.GetHTMLVariable("#LayoutVariables", "varMikeSourceNotIncluded")));
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    break;
                                case CSSP.TVTypeEnum.MikeBoundaryConditionMesh:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.MeshNode, "777700", cssp.GetHTMLVariable("#LayoutVariables", "varMeshNode")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.MikeBoundaryConditionWebTide:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.WebTideNode, "AA0000", cssp.GetHTMLVariable("#LayoutVariables", "varWebTideNode")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.Municipality:
                                    {
                                        legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Municipality, "FF7700", cssp.GetHTMLVariable("#LayoutVariables", "varMunicipalities")));
                                    }
                                    break;
                                case CSSP.TVTypeEnum.Infrastructure:
                                    {
                                        //legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Infrastructure, "EECCAA",
                                        //    cssp.GetHTMLVariable("#LayoutVariables", "varInfrastructures")));
                                        switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                            case CSSP.TVTypeEnum.WasteWaterTreatmentPlant:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.WasteWaterTreatmentPlant, "FF0000", cssp.GetHTMLVariable("#LayoutVariables", "varWWTP")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.LiftStation:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.LiftStation, "880000", cssp.GetHTMLVariable("#LayoutVariables", "varLiftStation")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.Outfall:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Outfall, "BB6600", cssp.GetHTMLVariable("#LayoutVariables", "varOutfall")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.LineOverflow:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.LineOverflow, "666600", cssp.GetHTMLVariable("#LayoutVariables", "varLineOverflow")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.OtherInfrastructure:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.LineOverflow, "888800", cssp.GetHTMLVariable("#LayoutVariables", "varLineOverflow")));
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    break;
                                case CSSP.TVTypeEnum.MWQMRun:
                                    {
                                        //legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.MWQMRun, "EE0f0f",
                                        //    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMSites")));
                                        switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                            case CSSP.TVTypeEnum.Passed:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Passed, "00FF00", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMMeetStandard")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.Failed:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Failed, "FF0000", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolation")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.NoDepuration:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.NoDepuration, "800080", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolationDepuration")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.NoData:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.NoData, "DDDDDD", cssp.GetHTMLVariable("#LayoutVariables", "varNoData")));
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    break;
                                case CSSP.TVTypeEnum.MWQMSite:
                                    {
                                        //legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.MWQMSite, "EE0f0f",
                                        //    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMSites")));
                                        switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                            case CSSP.TVTypeEnum.Passed:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Passed, "00FF00", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMMeetStandard")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.Failed:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Failed, "FF0000", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolation")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.NoDepuration:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.NoDepuration, "800080", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolationDepuration")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.LessThan10:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.LessThan10, "FF00FF", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMNotEnoughData")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.NoData:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.NoData, "DDDDDD", cssp.GetHTMLVariable("#LayoutVariables", "varNoData")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.SamplingPlan:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.NoData, "cccccc", cssp.GetHTMLVariable("#LayoutVariables", "varNoData")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.PolSourceSite:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.PolSourceSite, "FFFFFF", cssp.GetHTMLVariable("#LayoutVariables", "varPollutionSourceSites")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.WasteWaterTreatmentPlant:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.WasteWaterTreatmentPlant, "0000FF", cssp.GetHTMLVariable("#LayoutVariables", "varWWTP")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.LiftStation:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.LiftStation, "0000FF", cssp.GetHTMLVariable("#LayoutVariables", "varLiftStation")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.LineOverflow:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.LineOverflow, "0000FF", cssp.GetHTMLVariable("#LayoutVariables", "varLineOverflow")));
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    break;
                                case CSSP.TVTypeEnum.PolSourceSite:
                                    {
                                        switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                            case CSSP.TVTypeEnum.Passed:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Passed, "00FF00", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMMeetStandard")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.Failed:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.Failed, "FF0000", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolation")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.NoDepuration:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.NoDepuration, "800080", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolationDepuration")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.LessThan10:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.LessThan10, "FF00FF", cssp.GetHTMLVariable("#LayoutVariables", "varMWQMNotEnoughData")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.NoData:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.NoData, "DDDDDD", cssp.GetHTMLVariable("#LayoutVariables", "varNoData")));
                                                }
                                                break;
                                            case CSSP.TVTypeEnum.PolSourceSite:
                                                {
                                                    legendElem = cssp.GoogleMap.LegendSetup(new CSSP.LegendElem(CSSP.TVTypeEnum.PolSourceSite, "CCCCCC", cssp.GetHTMLVariable("#LayoutVariables", "varPollutionSourceSites")));
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                            //if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID == MapInfoID) {
                            //    IconType = CSSP.TVTypeEnum.Edit;
                            //    Color = "000000";
                            //    Legend = cssp.GetHTMLVariable("#LayoutVariables", "varEdit");
                            //    cssp.GoogleMap.itemsDropDown.push("<li><a href=\"#\"><span style='color: #" + Color + "'>" + Legend + "</span></a></li>");
                            //}
                            cssp.GoogleMap.CreateMarker(i, j, k, legendElem.Color, legendElem.TVType /*, LatAverage, LngAverage */);
                        }
                    }
                }
                $(".LegendPinObj").html(cssp.GoogleMap.itemsDropDown.join(""));
            };
            this.DrawPolys = function (i, DoLatLng) {
                var lineSymbol = { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW };
                for (var j = 0, CountMapObj = cssp.GoogleMap.TVItemObjects[i].MapObjList.length; j < CountMapObj; j++) {
                    if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoDrawType == CSSP.DrawTypeEnum.Polyline || cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoDrawType == CSSP.DrawTypeEnum.Polygon) {
                        var CoordList = [];
                        for (var k = 0, CountPoints = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList.length; k < CountPoints; k++) {
                            if (DoLatLng) {
                                if (cssp.GoogleMap.MinLat > cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat) {
                                    cssp.GoogleMap.MinLat = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat;
                                }
                                if (cssp.GoogleMap.MaxLat < cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat) {
                                    cssp.GoogleMap.MaxLat = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat;
                                }
                                if (cssp.GoogleMap.MinLng > cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng) {
                                    cssp.GoogleMap.MinLng = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng;
                                }
                                if (cssp.GoogleMap.MaxLng < cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng) {
                                    cssp.GoogleMap.MaxLng = cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng;
                                }
                            }
                            CoordList.push(new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[k].Lng));
                        }
                        if (CoordList.length > 0) {
                            if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoDrawType == CSSP.DrawTypeEnum.Polygon) {
                                var zIndex = cssp.GoogleMap.ZIndexPolygonBase + cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID;
                                var polyg = new google.maps.Polygon({
                                    paths: CoordList,
                                    strokeColor: '#FF0000',
                                    strokeOpacity: 1.0,
                                    strokeWeight: 2,
                                    fillColor: '#FF0000',
                                    fillOpacity: 0.0,
                                    map: cssp.GoogleMap.Map,
                                    zIndex: zIndex,
                                });
                                google.maps.event.addListener(polyg, 'click', function () {
                                    if (cssp.GoogleMap.Editing) {
                                        cssp.GoogleMap.ClearEdit();
                                        polyg.set("editable", true);
                                        cssp.GoogleMap.EditingZIndex = polyg.zIndex;
                                    }
                                    else {
                                        // nothing yet
                                    }
                                });
                                google.maps.event.addListener(polyg, 'mousemove', function (evt) {
                                    $("#CurrentLatLng").val(evt.latLng.lat().toString().substring(0, 8) + " " + evt.latLng.lng().toString().substring(0, 10));
                                });
                                google.maps.event.addListener(polyg, 'rightclick', function (event) {
                                    if (event.vertex != null) {
                                        var path = polyg.getPath();
                                        if (path.getLength() > 3) {
                                            path.removeAt(event.vertex);
                                        }
                                        //$(".MapEditSave").show();
                                    }
                                });
                                //google.maps.event.addListener(polyg, 'mousedown', function (event: google.maps.PolyMouseEvent) {
                                //    if (event.path != null || event.vertex != null || event.edge != null) {
                                //        $(".MapEditSave").show();
                                //    }
                                //});
                                cssp.GoogleMap.MVCObjPolygons.push(polyg);
                            }
                            else if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoDrawType == CSSP.DrawTypeEnum.Polyline) {
                                if (cssp.GoogleMap.TVItemObjects[i].TVType != CSSP.TVTypeEnum.Classification) {
                                    var zIndex = cssp.GoogleMap.ZIndexPolylineBase + cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID;
                                    var polyl = new google.maps.Polyline({
                                        path: CoordList,
                                        strokeColor: '#00FF00',
                                        strokeOpacity: 1.0,
                                        strokeWeight: 2,
                                        map: cssp.GoogleMap.Map,
                                        icons: [{
                                                icon: lineSymbol,
                                                offset: '100%'
                                            }],
                                        zIndex: zIndex,
                                    });
                                    polyl.setMap(cssp.GoogleMap.Map);
                                    google.maps.event.addListener(polyl, 'click', function () {
                                        if (cssp.GoogleMap.Editing) {
                                            cssp.GoogleMap.ClearEdit();
                                            polyl.set("editable", true);
                                            cssp.GoogleMap.EditingZIndex = polyl.zIndex;
                                        }
                                        else {
                                            // nothing yet
                                        }
                                    });
                                    google.maps.event.addListener(polyl, 'mousemove', function (evt) {
                                        $("#CurrentLatLng").val(evt.latLng.lat().toString().substring(0, 8) + " " + evt.latLng.lng().toString().substring(0, 10));
                                    });
                                    google.maps.event.addListener(polyl, 'rightclick', function (event) {
                                        if (event.vertex != null) {
                                            var path = polyl.getPath();
                                            if (path.getLength() > 2) {
                                                path.removeAt(event.vertex);
                                            }
                                            //$(".MapEditSave").show();
                                        }
                                    });
                                    cssp.GoogleMap.MVCObjPolylines.push(polyl);
                                }
                                if (cssp.GoogleMap.TVItemObjects[i].TVType == CSSP.TVTypeEnum.Classification) {
                                    var zIndex = cssp.GoogleMap.ZIndexPolylineBase + cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID;
                                    var polyl = new google.maps.Polyline({
                                        path: CoordList,
                                        strokeColor: '#ffffff',
                                        strokeOpacity: 1.0,
                                        strokeWeight: 1,
                                        map: cssp.GoogleMap.Map,
                                        zIndex: zIndex,
                                    });
                                    polyl.setMap(cssp.GoogleMap.Map);
                                    google.maps.event.addListener(polyl, 'click', function () {
                                        if (cssp.GoogleMap.Editing) {
                                            cssp.GoogleMap.ClearEdit();
                                            polyl.set("editable", true);
                                            cssp.GoogleMap.EditingZIndex = polyl.zIndex;
                                        }
                                        else {
                                            // nothing yet
                                        }
                                    });
                                    google.maps.event.addListener(polyl, 'mousemove', function (evt) {
                                        $("#CurrentLatLng").val(evt.latLng.lat().toString().substring(0, 8) + " " + evt.latLng.lng().toString().substring(0, 10));
                                    });
                                    google.maps.event.addListener(polyl, 'rightclick', function (event) {
                                        if (event.vertex != null) {
                                            var path = polyl.getPath();
                                            if (path.getLength() > 2) {
                                                path.removeAt(event.vertex);
                                            }
                                            //$(".MapEditSave").show();
                                        }
                                    });
                                    cssp.GoogleMap.MVCObjPolylines.push(polyl);
                                    var strokeColor = "#000000";
                                    switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                        case (CSSP.TVTypeEnum.Approved):
                                            {
                                                strokeColor = "#00FF00";
                                            }
                                            break;
                                        case (CSSP.TVTypeEnum.Restricted):
                                            {
                                                strokeColor = "#FF0000";
                                            }
                                            break;
                                        case (CSSP.TVTypeEnum.Prohibited):
                                            {
                                                strokeColor = "#cccccc";
                                            }
                                            break;
                                        case (CSSP.TVTypeEnum.ConditionallyApproved):
                                            {
                                                strokeColor = "#e1bd00";
                                            }
                                            break;
                                        case (CSSP.TVTypeEnum.ConditionallyRestricted):
                                            {
                                                strokeColor = "#9932cc";
                                            }
                                            break;
                                        default:
                                    }
                                    for (var i_1 = 0, count = CoordList.length - 1; i_1 < count; i_1++) {
                                        var spherical = google.maps.geometry.spherical;
                                        var F = new google.maps.LatLng(CoordList[i_1].lat(), CoordList[i_1].lng());
                                        var T = new google.maps.LatLng(CoordList[i_1 + 1].lat(), CoordList[i_1 + 1].lng());
                                        // M is the middle of [FT]
                                        var latM = (CoordList[i_1].lat() + CoordList[i_1 + 1].lat()) / 2;
                                        var longM = (CoordList[i_1].lng() + CoordList[i_1 + 1].lng()) / 2;
                                        var M = new google.maps.LatLng(latM, longM);
                                        // Get direction of the segment
                                        var heading = spherical.computeHeading(F, T);
                                        var dist = 50; // distance in meters
                                        // Place point A that is oriented at 90° in a distance of dist from M
                                        var A = spherical.computeOffset(M, dist, heading + 90);
                                        var perpendicularCoordinates = [F, T, A, F];
                                        var polyg = new google.maps.Polygon({
                                            paths: perpendicularCoordinates,
                                            strokeColor: strokeColor,
                                            strokeOpacity: 1.0,
                                            strokeWeight: 2,
                                            fillColor: strokeColor,
                                            fillOpacity: 1.0,
                                            map: cssp.GoogleMap.Map,
                                            zIndex: zIndex,
                                        });
                                        polyg.setMap(cssp.GoogleMap.Map);
                                        cssp.GoogleMap.MVCObjPolygons.push(polyg);
                                    }
                                }
                            }
                            else {
                                // this would be an error
                            }
                        }
                    }
                }
            };
            this.FillTVItemObjects = function (mapItems, Recenter) {
                cssp.GoogleMap.LegendArr = new Array();
                var map = cssp.GoogleMap.Map;
                for (var i = 0, CountItems = mapItems.length; i < CountItems; i++) {
                    cssp.GoogleMap.TVItemObjects.push(mapItems[i]);
                }
                if (mapItems.length > 0) {
                    //for (var i = 0, CountPins = cssp.GoogleMap.PinObjects.length; i < CountPins; i++) {
                    //    cssp.GoogleMap.PinObjects[i].IsUsed = false;
                    //}
                    cssp.GoogleMap.DrawObjects();
                    var MinLat90 = cssp.GoogleMap.MinLat;
                    cssp.GoogleMap.MinLat = cssp.GoogleMap.MinLat - 0.01;
                    cssp.GoogleMap.MaxLat = cssp.GoogleMap.MaxLat + 0.01;
                    cssp.GoogleMap.MinLng = cssp.GoogleMap.MinLng - 0.01;
                    cssp.GoogleMap.MaxLng = cssp.GoogleMap.MaxLng + 0.01;
                    var sw = new google.maps.LatLng(cssp.GoogleMap.MinLat, cssp.GoogleMap.MinLng);
                    var ne = new google.maps.LatLng(cssp.GoogleMap.MaxLat, cssp.GoogleMap.MaxLng);
                    if (MinLat90 != 90) {
                        var fBounds = new google.maps.LatLngBounds(sw, ne);
                        if (Recenter) {
                            if (map)
                                map.fitBounds(fBounds);
                        }
                    }
                    $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varCompleted"));
                }
                else {
                    //cssp.Dialog.ShowDialogErrorWithError(cssp.GetHTMLVariable("#LayoutVariables", "varNoObjectsFound"));
                }
            };
            this.GetColNumber = function ($Panel, MidTerm) {
                if ($Panel.hasClass("hidden")) {
                    return 0;
                }
                for (var i = 1; i < 13; i++) {
                    if ($Panel.hasClass("col-" + MidTerm + "-" + i)) {
                        return i;
                    }
                }
                return -1;
            };
            this.ImageIcons = function ($aja) {
                cssp.GoogleMap.IsLabel = false;
                cssp.GoogleMap.UseImage = true;
                cssp.GoogleMap.DrawObjects();
            };
            this.Init = function () {
            };
            this.InitTopCenterDiv = function () {
                $(document).off("change", ".MapTopCenterItemVisibility");
                $(document).on("change", ".MapTopCenterItemVisibility", function (evt) {
                    var $div = $("#MapTopCenterPanelDiv").find(".MapTopCenter" + $(evt.target).data("tag"));
                    if ($div.hasClass("hidden")) {
                        $div.removeClass("hidden");
                    }
                    else {
                        $div.removeClass("hidden").addClass("hidden");
                    }
                });
                $(document).off("input propertychange paste", "input[name='MarkerTextLength']");
                $(document).on("input propertychange paste", "input[name='MarkerTextLength']", function (evt) {
                    var MarkerTextLength = parseInt($("#MapTopCenterPanelDiv").find("input[name = 'MarkerTextLength']").val());
                    if (isNaN(MarkerTextLength)) {
                        cssp.GoogleMap.MarkerTextLength = 1;
                        $("#MapTopCenterPanelDiv").find("input[name = 'MarkerTextLength']").val("1");
                    }
                    else {
                        cssp.GoogleMap.MarkerTextLength = MarkerTextLength;
                    }
                    cssp.GoogleMap.ReadAndShowObjects(false);
                });
            };
            this.Labels = function ($aja) {
                $(".jaMapIconsPlain").removeClass("hidden");
                $(".jaMapIconsLabel").removeClass("hidden").addClass("hidden");
                $("#MapTopCenterMenu").trigger("click");
                cssp.GoogleMap.IsLabel = true;
                cssp.GoogleMap.UseImage = false;
                cssp.GoogleMap.DrawObjects();
            };
            this.LegendElemExist = function (legendElem) {
                var Exist = false;
                for (var i = 0, count = cssp.GoogleMap.LegendArr.length; i < count; i++) {
                    if (cssp.GoogleMap.LegendArr[i].Color == legendElem.Color
                        && cssp.GoogleMap.LegendArr[i].TVType == legendElem.TVType
                        && cssp.GoogleMap.LegendArr[i].LegendText == legendElem.LegendText) {
                        Exist = true;
                        continue;
                    }
                }
                return Exist;
            };
            this.LegendSetup = function (legendElem) {
                if (!cssp.GoogleMap.LegendElemExist(legendElem)) {
                    cssp.GoogleMap.LegendArr.push(legendElem);
                    cssp.GoogleMap.itemsDropDown.push("<li><span style=\"color: #" + legendElem.Color + "\" title=\"" + legendElem.LegendText + "\"><span class=\"glyphicon glyphicon-map-marker\"></span></span><span>&nbsp;&nbsp;&nbsp;&nbsp;" + legendElem.LegendText + "</span></li>");
                }
                return legendElem;
            };
            this.MapDeleteLabel = function (MapInfoID, Lat, Lng) {
                $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varDeleting"));
                var command = "Map/MapDeleteLabelJSON";
                $.post(cssp.BaseURL + command, {
                    MapInfoID: MapInfoID,
                    Lat: Lat,
                    Lng: Lng,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varDeleted"));
                        cssp.GoogleMap.ReadAndShowObjects(false);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MapEdit = function ($bjs) {
                cssp.GoogleMap.Editing = true;
                cssp.GoogleMap.MoveLabel = false;
                $(".jbMapEdit").removeClass("disabled").addClass("disabled");
                $(".jbMapEditSave").removeClass("disabled");
                $(".jbMapEditCancel").removeClass("disabled");
                $("#MapTopCenterID").trigger("click");
                cssp.GoogleMap.EditingZIndex = 0;
                cssp.GoogleMap.infoWindow.close();
                cssp.GoogleMap.ClearEdit();
                cssp.GoogleMap.DrawObjects();
                $(".EditSubMenu").removeClass("open");
            };
            this.MapEditCancel = function ($aja) {
                cssp.GoogleMap.Editing = false;
                cssp.GoogleMap.MoveLabel = false;
                $(".jbMapEdit").removeClass("disabled");
                $(".jbMapEditSave").removeClass("disabled").addClass("disabled");
                $(".jbMapEditCancel").removeClass("disabled").addClass("disabled");
                $("#MapTopCenterID").trigger("click");
                cssp.GoogleMap.EditingZIndex = 0;
                cssp.GoogleMap.infoWindow.close();
                cssp.GoogleMap.ClearEdit();
                cssp.GoogleMap.DrawObjects();
                $(".EditSubMenu").removeClass("open");
            };
            this.MapMoveLabel = function ($bjs) {
                cssp.GoogleMap.Editing = true;
                cssp.GoogleMap.MoveLabel = true;
                $(".jbMapEditMoveLabel").removeClass("disabled").addClass("disabled");
                $(".jbMapEditMoveLabelCancel").removeClass("disabled");
                $("#MapTopCenterID").trigger("click");
                cssp.GoogleMap.EditingZIndex = 0;
                cssp.GoogleMap.infoWindow.close();
                cssp.GoogleMap.ClearEdit();
                cssp.GoogleMap.DrawObjects();
            };
            this.MapEditMoveLabelAuto = function ($bjs) {
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var TVType = parseInt($("#TVItemListDiv").data("tvtype"));
                var OnlyActive = $("input[name ='MovelLabelOnlyActive']").is(":checked");
                $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "Map/MapMoveLabelAutoJSON";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    TVType: TVType,
                    OnlyActive: OnlyActive,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        cssp.GoogleMap.ReadAndShowObjects(false);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MapEditMoveLabelClear = function ($bjs) {
                var SubsectorTVItemID = parseInt($("#ViewDiv").data("tvitemid"));
                var TVType = parseInt($("#TVItemListDiv").data("tvtype"));
                var OnlyActive = $("input[name ='MovelLabelOnlyActive']").is(":checked");
                $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
                var command = "Map/MapMoveLabelClearJSON";
                $.post(cssp.BaseURL + command, {
                    SubsectorTVItemID: SubsectorTVItemID,
                    TVType: TVType,
                    OnlyActive: OnlyActive,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varSuccess"));
                        cssp.GoogleMap.ReadAndShowObjects(false);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MapEditMoveLabelCancel = function ($aja) {
                cssp.GoogleMap.Editing = false;
                cssp.GoogleMap.MoveLabel = false;
                $(".jbMapEditMoveLabel").removeClass("disabled");
                $(".jbMapEditMoveLabelCancel").removeClass("disabled").addClass("disabled");
                $("#MapTopCenterID").trigger("click");
                cssp.GoogleMap.EditingZIndex = 0;
                cssp.GoogleMap.infoWindow.close();
                cssp.GoogleMap.ClearEdit();
                cssp.GoogleMap.ReadAndShowObjects(false);
            };
            this.MapEditPointCancel = function ($aja) {
                cssp.GoogleMap.infoWindow.close();
                cssp.GoogleMap.ClearEdit();
                cssp.GoogleMap.DrawObjects();
            };
            this.MapEditPointInit = function () {
                $(cssp.GoogleMap.MapEditPointForm).each(function (ind, elem) {
                    $(elem).validate({
                        rules: {
                            Lat: {
                                required: true,
                                number: true,
                                range: [-90, 90]
                            },
                            Lng: {
                                required: true,
                                number: true,
                                range: [-180, 180]
                            },
                        }
                    });
                });
            };
            this.MapEditPointSave = function ($aja) {
                $("#MapTopCenterID").trigger("click");
                $(".EditSubMenu").removeClass("open");
                var $form = $aja.closest(cssp.GoogleMap.MapEditPointForm).first();
                if (!$form) {
                    cssp.Dialog.ShowDialogErrorWithCouldNotFind_Within_(cssp.GoogleMap.MapEditPointForm, "#MapPanelID");
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
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            var ShouldBreak = false;
                            var Lat = parseFloat($aja.closest(cssp.GoogleMap.MapEditPointForm).first().find("input[name=Lat]").val());
                            var Lng = parseFloat($aja.closest(cssp.GoogleMap.MapEditPointForm).first().find("input[name=Lng]").val());
                            var MapInfoID = parseInt($aja.closest(cssp.GoogleMap.MapEditPointForm).first().find("input[name=MapInfoID]").val());
                            for (var i = 0, CountItem = cssp.GoogleMap.TVItemObjects.length; i < CountItem; i++) {
                                for (var j = 0, CountObject = cssp.GoogleMap.TVItemObjects[i].MapObjList.length; j < CountObject; j++) {
                                    if (MapInfoID == cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID) {
                                        cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[0].Lat = Lat;
                                        cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[0].Lng = Lng;
                                        ShouldBreak = true;
                                        break;
                                    }
                                }
                                if (ShouldBreak) {
                                    break;
                                }
                            }
                            cssp.GoogleMap.ClearEdit();
                            cssp.GoogleMap.infoWindow.close();
                            cssp.GoogleMap.ReadAndShowObjects(false);
                        }
                    }).fail(function () {
                        cssp.Dialog.ShowDialogErrorWithFail(command);
                    });
                }
            };
            this.MapEditMoveLabelPointSave = function (MapInfoID, Lat, Lng) {
                $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varSaving"));
                var command = "Map/SaveMoveLabelPointJSON";
                $.post(cssp.BaseURL + command, {
                    MapInfoID: MapInfoID,
                    Lat: Lat,
                    Lng: Lng,
                }).done(function (ret) {
                    if (ret) {
                        cssp.Dialog.ShowDialogErrorWithError(ret);
                    }
                    else {
                        $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varSaved"));
                        cssp.GoogleMap.ReadAndShowObjects(false);
                    }
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.MapEditSave = function ($aja) {
                var MapInfoIDPolygon = cssp.GoogleMap.EditingZIndex - cssp.GoogleMap.ZIndexPolygonBase;
                var MapInfoIDPolyline = cssp.GoogleMap.EditingZIndex - cssp.GoogleMap.ZIndexPolylineBase;
                var ShouldBreak = false;
                var TempZIndex = cssp.GoogleMap.EditingZIndex;
                var CurrentMapObj;
                var CurrentI;
                var CurrentJ;
                for (var i = 0, CountItem = cssp.GoogleMap.TVItemObjects.length; i < CountItem; i++) {
                    for (var j = 0, CountObject = cssp.GoogleMap.TVItemObjects[i].MapObjList.length; j < CountObject; j++) {
                        if (MapInfoIDPolygon == cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID) {
                            CurrentMapObj = cssp.GoogleMap.TVItemObjects[i].MapObjList[j];
                            CurrentI = i;
                            CurrentJ = j;
                            ShouldBreak = true;
                            break;
                        }
                        if (MapInfoIDPolyline == cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID) {
                            CurrentMapObj = cssp.GoogleMap.TVItemObjects[i].MapObjList[j];
                            CurrentI = i;
                            CurrentJ = j;
                            ShouldBreak = true;
                            break;
                        }
                    }
                    if (ShouldBreak) {
                        break;
                    }
                }
                ShouldBreak = false;
                cssp.GoogleMap.MVCObjPolygons.forEach(function (elem, ind) {
                    if (elem.zIndex == TempZIndex) {
                        var Poly = elem.getPath();
                        var LatLngList = [];
                        Poly.forEach(function (elem, ind) {
                            LatLngList.push(elem.lat() + "s" + elem.lng());
                        });
                        var LatLngListText = LatLngList.join("p");
                        var command = "Map/SavePolyJSON";
                        $("#MapTopCenterID").trigger("click");
                        $(".EditSubMenu").removeClass("open");
                        $.post(cssp.BaseURL + command, {
                            LatLngListText: LatLngListText,
                            MapInfoID: MapInfoIDPolygon,
                            IsPolygon: true,
                        }).done(function (ret) {
                            if (ret.Error) {
                                cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                            }
                            else {
                                cssp.GoogleMap.ChangeNodesInMapObj(Poly, MapInfoIDPolygon, i, j);
                                cssp.GoogleMap.ClearEdit();
                                cssp.GoogleMap.DrawObjects();
                                cssp.GoogleMap.infoWindow.close();
                                cssp.GoogleMap.DrawObjects();
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                            return;
                        });
                    }
                });
                cssp.GoogleMap.MVCObjPolylines.forEach(function (elem, ind) {
                    if (elem.zIndex == TempZIndex) {
                        var Poly = elem.getPath();
                        var LatLngList = [];
                        Poly.forEach(function (elem, ind) {
                            LatLngList.push(elem.lat() + "s" + elem.lng());
                        });
                        var LatLngListText = LatLngList.join("p");
                        var command = "Map/SavePolyJSON";
                        $("#MapTopCenterID").trigger("click");
                        $(".EditSubMenu").removeClass("open");
                        $.post(cssp.BaseURL + command, {
                            LatLngListText: LatLngListText,
                            MapInfoID: MapInfoIDPolyline,
                            IsPolygon: false,
                        }).done(function (ret) {
                            if (ret.Error) {
                                cssp.Dialog.ShowDialogErrorWithError(ret.Error);
                            }
                            else {
                                cssp.GoogleMap.ChangeNodesInMapObj(Poly, MapInfoIDPolyline, i, j);
                                cssp.GoogleMap.ClearEdit();
                                cssp.GoogleMap.DrawObjects();
                                cssp.GoogleMap.infoWindow.close();
                                cssp.GoogleMap.DrawObjects();
                            }
                        }).fail(function () {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                            return;
                        });
                    }
                });
            };
            this.MapSizeSmaller = function () {
                var ColNum = cssp.GoogleMap.GetColNumber($("#TextPanelID"), "md");
                if (ColNum < 11) {
                    ColNum += 2;
                }
                cssp.GoogleMap.SetTextAndMapPanels(ColNum, 12 - ColNum);
                cssp.GoogleMap.DoMapResize();
                $("#MapTopCenterID").trigger("click");
            };
            this.MapSizeBigger = function () {
                var ColNum = cssp.GoogleMap.GetColNumber($("#TextPanelID"), "md");
                if (ColNum > 2) {
                    ColNum -= 2;
                }
                cssp.GoogleMap.SetTextAndMapPanels(ColNum, 12 - ColNum);
                cssp.GoogleMap.DoMapResize();
                $("#MapTopCenterID").trigger("click");
            };
            this.MapTopCenterShowHide = function () {
                if ($(".jbMapTopCenterShowHide").hasClass("btn-default")) {
                    $(".jbMapTopCenterShowHide").removeClass("btn-default").addClass("btn-success");
                    $("#MapTopCenterPanelDiv").removeClass("hidden");
                    cssp.GoogleMap.InitTopCenterDiv();
                }
                else {
                    $(".jbMapTopCenterShowHide").removeClass("btn-success").addClass("btn-default");
                    $("#MapTopCenterPanelDiv").removeClass("hidden").addClass("hidden");
                }
            };
            this.PlainIcons = function ($aja) {
                $(".jaMapIconsPlain").removeClass("hidden").addClass("hidden");
                $(".jaMapIconsLabel").removeClass("hidden");
                $("#MapTopCenterMenu").trigger("click");
                cssp.GoogleMap.IsLabel = false;
                cssp.GoogleMap.UseImage = false;
                cssp.GoogleMap.DrawObjects();
            };
            this.Resize = function () {
                google.maps.event.trigger(cssp.GoogleMap.Map, "resize");
            };
            this.CleanColClass = function ($Panel, MidTerm) {
                for (var i = 1; i < 13; i++) {
                    $Panel.removeClass("col-" + MidTerm + "-" + i);
                }
            };
            this.SetTextAndMapPanels = function (TextColNumb, MapColNumb) {
                cssp.GoogleMap.CleanColClass($("#TextPanelID"), "md");
                cssp.GoogleMap.CleanColClass($("#MapPanelID"), "md");
                if (TextColNumb == 0) {
                    $("#TextPanelID").removeClass("hidden").addClass("hidden");
                }
                else {
                    $("#TextPanelID").removeClass("hidden").addClass("col-md-" + TextColNumb);
                }
                if (MapColNumb == 0) {
                    $("#MapPanelID").removeClass("hidden").addClass("hidden");
                }
                else {
                    $("#MapPanelID").removeClass("hidden").addClass("col-md-" + MapColNumb);
                }
            };
            this.ShowGoogleMap = function () {
                cssp.GoogleMap.MinLat = 90;
                cssp.GoogleMap.MaxLat = -90;
                cssp.GoogleMap.MinLng = 180;
                cssp.GoogleMap.MaxLng = -180;
                if ($("div.gm-style").length == 0) {
                    var myOptions = {
                        zoom: 10,
                        center: new google.maps.LatLng(46.291624, -64.722614),
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                        scaleControl: true
                    };
                    cssp.GoogleMap.Map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                    google.maps.event.addListener(cssp.GoogleMap.Map, "mousemove", function (evt) {
                        $("#CurrentLatLng").val(evt.latLng.lat().toString().substring(0, 8) + " " + evt.latLng.lng().toString().substring(0, 10));
                    });
                    google.maps.event.addListener(cssp.GoogleMap.Map, "click", function () {
                        cssp.GoogleMap.infoWindow.close();
                    });
                    cssp.GoogleMap.Map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById("MapTopCenterID"));
                }
                $("#MapTopCenterID").removeClass("hidden");
            };
            this.ShowItemOnMap = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    var TVItemID = $bjs.data("tvitemid");
                    if (TVItemID != 0) {
                        cssp.GoogleMap.DrawCross(TVItemID);
                    }
                    $(".jbMapShowItem").each(function (ind, elem) {
                        $(elem).removeClass("btn-success").addClass("btn-default");
                    });
                    $bjs.removeClass("btn-default").addClass("btn-success");
                }
                else {
                    cssp.GoogleMap.DrawCross(-1);
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.ShowItemOnMapMWQMRun = function ($bjs) {
                if ($bjs.hasClass("btn-default")) {
                    var TVItemID = $bjs.closest("li").data("tvitemid");
                    if (TVItemID != 0) {
                        cssp.GoogleMap.DrawCross(TVItemID);
                    }
                    $(".jbMapShowItem").each(function (ind, elem) {
                        $(elem).removeClass("btn-success").addClass("btn-default");
                    });
                    $bjs.removeClass("btn-default").addClass("btn-success");
                }
                else {
                    cssp.GoogleMap.DrawCross(-1);
                    $bjs.removeClass("btn-success").addClass("btn-default");
                }
            };
            this.HideMap = function () {
                $(".jaMapSizeBigger").addClass("hidden");
                $(".jaMapSizeSmaller").addClass("hidden");
                $(".jaShowHideMapTrack").addClass("hidden");
                $(".jaMapShowHide").find("span").eq(0).addClass("text-success");
                $(".jaMapShowHide").find("span").eq(0).removeClass("text-danger");
                var URLVarShowNumber = cssp.GetURLVarShowNumber(CSSP.URLVarShowEnum.ShowMap);
                var temp = cssp.Variables.VariableShow;
                temp = temp.substr(0, URLVarShowNumber) + "0" + temp.substr(URLVarShowNumber + 1);
                cssp.Variables.VariableShow = temp;
                cssp.GoogleMap.SetTextAndMapPanels(12, 0);
            };
            this.ShowMap = function () {
                $(".jaMapSizeBigger").removeClass("hidden");
                $(".jaMapSizeSmaller").removeClass("hidden");
                $(".jaShowHideMapTrack").removeClass("hidden");
                $(".jaMapShowHide").find("span").eq(0).removeClass("text-success");
                $(".jaMapShowHide").find("span").eq(0).addClass("text-danger");
                var URLVarShowNumber = cssp.GetURLVarShowNumber(CSSP.URLVarShowEnum.ShowMap);
                var temp = cssp.Variables.VariableShow;
                temp = temp.substr(0, URLVarShowNumber) + "1" + temp.substr(URLVarShowNumber + 1);
                cssp.Variables.VariableShow = temp;
                cssp.GoogleMap.SetTextAndMapPanels(6, 6);
                cssp.GoogleMap.ShowGoogleMap();
                cssp.GoogleMap.DoMapResize();
                cssp.GoogleMap.ReadAndShowObjects(true);
            };
            this.ReadAndShowObjects = function (Recenter) {
                cssp.GoogleMap.MinLat = 90;
                cssp.GoogleMap.MaxLat = -90;
                cssp.GoogleMap.MinLng = 180;
                cssp.GoogleMap.MaxLng = -180;
                if ($("div.gm-style").length == 1) {
                    cssp.GoogleMap.infoWindow.close();
                }
                cssp.GoogleMap.LegendArr = [];
                cssp.GoogleMap.TVItemObjects = [];
                var mapItems = [];
                var command = "Map/GetMapInfoJSON";
                $.get(cssp.BaseURL + command, {
                    Q: cssp.Variables.URL,
                }).done(function (ret) {
                    $.map(ret, function (item) {
                        var tvLoc = new CSSP.tvLocation(item.TVItemID, item.TVText, item.TVType, item.SubTVType, item.MapObjList);
                        mapItems.push(tvLoc);
                    });
                    cssp.GoogleMap.FillTVItemObjects(mapItems, Recenter);
                }).fail(function () {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            };
            this.TVItemObjects = [];
        }
        return GoogleMap;
    }());
    CSSP.GoogleMap = GoogleMap;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.GoogleMap.js.map