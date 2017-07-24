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

    export class Geocoder {
        /**
        * A service for converting between an address and a LatLng.
        * -
        * Creates a new instance of a Geocoder that sends geocode requests to Google servers.
        */
        constructor();
        /**
        * Geocode a request.
        */
        geocode(request: GeocoderRequest, callback: (results: Array<GeocoderResult>, status: GeocoderStatus) => void): void;
    }

    export interface GeocoderRequest {
        /**
        * Address. Optional.
        */
        address?: string;
        /**
        * LatLngBounds within which to search. Optional.
        */
        bounds?: LatLngBounds;
        /**
        * LatLng about which to search. Optional.
        */
        location?: LatLng;
        /**
        * Country code used to bias the search, specified as a Unicode region subtag / CLDR identifier. Optional.
        */
        region?: string;
    }

    export interface GeocoderComponentRestrictions {
        /**
        * Matches all the administrative_area levels. Optional.
        */
        administrativeArea?: string;
        /**
        * Matches a country name or a two letter ISO 3166-1 country code. Optional.
        */
        country?: string;
        /**
        * Matches against both locality and sublocality types. Optional.
        */
        locality?: string;
        /**
        * Matches postal_code and postal_code_prefix. Optional.
        */
        postalCode?: string;
        /**
        * Matches the long or short name of a route. Optional.
        */
        route?: string;
    }

    export enum GeocoderStatus {
        /**
        * There was a problem contacting the Google servers.
        */
        ERROR,
        /**
        * This GeocoderRequest was invalid.
        */
        INVALID_REQUEST,
        /**
        * The response contains a valid GeocoderResponse.
        */
        OK,
        /**
        * The webpage has gone over the requests limit in too short a period of time.
        */
        OVER_QUERY_LIMIT,
        /**
        * The webpage is not allowed to use the geocoder.
        */
        REQUEST_DENIED,
        /**
        * A geocoding request could not be processed due to a server error. The request may succeed if you try again.
        */
        UNKNOWN_ERROR,
        /**
        * No result was found for this GeocoderRequest.
        */
        ZERO_RESULTS
    }

    export interface GeocoderResult {
        /**
        * An array of GeocoderAddressComponents
        */
        address_components?: Array<GeocoderAddressComponent>;
        /**
        * A string containing the human-readable address of this location.
        */
        formatted_address?: string;
        /**
        * A GeocoderGeometry object
        */
        geometry?: GeocoderGeometry;
        /**
        * Whether the geocoder did not return an exact match for the original request, though it was able to match part of the requested address.
        */
        partial_match?: boolean;
        /**
        * An array of strings denoting all the localities contained in a postal code.This is only present when the result is a postal code that contains multiple localities.
        */
        postcode_localities?: Array<string>
        /**
        * An array of strings denoting the type of the returned geocoded element. 
        * For a list of possible strings, refer to the Address Component Types section of the Developer's Guide.
        */
        types: Array<string>;
    }

    export interface GeocoderAddressComponent {
        /**
        * The full text of the address component
        */
        long_name?: string;
        /**
        * The abbreviated, short text of the given address component
        */
        short_name?: string;
        /**
        * An array of strings denoting the type of this address component. A list of valid types can be found here
        */
        types?: Array<string>;
    }

    export interface GeocoderGeometry {
        /**
        * The precise bounds of this GeocoderResult, if applicable
        */
        bounds?: LatLngBounds;
        /**
        * The latitude/longitude coordinates of this result
        */
        location?: LatLng;
        /**
        * The type of location returned in location
        */
        location_type?: GeocoderLocationType;
        /**
        * The bounds of the recommended viewport for displaying this GeocoderResult
        */
        viewport?: LatLngBounds;
    }

    export enum GeocoderLocationType {
        /**
        * The returned result is approximate.
        */
        APPROXIMATE,
        /**
        * The returned result is the geometric center of a result such a line (e.g. street) or polygon (region).
        */
        GEOMETRIC_CENTER,
        /**
        * The returned result reflects an approximation (usually on a road) interpolated between two precise points (such as intersections). 
        * Interpolated results are generally returned when rooftop geocodes are unavailable for a street address.
        */
        RANGE_INTERPOLATED,
        /**
        * The returned result reflects a precise geocode.
        */
        ROOFTOP
    }

} 