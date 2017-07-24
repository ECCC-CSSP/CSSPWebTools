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

    /***** Panoramio Library *****/
    export module panoramio {
        export class PanoramioLayer extends MVCObject {
            /**
            * A PanoramioLayer displays photos from Panoramio as a rendered layer.
            * -
            * A layer that displays data from Panoramio.
            */
            constructor(opts?: PanoramioLayerOptions);
            /**
            * Returns the map on which this layer is displayed.
            */
            getMap(): Map;
            /**
            * Gets the Tag
            */
            getTag(): string;
            /**
            * Gets the User Id
            */
            getUserId(): string;
            /**
            * Renders the layer on the specified map. If map is set to null, the layer will be removed.
            */
            setMap(map: Map): void;
            /**
            * Sets the PanoramioLayer Options
            */
            setOptions(options: PanoramioLayerOptions): void;
            /**
            * Sets the Tag
            */
            setTag(tag: string): void;
            /**
            * Sets the UserId
            */
            setUserId(userId: string): void;

            // ----------------------------------------------
            // Event
            // ----------------------------------------------

            /**
            * This event is fired when a feature in the layer is clicked.
            */
            click(panoramioMouseEvent: PanoramioMouseEvent);
        }

        export interface PanoramioLayerOptions {
            /**
            * If true, the layer receives mouse events. Default value is true.
            */
            clickable?: boolean;
            /**
            * The map on which to display the layer.
            */
            map?: Map;
            /**
            * Suppress the rendering of info windows when layer features are clicked.
            */
            suppressInfoWindows?: boolean;
            /**
            * A panoramio tag used to filter the photos which are displayed. 
            * Only photos which have been tagged with the supplied string will be shown.
            */
            tag?: string;
            /** 
            * A Panoramio user ID. If provided, only photos by this user will be displayed on the map. 
            * If both a tag and user ID are provided, the tag will take precedence.
            */
            userId?: string;
        }

        export interface PanoramioFeature {
            /**
            * The username of the user who uploaded this photo.
            */
            author: string;
            /**
            * The unique identifier for this photo, as used in the Panoramio API 
            * (see http://www.panoramio.com/api/widget/api.html).
            */
            photoId: string;
            /**
            * The title of the photo.
            */
            title: string;
            /**
            * The URL of the photo.
            */
            url: string;
            /**
            * The unique identifier for the user who uploaded this photo, as used in the Panoramio API 
            * (see http://www.panoramio.com/api/widget/api.html).
            */
            userId: string;
        }

        export interface PanoramioMouseEvent {
            /**
            * A PanoramioFeature object containing information about the clicked feature.
            */
            featureDetails: PanoramioFeature;
            /**
            * Pre-rendered HTML content to display within a feature's InfoWindow when clicked.
            */
            infoWindowHtml: string;
            /**
            * The position at which to anchor an info window on the clicked feature.
            */
            latLng: LatLng;
            /**
            * The offset to apply to an info window anchored on the clicked feature.
            */
            pixelOffset: Size;
        }
    }


} 