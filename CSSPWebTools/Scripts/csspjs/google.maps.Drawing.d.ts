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

    export module drawing {
        export class DrawingManager extends MVCObject {
            /**
            * Allows users to draw markers, polygons, polylines, rectangles, and circles on the map. 
            * The DrawingManager's drawing mode defines the type of overlay that will be created by the user. 
            * Adds a control to the map, allowing the user to switch drawing mode.
            * -
            * Creates a DrawingManager that allows users to draw overlays on the map, and switch between the type of overlay to be drawn with a drawing control.
            */
            constructor(options?: DrawingManagerOptions);
            /**
            * Returns the DrawingManager's drawing mode.
            */
            getDrawingMode(): OverlayType;
            /**
            * Returns the Map to which the DrawingManager is attached, which is the Map on which the overlays created will be placed.
            */
            getMap(): Map;
            /**
            * Changes the DrawingManager's drawing mode, which defines the type of overlay to be added on the map. 
            * Accepted values are MARKER, POLYGON, POLYLINE, RECTANGLE, CIRCLE, or null. 
            * A drawing mode of null means that the user can interact with the map as normal, and clicks do not draw anything.
            */
            setDrawingMode(drawingMode: OverlayType): void;
            /**
            * Attaches the DrawingManager object to the specified Map.
            */
            setMap(map: Map): void;
            /**
            * Sets the DrawingManager's options.
            */
            setOptions(options: DrawingManagerOptions): void;

            // ----------------------------------------------------------------
            // Event
            // ----------------------------------------------------------------

            /**
            * This event is fired when the user has finished drawing a circle.
            */
            circlecomplete(circle: Circle);
            /**
            * This event is fired when the user has finished drawing a marker.
            */
            markercomplete(marker: Marker);
            /**
            * This event is fired when the user has finished drawing an overlay of any type.
            */
            overlaycomplete(overlayCompleteEvent: OverlayCompleteEvent);
            /**
            * This event is fired when the user has finished drawing a polygon.
            */
            polygoncomplete(polygon: Polygon);
            /**
            * This event is fired when the user has finished drawing a polyline.
            */
            polylinecomplete(polyline: Polyline);
            /**
            * This event is fired when the user has finished drawing a rectangle.
            */
            rectanglecomplete(rectangle: Rectangle);
        }

        export interface DrawingManagerOptions {
            /**
            * Options to apply to any new circles created with this DrawingManager. The center and radius properties are ignored, 
            * and the map property of a new circle is always set to the DrawingManager's map.
            */
            circleOptions?: CircleOptions;
            /**
            * The enabled/disabled state of the drawing control. Defaults to true.
            */
            drawingControl?: boolean;
            /**
            * The display options for the drawing control.
            */
            drawingControlOptions?: DrawingControlOptions;
            /**
            * The DrawingManager's drawing mode, which defines the type of overlay to be added on the map. 
            * Accepted values are MARKER, POLYGON, POLYLINE, RECTANGLE, CIRCLE, or null. 
            * A drawing mode of null means that the user can interact with the map as normal, and clicks do not draw anything.
            */
            drawingMode?: OverlayType;
            /**
            * The Map to which the DrawingManager is attached, which is the Map on which the overlays created will be placed.
            */
            map?: Map;
            /**
            * Options to apply to any new markers created with this DrawingManager. 
            * The position property is ignored, and the map property of a new marker is always set to the DrawingManager's map.
            */
            markerOptions?: MarkerOptions;
            /**
            * Options to apply to any new polygons created with this DrawingManager. 
            * The paths property is ignored, and the map property of a new polygon is always set to the DrawingManager's map.
            */
            polygonOptions?: PolygonOptions;
            /**
            * Options to apply to any new polylines created with this DrawingManager. 
            * The path property is ignored, and the map property of a new polyline is always set to the DrawingManager's map.
            */
            polylineOptions?: PolylineOptions;
            /**
            * Options to apply to any new rectangles created with this DrawingManager. 
            * The bounds property is ignored, and the map property of a new rectangle is always set to the DrawingManager's map.
            */
            rectangleOptions?: RectangleOptions;
        }

        export interface DrawingControlOptions {
            /**
            * The drawing modes to display in the drawing control, in the order in which they are to be displayed. 
            * The hand icon (which corresponds to the null drawing mode) is always available and is not to be 
            * specified in this array. Defaults to [MARKER, POLYLINE, RECTANGLE, CIRCLE, POLYGON].
            */
            drawingModes?: Array<OverlayType>;
            /**
            * Position id. Used to specify the position of the control on the map. The default position is TOP_LEFT.
            */
            position?: ControlPosition;
        }

        export interface OverlayCompleteEvent {
            /**
            * The completed overlay.
            * MVCObject is of type Marker|Polygon|Polyline|Rectangle|Circle
            */
            overlay: MVCObject;
            /**
            * The completed overlay's type.
            */
            type: OverlayType;
        }

        export enum OverlayType {
            /**
            * Specifies that the DrawingManager creates circles, and that the overlay given in the overlaycomplete event is a circle.
            */
            CIRCLE,
            /**
            * Specifies that the DrawingManager creates markers, and that the overlay given in the overlaycomplete event is a marker.
            */
            MARKER,
            /**
            * Specifies that the DrawingManager creates polygons, and that the overlay given in the overlaycomplete event is a polygon.
            */
            POLYGON,
            /**
            * Specifies that the DrawingManager creates polylines, and that the overlay given in the overlaycomplete event is a polyline.
            */
            POLYLINE,
            /**
            * Specifies that the DrawingManager creates rectangles, and that the overlay given in the overlaycomplete event is a rectangle.
            */
            RECTANGLE
        }
    }


} 