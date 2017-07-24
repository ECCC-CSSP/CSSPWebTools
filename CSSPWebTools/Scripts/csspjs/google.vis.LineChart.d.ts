﻿/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface LineChartOptions extends ChartOptions {
        /**
        * How multiple data selections are rolled up into tooltips:
        * 'category': Group selected data by x-value.
        * 'series': Group selected data by series.
        * 'auto': Group selected data by x-value if all selections have the same x-value, and by series otherwise.
        * 'none': Show only one tooltip per selection.
        * aggregationTarget will often be used in tandem with selectionMode and tooltip.trigger, e.g.:
        *   var options = {
        *     // Allow multiple simultaneous selections.
        *     selectionMode: 'multiple',
        *     // Trigger tooltips on selections.
        *     tooltip: { trigger: 'selection' },
        *     // Group selections by x-value.
        *     aggregationTarget: 'category',
        *   };
        * -
        * Default: 'auto'
        */
        aggregationTarget?: string;
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
        * The default opacity of the colored area under an area chart series, where 0.0 is fully transparent and 1.0 is fully opaque. 
        * To specify opacity for an individual series, set the areaOpacity value in the series property.
        * Default: 0.3
        * number should be between 0.0 and 1.0
        */
        areaOpacity?: number;
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
        * Controls the curve of the lines when the line width is not zero. Can be one of the following:
        * 'none' - Straight lines without curve.
        * 'function' - The angles of the line will be smoothed.
        * -
        */
        curveType?: string
        /**
        * The transparency of data points, with 1.0 being completely opaque and 0.0 fully transparent. 
        * In scatter, histogram, bar, and column charts, this refers to the visible data: dots in the scatter chart and rectangles in the others. 
        * In charts where selecting data creates a dot, such as the line and area charts, this refers to the circles that appear upon hover or selection. 
        * The combo chart exhibits both behaviors, and this option has no effect on other charts. (To change the opacity of a trendline, see trendline opacity.)
        * Default: 1.0
        */
        dataOpacity?: number;
        /**
        * The explorer option allows users to pan and zoom Google charts. 
        * explorer: {} provides the default explorer behavior, enabling users to pan horizontally 
        * and vertically by dragging, and to zoom in and out by scrolling.
        * -
        * This feature is experimental and may change in future releases.
        */
        explorer?: explorer;
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
        * Whether to guess the value of missing points. 
        * If true, it will guess the value of any missing data based on neighboring points. 
        * If false, it will leave a break in the line at the unknown point.
        * -
        * Default: false
        */
        interpolateNulls?: boolean;
        /**
        * Data line width in pixels. Use zero to hide all lines and show only the points. You can override values for individual series using the series property.
        * -
        * Default: 2
        */
        lineWidth?: number;
        /**
        * The orientation of the chart. When set to 'vertical', rotates the axes of the chart so that (for instance) a column chart becomes a bar chart, 
        * and an area chart grows rightward instead of up:
        * -
        * Allowable values: 'horizontal', 'vertical'
        * Default: 'horizontal'
        */
        orientation?: string;
        /**
        * Diameter of displayed points in pixels. Use zero to hide all points. You can override values for individual series using the series property.
        * -
        * Default: 0
        */
        pointSize?: number;
        /**
        * If set to true, will draw series from right to left. The default is to draw left-to-right.
        * This option is only supported for a discrete major axis.
        * -
        * Default: false
        */
        reverseCategories?: boolean;
        /**
        * When selectionMode is 'multiple', users may select multiple data points.
        * Allowable: 'single', 'multiple'
        * Default: 'single'
        */
        selectionMode?: string;
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
        theme?: string; /* "minimized" */
        /**
        * Where to place the chart title, compared to the chart area. Supported values:
        * 
        * 'in' - Draw the title inside the chart area.
        * 'out' - Draw the title outside the chart area.
        * 'none' - Omit the title.
        * -
        * Default: 'out'
        */
        titlePosition?: string; /* "in", "out", "none" */
        /**
        * Automatically draws a trendline
        * -
        * ex:
        *     trendlines: {
        *      0: {
        *        labelInLegend: 'Bug line',
        *        visibleInLegend: true,
        *      },
        *      1: {
        *        labelInLegend: 'Test line',
        *        visibleInLegend: true,
        *      }
        *    }
        */
        trendlines?: trendline;
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

    export class LineChart extends Chart {
        /**
        * A line chart that is rendered within the browser using SVG or VML. Displays tips when hovering over points.
        * -
        * google.load("visualization", "1", {packages: ["corechart"]});
        *
        * var visualization = new google.visualization.LineChart(container);
        * 
        * @param htmlElem an HTML Element
        */
        constructor(htmllElem: HTMLElement);
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataTable object holding all the data
        * @param options LineChartOptions holding all the non default setup
        */
        draw(data: DataTable, options?: LineChartOptions): void;
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataTable object holding all the data
        * @param options LineChartOptions holding all the non default setup
        */
        draw(data: DataView, options?: LineChartOptions): void;
    }


}          