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

    export class DirectionsRenderer extends MVCObject {
        /**
        * Renders directions retrieved in the form of a DirectionsResult object retrieved from the DirectionsService.
        * -
        * Creates the renderer with the given options. Directions can be rendered on a map (as visual overlays) or additionally on a <div> panel (as textual instructions).
        */
        constructor(opts?: DirectionsRendererOptions);
        /**
        * Returns the renderer's current set of directions.
        */
        getDirections(): DirectionsResult;
        /**
        * Returns the map on which the DirectionsResult is rendered.
        */
        getMap(): Map;
        /**
        * Returns the panel <div> in which the DirectionsResult is rendered.
        */
        getPanel(): Element;
        /**
        * Returns the current (zero-based) route index in use by this DirectionsRenderer object.
        */
        getRouteIndex(): number;
        /**
        * Set the renderer to use the result from the DirectionsService. Setting a valid set of directions in this manner will display the directions on the renderer's designated map and panel.
        */
        setDirections(directions: DirectionsResult): void;
        /**
        * This method specifies the map on which directions will be rendered. Pass null to remove the directions from the map.
        */
        setMap(map: Map): void;
        /**
        * Change the options settings of this DirectionsRenderer after initialization.
        */
        setOptions(options: DirectionsRendererOptions): void;
        /**
        * This method renders the directions in a <div>. Pass null to remove the content from the panel.
        */
        setPanel(panel: Element): void;
        /**
        * Set the (zero-based) index of the route in the DirectionsResult object to render. By default, the first route in the array will be rendered.
        */
        setRouteIndex(routeIndex: number): void;

        // --------------------------------------------------------
        // Event
        // --------------------------------------------------------

        /**
        * This event is fired when the rendered directions change, either when a new DirectionsResult is 
        * set or when the user finishes dragging a change to the directions path.
        */
        directions_changed();
    }

    export interface DirectionsRendererOptions {
        /**
        * The directions to display on the map and/or in a <div> panel, retrieved as a DirectionsResult object from DirectionsService.
        */
        directions?: DirectionsResult;
        /**
        * If true, allows the user to drag and modify the paths of routes rendered by this DirectionsRenderer.
        */
        draggable?: boolean;
        /**
        * This property indicates whether the renderer should provide UI to select amongst alternative routes. 
        * By default, this flag is false and a user-selectable list of routes will be shown in the directions' 
        * associated panel. To hide that list, set hideRouteList to true.
        */
        hideRouteList?: boolean;
        /**
        * The InfoWindow in which to render text information when a marker is clicked. 
        * Existing info window content will be overwritten and its position moved. 
        * If no info window is specified, the DirectionsRenderer will create and use its own info window. 
        * This property will be ignored if suppressInfoWindows is set to true.
        */
        infoWindow?: InfoWindow;
        /**
        * Map on which to display the directions.
        */
        map?: Map;
        /**
        * Options for the markers. All markers rendered by the DirectionsRenderer will use these options.
        */
        markerOptions?: MarkerOptions;
        /**
        * The <div> in which to display the directions steps.
        */
        panel?: Element;
        /**
        * Options for the polylines. All polylines rendered by the DirectionsRenderer will use these options.
        */
        polylineOptions?: PolylineOptions;
        /**
        * By default, the input map is centered and zoomed to the bounding box of this set of directions. 
        * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom were never set.
        */
        preserveViewport?: boolean;
        /**
        * The index of the route within the DirectionsResult object. The default value is 0.
        */
        routeIndex?: number;
        /**
        * Suppress the rendering of the BicyclingLayer when bicycling directions are requested.
        */
        suppressBicyclingLayer?: boolean;
        /**
        * Suppress the rendering of info windows.
        */
        suppressInfoWindows?: boolean;
        /**
        * Suppress the rendering of markers.
        */
        suppressMarkers?: boolean;
        /**
        * Suppress the rendering of polylines.
        */
        suppressPolylines?: boolean;
    }

    export class DirectionsService {
        /**
        * Creates a new instance of a DirectionsService that sends directions queries to Google servers.
        */
        constructor();
        /**
        * Issue a directions search request.
        */
        route(request: DirectionsRequest, callback: (result: DirectionsResult, status: DirectionsStatus) => void): void;
    }

    export interface DirectionsRequest {
        /**
        * If true, instructs the Directions service to avoid highways where possible. Optional.
        */
        avoidHighways?: boolean;
        /**
        * If true, instructs the Directions service to avoid toll roads where possible. Optional.
        */
        avoidTolls?: boolean;
        /**
        * Location of destination. This can be specified as either a string to be geocoded or a LatLng. Required.
        */
        destination?: any;
        /**
        * Whether or not we should provide trip duration based on current traffic conditions. Only available to Maps API for Business customers.
        */
        durationInTraffic?: boolean;
        /**
        * If set to true, the DirectionService will attempt to re-order the supplied intermediate waypoints to minimize overall cost of the route. 
        * If waypoints are optimized, inspect DirectionsRoute.waypoint_order in the response to determine the new ordering.
        */
        optimizeWaypoints?: boolean;
        /**
        * Location of origin. This can be specified as either a string to be geocoded or a LatLng. Required.
        * -
        * any is of type LatLng or string
        */
        origin?: any;
        /**
        * Whether or not route alternatives should be provided. Optional.
        */
        provideRouteAlternatives?: boolean;
        /**
        * Region code used as a bias for geocoding requests. Optional.
        */
        region?: string;
        /**
        * Settings that apply only to requests where travelMode is TRANSIT. This object will have no effect for other travel modes.
        */
        transitOptions?: TransitOptions;
        /**
        * Type of routing requested. Required.
        */
        travelMode?: TravelMode;
        /**
        * Preferred unit system to use when displaying distance. Defaults to the unit system used in the country of origin.
        */
        unitSystem?: UnitSystem;
        /**
        * Array of intermediate waypoints. Directions will be calculated from the origin to the destination by way of each waypoint in this array. 
        * The maximum allowed waypoints is 8, plus the origin, and destination. Maps API for Business customers are allowed 23 waypoints, 
        * plus the origin, and destination. Waypoints are not supported for transit directions. Optional.
        */
        waypoints?: Array<DirectionsWaypoint>;
    }

    export enum TravelMode {
        /**
        * Specifies a bicycling directions request.
        */
        BICYCLING,
        /**
        * Specifies a driving directions request.
        */
        DRIVING,
        /**
        * Specifies a transit directions request.
        */
        TRANSIT,
        /**
        * Specifies a walking directions request.
        */
        WALKING
    }

    export enum UnitSystem {
        /**
        * Specifies that distances in the DirectionsResult should be expressed in imperial units.
        */
        IMPERIAL,
        /**
        * Specifies that distances in the DirectionsResult should be expressed in metric units.
        */
        METRIC
    }

    export interface TransitOptions {
        /**
        * The desired arrival time for the route, specified as a Date object. 
        * The Date object measures time in milliseconds since 1 January 1970. If arrival time is specified, departure time is ignored.
        */
        arrivalTime?: Date;
        /**
        * The desired departure time for the route, specified as a Date object. 
        * The Date object measures time in milliseconds since 1 January 1970. 
        * If neither departure time nor arrival time is specified, the time is assumed to be "now".
        */
        departureTime?: Date;
    }

    export interface DirectionsWaypoint {
        /**
        * Waypoint location. Can be an address string or LatLng. Optional.
        */
        location: any;
        /**
        * If true, indicates that this waypoint is a stop between the origin and destination. 
        * This has the effect of splitting the route into two. This value is true by default. Optional.
        */
        stopover: boolean;
    }

    export enum DirectionsStatus {
        /**
        * The DirectionsRequest provided was invalid.
        */
        INVALID_REQUEST,
        /**
        * Too many DirectionsWaypoints were provided in the DirectionsRequest. 
        * The total allowed waypoints is 8, plus the origin and destination. 
        * Maps API for Business customers are allowed 23 waypoints, plus the origin, and destination.
        */
        MAX_WAYPOINTS_EXCEEDED,
        /**
        * At least one of the origin, destination, or waypoints could not be geocoded.
        */
        NOT_FOUND,
        /**
        * The response contains a valid DirectionsResult.
        */
        OK,
        /**
        * The webpage has gone over the requests limit in too short a period of time.
        */
        OVER_QUERY_LIMIT,
        /**
        * The webpage is not allowed to use the directions service.
        */
        REQUEST_DENIED,
        /**
        * A directions request could not be processed due to a server error. The request may succeed if you try again.
        */
        UNKNOWN_ERROR,
        /**
        * No route could be found between the origin and destination.
        */
        ZERO_RESULTS
    }

    export interface DirectionsResult {
        /**
        * An array of DirectionsRoutes, each of which contains information about the legs and steps of which it is composed. 
        * There will only be one route unless the DirectionsRequest was made with provideRouteAlternatives set to true.
        */
        routes: Array<DirectionsRoute>;
    }

    export interface DirectionsRoute {
        /**
        * The bounds for this route.
        */
        bounds: LatLngBounds;
        /**
        * Copyrights text to be displayed for this route.
        */
        copyrights: string;
        /**
        * An array of DirectionsLegs, each of which contains information about the steps of which it is composed. 
        * There will be one leg for each waypoint or destination specified. 
        * So a route with no waypoints will contain one DirectionsLeg and a route with one waypoint will contain two.
        */
        legs: Array<DirectionsLeg>;
        /**
        * An array of LatLngs representing the entire course of this route. 
        * The path is simplified in order to make it suitable in contexts where a small number of vertices is required (such as Static Maps API URLs).
        */
        overview_path: Array<LatLng>;
        /**
        * Warnings to be displayed when showing these directions.
        */
        warnings: Array<string>;
        /**
        * If optimizeWaypoints was set to true, this field will contain the re-ordered permutation of the input waypoints. For example, if the input was:
        *   Origin: Los Angeles
        *   Waypoints: Dallas, Bangor, Phoenix
        *   Destination: New York
        * and the optimized output was ordered as follows:
        *   Origin: Los Angeles
        *   Waypoints: Phoenix, Dallas, Bangor
        *   Destination: New York
        * then this field will be an Array containing the values [2, 0, 1]. Note that the numbering of waypoints is zero-based.
        * If any of the input waypoints has stopover set to false, this field will be empty, since route optimization is not available for such queries.
        */
        waypoint_order: Array<number>;
    }

    export interface DirectionsLeg {
        /**
        * An estimated arrival time for this leg. Only applicable for TRANSIT requests.
        */
        arrival_time: Distance;
        /**
        * An estimated departure time for this leg. Only applicable for TRANSIT requests.
        */
        departure_time: Duration;
        /**
        * The total distance covered by this leg. This property may be undefined as the distance may be unknown.
        */
        distance: Distance;
        /**
        * The total duration of this leg. This property may be undefined as the duration may be unknown.
        */
        duration: Duration;
        /**
        * The total duration of this leg, taking into account current traffic conditions. 
        * This property may be undefined as the duration may be unknown. 
        * Only available to Maps API for Business customers when durationInTraffic is set to true when making the request.
        */
        duration_in_traffic: Duration;
        /**
        * The address of the destination of this leg.
        */
        end_address: string;
        /**
        * The DirectionsService calculates directions between locations by using the nearest transportation option (usually a road) 
        * at the start and end locations. end_location indicates the actual geocoded destination, which may be different than the end_location 
        * of the last step if, for example, the road is not near the destination of this leg.
        */
        end_location: LatLng;
        /**
        * The address of the origin of this leg.
        */
        start_address: string;
        /**
        * The DirectionsService calculates directions between locations by using the nearest transportation option (usually a road) 
        * at the start and end locations. start_location indicates the actual geocoded origin, which may be different than the start_location 
        * of the first step if, for example, the road is not near the origin of this leg.
        */
        start_location: LatLng;
        /**
        * An array of DirectionsSteps, each of which contains information about the individual steps in this leg.
        */
        steps: Array<DirectionsStep>;
        /**
        * An array of waypoints along this leg that were not specified in the original request, 
        * either as a result of a user dragging the polyline or selecting an alternate route.
        */
        via_waypoints: Array<LatLng>;
    }

    export interface DirectionsStep {
        /**
        * The distance covered by this step. This property may be undefined as the distance may be unknown.
        */
        distance: Distance;
        /**
        * The typical time required to perform this step in seconds and in text form. This property may be undefined as the duration may be unknown.
        */
        duration: Duration;
        /**
        * The ending location of this step.
        */
        end_location: LatLng;
        /**
        * Instructions for this step.
        */
        instructions: string;
        /**
        * A sequence of LatLngs describing the course of this step.
        */
        path: Array<LatLng>;
        /**
        * The starting location of this step.
        */
        start_location: LatLng;
        /**
        * Sub-steps of this step. Specified for non-transit sections of transit routes.
        */
        steps: DirectionsStep;
        /**
        * Transit-specific details about this step. This property will be undefined unless the travel mode of this step is TRANSIT.
        */
        transit: TransitDetails;
        /**
        * The mode of travel used in this step.
        */
        travel_mode: TravelMode;
    }

    export interface Distance {
        /**
        * A string representation of the distance value, using the UnitSystem specified in the request.
        */
        text: string;
        /**
        * The distance in meters.
        */
        value: number;
    }

    export interface Duration {
        /**
        * A string representation of the duration value.
        */
        text: string;
        /**
        * The duration in seconds.
        */
        value: number;
    }


} 