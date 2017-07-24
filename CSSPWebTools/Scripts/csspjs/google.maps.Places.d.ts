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

    export module places {

        export class Autocomplete extends MVCObject {
            /**
            * A service to provide Place predictions based on a user's text input. 
            * It attaches to an input element of type text, and listens for text entry in that field. 
            * The list of predictions is presented as a drop-down list, and is updated as text is entered.
            * -
            * Creates a new instance of Autocomplete that attaches to the specified input text field with the given options.
            */
            constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
            /**
            * Returns the bounds to which predictions are biased.
            */
            getBounds(): LatLngBounds;
            /**
            * Returns the details of the Place selected by user if the details were successfully retrieved. 
            * Otherwise returns a stub Place object, with the name property set to the current value of the input field.
            */
            getPlace(): PlaceResult;
            /**
            * Sets the preferred area within which to return Place results. Results are biased towards, but not restricted to, this area.
            */
            setBounds(bounds: LatLngBounds): void;
            /**
            * Sets the component restrictions. Component restrictions are used to restrict 
            * predictions to only those within the parent component. E.g., the country.
            */
            setComponentRestrictions(restrictions: ComponentRestrictions): void;
            /**
            * Sets the types of predictions to be returned. Supported types are 'establishment' for businesses and 'geocode' for addresses. 
            * If no type is specified, both types will be returned. The setTypes method accepts a single element array.
            */
            setTypes(types: Array<string>): void;


            // -----------------------------------------------------
            // Event
            // -----------------------------------------------------

            /**
            * This event is fired when a PlaceResult is made available for a Place the user has selected. 
            * If the user enters the name of a Place that was not suggested by the control and presses the Enter key, 
            * or if a Place detail request fails, a place_changed event will be fired that contains 
            * the user input in the name property, with no other properties defined.
            */
            place_changed();
        }

        export interface AutocompleteOptions {
            /**
            * The area in which to search for places. Results are biased towards, but not restricted to, places contained within these bounds.
            */
            bounds?: LatLngBounds;
            /**
            * The component restrictions. Component restrictions are used to restrict predictions to only those within the parent component. E.g., the country.
            */
            componentRestrictions?: ComponentRestrictions;
            /**
            * The types of predictions to be returned. Four types are supported: 'establishment' for 
            * businesses, 'geocode' for addresses, '(regions)' for administrative regions and '(cities)' for localities. 
            * If nothing is specified, all types are returned. In general only a single type is allowed. 
            * The exception is that you can safely mix the 'geocode' and 'establishment' types, 
            * but note that this will have the same effect as specifying no types.
            */
            types?: Array<string>;
        }

        export interface AutocompletePrediction {
            /**
            * This is the unformatted version of the query suggested by the Places service.
            */
            description?: string;
            /**
            * A stable ID for this place, intended to be interoperable with those returned by the place search service.
            */
            id?: string;
            /**
            * A set of substrings in the place's description that match elements in the user's input, suitable for use in highlighting those substrings.
            * Each substring is identified by an offset and a length, expressed in unicode characters.
            */
            matched_substrings?: Array<PredictionSubstring>;
            /**
            * A reference that can be used to retrieve details about this place using the place details service(see PlacesService.getDetails()).
            */
            reference?: string;
            /**
            * Information about individual terms in the above description, from most to least specific.For example, "Taco Bell", "Willitis", and "CA".
            */
            terms?: Array<PredictionTerm>;
            /**
            * An array of types that the prediction belongs to, for example 'establishment' or 'geocode'.
            */
            types?: Array<string>
        }

        export interface PredictionTerm {
            /**
            * The offset, in unicode characters, of the start of this term in the description of the place.
            */
            offset?: number;
            /**
            * The value of this term, e.g. "Taco Bell".
            */
            value?: string;
        }

        export interface PredictionSubstring {
            /**
            * The length of the substring.
            */
            length?: number;
            /**
            * The offset to the substring's start within the description string.
            */
            offset?: number;
        }

        export interface AutocompleteService {
            /**
            * Contains methods related to retrieving Autocomplete predictions.
            * -
            * Creates a new instance of the AutocompleteService.
            */
            constructor();
            /**
            * Retrieves place autocomplete predictions based on the supplied autocomplete request.
            * -
            * any is of type Array<AutocompletePrediction>
            */
            getPlacePredictions(request: AutocompletionRequest, callback: (any, PlacesServiceStatus) => void): void;
            /**
            * Retrieves query autocomplete predictions based on the supplied query autocomplete request.
            * -
            * any is of type Array<QueryAutocompletePrediction>
            */
            getQueryPredictions(request: QueryAutocompletionRequest, callback: (any, PlacesServiceStatus) => void): void;
        }

        export interface AutocompletionRequest {
            /**
            * Bounds for prediction biasing.Predictions will be biased towards, but not restricted to, the given bounds.Both location and radius will be ignored if bounds is set.
            */
            bounds?: LatLngBounds;
            /**
            * The component restrictions.Component restrictions are used to restrict predictions to only those within the parent component.E.g., the country.
            */
            componentRestrictions?: ComponentRestrictions;
            /**
            * The user entered input string.
            */
            input?: string;
            /**
            * Location for prediction biasing.Predictions will be biased towards the given location and radius.Alternatively, bounds can be used.
            */
            location?: LatLng;
            /**
            * The character position in the input term at which the service uses text for predictions(the position of the cursor in the input field).
            */
            offset?: number;
            /**
            * The radius of the area used for prediction biasing.The radius is specified in meters, 
            * and must always be accompanied by a location property.Alternatively, bounds can be used.
            */
            radius?: number;
            /**
            * The types of predictions to be returned.Four types are supported: 'establishment' 
            * for businesses, 'geocode' for addresses, '(regions)' for administrative regions and '(cities)' 
            * for localities.If nothing is specified, all types are returned.        
            */
            types?: Array<string>
        }

        export interface ComponentRestrictions {
            /**
            * Restricts predictions to the specified country (ISO 3166-1 Alpha-2 country code, case insensitive). E.g., us, br, au.
            */
            country?: string;
        }

        export interface PlaceAspectRating {
            /**
            * The rating of this aspect.For individual reviews this is an integer from 0 to 3. 
            * For aggregated ratings of a place this is an integer from 0 to 30.
            */
            rating?: number;
            /**
            * The aspect type, e.g."food", "decor", "service", "overall".
            */
            type?: string;
        }

        export interface PlaceDetailsRequest {
            /**
            * The reference of the Place for which details are being requested.
            */
            reference?: string;
        }

        export interface PlaceGeometry {
            /**
            * The Place's position.
            */
            location?: LatLng;
            /**
            * The preferred viewport when displaying this Place on a map. 
            * This property will be null if the preferred viewport for the Place is not known.
            */
            viewport?: LatLngBounds;
        }

        export interface PlacePhoto {
            /**
            * Returns the image URL corresponding to the specified options. You must include a PhotoOptions object with at least one of maxWidth or maxHeight specified.
            */
            getUrl(opts: PhotoOptions): string;

            // --------------------------
            // Properties
            // --------------------------

            /**
            * The height of the photo in pixels.
            */
            height?: number;
            /**
            * Attribution text to be displayed for this photo.
            */
            html_attributions?: Array<string>;
            /**
            * The width of the photo in pixels.
            */
            width?: number;
        }

        export interface PhotoOptions {
            /**
            * The maximum height in pixels of the returned image.
            */
            maxHeight?: number;
            /**
            * The maximum width in pixels of the returned image.
            */
            maxWidth?: number;
        }

        export interface PlaceResult {
            /**
            * The collection of address components for this Place's location.
            */
            address_components?: Array<GeocoderAddressComponent>;
            /**
            * The rated aspects of this Place, based on Google and Zagat user reviews.The ratings are on a scale of 0 to 30.
            */
            aspects?: Array<PlaceAspectRating>;
            /**
            * The Place's full address.
            */
            formatted_address?: string;
            /**
            * The Place's phone number, formatted according to the number's regional convention.
            */
            formatted_phone_number?: string;
            /**
            * The Place's geometry-related information.
            */
            geometry?: PlaceGeometry;
            /**
            * Attribution text to be displayed for this Place result.
            */
            html_attributions?: Array<string>;
            /**
            * URL to an image resource that can be used to represent this Place's category.
            */
            icon?: string;
            /**
            * A unique identifier denoting this Place. This identifier may not be used to retrieve information about this Place, 
            * and to verify the identity of a Place across separate searches. As ids can occasionally change, 
            * it is recommended that the stored id for a Place be compared with the id returned in later Details 
            * requests for the same Place, and updated if necessary.
            */
            id?: string;
            /**
            * The Place's phone number in international format. International format includes the country code, and is prefixed with the plus (+) sign.
            */
            international_phone_number?: string;
            /**
            * The Place's name. Note: In the case of user entered Places, this is the raw text, as typed by the user. 
            * Please exercise caution when using this data, as malicious users may try to use it as a vector for code injection attacks 
            * (See http://en.wikipedia.org/wiki/Code_injection).
            */
            name?: string;
            /**
            * A flag indicating whether the Place is permanently closed. If the place is not permanently closed, 
            * the flag is not present in search or details responses.
            */
            permanently_closed?: boolean;
            /**
            * Photos of this Place.The collection will contain up to ten PlacePhoto objects.
            */
            photos?: Array<PlacePhoto>;
            /**
            * The price level of the Place, on a scale of 0 to 4. Price levels are interpreted as follows:
            * -
            * Value	    Description
            *   0 	     Free
            *   1 	     Inexpensive
            *   2 	     Moderate
            *   3 	     Expensive
            *   4 	     Very Expensive
            */
            price_level?: number;
            /**
            * A rating, between 1.0 to 5.0, based on user reviews of this Place.
            */
            rating?: number;
            /**
            * An opaque string that may be used to retrieve up-to-date information about this Place (via PlacesService.getDetails()). 
            * reference contains a unique token that you can use to retrieve additional information about this Place in a Place Details request. 
            * You can store this token and use it at any time in future to refresh cached data about this Place, but the same token is not 
            * guaranteed to be returned for any given Place across different searches.
            */
            reference?: string;
            /**
            * The editorial review summary. Only visible in details responses, for customers of Maps API for 
            * Business and when extensions: 'review_summary' is specified in the details request.The review_summary field is experimental, and subject to change.
            */
            review_summary?: string;
            /**
            * A list of reviews of this Place.
            */
            reviews?: Array<PlaceReview>;
            /**
            * An array of types for this Place (e.g., ["political",  "locality"] or ["restaurant", "establishment"]).
            */
            types?: Array<string>;
            /**
            * URL of the associated Google Place Page.
            */
            url?: string;
            /**
            * A fragment of the Place's address for disambiguation (usually street name and locality).
            */
            vicinity?: string;
            /**
            * The authoritative website for this Place, such as a business' homepage.
            */
            website?: string;
        }

        export interface PlaceReview {
            /**
            * The aspects rated by the review. The ratings on a scale of 0 to 3.
            */
            aspects?: Array<PlaceAspectRating>;
            /**
            * The name of the reviewer.
            */
            author_name?: string;
            /**
            * A link to the reviewer's profile. This will be undefined when the reviewer's profile is unavailable.
            */
            author_url?: string;
            /**
            * An IETF language code indicating the language in which this review is written.Note that this code 
            * includes only the main language tag without any secondary tag indicating country or region.
            * For example, all the English reviews are tagged as 'en' rather than 'en-AU' or 'en-UK'.
            */
            language?: string;
            /**
            * The text of a review.
            */
            text?: string;
        }

        export interface PlaceSearchPagination {
            /**
            * Fetches the next page of results. Uses the same callback function that was provided to the first search request.
            */
            nextPage(): void;
            /**
            * Indicates if further results are available. true when there is an additional results page.
            */
            hasNextPage: boolean;
        }

        export interface PlaceSearchRequest {
            /**
            * The bounds within which to search for Places. Both location and radius will be ignored if bounds is set.
            */
            bounds?: LatLngBounds;
            /**
            * A term to be matched against all available fields, including but not limited to name, 
            * type, and address, as well as customer reviews and other third-party content.
            */
            keyword?: string;
            /**
            * The location around which to search for Places.
            */
            location?: LatLng;
            /**
            * Restricts results to only those places at the specified price level or lower. 
            * Valid values are in the range from 0(most affordable) to 4(most expensive), 
            * inclusive. Must be greater than or equal to minPrice, if specified.
            */
            maxPriceLevel?: number;
            /**
            * Restricts results to only those places at the specified price level or higher. 
            * Valid values are in the range from 0(most affordable) to 4(most expensive), inclusive. 
            * Must be less than or equal to maxPrice, if specified.
            */
            minPriceLevel?: number;
            /**
            * Restricts the Place search results to Places that include this text in the name.
            */
            name?: string;
            /**
            * Restricts results to only those places that are open right now.
            */
            openNow?: boolean;
            /**
            * The distance from the given location within which to search for Places, in meters. The maximum allowed value is 50 000.
            */
            radius?: number;
            /**
            * Specifies the ranking method to use when returning results.
            */
            rankBy?: RankBy;
            /**
            * Restricts the Place search results to Places with a type matching at least one of 
            * the specified types in this array. Valid types are given here.
            */
            types?: Array<string>;
        }

        export class PlacesService {
            /**
            * Contains methods related to searching for Places and retrieving details about a Place.
            * -
            * Creates a new instance of the PlacesService that renders attributions in the specified container.
            */
            constructor(attrContainer: HTMLDivElement);
            /**
            * Contains methods related to searching for Places and retrieving details about a Place.
            * -
            * Creates a new instance of the PlacesService that renders attributions in the specified container.
            */
            constructor(attrContainer: Map);
            /**
            * Retrieves details about the Place identified by the given reference.
            */
            getDetails(request: PlaceDetailsRequest, callback: (result: PlaceResult, status: PlacesServiceStatus) => void): void;
            /**
            * Retrieves a list of Places in a given area. The PlaceResults passed to the callback are stripped-down versions of a full PlaceResult. 
            * A more detailed PlaceResult for each Place can be obtained by sending a Place Details request with the desired Place's reference value.
            */
            nearbySearch(request: PlaceSearchRequest, callback: (results: Array<PlaceResult>, status: PlacesServiceStatus, pagination: PlaceSearchPagination) => void): void;
            /**
            * Similar to the nearbySearch function, with the following differences: the search response will 
            * include up to 200 Places, identified only by their geographic coordinates and Place reference.
            * -
            * any is of type Array<PlaceResult>
            */
            radarSearch(request: RadarSearchRequest, callback: (any, PlacesServiceStatus) => void): void
            /**
            * Similar to the nearbySearch function, with the following differences: it retrieves a list of Places based on the query 
            * attribute in the given request object; bounds or location + radius parameters are optional; and the region, when provided, 
            * will not restrict the results to places inside the area, only bias the response towards results near it.
            */
            textSearch(request: TextSearchRequest, callback: (results: Array<PlaceResult>, status: PlacesServiceStatus) => void): void;
        }

        export enum PlacesServiceStatus {
            /**
            * This request was invalid.
            */
            INVALID_REQUEST,
            /**
            * The response contains a valid result.
            */
            OK,
            /**
            * The application has gone over its request quota.
            */
            OVER_QUERY_LIMIT,
            /**
            * The application is not allowed to use the PlacesService.
            */
            REQUEST_DENIED,
            /**
            * The PlacesService request could not be processed due to a server error. The request may succeed if you try again.
            */
            UNKNOWN_ERROR,
            /**
            * No result was found for this request.
            */
            ZERO_RESULTS
        }

        export interface QueryAutocompletePrediction {
            /**
            * This is the unformatted version of the query suggested by the Places service.
            */
            description?: string;
            /**
            * A set of substrings in the place's description that match elements in the user's input, 
            * suitable for use in highlighting those substrings.Each substring is identified by an offset 
            * and a length, expressed in unicode characters.
            */
            matched_substrings?: Array<PredictionSubstring>;
            /**
            * Information about individual terms in the above description.Categorical terms 
            * come first(e.g., "restaurant").Address terms appear from most to least specific.For example, "San Francisco", and "CA".
            */
            terms?: Array<PredictionTerm>
        }

        export interface QueryAutocompletionRequest {
            /**
            * Bounds for prediction biasing.Predictions will be biased towards, but not restricted to, 
            * the given bounds.Both location and radius will be ignored if bounds is set.
            */
            bounds?: LatLngBounds;
            /**
            * The user entered input string.
            */
            input?: string;
            /**
            * Location for prediction biasing.Predictions will be biased towards the given location and radius.Alternatively, bounds can be used.
            */
            location?: LatLng;
            /**
            * The character position in the input term at which the service uses text for predictions(the position of the cursor in the input field).
            */
            offset?: number;
            /**
            * The radius of the area used for prediction biasing.The radius is specified in meters, 
            * and must always be accompanied by a location property.Alternatively, bounds can be used.
            */
            radius?: number;
        }

        export interface RadarSearchRequest {
            /**
            * Bounds used to bias results when searching for Places(optional).Both location and radius will be ignored if bounds 
            * is set.Results will not be restricted to those inside these bounds; but, results inside it will rank higher.
            */
            bounds?: LatLngBounds;
            /**
            * A term to be matched against all available fields, including but not limited to name, type, 
            * and address, as well as customer reviews and other third - party content.
            */
            keyword?: string;
            /**
            * The center of the area used to bias results when searching for Places.
            */
            location?: LatLng;
            /**
            * Restricts results to Places that include this text in the name.
            */
            name?: string;
            /**
            * The radius of the area used to bias results when searching for Places, in meters.
            */
            radius?: number;
            /**
            * Restricts the Place search results to Places with a type matching at least one of the specified types in this array.Valid types are given here.
            */
            types?: Array<string>;
        }

        export enum RankBy {
            /**
            * Ranks place results by distance from the location.
            */
            DISTANCE,
            /**
            * Ranks place results by their prominence.
            */
            PROMINENCE
        }

        export class SearchBox {
            /**
            * A service to provide query predictions based on a user's text input. It attaches to an input element of type text, 
            * and listens for text entry in that field. The list of predictions is presented as a drop-down list, and is updated as text is entered.
            * -
            * Creates a new instance of SearchBox that attaches to the specified input text field with the given options.
            */
            constructor(inputField: HTMLInputElement, opts?: SearchBoxOptions);
            /**
            * Returns the bounds to which query predictions are biased.
            */
            getBounds(): LatLngBounds;
            /**
            * Returns the query selected by the user, or null if no places have been found yet, to be used with places_changed event.
            */
            getPlaces(): Array<PlaceResult>;
            /**
            * Sets the region to use for biasing query predictions. Results will only be biased towards this area and not be completely restricted to it.
            */
            setBounds(bounds: LatLngBounds): void;
        }

        export interface SearchBoxOptions {
            /**
            * 	The area towards which to bias query predictions. Predictions are biased towards, but not restricted to, queries targeting these bounds.
            */
            bounds: LatLngBounds;
        }

        export interface TextSearchRequest {
            /**
            * Bounds used to bias results when searching for Places (optional). 
            * Both location and radius will be ignored if bounds is set. Results will not be restricted to 
            * those inside these bounds; but, results inside it will rank higher.
            */
            bounds?: LatLngBounds;
            /**
            * The center of the area used to bias results when searching for Places.
            */
            location?: LatLng;
            /**
            * The request's query term. e.g. the name of a place ('Eiffel Tower'), a category followed by the name of a location 
            * ('pizza in New York'), or the name of a place followed by a location disambiguator ('Starbucks in Sydney').
            */
            query?: string;
            /**
            * The radius of the area used to bias results when searching for Places, in meters.
            */
            radius?: number;
            /**
            * Restricts the Place search results to Places with a type matching at least one of the specified types in this array.Valid types are given here.
            */
            types?: Array<string>;
        }
    }


} 