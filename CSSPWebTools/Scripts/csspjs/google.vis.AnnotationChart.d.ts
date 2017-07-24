/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface AnnotationChartOptions {
        /**
        * If set to true, any annotation text that includes HTML tags will be rendered as HTML.
        * Default: false
        */
        allowHtml?: boolean;
        /**
        * A suffix to be added to all values in the legend and tick labels in the vertical axes.
        * Default: none
        */
        allValuesSuffix?: string;
        /**
        * The width (in percent) of the annotations area, out of the entire chart area. Must be a number in the range 5-80.
        * Default: 25
        */
        annotationsWidth?: number;
        /**
        * The colors to use for the chart lines and labels. An array of strings. Each element is a string in a valid HTML color format. For example 'red' or '#00cc00'.
        * Default: Default colors
        */
        colors?: Array<string>;
        /**
        * The format used to display the date information in the top right corner. The format of this field is as specified by the java SimpleDateFormat class.
        * Default: Either 'MMMM dd, yyyy' or 'HH:mm MMMM dd, yyyy', depending on the type of the first column (date, or datetime, respectively).
        */
        dateFormat?: string;
        /**
        * If set to true, the chart will show annotations on top of selected values. When this option is set to true, after every numeric column, 
        * two optional annotation string columns can be added, one for the annotation title and one for the annotation text.
        * Default: false
        */
        displayAnnotations?: boolean;
        /**
        * If set to true, the chart will display a filter contol to filter annotations. Use this option when there are many annotations.
        * Default: false
        */
        displayAnnotationsFilter?: boolean;
        /**
        * Whether to display a small bar separator ( | ) between the series values and the date in the legend, where true means yes.
        * Default: true
        */
        displayDateBarSeparator?: boolean;
        /**
        * Whether to display a shortened, rounded version of the values on the top of the graph, to save space; 
        * false indicates that it may. For example, if set to false, 56123.45 might be displayed as 56.12k.
        * Default: false
        */
        displayExactValues?: boolean;
        /**
        * Whether to display dots next to the values in the legend text, where true means yes.
        * Default: true
        */
        displayLegendDots?: boolean;
        /**
        * Whether to display the highlighted values in the legend, where true means yes.
        * Default: true
        */
        displayLegendValues?: boolean;
        /**
        * Whether to show the zoom range selection area (the area at the bottom of the chart), where false means no.
        * The outline in the zoom selector is a log scale version of the first series in the chart, scaled to fit the height of the zoom selector.
        * Default: true
        */
        displayRangeSelector?: boolean;
        /**
        * Whether to show the zoom buttons ("1d 5d 1m" and so on), where false means no.
        */
        displayZoomButtons?: string;
        /**
        * A number from 0—100 (inclusive) specifying the alpha of the fill below each line in the line graph. 
        * 100 means 100% opaque, and 0 means no fill at all. The fill color is the same color as the line above it.
        * Default: 0
        */
        fill?: number;
        /**
        * Whether to put the colored legend on the same row with the zoom buttons and the date ('sameRow'), or on a new row ('newRow').
        * Default: 'sameRow'
        */
        legendPosition?: string;
        /**
        * The maximum value to show on the Y axis. If the maximum data point exceeds this value, this setting will be ignored, 
        * and the chart will be adjusted to show the next major tick mark above the maximum data point. 
        * This will take precedence over the Y axis maximum determined by scaleType.
        * This is similar to maxValue in core charts.
        * Default: automatic
        */
        max?: number;
        /**
        * The minimum value to show on the Y axis. If the minimum data point is less than this value, this setting will be ignored, 
        * and the chart will be adjusted to show the next major tick mark below the minimum data point. This will take precedence over the Y axis minimum determined by scaleType.
        * This is similar to minValue in core charts.
        * Default: automatic
        */
        min?: number;
        /**
        * Specifies the number format patterns to be used to format the values at the top of the graph.
        * -
        * The patterns should be in the format as specified by the java DecimalFormat class.
        * -
        * If not specified, the default format pattern is used.
        * If a single string pattern is specified, it is used for all of the values.
        * If a map is specified, the keys are (zero-based) indexes of series, and the values are the patterns to be used to format the specified series.
        * You are not required to include a format for every series on the chart; any unspecified series will use the default format.
        * If this option is specified, the displayExactValues option is ignored.
        * Default: automatic
        * -
        * String, or a map of number:String pairs
        */
        numberFormats?: any;
        /**
        * Specifies which values to show on the Y axis tick marks in the graph. The default is to have a single scale on the right side, 
        * which applies to both series; but you can have different sides of the graph scaled to different series values.
        * -
        * This option takes an array of zero to three numbers specifying the (zero-based) index of the series to use as the scale value. 
        * Where these values are shown depends on how many values you include in your array:
        * 
        * If you specify an empty array, the chart will not show Y values next to the tick marks.
        * If you specify one value, the scale of the indicated series will be displayed on the right side of the chart only.
        * If you specify two values, a the scale for the second series will be added to the right of the chart.
        * If you specify three values, a scale for the third series will be added to the middle of the chart.
        * Any values after the third in the array will be ignored.
        * When displaying more than one scale, it is advisable to set the scaleType option to either 'allfixed' or 'allmaximized'.
        * Default: Automatic
        */
        scaleColumns?: Array<number>;
        /**
        * Number format to be used for the axis tick labels. The default of '#' displays as an integer.
        * Default: '#'
        */
        scaleFormat?: string;
        /**
        * Sets the maximum and minimum values shown on the Y axis. The following options are available:
        * -
        * 'maximized' - The Y axis will span the minimum to the maximum values of the series. If you have more than one series, use allmaximized.
        * 'fixed' [default] - The Y axis varies, depending on the data values values:
        * If all values are >=0, the Y axis will span from zero to the maximum data value.
        * If all values are <=0, the Y axis will span from zero to the minimum data value.
        * If values are both positive and negative, the Y axis will range from the series maximum to the series minimum.
        * 
        * For multiple series, use 'allfixed'.
        * 'allmaximized' - Same as 'maximized,' but used when multiple scales are displayed. Both charts will be maximized within the same scale, which means that one will be misrepresented against the Y axis, but hovering over each series will display its true value.
        * 'allfixed' - Same as 'fixed,' but used when multiple scales are displayed. This setting adjusts each scale to the series to which it applies (use this in conjunction with scaleColumns).
        * If you specify the min and/or max options, they will take precedence over the minimum and maximum values determined by your scale type.
        * Default: 'fixed'
        */
        scaleType?: string;
        /**
        * A number from 0—10 (inclusive) specifying the thickness of the lines, where 0 is the thinnest.
        * Default: 0
        */
        thickness?: number;
        /**
        * Sets the end date/time of the selected zoom range.
        * Default: none
        * -
        * any type represent a Date
        */
        zoomEndTime?: any;
        /**
        * Sets the start date/time of the selected zoom range.
        * -
        * any type represent a Date
        */
        zoomStartTime?: any;
    }

    export class AnnotationChart {
        /**
        * The google.load package name is "annotationchart"
        * -
        * google.load("visualization", "1.1", {packages: ['annotationchart']});
        * -
        * The visualization's class name is google.visualization.AnnotationChart
        * -
        * var visualization = new google.visualization.AnnotationChart(container);
        * @param htmlElem an HTML Element
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Clears the chart, and releases all its allocated resources.
        */
        clearChart(): void;
        /**
        * data - format
        * 
        * You can display one or more lines on your chart. Each row represents an X position on the chart—that is, a specific time; 
        * each line is described by a set of one to three columns.
        *
        * The first column is of type date or datetime, and specifies the X value of the point on the chart. 
        * If this column is of type date (and not datetime) then the smallest time resolution on the X axis will be one day.
        * -
        * Each data line is then described by a set of one to three additional columns as described here:
        * Y value - [Required, Number] The first column in each set describes the value of the line at the corresponding time from the first column. The column label is displayed on the chart as the title of that line.
        * Annotation title - [Optional, String] If a string column follows the value column, and the displayAnnotations option is true, this column holds a short title describing this point. For instance, if this line represents temperature in Brazil, and this point is a very high number, the title could be "Hottest day on record".
        * Annotation text - [Optional string] If a second string column exists for this series, the cell value will be used as additional descriptive text for this point. You must set the option displayAnnotations to true to use this column. You can use HTML tags, if you set allowHtml to true; there is essentially no size limit, but note that excessively long entries might overflow the display section. You are not required to have this column even if you have an annotation title column for this point. The column label is not used by the chart. For example, if this were the hottest day on record point, you might say something like "Next closest day was 10 degrees cooler!".
        */
        draw(data: DataTable, options?: AnnotationChartOptions, state?: any): void;
        /**
        * data - format
        * 
        * You can display one or more lines on your chart. Each row represents an X position on the chart—that is, a specific time; 
        * each line is described by a set of one to three columns.
        *
        * The first column is of type date or datetime, and specifies the X value of the point on the chart. 
        * If this column is of type date (and not datetime) then the smallest time resolution on the X axis will be one day.
        * -
        * Each data line is then described by a set of one to three additional columns as described here:
        * Y value - [Required, Number] The first column in each set describes the value of the line at the corresponding time from the first column. The column label is displayed on the chart as the title of that line.
        * Annotation title - [Optional, String] If a string column follows the value column, and the displayAnnotations option is true, this column holds a short title describing this point. For instance, if this line represents temperature in Brazil, and this point is a very high number, the title could be "Hottest day on record".
        * Annotation text - [Optional string] If a second string column exists for this series, the cell value will be used as additional descriptive text for this point. You must set the option displayAnnotations to true to use this column. You can use HTML tags, if you set allowHtml to true; there is essentially no size limit, but note that excessively long entries might overflow the display section. You are not required to have this column even if you have an annotation title column for this point. The column label is not used by the chart. For example, if this were the hottest day on record point, you might say something like "Next closest day was 10 degrees cooler!".
        */
        draw(data: DataView, options?: AnnotationChartOptions, state?: any): void;
        /**
        * Retrieves a handle to the container element containing the annotation chart.
        */
        getContainer(): HTMLElement;
        /**
        * Standard getSelection() implementation. Selected elements are cell elements. Only one cell can be selected at a time by the user.
        * Returns: Array of selection elements
        */
        getSelection(): Array<cell>;
        /**
        * Returns an object with start and end properties, which each one of them is a Date object, representing the current time selection.
        * Returns: An object with start and end properties
        */
        getVisibleChartRange(): StartEndDate;
        /**
        * Hides the specified data series from the chart. Accepts one parameter which can be a number or an array of numbers, in which 0 refers to the first data series, and so on.
        * @param columnIndexes number which 0 refers to the first data series, and so on
        */
        hideDataColumns(columnIndexes: number): void;
        /**
        * Hides the specified data series from the chart. Accepts one parameter which can be a number or an array of numbers, in which 0 refers to the first data series, and so on.
        * @param columnIndexes Array<number> which 0 refers to the first data series, and so on
        */
        hideDataColumns(columnIndexes: Array<number>): void;
        /**
        * Sets the visible range (zoom) to the specified range. Accepts two parameters of type Date that represent the first and last times of the wanted selected visible range. 
        * Set start to null to include everything from the earliest date to end; set end to null to include everything from start to the last date.
        * @param start indicate the start date
        * @param end indicate the end date
        */
        setVisibleChartRange(start: any, end: any): void;
        /**
        * Shows the specified data series from the chart, after they were hidden using hideDataColumns method. Accepts one parameter which can be a number or an array of numbers, in which 0 refers to the first data series, and so on.
        * @param columnIndexes
        */
        showDataColumns(columnIndexes: number): void;
        /**
        * Shows the specified data series from the chart, after they were hidden using hideDataColumns method. Accepts one parameter which can be a number or an array of numbers, in which 0 refers to the first data series, and so on.
        * @param columnIndexes
        */
        showDataColumns(columnIndexes: Array<number>): void;
    }

    export interface StartEndDate {
        /**
        * start: is a Date
        */
        start: any;
        /**
        * end: is a Date
        */
        end: any;
    }

} 