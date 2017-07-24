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

    export class InfoWindow extends MVCObject {
        /**
        * An overlay that looks like a bubble and is often connected to a marker.
        * -
        * Creates an info window with the given options. An InfoWindow can be placed on a map at a 
        * particular position or above a marker, depending on what is specified in the options. 
        * Unless auto-pan is disabled, an InfoWindow will pan the map to make itself visible when it is opened. 
        * After constructing an InfoWindow, you must call open to display it on the map. 
        * The user can click the close button on the InfoWindow to remove it from the map, or the developer can call close() for the same effect.
        */
        constructor(opts?: InfoWindowOptions);
        /**
        * Closes this InfoWindow by removing it from the DOM structure.
        */
        close(): void;
        /**
        * Gets the content as a string or Element
        */
        getContent(): any;
        /**
        * Returns the position as a LatLng
        */
        getPosition(): LatLng;
        /**
        * Returns the zIndex
        */
        getZIndex(): number;
        /**
        * Opens this InfoWindow on the given map. Optionally, an InfoWindow can be associated with an anchor. 
        * In the core API, the only anchor is the Marker class. However, an anchor can be any MVCObject that 
        * exposes a LatLng position property and optionally a Point anchorPoint property for calculating the 
        * pixelOffset (see InfoWindowOptions). The anchorPoint is the offset from the anchor's position to the tip of the InfoWindow.
        */
        open(map?: Map, anchor?: MVCObject): void;
        /**
        * Opens this InfoWindow on the given map. Optionally, an InfoWindow can be associated with an anchor. 
        * In the core API, the only anchor is the Marker class. However, an anchor can be any MVCObject that 
        * exposes a LatLng position property and optionally a Point anchorPoint property for calculating the 
        * pixelOffset (see InfoWindowOptions). The anchorPoint is the offset from the anchor's position to the tip of the InfoWindow.
        */
        open(map?: StreetViewPanorama, anchor?: MVCObject): void;
        /**
        * Sets the content to the Element
        */
        setContent(content: Node): void;
        /**
        * Sets the content to the Element
        */
        setContent(content: string): void;
        /**
        * Sets the InfoWindow options
        */
        setOptions(options: InfoWindowOptions): void;
        /**
        * Sets the position using LatLng
        */
        setPosition(position: LatLng): void;
        /**
        * Sets the zIndex
        */
        setZIndex(zIndex: number): void;


        // ---------------------------------------------------
        // Event
        // ---------------------------------------------------

        /**
        * This event is fired when the close button was clicked.
        */
        closeclick();
        /**
        * This event is fired when the content property changes.
        */
        content_changed();
        /**
        * This event is fired when the <div> containing the InfoWindow's content is attached to the DOM. 
        * You may wish to monitor this event if you are building out your info window content dynamically.
        */
        domready();
        /**
        * This event is fired when the position property changes.
        */
        position_changed();
        /**
        * This event is fired when the InfoWindow's zIndex changes.
        */
        zindex_changed();

    }

    export interface InfoWindowOptions {
        /**
        * Content to display in the InfoWindow. This can be an HTML element, a plain-text string, or a string containing HTML. 
        * The InfoWindow will be sized according to the content. To set an explicit size for the content, 
        * set content to be a HTML element with that size.
        * -
        * any is of type string or Element
        */
        content?: any;
        /**
        * Disable auto-pan on open. By default, the info window will pan the map so that it is fully visible when it opens.
        */
        disableAutoPan?: boolean;
        /**
        * Maximum width of the infowindow, regardless of content's width. 
        * This value is only considered if it is set before a call to open. 
        * To change the maximum width when changing content, call close, setOptions, and then open.
        */
        maxWidth?: number;
        /**
        * The offset, in pixels, of the tip of the info window from the point on the map at whose geographical 
        * coordinates the info window is anchored. If an InfoWindow is opened with an anchor, 
        * the pixelOffset will be calculated from the anchor's anchorPoint property.
        */
        pixelOffset?: Size;
        /**
        * The LatLng at which to display this InfoWindow. If the InfoWindow is opened with an anchor, the anchor's position will be used instead.
        */
        position?: LatLng;
        /**
        * All InfoWindows are displayed on the map in order of their zIndex, with higher values displaying in front of 
        * InfoWindows with lower values. By default, InfoWindows are displayed according to their latitude, with InfoWindows 
        * of lower latitudes appearing in front of InfoWindows at higher latitudes. InfoWindows are always displayed in front of markers.
        */
        zIndex?: number;
    }


} 