/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface HistogramOptions extends ChartOptions {
        /**
        * Google charts can transition gracefully when you change chart options or data. 
        * -
        * animation obj type is:
        * duration?: number
        * easing?: string
        * boxStyle?: boxStyle;
        * textStyle?: textStyle;
        */
        animation?: animation;
        /**
        * Where to place the axis titles, compared to the chart area. Supported values:
        * 
        * 'in' - Draw the axis titles inside the the chart area.
        * 'out' - Draw the axis titles outside the chart area.
        * 'none' - Omit the axis titles.
        * Default: 'out'
        */
        axisTitlesPosition?: string;
        /**
        * The width of a group of bars, specified in either of these formats:
        * Pixels (e.g. 50).
        * Percentage of the available width for each group (e.g. '20%'), where '100%' means that groups have no space between them.
        * -
        * Should be a number  or string  e.g. 50 (number), e.g. 50% (string)
        * Default: The golden ratio, approximately '61.8%'.
        */
        bar?: bar; /* only variable in bar is groupWidth */
        /**
        * The transparency of data points, with 1.0 being completely opaque and 0.0 fully transparent. 
        * In scatter, histogram, bar, and column charts, this refers to the visible data: dots in the scatter chart and rectangles in the others. 
        * In charts where selecting data creates a dot, such as the line and area charts, this refers to the circles that appear upon hover or selection. 
        * The combo chart exhibits both behaviors, and this option has no effect on other charts. (To change the opacity of a trendline, see trendline opacity.)
        * Default: 1.0
        */
        dataOpacity?: number;
        /**
        * Draws the chart inside an inline frame. (Note that on IE8, this option is ignored; all IE8 charts are drawn in i-frames.)
        * -
        * Default: false
        */
        forceIFrame?: boolean;
        /**
        * An object with members to configure various horizontal axis elements. To specify properties of this object, you can use object literal notation, as shown here:
        * -
        * {title: 'Hello',  titleTextStyle: {color: '#FF0000'}}
        * Default: null
        */
        hAxis?: hAxis;
        /**
        * histogram obj type is:
        * -
        * bucketSize?: number
        * hideBucketItems?: boolean
        * lastBucketPercentile?: number
        */
        histogram?: histogram;
        /**
        * Whether to guess the value of missing points. 
        * If true, it will guess the value of any missing data based on neighboring points. 
        * If false, it will leave a break in the line at the unknown point.
        * -
        * Default: false
        */
        interpolateNulls?: boolean;
        /**
        * If set to true, series elements are stacked.
        * -
        * Default: false
        */
        isStacked?: boolean;
        /**
        * Data line width in pixels. Use zero to hide all lines and show only the points. You can override values for individual series using the series property.
        * -
        * Default: 2
        */
        lineWidth?: number;
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
        * If set to true, will draw series from right to left. The default is to draw left-to-right.
        * This option is only supported for a discrete major axis.
        * -
        * Default: false
        */
        reverseCategories?: boolean;
        /**
        * An array of objects, each describing the format of the corresponding series in the chart. To use default values for a series, specify an empty object {}. If a series or a value is not specified, the global value will be used. Each object supports the following properties:
        * -
        * annotations - An object to be applied to annotations for this series. This can be used to control, for instance, the textStyle for the series:
        * series: {
        *   0: {
        *     annotations: {
        *       textStyle: {fontSize: 12, color: 'red' }
        *     }
        *   }
        * }
        * See the various annotations options for a more complete list of what can be customized.
        * color - The color to use for this series. Specify a valid HTML color string.
        * targetAxisIndex - Which axis to assign this series to, where 0 is the default axis, and 1 is the opposite axis. Default value is 0; set to 1 to define a chart where different series are rendered against different axes. At least one series much be allocated to the default axis. You can define a different scale for different axes.
        * pointSize - Overrides the global pointSize value for this series.
        * lineWidth - Overrides the global lineWidth value for this series.
        * areaOpacity - Overrides the global areaOpacity for this series.
        * visibleInLegend - A boolean value, where true means that the series should have a legend entry, and false means that it should not. Default is true.
        * You can specify either an array of objects, each of which applies to the series in the order given, or you can specify an object where each child has a numeric key indicating which series it applies to. For example, the following two declarations are identical, and declare the first series as black and absent from the legend, and the fourth as red and absent from the legend:
        * 
        * series: [{color: 'black', visibleInLegend: false}, {}, {},
        *                       {color: 'red', visibleInLegend: false}]
        * series: {0:{color: 'black', visibleInLegend: false},
        *          3:{color: 'red', visibleInLegend: false}}
        * - 
        * Default: {}
        */
        series?: Array<serie>;
        /**
        * A theme is a set of predefined option values that work together to achieve a specific chart behavior or visual effect. Currently only one theme is available:
        * 'maximized' - Maximizes the area of the chart, and draws the legend and all of the labels inside the chart area. Sets the following options:
        * chartArea: {width: '100%', height: '100%'},
        * legend: {position: 'in'},
        * titlePosition: 'in', axisTitlesPosition: 'in',
        * hAxis: {textPosition: 'in'}, vAxis: {textPosition: 'in'}
        * -
        * Default: null
        */
        theme?: string;
        /**
        * The default line type for any series not specified in the series property. Available values are 'line', 'area', 'bars', 'candlesticks' and 'steppedArea'.
        * -
        * Default: 'line'
        */
        seriesType?: string;
        /**
        * Where to place the chart title, compared to the chart area. Supported values:
        * 
        * 'in' - Draw the title inside the chart area.
        * 'out' - Draw the title outside the chart area.
        * 'none' - Omit the title.
        * -
        * Default: 'out'
        */
        titlePosition?: string;
        /**
        * Specifies properties for individual vertical axes, if the chart has multiple vertical axes. Each child object is a vAxis object, and can contain all the properties supported by vAxis. These property values override any global settings for the same property.
        * -
        * To specify a chart with multiple vertical axes, first define a new axis using series.targetAxisIndex, then configure the axis using vAxes. The following example assigns series 2 to the right axis and specifies a custom title and text style for it:
        * -
        * series:{2:{targetAxisIndex:1}}, vAxes:{1:{title:'Losses',textStyle:{color: 'red'}}}
        * -
        * This property can be either an object or an array: the object is a collection of objects, each with a numeric label that specifies the axis that it defines--this is the format shown above; the array is an array of objects, one per axis. For example, the following array-style notation is identical to the vAxis object shown above:
        * -
        * vAxes:[
        * {}, // Nothing specified for axis 0
        * {title:'Losses',textStyle:{color: 'red'}} // Axis 1
        * ]
        * -
        * Default: null
        */
        vAxes?: Array<vAxis>;
        /**
        * An object with members to configure various vertical axis elements. To specify properties of this object, you can use object literal notation, as shown here:
        * -
        * {title: 'Hello', titleTextStyle: {color: '#FF0000'}}
        */
        vAxis?: vAxis;
    }

    export class Histogram extends Chart {
        /**
        * A histogram is a chart that groups numeric data into bins, displaying the bins as segmented columns. They're used to depict the distribution of a dataset: how often values fall into ranges.
        * 
        * Google Charts automatically chooses the number of bins for you. All bins are equal width and have a height proportional to the number of data points in the bin. In other respects, histograms are similar to column charts.
        * -
        * google.load("visualization", "1", {packages: ["corechart"]});
        *
        * var visualization = new google.visualization.Histogram(container);
        * 
        * @param htmlElem an HTML Element
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * data example for one series
        * [
        *   ['Name', 'Number'],
        *   ['Name 1', number1],
        *   ['Name 2', number2],
        *   ['Name 3', number3],
        *   ...
        * ]
        * -
        * data example for multiple series
        * [
        *   ['Series Name 1', 'Series Name 2', 'Series Name 3', ...],
        *   [series1_number1, series2_number1, series3_number1, ...],
        *   [series1_number2, series2_number2, series3_number2, ...],
        *   [series1_number3, series2_number3, series3_number3, ...],
        *   ...
        * ]
        * -
        * @param data A DataTable object holding all the data
        * @param options HistogramOptions holding all the non default setup
        */
        draw(data: DataTable, options?: HistogramOptions): void;
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * data example for one series
        * [
        *   ['Name', 'Number'],
        *   ['Name 1', number1],
        *   ['Name 2', number2],
        *   ['Name 3', number3],
        *   ...
        * ]
        * -
        * data example for multiple series
        * [
        *   ['Series Name 1', 'Series Name 2', 'Series Name 3', ...],
        *   [series1_number1, series2_number1, series3_number1, ...],
        *   [series1_number2, series2_number2, series3_number2, ...],
        *   [series1_number3, series2_number3, series3_number3, ...],
        *   ...
        * ]
        * -
        * @param data A DataView object holding all the data
        * @param options ComboChartOptions holding all the non default setup
        */
        draw(data: DataView, options?: HistogramOptions): void;
    }

    export interface histogram {
        /**
        * Hardcode the size of each histogram bar, rather than letting it be determined algorithmically.
        * -
        * Default: auto
        */
        bucketSize?: number;
        /**
        * Omit the thin divisions between the blocks of the histogram, making it into a series of solid bars.
        * -
        * Default: false
        */
        hideBucketItems?: boolean;
        /**
        * When calculating the histogram's bucket size, ignore the top and bottom lastBucketPercentile percent.
        * -
        * Default: 0
        */
        lastBucketPercentile?: number;
    }
}         