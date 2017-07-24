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

    /***** Event *****/
    export interface MapsEventListener { }

    export class event {
        /**
        * Cross browser event handler registration. This listener is removed by calling removeListener(handle) for the handle that is returned by this function.
        */
        static addDomListener(instance: any, eventName: string, handler: (event?: any, ...args: Array<any>) => void, capture?: boolean): MapsEventListener;
        /**
        * Cross browser event handler registration. This listener is removed by calling removeListener(handle) for the handle that is returned by this function.
        */
        static addDomListener(instance: any, eventName: string, handler: Function, capture?: boolean): MapsEventListener;
        /**
        * Wrapper around addDomListener that removes the listener after the first event.
        */
        static addDomListenerOnce(instance: any, eventName: string, handler: (event?: any, ...args: Array<any>) => void, capture?: boolean): MapsEventListener;
        /** 
        * Wrapper around addDomListener that removes the listener after the first event.
        */
        static addDomListenerOnce(instance: any, eventName: string, handler: Function, capture?: boolean): MapsEventListener;
        /**
        * Adds the given listener function to the given event name for the given object instance. 
        * Returns an identifier for this listener that can be used with removeListener().
        */
        static addListener(instance: any, eventName: string, handler: (event?: any, ...args: Array<any>) => void): MapsEventListener;
        /**
        * Adds the given listener function to the given event name for the given object instance. 
        * Returns an identifier for this listener that can be used with removeListener().
        */
        static addListener(instance: any, eventName: string, handler: Function): MapsEventListener;
        /**
        * Like addListener, but the handler removes itself after handling the first event.
        */
        static addListenerOnce(instance: any, eventName: string, handler: (event?: any, ...args: Array<any>) => void): MapsEventListener;
        /**
        * Like addListener, but the handler removes itself after handling the first event.
        */
        static addListenerOnce(instance: any, eventName: string, handler: Function): MapsEventListener;
        /**
        * Removes all listeners for all events for the given instance.
        */
        static clearInstanceListeners(instance: any): void;
        /**
        * Removes all listeners for the given event for the given instance.
        */
        static clearListeners(instance: any, eventName: string): void;
        /**
        * Removes the given listener, which should have been returned by addListener above.
        */
        static removeListener(listener: MapsEventListener): void;
        /**
        * Triggers the given event. All arguments after eventName are passed as arguments to the listeners.
        */
        static trigger(instance: any, eventName: string, ...args: Array<any>): void;
    }

    export interface MouseEvent {
        /**
        * Prevents this event from propagating further.
        */
        stop(): void;
        /**
        * The latitude/longitude that was below the cursor when the event occurred.
        */
        latLng: LatLng;
    }

    export interface PolyMouseEvent {
        /** 
        * The index of the edge within the path beneath the cursor when the event occurred, if the event occurred on a mid-point on an editable polygon.
        */
        edge?: number;
        /**
        * The index of the path beneath the cursor when the event occurred, if the event occurred on a vertex and the polygon is editable. Otherwise undefined.
        */
        path?: number;
        /** 
        * The index of the vertex beneath the cursor when the event occurred, if the event occurred on a vertex and the polyline or polygon is editable. 
        * If the event does not occur on a vertex, the value is undefined.
        */
        vertex?: number;
    }


} 