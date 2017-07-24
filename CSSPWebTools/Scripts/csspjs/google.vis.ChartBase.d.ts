/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface backgroundColor {
        /**
        * The background color for the main area of the chart. Can be either a simple HTML color string, 
        * for example: 'red' or '#00cc00', or an object with the following properties.
        * stroke The color of the chart border, as an HTML color string.
        * strokeWidth The border width, in pixels.
        * fill The chart fill color, as an HTML color string.
        */
        constructor(val: string);
        /**
        * The background color for the main area of the chart. Can be either a simple HTML color string, 
        * for example: 'red' or '#00cc00', or an object with the following properties.
        * stroke The color of the chart border, as an HTML color string.
        * strokeWidth The border width, in pixels.
        * fill The chart fill color, as an HTML color string.
        */
        constructor(obj: backgroundColor);
        /**
        * The color of the chart border, as an HTML color string.
        * for example: 'red' or '#00cc00'
        * Default: '#666'
        */
        stroke?: string;
        /**
        * The border width, in pixels.
        * Default: 0
        */
        strokeWidth?: number;
        /**
        * The chart fill color, as an HTML color string.
        * Default: 'white'
        */
        strokeFill?: string;
    }

    export interface chartArea {
        /**
        * Two formats are supported: a number, or a number followed by %. 
        * A simple number is a value in pixels; a number followed by % is a percentage. 
        * Example: chartArea:{left:20,top:0,width:"50%",height:"75%"}
        * -
        * How far to draw the chart from the left border.
        * Default: auto
        */
        left?: any;
        /**
        * Two formats are supported: a number, or a number followed by %. 
        * A simple number is a value in pixels; a number followed by % is a percentage. 
        * Example: chartArea:{left:20,top:0,width:"50%",height:"75%"}
        * -
        * How far to draw the chart from the top border.
        * Default: auto
        */
        top?: number;
        /**
        * Two formats are supported: a number, or a number followed by %. 
        * A simple number is a value in pixels; a number followed by % is a percentage. 
        * Example: chartArea:{left:20,top:0,width:"50%",height:"75%"}
        * -
        * Chart area width.
        * Default: auto
        */
        width?: number;
        /**
        * Two formats are supported: a number, or a number followed by %. 
        * A simple number is a value in pixels; a number followed by % is a percentage. 
        * Example: chartArea:{left:20,top:0,width:"50%",height:"75%"}
        * -
        * Chart area width.
        * Default: auto
        */
        height?: number;
    }

    export interface chartLayoutInterface {
        /**
        * Returns an object containing the left, top, width, and height of chart element id. The format for id isn't yet documented (they're the return values of event handlers), but here are some examples:
        * -
        * var cli = chart.getChartLayoutInterface();
        * -
        * Height of the chart area
        * cli.getBoundingBox('chartarea').height
        * Width of the third bar in the first series of a bar or column chart
        * cli.getBoundingBox('bar#0#2').width
        * Bounding box of the fifth wedge of a pie chart
        * cli.getBoundingBox('slice#4')
        * Bounding box of the chart data of a vertical (e.g., column) chart:
        * cli.getBoundingBox('vAxis#0#gridline')
        * Bounding box of the chart data of a horizontal (e.g., bar) chart:
        * cli.getBoundingBox('hAxis#0#gridline')
        * Values are relative to the container of the chart. Call this after the chart is drawn.
        * -
        * @param id string identifying which bounding box to return
        */
        getBoundingBox(): boundingBox;
        /**
        * Returns an object containing the left, top, width, and height of the chart content (i.e., excluding labels and legend):
        * -
        * var cli = chart.getChartLayoutInterface();
        * -
        *cli.getChartAreaBoundingBox().left
        *cli.getChartAreaBoundingBox().top
        *cli.getChartAreaBoundingBox().height
        *cli.getChartAreaBoundingBox().width
        *Values are relative to the container of the chart. Call this after the chart is drawn.
        */
        getChartAreaBoundingBox(): boundingBox;
        /**
        * Returns the logical horizontal value at position, which is an offset from the chart container's left edge. Can be negative.
        * -
        * Example: chart.getChartLayoutInterface().getHAxisValue(400).
        * -
        * Call this after the chart is drawn.
        * @param position 
        * @param optional_axis_index
        */
        getHAxisValue(position: number, optional_axis_index, number): number;
        /**
        * Returns the logical vertical value at position, which is an offset from the chart container's top edge. Can be negative.
        * -
        * Example: chart.getChartLayoutInterface().getVAxisValue(300).
        * -
        * Call this after the chart is drawn.
        */
        getVAxisValue(position: number, optional_axis_index, number): number;
        /**
        * Returns the screen x-coordinate of position relative to the chart's container.
        * -
        * Example: chart.getChartLayoutInterface().getXLocation(400).
        * -
        * Call this after the chart is drawn.
        */
        getXLocation(position: number, optional_axis_index, number): number;
        /**
        * Returns the screen y-coordinate of position relative to the chart's container.
        * -
        * Example: chart.getChartLayoutInterface().getYLocation(300).
        * -
        * Call this after the chart is drawn.
        */
        getYLocation(position: number, optional_axis_index, number): number;
    }

    export interface ChartOptions {
        /**
        * The background color for the main area of the chart. Can be either a simple HTML color string, 
        * for example: 'red' or '#00cc00', or an object with the following properties.
        * Default: 'white'
        */
        backgroundColor?: backgroundColor;
        /**
        * An object with members to configure the placement and size of the chart area (where the chart itself is drawn, excluding axis and legends). 
        * Two formats are supported: a number, or a number followed by %. A simple number is a value in pixels; 
        * a number followed by % is a percentage. Example: chartArea:{left:20,top:0,width:"50%",height:"75%"}
        * Default: null
        */
        chartArea?: chartArea;
        /**
        * The colors to use for the chart elements. An array of strings, where each element is an HTML color string, 
        * for example: colors:['red','#004411'].
        * -
        * Default: default colors
        */
        colors?: Array<string>;
        /**
        * Whether the chart throws user-based events or reacts to user interaction. 
        * If false, the chart will not throw 'select' or other interaction-based events (but will throw ready or error events), 
        * and will not display hovertext or otherwise change depending on user input.
        * Default: true
        */
        enableInteractivity?: boolean;
        /**
        * The type of the entity that receives focus on mouse hover. Also affects which entity is selected by mouse click, and which data table element is associated with events. Can be one of the following:
        * -
        * 'datum' - Focus on a single data point. Correlates to a cell in the data table.
        * 'category' - Focus on a grouping of all data points along the major axis. Correlates to a row in the data table.
        * In focusTarget 'category' the tooltip displays all the category values. This may be useful for comparing values of different series.
        * -
        * Default: 'datum' 
        */
        focusTarget?: string;
        /**
        * The default font size, in pixels, of all text in the chart. You can override this using properties for specific chart elements.
        * -
        * Default: automatic
        */
        fontSize?: number;
        /**
        * The default font face for all text in the chart. You can override this using properties for specific chart elements.
        * -
        * Default: 'Arial'
        */
        fontName?: string;
        /**
        * Height of the chart, in pixels.
        * -
        * Default: height of the containing element
        */
        height?: number;
        /**
        * An object with members to configure various aspects of the legend. To specify properties of this object, you can use object literal notation, as shown here:
        * -
        * {position: 'top', textStyle: {color: 'blue', fontSize: 16}}
        * -
        * Default: null
        */
        legend?: legend;
        /**
        * Text to display above the chart.
        * -
        * Default: no title
        */
        title?: string;
        /**
        * An object that specifies the title text style. The object has this format:
        * -
        * { color: <string>,
        *   fontName: <string>,
        *   fontSize: <number>,
        *   bold: <boolean>,
        *   italic: <boolean> }
        * The color can be any HTML color string, for example: 'red' or '#00cc00'. Also see fontName and fontSize.
        * -
        * Default: {color: 'black', fontName: <global-font-name>, fontSize: <global-font-size>}
        */
        titleTextStyle?: textStyle;
        /**
        * An object with members to configure various tooltip elements. To specify properties of this object, you can use object literal notation, as shown here:
        * -
        * {textStyle: {color: '#FF0000'}, showColorCode: true}
        * - 
        * Default: null
        */
        tooltip?: tooltip;
        /**
        * Width of the chart, in pixels.
        * -
        * Default: width of the containing element
        */
        width?: number;
    }

    export class Chart {
        /**
        * Returns an object containing the left, top, width, and height of chart element id. The format for id isn't yet documented (they're the return values of event handlers), but here are some examples:
        * -
        * var cli = chart.getChartLayoutInterface();
        * -
        * Height of the chart area
        * cli.getBoundingBox('chartarea').height
        * Width of the third bar in the first series of a bar or column chart
        * cli.getBoundingBox('bar#0#2').width
        * Bounding box of the fifth wedge of a pie chart
        * cli.getBoundingBox('slice#4')
        * Bounding box of the chart data of a vertical (e.g., column) chart:
        * cli.getBoundingBox('vAxis#0#gridline')
        * Bounding box of the chart data of a horizontal (e.g., bar) chart:
        * cli.getBoundingBox('hAxis#0#gridline')
        * Values are relative to the container of the chart. Call this after the chart is drawn.
        * -
        * @param id string identifying which bounding box to return
        */
        getBoundingBox(id: string): boundingBox;
        /**
        * Returns an object containing the left, top, width, and height of the chart content (i.e., excluding labels and legend):
        * -
        * var cli = chart.getChartLayoutInterface();
        * -
        *cli.getChartAreaBoundingBox().left
        *cli.getChartAreaBoundingBox().top
        *cli.getChartAreaBoundingBox().height
        *cli.getChartAreaBoundingBox().width
        *Values are relative to the container of the chart. Call this after the chart is drawn.
        */
        getChartAreaBoundingBox(): boundingBox;
        /**
        * Returns an object containing information about the onscreen placement of the chart and its elements.
        * -
        * The following methods can be called on the returned object:
        * getBoundingBox
        * getChartAreaBoundingBox
        * getHAxisValue
        * getVAxisValue
        * getXLocation
        * getYLocation
        * Call this after the chart is drawn.
        */
        getChartLayoutInterface(): chartLayoutInterface;
        /**
        * Returns the logical horizontal value at position, which is an offset from the chart container's left edge. Can be negative.
        * -
        * Example: chart.getChartLayoutInterface().getHAxisValue(400).
        * -
        * Call this after the chart is drawn.
        * @param position 
        * @param optional_axis_index
        */
        getHAxisValue(position: number, optional_axis_index, number): number;
        /**
        * Returns the chart serialized as an image URI.
        * -
        * Call this after the chart is drawn.
        * -
        * See Printing PNG Charts.
        */
        getImageURI(): string;
        /**
        * selection elements	 Returns an array of the selected chart entities. Selectable entities are points, annotations, legend entries and categories. 
        * A point or annotation correlates to a cell in the data table, a legend entry to a column (row index is null), and a category to a row (column index is null). 
        * For this chart, only one entity can be selected at any given moment. Extended description.
        */
        getSelection(): Array<any>;
        /**
        * Returns the logical vertical value at position, which is an offset from the chart container's top edge. Can be negative.
        * -
        * Example: chart.getChartLayoutInterface().getVAxisValue(300).
        * -
        * Call this after the chart is drawn.
        */
        getVAxisValue(position: number, optional_axis_index, number): number;
        /**
        * Returns the screen x-coordinate of position relative to the chart's container.
        * -
        * Example: chart.getChartLayoutInterface().getXLocation(400).
        * -
        * Call this after the chart is drawn.
        */
        getXLocation(position: number, optional_axis_index, number): number;
        /**
        * Returns the screen y-coordinate of position relative to the chart's container.
        * -
        * Example: chart.getChartLayoutInterface().getYLocation(300).
        * -
        * Call this after the chart is drawn.
        */
        getYLocation(position: number, optional_axis_index, number): number;
        /**
        * Selects the specified chart entities. Cancels any previous selection. Selectable entities are points, annotations, legend entries and categories. 
        * A point or annotation correlates to a cell in the data table, a legend entry to a column (row index is null), 
        * and a category to a row (column index is null). For this chart, only one entity can be selected at a time. Extended description.
        */
        setSelection(): void;
        /**
        * Clears the chart, and releases all of its allocated resources.
        */
        clearChart(): void;

        // ------------------------------------------------------------------
        // events
        // ------------------------------------------------------------------

        /**
        * Fired when transition animation is complete.
        */
        animationfinish();
        /**
        * Fired when an error occurs when attempting to render the chart.
        * -
        * @param id 
        * @param message
        */
        error(id: string, message: string);
        /**
        * Fired when the user mouses over a visual entity. Passes back the row and column indices of the corresponding data table element. 
        * A point or annotation correlates to a cell in the data table, a legend entry to a column (row index is null), and a category to a row (column index is null).
        * -
        * @param row
        * @param column
        */
        onmouseover(row: number, column: number);
        /**
        * Fired when the user mouses away from a visual entity. Passes back the row and column indices of the corresponding data table element. 
        * A point or annotation correlates to a cell in the data table, a legend entry to a column (row index is null), and a category to a row (column index is null).
        * -
        * @param row
        * @param column
        */
        onmouseout(row: number, column: number);
        /**
        * The chart is ready for external method calls. If you want to interact with the chart, and call methods after you draw it, 
        * you should set up a listener for this event before you call the draw method, and call them only after the event was fired.
        */
        ready();
        /**
        * Fired when the user clicks a visual entity. To learn what has been selected, call getSelection().
        */
        select();
    }

    export interface legend {
        /**
        * Alignment of the legend. Can be one of the following:
        * 'start' - Aligned to the start of the area allocated for the legend.
        * 'center' - Centered in the area allocated for the legend.
        * 'end' - Aligned to the end of the area allocated for the legend.
        * Start, center, and end are relative to the style -- vertical or horizontal -- of the legend. For example, in a 'right' legend, 'start' and 'end' are at the top and bottom, respectively; for a 'top' legend, 'start' and 'end' would be at the left and right of the area, respectively.
        * -
        * The default value depends on the legend's position. For 'bottom' legends, the default is 'center'; other legends default to 'start'.
        * -
        * Default: automatic
        */
        alignment?: string;
        /**
        * Maximum number of lines in the legend. Set this to a number greater than one to add lines to your legend. Note: The exact logic used to determine the actual number of lines rendered is still in flux.
        * -
        * This option currently works only when legend.position is 'top'.
        * -
        * Default: 1
        */
        maxLines?: number;
        /**
        * Position of the legend. Can be one of the following:
        * 'bottom' - Below the chart.
        * 'left' - To the left of the chart, provided the left axis has no series associated with it. So if you want the legend on the left, use the option targetAxisIndex: 1.
        * 'in' - Inside the chart, by the top left corner.
        * 'none' - No legend is displayed.
        * 'right' - To the right of the chart. Incompatible with the vAxes option.
        * 'top' - Above the chart.
        * -
        * Default: 'right'
        */
        position?: string;
        /**
        * An object that specifies the legend text style. The object has this format:
        * -
        * { color: <string>,
        *   fontName: <string>,
        *   fontSize: <number>,
        *   bold: <boolean>,
        *   italic: <boolean> }
        * The color can be any HTML color string, for example: 'red' or '#00cc00'. Also see fontName and fontSize.
        * -
        * Default: {color: 'black', fontName: <global-font-name>, fontSize: <global-font-size>}
        */
        textStyle?: textStyle;
    }

    export interface tooltip {
        /**
        * If set to true, use HTML-rendered (rather than SVG-rendered) tooltips. See Customizing Tooltip Content for more details.
        * -
        * Default: false
        */
        isHtml?: boolean;
        /**
        * If true, show colored squares next to the series information in the tooltip. 
        * The default is true when focusTarget is set to 'category', otherwise the default is false.
        * -
        * Default: automatic
        */
        showColorCode?: boolean;
        /**
        * An object that specifies the tooltip text style. The object has this format:
        * -
        * { color: <string>,
        *   fontName: <string>,
        *   fontSize: <number>,
        *   bold: <boolean>,
        *   italic: <boolean> }
        * The color can be any HTML color string, for example: 'red' or '#00cc00'. Also see fontName and fontSize.
        * -
        * Default: {color: 'black', fontName: <global-font-name>, fontSize: <global-font-size>}
        */
        textStyle?: textStyle;
        /**
        * The user interaction that causes the tooltip to be displayed:
        * -
        * 'focus' - The tooltip will be displayed when the user hovers over an element.
        * 'none' - The tooltip will not be displayed.
        * -
        * Default: 'focus'
        */
        trigger?: string;
    }


} 