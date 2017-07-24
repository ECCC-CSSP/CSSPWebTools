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

    /***** Geometry Library *****/
    export module geometry {
        export class encoding {
            /**
            * Decodes an encoded path string into a sequence of LatLngs.
            */
            static decodePath(encodedPath: string): Array<LatLng>;
            /**
            * Encodes a sequence of LatLngs into an encoded path string.
            */
            static encodePath(path: Array<any>): string;
        }

        export class spherical {
            /**
            * Returns the area of a closed path. The computed area uses the same units as the radius. 
            * The radius defaults to the Earth's radius in meters, in which case the area is in square meters.
            */
            static computeArea(path: Array<any>, radius?: number): number;
            /**
            * Returns the distance between two LatLngs.
            */
            static computeDistanceBetween(from: LatLng, to: LatLng, radius?: number): number;
            /**
            * Returns the heading from one LatLng to another LatLng. 
            * Headings are expressed in degrees clockwise from North within the range [-180,180).
            */
            static computeHeading(from: LatLng, to: LatLng): number;
            /**
            * Returns the length of the given path.
            */
            static computeLength(path: Array<any>, radius?: number): number;
            /**
            * Returns the LatLng resulting from moving a distance from an origin in the specified heading (expressed in degrees clockwise from north).
            */
            static computeOffset(from: LatLng, distance: number, heading: number, radius?: number): LatLng;
            /**
            * Returns the location of origin when provided with a LatLng destination, meters travelled and original heading. 
            * Headings are expressed in degrees clockwise from North. This function returns null when no solution is available.
            */
            static computeOffsetOrigin(to: LatLng, distance: number, heading: number, radius?: number): LatLng;
            /**
            * Returns the signed area of a closed path. The signed area may be used to determine the orientation of the path. 
            * The computed area uses the same units as the radius. 
            * The radius defaults to the Earth's radius in meters, in which case the area is in square meters.
            */
            static computeSignedArea(loop: Array<any>, radius?: number): number;
            /**
            * Returns the LatLng which lies the given fraction of the way between the origin LatLng and the destination LatLng.
            */
            static interpolate(from: LatLng, to: LatLng, fraction: number): LatLng;
        }

        export class poly {
            /**
            * Computes whether the given point lies inside the specified polygon.
            */
            containsLocation(point: LatLng, polygon: Polygon): boolean;
            /**
            * Computes whether the given point lies on or near to a polyline, or the edge of a polygon, 
            * within a specified tolerance. Returns true when the difference between the latitude and longitude of the supplied point, 
            * and the closest point on the edge, is less than the tolerance. The tolerance defaults to 10-9 degrees.
            */
            isLocationOnEdge(point: LatLng, poly: any, tolerance?: number): boolean;
        }
    }

} 