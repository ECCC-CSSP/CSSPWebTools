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

    /***** AdSense Library *****/
    export module adsense {
        export class AdUnit extends MVCObject {
            /**
            * Implements AdSense for Content advertising on an associated map. 
            * To use an AdUnit, you must obtain and specify an AdSense for Content publisher ID within the AdUnit's constructor options.
            * -
            * Creates an AdSense for Content display ad on the associated map.
            */
            constructor(container: Element, opts: AdUnitOptions);
            /**
            * Returns the AdUnit's background color.
            */
            getBackgroundColor(): string;
            /**
            * Returns the AdUnit's border color.
            */
            getBorderColor(): string;
            /**
            * Returns the channel number in use by this AdUnit.
            */
            getChannelNumber(): string;
            /**
            * Returns the containing element of the AdUnit.
            */
            getContainer(): Element;
            /**
            * Returns the format in use by this AdUnit.
            */
            getFormat(): AdFormat;
            /**
            * Returns the map to which this AdUnit's ads are targeted.
            */
            getMap(): Map;
            /**
            * Returns the ControlPosition at which this AdUnit is displayed on the map.
            */
            getPosition(): ControlPosition;
            /**
            * Returns the specified AdSense For Content publisher ID.
            */
            getPublisherId(): string;
            /**
            * Returns the AdUnit's text color.
            */
            getTextColor(): string;
            /**
            * Returns the AdUnit's title color.
            */
            getTitleColor(): string;
            /**
            * Returns the AdUnit's URL color.
            */
            getUrlColor(): string;
            /**
            * Sets the AdUnit's background color.
            */
            setBackgroundColor(backgroundColor: string): void;
            /**
            * Sets the AdUnit's border color.
            */
            setBorderColor(borderColor: string): void;
            /**
            * Specifies the channel number for this AdUnit. Channel numbers are optional and can be created for Google AdSense tracking.
            */
            setChannelNumber(channelNumber: string): void;
            /**
            * Specifies the display format for this AdUnit.
            */
            setFormat(format: AdFormat): void;
            /**
            * Associates this AdUnit with the specified map. Ads will be targeted to the map's viewport. The map must be specified in order to display ads.
            */
            setMap(map: Map): void;
            /**
            * Sets the ControlPosition at which to display the AdUnit on the map. If the position is set to null, the AdUnit is removed from the map.
            */
            setPosition(position: ControlPosition): void;
            /**
            * Sets the AdUnit's text color.
            */
            setTextColor(textColor: string): void;
            /**
            * Sets the AdUnit's title color.
            */
            setTitleColor(titleColor: string): void;
            /**
            * Sets the AdUnit's URL color.
            */
            setUrlColor(urlColor: string): void;
        }

        export interface AdUnitOptions {
            /**
            * The AdUnit's background color. (Optional)
            */
            backgroundColor?: string;
            /**
            * The AdUnit's border color. (Optional)
            */
            borderColor?: string;
            /**
            * The AdSense For Content channel number for tracking the performance of this AdUnit. 
            * It must be stored as a string as it will typically be a large UINT64. (Optional)
            */
            channelNumber?: string;
            /**
            * The Format of the AdUnit. See https://google.com/adsense/adformats. (Optional)
            */
            format?: AdFormat;
            /**
            * The map associated with this AdUnit. Ads will be targeted to the location the map's viewport. (Required)
            */
            map?: Map;
            /**
            * The position of the AdUnit. If specified, the AdUnit will be displayed at this position. Otherwise, it will not be added to the map. (Optional)
            */
            position?: ControlPosition;
            /**
            * Your AdSense for Content publisher ID. Required and must be set at the time of initialization. (Required)
            */
            publisherId?: string;
            /**
            * The AdUnit's text color. (Optional)
            */
            textColor?: string;
            /**
            * The AdUnit's title color. (Optional)
            */
            titleColor?: string;
            /**
            * The AdUnit's URL color. (Optional)
            */
            urlColor?: string;
        }

        export enum AdFormat {
            /**
            * A horizontal "banner" ad. (468x60px)
            */
            BANNER,
            /**
            * A small ad. (125x125px)
            */
            BUTTON,
            /**
            * A smaller horizontal "banner" ad. (234x60px)
            */
            HALF_BANNER,
            /**
            * A large horizontal ad link unit. (728x15px)
            */
            LARGE_HORIZONTAL_LINK_UNIT,
            /**
            * A large rectangular ad. (336x280px)
            */
            LARGE_RECTANGLE,
            /**
            * A large vertical ad link unit. (180x90px)
            */
            LARGE_VERTICAL_LINK_UNIT,
            /**
            * A fully horizontal display area. (728x90px)
            */
            LEADERBOARD,
            /**
            * A medium rectangular ad. (300x250px)
            */
            MEDIUM_RECTANGLE,
            /**
            * A medium vertical ad link unit. (160x90px)
            */
            MEDIUM_VERTICAL_LINK_UNIT,
            /**
            * A large vertical ad. (120x600px)
            */
            SKYSCRAPER,
            /**
            * A small horizontal ad link unit. (468x15px)
            */
            SMALL_HORIZONTAL_LINK_UNIT,
            /**
            * A small rectangular ad. (180x150px)
            */
            SMALL_RECTANGLE,
            /**
            * A smaller square ad. (200x200px)
            */
            SMALL_SQUARE,
            /**
            * A small vertical ad link unit. (120x90px)
            */
            SMALL_VERTICAL_LINK_UNIT,
            /**
            * A square ad with large type. (250x250px)
            */
            SQUARE,
            /**
            * A medium-sized vertical ad. (120x240px)
            */
            VERTICAL_BANNER,
            /**
            * A wide, vertical ad using larger type. (160x600px)
            */
            WIDE_SKYSCRAPER,
            /**
            * An extra large vertical ad link unit. (200x90px)
            */
            X_LARGE_VERTICAL_LINK_UNIT
        }
    }


} 