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

    export class MVCObject {
        /**
        * Creates an MVCObject.
        * -
        * The MVCObject constructor is guaranteed to be an empty function, and so you may inherit from MVCObject by simply writing 
        * MySubclass.prototype = new google.maps.MVCObject();. Unless otherwise noted, this is not true of other classes in the API, 
        * and inheriting from other classes in the API is not supported.
        */
        constructor();
        /**
        * Adds the given listener function to the given event name. Returns an identifier for this listener that can be used with google.maps.event.removeListener.
        */
        addListener(eventName: string, handler: (...args: Array<any>) => void): MapsEventListener;
        /**
        * Binds a View to a Model.
        */
        bindTo(key: string, target: MVCObject, targetKey?: string, noNotify?: boolean): void;
        /**
        * Generic handler for state changes. Override this in derived classes to handle arbitrary state changes.
        */
        changed(key: string): void;
        /**
        * Gets a value.
        */
        get(key: string): any;
        /**
        * Notify all observers of a change on this property. This notifies both objects that are bound to the object's property as well as the object that it is bound to.
        */
        notify(key: string): void;
        /**
        * Sets a value.
        */
        set(key: string, value: any): void;
        /**
        * Sets a collection of key-value pairs.
        */
        setValues(values: any): void;
        /**
        * Removes a binding. Unbinding will set the unbound property to the current value. The object will not be notified, as the value has not changed.
        */
        unbind(key: string): void;
        /**
        * Removes all bindings.
        */
        unbindAll(): void;
    }

    export class MVCArray extends MVCObject {
        /**
        * A mutable MVC Array.
        */
        constructor(array?: Array<any>);
        /**
        * Removes all elements from the array.
        */
        clear(): void;
        /**
        * Iterate over each element, calling the provided callback. The callback is called for each element like: callback(element, index).
        */
        forEach(callback: (elem: any, index: number) => void): void;
        /**
        * Returns a reference to the underlying Array. Warning: if the Array is mutated, no events will be fired by this object.
        */
        getArray(): Array<any>;
        /**
        * Returns the element at the specified index.
        */
        getAt(i: number): any;
        /**
        * Returns the number of elements in this array.
        */
        getLength(): number;
        /**
        * Inserts an element at the specified index.
        */
        insertAt(i: number, elem: any): void;
        /**
        * Removes the last element of the array and returns that element.
        */
        pop(): void;
        /**
        * Adds one element to the end of the array and returns the new length of the array.
        */
        push(elem: any): number;
        /**
        * Removes an element from the specified index.
        */
        removeAt(i: number): any;
        /**
        * Sets an element at the specified index.
        */
        setAt(i: number, elem: any): void;

        // ---------------------------------------------------
        // Event
        //----------------------------------------------------

        /**
        * This event is fired when insertAt() is called. The event passes the index that was passed to insertAt().
        */
        insert_at(index: number);
        /**
        * This event is fired when removeAt() is called. The event passes the index that was passed to removeAt() and the element that was removed from the array.
        */
        remove_at(index: number, elem: any);
        /**
        * This event is fired when setAt() is called. The event passes the index that was passed to setAt() and the element that was previously in the array at that index.
        */
        set_at(index: number, elem: any);
    }


    export enum StrokePosition {
        /**
        * The stroke is centered on the polygon's path, with half the stroke inside the polygon and half the stroke outside the polygon.
        */
        CENTER,
        /**
        * The stroke lies inside the polygon.
        */
        INSIDE,
        /**
        * The stroke lies outside the polygon.
        */
        OUTSIDE
    }

    export class LatLng {
        /**
        * A LatLng is a point in geographical coordinates: latitude and longitude.
        * Latitude ranges between -90 and 90 degrees, inclusive. Values above or below this range will be clamped to the nearest value within this range. 
        * For example, specifying a latitude of 100 will set the value to 90.
        * Longitude ranges between -180 and 180 degrees, inclusive. Values above or below this range will be wrapped such that they fall within the range [-180, 180). 
        * For example, 480, 840 and 1200 will all be wrapped to 120 degrees.
        * Although the default map projection associates longitude with the x-coordinate of the map, and latitude with the y-coordinate, 
        * the latitude coordinate is always written first, followed by the longitude.
        * Notice that you cannot modify the coordinates of a LatLng. If you want to compute another point, you have to create a new one.
        * -
        * Creates a LatLng object representing a geographic point. 
        * Latitude is specified in degrees within the range [-90, 90]. 
        * Longitude is specified in degrees within the range [-180, 180]. 
        * Set noWrap to true to enable values outside of this range. 
        * Note the ordering of latitude and longitude.
        */
        constructor(lat: number, lng: number, noWrap?: boolean);
        /**
        * Comparison function.
        */
        equals(other: LatLng): boolean;
        /**
        * Returns the latitude in degrees.
        */
        lat(): number;
        /**
        * Returns the longitude in degrees.
        */
        lng(): number;
        /**
        * Converts to string representation.
        */
        toString(): string;
        /**
        * Returns a string of the form "lat,lng" for this LatLng. We round the lat/lng values to 6 decimal places by default.
        */
        toUrlValue(precision?: number): string;

    }

    export class LatLngBounds {
        /**
        * A LatLngBounds instance represents a rectangle in geographical coordinates, including one that crosses the 180 degrees longitudinal meridian.
        */
        constructor(sw?: LatLng, ne?: LatLng);
        /**
        * Returns true if the given lat/lng is in this bounds.
        */
        contains(latLng: LatLng): boolean;
        /** 
        * Returns true if this bounds approximately equals the given bounds.
        */
        equals(other: LatLngBounds): boolean;
        /**
        * Extends this bounds to contain the given point.
        */
        extend(point: LatLng): LatLngBounds;
        /** 
        * Computes the center of this LatLngBounds
        */
        getCenter(): LatLng;
        /**
        * Returns the north-east corner of this bounds.
        */
        getNorthEast(): LatLng;
        /**
        * Returns the south-west corner of this bounds.
        */
        getSouthWest(): LatLng;
        /**
        * Returns true if this bounds shares any points with this bounds.
        */
        intersects(other: LatLngBounds): boolean;
        /**
        * Returns if the bounds are empty.
        */
        isEmpty(): boolean;
        /**
        * Converts the given map bounds to a lat/lng span.
        */
        toSpan(): LatLng;
        /**
        * Converts to string.
        */
        toString(): string;
        /**
        * Returns a string of the form "lat_lo,lng_lo,lat_hi,lng_hi" for this bounds, 
        * where "lo" corresponds to the southwest corner of the bounding box, 
        * while "hi" corresponds to the northeast corner of that box.
        */
        toUrlValue(precision?: number): string;
        /**
        * Extends this bounds to contain the union of this and the given bounds.
        */
        union(other: LatLngBounds): LatLngBounds;
    }

    export class Point {
        /**
        * A point on a two-dimensional plane.
        */
        constructor(x: number, y: number);
        /**
        * The X coordinate
        */
        x: number;
        /**
        * The Y coordinate
        */
        y: number;
        /**
        * Compares two Points
        */
        equals(other: Point): boolean;
        /**
        * Returns a string representation of this Point.
        */
        toString(): string;
    }

    export class Size {
        /**
        * Two-dimensonal size, where width is the distance on the x-axis, and height is the distance on the y-axis.
        */
        constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
        /**
        * The height along the y-axis, in pixels.
        */
        height: number;
        /**
        * The width along the x-axis, in pixels.
        */
        width: number;
        /**
        * Compares two Sizes.
        */
        equals(other: Size): boolean;
        /**
        * Returns a string representation of this Size.
        */
        toString(): string;
    }

    export interface Symbol {
        /*
        * The position of the symbol relative to the marker or polyline. The coordinates of the symbol's path are translated left and up by the 
        * anchor's x and y coordinates respectively. By default, a symbol is anchored at (0, 0). The position is expressed in the same coordinate 
        * system as the symbol's path.
        */
        anchor?: Point;
        /*
        * The symbol's fill color. All CSS3 colors are supported except for extended named colors. For symbol markers, this defaults to 'black'. 
        * For symbols on polylines, this defaults to the stroke color of the corresponding polyline.
        */
        fillColor?: string;
        /*
        * The symbol's fill opacity. Defaults to 0.
        */
        fillOpacity?: number;
        /*
        * The symbol's path, which is a built-in symbol path, or a custom path expressed using SVG path notation. Required.
        */
        path?: any;
        /*
        * The angle by which to rotate the symbol, expressed clockwise in degrees. Defaults to 0. 
        * A symbol in an IconSequence where fixedRotation is false is rotated relative to the angle of the edge on which it lies.
        */
        rotation?: number;
        /*
        * The amount by which the symbol is scaled in size. For symbol markers, this defaults to 1; after scaling, the symbol may be 
        * of any size. For symbols on a polyline, this defaults to the stroke weight of the polyline; after scaling, 
        * the symbol must lie inside a square 22 pixels in size centered at the symbol's anchor.
        */
        scale?: number;
        /*
        * The symbol's stroke color. All CSS3 colors are supported except for extended named colors. 
        * For symbol markers, this defaults to 'black'. For symbols on a polyline, this defaults to the stroke color of the polyline.
        */
        strokeColor?: string;
        /*
        * The symbol's stroke opacity. For symbol markers, this defaults to 1. 
        * For symbols on a polyline, this defaults to the stroke opacity of the polyline.
        */
        strokeOpacity?: number;
        /*
        * The symbol's stroke weight. Defaults to the scale of the symbol.
        */
        strokeWeight?: number;
    }

    export enum SymbolPath {
        /*
        * A backward-pointing closed arrow.
        */
        BACKWARD_CLOSED_ARROW,
        /*
        * A backward-pointing open arrow.
        */
        BACKWARD_OPEN_ARROW,
        /*
        * A circle.
        */
        CIRCLE,
        /*
        * A forward-pointing closed arrow.
        */
        FORWARD_CLOSED_ARROW,
        /*
        * A forward-pointing open arrow.
        */
        FORWARD_OPEN_ARROW
    }

    export interface Time {
        /**
        * A string representing the time's value. The time is displayed in the time zone of the transit stop.
        */
        text: string;
        /**
        * The time zone in which this stop lies. The value is the name of the time zone as defined 
        * in the IANA Time Zone Database, e.g. "America/New_York".
        */
        time_zone: string;
        /**
        * The time of this departure or arrival, specified as a JavaScript Date object.
        */
        value: Date;
    }


}