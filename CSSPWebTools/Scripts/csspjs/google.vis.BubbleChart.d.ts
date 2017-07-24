/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface BubbleChartOptions extends ChartOptions {
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
        * -
        * Default: 'out'
        */
        axisTitlesPosition?: string;
        /**
        * An object with members to configure the visual properties of the bubbles.
        * -
        * Default: null
        */
        bubble?: bubble;
        /**
        * An object that specifies a mapping between color column values and colors or a gradient scale. 
        * To specify properties of this object, you can use object literal notation, as shown here:
        * {minValue: 0,  colors: ['#FF0000', '#00FF00']}
        * -
        * Default: null
        */
        colorAxis?: colorAxis;
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
        * -
        * Default: null
        */
        hAxis?: hAxis;
        /**
        * When selectionMode is 'multiple', users may select multiple data points.
        * Allowable: 'single', 'multiple'
        * Default: 'single'
        */
        selectionMode?: string;
        /**
        * An object of objects, where the keys are series names (the values in the Color column) and each object 
        * describing the format of the corresponding series in the chart. If a series or a value is not specified, 
        * the global value will be used. Each object supports the following properties:
        * -
        * color - The color to use for this series. Specify a valid HTML color string.
        * visibleInLegend - A boolean value, where true means that the series should have a legend entry, and false means that it should not. Default is true.
        * Example:
        * series: {'Europe': {color: 'green'}}
        * -
        * Default: {}
        */
        series?: Array<serie>;
        /**
        * An object with members to configure how values are associated with bubble size. To specify properties of this object, you can use object literal notation, as shown here:
        * {minValue: 0,  maxSize: 20}
        * -
        * Default: null
        */
        sizeAxis?: sizeAxis;
        /**
        * If true, sorts the bubbles by size so the smaller bubbles appear above the larger bubbles. If false, bubbles are sorted according to their order in the DataTable.
        */
        sortBubblesBySize?: boolean;
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
        * An object with members to configure various vertical axis elements. To specify properties of this object, you can use object literal notation, as shown here:
        * -
        * {title: 'Hello', titleTextStyle: {color: '#FF0000'}}
        */
        vAxis?: vAxis;
    }

    export class BubbleChart extends Chart {
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataTable object holding all the data
        * @param options BubbleChartOptions holding all the non default setup
        */
        draw(data: DataTable, options?: BubbleChartOptions): void;
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataView object holding all the data
        * @param options BubbleChartOptions holding all the non default setup
        */
        draw(data: DataView, options?: BubbleChartOptions): void;
    }

    export interface colorAxis {
        /**
        * If present, specifies a minimum value for chart color data. Color data values of this value and lower will be 
        * rendered as the first color in the colorAxis.colors range.
        * -
        * Default: Minimum value of color column in chart data.
        */
        minValue?: number;
        /**
        * If present, specifies a maximum value for chart color data. Color data values of this value and 
        * higher will be rendered as the last color in the colorAxis.colors range.
        * -
        * Default: Maximum value of color column in chart data
        */
        maxValue?: number;
        /**
        * If present, controls how values are associated with colors. Each value is associated with the corresponding color in the colorAxis.colors array. 
        * These values apply to the chart color data. Coloring is done according to a gradient of the values specified here. 
        * Not specifying a value for this option is equivalent to specifying [minValue, maxValue].
        * -
        * Default: null
        */
        values?: Array<number>;
        /**
        * Colors to assign to values in the visualization. An array of strings, where each element is an HTML color string, 
        * for example: colorAxis: {colors:['red','#004411']}. You must have at least two values; the gradient will include all your values, 
        * plus calculated intermediary values, with the first color as the smallest value, and the last color as the highest.
        * -
        * Default: null
        */
        colors?: Array<string>;
        /**
        * An object that specifies the style of the gradient color legend.
        * -
        * Default: null
        */
        legend?: colorAxisLegend;
    }

    export interface colorAxisLegend {
        /**
        * Position of the legend. Can be one of the following:
        * 'top' - Above the chart.
        * 'bottom' - Below the chart.
        * 'in' - Inside the chart, at the top.
        * 'none' - No legend is displayed.
        * -
        * Default: 'top'
        */
        position?: string;
        /**
        * An object that specifies the legend text style. The object has this format:
        * 
        * {color: <string>, fontName: <string>, fontSize: <number>}
        * The color can be any HTML color string, for example: 'red' or '#00cc00'. Also see fontName and fontSize.
        * -
        * Default: {color: 'black', fontName: <global-font-name>, fontSize: <global-font-size>}
        */
        textStyle?: textStyle;
        /**
        * A format string for numeric labels. This is a subset of the ICU pattern set. 
        * For instance, {numberFormat:'.##'} will display values "10.66", "10.6", and "10.0" for values 10.666, 10.6, and 10.
        * -
        * Default: auto
        */
        numberFormat?: string;
    }

    export interface sizeAxis {
        /**
        * Maximum radius of the largest possible bubble, in pixels.
        */
        maxSize?: number;
        /**
        * The size value (as appears in the chart data) to be mapped to sizeAxis.maxSize. Larger values will be cropped to this value.
        */
        maxValue?: number;
        /**
        * Mininum radius of the smallest possible bubble, in pixels.
        */
        minSize?: number;
        /**
        * The size value (as appears in the chart data) to be mapped to sizeAxis.minSize. Smaller values will be cropped to this value.
        */
        minValue?: number;

    }



}   