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

    export class TransitLayer extends MVCObject {
        /**
        * A transit layer.
        * -
        * A layer that displays transit lines.
        */
        constructor();
        /**
        * Returns the map on which this layer is displayed.
        */
        getMap(): void;
        /**
        * Renders the layer on the specified map. If map is set to null, the layer will be removed.
        */
        setMap(map: Map): void;
    }

    export interface TransitDetails {
        /**
        * The arrival stop of this transit step.
        */
        arrival_stop: TransitStop;
        /**
        * The arrival time of this step, specified as a Time object.
        */
        arrival_time: Time;
        /**
        * The departure stop of this transit step.
        */
        departure_stop: TransitStop;
        /**
        * The departure time of this step, specified as a Time object.
        */
        departure_time: Time;
        /**
        * The direction in which to travel on this line, as it is marked on the vehicle or at the departure stop.
        */
        headsign: string;
        /**
        * The expected number of seconds between equivalent vehicles at this stop.
        */
        headway: number;
        /**
        * Details about the transit line used in this step.
        */
        line: TransitLine;
        /**
        * The number of stops on this step. Includes the arrival stop, but not the departure stop.
        */
        num_stops: number;
    }

    export interface TransitStop {
        /**
        * The location of this stop.
        */
        location: LatLng;
        /**
        * The name of this transit stop.
        */
        name: string;
    }

    export interface TransitLine {
        /**
        * The transit agency that operates this transit line.
        */
        agencies: Array<TransitAgency>;
        /**
        * The color commonly used in signage for this transit line, represented as a hex string.
        */
        color: string;
        /**
        * The URL for an icon associated with this line.
        */
        icon: string;
        /**
        * The full name of this transit line, e.g. "8 Avenue Local".
        */
        name: string;
        /**
        * The short name of this transit line, e.g. "E".
        */
        short_name: string;
        /**
        * The text color commonly used in signage for this transit line, represented as a hex string.
        */
        text_color: string;
        /**
        * The agency's URL which is specific to this transit line.
        */
        url: string;
        /**
        * The type of vehicle used, e.g. train or bus.
        */
        vehicle: TransitVehicle;
    }

    export interface TransitAgency {
        /**
        * The name of this transit agency.
        */
        name: string;
        /**
        * The transit agency's phone number.
        */
        phone: string;
        /**
        * The transit agency's URL.
        */
        url: string;
    }

    export interface TransitVehicle {
        /**
        * A URL for an icon that corresponds to the type of vehicle used on this line.
        */
        icon: string;
        /**
        * A URL for an icon that corresponds to the type of vehicle used in this region instead of the more general icon.
        */
        local_icon: string;
        /**
        * A name for this type of TransitVehicle, e.g. "Train" or "Bus".
        */
        name: string;
        /**
        * The type of vehicle used, e.g. train, bus, or ferry.
        */
        type: string;
    }


} 