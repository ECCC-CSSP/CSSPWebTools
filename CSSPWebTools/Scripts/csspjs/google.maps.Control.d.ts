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

    /***** Controls *****/
    export interface MapTypeControlOptions {
        /**
        * IDs of map types to show in the control.
        */
        mapTypeIds?: Array<MapTypeId>;
        /**
        * Position id. Used to specify the position of the control on the map. The default position is TOP_RIGHT.
        */
        position?: ControlPosition;
        /**
        * Style id. Used to select what style of map type control to display.
        */
        style?: MapTypeControlStyle;
    }

    export enum MapTypeControlStyle {
        /**
        * Uses the default map type control. The control which DEFAULT maps to will vary according to window size and other factors. It may change in future versions of the API.
        */
        DEFAULT,
        /**
        * A dropdown menu for the screen realestate conscious.
        */
        DROPDOWN_MENU,
        /**
        * The standard horizontal radio buttons bar.
        */
        HORIZONTAL_BAR
    }

    export interface OverviewMapControlOptions {
        /**
        * Whether the control should display in opened mode or collapsed (minimized) mode. By default, the control is closed.
        */
        opened?: boolean;
    }

    export interface PanControlOptions {
        /**
        * Position id. Used to specify the position of the control on the map. The default position is TOP_LEFT.
        */
        position: ControlPosition;
    }

    export interface RotateControlOptions {
        /**
        * Position id. Used to specify the position of the control on the map. The default position is TOP_LEFT.
        */
        position: ControlPosition;
    }

    export interface ScaleControlOptions {
        /**
        * Position id. Used to specify the position of the control on the map. 
        * The default position is BOTTOM_LEFT when google.maps.visualRefresh is set to false. 
        * When google.maps.visualRefresh is true the scale control will be fixed at the BOTTOM_RIGHT.
        */
        position?: ControlPosition;
        /**
        * Style id. Used to select what style of scale control to display.
        */
        style?: ScaleControlStyle;
    }

    export enum ScaleControlStyle {
        /**
        * The standard scale control.
        */
        DEFAULT
    }

    export interface StreetViewControlOptions {
        /**
        * Position id. Used to specify the position of the control on the map. 
        * The default position is embedded within the navigation (zoom and pan) controls. 
        * If this position is empty or the same as that specified in the zoomControlOptions or panControlOptions, 
        * the Street View control will be displayed as part of the navigation controls. Otherwise, it will be displayed separately.
        */
        position: ControlPosition;
    }

    export interface ZoomControlOptions {
        /**
        * Position id. Used to specify the position of the control on the map. The default position is TOP_LEFT.
        */
        position?: ControlPosition;
        /**
        * Style id. Used to select what style of zoom control to display.
        */
        style?: ZoomControlStyle;
    }

    export enum ZoomControlStyle {
        /**
        * The default zoom control. The control which DEFAULT maps to will vary according to map size and other factors. It may change in future versions of the API.
        */
        DEFAULT,
        /**
        * The larger control, with the zoom slider in addition to +/- buttons.
        */
        LARGE,
        /**
        * A small control with buttons to zoom in and out.
        */
        SMALL
    }

    export enum ControlPosition {
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        BOTTOM_CENTER,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        BOTTOM_LEFT,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        BOTTOM_RIGHT,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        LEFT_BOTTOM,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        LEFT_CENTER,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        LEFT_TOP,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        RIGHT_BOTTOM,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        RIGHT_CENTER,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        RIGHT_TOP,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        TOP_CENTER,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        TOP_LEFT,
        /**
        * +----------------+ 
        * + TL    TC    TR + 
        * + LT          RT + 
        * +                + 
        * + LC          RC + 
        * +                + 
        * + LB          RB + 
        * + BL    BC    BR + 
        * +----------------+ 
        */
        TOP_RIGHT
    }
} 