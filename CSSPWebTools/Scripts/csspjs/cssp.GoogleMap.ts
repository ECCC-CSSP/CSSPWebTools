
declare var StyledMarker;
declare var StyledIcon;
declare var StyledIconTypes;
declare var RichMarker;

module CSSP {
    export class GoogleMap {
        // Variables
        public MapEditPointForm: string = ".MapEditPointForm";

        public googleDrawingManager: google.maps.drawing.DrawingManager;
        public Map: google.maps.Map;
        public MinLat: number = 90;
        public MaxLat: number = -90;
        public MinLng: number = 180;
        public MaxLng: number = -180;
        public url: string = "";
        public url3: string = "";
        public url4: string = "";
        public UseImage: boolean = false;
        public IsLabel: boolean = false;
        public infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
        public drawingManager: google.maps.drawing.DrawingManager = new google.maps.drawing.DrawingManager();
        public DragStartPos: google.maps.LatLng;
        public Editing: boolean = false;
        public EditingZIndex: number = 0;
        public IconEdit: google.maps.Icon;
        public ZIndexPointBase: number = 10000000;
        public ZIndexPolylineBase: number = 1000000;
        public ZIndexPolygonBase: number = 100000;
        public MarkerTextLength: number = 1;
        public MVCCrossPolylines: google.maps.MVCArray = new google.maps.MVCArray([]);
        public MVCObjPoints: google.maps.MVCArray = new google.maps.MVCArray([]);
        public MVCObjPolygons: google.maps.MVCArray = new google.maps.MVCArray([]);
        public MVCObjPolylines: google.maps.MVCArray = new google.maps.MVCArray([]);

        public ErrorText: string = "";
        public GoogleMapStarted: boolean = false;
        public TVItemObjects: Array<CSSP.tvLocation> = [];
        public CrossVisible: boolean = false;
        public itemsDropDown: Array<string> = [];
        public LegendArr: Array<LegendElem> = [];

        public MoveLabel: boolean = false;

        // Function
        constructor() {
            this.TVItemObjects = [];
        }

        // Functions
        public ChangeNodesInMapObj: Function = (Poly: google.maps.MVCArray, MIPID: number, i: number, j: number): void => {
            cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList.length = 0;
            for (var k = 0, CountCoords = Poly.getLength(); k < CountCoords; k++) {
                cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList.push(new Coord(Poly.getAt(k).lat(), Poly.getAt(k).lng(), k));
            }
        };
        public ClearEdit: Function = (): void => {
            cssp.GoogleMap.MVCObjPoints.forEach((elem: google.maps.Marker, ind: number) => {
                elem.set("draggable", false);
                elem.set("editable", false);
            });
            cssp.GoogleMap.MVCObjPolylines.forEach((elem: google.maps.Polyline, ind: number) => {
                elem.set("draggable", false);
                elem.set("editable", false);
            });
            cssp.GoogleMap.MVCObjPolygons.forEach((elem: google.maps.Polygon, ind: number) => {
                elem.set("draggable", false);
                elem.set("editable", false);
            });
        };
        public CreateMarker: Function = (i: number, j: number, k: number, color: string, TVType: CSSP.TVTypeEnum, LatAverage: number, LngAverage: number): void => {
            let zIndex: number = cssp.GoogleMap.ZIndexPointBase + cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID;
            let mark: google.maps.Marker = new google.maps.Marker();

            mark = new StyledMarker(
                {
                    styleIcon: (new StyledIcon(
                        StyledIconTypes.BUBBLE,
                        {
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
            google.maps.event.addListener(mark, 'click', () => {
                cssp.GoogleMap.infoWindow.setContent("<div class=\"MapMarkerDiv\">" + cssp.GetHTMLVariable("#LayoutVariables", "varInProgress") + "</div>");
                cssp.GoogleMap.infoWindow.open(cssp.GoogleMap.Map, mark);
                var command: string = "Map/_mapMarkerClickInfo";
                $.get(cssp.BaseURL + command, {
                    Q: document.location.href.substring(document.location.href.indexOf("!View")),
                    TVItemID: cssp.GoogleMap.TVItemObjects[i].TVItemID,
                }).done((ret) => {
                    $(".MapMarkerDiv").replaceWith(ret);
                }).fail(() => {
                    cssp.Dialog.ShowDialogErrorWithFail(command);
                });
            });
            google.maps.event.addListener(mark, 'rightclick', () => {
                if (cssp.GoogleMap.MoveLabel) {
                    let MapInfoID: number = mark.getZIndex() - cssp.GoogleMap.ZIndexPointBase;
                    let Lat: number = mark.getPosition().lat();
                    let Lng: number = mark.getPosition().lng()
                    cssp.GoogleMap.MapDeleteLabel(MapInfoID, Lat, Lng);
                }
            });
            google.maps.event.addListener(mark, 'dragstart', () => {
                cssp.GoogleMap.DragStartPos = mark.getPosition();
            });
            google.maps.event.addListener(mark, 'drag', () => {
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
            google.maps.event.addListener(mark, 'dragend', () => {
                if (cssp.GoogleMap.MoveLabel) {
                    let MapInfoID: number = mark.getZIndex() - cssp.GoogleMap.ZIndexPointBase;
                    let Lat: number = mark.getPosition().lat();
                    let Lng: number = mark.getPosition().lng()
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
        public DoShowOrHideMap: Function = (): void => {
            if ($(".GlobeIcon").hasClass("btn-success")) {
                cssp.GoogleMap.ShowMap();
            }
            else {
                cssp.GoogleMap.HideMap();
            }
        };
        public DoMapResize: Function = (newColNumb: number): void => {
            $("#content").css("overflow", "auto").css("height", window.innerHeight - $("#content").offset().top - 60);
            $("#map_canvas").css("height", window.innerHeight - $("#TextPanelID").offset().top - 60);
            if (!$("#MapPanelID").hasClass("hidden")) {
                cssp.GoogleMap.Resize();
            }
        };
        public DrawCross: Function = (TVItemID: number): void => {
            for (var i = 0, CountObj = cssp.GoogleMap.MVCCrossPolylines.getLength(); i < CountObj; i++) {
                google.maps.event.clearInstanceListeners(cssp.GoogleMap.MVCCrossPolylines.getAt(i));
                cssp.GoogleMap.MVCCrossPolylines.getAt(i).setMap(null);
            }
            var CurrentPoint: google.maps.LatLng;
            for (var i = 0, CountItems = cssp.GoogleMap.TVItemObjects.length; i < CountItems; i++) {
                if (cssp.GoogleMap.TVItemObjects[i].TVItemID == TVItemID) {
                    for (var j = 0, CountObj = cssp.GoogleMap.TVItemObjects[i].MapObjList.length; j < CountObj; j++) {
                        if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoDrawType == DrawTypeEnum.Point) {
                            CurrentPoint = new google.maps.LatLng(cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[0].Lat, cssp.GoogleMap.TVItemObjects[i].MapObjList[j].CoordList[0].Lng);
                        }
                    }
                }
            }

            if (CurrentPoint) {
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
                cssp.GoogleMap.MVCCrossPolylines.push(polyl1);
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
                cssp.GoogleMap.MVCCrossPolylines.push(polyl2);
                if (TVItemID == -1) {
                    cssp.GoogleMap.CrossVisible = false;
                }
                else {
                    cssp.GoogleMap.CrossVisible = true;
                }
            }
        };
        public DrawCrossAtLatLng: Function = (Lat: number, Lng: number): void => {
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
                cssp.GoogleMap.MVCCrossPolylines.push(polyl1);
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
                cssp.GoogleMap.MVCCrossPolylines.push(polyl2);
            }
        };
        public DrawObjects: Function = (): void => {
            for (var i = 0, CountObj: number = cssp.GoogleMap.MVCCrossPolylines.getLength(); i < CountObj; i++) {
                google.maps.event.clearInstanceListeners(cssp.GoogleMap.MVCCrossPolylines.getAt(i));
                cssp.GoogleMap.MVCCrossPolylines.getAt(i).setMap(null);
            }
            for (var i = 0, CountObj: number = cssp.GoogleMap.MVCObjPoints.getLength(); i < CountObj; i++) {
                google.maps.event.clearInstanceListeners(cssp.GoogleMap.MVCObjPoints.getAt(i));
                cssp.GoogleMap.MVCObjPoints.getAt(i).setMap(null);
            }
            for (var i = 0, CountObj: number = cssp.GoogleMap.MVCObjPolygons.getLength(); i < CountObj; i++) {
                google.maps.event.clearInstanceListeners(cssp.GoogleMap.MVCObjPolygons.getAt(i));
                cssp.GoogleMap.MVCObjPolygons.getAt(i).setMap(null);
            }
            for (var i = 0, CountObj: number = cssp.GoogleMap.MVCObjPolylines.getLength(); i < CountObj; i++) {
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

            for (var i = 0, CountObj: number = cssp.GoogleMap.TVItemObjects.length; i < CountObj; i++) {
                cssp.GoogleMap.DrawPolys(i, true);
                cssp.GoogleMap.DrawPoints(i, true /*, LatAverage, LngAverage */);
            }

            $(".ObjLoaded").removeClass("hidden");
            $(".ObjNotLoaded").addClass("hidden");
            cssp.GoogleMap.CrossVisible = false;
        };
        public DrawPoints: Function = (i: number, DoLatLng: boolean /*, LatAverage: number, LngAverage: number */): void => {
            let legendElem: LegendElem = undefined;
            let MapInfoID = cssp.GoogleMap.EditingZIndex - cssp.GoogleMap.ZIndexPointBase;
            for (var j = 0, CountObj = cssp.GoogleMap.TVItemObjects[i].MapObjList.length; j < CountObj; j++) {
                if (cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoDrawType == DrawTypeEnum.Point) {
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

                        var tempImage: google.maps.Icon;

                        switch (cssp.GoogleMap.TVItemObjects[i].TVType) {
                            case TVTypeEnum.Area:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Area, "00FFFF",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varAreas")));
                                }
                                break;
                            case TVTypeEnum.ClimateSite:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.ClimateSite, "33FFFF",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varClimateSite")));
                                }
                                break;
                            case TVTypeEnum.Country:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Country, "00FFFF",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varCountry")));
                                }
                                break;
                            case TVTypeEnum.HydrometricSite:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.HydrometricSite, "66CCFF",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varHydrometricSite")));
                                }
                                break;
                            case TVTypeEnum.TideSite:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.TideSite, "FFFF22",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varTideSite")));
                                }
                                break;
                            case TVTypeEnum.Sector:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Sector, "00FFFF",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varSectors")));
                                }
                                break;
                            case TVTypeEnum.Subsector:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Subsector, "00FFFF",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varSubsectors")));
                                }
                                break;
                            case TVTypeEnum.Province:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Province, "0000FF",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varProvinces")));
                                }
                                break;
                            case TVTypeEnum.MikeScenario:
                                {
                                    switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                        case TVTypeEnum.MeshNode:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.MeshNode, "777700",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMeshNode")));
                                            }
                                            break;
                                        case TVTypeEnum.WebTideNode:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.WebTideNode, "AA0000",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varWebTideNode")));
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                break;
                            case TVTypeEnum.MikeSource:
                                {
                                    switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                        case TVTypeEnum.MikeSourceIsRiver:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.MikeSourceIsRiver, "0000FF",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMikeSourceIsRiver")));
                                            }
                                            break;
                                        case TVTypeEnum.MikeSourceIncluded:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.MikeSourceIncluded, "00FF00",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMikeSourceIncluded")));
                                            }
                                            break;
                                        case TVTypeEnum.MikeSourceNotIncluded:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.MikeSourceNotIncluded, "CCCCCC",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMikeSourceNotIncluded")));
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                break;
                            case TVTypeEnum.MikeBoundaryConditionMesh:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.MeshNode, "777700",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varMeshNode")));
                                }
                                break;
                            case TVTypeEnum.MikeBoundaryConditionWebTide:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.WebTideNode, "AA0000",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varWebTideNode")));
                                }
                                break;
                            case TVTypeEnum.Municipality:
                                {
                                    legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Municipality, "FF7700",
                                        cssp.GetHTMLVariable("#LayoutVariables", "varMunicipalities")));
                                }
                                break;
                            case TVTypeEnum.Infrastructure:
                                {
                                    //legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Infrastructure, "EECCAA",
                                    //    cssp.GetHTMLVariable("#LayoutVariables", "varInfrastructures")));
                                    switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                        case TVTypeEnum.WasteWaterTreatmentPlant:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.WasteWaterTreatmentPlant, "FF0000",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varWWTP")));
                                            }
                                            break;
                                        case TVTypeEnum.LiftStation:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.LiftStation, "880000",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varLiftStation")));
                                            }
                                            break;
                                        case TVTypeEnum.Outfall:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Outfall, "BB6600",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varOutfall")));
                                            }
                                            break;
                                        case TVTypeEnum.LineOverflow:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.LineOverflow, "666600",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varLineOverflow")));
                                            }
                                            break;
                                        case TVTypeEnum.OtherInfrastructure:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.LineOverflow, "888800",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varLineOverflow")));
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                break;
                            case TVTypeEnum.MWQMRun:
                                {
                                    //legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.MWQMRun, "EE0f0f",
                                    //    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMSites")));
                                    switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                        case TVTypeEnum.Passed:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Passed, "00FF00",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMMeetStandard")));
                                            }
                                            break;
                                        case TVTypeEnum.Failed:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Failed, "FF0000",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolation")));
                                            }
                                            break;
                                        case TVTypeEnum.NoDepuration:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.NoDepuration, "800080",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolationDepuration")));
                                            }
                                            break;
                                        case TVTypeEnum.NoData:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.NoData, "DDDDDD",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varNoData")));
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                break;
                            case TVTypeEnum.MWQMSite:
                                {
                                    //legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.MWQMSite, "EE0f0f",
                                    //    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMSites")));
                                    switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                        case TVTypeEnum.Passed:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Passed, "00FF00",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMMeetStandard")));
                                            }
                                            break;
                                        case TVTypeEnum.Failed:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Failed, "FF0000",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolation")));
                                            }
                                            break;
                                        case TVTypeEnum.NoDepuration:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.NoDepuration, "800080",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolationDepuration")));
                                            }
                                            break;
                                        case TVTypeEnum.LessThan10:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.LessThan10, "FF00FF",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMNotEnoughData")));
                                            }
                                            break;
                                        case TVTypeEnum.NoData:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.NoData, "DDDDDD",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varNoData")));
                                            }
                                            break;
                                        case TVTypeEnum.SamplingPlan:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.NoData, "cccccc",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varNoData")));
                                            }
                                            break;
                                        case TVTypeEnum.PolSourceSite:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.PolSourceSite, "FFFFFF",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varPollutionSourceSites")));
                                            }
                                            break;
                                        case TVTypeEnum.WasteWaterTreatmentPlant:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.WasteWaterTreatmentPlant, "0000FF",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varWWTP")));
                                            }
                                            break;
                                        case TVTypeEnum.LiftStation:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.LiftStation, "0000FF",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varLiftStation")));
                                            }
                                            break;
                                        case TVTypeEnum.LineOverflow:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.LineOverflow, "0000FF",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varLineOverflow")));
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                break;
                            case TVTypeEnum.PolSourceSite:
                                {
                                    switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                        case TVTypeEnum.Passed:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Passed, "00FF00",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMMeetStandard")));
                                            }
                                            break;
                                        case TVTypeEnum.Failed:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.Failed, "FF0000",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolation")));
                                            }
                                            break;
                                        case TVTypeEnum.NoDepuration:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.NoDepuration, "800080",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMStandardViolationDepuration")));
                                            }
                                            break;
                                        case TVTypeEnum.LessThan10:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.LessThan10, "FF00FF",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varMWQMNotEnoughData")));
                                            }
                                            break;
                                        case TVTypeEnum.NoData:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.NoData, "DDDDDD",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varNoData")));
                                            }
                                            break;
                                        case TVTypeEnum.PolSourceSite:
                                            {
                                                legendElem = cssp.GoogleMap.LegendSetup(new LegendElem(CSSP.TVTypeEnum.PolSourceSite, "CCCCCC",
                                                    cssp.GetHTMLVariable("#LayoutVariables", "varPollutionSourceSites")));
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
        public DrawPolys: Function = (i: number, DoLatLng: boolean): void => {
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
                            var zIndex: number = cssp.GoogleMap.ZIndexPolygonBase + cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID;
                            var polyg: google.maps.Polygon = new google.maps.Polygon({
                                paths: CoordList,
                                strokeColor: '#FF0000',
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.0,
                                map: cssp.GoogleMap.Map,
                                zIndex: zIndex,
                            });
                            google.maps.event.addListener(polyg, 'click', () => {
                                if (cssp.GoogleMap.Editing) {
                                    cssp.GoogleMap.ClearEdit();
                                    polyg.set("editable", true);
                                    cssp.GoogleMap.EditingZIndex = polyg.zIndex;
                                }
                                else {
                                    // nothing yet
                                }
                            });
                            google.maps.event.addListener(polyg, 'mousemove', (evt: google.maps.MouseEvent) => {
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
                            if (cssp.GoogleMap.TVItemObjects[i].TVType != TVTypeEnum.Classification) {
                                var zIndex: number = cssp.GoogleMap.ZIndexPolylineBase + cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID;
                                var polyl: google.maps.Polyline = new google.maps.Polyline({
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

                                google.maps.event.addListener(polyl, 'click', () => {
                                    if (cssp.GoogleMap.Editing) {
                                        cssp.GoogleMap.ClearEdit();
                                        polyl.set("editable", true);
                                        cssp.GoogleMap.EditingZIndex = polyl.zIndex;
                                    }
                                    else {
                                        // nothing yet
                                    }
                                });
                                google.maps.event.addListener(polyl, 'mousemove', (evt: google.maps.MouseEvent) => {
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
                            if (cssp.GoogleMap.TVItemObjects[i].TVType == TVTypeEnum.Classification) {
                                var zIndex: number = cssp.GoogleMap.ZIndexPolylineBase + cssp.GoogleMap.TVItemObjects[i].MapObjList[j].MapInfoID;
                                var polyl: google.maps.Polyline = new google.maps.Polyline({
                                    path: CoordList,
                                    strokeColor: '#ffffff',
                                    strokeOpacity: 1.0,
                                    strokeWeight: 1,
                                    map: cssp.GoogleMap.Map,
                                    zIndex: zIndex,
                                });

                                polyl.setMap(cssp.GoogleMap.Map);

                                google.maps.event.addListener(polyl, 'click', () => {
                                    if (cssp.GoogleMap.Editing) {
                                        cssp.GoogleMap.ClearEdit();
                                        polyl.set("editable", true);
                                        cssp.GoogleMap.EditingZIndex = polyl.zIndex;
                                    }
                                    else {
                                        // nothing yet
                                    }
                                });
                                google.maps.event.addListener(polyl, 'mousemove', (evt: google.maps.MouseEvent) => {
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

                                let strokeColor: string = "#000000";

                                switch (cssp.GoogleMap.TVItemObjects[i].SubTVType) {
                                    case (TVTypeEnum.Approved):
                                        {
                                            strokeColor = "#00FF00";
                                        }
                                        break;
                                    case (TVTypeEnum.Restricted):
                                        {
                                            strokeColor = "#FF0000";
                                        }
                                        break;
                                    case (TVTypeEnum.Prohibited):
                                        {
                                            strokeColor = "#cccccc";
                                        }
                                        break;
                                    case (TVTypeEnum.ConditionallyApproved):
                                        {
                                            strokeColor = "#e1bd00";
                                        }
                                        break;
                                    case (TVTypeEnum.ConditionallyRestricted):
                                        {
                                            strokeColor = "#9932cc";
                                        }
                                        break;
                                    default:
                                }

                                for (let i = 0, count = CoordList.length - 1; i < count; i++) {
                                    var spherical = google.maps.geometry.spherical;
                                    var F = new google.maps.LatLng(CoordList[i].lat(), CoordList[i].lng());
                                    var T = new google.maps.LatLng(CoordList[i + 1].lat(), CoordList[i + 1].lng());
                                    // M is the middle of [FT]
                                    var latM = (CoordList[i].lat() + CoordList[i + 1].lat()) / 2;
                                    var longM = (CoordList[i].lng() + CoordList[i + 1].lng()) / 2;
                                    var M = new google.maps.LatLng(latM, longM);
                                    // Get direction of the segment
                                    var heading = spherical.computeHeading(F, T);
                                    var dist = 50; // distance in meters
                                    // Place point A that is oriented at 90° in a distance of dist from M
                                    var A = spherical.computeOffset(M, dist, heading + 90);
                                    var perpendicularCoordinates = [F, T, A, F];
                                    var polyg: google.maps.Polygon = new google.maps.Polygon({
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
        public FillTVItemObjects: Function = (mapItems: Array<CSSP.tvLocation>, Recenter: boolean): void => {
            cssp.GoogleMap.LegendArr = new Array<LegendElem>();
            var map: google.maps.Map = cssp.GoogleMap.Map;
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

                var sw: google.maps.LatLng = new google.maps.LatLng(cssp.GoogleMap.MinLat, cssp.GoogleMap.MinLng);
                var ne: google.maps.LatLng = new google.maps.LatLng(cssp.GoogleMap.MaxLat, cssp.GoogleMap.MaxLng);
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
        public GetColNumber: Function = ($Panel: JQuery, MidTerm: string): number => {
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
        public ImageIcons: Function = ($aja: JQuery): void => {
            cssp.GoogleMap.IsLabel = false;
            cssp.GoogleMap.UseImage = true;
            cssp.GoogleMap.DrawObjects();
        };
        public Init: Function = (): void => {
        };
        public InitTopCenterDiv: Function = (): void => {
            $(document).off("change", ".MapTopCenterItemVisibility");
            $(document).on("change", ".MapTopCenterItemVisibility", (evt: Event) => {
                var $div = $("#MapTopCenterPanelDiv").find(".MapTopCenter" + $(evt.target).data("tag"));
                if ($div.hasClass("hidden")) {
                    $div.removeClass("hidden");
                }
                else {
                    $div.removeClass("hidden").addClass("hidden");
                }
            });
            $(document).off("input propertychange paste", "input[name='MarkerTextLength']");
            $(document).on("input propertychange paste", "input[name='MarkerTextLength']", (evt: Event) => {
                var MarkerTextLength: number = parseInt($("#MapTopCenterPanelDiv").find("input[name = 'MarkerTextLength']").val());
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
        public Labels: Function = ($aja: JQuery): void => {
            $(".jaMapIconsPlain").removeClass("hidden");
            $(".jaMapIconsLabel").removeClass("hidden").addClass("hidden");
            $("#MapTopCenterMenu").trigger("click");
            cssp.GoogleMap.IsLabel = true;
            cssp.GoogleMap.UseImage = false;
            cssp.GoogleMap.DrawObjects();
        };
        public LegendElemExist: Function = (legendElem: LegendElem): boolean => {
            var Exist: boolean = false;
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
        public LegendSetup: Function = (legendElem: LegendElem): LegendElem => {
            if (!cssp.GoogleMap.LegendElemExist(legendElem)) {
                cssp.GoogleMap.LegendArr.push(legendElem);
                cssp.GoogleMap.itemsDropDown.push("<li><span style=\"color: #" + legendElem.Color + "\" title=\"" + legendElem.LegendText + "\"><span class=\"glyphicon glyphicon-map-marker\"></span></span><span>&nbsp;&nbsp;&nbsp;&nbsp;" + legendElem.LegendText + "</span></li>");
            }

            return legendElem;
        };
        public MapDeleteLabel: Function = (MapInfoID: number, Lat: number, Lng: number): void => {
            $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varDeleting"));
            let command: string = "Map/MapDeleteLabelJSON";
            $.post(cssp.BaseURL + command, {
                MapInfoID: MapInfoID,
                Lat: Lat,
                Lng: Lng,
            }).done((ret) => {
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
        public MapEdit: Function = ($bjs: JQuery): void => {
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
        public MapEditCancel: Function = ($aja: JQuery): void => {
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
        public MapMoveLabel: Function = ($bjs: JQuery): void => {
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
        public MapEditMoveLabelAuto: Function = ($bjs: JQuery): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let TVType: number = parseInt($("#TVItemListDiv").data("tvtype"));
            let OnlyActive: boolean = $("input[name ='MovelLabelOnlyActive']").is(":checked");

            $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            let command: string = "Map/MapMoveLabelAutoJSON";
            $.post(cssp.BaseURL + command, {
                SubsectorTVItemID: SubsectorTVItemID,
                TVType: TVType,
                OnlyActive: OnlyActive,
            }).done((ret) => {
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
        public MapEditMoveLabelClear: Function = ($bjs: JQuery): void => {
            let SubsectorTVItemID: number = parseInt($("#ViewDiv").data("tvitemid"));
            let TVType: number = parseInt($("#TVItemListDiv").data("tvtype"));
            let OnlyActive: boolean = $("input[name ='MovelLabelOnlyActive']").is(":checked");

            $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varInProgress"));
            let command: string = "Map/MapMoveLabelClearJSON";
            $.post(cssp.BaseURL + command, {
                SubsectorTVItemID: SubsectorTVItemID,
                TVType: TVType,
                OnlyActive: OnlyActive,
            }).done((ret) => {
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
        public MapEditMoveLabelCancel: Function = ($aja: JQuery): void => {
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
        public MapEditPointCancel: Function = ($aja: JQuery): void => {
            cssp.GoogleMap.infoWindow.close();
            cssp.GoogleMap.ClearEdit();
            cssp.GoogleMap.DrawObjects();
        };
        public MapEditPointInit: Function = (): void => {
            $(cssp.GoogleMap.MapEditPointForm).each((ind: any, elem: Element) => {
                $(elem).validate(
                    {
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
        public MapEditPointSave: Function = ($aja: JQuery): void => {
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
                var command: string = $form.attr("action");
                $.post(cssp.BaseURL + command, $form.serializeArray())
                    .done((ret) => {
                        if (ret) {
                            cssp.Dialog.ShowDialogErrorWithError(ret);
                        }
                        else {
                            var ShouldBreak: boolean = false;
                            var Lat: number = parseFloat($aja.closest(cssp.GoogleMap.MapEditPointForm).first().find("input[name=Lat]").val());
                            var Lng: number = parseFloat($aja.closest(cssp.GoogleMap.MapEditPointForm).first().find("input[name=Lng]").val());
                            var MapInfoID: number = parseInt($aja.closest(cssp.GoogleMap.MapEditPointForm).first().find("input[name=MapInfoID]").val());
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
        public MapEditMoveLabelPointSave: Function = (MapInfoID: number, Lat: number, Lng: number): void => {
            $("#CurrentLatLng").val(cssp.GetHTMLVariable("#LayoutVariables", "varSaving"));
            let command: string = "Map/SaveMoveLabelPointJSON";
            $.post(cssp.BaseURL + command, {
                MapInfoID: MapInfoID,
                Lat: Lat,
                Lng: Lng,
            }).done((ret) => {
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
        public MapEditSave: Function = ($aja: JQuery): void => {
            var MapInfoIDPolygon: number = cssp.GoogleMap.EditingZIndex - cssp.GoogleMap.ZIndexPolygonBase;
            var MapInfoIDPolyline: number = cssp.GoogleMap.EditingZIndex - cssp.GoogleMap.ZIndexPolylineBase;
            var ShouldBreak: boolean = false;
            var TempZIndex = cssp.GoogleMap.EditingZIndex;
            var CurrentMapObj: MapObj;
            var CurrentI: number;
            var CurrentJ: number;
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
            cssp.GoogleMap.MVCObjPolygons.forEach((elem: google.maps.Polygon, ind: number) => {
                if (elem.zIndex == TempZIndex) {
                    var Poly: google.maps.MVCArray = elem.getPath();

                    var LatLngList: Array<string> = [];

                    Poly.forEach((elem: google.maps.LatLng, ind: number) => {
                        LatLngList.push(elem.lat() + "s" + elem.lng());
                    });
                    var LatLngListText: string = LatLngList.join("p");
                    var command: string = "Map/SavePolyJSON";
                    $("#MapTopCenterID").trigger("click");
                    $(".EditSubMenu").removeClass("open");
                    $.post(cssp.BaseURL + command,
                        {
                            LatLngListText: LatLngListText,
                            MapInfoID: MapInfoIDPolygon,
                            IsPolygon: true,
                        }).done((ret) => {
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
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                            return;
                        });
                }
            });
            cssp.GoogleMap.MVCObjPolylines.forEach((elem: google.maps.Polyline, ind: number) => {
                if (elem.zIndex == TempZIndex) {
                    var Poly: google.maps.MVCArray = elem.getPath();

                    var LatLngList: Array<string> = [];

                    Poly.forEach((elem: google.maps.LatLng, ind: number) => {
                        LatLngList.push(elem.lat() + "s" + elem.lng());
                    });
                    var LatLngListText: string = LatLngList.join("p");
                    var command: string = "Map/SavePolyJSON";
                    $("#MapTopCenterID").trigger("click");
                    $(".EditSubMenu").removeClass("open");
                    $.post(cssp.BaseURL + command,
                        {
                            LatLngListText: LatLngListText,
                            MapInfoID: MapInfoIDPolyline,
                            IsPolygon: false,
                        }).done((ret) => {
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
                        }).fail(() => {
                            cssp.Dialog.ShowDialogErrorWithFail(command);
                            return;
                        });
                }
            });
        };
        public MapSizeSmaller: Function = (): void => {
            var ColNum: number = cssp.GoogleMap.GetColNumber($("#TextPanelID"), "md");
            if (ColNum < 11) {
                ColNum += 2;
            }
            cssp.GoogleMap.SetTextAndMapPanels(ColNum, 12 - ColNum);
            cssp.GoogleMap.DoMapResize();
            $("#MapTopCenterID").trigger("click");
        };
        public MapSizeBigger: Function = (): void => {
            var ColNum: number = cssp.GoogleMap.GetColNumber($("#TextPanelID"), "md");
            if (ColNum > 2) {
                ColNum -= 2;
            }
            cssp.GoogleMap.SetTextAndMapPanels(ColNum, 12 - ColNum);
            cssp.GoogleMap.DoMapResize();
            $("#MapTopCenterID").trigger("click");
        };
        public MapTopCenterShowHide: Function = (): void => {
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
        public PlainIcons: Function = ($aja: JQuery): void => {
            $(".jaMapIconsPlain").removeClass("hidden").addClass("hidden");
            $(".jaMapIconsLabel").removeClass("hidden");
            $("#MapTopCenterMenu").trigger("click");
            cssp.GoogleMap.IsLabel = false;
            cssp.GoogleMap.UseImage = false;
            cssp.GoogleMap.DrawObjects();
        };
        public Resize: Function = (): void => {
            google.maps.event.trigger(cssp.GoogleMap.Map, "resize");
        };
        public CleanColClass: Function = ($Panel: JQuery, MidTerm: string) => {
            for (var i = 1; i < 13; i++) {
                $Panel.removeClass("col-" + MidTerm + "-" + i);
            }
        };
        public SetTextAndMapPanels: Function = (TextColNumb: number, MapColNumb: number) => {
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
        public ShowGoogleMap: Function = (): void => {
            cssp.GoogleMap.MinLat = 90;
            cssp.GoogleMap.MaxLat = -90;
            cssp.GoogleMap.MinLng = 180;
            cssp.GoogleMap.MaxLng = -180;
            if ($("div.gm-style").length == 0) {
                var myOptions: google.maps.MapOptions = {
                    zoom: 10,
                    center: new google.maps.LatLng(46.291624, -64.722614),
                    mapTypeId: google.maps.MapTypeId.HYBRID,
                    scaleControl: true
                };
                cssp.GoogleMap.Map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                google.maps.event.addListener(cssp.GoogleMap.Map, "mousemove", (evt: google.maps.MouseEvent) => {
                    $("#CurrentLatLng").val(evt.latLng.lat().toString().substring(0, 8) + " " + evt.latLng.lng().toString().substring(0, 10));
                });
                google.maps.event.addListener(cssp.GoogleMap.Map, "click", () => {
                    cssp.GoogleMap.infoWindow.close();
                });
                cssp.GoogleMap.Map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById("MapTopCenterID"));
            }
            $("#MapTopCenterID").removeClass("hidden");
        };
        public ShowItemOnMap: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                var TVItemID: number = $bjs.data("tvitemid");
                if (TVItemID != 0) {
                    cssp.GoogleMap.DrawCross(TVItemID);
                }
                $(".jbMapShowItem").each((ind: number, elem: Element) => {
                    $(elem).removeClass("btn-success").addClass("btn-default");
                });
                $bjs.removeClass("btn-default").addClass("btn-success");
            }
            else {
                cssp.GoogleMap.DrawCross(-1);
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public ShowItemOnMapMWQMRun: Function = ($bjs: JQuery): void => {
            if ($bjs.hasClass("btn-default")) {
                var TVItemID: number = $bjs.closest("li").data("tvitemid");
                if (TVItemID != 0) {
                    cssp.GoogleMap.DrawCross(TVItemID);
                }
                $(".jbMapShowItem").each((ind: number, elem: Element) => {
                    $(elem).removeClass("btn-success").addClass("btn-default");
                });
                $bjs.removeClass("btn-default").addClass("btn-success");
            }
            else {
                cssp.GoogleMap.DrawCross(-1);
                $bjs.removeClass("btn-success").addClass("btn-default");
            }
        };
        public HideMap: Function = (): void => {
            $(".jaMapSizeBigger").addClass("hidden");
            $(".jaMapSizeSmaller").addClass("hidden");
            $(".jaShowHideMapTrack").addClass("hidden");
            $(".jaMapShowHide").find("span").eq(0).addClass("text-success");
            $(".jaMapShowHide").find("span").eq(0).removeClass("text-danger");
            var URLVarShowNumber = cssp.GetURLVarShowNumber(URLVarShowEnum.ShowMap);
            var temp: string = cssp.Variables.VariableShow;
            temp = temp.substr(0, URLVarShowNumber) + "0" + temp.substr(URLVarShowNumber + 1);
            cssp.Variables.VariableShow = temp;
            cssp.GoogleMap.SetTextAndMapPanels(12, 0);
        };
        public ShowMap: Function = (): void => {
            $(".jaMapSizeBigger").removeClass("hidden");
            $(".jaMapSizeSmaller").removeClass("hidden");
            $(".jaShowHideMapTrack").removeClass("hidden");
            $(".jaMapShowHide").find("span").eq(0).removeClass("text-success");
            $(".jaMapShowHide").find("span").eq(0).addClass("text-danger");
            var URLVarShowNumber = cssp.GetURLVarShowNumber(URLVarShowEnum.ShowMap);
            var temp: string = cssp.Variables.VariableShow;
            temp = temp.substr(0, URLVarShowNumber) + "1" + temp.substr(URLVarShowNumber + 1);
            cssp.Variables.VariableShow = temp;
            cssp.GoogleMap.SetTextAndMapPanels(6, 6);
            cssp.GoogleMap.ShowGoogleMap();
            cssp.GoogleMap.DoMapResize();
            cssp.GoogleMap.ReadAndShowObjects(true);
        };
        public ReadAndShowObjects: Function = (Recenter: boolean): void => {
            cssp.GoogleMap.MinLat = 90;
            cssp.GoogleMap.MaxLat = -90;
            cssp.GoogleMap.MinLng = 180;
            cssp.GoogleMap.MaxLng = -180;

            if ($("div.gm-style").length == 1) {
                cssp.GoogleMap.infoWindow.close();
            }

            cssp.GoogleMap.LegendArr = [];
            cssp.GoogleMap.TVItemObjects = [];
            let mapItems: Array<CSSP.tvLocation> = [];
            let command: string = "Map/GetMapInfoJSON";
            $.get(cssp.BaseURL + command, {
                Q: cssp.Variables.URL,
            }).done((ret: Array<CSSP.tvLocation>) => {
                $.map(ret, (item) => {
                    let tvLoc: CSSP.tvLocation = new CSSP.tvLocation(item.TVItemID, item.TVText, item.TVType, item.SubTVType, item.MapObjList);
                    mapItems.push(tvLoc);
                });
                cssp.GoogleMap.FillTVItemObjects(mapItems, Recenter);
            }).fail(() => {
                cssp.Dialog.ShowDialogErrorWithFail(command);
            });
        };
    }
}
