/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface TimelineOptions {
        /**
        * Whether display elements (e.g., the bars in a timeline) should obscure grid lines. If false, grid lines may be covered completely by display elements. If true, display elements may be altered to keep grid lines visible.
        * - 
        * Default: true
        */
        avoidOverlappingGridLines?: boolean;
        /**
        * The background color for the main area of the chart. Can be either a simple HTML color string, for example: 'red' or '#00cc00', or an object with the following properties.
        * -
        * Default: 'white'
        */
        backgroundColor?: string;
        /**
        * The colors to use for the chart elements. An array of strings, where each element is an HTML color string, for example: colors:['red','#004411'].
        * -
        * Default: default colors
        */
        colors?: string;
        /**
        * Whether the chart throws user-based events or reacts to user interaction. 
        * If false, the chart will not throw 'select' or other interaction-based events (but will throw ready or error events), 
        * and will not display hovertext or otherwise change depending on user input.
        * Default: true
        */
        enableInteractivity?: boolean;
        /**
        * Draws the chart inside an inline frame. (Note that on IE8, this option is ignored; all IE8 charts are drawn in i-frames.)
        * -
        * Default: false
        */
        forceIFrame?: boolean;
        /**
        * Height of the chart, in pixels.
        * -
        * Default: height of the containing element
        */
        height?: number;
        /**
        * A timeline obj is of type:
        * -
        * barLabelStyle?: textStyle
        * colorByRowLabel?: boolean
        * groupByRowLabel?: boolean
        * rowLabelStyle?: textStyle
        * showRowLabels?: boolean
        * singleColor?: string
        */
        timeline?: timeline;
        /**
        * Width of the chart, in pixels.
        * -
        * Default: width of the containing element
        */
        width?: number;
    }

    export class Timeline {
        /**
        * A timeline is a chart that depicts how a set of resources are used over time. If you're managing a software project and want to illustrate who is doing what and when, or if you're organizing a conference and need to schedule meeting rooms, a timeline is often a reasonable visualization choice. One popular type of timeline is the Gantt chart.
        * -
        * Hovering over a bar brings up a tooltip with more detailed information.
        * -
        * After loading the timeline package and defining a callback to draw the chart when the page is rendered, the drawChart() method instantiates a google.visualization.Timeline() and then fills a dataTable with one row for each president.
        * -
        * Inside the dataTable, the first column is the president's name, and the second and third columns are the start and end times. These have the JavaScript Date type, but they could also be plain numbers.
        * -
        * Finally, we invoke the draw() method of the chart, which displays it inside a div with the same identifier (example1) used when container was declared in the first line of drawChart().
        * google.load("visualization", "1", {packages: ["corechart"]});
        * -
        * var visualization = new google.visualization.ComboChart(container);
        * -
        * The google.load package name is timeline:
        * -
        *   google.load("visualization", "1", {packages: ["timeline"]});
        * The visualization's class name is google.visualization.Timeline:
        * -
        *   var visualization = new google.visualization.Timeline(container);
        * @param htmlElem an HTML Element
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * data ex:
        * -
        * [
        *     [ 'Washington', 'George Washington', new Date(1789, 3, 29), new Date(1797, 2, 3) ],
        *     [ 'Adams',      'John Adams',        new Date(1797, 2, 3),  new Date(1801, 2, 3) ],
        *     [ 'Jefferson',  'Thomas Jefferson',  new Date(1801, 2, 3),  new Date(1809, 2, 3) ]
        * ]
        * -
        * @param data A DataTable object holding all the data
        * @param options TimelineOptions holding all the non default setup
        */
        draw(data: DataTable, options?: TimelineOptions): void;
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * data ex:
        * -
        * [
        *     [ 'Washington', 'George Washington', new Date(1789, 3, 29), new Date(1797, 2, 3) ],
        *     [ 'Adams',      'John Adams',        new Date(1797, 2, 3),  new Date(1801, 2, 3) ],
        *     [ 'Jefferson',  'Thomas Jefferson',  new Date(1801, 2, 3),  new Date(1809, 2, 3) ]
        * ]
        * -
        * @param data A DataView object holding all the data
        * @param options TimelineOptions holding all the non default setup
        */
        draw(data: DataView, options?: TimelineOptions): void;
        /**
        * Clears the chart, and releases all of its allocated resources.
        */
        clearChart(): void;

        // --------------------------------------------
        // events
        // --------------------------------------------

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
    }

    export interface timeline {
        /**
        * An object that specifies the bar label text style. It has this format:
        * {color: <string>, fontName: <string>, fontSize: <string>}
        * 
        * The color can be any HTML color string, for example 'red' or '#00cc00' Also see fontName and fontSize in this table.
        * -
        * Default: null
        */
        barLabelStyle?: textStyle;
        /**
        * If set to true, colors every bar on the row the same. The default is to use one color per bar label.
        * - 
        * Default: false
        */
        colorByRowLabel?: boolean;
        /**
        * If set to false, creates one row for every dataTable entry. The default is to collect bars with the same row label into one row.
        * -
        * Default: true
        */
        groupByRowLabel?: boolean;
        /**
        * An object that specifies the row label text style. It has this format:
        * {color: <string>, fontName: <string>, fontSize: <string>}
        * 
        * The color can be any HTML color string, for example 'red' or '#00cc00' Also see fontName and fontSize in this table.
        * - 
        * Default: null
        */
        rowLabelStyle?: textStyle;
        /**
        * If set to false, omits row labels. The default is to show them.
        * -
        * Default: true
        */
        showRowLabels?: boolean;
        /**
        * Colors all bars the same. Specified as a hex value (e.g., '#8d8').
        * -
        * Default: null
        */
        singleColor?: string;
    }


}                  