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

    export class Circle extends MVCObject {
        /*
        * A circle on the Earth's surface; also known as a "spherical cap".
        * -
        * Create a circle using the passed CircleOptions, which specify the center, radius, and style.
        */
        constructor(opts?: CircleOptions);
        /*
        * Gets the LatLngBounds of this Circle.
        */
        getBounds(): LatLngBounds;
        /*
        * Returns the center of this circle.
        */
        getCenter(): LatLng;
        /*
        * Returns whether this circle can be dragged by the user.
        */
        getDraggable(): boolean;
        /*
        * Returns whether this circle can be edited by the user.
        */
        getEditable(): boolean;
        /*
        * Returns the map on which this circle is displayed.
        */
        getMap(): Map;
        /*
        * Returns the radius of this circle (in meters).
        */
        getRadius(): number;
        /*
        * Returns whether this circle is visible on the map.
        */
        getVisible(): boolean;
        /*
        * Sets the center of this circle.
        */
        setCenter(center: LatLng): void;
        /*
        * If set to true, the user can drag this circle over the map.
        */
        setDraggable(draggable: boolean): void;
        /*
        * If set to true, the user can edit this circle by dragging the control points shown at the center and around the circumference of the circle.
        */
        setEditable(editable: boolean): void;
        /*
        * Renders the circle on the specified map. If map is set to null, the circle will be removed.
        */
        setMap(map: Map): void;
        /*
        * Sets the circle options
        */
        setOptions(options: CircleOptions): void;
        /*
        * Sets the radius of this circle (in meters).
        */
        setRadius(radius: number): void;
        /*
        * Hides this circle if set to false.
        */
        setVisible(visible: boolean): void;

        // -------------------------------------------------------
        // Event
        // -------------------------------------------------------

        /**
        * This event is fired when the circle's center is changed.
        */
        center_changed();
        /**
        * This event is fired when the DOM click event is fired on the circle.
        */
        click(evt: MouseEvent);
        /**
        * This event is fired when the DOM dblclick event is fired on the circle.
        */
        dblclick(evt: MouseEvent);
        /**
        * This event is repeatedly fired while the user drags the circle.
        */
        drag(evt: MouseEvent);
        /**
        * This event is fired when the user stops dragging the circle.
        */
        dragend(evt: MouseEvent);
        /**
        * This event is fired when the user starts dragging the circle.
        */
        dragstart(evt: MouseEvent);
        /**
        * This event is fired when the DOM mousedown event is fired on the circle.
        */
        mousedown(evt: MouseEvent);
        /**
        * This event is fired when the DOM mousemove event is fired on the circle.
        */
        mousemove(evt: MouseEvent);
        /** 
        * This event is fired on circle mouseout.
        */
        mouseout(evt: MouseEvent);
        /**
        * This event is fired on circle mouseover.
        */
        mouseover(evt: MouseEvent);
        /**
        * This event is fired when the DOM mouseup event is fired on the circle.
        */
        mouseup(evt: MouseEvent);
        /**
        * This event is fired when the circle's radius is changed.
        */
        radius_changed();
        /**
        * This event is fired when the circle is right-clicked on.
        */
        rightclick(evt: MouseEvent);
    }

    export interface CircleOptions {
        /*
        * The center
        */
        center?: LatLng;
        /*
        * Indicates whether this Circle handles mouse events. Defaults to true.
        */
        clickable?: boolean;
        /*
        * If set to true, the user can drag this circle over the map. Defaults to false.
        */
        draggable?: boolean;
        /*
        * If set to true, the user can edit this circle by dragging the control points shown at the center and around the circumference of the circle. Defaults to false.
        */
        editable?: boolean;
        /*
        * The fill color. All CSS3 colors are supported except for extended named colors.
        */
        fillColor?: string;
        /*
        * The fill opacity between 0.0 and 1.0
        */
        fillOpacity?: number;
        /*
        * Map on which to display Circle.
        */
        map?: Map;
        /*
        * The radius in meters on the Earth's surface
        */
        radius?: number;
        /*
        * The stroke color. All CSS3 colors are supported except for extended named colors.
        */
        strokeColor?: string;
        /*
        * The stroke opacity between 0.0 and 1.0
        */
        strokeOpacity?: number;
        /*
        * The stroke position. Defaults to CENTER. This property is not supported on Internet Explorer 8 and earlier.
        */
        strokePosition?: StrokePosition;
        /*
        * The stroke width in pixels.
        */
        strokeWeight?: number;
        /*
        * Whether this circle is visible on the map. Defaults to true.
        */
        visible?: boolean;
        /*
        * The zIndex compared to other polys.
        */
        zIndex?: number;
    }
    

} 