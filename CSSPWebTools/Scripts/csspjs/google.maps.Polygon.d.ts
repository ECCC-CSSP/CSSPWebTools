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

    export class Polygon extends MVCObject {
        /**
        * A polygon (like a polyline) defines a series of connected coordinates in an ordered sequence; 
        * additionally, polygons form a closed loop and define a filled region.
        * -
        * Create a polygon using the passed PolygonOptions, which specify the polygon's path, the stroke style for the polygon's edges, 
        * and the fill style for the polygon's interior regions. A polygon may contain one or more paths, where each path consists 
        * of an array of LatLngs. You may pass either an array of LatLngs or an MVCArray of LatLngs when constructing these paths. 
        * Arrays are converted to MVCArrays within the polygon upon instantiation.
        */
        constructor(opts?: PolygonOptions);
        /**
        * Returns whether this shape can be dragged by the user.
        */
        getDraggable(): boolean;
        /**
        * Returns whether this shape can be edited by the user.
        */
        getEditable(): boolean;
        /**
        * Returns the map on which this shape is attached.
        */
        getMap(): Map;
        /**
        * Retrieves the first path.
        * MVCArray is of type Array<LatLng>
        */
        getPath(): MVCArray;
        /**
        * Retrieves the paths for this polygon.
        * MVCArray is of type Array<LatLng>
        */
        getPaths(): Array<MVCArray>;
        /**
        * Returns whether this poly is visible on the map.
        */
        getVisible(): boolean;
        /**
        * If set to true, the user can drag this shape over the map. The geodesic property defines the mode of dragging.
        */
        setDraggable(draggable: boolean): void;
        /**
        * If set to true, the user can edit this shape by dragging the control points shown at the vertices and on each segment.
        */
        setEditable(editable: boolean): void;
        /**
        * Renders this shape on the specified map. If map is set to null, the shape will be removed.
        */
        setMap(map: Map): void;
        /**
        * Sets the polygon options
        */
        setOptions(options: PolygonOptions): void;
        /**
        * Sets the first path. See PolylineOptions for more details.
        * MVCArray is of type Array<LatLng>
        */
        setPath(path: MVCArray): void;
        /**
        * Sets the first path. See PolylineOptions for more details.
        *
        */
        setPath(path: Array<LatLng>): void;
        /**
        * Sets the path for this polygon.
        * MVCArray is of type Array<Array<LatLng>>
        */
        setPaths(paths: MVCArray): void;
        /**
        * Sets the path for this polygon.
        * MVCArray is of type Array<LatLng>
        */
        setPaths(paths: Array<MVCArray>): void;
        /**
        * Sets the path for this polygon.
        */
        setPaths(path: Array<LatLng>): void;
        /**
        * Sets the path for this polygon.
        */
        setPaths(path: Array<Array<LatLng>>): void;
        /**
        * Hides this poly if set to false.
        */
        setVisible(visible: boolean): void;
        /**
        * Get or set the zIndex
        */
        zIndex: number;

        // -------------------------------------------------------
        // Event
        // -------------------------------------------------------

        /**
        * This event is fired when the DOM click event is fired on the Polygon.
        */
        click(evt: PolyMouseEvent);
        /**
        * This event is fired when the DOM dblclick event is fired on the Polygon.
        */
        dblclick(evt: PolyMouseEvent);
        /**
        * This event is repeatedly fired while the user drags the Polygon.
        */
        drag(evt: MouseEvent);
        /**
        * This event is fired when the user stops dragging the Polygon.
        */
        dragend(evt: MouseEvent);
        /**
        * This event is fired when the user starts dragging the Polygon.
        */
        dragstart(evt: MouseEvent);
        /**
        * This event is fired when the DOM mousedown event is fired on the Polygon.
        */
        mousedown(evt: PolyMouseEvent);
        /**
        * This event is fired when the DOM mousemove event is fired on the Polygon.
        */
        mousemove(evt: PolyMouseEvent);
        /** 
        * This event is fired on Polygon mouseout.
        */
        mouseout(evt: PolyMouseEvent);
        /**
        * This event is fired on Polygon mouseover.
        */
        mouseover(evt: PolyMouseEvent);
        /**
        * This event is fired when the DOM mouseup event is fired on the Polygon.
        */
        mouseup(evt: PolyMouseEvent);
        /**
        * This event is fired when the Polygon is right-clicked on.
        */
        rightclick(evt: PolyMouseEvent);

    }

    export interface PolygonOptions {
        /**
        * Indicates whether this Polygon handles mouse events. Defaults to true.
        */
        clickable?: boolean;
        /**
        * If set to true, the user can drag this shape over the map. The geodesic property defines the mode of dragging. Defaults to false.
        */
        draggable?: boolean;
        /**
        * If set to true, the user can edit this shape by dragging the control points shown at the vertices and on each segment. Defaults to false.
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
        * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. 
        * When false, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a geodesic polygon 
        * may appear to change when dragged, as the dimensions are maintained relative to the surface of the earth. Defaults to false.
        */
        geodesic?: boolean;
        /**
        * Map on which to display Polygon.
        */
        map?: Map;
        /**
        * The ordered sequence of coordinates that designates a closed loop. Unlike polylines, a polygon may consist of one or more paths. 
        * As a result, the paths property may specify one or more arrays of LatLng coordinates. 
        * Paths are closed automatically; do not repeat the first vertex of the path as the last vertex. 
        * Simple polygons may be defined using a single array of LatLngs. More complex polygons may specify an array of arrays. 
        * Any simple arrays are converted into MVCArrays. Inserting or removing LatLngs from the MVCArray will automatically update the polygon on the map.
        * -
        * Paths can be of type:
        * MVCArray of type Array<LatLng> or Array<Array<LatLng>>
        * or type Array<LatLng>
        * or type Array<Array<LatLng>>
        */
        paths?: Array<any>;
        /**
        * The stroke color. All CSS3 colors are supported except for extended named colors.
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
        * Whether this polygon is visible on the map. Defaults to true.
        */
        visible?: boolean;
        /**
        * The zIndex compared to other polys.
        */
        zIndex?: number;
    }


} 