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

    export class ElevationService {
        /**
        * Defines a service class that talks directly to Google servers for requesting elevation data.
        * -
        * Creates a new instance of a ElevationService that sends elevation queries to Google servers.
        */
        constructor();
        /**
        * Makes an elevation request along a path, where the elevation data are returned as distance-based samples along that path.
        */
        getElevationAlongPath(request: PathElevationRequest, callback: (results: Array<ElevationResult>, status: ElevationStatus) => void): void;
        /**
        * Makes an elevation request for a list of discrete locations.
        */
        getElevationForLocations(request: LocationElevationRequest, callback: (results: Array<ElevationResult>, status: ElevationStatus) => void): void;
    }

    export interface LocationElevationRequest {
        /**
        * The discrete locations for which to retrieve elevations.
        */
        locations: Array<LatLng>;
    }

    export interface PathElevationRequest {
        /**
        * The path along which to collect elevation values.
        */
        path?: Array<LatLng>;
        /**
        * Required. The number of equidistant points along the given path for which to retrieve elevation data, including the endpoints. 
        * The number of samples must be a value between 2 and 512 inclusive.
        */
        samples?: number;
    }

    export interface ElevationResult {
        /**
        * The elevation of this point on Earth, in meters above sea level.
        */
        elevation: number;
        /**
        * The location of this elevation result.
        */
        location: LatLng;
        /**
        * The distance, in meters, between sample points from which the elevation was interpolated. 
        * This property will be missing if the resolution is not known. Note that elevation data becomes more 
        * coarse (larger resolution values) when multiple points are passed. 
        * To obtain the most accurate elevation value for a point, it should be queried independently.
        */
        resolution: number;
    }

    export enum ElevationStatus {
        /**
        * This request was invalid.
        */
        INVALID_REQUEST,
        /**
        * The request did not encounter any errors.
        */
        OK,
        /**
        * The webpage has gone over the requests limit in too short a period of time.
        */
        OVER_QUERY_LIMIT,
        /**
        * The webpage is not allowed to use the elevation service for some reason.
        */
        REQUEST_DENIED,
        /**
        * A geocoding, directions or elevation request could not be successfully processed, yet the exact reason for the failure is not known.
        */
        UNKNOWN_ERROR
    }

} 