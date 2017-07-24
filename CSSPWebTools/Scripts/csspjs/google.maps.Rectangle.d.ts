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

    export class Rectangle extends MVCObject {
        /**
        * A rectangle overlay.
        * -
        * Create a rectangle using the passed RectangleOptions, which specify the bounds and style.
        */
        constructor(opts?: RectangleOptions);
        /**
        * Returns the bounds of this rectangle.
        */
        getBounds(): LatLngBounds;
        /**
        * Returns whether this rectangle can be dragged by the user.
        */
        getDraggable(): boolean;
        /**
        * Returns whether this rectangle can be edited by the user.
        */
        getEditable(): boolean;
        /**
        * Returns the map on which this rectangle is displayed.
        */
        getMap(): Map;
        /**
        * Returns whether this rectangle is visible on the map.
        */
        getVisible(): boolean;
        /**
        * Sets the bounds of this rectangle.
        */
        setBounds(bounds: LatLngBounds): void;
        /**
        * If set to true, the user can drag this rectangle over the map.
        */
        setDraggable(draggable: boolean): void;
        /**
        * If set to true, the user can edit this rectangle by dragging the control points shown at the corners and on each edge.
        */
        setEditable(editable: boolean): void;
        /**
        * Renders the rectangle on the specified map. If map is set to null, the rectangle will be removed.
        */
        setMap(map: Map): void;
        /**
        * Sets the retangle options
        */
        setOptions(options: RectangleOptions): void;
        /**
        * Hides this rectangle if set to false.
        */
        setVisible(visible: boolean): void;

        // -------------------------------------------------------
        // Event
        // -------------------------------------------------------

        /**
        * This event is fired when the rectangle's bounds are changed.
        */
        bounds_changed();
        /**
        * This event is fired when the DOM click event is fired on the rectangle.
        */
        click(evt: MouseEvent);
        /**
        * This event is fired when the DOM dblclick event is fired on the rectangle.
        */
        dblclick(evt: MouseEvent);
        /**
        * This event is repeatedly fired while the user drags the rectangle.
        */
        drag(evt: MouseEvent);
        /**
        * This event is fired when the user stops dragging the rectangle.
        */
        dragend(evt: MouseEvent);
        /**
        * This event is fired when the user starts dragging the rectangle.
        */
        dragstart(evt: MouseEvent);
        /**
        * This event is fired when the DOM mousedown event is fired on the rectangle.
        */
        mousedown(evt: MouseEvent);
        /**
        * This event is fired when the DOM mousemove event is fired on the rectangle.
        */
        mousemove(evt: MouseEvent);
        /** 
        * This event is fired on rectangle mouseout.
        */
        mouseout(evt: MouseEvent);
        /**
        * This event is fired on rectangle mouseover.
        */
        mouseover(evt: MouseEvent);
        /**
        * This event is fired when the DOM mouseup event is fired on the rectangle.
        */
        mouseup(evt: MouseEvent);
        /**
        * This event is fired when the rectangle is right-clicked on.
        */
        rightclick(evt: MouseEvent);

    }

    export interface RectangleOptions {
        /**
        * The bounds.
        */
        bounds?: LatLngBounds;
        /**
        * Indicates whether this Rectangle handles mouse events. Defaults to true.
        */
        clickable?: boolean;
        /**
        * If set to true, the user can drag this rectangle over the map. Defaults to false.
        */
        draggable?: boolean;
        /**
        * If set to true, the user can edit this rectangle by dragging the control points shown at the corners and on each edge. Defaults to false.
        */
        editable?: boolean;
        /**
        * The fill color. All CSS3 colors are supported except for extended named colors.
        */
        fillColor?: string;
        /**
        * The fill opacity between 0.0 and 1.0
        */
        fillOpacity?: number;
        /**
        * Map on which to display Rectangle.
        */
        map?: Map;
        /**
        *  The stroke color. All CSS3 colors are supported except for extended named colors.
        */
        strokeColor?: string;
        /**
        * The stroke opacity between 0.0 and 1.0
        */
        strokeOpacity?: number;
        /**
        * The stroke position. Defaults to CENTER. This property is not supported on Internet Explorer 8 and earlier.
        */
        strokePosition?: StrokePosition;
        /**
        * The stroke width in pixels.
        */
        strokeWeight?: number;
        /**
        * Whether this rectangle is visible on the map. Defaults to true.
        */
        visible?: boolean;
        /**
        * The zIndex compared to other polys.
        */
        zIndex?: number;
    }


} 