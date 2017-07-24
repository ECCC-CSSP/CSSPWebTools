// Type definitions for Google Geolocation 0.4.8
// Project: https://developers.google.com/maps/
// Definitions by: Folia A/S <http://www.folia.dk>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/*
The MIT License

Copyright (c) 2012 Folia A/S. http://www.folia.dk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated doc files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

declare module google.maps {

    /***** Map *****/
    export class Map extends MVCObject {
        /**
        * Creates a new map inside of the given HTML container, which is typically a DIV element.
        */
        constructor(mapDiv: Element, opts?: MapOptions);
        /**
        * Sets the viewport to contain the given bounds.
        */
        fitBounds(bounds: LatLngBounds): void;
        /**
        * Returns the lat/lng bounds of the current viewport. If more than one copy of the world is visible, 
        * the bounds range in longitude from -180 to 180 degrees inclusive. If the map is not yet initialized (i.e. the mapType is still null), 
        * or center and zoom have not been set then the result is null or undefined.
        */
        getBounds(): LatLngBounds;
        /**
        * Returns the position displayed at the center of the map. Note that this LatLng object is not wrapped. See LatLng for more information.
        */
        getCenter(): LatLng;
        /**
        * Returns the element containing the map
        */
        getDiv(): Element;
        /**
        * Returns the compass heading of aerial imagery. The heading value is measured in degrees (clockwise) from cardinal direction North.
        */
        getHeading(): number;
        /**
        * Returns the MapTypeId or a string
        */
        getMapTypeId(): MapTypeId;
        /**
        * Returns the current Projection. If the map is not yet initialized (i.e. the mapType is still null) 
        * then the result is null. Listen to projection_changed and check its value to ensure it is not null.
        */
        getProjection(): Projection;
        /**
        * Returns the default StreetViewPanorama bound to the map, which may be a default panorama embedded within the map, 
        * or the panorama set using setStreetView(). Changes to the map's streetViewControl will be reflected in the display of such a bound panorama.
        */
        getStreetView(): StreetViewPanorama;
        /**
        * Returns the current angle of incidence of the map, in degrees from the viewport plane to the map plane. 
        * The result will be 0 for imagery taken directly overhead or 45 for 45° imagery. 
        * 45° imagery is only available for SATELLITE and HYBRID map types, within some locations, and at some zoom levels. 
        * Note: This method does not return the value set by setTilt. See setTilt for details.
        */
        getTilt(): number;
        /**
        * Returns the zoom number
        */
        getZoom(): number;
        /**
        * Changes the center of the map by the given distance in pixels. If the distance is less than both the width and height of the map, 
        * the transition will be smoothly animated. Note that the map coordinate system increases from west to east (for x values) and north to south (for y values).
        */
        panBy(x: number, y: number): void;
        /**
        * Changes the center of the map to the given LatLng. If the change is less than both the width and height of the map, the transition will be smoothly animated.
        */
        panTo(latLng: LatLng): void;
        /**
        * Pans the map by the minimum amount necessary to contain the given LatLngBounds. 
        * It makes no guarantee where on the map the bounds will be, except that as much of the bounds as possible will be visible. 
        * The bounds will be positioned inside the area bounded by the map type and navigation (pan, zoom, and Street View) controls, 
        * if they are present on the map. If the bounds is larger than the map, the map will be shifted to include the northwest corner of the bounds. 
        * If the change in the map's position is less than both the width and height of the map, the transition will be smoothly animated.
        */
        panToBounds(latLngBounds: LatLngBounds): void;
        /**
        * Sets the center of the map
        */
        setCenter(latlng: LatLng): void;
        /**
        * Sets the compass heading for aerial imagery measured in degrees from cardinal direction North.
        */
        setHeading(heading: number): void;
        /**
        * Sets the MapTypeId
        */
        setMapTypeId(mapTypeId: MapTypeId): void;
        /**
        * Sets the MapOptions
        */
        setOptions(options: MapOptions): void;
        /**
        * Binds a StreetViewPanorama to the map. This panorama overrides the default StreetViewPanorama, 
        * allowing the map to bind to an external panorama outside of the map. 
        * Setting the panorama to null binds the default embedded panorama back to the map.
        */
        setStreetView(panorama: StreetViewPanorama): void;
        /**
        * Controls the automatic switching behavior for the angle of incidence of the map. The only allowed values are 0 and 45. 
        * setTilt(0) causes the map to always use a 0° overhead view regardless of the zoom level and viewport. 
        * setTilt(45) causes the tilt angle to automatically switch to 45 whenever 45° imagery is available for the 
        * current zoom level and viewport, and switch back to 0 whenever 45° imagery is not available (this is the default behavior). 
        * 45° imagery is only available for SATELLITE and HYBRID map types, within some locations, and at some zoom levels. 
        * Note: getTilt returns the current tilt angle, not the value set by setTilt. Because getTilt and setTilt refer to different things, 
        * do not bind() the tilt property; doing so may yield unpredictable effects.
        */
        setTilt(tilt: number): void;
        /**
        * Sets the zoom number
        */
        setZoom(zoom: number): void;


        // ----------------------------------------------
        // properties
        // ----------------------------------------------

        /**
        * Additional controls to attach to the map. To add a control to the map, add the control's <div> 
        * to the MVCArray corresponding to the ControlPosition where it should be rendered.
        * -
        * MVCArray is of type Array<Node>
        */
        controls: Array<MVCArray>;
        /**
        * A registry of MapType instances by string ID.
        */
        mapTypes: MapTypeRegistry;
        /**
        * Additional map types to overlay.
        * -
        * MVCArray is of type Array<MapType>
        */
        overlayMapTypes: MVCArray; 


        // -------------------------------------------------------
        // Event
        // -------------------------------------------------------

        /**
        * This event is fired when the viewport bounds have changed.
        */
        bounds_changed();
        /**
        * This event is fired when the map center property changes.
        */
        center_changed();
        /**
        * This event is fired when the user clicks on the map (but not when they click on a marker or infowindow).
        */
        click(evt: MouseEvent);
        /**
        * This event is fired when the user double-clicks on the map. Note that the click event will also fire, right before this one.
        */
        dblclick(evt: MouseEvent);
        /**
        * This event is repeatedly fired while the user drags the map.
        */
        drag();
        /**
        * This event is fired when the user stops dragging the map.
        */
        dragend();
        /**
        * This event is fired when the user starts dragging the map.
        */
        dragstart();
        /**
        * This event is fired when the map heading property changes.
        */
        heading_changed();
        /**
        * This event is fired when the map becomes idle after panning or zooming.
        */
        idle();
        /**
        * This event is fired when the mapTypeId property changes.
        */
        maptypeid_changed();
        /**
        * This event is fired whenever the user's mouse moves over the map container.
        */
        mousemove(evt: MouseEvent);
        /** 
        * This event is fired when the user's mouse exits the map container.
        */
        mouseout(evt: MouseEvent);
        /**
        * This event is fired when the user's mouse enters the map container.
        */
        mouseover(evt: MouseEvent);
        /**
        * This event is fired when the projection has changed.
        */
        projection_changed();
        /**
        * Developers should trigger this event on the map when the div changes size: google.maps.event.trigger(map, 'resize') .
        */
        resize();
        /** 
        * This event is fired when the DOM contextmenu event is fired on the map container.
        */
        rightclick(evt: MouseEvent);
        /**
        * This event is fired when the visible tiles have finished loading.
        */
        tilesloaded();
        /**
        * This event is fired when the map tilt property changes.
        */
        tilt_changed();
        /**
        * This event is fired when the map zoom property changes.
        */
        zoom_changed();


    }

    export interface MapOptions {
        /**
        * Color used for the background of the Map div. This color will be visible when tiles have not yet loaded as the user pans. 
        * This option can only be set when the map is initialized.
        */
        backgroundColor?: string;
        /**
        * The initial Map center. Required.
        */
        center?: LatLng;
        /**
        * Enables/disables all default UI. May be overridden individually.
        */
        disableDefaultUI?: boolean;
        /**
        * Enables/disables zoom and center on double click. Enabled by default.
        */
        disableDoubleClickZoom?: boolean;
        /**
        * If false, prevents the map from being dragged. Dragging is enabled by default.
        */
        draggable?: boolean;
        /**
        * The name or url of the cursor to display when mousing over a draggable map. 
        * This property uses the css cursor attribute to change the icon. As with the css property, you must specify at 
        * least one fallback cursor that is not a URL. For example: draggableCursor: 'url(http://www.example.com/icon.png), auto;'.
        */
        draggableCursor?: string;
        /**
        * The name or url of the cursor to display when the map is being dragged. 
        * This property uses the css cursor attribute to change the icon. As with the css property, you must specify at 
        * least one fallback cursor that is not a URL. For example: draggingCursor: 'url(http://www.example.com/icon.png), auto;'.
        */
        draggingCursor?: string;
        /**
        * The heading for aerial imagery in degrees measured clockwise from cardinal direction North. 
        * Headings are snapped to the nearest available angle for which imagery is available.
        */
        heading?: number;
        /**
        * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are enabled by default.
        */
        keyboardShortcuts?: boolean;
        /**
        * True if Map Maker tiles should be used instead of regular tiles.
        */
        mapMaker?: boolean;
        /**
        * The initial enabled/disabled state of the Map type control.
        */
        mapTypeControl?: boolean;
        /**
        * The initial display options for the Map type control.
        */
        mapTypeControlOptions?: MapTypeControlOptions;
        /**
        * The initial Map mapTypeId. Defaults to ROADMAP.
        */
        mapTypeId?: MapTypeId;
        /**
        * The maximum zoom level which will be displayed on the map. If omitted, or set to null, the maximum zoom from the current map type is used instead.
        */
        maxZoom?: number;
        /**
        * The minimum zoom level which will be displayed on the map. If omitted, or set to null, the minimum zoom from the current map type is used instead.
        */
        minZoom?: number;
        /**
        * If true, do not clear the contents of the Map div.
        */
        noClear?: boolean;
        /**
        * The enabled/disabled state of the Overview Map control.
        */
        overviewMapControl?: boolean;
        /**
        * The display options for the Overview Map control.
        */
        overviewMapControlOptions?: OverviewMapControlOptions;
        /**
        * The enabled/disabled state of the Pan control.
        */
        panControl?: boolean;
        /**
        * The display options for the Pan control.
        */
        panControlOptions?: PanControlOptions;
        /**
        * The enabled/disabled state of the Rotate control.
        */
        rotateControl?: boolean;
        /**
        * The display options for the Rotate control.
        */
        rotateControlOptions?: RotateControlOptions;
        /**
        * The initial enabled/disabled state of the Scale control.
        */
        scaleControl?: boolean;
        /**
        * The initial display options for the Scale control.
        */
        scaleControlOptions?: ScaleControlOptions;
        /**
        * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
        */
        scrollwheel?: boolean;
        /**
        * A StreetViewPanorama to display when the Street View pegman is dropped on the map. 
        * If no panorama is specified, a default StreetViewPanorama will be displayed in the map's div when the pegman is dropped.
        */
        streetView?: StreetViewPanorama;
        /**
        * The initial enabled/disabled state of the Street View Pegman control. This control is part of the default UI, 
        * and should be set to false when displaying a map type on which the Street View road overlay should not appear (e.g. a non-Earth map type).
        */
        streetViewControl?: boolean;
        /**
        * The initial display options for the Street View Pegman control.
        */
        streetViewControlOptions?: StreetViewControlOptions;
        /**
        * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain modes, these styles will only apply to labels and geometry.
        */
        styles?: Array<MapTypeStyle>;
        /**
        * Controls the automatic switching behavior for the angle of incidence of the map. 
        * The only allowed values are 0 and 45. The value 0 causes the map to always use a 0° overhead view regardless of the zoom level and viewport. 
        * The value 45 causes the tilt angle to automatically switch to 45 whenever 45° imagery is available for the current zoom level and viewport, 
        * and switch back to 0 whenever 45° imagery is not available (this is the default behavior). 45° imagery is only available for 
        * SATELLITE and HYBRID map types, within some locations, and at some zoom levels. Note: getTilt returns the current tilt angle, 
        * not the value specified by this option. Because getTilt and this option refer to different things, do not bind() 
        * the tilt property; doing so may yield unpredictable effects.
        */
        tilt?: number;
        /**
        * The initial Map zoom level. Required.
        */
        zoom?: number;
        /**
        * The enabled/disabled state of the Zoom control.
        */
        zoomControl?: boolean;
        /**
        * The display options for the Zoom control.
        */
        zoomControlOptions?: ZoomControlOptions;
    }


} 