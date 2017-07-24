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

    export class FusionTablesLayer extends MVCObject {
        /**
        * A FusionTablesLayer allows you to display data from a Google Fusion Table on a map, as a rendered layer. 
        * (See https://developers.google.com/fusiontables/ for more information about Fusion Tables).
        * -
        * A layer that displays data from a Fusion Table.
        */
        constructor(options: FusionTablesLayerOptions);
        /**
        * Returns the map on which this layer is displayed.
        */
        getMap(): Map;
        /**
        * Renders the layer on the specified map. If map is set to null, the layer will be removed.
        */
        setMap(map: Map): void;
        /**
        * Sets FusionTablesLayer options
        */
        setOptions(options: FusionTablesLayerOptions): void;

        // ----------------------------------------------------------
        // Event
        // ----------------------------------------------------------

        /**
        * This event is fired when a feature in the layer is clicked.
        */
        click(fusionTablesMouseEvent: FusionTablesMouseEvent);
    }

    export interface FusionTablesLayerOptions {
        /**
        * If true, the layer receives mouse events. Default value is true.
        */
        clickable?: boolean;
        /**
        * Options which define the appearance of the layer as a heatmap.
        */
        heatmap?: FusionTablesHeatmap;
        /**
        * The map on which to display the layer.
        */
        map?: Map;
        /**
        * Options defining the data to display.
        */
        query?: FusionTablesQuery;
        /**
        * An array of up to 5 style specifications, which control the appearance of features within the layer.
        */
        styles?: Array<FusionTablesStyle>;
        /**
        * Suppress the rendering of info windows when layer features are clicked.
        */
        suppressInfoWindows?: boolean;
    }

    export interface FusionTablesQuery {
        /**
        * The ID of the Fusion Tables table to display. This ID can be found in the table's URL, as the value of the dsrcid parameter. Required.
        */
        from?: string;
        /**
        * Limit on the number of results returned by the query.
        */
        limit?: number;
        /**
        * Offset into the sorted results.
        */
        offset?: number;
        /**
        * The method by which to sort the results. Accepts either of:
        * A column name. The column name may be suffixed with ASC or DESC (e.g. col2 DESC) to specify ascending or descending sort.
        * An ST_DISTANCE spatial relationship (sort by distance). A column and the coordinate from which to calculate distance 
        * must be passed, for example, orderBy: 'ST_DISTANCE(col1, LATLNG(1.2, 3.4))'.
        */
        orderBy?: string;
        /**
        * A column, containing geographic features to be displayed on the map. 
        * See Fusion Tables Setup in the Maps API doc for information about valid columns.
        */
        select?: string;
        /**
        * The SQL predicate to be applied to the layer.
        */
        where?: string;
    }

    export interface FusionTablesStyle {
        /**
        * Options which control the appearance of point features.
        */
        markerOptions?: FusionTablesMarkerOptions;
        /**
        * Options which control the appearance of polygons.
        */
        polygonOptions?: FusionTablesPolygonOptions;
        /**
        * Options which control the appearance of polylines.
        */
        polylineOptions?: FusionTablesPolylineOptions;
        /**
        * The SQL predicate to be applied to the layer.
        */
        where?: string;
    }

    export interface FusionTablesHeatmap {
        /**
        * If true, render the layer as a heatmap.
        */
        enabled: boolean;
    }

    export interface FusionTablesMarkerOptions {
        /**
        *  The name of a Fusion Tables supported icon
        */
        iconName: string;
    }

    export interface FusionTablesPolygonOptions {
        /**
        * The fill color, defined by a six-digit hexadecimal number in RRGGBB format (e.g. #00AAFF).
        */
        fillColor?: string;
        /**
        * The fill opacity between 0.0 and 1.0.
        */
        fillOpacity?: number;
        /**
        * The fill color, defined by a six-digit hexadecimal number in RRGGBB format (e.g. #00AAFF).
        */
        strokeColor?: string;
        /**
        * The stroke opacity between 0.0 and 1.0.
        */
        strokeOpacity?: number;
        /**
        * The stroke width in pixels, between 0 and 10.
        */
        strokeWeight?: number;
    }

    export interface FusionTablesPolylineOptions {
        /**
        * The fill color, defined by a six-digit hexadecimal number in RRGGBB format (e.g. #00AAFF).
        */
        strokeColor?: string;
        /**
        * The stroke opacity between 0.0 and 1.0.
        */
        strokeOpacity?: number;
        /**
        * The stroke width in pixels.
        */
        strokeWeight?: number;
    }

    export interface FusionTablesMouseEvent {
        /**
        * Pre-rendered HTML content, as placed in the infowindow by the default UI.
        */
        infoWindowHtml: string;
        /**
        * The position at which to anchor an infowindow on the clicked feature.
        */
        latLng: LatLng;
        /**
        * The offset to apply to an infowindow anchored on the clicked feature.
        */
        pixelOffset: Size;
        /**
        * A collection of FusionTablesCell objects, indexed by column name, representing the contents of the table row which included the clicked feature.
        */
        row: Object;
    }

    export interface FusionTablesCell {
        /**
        * The name of the column in which the cell was located.
        */
        columnName: string;
        /**
        * The contents of the cell.
        */
        value: string;
    }


} 