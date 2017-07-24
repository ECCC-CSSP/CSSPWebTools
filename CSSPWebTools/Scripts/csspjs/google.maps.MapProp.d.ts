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

    export enum MapTypeId {
        /**
        * This map type displays a transparent layer of major streets on satellite images.
        */
        HYBRID,
        /**
        * This map type displays a normal street map.
        */
        ROADMAP,
        /**
        * This map type displays satellite images.
        */
        SATELLITE,
        /**
        * This map type displays maps with physical features such as terrain and vegetation.
        */
        TERRAIN
    }

    export interface MapType {
        /**
        * Returns a tile for the given tile coordinate (x, y) and zoom level. This tile will be appended to the given ownerDocument. Not available for base map types.
        */
        getTile(tileCoord: Point, zoom: number, ownerDocument: Document): Element;
        /**
        * Releases the given tile, performing any necessary cleanup. The provided tile will have already been removed from the document. Optional.
        */
        releaseTile(tile: Element): void;


        // ----------------------------------------------------
        // Properties
        // ----------------------------------------------------

        /**
        * Alt text to display when this MapType's button is hovered over in the MapTypeControl. Optional.
        */
        alt?: string;
        /**
        * The maximum zoom level for the map when displaying this MapType. Required for base MapTypes, ignored for overlay MapTypes.
        */
        maxZoom?: number;
        /**
        * The minimum zoom level for the map when displaying this MapType. Optional; defaults to 0.
        */
        minZoom?: number;
        /**
        * Name to display in the MapTypeControl. Optional.
        */
        name?: string;
        /**
        * The Projection used to render this MapType. Optional; defaults to Mercator.
        */
        projection?: Projection;
        /**
        * Radius of the planet for the map, in meters. Optional; defaults to Earth's equatorial radius of 6378137 meters.
        */
        radius?: number;
        /**
        * The dimensions of each tile. Required.
        */
        tileSize?: Size;
    }

    export class MapTypeRegistry extends MVCObject {
        /**
        * The MapTypeRegistry holds the collection of custom map types available to the map for its use. 
        * The API consults this registry when providing the list of avaiable map types within controls, for example.
        */
        constructor();
        /**
        * Sets the registry to associate the passed string identifier with the passed MapType.
        */
        set(id: string, mapType: MapType): void;
    }

    export interface Projection {
        /**
        * Translates from the LatLng cylinder to the Point plane. This interface specifies a function which implements translation 
        * from given LatLng values to world coordinates on the map projection. The Maps API calls this method when it needs to plot 
        * locations on screen. Projection objects must implement this method.
        */
        fromLatLngToPoint(latLng: LatLng, point?: Point): Point;
        /**
        * This interface specifies a function which implements translation from world coordinates on a map projection to LatLng values. 
        * The Maps API calls this method when it needs to translate actions on screen to positions on the map. Projection objects must implement this method.
        */
        fromPointToLatLng(pixel: Point, noWrap?: boolean): LatLng;
    }

    export class ImageMapType extends MVCObject implements MapType {
        /**
        * This class implements the MapType interface and is provided for rendering image tiles.
        * -
        * Constructs an ImageMapType using the provided ImageMapTypeOptions
        */
        constructor(opts: ImageMapTypeOptions);
        /**
        * Returns the opacity level (0 (transparent) to 1.0) of the ImageMapType tiles.
        */
        getOpacity(): number;
        /**
        * Gets the requested tile
        */
        getTile(tileCoord: Point, zoom: number, ownerDocument: Document): Element;
        /**
        * Release the tile
        */
        releaseTile(tile: Element): void;
        /**
        * Sets the opacity level (0 (transparent) to 1.0) of the ImageMapType tiles.
        */
        setOpacity(opacity: number): void;

        // ----------------------------------------------
        // Event
        // ----------------------------------------------

        /**
        * This event is fired when the visible tiles have finished loading.
        */
        tilesloaded();
    }

    export interface ImageMapTypeOptions {
        /**
        * Returns a string (URL) for given tile coordinate (x, y) and zoom level.
        */
        getTileUrl: (tileCoord: Point, zoom: number) => string;


        // -------------------------------------------------------
        // Properties
        // -------------------------------------------------------

        /**
        * Alt text to display when this MapType's button is hovered over in the MapTypeControl.
        */
        alt?: string;
        /**
        * The maximum zoom level for the map when displaying this MapType.
        */
        maxZoom?: number;
        /**
        * The minimum zoom level for the map when displaying this MapType. Optional.
        */
        minZoom?: number;
        /**
        * Name to display in the MapTypeControl.
        */
        name?: string;
        /**
        * The opacity to apply to the tiles. The opacity should be specified as a float value between 0 and 1.0, where 0 is fully transparent and 1 is fully opaque.
        */
        opacity?: number;
        /**
        * The tile size.
        */
        tileSize?: Size;
    }

    export interface StyledMapType {
        /**
        * Creates a MapType with a custom style.
        * -
        * Creates a styled MapType with the specified options. The StyledMapType takes an array of MapTypeStyles, 
        * where each MapTypeStyle is applied to the map consecutively. A later MapTypeStyle that applies the same MapTypeStylers 
        * to the same selectors as an earlier MapTypeStyle will override the earlier MapTypeStyle.
        */
        constructor(styles: Array<MapTypeStyle>, options?: StyledMapTypeOptions);

        /**
        * Gets the requested tile
        */
        getTile(tileCoord: Point, zoom: number, ownerDocument: Document): Element;
        /**
        * Release the tile
        */
        releaseTile(tile: Element): void;

        // -------------------------------------------------------
        // Properties
        // -------------------------------------------------------

        /**
        * Alt text to display when this MapType's button is hovered over in the MapTypeControl.
        */
        alt?: string;
        /**
        * The maximum zoom level for the map when displaying this MapType.
        */
        maxZoom?: number;
        /**
        * The minimum zoom level for the map when displaying this MapType. Optional.
        */
        minZoom?: number;
        /**
        * Name to display in the MapTypeControl.
        */
        name?: string;
        /**
        * The opacity to apply to the tiles. The opacity should be specified as a float value between 0 and 1.0, where 0 is fully transparent and 1 is fully opaque.
        */
        opacity?: number;
        /**
        * The tile size.
        */
        tileSize?: Size;

    }

    export interface StyledMapTypeOptions {
        /**
        * Text to display when this MapType's button is hovered over in the map type control.
        */
        alt?: string;
        /**
        * The maximum zoom level for the map when displaying this MapType. Optional.
        */
        maxZoom?: number;
        /**
        * The minimum zoom level for the map when displaying this MapType. Optional.
        */
        minZoom?: number;
        /**
        * The name to display in the map type control.
        */
        name?: string;
    }

    export interface MapTypeStyle {
        /**
        * Selects the element type to which a styler should be applied.
        * An element type distinguishes between the different representations of a feature. Optional; 
        * if elementType is not specified, the value is assumed to be 'all'.
        */
        elementType?: MapTypeStyleElementType;
        /**
        * Selects the feature, or group of features, to which a styler should be applied. Optional; 
        * if featureType is not specified, the value is assumed to be 'all'.
        */
        featureType?: MapTypeStyleFeatureType;
        /** 
        * The style rules to apply to the selectors. The rules are applied to the map's elements in the order they are listed in this array.
        */
        stylers?: Array<MapTypeStyler>;
    }

    export interface administrative {
        /**
        * Apply the rule to countries.
        */
        country?: string;
        /**
        * Apply the rule to land parcels.
        */
        land_parcel?: string;
        /**
        * Apply the rule to localities.
        */
        locality?: string;
        /**
        * Apply the rule to neighborhoods.
        */
        neighborhood?: string;
        /**
        * Apply the rule to provinces.
        */
        province?: string;
    }

    export interface natural {
        /**
        * Apply the rule to landcover.
        */
        landcover?: string;
        /**
        * Apply the rule to terrain.
        */
        terrain?: string;
    }

    export interface landscape {
        /**
        * Apply the rule to man made structures.
        */
        man_made?: string;
        /**
        * Apply the rule to natural features.
        */
        natural?: string;
    }

    export interface poi {
        /**
        * Apply the rule to attractions for tourists.
        */
        attraction?: string;
        /**
        * Apply the rule to businesses.
        */
        business?: string;
        /**
        * Apply the rule to government buildings.
        */
        government?: string;
        /**
        * Apply the rule to emergency services (hospitals, pharmacies, police, doctors, etc).
        */
        medical?: string;
        /**
        * Apply the rule to parks.
        */
        park?: string;
        /**
        * Apply the rule to places of worship, such as church, temple, or mosque.
        */
        place_of_worship?: string;
        /**
        * Apply the rule to schools.
        */
        school?: string;
        /**
        * Apply the rule to sports complexes.
        */
        sports_complex?: string;
    }

    export interface highway {
        /**
        * Apply the rule to controlled-access highways.
        */
        controlled_access?: string;
    }

    export interface road {
        /**
        * Apply the rule to arterial roads.
        */
        arterial?: string;
        /**
        * Apply the rule to highways.
        */
        highway?: highway;
        /**
        * Apply the rule to local roads.
        */
        local?: string;
    }

    export interface station {
        /**
        * Apply the rule to airports.
        */
        airport?: string;
        /**
        * Apply the rule to bus stops.
        */
        bus?: string;
        /**
        * Apply the rule to rail stations.
        */
        rail?: string;
    }

    export interface transit {
        /**
        * Apply the rule to transit lines.
        */
        line?: string;
        /**
        * Apply the rule to all transit stations.
        */
        station?: station;
    }

    export interface MapTypeStyleFeatureType {
        /**
        * Apply the rule to administrative areas.
        */
        administrative?: administrative;
        /**
        * Apply the rule to all selector types.
        */
        all?: string;
        /**
        * Apply the rule to landscapes.
        */
        landscape?: landscape;
        /**
        * Apply the rule to points of interest.
        */
        poi?: poi;
        /**
        * Apply the rule to all roads.
        */
        road?: road;
        /**
        * Apply the rule to all transit stations and lines.
        */
        transit?: transit;
        /**
        * Apply the rule to bodies of water.
        */
        water?: string;
    }

    export interface geometry {
        /**
        * Apply the rule to the fill of the feature's geometry.
        */
        fill?: string;
        /**
        * Apply the rule to the stroke of the feature's geometry.
        */
        stroke?: string;
    }

    export interface text {
        /**
        * Apply the rule to the fill of the text in the feature's labels.
        */
        fill?: string;
        /**
        * Apply the rule to the stroke of the text in the feature's labels.
        */
        stroke?: string;
    }

    export interface labels {
        /**
        * Apply the rule to icons within the feature's labels.
        */
        icon?: string;
        /**
        * Apply the rule to the stroke of the feature's geometry.
        */
        text?: text;
    }

    export interface MapTypeStyleElementType {
        /**
        * Apply the rule to all elements of the specified feature.
        */
        all?: string;
        /**
        * Apply the rule to the feature's geometry.
        */
        geometry?: geometry;
        /**
        * Apply the rule to the feature's labels.
        */
        labels?: labels;
    }

    export interface MapTypeStyler {
        /**
        * Sets the color of the feature. Valid values: An RGB hex string, i.e. '#ff0000'.
        */
        color?: string;
        /**
        * Modifies the gamma by raising the lightness to the given power. Valid values: 
        * Floating point numbers, [0.01, 10], with 1.0 representing no change.
        */
        gamma?: number;
        /**
        * Sets the hue of the feature to match the hue of the color supplied. Note that the saturation and lightness 
        * of the feature is conserved, which means that the feature will not match the color supplied exactly. 
        * Valid values: An RGB hex string, i.e. '#ff0000'.
        */
        hue?: string;
        /**
        * A value of true will invert the lightness of the feature while preserving the hue and saturation.
        */
        invert_lightness?: boolean;
        /**
        * Shifts lightness of colors by a percentage of the original value if decreasing and a percentage 
        * of the remaining value if increasing. Valid values: [-100, 100].
        */
        lightness?: number;
        /**
        * Shifts the saturation of colors by a percentage of the original value if decreasing and a percentage 
        * of the remaining value if increasing. Valid values: [-100, 100].
        */
        saturation?: number;
        /**
        * Sets the visibility of the feature. Valid values: 'on', 'off' or 'simplifed'.
        */
        visibility?: string;
        /**
        * Sets the weight of the feature, in pixels. Valid values: Integers greater than or equal to zero.
        */
        weight?: number;
    }

    export class MaxZoomService {
        /**
        * A service for obtaining the highest zoom level at which satellite imagery is available for a given location.
        * -
        * Creates a new instance of a MaxZoomService that can be used to send queries about the maximum zoom level available for satellite imagery.
        */
        constructor();
        /**
        * Returns the maximum zoom level available at a particular LatLng for the Satellite map type. As this request is asynchronous, 
        * you must pass a callback function which will be executed upon completion of the request, being passed a MaxZoomResult.
        */
        getMaxZoomAtLatLng(latlng: LatLng, callback: (result: MaxZoomResult) => void): void;
    }

    export interface MaxZoomResult {
        /**
        * Status of the request.
        */
        status: MaxZoomStatus;
        /**
        * The maximum zoom level found at the given LatLng.
        */
        zoom: number;
    }

    export enum MaxZoomStatus {
        /**
        * There was a problem contacting the Google servers.
        */
        ERROR,
        /**
        * The maximum zoom level found at the given LatLng.
        */
        OK
    }

    export class OverlayView extends MVCObject {
        /**
        * You can implement this class if you want to display custom types of overlay objects on the map. 
        * -
        * Inherit from this class by setting your overlay's prototype: MyOverlay.prototype = new google.maps.OverlayView();. 
        * The OverlayView constructor is guaranteed to be an empty function. 
        * -
        * You must implement three methods: onAdd(), draw(), and onRemove().
        * -
        * In the onAdd() method, you should create DOM objects and append them as children of the panes.
        * In the draw() method, you should position these elements.
        * In the onRemove() method, you should remove the objects from the DOM.
        * -
        * You must call setMap() with a valid Map object to trigger the call to the onAdd() method and setMap(null) in 
        * order to trigger the onRemove() method. The setMap() method can be called at the time of construction or at any point 
        * afterward when the overlay should be re-shown after removing. The draw() method will then be called whenever a map 
        * property changes that could change the position of the element, such as zoom, center, or map type.
        */
        constructor();
        /**
        * Implement this method to draw or update the overlay. This method is called after onAdd() and when the position from 
        * projection.fromLatLngToPixel() would return a new value for a given LatLng. This can happen on change of zoom, center, 
        * or map type. It is not necessarily called on drag or resize.
        */
        draw(): void;
        /**
        * Returns the Map or StreetViewPanorama
        */
        getMap(): Map;
        /**
        * Returns the panes in which this OverlayView can be rendered. The panes are not initialized until onAdd is called by the API.
        */
        getPanes(): MapPanes;
        /**
        * Returns the MapCanvasProjection object associated with this OverlayView. 
        * The projection is not initialized until onAdd is called by the API.
        */
        getProjection(): MapCanvasProjection;
        /**
        * Implement this method to initialize the overlay DOM elements. 
        * This method is called once after setMap() is called with a valid map. 
        * At this point, panes and projection will have been initialized.
        */
        onAdd(): void;
        /**
        * Implement this method to remove your elements from the DOM. 
        * This method is called once following a call to setMap(null).
        */
        onRemove(): void;
        /**
        * Adds the overlay to the map or panorama.
        */
        setMap(map: Map): void;
        /**
        * Adds the overlay to the map or panorama.
        */
        setMap(map: StreetViewPanorama): void;
    }

    export interface MapPanes {
        /**
        * This pane contains the info window. It is above all map overlays. (Pane 6).
        */
        floatPane: Element;
        /**
        * This pane contains the info window shadow. It is above the overlayImage, so that markers can be in the shadow of the info window. (Pane 4).
        */
        floatShadow: Element;
        /**
        * This pane is the lowest pane and is above the tiles. It may not receive DOM events. (Pane 0).
        */
        mapPane: Element;
        /**
        * This pane contains the marker foreground images. (Pane 3).
        */
        overlayImage: Element;
        /**
        * This pane contains polylines, polygons, ground overlays and tile layer overlays. It may not receive DOM events. (Pane 1).
        */
        overlayLayer: Element;
        /**
        * This pane contains elements that receive DOM mouse events, such as the transparent targets for markers. 
        * It is above the floatShadow, so that markers in the shadow of the info window can be clickable. (Pane 5).
        */
        overlayMouseTarget: Element;
        /**
        * This pane contains the marker shadows. It may not receive DOM events. (Pane 2).
        */
        overlayShadow: Element;
    }

    export class MapCanvasProjection extends MVCObject {
        /**
        * Computes the geographical coordinates from pixel coordinates in the map's container.
        */
        fromContainerPixelToLatLng(pixel: Point, nowrap?: boolean): LatLng;
        /**
        * Computes the geographical coordinates from pixel coordinates in the div that holds the draggable map.
        */
        fromDivPixelToLatLng(pixel: Point, nowrap?: boolean): LatLng;
        /**
        * Computes the pixel coordinates of the given geographical location in the map's container element.
        */
        fromLatLngToContainerPixel(latLng: LatLng): Point;
        /**
        * Computes the pixel coordinates of the given geographical location in the DOM element that holds the draggable map.
        */
        fromLatLngToDivPixel(latLng: LatLng): Point;
        /**
        * The width of the world in pixels in the current zoom level. For projections with a 
        * heading angle of either 90 or 270 degrees, this corresponds to the pixel span in the Y-axis.
        */
        getWorldWidth(): number;
    }

} 