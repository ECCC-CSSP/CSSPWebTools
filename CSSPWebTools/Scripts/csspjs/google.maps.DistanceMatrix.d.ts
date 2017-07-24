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

    export class DistanceMatrixService {
        /**
        * A service for computing distances between multiple origins and destinations.
        * -
        * Creates a new instance of a DistanceMatrixService that sends distance matrix queries to Google servers.
        */
        constructor();
        /**
        * Issues a distance matrix request.
        */
        getDistanceMatrix(request: DistanceMatrixRequest, callback: (response: DistanceMatrixResponse, status: DistanceMatrixStatus) => void): void;
    }

    export interface DistanceMatrixRequest {
        /**
        * If true, instructs the Distance Matrix service to avoid highways where possible. Optional.
        */
        avoidHighways?: boolean;
        /**
        * If true, instructs the Distance Matrix service to avoid toll roads where possible. Optional.
        */
        avoidTolls?: boolean;
        /**
        * An array containing destination address strings and/or LatLngs, to which to calculate distance and time. Required.
        */
        destinations?: Array<any>;
        /**
        * Whether or not we should provide trip durations based on current traffic conditions. Only available to Maps API for Business customers.
        */
        durationInTraffic?: boolean;
        /**
        * An array containing origin address strings and/or LatLngs, from which to calculate distance and time. Required.
        */
        origins?: Array<any>;
        /**
        * Region code used as a bias for geocoding requests. Optional.
        */
        region?: string;
        /**
        * Type of routing requested. Required.
        */
        travelMode?: TravelMode;
        /**
        * Preferred unit system to use when displaying distance. Optional; defaults to metric.
        */
        unitSystem?: UnitSystem;
    }

    export interface DistanceMatrixResponse {
        /**
        * The formatted destination addresses.
        */
        destinationAddresses: Array<string>;
        /**
        * The formatted origin addresses.
        */
        originAddresses: Array<string>;
        /**
        * The rows of the matrix, corresponding to the origin addresses.
        */
        rows: Array<DistanceMatrixResponseRow>;
    }

    export interface DistanceMatrixResponseRow {
        /**
        * The row's elements, corresponding to the destination addresses.
        */
        elements: Array<DistanceMatrixResponseElement>;
    }

    export interface DistanceMatrixResponseElement {
        /**
        * 	The distance for this origin-destination pairing. This property may be undefined as the distance may be unknown.
        */
        distance: Distance;
        /**
        * The duration for this origin-destination pairing. This property may be undefined as the duration may be unknown.
        */
        duration: Duration;
        /**
        * The status of this particular origin-destination pairing.
        */
        status: DistanceMatrixElementStatus;
    }

    export enum DistanceMatrixStatus {
        /**
        * The provided request was invalid.
        */
        INVALID_REQUEST,
        /**
        * The request contains more than 25 origins, or more than 25 destinations.
        */
        MAX_DIMENSIONS_EXCEEDED,
        /**
        * The product of origins and destinations exceeds the per-query limit.
        */
        MAX_ELEMENTS_EXCEEDED,
        /**
        * The response contains a valid result.
        */
        OK,
        /**
        * Too many elements have been requested within the allowed time period. The request should succeed if you try again after a reasonable amount of time.
        */
        OVER_QUERY_LIMIT,
        /**
        * The service denied use of the Distance Matrix service by your web page.
        */
        REQUEST_DENIED,
        /**
        * A Distance Matrix request could not be processed due to a server error. The request may succeed if you try again.
        */
        UNKNOWN_ERROR
    }

    export enum DistanceMatrixElementStatus {
        /**
        * The origin and/or destination of this pairing could not be geocoded.
        */
        NOT_FOUND,
        /**
        * The response contains a valid result.
        */
        OK,
        /**
        * No route could be found between the origin and destination.
        */
        ZERO_RESULTS
    }

} 