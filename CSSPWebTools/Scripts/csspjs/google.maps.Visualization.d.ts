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

    export module visualization {

        export class MapsEngineLayer extends MVCObject {
            /**
            * A MapsEngineLayer allows you to display data from Google Maps Engine or the Google Earth Gallery.
            * -
            * Creates a new instance of MapsEngineLayer.
            */
            constructor(options: MapsEngineLayerOptions);
            /**
            * Returns the ID of the Maps Engine layer being displayed, if set.
            */
            getLayerId(): string;
            /**
            * Returns the key of the layer to be displayed.
            */
            getLayerKey(): string;
            /**
            * Returns the map on which this layer is displayed.
            */
            getMap(): Map;
            /**
            * Returns the ID of the Maps Engine map to which the layer belongs.
            */
            getMapId(): string;
            /**
            * Returns the opacity of the layer.Applies only to imagery layers.
            */
            getOpacity(): number;
            /**
            * Returns properties of the Maps Engine layer, which are available once the layer has loaded.
            */
            getProperties(): MapsEngineLayerProperties;
            /**
            * Returns the status of the layer, which is available once the requested layer has loaded.
            */
            getStatus(): MapsEngineStatus;
            /**
            * Returns the z - index.
            */
            getZIndex(): number;
            /**
            * Sets the ID of a single Maps Engine layer to display.Changing this value will cause the layer to be redrawn.
            */
            setLayerId(layerId: string): void;
            /**
            * Sets the key of the layer to be displayed.Maps Engine layer keys are only unique within a single map, and can be changed by map owners.Changing this value will cause the layer to be redrawn.
            */
            setLayerKey(layerKey: string): void;
            /**
            * Renders the layer on the specified map.If map is set to null, the layer will be removed.
            */
            setMap(map: Map): void;
            /**
            * Sets the ID of the Maps Engine map that contains the layer with the given layerKey.Changing this value will cause the layer to be redrawn.
            */
            setMapId(mapId: string): void;
            /**
            * Sets the opacity of the layer, expressed as a number between 0 and 1. Applies only to imagery layers. Note: Be careful of setting this option for other layer types, as it may become effective in the future.
            */
            setOpacity(opacity: number): void;
            /**
            * Sets MapEngineLayer options
            */
            setOptions(options: MapsEngineLayerOptions): void;
            /**
            * Sets the z - index.Only applies to Vector and KML layers.
            */
            setZIndex(zIndex: number): void;


            // ------------------------------------------------
            // Event
            // ------------------------------------------------

            /**
            * This event is fired when a feature in the layer is clicked.
            */
            click(mapsEngineMouseEvent: MapsEngineMouseEvent);
            /**
            * This event is fired when the layer has finished loading, and the layer's properties are available for reading.
            */
            properties_changed();
            /**
            * This event is fired when the layer has finished loading, and the status is available to determine if the layer loaded successfully.
            */
            status_changed();
        }

        export interface MapsEngineLayerOptions {
            /**
            * The authentication token returned by an OAuth 2.0 authentication request.
            */
            accessToken?: string;
            /**
            * If true, the layer receives mouse events.Default value is true.
            */
            clickable?: boolean;
            /**
            * If this option is set to true, the map viewport is centered and zoomed to the bounding box of the contents of the 
            * layer.Default value is false.Applies only to KML layers. Note: Be careful when setting this option for 
            * other layer types, as it may become effective in the future.
            */
            fitBounds?: boolean;
            /**
            * The ID of a single Maps Engine layer to display.
            */
            layerId?: string;
            /**
            * The key of the layer to display.Maps Engine layer keys are only unique within a single map, and can be changed by map owners.
            */
            layerKey?: string;
            /**
            * The map on which to display the layer.
            */
            map?: Map;
            /**
            * The ID of the Maps Engine map that contains the layer with the given layerKey.
            */
            mapId?: string;
            /**
            * The opacity of the layer, expressed as a number between 0 and 1. 
            * Defaults to 1. Applies only to imagery layers. Note: 
            * Be careful of setting this option for other layer types, as it may become effective in the future.
            */
            opacity?: number;
            /**
            * Suppress the rendering of info windows when layer features are clicked.
            */
            suppressInfoWindows?: boolean;
            /**
            * The z - index of the layer.Only applies to Vector and KML layers.
            */
            zIndex?: number;
        }

        export interface MapsEngineLayerProperties {
            /**
            * The name of the layer.
            */
            name?: string;
        }

        export interface MapsEngineMouseEvent {
            /**
            * The feature ID, guaranteed to be unique within the layer.
            */
            featureId: string;
            /**
            * Pre-rendered HTML content, as placed in the infowindow by the default UI.
            */
            infoWindowHtml: string;
            /**
            * The position at which to anchor an infowindow on the clicked feature.
            */
            latLng: LatLng;
            /**
            * The offset to apply to an infowindow anchored on the clicked feature.
            */
            pixelOffset: Size;
        }

        export enum MapsEngineStatus {
            /**
            * The requested layer is not a valid layer.
            */
            INVALID_LAYER,
            /**
            * The layer loaded successfully.
            */
            OK,
            /**
            * The layer failed to load for an unknown reason.
            */
            UNKNOWN_ERROR
        }

        export class DynamicMapsEngineLayer {
            /**
            * A DynamicMapsEngineLayer allows you to display data from Google Maps Engine or the Google Earth Gallery.
            * -
            * Creates a new instance of DynamicMapsEngineLayer.
            */
            constructor(options: DynamicMapsEngineLayerOptions);
            /**
            * Returns the style for the given feature, with which individual style properties can be retrieved or set.
            */
            getFeatureStyle(featureId: string): FeatureStyle;
            /**
            * Returns the ID of the Maps Engine layer being displayed, if set.
            */
            getLayerId(): string;
            /**
            * Returns the key of the layer to be displayed.
            */
            getLayerKey(): string;
            /**
            * Returns the map on which this layer is displayed.
            */
            getMap(): Map;
            /**
            * Returns the ID of the Maps Engine map to which the layer belongs.
            */
            getMapId(): string;
            /**
            * Returns the opacity of the layer.Applies only to imagery layers.
            */
            getOpacity(): number;
            /**
            * Returns the status of the layer, set once the requested layer has loaded.
            */
            getStatus(): MapsEngineStatus;
            /**
            * Sets the ID of a single Maps Engine layer to display.
            */
            setLayerId(layerId: string): void;
            /**
            * Sets the key of the layer to be displayed.Maps Engine Layer Keys are only unique within a single map, 
            * and can be changed by map owners.Changing this value will cause the layer to be redrawn.
            */
            setLayerKey(layerKey: string): void;
            /**
            * Renders the layer on the specified map.If map is set to null, the layer will be removed.
            */
            setMap(map: Map): void;
            /**
            * Sets the ID of the Maps Engine map to which the layer belongs.Changing this value will cause the layer to be redrawn.
            */
            setMapId(mapId: string): void;
            /**
            * Sets the opacity of the layer, expressed as a number between 0 and 1. Applies only to imagery layers. 
            * Note: Be careful of setting this option for other layer types, as it may become effective in the future.
            */
            setOpacity(opacity: number): void;
            /**
            * Sets the DynamicMapsEngineLayer options
            */
            setOptions(options: DynamicMapsEngineLayerOptions): void;


            // ------------------------------------------------------
            // Event
            // ------------------------------------------------------

            /**
            * This event is fired when a feature in the layer is clicked.
            */
            click(dynamicMapsEngineMouseEvent: DynamicMapsEngineMouseEvent);
            /**
            * This event is fired when a feature in the layer is double clicked.
            */
            dblclick(dynamicMapsEngineMouseEvent: DynamicMapsEngineMouseEvent);
            /**
            * This event is fired for a mousedown on a feature in the layer.
            */
            mousedown(dynamicMapsEngineMouseEvent: DynamicMapsEngineMouseEvent);
            /**
            * This event is fired when the mouse moves over a feature in the layer.
            */
            mousemove(dynamicMapsEngineMouseEvent: DynamicMapsEngineMouseEvent);
            /**
            * This event is fired when the mouse leaves a feature in the layer.
            */
            mouseout(dynamicMapsEngineMouseEvent: DynamicMapsEngineMouseEvent);
            /**
            * This event is fired when the mouse enters a feature in the layer.
            */
            mouseover(dynamicMapsEngineMouseEvent: DynamicMapsEngineMouseEvent);
            /**
            * This event is fired for a mouseup on a feature in the layer.
            */
            mouseup(dynamicMapsEngineMouseEvent: DynamicMapsEngineMouseEvent);
            /**
            * This event is fired when the layer's properties are available for reading.
            */
            properties_changed();
            /**
            * This event is fired for a rightclick on a feature in the layer.
            */
            rightclick(dynamicMapsEngineMouseEvent: DynamicMapsEngineMouseEvent)
            /**
            * This event is fired when the layer has finished loading, and the status is available to determine if the layer loaded successfully.
            */
            status_changed();

        }

        export interface DynamicMapsEngineLayerOptions {
            /**
            * The authentication token returned by an OAuth 2.0 authentication request.
            */
            accessToken?: string;
            /**
            * If true, the layer receives mouse events.Default value is true.
            */
            clickable?: boolean;
            /**
            * The ID of the Maps Engine layer to display.
            */
            layerId?: string;
            /**
            * The key of the layer to display from the specified map.
            */
            layerKey?: string;
            /**
            * The map on which to display the layer.
            */
            map?: Map;
            /**
            * The ID of the Maps Engine map that contains the layer with the given layerKey.
            */
            mapId?: string;
            /**
            * The opacity of the layer, expressed as a number between 0 and 1. Defaults to 1. 
            * Applies only to imagery layers. Note: Be careful of setting this option for other layer types, as it may become effective in the future.
            */
            opacity?: number;
            /**
            * Suppress the rendering of info windows when layer features are clicked.
            */
            suppressInfoWindows?: boolean;
        }

        export interface DynamicMapsEngineMouseEvent {
            /**
            * Takes a callback that will be called with details about the feature that may be used to render an info window.
            */
            getDetails(callback: (MapsEngineMouseEvent) => void): void


            // --------------------------------------------
            // Properties
            // --------------------------------------------

            /**
            * The feature ID, guaranteed to be unique within the layer.
            */
            featureId: string;
            /**
            * The latitude/longitude that was below the cursor when the event occurred.
            */
            latLng: LatLng;
        }

        export interface FeatureStyle {
            /**
            * Resets the given style property to its original value.
            */
            reset(property: string): void;
            /**
            * Resets all style properties to their original values.
            */
            resetAll(): void;

            // --------------------------------------
            // Properties
            // --------------------------------------

            /**
            * The feature's fill color. All CSS3 colors are supported except for extended named colors.
            */
            fillColor?: string;
            /**
            * Fill opacity, expressed as a decimal between 0 and 1 inclusive. This property may be set as a number, but it will always be returned as a string.
            */
            fillOpacity?: string;
            /**
            * The icon's anchor point is the pixel in the source image that is aligned with the point's geographical location, 
            * expressed as a whitespace-separated pair of numbers: x y.Defaults to the center of the icon.
            */
            iconAnchor?: string;
            /**
            * The rectangular region of the icon's image (in image pixel coordinates) to use, as a 
            * whitespace-separated 4-tuple of numbers: x y width height. For example, to use a 32x32 icon situated at (0, 64) in a sprite sheet, specify 0 64 32 32.
            */
            iconClip?: string;
            /**
            * The image to render at the point.Currently, only url(...) is supported.
            */
            iconImage?: string;
            /**
            * Icon opacity, expressed as a decimal between 0 and 1 inclusive.This property may be set as a number, but it will always be returned as a string.
            */
            iconOpacity?: string;
            /**
            * Icon size, expressed as a string with two measurements (with pixel or percentage as unit) separated by whitespace.
            */
            iconSize?: string;
            /**
            * The feature's stroke color. All CSS3 colors are supported except for extended named colors.
            */
            strokeColor?: string;
            /**
            * Stroke opacity, expressed as a decimal between 0 and 1 inclusive.This property may be set as a number, but it will always be returned as a string.
            */
            strokeOpacity?: string;
            /**
            * Stroke width in pixels.This property may be set as a number, but it will always be returned as a string.
            */
            strokeWidth?: string;
            /**
            * Rendering order.Features with greater zIndex are rendered on top.
            */
            zIndex?: string;
        }

        export class HeatmapLayer extends MVCObject {
            /**
            * A layer that provides a client-side rendered heatmap, depicting the intensity of data at geographical points.
            * -
            * Creates a new instance of HeatmapLayer.
            */
            constructor(opts?: HeatmapLayerOptions);
            /**
            * Returns the data points currently displayed by this heatmap.
            */
            getData(): MVCArray;
            /**
            * Gets the Map
            */
            getMap(): Map;
            /**
            * Sets the data points to be displayed by this heatmap.
            */
            setData(data: MVCArray): void;
            /**
            * Sets the data points to be displayed by this heatmap.
            */
            setData(data: Array<LatLng>): void;
            /**
            * Sets the data points to be displayed by this heatmap.
            */
            setData(data: Array<WeightedLocation>): void;
            /**
            * Renders the heatmap on the specified map. If map is set to null, the heatmap will be removed.
            */
            setMap(map: Map): void;
        }

        export interface HeatmapLayerOptions {
            /**
            * The data points to display. Required.
            */
            data: Array<LatLng>;
            /**
            * Specifies whether heatmaps dissipate on zoom. By default, the radius of influence of a data point is 
            * specified by the radius option only. When dissipating is disabled, the radius option is intepreted as a radius at zoom level 0.
            */
            dissipating: boolean;
            /**
            * The color gradient of the heatmap, specified as an array of CSS color strings. All CSS3 colors are supported except for extended named colors.
            */
            gradient: Array<string>;
            /**
            * The map on which to display the layer.
            */
            map: Map;
            /**
            * The maximum intensity of the heatmap. By default, heatmap colors are dynamically scaled according to the greatest 
            * concentration of points at any particular pixel on the map. This property allows you to specify a fixed maximum.
            */
            maxIntensity: number;
            /**
            * The opacity of the heatmap, expressed as a number between 0 and 1. Defaults to 0.6.
            */
            opacity: number;
            /**
            * The radius of influence for each data point, in pixels.
            */
            radius: number;
        }

        export interface WeightedLocation {
            /**
            * The location of data point.
            */
            location: LatLng;
            /**
            * The weighting value of the data point.
            */
            weight: number;
        }
    }

} 