/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface calendar {
        /**
        * The calendar.cellColor option lets you customize the border of the calendar day squares:
        *     var options = {
        *       calendar: {
        *         cellColor: {
        *           stroke: 'red',      // Color the border of the squares.
        *           strokeOpacity: 0.5, // Make the borders half transparent.
        *           strokeWidth: 2      // ...and two pixels thick.
        *         }
        *       }
        *     };
        * -
        * Default: { stroke: '#fff', strokeOpacity: 1, strokeWidth: 1 }
        */
        cellColor?: cellColor;
        /**
        * The size of the calendar day squares:
        * var options = { calendar: { cellSize: 10 } };
        * -
        * Default: 16
        */
        cellSize?: number;
        /**
        * Controls the font style of the week labels at the top of the chart:
        *     var options = {
        *       calendar: {
        *         dayOfWeekLabel: {
        *           fontName: 'Times-Roman',
        *           fontSize: 12,
        *           color: 'black',
        *           bold: false,
        *           italic: false
        *         }
        *       }
        *     };
        * - 
        * Default: { fontName: 'sans-serif', color: '#888', bold: false, italic: false }
        */
        dayOfWeekLabel?: textStyle;
        /**
        * The distance between the right edge of the week labels and the left edge of the chart day squares.
        * -
        * Default: 4
        */
        dayOfWeekRightSpace?: number;
        /**
        * The single-letter labels to use for Sunday through Saturday.
        * -
        * Default: 'SMTWTFS'
        */
        daysOfWeek?: string;
        /**
        * When the user focuses (say, by hovering) over a day square, calendar charts will highlight the square.
        *     var options = {
        *       calendar:
        *         focusedCellColor: {
        *           stroke: 'red',
        *           strokeOpacity: 0.8,
        *           strokeWidth: 3
        *         }
        *       }
        *     };
        * -
        * Default: { stroke: '#000', strokeOpacity: 1, strokeWidth: 2 }
        */
        focusedCellColor?: cellColor;
        /**
        * Style for the month labels, e.g.:
        *     var options = {
        *       calendar: {
        *         monthLabel: {
        *           fontName: 'Times-Roman',
        *           fontSize: 16,
        *           color: 'green',
        *           bold: true,
        *           italic: false
        *         }
        *       }
        *     };
        * -
        * Default: { fontName: 'sans-serif', color: '#888', bold: false, italic: false }
        */
        monthLabel?: textStyle;
        /**
        * Months with data values are delineated from others using a border in this style.
        *     var options = {
        *       calendar: {
        *         monthOutlineColor: {
        *           stroke: 'blue',
        *           strokeOpacity: 0.8,
        *           strokeWidth: 2
        *         }
        *       }
        *     };
        * -
        * Default: { stroke: '#000', strokeOpacity: 1, strokeWidth: 1 }
        */
        monthOutlineColor?: cellColor;
        /**
        * The number of pixels between the bottom of the month labels and the top of the day squares:
        * var options = { calendar: { underMonthSpace: 12 } };
        * -
        * Default: 6
        */
        underMonthSpace?: number;
        /**
        * The number of pixels between the bottom-most year label and the bottom of the chart:
        * var options = { calendar: { underYearSpace: 2 } };
        * -
        * Default: 0
        */
        underYearSpace?: number;
        /**
        * Months without data values are delineated from others using a border in this style.
        *     var options = {
        *       calendar: {
        *         unusedMonthOutlineColor: {
        *           stroke: 'yellow',
        *           strokeOpacity: 0.8,
        *           strokeWidth: 2
        *         }
        *       }
        *     };
        *     
        * (Also see calendar.monthOutlineColor.)
        * -
        * Default: { stroke: '#c9c9c9', strokeOpacity: 1, strokeWidth: 1 }
        */
        unusedMonthOutlineColor?: cellColor;
    }

    export interface noDataPattern {
        /**
        * Replaces the default striped diagonal pattern background color
        */
        backgroundColor?: string;
        /**
        * Replaces the default striped diagonal pattern color
        */
        color?: string;
    }

    export interface CalendarOptions {
        /**
        * setting calendar options
        * calendar.cellColor customize the border of the calendar day squares
        * calendar.cellSize The size of the calendar day squares
        * calendar.dayOfWeekLabel Controls the font style of the week labels at the top of the chart
        * calendar.dayOfWeekRightSpace The distance between the right edge of the week labels and the left edge of the chart day squares
        * calendar.daysOfWeek The single-letter labels to use for Sunday through Saturday
        * calendar.focusedCellColor When the user focuses (say, by hovering) over a day square, calendar charts will highlight the square
        * calendar.monthLabel Style for the month labels
        * calendar.monthOutlineColor Months with data values are delineated from others using a border in this style
        * calendar.underMonthSpace The number of pixels between the bottom of the month labels and the top of the day squares
        * calendar.underYearSpace The number of pixels between the bottom-most year label and the bottom of the chart
        * calendar.unusedMonthOutlineColor Months without data values are delineated from others using a border in this style
        * .
        */
        calendar?: calendar;
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
        * Calendar charts use a striped diagonal pattern to indicate that there is no data for a particular day. Use the noDataPattern.backgroundColor and noDataPattern.color options to override the grayscale defaults, e.g.:
        *          noDataPattern: {
        *            backgroundColor: '#76a7fa',
        *            color: '#a0c3ff'
        *          }
        * -
        * Default: null
        */
        noDataPattern?: noDataPattern;
        /**
        * Width of the chart, in pixels.
        * -
        * Default: width of the containing element
        */
        width?: number;

    }

    export class CalendarChart {
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * A calendar chart is a visualization used to show activity over the course of a long span of time, such as months or years. 
        * They're best used when you want to illustrate how some quantity varies depending on the day of the week, or how it trends over time.
        * -
        * Note: JavaScript counts months starting at zero: January is 0, February is 1, and December is 11. If your calendar chart seems off by a month, this is why.
        * -
        * You can mouse over the individual days to see the underlying data values.
        * -
        * To create a calendar chart, load the calendar package and then create two columns, one for the dates and one for the values. 
        * (An optional third column for customized styling is coming in a future Google Charts release.)
        * -
        * The google.load package name is "calendar":
        * -
        *   google.load("visualization", "1", {packages: ["calendar"]});
        * -
        * The visualization's class name is google.visualization.Calendar:
        * -
        *   var visualization = new google.visualization.Calendar(container);
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataTable object holding all the data
        * @param options CalendarOptions holding all the non default setup
        */
        draw(data: DataTable, options?: CalendarOptions): void;
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataView object holding all the data
        * @param options CalendarOptions holding all the non default setup
        */
        draw(data: DataView, options?: CalendarOptions): void;
        /**
        * Returns an object containing the left, top, width, and height of chart element id. The format for id isn't yet documented (they're the return values of event handlers), but here are some examples:
        * -
        *  var cli = chart.getChartLayoutInterface();
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
        */
        getBoundingBox(id): boundingBox;
        /**
        * Standard getSelection() implementation. Selected elements are cell elements. Only one cell can be selected at a time by the user.
        * Returns: Array of selection elements
        */
        getSelection(): Array<any>;
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

        // ---------------------------------
        // events
        // ---------------------------------

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


}    