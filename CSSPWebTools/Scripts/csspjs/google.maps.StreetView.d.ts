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

    /***** Street View *****/
    export class StreetViewPanorama {
        /**
        * Displays the panorama for a given LatLng or panorama ID. A StreetViewPanorama object provides a 
        * Street View "viewer" which can be stand-alone within a separate <div> or bound to a Map.
        * -
        * Creates a panorama with the passed StreetViewPanoramaOptions.
        */
        constructor(container: Element, opts?: StreetViewPanoramaOptions);
        /**
        * Returns the set of navigation links for the Street View panorama.
        */
        getLinks(): Array<StreetViewLink>;
        /**
        * Returns the current panorama ID for the Street View panorama. This id is stable within the browser's current session only.
        */
        getPano(): string;
        /**
        * Returns the heading and pitch of the photographer when this panorama was taken. 
        * For Street View panoramas on the road, this also reveals in which direction the car was travelling. 
        * This data is available after the pano_changed event.
        */
        getPhotographerPov(): StreetViewPov;
        /**
        * Returns the current LatLng position for the Street View panorama.
        */
        getPosition(): LatLng;
        /**
        * Returns the current point of view for the Street View panorama.
        */
        getPov(): StreetViewPov;
        /**
        * Returns true if the panorama is visible. It does not specify whether Street View imagery is available at the specified position.
        */
        getVisible(): boolean;
        /**
        * Returns the zoom level of the panorama. Fully zoomed-out is level 0, where the field of view is 180 degrees. 
        * Zooming in increases the zoom level.
        */
        getZoom(): number;
        /**
        * Set the custom panorama provider called on pano change to load custom panoramas.
        */
        registerPanoProvider(provider: (input: string) => StreetViewPanoramaData): void;
        /**
        * Sets a collection of key-value pairs.
        */
        setOptions(options: StreetViewPanoramaOptions): number;
        /**
        * Sets the current panorama ID for the Street View panorama.
        */
        setPano(pano: string): void;
        /**
        * Sets the current LatLng position for the Street View panorama.
        */
        setPosition(latLng: LatLng): void;
        /**
        * Sets the point of view for the Street View panorama.
        */
        setPov(pov: StreetViewPov): void;
        /**
        * Sets to true to make the panorama visible. 
        * If set to false, the panorama will be hidden whether it is embedded in the map or in its own <div>.
        */
        setVisible(flag: boolean): void;
        /**
        * Sets the zoom level of the panorama. Fully zoomed-out is level 0, where the field of view is 180 degrees. 
        * Zooming in increases the zoom level.
        */
        setZoom(zoom: number): void;


        // ------------------------------------------------------
        // Properties
        // ------------------------------------------------------

        /**
        * Additional controls to attach to the panorama. To add a control to the panorama, 
        * add the control's <div> to the MVCArray corresponding to the ControlPosition where it should be rendered.
        * -
        * MVCArray is of type Node
        */
        controls: Array<MVCArray>;


        // --------------------------------------------------
        // Event
        // --------------------------------------------------

        /**
        * This event is fired when the close button is clicked.
        */
        closeclick(evt: Event);
        /**
        * This event is fired when the panorama's links change. The links change asynchronously following a pano id change.
        */
        links_changed();
        /** 
        * This event is fired when the panorama's pano id changes. 
        * The pano may change as the user navigates through the panorama or the position is manually set. 
        * Note that not all position changes trigger a pano_changed.
        */
        pano_changed();
        /**
        * This event is fired when the panorama's position changes. The position changes as the user navigates through the panorama or the position is set manually.
        */
        position_changed();
        /**
        *
        */
        pov_changed();
        /**
        * Developers should trigger this event on the panorama when its div changes size: google.maps.event.trigger(panorama, 'resize').
        */
        resize();
        /**
        * This event is fired when the panorama's visibility changes. 
        * The visibility is changed when the Pegman is dragged onto the map, the close button is clicked, or setVisible() is called.
        */
        visible_changed();
        /**
        * This event is fired when the panorama's zoom level changes.
        */
        zoom_changed();

    }

    export interface StreetViewPanoramaOptions {

        /**
        * Custom panorama provider, which takes a string pano id and returns an object defining the panorama given that id. 
        * This function must be defined to specify custom panorama imagery.
        */
        panoProvider?: (panoId: string) => StreetViewPanoramaData;


        // --------------------------------------------
        // Properties
        // --------------------------------------------

        /**
        * The enabled/disabled state of the address control.
        */
        addressControl?: boolean;
        /**
        * The display options for the address control.
        */
        addressControlOptions?: StreetViewAddressControlOptions;
        /**
        * The enabled/disabled state of click-to-go.
        */
        clickToGo?: boolean;
        /**
        * Enables/disables all default UI. May be overridden individually.
        */
        disableDefaultUI?: boolean;
        /**
        * Enables/disables zoom on double click. Disabled by default.
        */
        disableDoubleClickZoom?: boolean;
        /**
        * If true, the close button is displayed. Disabled by default.
        */
        enableCloseButton?: boolean;
        /**
        * The enabled/disabled state of the imagery acquisition date control. Disabled by default.
        */
        imageDateControl?: boolean;
        /**
        * The enabled/disabled state of the links control.
        */
        linksControl?: boolean;
        /**
        * The enabled/disabled state of the pan control.
        */
        panControl?: boolean;
        /**
        * The display options for the pan control.
        */
        panControlOptions?: PanControlOptions;
        /**
        * The panorama ID, which should be set when specifying a custom panorama.
        */
        pano?: string;
        /**
        * The LatLng position of the Street View panorama.
        */
        position?: LatLng;
        /**
        * The camera orientation, specified as heading and pitch, for the panorama.
        */
        pov?: StreetViewPov;
        /**
        * If false, disables scrollwheel zooming in Street View. The scrollwheel is enabled by default.
        */
        scrollwheel?: boolean;
        /**
        * If true, the Street View panorama is visible on load.
        */
        visible?: boolean;
        /**
        * The enabled/disabled state of the zoom control.
        */
        zoomControl?: boolean;
        /**
        * The display options for the zoom control.
        */
        zoomControlOptions?: ZoomControlOptions;
    }

    export interface StreetViewAddressControlOptions {
        /**
        * Position id. This id is used to specify the position of the control on the map. The default position is TOP_LEFT.
        */
        position: ControlPosition;
    }

    export interface StreetViewLink {
        /**
        * A localized string describing the link.
        */
        description?: string;
        /**
        * The heading of the link.
        */
        heading?: number;
        /**
        * A unique identifier for the panorama. This id is stable within a session but unstable across sessions.
        */
        pano?: string;
    }

    export interface StreetViewPov {
        /**
        * The camera heading in degrees relative to true north. True north is 0°, east is 90°, south is 180°, west is 270°.
        */
        heading?: number;
        /**
        * The camera pitch in degrees, relative to the street view vehicle. Ranges from 90° (directly upwards) to -90° (directly downwards).
        */
        pitch?: number;
    }

    export interface StreetViewPanoramaData {
        /**
        * Specifies the copyright text for this panorama.
        */
        copyright?: string;
        /**
        * Specifies the year and month in which the imagery in this panorama was acquired. The date string is in the form YYYY-MM.
        */
        imageDate?: string;
        /**
        * Specifies the navigational links to adjacent panoramas.
        */
        links?: Array<StreetViewLink>;
        /**
        * Specifies the location meta-data for this panorama.
        */
        location?: StreetViewLocation;
        /**
        * Specifies the custom tiles for this panorama.
        */
        tiles?: StreetViewTileData;
    }

    export interface StreetViewLocation {
        /**
        * A localized string describing the location.
        */
        description?: string;
        /**
        * The latlng of the panorama.
        */
        latLng?: LatLng;
        /**
        * A unique identifier for the panorama. This is stable within a session but unstable across sessions.
        */
        pano?: string;
    }

    export interface StreetViewTileData {
        /**
        * Gets the tile image URL for the specified tile.
        * pano is the panorama ID of the Street View tile.
        * tileZoom is the zoom level of the tile.
        * tileX is the x-coordinate of the tile.
        * tileY is the y-coordinate of the tile.
        * Returns the URL for the tile image.
        */
        getTileUrl(pano: string, tileZoom: number, tileX: number, tileY: number): string;
        /**
        * The heading (in degrees) at the center of the panoramic tiles.
        */
        centerHeading?: number;
        /**
        * The size (in pixels) at which tiles will be rendered.
        */
        tileSize?: Size;
        /**
        * The size (in pixels) of the whole panorama's "world".
        */
        worldSize?: Size;
    }

    export class StreetViewService {
        /**
        * Retrieves the data for the given pano id and passes it to the provided callback as a StreetViewPanoramaData object. 
        * Pano ids are unique per panorama and stable for the lifetime of a session, but are liable to change between sessions.
        */
        getPanoramaById(pano: string, callback: (streetViewPanoramaData: StreetViewPanoramaData, streetViewStatus: StreetViewStatus) => void): void;
        /**
        * Retrieves the StreetViewPanoramaData for a panorama within a given radius of the given LatLng. 
        * The StreetViewPanoramaData is passed to the provided callback. If the radius is less than 50 meters, the nearest panorama will be returned.
        */
        getPanoramaByLocation(latlng: LatLng, radius: number, callback: (streetViewPanoramaData: StreetViewPanoramaData, streetViewStatus: StreetViewStatus) => void): void;
    }

    export enum StreetViewStatus {
        /**
        * The request was successful.
        */
        OK,
        /**
        * The request could not be successfully processed, yet the exact reason for failure is unknown.
        */
        UNKNOWN_ERROR,
        /**
        * There are no nearby panoramas.
        */
        ZERO_RESULTS
    }

    export class StreetViewCoverageLayer {
        /**
        * A layer that illustrates the locations where Street View is available.
        * -
        * Creates a new instance of StreetViewCoverageLayer.
        */
        constructor();
        /**
        * Returns the map on which this layer is displayed.
        */
        getMap(): Map;
        /**
        * Renders the layer on the specified map. If the map is set to null, the layer will be removed.
        */
        setMap(map: Map): Map;
    }
} 