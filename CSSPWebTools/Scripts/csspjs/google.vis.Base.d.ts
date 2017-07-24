/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface viewWindow {
        /**
        * For a continuous axis:
        * The maximum horizontal/vertical data value to render.
        * For a discrete axis:
        * The zero-based row index where the cropping window ends. Data points at this index and higher will be cropped out. 
        * In conjunction with vAxis.viewWindowMode.min, it defines a half-opened range [min, max) that denotes the element indices to display. 
        * In other words, every index such that min <= index < max will be displayed.
        * Ignored when hAxis.viewWindowMode is 'pretty' or 'maximized'.
        * -
        * Default: auto
        */
        max?: number;
        /**
        * For a continuous axis:
        * The minimum horizontal/vertical data value to render.
        * For a discrete axis:
        * The zero-based row index where the cropping window begins. Data points at indices lower than this will be cropped out. 
        * In conjunction with vAxis.viewWindowMode.max, it defines a half-opened range [min, max) that denotes the element indices to display. 
        * In other words, every index such that min <= index < max will be displayed.
        * Ignored when hAxis.viewWindowMode is 'pretty' or 'maximized'.
        * -
        * Default: auto
        */
        min?: number;
    }

    export interface gridLines {
        /**
        * The color of the horizontal gridlines inside the chart area. Specify a valid HTML color string.
        * -
        * Default: '#CCC'
        */
        color?: string;
        /**
        * The number of horizontal gridlines inside the chart area. Minimum value is 2. Specify -1 to automatically compute the number of gridlines.
        * -
        * Default: 5
        */
        count?: number;
    }

    export interface minorGridlines {
        /**
        * The color of the horizontal minor gridlines inside the chart area. Specify a valid HTML color string.
        * -
        * Default: A blend of the gridline and background colors
        */
        color?: string;
        /**
        * The number of horizontal minor gridlines between two regular gridlines.
        * -
        * Default: 0
        */
        count?: number;
    }

    export interface tick {
        /**
        * @param v tick value
        * @param f containing the literal string to be displayed as the label.
        */
        constructor(v: any, f?: string);
    }

    export interface annotation {
        /**
        * An object to be applied to annotations for this series. This can be used to control, for instance, the textStyle for the series:
        * series: {
        *   0: {
        *     annotations: {
        *       textStyle: {fontSize: 12, color: 'red' }
        *     }
        *   }
        * }
        * See the various annotations options for a more complete list of what can be customized.
        */
    }

    export interface serie {
        /**
        * Text to display on the chart near the associated data point. The text displays without any user interaction. 
        * Annotations and annotation text can be assigned to both data points and categories (axis labels).
        * -
        * There are two styles of annotations: letter (default), which draws the annotation text near the specified point, and line, 
        * which draws the annotation text on a line that bisects the chart area. You can specify the line style by 
        * setting this chart option: annotation: {'column_id': {style: 'line'}}
        * -
        * Default: Empty string
        * -
        * Need to finish this ... not complete
        * https://developers.google.com/chart/interactive/docs/roles#annotationrole
        */
        annotations?: any; // annotation;
        /**
        * The color to use for this series. Specify a valid HTML color string.
        */
        color?: string;
        /**
        * Which axis to assign this series to, where 0 is the default axis, and 1 is the opposite axis. 
        * Default value is 0; set to 1 to define a chart where different series are rendered against different axes. 
        * At least one series much be allocated to the default axis. You can define a different scale for different axes.
        * - 
        * Default: 0
        */
        targetAxisIndex?: number;
        /**
        * Overrides the global pointSize value for this series.
        */
        pointSize?: number;
        /**
        * Overrides the global lineWidth value for this series.
        */
        lineWidth?: number;
        /**
        * Overrides the global areaOpacity for this series.
        */
        areaOpacity?: number;
        /**
        * A boolean value, where true means that the series should have a legend entry, and false means that it should not. Default is true.
        * -
        * Default: true
        */
        visibleInLegend?: boolean;
    }

    export interface trendline {
        /**
        * The color of the line
        */
        color?: string;
        /**
        * Label to be shown in legend
        */
        labelInLegend?: string;
        /**
        * Line width
        */
        lineWidth?: number;
        /**
        * Opacity of the line
        * -
        * Allowable value: 0.0 - 1.0
        */
        opacity?: number;
        /**
        * Type of line
        * -
        * Allowable value: 'linear', 'exponential'
        */
        type?: string;
        /**
        * Show label in legend
        */
        visibleInLegend?: boolean;
    }

    export interface focused {
        /**
        * crosshair color on focus
        */
        color?: string;
        /**
        * crosshair opacity on focus
        */
        opacity?: number;
    }

    export interface selected {
        /**
        * crosshair color on selection
        */
        color?: string;
        /**
        * crosshair opacity on selection
        */
        opacity?: number;
    }

    export interface crosshair {
        /**
        * crosshair color to color_string, e.g., 'red' or '#f00'
        * Default: default
        */
        color?: string;
        /**
        * crosshair opacity to opacity_number, with 0.0 being fully transparent and 1.0 fully opaque
        * Default: 1.0
        */
        opacity?: number;
        /**
        * crosshair color and opacity on focus
        * Default: default
        */
        focused?: focused;
        /**
        * display the orientation of the crosshair
        * -
        * 'both' display both horizontal and vertical hairs
        * 'horizontal' display horizontal hairs only
        * 'vertical' display vertical hairs only
        * Default: 'both'
        */
        orientation?: string;
        /**
        * crosshair color and opacity on selection
        * Default: default
        */
        selected?: selected;
        /**
        * display trigger of crosshair
        * -
        * 'both' display on both focus and selection
        * 'focus' display on focus only
        * 'selection' display on selection only
        * Default: 'both'
        */
        trigger?: string;
    }

    export interface boundingBox {
        left?: number;
        top?: number;
        width?: number;
        height?: number;
    }

    export interface explorer {
        /**
        * The Google Charts explorer supports three actions:
        * -
        * dragToPan: Drag to pan around the chart horizontally and vertically. To pan only along the horizontal axis, use explorer: { axis: 'horizontal' }. Similarly for the vertical axis.
        * -
        * dragToZoom: The explorer's default behavior is to zoom in and out when the user scrolls.
        * -
        * If explorer: { actions: ['dragToZoom', 'rightClickToReset'] } is used, dragging across a rectangular area zooms into that area.
        * -
        * We recommend using rightClickToReset whenever dragToZoom is used. See explorer.maxZoomIn, explorer.maxZoomOut, and explorer.zoomDelta for zoom customizations.
        * -
        * rightClickToReset: Right clicking on the chart returns it to the original pan and zoom level.
        * -
        * Default: ['dragToPan', 'rightClickToReset']
        */
        actions?: Array<string>;
        /**
        * By default, users can pan both horizontally and vertically when the explorer option is used. 
        * If you want the users to only pan horizontally, use explorer: { axis: 'horizontal' }. 
        * Similarly, explorer: { axis: 'vertical' } enables vertical-only panning.
        * -
        * 'both'
        * 'horizontal' users to only pan horizontally
        * 'vertical' users to only pan vertically
        * Default: 'both'
        */
        axis?: string;
        /**
        * By default, users can pan all around, regardless of where the data is. 
        * To ensure that users don't pan beyond the original chart, use explorer: { keepInBounds: true }.
        * -
        * Default: false
        */
        keepInBounds?: boolean;
        /**
        * The maximum that the explorer can zoom in. By default, users will be able to zoom in enough that they'll see only 25% of the original view. 
        * Setting explorer: { maxZoomIn: .5 } would let users zoom in only far enough to see half of the original view.
        * -
        * Default: 0.25
        */
        maxZoomIn?: number;
        /**
        * The maximum that the explorer can zoom out. By default, users will be able to zoom out far enough that 
        * the chart will take up only 1/4 of the available space. Setting explorer: { maxZoomOut: 8 } would let users zoom out 
        * far enough that the chart would take up only 1/8 of the available space.
        * -
        * Default: 4
        */
        maxZoomOut?: number;
        /**
        * When users zoom in or out, explorer.zoomDelta determines how much they zoom by. The smaller the number, the smoother and slower the zoom.
        * -
        * Default: 1.5
        */
        zoomDelta?: number;
    }

    export interface bar {
        /**
        * The width of a group of bars, specified in either of these formats:
        * Pixels (e.g. 50).
        * Percentage of the available width for each group (e.g. '20%'), where '100%' means that groups have no space between them.
        * -
        * Should be a number  or string  e.g. 50 (number), e.g. 50% (string)
        * Default: The golden ratio, approximately '61.8%'.
        */
        groupWidth?: any;
    }

    export interface bubble {
        /**
        * The opacity of the bubbles, where 0 is fully transparent and 1 is fully opaque.
        * -
        * Allowable Values 0.0 to 1.0
        * Default: 0.8
        */
        opacity?: number;
        /**
        * The color of the bubbles' stroke.
        * -
        * Default: '#ccc'
        */
        stroke?: string;
        /**
        * An object that specifies the bubble text style. The object has this format:
        * 
        *  {color: <string>, fontName: <string>, fontSize: <number>}
        * The color can be any HTML color string, for example: 'red' or '#00cc00'. Also see fontName and fontSize.
        * -
        * Default: {color: 'black', fontName: <global-font-name>, fontSize: <global-font-size>}
        */
        textStyle?: textStyle;
    }

    export interface candleColor {
        /**
        * The fill color as an HTML color string.
        */
        fill?: string;
        /**
        * The stroke color as an HTML color string.
        */
        stroke?: string;
        /**
        * The stroke width
        */
        strokeWidth?: number;
    }

    export interface candlestick {
        /**
        * If true, rising candles will appear hollow and falling candles will appear solid, otherwise, the opposite.
        * -
        * Default: false (will later be changed to true)
        */
        hollowIsRising?: boolean;
        /**
        * Setting properties of the falling candles
        */
        fallingColor?: candleColor;
        /**
        * Setting properties of the falling candles
        */
        risingColor?: candleColor;
    }


    export interface cellColor {
        /**
        * Color the border of the squares.
        * ex: 'red'
        */
        stroke?: string;
        /**
        * Transparency of the border
        * Allowable values: 0.0 to 1.0
        */
        strokeOpacity?: number;
        /**
        * Thickness of the border
        * ex: 2
        */
        strokeWidth?: number;
    }

    export interface filter {
        /**
        * Specifies the index of the column in the row to assess
        */
        column?: number;
        /**
        * Property with a value that must be matched exactly by the cell in the specified column. 
        * The value must be the same type as the column
        */
        value?: any;
        /**
        * A minimum value for the cell. The cell value in the specified column must be greater than or equal to this value.
        */
        minValue?: any;
        /**
        * A maximum value for the cell. The cell value in the specified column must be less than or equal to this value.
        */
        maxValue?: any;
    }

    export interface sortObj {
        /**
        * Contains the number of the column index to sort by, and an optional boolean property desc. 
        * If desc is set to true, the specific column will be sorted in descending order; otherwise, 
        * sorting is in ascending order. Examples: sortColumns({column: 3}) will sort by the 4th column, 
        * in ascending order; 
        * -
        * example: {column: 3, desc: true}) will sort by the 4th column, in descending order.
        */
        column?: number;
        /**
        * Contains the number of the column index to sort by, and an optional boolean property desc. 
        * If desc is set to true, the specific column will be sorted in descending order; otherwise, 
        * sorting is in ascending order. Examples: sortColumns({column: 3}) will sort by the 4th column, 
        * in ascending order; 
        * -
        * example: {column: 3, desc: true}) will sort by the 4th column, in descending order.
        */
        desc?: boolean;
    }

    export class GadgetHelper {
        /**
        * A helper class to simplify writing Gadgets that use the Google Visualization API.
        */
        constructor();
        /**
        * @param prefs - [google.visualization.Query] Static. Create a new instance of google.visualization.Query and set 
        *   its properties according to values from the gadget preferences. The type of parameter 
        *   prefs is _IG_Prefs 
        *       1.Preference _table_query_url is used to set the Query data source URL.
        *       2.Preference _table_query_refresh_interval is used to set the Query refresh interval (in seconds).
        */
        createQueryFromPrefs(prefs: any): Query;
        /**
        * @param response - Static. Parameter response is of type google.visualization.QueryResponse. Returns true 
        *   if the response contains data. Returns false if the query execution failed and the response does not 
        *   contain data. If an error occured, this method displays an error message. 
        */
        validateResponse(response: QueryResponse): boolean;
    }

    export interface errorsOptions {
        /**
        * A boolean value where true shows the detailed message only as tooltip text, 
        * and false shows the detailed message in the container body after the short message. Default value is true.
        */
        showInTooltip?: boolean;
        /**
        * A string describing the error type, which determines which css styles should be 
        * applied to this message. The supported values are 'error' and 'warning'. Default value is 'error'.
        */
        type?: string;
        /**
        * A style string for the error message. This style will override any styles applied to the warning type (opt_options.type). 
        * Example: 'background-color: #33ff99; padding: 2px;' Default value is an empty string.
        */
        style?: string;
        /**
        * A boolean value, where true means that the message can be closed by a mouse click from the user. Default value is false.
        */
        removable?: boolean;
    }

    export class errors {
        /**
        * The API provides several functions to help you display custom error messages to your users. 
        * To use these functions, provide a container element on the page (typically a <div>), into 
        * which the API will draw a formatted error message. This container can be either the visualization 
        * container element, or a container just for errors. If you specify the visualization container element, 
        * the error message will be displayed above the visualization. Then call the appropriate function 
        * below to show, or remove, the error message.
        * -
        * All functions are static functions in the namespace google.visualization.errors.
        *-
        * Many visualizations can throw an error event; see error event below to learn more about that.
        * -
        * Adds an error display block to the specified page element, with specified text and formatting.
        * -
        * @param container - The DOM element into which to insert the error message. If the container 
        *       cannot be found, the function will throw a JavaScript error.
        * @param  message - A string message to display.
        * @param  opt_detailedMessage - An optional detailed message string. By default, this is mouseover text, 
        *       but that can be changed in the opt_options.showInToolTip property described below.
        * @param  opt_options - An optional object with properties that set various display options for the message. 
        *       The following options are supported: 
        *       'showInTooltip' - A boolean value where true shows the detailed 
        *       message only as tooltip text, and false shows the detailed message in the container body after the 
        *       short message. Default value is true.
        *       'type' - A string describing the error type, which determines which css styles should be applied to 
        *       this message. The supported values are 'error' and 'warning'. Default value is 'error'.
        *       'style' - A style string for the error message. This style will override any styles applied to the 
        *       warning type (opt_options.type). Example: 'background-color: #33ff99; padding: 2px;' 
        *       Default value is an empty string.
        *       'removable' - A boolean value, where true means that the message can be closed by a mouse click 
        *       from the user. Default value is false.
        */
        static addError(container: HTMLElement, message: string, opt_detailedMessage?: string, opt_options?: errorsOptions): string; /* returns unique id */
        /**
        * Pass a query response and error message container to this method: if the query response indicates a query error, 
        * displays an error message in the specified page element. If the query response is null, the method will throw a 
        * JavaScript error. Pass your QueryResponse received in your query handler to this message to display an error. 
        * It will also set the style of the display appropriate to the type (error or warning, similar to addError(opt_options.type))
        * -
        * @param container - The DOM element into which to insert the error message. If the container cannot be found, the 
        * function will throw a JavaScript error.
        * @param response - A QueryResponse object received by your query handler in response to a query. If this is null, 
        * the method will throw a JavaScript error.
        **/
        static addErrorFromQueryResponse(container: HTMLElement, response: QueryResponse): string; /* returns unique id */
        /**
        * Removes the error specified by ID from the page.
        * -
        * @param id - The string ID of an error created using addError() or addErrorFromQueryResponse().
        */
        removeError(id: string): boolean; /* id is the unique id retured by addError... */
        /**
        * Removes all error blocks from a specified container. If the specified container does not exist, this will throw an error.
        * -
        * @param container - The DOM element holding the error strings to remove. If the container cannot be found, the function 
        * will throw a JavaScript error.
        */
        removeAll(container: HTMLElement): void;
        /**Retrieves a handle to the container element holding the error specified by errorID.
        * @param errorId - String ID of an error created using addError() or addErrorFromQueryResponse().
        */
        getContainer(errorId: string): string;
    }

    export class events {
        /**
        * Most visualizations fire events to indicate something has occured. As a user of the chart, you would often want to 
        * listen to these events. If you code your own visualization, you might also want to trigger such events on your own.
        * -
        * The following methods enable developers to listen to events, remove existing event handlers or trigger events from 
        * inside a visualization.
        * - google.visualization.events.addListener() and google.visualization.events.addOneTimeListener() listen for events.
        * - google.visualization.events.removeListener() removes an existing listener
        * - google.visualization.events.removeAllListeners() removes all listeners of a specific chart
        * - google.visualization.events.trigger() fires an event.
        * -
        * Call this method to register to receive events fired by a visualization hosted on your page. You should document 
        * what event arguments, if any, will be passed to the handling function.
        * Returns
        * A listener handler for the new listener. The handler can be used to later remove this listener if needed by calling 
        * google.visualization.events.removeListener().
        * @param source_visualization - A handle to the source visualization instance.
        * @param event_name - The string name of the event to listen for. A visualization should document which events it throws.
        * @param handling_function - The name of the local JavaScript function to call when source_visualization fires the event_name event. 
        * The handling function will be passed any event arguments as parameters.
        */
        static addListener(source_visualization: any, event_name: string, handling_function: Function): any;
        /**
        * This is identical to addListener(), but is intended for events that should only be listened to once. Subsequent throws 
        * of the event will not invoke the handling function.
        * -
        * An example of when this is useful: every draw causes a ready event to be thrown. If you want only the first ready to 
        * execute your code, you'll want addOneTimeListener rather than addListener.
        */
        static addOneTimeListener()
        /** 
        * Call this method to unregister an existing event listener.
        * @param listener_handler - The listener handler to remove, as returned by google.visualization.events.addListener().
        */
        static removeListener(listener_handler: any): void;
        /**
        * Call this method to unregister all event listeners of a specific visualization instance.
        * @param source_visualization - A handle to the source visualization instance from which all event listeners should be removed.
        */
        static removeAllListeners(source_visualization: any): void;
        /**
        * Called by visualization implementers. Call this method from your visualization to fire an event with an arbitrary name and set of values.
        * @param source_visualization -A handle to the source visualization instance. If you are calling this function from within a method defined 
        * by the sending visualization, you can simply pass in the this keyword.
        * @param event_name - A string name to call the event. You can choose any string value that you want.
        * @param event_args - [optional] A map of name/value pairs to pass to the receiving method. 
        * For example: {message: "Hello there!", score: 10, name: "Fred"}. 
        * You can pass null if no events are needed; the receiver should be prepared to accept null for this parameter.
        */
        static trigger(source_visualization: any, event_name: string, event_args?: any): void;
    }
}

 