/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface Map {
        /**
        * Displays a map using the Google Maps API. Data values are displayed as points on the map. Data values can be coordinates (Lat-Long pairs) or addresses.
        * -
        *  The google.load package name is "map"
        * -
        *   google.load("visualization", "1", {packages: ["map"]});
        * -
        * The visualization's class name is google.visualization.Map
        * -
        *   var visualization = new google.visualization.Map(container);
        * 
        * @param htmlElem an HTML Element
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the map.
        * -
        * @param data A DataTable object holding all the data
        * -
        * Two alternative data formats are supported:
        * 
        * Lat-Long pairs - The first two columns should be numbers designating the latitude and longitude, respectively. 
        *       An optional third column holds a string that describes the location specified in the first two columns.
        * String address - The first column should be a string that contains an address. 
        *       This address should be as complete as you can make it. 
        *       An optional second column holds a string that describes the location in the first column. 
        *       String addresses load more slowly, especially when you have more than 10 addresses.
        * -
        * data ex:
        * [
        *   ['Lat', 'Lon', 'Name'],
        *   [37.4232, -122.0853, 'Work'],
        *   [37.4289, -122.1697, 'University'],
        *   [37.6153, -122.3900, 'Airport'],
        *   [37.4422, -122.1731, 'Shopping']
        * ]
        * @param options MapOptions holding all the non default setup
        */
        draw(data: DataTable, options?: MapOptions): void;
        /**
        * Draws the map.
        * -
        * @param data A DataView object holding all the data
        * -
        * Two alternative data formats are supported:
        * 
        * Lat-Long pairs - The first two columns should be numbers designating the latitude and longitude, respectively. 
        *       An optional third column holds a string that describes the location specified in the first two columns.
        * String address - The first column should be a string that contains an address. 
        *       This address should be as complete as you can make it. 
        *       An optional second column holds a string that describes the location in the first column. 
        *       String addresses load more slowly, especially when you have more than 10 addresses.
        * -
        * data ex:
        * [
        *   ['Lat', 'Lon', 'Name'],
        *   [37.4232, -122.0853, 'Work'],
        *   [37.4289, -122.1697, 'University'],
        *   [37.6153, -122.3900, 'Airport'],
        *   [37.4422, -122.1731, 'Shopping']
        * ]
        * @param options MapOptions holding all the non default setup
        */
        draw(data: DataView, options?: MapOptions): void;
        /**
        * Standard getSelection() implementation. Selection elements are all row elements. Can return more than one selected row.
        * - 
        * Returns: Array of selection elements
        */
        getSelection(): Array<any>
        /**
        * Standard setSelection() implementation. Treats every selection entry as a row selection. Supports selection of multiple rows.
        */
        setSelection(selection): void;


        // ----------------------------------------------
        // Event
        // ----------------------------------------------

        /**
        * Fired when an error occurs when attempting to render the chart.
        * -
        * @param id
        * @param message
        */
        error(id: any, message: string);
        /**
        * Standard select event
        */	
        select();
    }

    export interface MapOptions {
        /**
        * If set to true, enables zooming in and out using the mouse scroll wheel.
        * -
        * Default: false
        */
        enableScrollWheel?: boolean;
        /**
        * If set to true, shows the location description as a tooltip when the mouse is positioned above a point marker.
        * -
        * Default: false
        */
        showTip?: boolean;
        /**
        * If set to true, shows a Google Maps polyline through all the points.
        * - 
        * Default: false
        */
        showLine?: boolean;
        /**
        * If showLine is true, defines the line color.For example: '#800000'.
        * - 
        * Default: default color
        */
        lineColor?: string;
        /**
        * If showLine is true, defines the line width (in pixels).
        * -
        * Default: 10
        */
        lineWidth?: number;
        /**
        * The type of map to show.Possible values are 'normal', 'terrain', 'satellite' or 'hybrid'.
        * -
        * Default: 'hybrid'
        */
        mapType?: string;
        /**
        * Show a map type selector that enables the viewer to switch between[map, satellite, hybrid, terrain].
        * When useMapTypeControl is false (default) no selector is presented and the type is determined by the mapType option.
        * - 
        * Default: false
        */
        useMapTypeControl?: boolean;
        /**
        * An integer indicating the initial zoom level of the map, where 0 is completely zoomed out(whole world) and 19 is the maximum zoom level.(See "Zoom Levels" in the Google Maps API.)
        * -
        * Default: automatic
        */
        zoomLevel?: number;
    }
}           