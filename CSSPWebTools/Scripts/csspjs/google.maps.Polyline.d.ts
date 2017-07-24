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

    export class Polyline extends MVCObject {
        /*
        * A polyline is a linear overlay of connected line segments on the map.
        * -
        * Create a polyline using the passed PolylineOptions, which specify both the path of the polyline and the stroke style to use when drawing the polyline. You may pass either an array of LatLngs or an MVCArray of LatLngs when constructing a polyline, though simple arrays are converted to MVCArrays within the polyline upon instantiation.
        */
        constructor(opts?: PolylineOptions);
        /*
        * Returns whether this shape can be dragged by the user.
        */
        getDraggable(): boolean;
        /*
        * Returns whether this shape can be edited by the user.
        */
        getEditable(): boolean;
        /*
        * Returns the map on which this shape is attached.
        */
        getMap(): Map;
        /*
        * Retrieves the first path.
        * -
        * Return: MVCArray of LatLng
        */
        getPath(): MVCArray;
        /*
        * Returns whether this poly is visible on the map.
        */
        getVisible(): boolean;
        /*
        * If set to true, the user can drag this shape over the map. The geodesic property defines the mode of dragging.
        */
        setDraggable(draggable: boolean): void;
        /*
        * If set to true, the user can edit this shape by dragging the control points shown at the vertices and on each segment.
        */
        setEditable(editable: boolean): void;
        /*
        * Renders this shape on the specified map. If map is set to null, the shape will be removed.
        */
        setMap(map: Map): void;
        /*
        * Sets the polyline options
        */
        setOptions(options: PolylineOptions): void;
        /*
        * Sets the first path. See PolylineOptions for more details.
        * -
        * MVCArray is of type Array<LatLng>
        */
        setPath(path: MVCArray): void;
        /*
        * Sets the first path. See PolylineOptions for more details.
        */
        setPath(path: Array<LatLng>): void;
        /*
        * Hides this poly if set to false.
        */
        setVisible(visible: boolean): void;
        /*
        * Get or set the zIndex
        */
        zIndex: number;

        // -------------------------------------------------------
        // Event
        // -------------------------------------------------------

        /**
        * This event is fired when the DOM click event is fired on the Polyline.
        */
        click(evt: PolyMouseEvent);
        /**
        * This event is fired when the DOM dblclick event is fired on the Polyline.
        */
        dblclick(evt: PolyMouseEvent);
        /**
        * This event is repeatedly fired while the user drags the polyline.
        */
        drag(evt: MouseEvent);
        /**
        * This event is fired when the user stops dragging the polyline.
        */
        dragend(evt: MouseEvent);
        /**
        * This event is fired when the user starts dragging the polyline.
        */
        dragstart(evt: MouseEvent);
        /**
        * This event is fired when the DOM mousedown event is fired on the Polyline.
        */
        mousedown(evt: PolyMouseEvent);
        /**
        * This event is fired when the DOM mousemove event is fired on the Polyline.
        */
        mousemove(evt: PolyMouseEvent);
        /** 
        * This event is fired on Polyline mouseout.
        */
        mouseout(evt: PolyMouseEvent);
        /**
        * This event is fired on Polyline mouseover.
        */
        mouseover(evt: PolyMouseEvent);
        /**
        * This event is fired when the DOM mouseup event is fired on the Polyline.
        */
        mouseup(evt: PolyMouseEvent);
        /**
        * This event is fired when the Polyline is right-clicked on.
        */
        rightclick(evt: PolyMouseEvent);

    }

    export interface PolylineOptions {
        /*
        * Indicates whether this Polyline handles mouse events. Defaults to true.
        */
        clickable?: boolean;
        /*
        * If set to true, the user can drag this shape over the map. The geodesic property defines the mode of dragging. Defaults to false.
        */
        draggable?: boolean;
        /*
        * If set to true, the user can edit this shape by dragging the control points shown at the vertices and on each segment. Defaults to false.
        */
        editable?: boolean;
        /*
        * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. 
        * When false, edges of the polygon are rendered as straight lines in screen space. 
        * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions are maintained 
        * relative to the surface of the earth. Defaults to false.
        */
        geodesic?: boolean;
        /*
        * The icons to be rendered along the polyline.
        * -
        * Describes how icons are to be rendered on a line. 
        *-
        * If your polyline is geodesic, then the distances specified for both offset and repeat are calculated in meters by default. 
        * Setting either offset or repeat to a pixel value will cause the distances to be calculated in pixels on the screen.
        */
        icons?: Array<IconSequence>;
        /*
        * Map on which to display Polyline.
        */
        map?: Map;
        /*
        * The ordered sequence of coordinates of the Polyline. This path may be specified using either a simple array of LatLngs, 
        * or an MVCArray of LatLngs. Note that if you pass a simple array, it will be converted to an MVCArray Inserting or removing 
        * LatLngs in the MVCArray will automatically update the polyline on the map.
        */
        path?: Array<any>;
        /*
        * The stroke color. All CSS3 colors are supported except for extended named colors.
        */
        strokeColor?: string;
        /*
        * The stroke opacity between 0.0 and 1.0.
        */
        strokeOpacity?: number;
        /*
        * The stroke width in pixels.
        */
        strokeWeight?: number;
        /*
        * Whether this polyline is visible on the map. Defaults to true.
        */
        visible?: boolean;
        /*
        * The zIndex compared to other polys.
        */
        zIndex?: number;
    }

    export interface IconSequence {
        /*
        * If true, each icon in the sequence has the same fixed rotation regardless of the angle of the edge on which it lies. 
        * Defaults to false, in which case each icon in the sequence is rotated to align with its edge.
        */
        fixedRotation?: boolean;
        /*
        * The icon to render on the line.
        */
        icon?: Symbol;
        /*
        * The distance from the start of the line at which an icon is to be rendered. 
        * This distance may be expressed as a percentage of line's length (e.g. '50%') or in pixels (e.g. '50px'). Defaults to '100%'.
        */
        offset?: string;
        /*
        * The distance between consecutive icons on the line. This distance may be expressed as a percentage of the line's length (e.g. '50%') 
        * or in pixels (e.g. '50px'). To disable repeating of the icon, specify '0'. Defaults to '0'.
        */
        repeat?: string;
    }


} 