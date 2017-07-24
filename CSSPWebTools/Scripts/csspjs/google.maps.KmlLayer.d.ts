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

    export class KmlLayer extends MVCObject {
        /**
        * A KmlLayer adds geographic markup to the map from a KML, KMZ or GeoRSS file that is hosted on a publicly accessible web server. 
        * A KmlFeatureData object is provided for each feature when clicked.
        * -
        * Creates a KmlLayer which renders the contents of the specified KML/KMZ file 
        * (https://developers.google.com/kml/doc/kmlreference) or GeoRSS file (http://www.georss.org).
        */
        constructor(url: string, opts?: KmlLayerOptions);
        /**
        * Get the default viewport for the layer being displayed.
        */
        getDefaultViewport(): LatLngBounds;
        /**
        * Get the map on which the KML Layer is being rendered.
        */
        getMap(): Map;
        /**
        * Get the metadata associated with this layer, as specified in the layer markup.
        */
        getMetadata(): KmlLayerMetadata;
        /**
        * Get the status of the layer, set once the requested document has loaded.
        */
        getStatus(): KmlLayerStatus;
        /**
        * Gets the URL of the KML file being displayed.
        */
        getUrl(): string;
        /**
        * Gets the z-index of the KML Layer.
        */
        getZIndex(): number;
        /**
        * Renders the KML Layer on the specified map. If map is set to null, the layer is removed.
        */
        setMap(map: Map): void;
        /**
        * Sets the URL of the KML file to display.
        */
        setUrl(url: string): void;
        /**
        * Sets the z-index of the KML Layer.
        */
        setZIndex(zIndex: number): void;


        // -------------------------------------------
        // Event
        // -------------------------------------------

        /**
        * This event is fired when a feature in the layer is clicked.
        */
        click(kmlMouseEvent: KmlMouseEvent);
        /**
        * This event is fired when the KML layers default viewport has changed.
        */
        defaultviewport_changed();
        /**
        * This event is fired when the KML layer has finished loading. 
        * At this point it is safe to read the status property to determine if the layer loaded successfully.
        */
        status_changed();
    }

    export interface KmlLayerOptions {
        /**
        * If true, the layer receives mouse events. Default value is true.
        */
        clickable?: boolean;
        /**
        * The map on which to display the layer.
        */
        map?: Map;
        /**
        * By default, the input map is centered and zoomed to the bounding box of the contents of the layer. 
        * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom were never set.
        */
        preserveViewport?: boolean;
        /**
        * Whether to render the screen overlays. Default true.
        */
        screenOverlays?: boolean;
        /**
        * Suppress the rendering of info windows when layer features are clicked.
        */
        suppressInfoWindows?: boolean;
        /**
        * The URL of the KML document to display.
        */
        url?: string;
        /**
        * The z-index of the layer.
        */
        zIndex?: number;
    }

    export interface KmlLayerMetadata {
        /**
        * The layer's <atom:author>, extracted from the layer markup.
        */
        author: KmlAuthor;
        /**
        * The layer's <description>, extracted from the layer markup.
        */
        description: string;
        /**
        * Whether the layer has any screen overlays.
        */
        hasScreenOverlays: boolean;
        /**
        * The layer's <name>, extracted from the layer markup.
        */
        name: string;
        /**
        * The layer's <Snippet>, extracted from the layer markup
        */
        snippet: string;
    }

    export enum KmlLayerStatus {
        /**
        * The document could not be found. Most likely it is an invalid URL, or the document is not publicly available.
        */
        DOCUMENT_NOT_FOUND,
        /**
        * The document exceeds the file size limits of KmlLayer.
        */
        DOCUMENT_TOO_LARGE,
        /**
        * The document could not be fetched.
        */
        FETCH_ERROR,
        /**
        * The document is not a valid KML, KMZ or GeoRSS document.
        */
        INVALID_DOCUMENT,
        /**
        * The KmlLayer is invalid.
        */
        INVALID_REQUEST,
        /**
        * The document exceeds the feature limits of KmlLayer.
        */
        LIMITS_EXCEEDED,
        /**
        * The layer loaded successfully.
        */
        OK,
        /**
        * The document could not be loaded within a reasonable amount of time.
        */
        TIMED_OUT,
        /**
        * The document failed to load for an unknown reason.
        */
        UNKNOWN
    }

    export interface KmlMouseEvent {
        /**
        * A KmlFeatureData object, containing information about the clicked feature.
        */
        featureData: KmlFeatureData;
        /**
        * The position at which to anchor an infowindow on the clicked feature.
        */
        latLng: LatLng;
        /**
        * The offset to apply to an infowindow anchored on the clicked feature.
        */
        pixelOffset: Size;
    }

    export interface KmlFeatureData {
        /**
        * The feature's <atom:author>, extracted from the layer markup (if specified).
        */
        author: KmlAuthor;
        /**
        * The feature's <description>, extracted from the layer markup.
        */
        description: string;
        /**
        * The feature's <id>, extracted from the layer markup. If no <id> has been specified, a unique ID will be generated for this feature.
        */
        id: string;
        /**
        * The feature's balloon styled text, if set.
        */
        infoWindowHtml: string;
        /**
        * The feature's <name>, extracted from the layer markup.
        */
        name: string;
        /**
        * The feature's <Snippet>, extracted from the layer markup.
        */
        snippet: string;
    }

    export interface KmlAuthor {
        /**
        * The author's e-mail address, or an empty string if not specified.
        */
        email: string;
        /**
        * The author's name, or an empty string if not specified.
        */
        name: string;
        /**
        *The author's home page, or an empty string if not specified.
        */
        uri: string;
    }

} 