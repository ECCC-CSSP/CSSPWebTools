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

    export class GroundOverlay extends MVCObject {
        /**
        * A rectangular image overlay on the map.
        * -
        * Creates a ground overlay from the provided image URL and its LatLngBounds. 
        * The image is scaled to fit the current bounds, and projected using the current map projection.
        */
        constructor(url: string, bounds: LatLngBounds, opts?: GroundOverlayOptions);
        /**
        * Gets the LatLngBounds of this overlay.
        */
        getBounds(): LatLngBounds;
        /**
        * Returns the map on which this ground overlay is displayed.
        */
        getMap(): Map;
        /**
        * Returns the opacity of this ground overlay.
        */
        getOpacity(): number;
        /**
        * Gets the url of the projected image.
        */
        getUrl(): string;
        /**
        * Renders the ground overlay on the specified map. If map is set to null, the overlay is removed.
        */
        setMap(map: Map): void;
        /**
        * Sets the opacity of this ground overlay.
        */
        setOpacity(opacity: number): void;

        // ----------------------------------------------------
        // Event
        // ----------------------------------------------------

        /**
        * This event is fired when the DOM click event is fired on the GroundOverlay.
        */
        click(evt: MouseEvent);
        /**
        * This event is fired when the DOM dblclick event is fired on the GroundOverlay.
        */
        dblclick(evt: MouseEvent);
    }

    export interface GroundOverlayOptions {
        /**
        * If true, the ground overlay can receive mouse events.
        */
        clickable?: boolean;
        /**
        * The map on which to display the overlay.
        */
        map?: Map;
        /**
        * The opacity of the overlay, expressed as a number between 0 and 1. Optional. Defaults to 1.
        */
        opacity?: number;
    }


} 