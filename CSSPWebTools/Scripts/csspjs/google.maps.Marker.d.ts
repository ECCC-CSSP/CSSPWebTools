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

    export class Marker extends MVCObject {
        /**
        * The maximum default z-index that the API will assign to a marker. You may set a higher z-index to bring a marker to the front.
        */
        static MAX_ZINDEX: number;


        /**
        * Creates a marker with the options specified. If a map is specified, the marker is added to the map upon construction. 
        * Note that the position must be set for the marker to display.
        */
        constructor(opts?: MarkerOptions);
        /**
        * Gets Animation obj
        */
        getAnimation(): Animation;
        /**
        * true if clickable
        */
        getClickable(): boolean;
        /**
        * Gets Cursor
        */
        getCursor(): string;
        /**
        * true if draggable
        */
        getDraggable(): boolean;
        /**
        * true if flat
        */
        getFlat(): boolean;
        /**
        * Gets Icon
        * Returns one of string | Icon | Symbol
        */
        getIcon(): any;
        /**
        * Gets Map | StreetViewPanorama
        */
        getMap(): any;
        /**
        * Gets the position
        */
        getPosition(): LatLng;
        /**
        * Gets the Shadow
        * Returns one of string | Icon | Symbol
        */
        getShadow(): any;
        /**
        * Gets the MarkerShape
        */
        getShape(): MarkerShape;
        /**
        * Gets the title
        */
        getTitle(): string;
        /**
        * true if visible
        */
        getVisible(): boolean;
        /**
        * Gets the zIndex
        */
        getZIndex(): number;
        /**
        * Start an animation. Any ongoing animation will be cancelled. 
        * Currently supported animations are: BOUNCE, DROP. Passing in null will cause any animation to stop.
        */
        setAnimation(animation: Animation): void;
        /**
        * Setting clickable
        */
        setClickable(flag: boolean): void;
        /**
        * Setting Cursor
        */
        setCursor(cursor: string): void;
        /**
        * Setting draggable
        */
        setDraggable(flag: boolean): void;
        /**
        * Setting flat
        */
        setFlat(flag: boolean): void;
        /**
        * Setting the icon
        */
        setIcon(icon: Icon): void;
        /**
        * Setting the icon
        */
        setIcon(icon: string): void;
        /**
        * Setting the map
        */
        setMap(map: Map): void;
        /**
        * Setting the map
        */
        setMap(map: StreetViewPanorama): void;
        /**
        * Setting the market options
        */
        setOptions(options: MarkerOptions): void;
        /**
        * Setting the position
        */
        setPosition(latlng: LatLng): void;
        /**
        * Setting the shadow
        */
        setShadow(shadow: Icon): void;
        /**
        * Setting the shadow
        */
        setShadow(shadow: string): void;
        /**
        * Setting the marker shape
        */
        setShape(shape: MarkerShape): void;
        /**
        * Settting the title
        */
        setTitle(title: string): void;
        /**
        * Setting the visibility
        */
        setVisible(visible: boolean): void;
        /**
        * Setting the zIndex
        */
        setZIndex(zIndex: number): void;


        // -------------------------------------------------------
        // Event
        // -------------------------------------------------------

        /**
        * This event is fired when the marker's animation property changes.
        */
        animation_changed();
        /**
        * This event is fired when the marker icon was clicked.
        */
        click(evt: MouseEvent);
        /**
        * This event is fired when the marker's clickable property changes.
        */
        clickable_changed();
        /**
        * This event is fired when the marker's cursor property changes.
        */
        cursor_changed();
        /**
        * This event is fired when the marker icon was double clicked.
        */
        dblclick(evt: MouseEvent);
        /**
        * This event is repeatedly fired while the user drags the marker.
        */
        drag(evt: MouseEvent);
        /**
        * This event is fired when the user stops dragging the marker.
        */
        dragend(evt: MouseEvent);
        /**
        * This event is fired when the marker's draggable property changes.
        */
        draggable_changed();
        /**
        * This event is fired when the user starts dragging the marker.
        */
        dragstart(evt: MouseEvent);
        /**
        * This event is fired when the marker's flat property changes.
        */
        flat_changed();
        /**
        * This event is fired when the marker icon property changes.
        */
        icon_changed();
        /**
        * This event is fired when the DOM mousedown event is fired on the marker.
        */
        mousedown(evt: MouseEvent);
        /**
        * This event is fired when the DOM mousemove event is fired on the marker.
        */
        mousemove(evt: MouseEvent);
        /** 
        * This event is fired when the mouse leaves the area of the marker icon.
        */
        mouseout(evt: MouseEvent);
        /**
        * This event is fired when the mouse enters the area of the marker icon.
        */
        mouseover(evt: MouseEvent);
        /**
        * This event is fired for a mouseup on the marker.
        */
        mouseup(evt: MouseEvent);
        /**
        * This event is fired when the marker position property changes.
        */
        position_changed();
        /**
        * This event is fired for a rightclick on the marker.
        */
        rightclick(evt: MouseEvent);
        /**
        * This event is fired when the marker position property changes.
        */
        shadow_changed();
        /**
        * This event is fired when the marker's shape property changes.
        */
        shape_changed();
        /**
        * This event is fired when the marker title property changes.
        */
        title_changed();
        /**
        * This event is fired when the marker's visible property changes.
        */
        visible_changed();
        /**
        * This event is fired when the marker's zIndex property changes.
        */
        zindex_changed();

    }

    export interface MarkerOptions {
        /**
        * The offset from the marker's position to the tip of an InfoWindow that has been opened with the marker as anchor.
        */
        anchorPoint?: Point;
        /**
        * Which animation to play when marker is added to a map.
        */
        animation?: Animation;
        /**
        * If true, the marker receives mouse and touch events. Default value is true.
        */
        clickable?: boolean;
        /**
        * If false, disables cross that appears beneath the marker when dragging. 
        * This option is true by default. This option is only enabled when google.maps.visualRefresh is set to true. 
        * For backwards compatibility, if raiseOnDrag is set to false then the default for crossOnDrag changes to false.
        */
        crossOnDrag?: string;
        /**
        * Mouse cursor to show on hover
        */
        cursor?: string;
        /**
        * If true, the marker can be dragged. Default value is false.
        */
        draggable?: boolean;
        /**
        * If true, the marker shadow will not be displayed.
        */
        flat?: boolean;
        /**
        * Icon for the foreground. If a string is provided, it is treated as though it were an Icon with the string as url.
        * -
        * any is of type string | Icon | Symbol
        */
        icon?: any;
        /**
        * Map on which to display Marker.
        * -
        * any is of type Map | StreetViewPanorama
        */
        map?: any;
        /**
        * Optimization renders many markers as a single static element. 
        * Optimized rendering is enabled by default. Disable optimized rendering for animated GIFs or PNGs, 
        * or when each marker must be rendered as a separate DOM element (advanced usage only).
        */
        optimized?: boolean;
        /**
        * Marker position. Required.
        */
        position?: LatLng;
        /**
        * If false, disables raising and lowering the marker on drag. 
        * This option is true by default. This option is disabled when google.maps.visualRefresh is set to true. 
        * Instead, a cross will appear beneath the marker icon while dragging. 
        * Please refer to the crossOnDrag property for new code. 
        * For backwards compatibility, if this is set to false then the default for crossOnDrag changes to false.
        */
        raiseOnDrag?: boolean;
        /**
        * Shadow image. If a string is provided, it is treated as though it were an Icon with the string as url. 
        * Shadows are not rendered when google.maps.visualRefresh is set to true.
        * -
        * any is of type string | Icon | Symbol
        */
        shadow?: any;
        /**
        * Image map region definition used for drag/click.
        */
        shape?: MarkerShape;
        /**
        * Rollover text
        */
        title?: string;
        /**
        * If true, the marker is visible
        */
        visible?: boolean;
        /**
        * All markers are displayed on the map in order of their zIndex, with higher values displaying in front of markers with lower values. 
        * By default, markers are displayed according to their vertical position on screen, with lower markers appearing in front of markers further up the screen.
        */
        zIndex?: number;
    }

    export interface Icon {
        /**
        * The position at which to anchor an image in correspondance to the location of the marker on the map. 
        * By default, the anchor is located along the center point of the bottom of the image.
        */
        anchor: Point;
        /**
        * The position of the image within a sprite, if any. By default, the origin is located at the top left corner of the image (0, 0).
        */
        origin: Point;
        /**
        * The size of the entire image after scaling, if any. Use this property to stretch/shrink an image or a sprite.
        */
        scaledSize?: Size;
        /**
        * The display size of the sprite or image. When using sprites, you must specify the sprite size. 
        * If the size is not provided, it will be set when the image loads.
        */
        size: Size;
        /**
        * The URL of the image or sprite sheet.
        */
        url: string;
    }

    export interface MarkerShape {
        /**
        * The format of this attribute depends on the value of the type and follows the w3 AREA coords 
        * specification found at http://www.w3.org/TR/REC-html40/struct/objects.html#adef-coords. 
        * The coords attribute is an array of integers that specify the pixel position of the shape relative to the top-left 
        * corner of the target image. The coordinates depend on the value of type as follows: 
        *   - circle: coords is [x1,y1,r] where x1,y2 are the coordinates of the center of the circle, and r is the radius of the circle. 
        *   - poly: coords is [x1,y1,x2,y2...xn,yn] where each x,y pair contains the coordinates of one vertex of the polygon. 
        *   - rect: coords is [x1,y1,x2,y2] where x1,y1 are the coordinates of the upper-left corner of the rectangle and x2,y2 
        *     are the coordinates of the lower-right coordinates of the rectangle.
        */
        coords?: Array<number>;
        /**
        * Describes the shape's type and can be circle, poly or rect.
        */
        type?: string;
    }

    export enum Animation {
        /**
        * Marker bounces until animation is stopped.
        */
        BOUNCE,
        /**
        * Marker falls from the top of the map ending with a small bounce.
        */
        DROP
    }

} 