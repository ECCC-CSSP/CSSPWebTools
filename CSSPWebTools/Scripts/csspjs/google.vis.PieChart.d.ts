/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface PieChartOptions extends ChartOptions {
        /**
        * If true, displays a three-dimensional chart.
        */
        is3D?: boolean;
        /**
        * If between 0 and 1, displays a donut chart. The hole with have a radius equal to number times the radius of the chart.
        * -
        * Default: 0
        */
        pieHole?: number;
        /**
        * The color of the slice borders. Only applicable when the chart is two-dimensional.
        * -
        * Default: 'white'
        */
        pieSliceBorderColor?: string;
        /**
        * The content of the text displayed on the slice. Can be one of the following:
        * 'percentage' - The percentage of the slice size out of the total.
        * 'value' - The quantitative value of the slice.
        * 'label' - The name of the slice.
        * 'none' - No text is displayed.
        * -
        * Default: 'percentage'
        */
        pieSliceText?: string;
        /**
        * An object that specifies the slice text style. The object has this format:
        * -
        *  {color: <string>, fontName: <string>, fontSize: <number>}
        * The color can be any HTML color string, for example: 'red' or '#00cc00'. Also see fontName and fontSize.
        * -
        * Default: {color: 'black', fontName: <global-font-name>, fontSize: <global-font-size>}
        */
        pieSliceTextStyle?: textStyle;
        /**
        * The angle, in degrees, to rotate the chart by. The default of 0 will orient the leftmost edge of the first slice directly up.
        * -
        * Default: 0
        */
        pieStartAngle?: number;
        /**
        * Color for the combination slice that holds all slices below sliceVisibilityThreshold.
        * -
        * Default: '#ccc'
        */
        pieResidueSliceColor?: string;
        /**
        * A label for the combination slice that holds all slices below sliceVisibilityThreshold.
        * -
        * Default: 'Other'
        */
        pieResidueSliceLabel?: string;
        /**
        * If true, draws slices counterclockwise. The default is to draw clockwise.
        * -
        * Default: false
        */
        reverseCategories?: boolean;
        /**
        * An array of objects, each describing the format of the corresponding slice in the pie. To use default values for a slice, specify an empty object (i.e., {}). If a slice or a value is not specified, the global value will be used. Each object supports the following properties:
        * -
        * slice obj type is:
        * -
        * color - The color to use for this slice. Specify a valid HTML color string.
        * offset - How far to separate the slice from the rest of the pie, from 0.0 (not at all) to 1.0 (the pie's radius).
        * textStyle - Overrides the global pieSliceTextSlice for this slice.
        * -
        * You can specify either an array of objects, each of which applies to the slice in the order given, or you can specify an object where each child has a numeric key indicating which slice it applies to. For example, the following two declarations are identical, and declare the first slice as black and the fourth as red:
        * 
        * slices: [{color: 'black', {}, {}, {color: 'red'}]
        * slices: {0: {color: 'black'}, 3: {color: 'red'}}
        * -
        * Default: {}
        */
        slices?: Array<slice>;
        /**
        * The slice relative part, below which a slice will not show individually. All slices that have not passed this threshold will be combined to a single slice, whose size is the sum of all their sizes. Default is not to show individually any slice which is smaller than half a degree.
        * -
        * Default: 1/720
        */
        sliceVisibilityThreshold?: number;
    }


    export class PieChart extends Chart {
        /**
        * A pie chart that is rendered within the browser using SVG or VML. Displays tooltips when hovering over slices.
        * -
        * The google.load package name is "corechart".
        * -
        *   google.load("visualization", "1", {packages: ["corechart"]});
        * The visualization's class name is google.visualization.PieChart.
        * -
        *   var visualization = new google.visualization.PieChart(container);
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * [
        *   ['Task', 'Hours per Day'],
        *   ['Work',     11],
        *   ['Eat',      2],
        *   ['Commute',  2],
        *   ['Watch TV', 2],
        *   ['Sleep',    7]
        * ]
        * -
        * @param data A DataView object holding all the data
        * @param options BarChartOptions holding all the non default setup
        */
        draw(data: DataTable, options?: PieChartOptions): void;
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * [
        *   ['Task', 'Hours per Day'],
        *   ['Work',     11],
        *   ['Eat',      2],
        *   ['Commute',  2],
        *   ['Watch TV', 2],
        *   ['Sleep',    7]
        * ]
        * -
        * @param data A DataView object holding all the data
        * @param options BarChartOptions holding all the non default setup
        */
        draw(data: DataView, options?: PieChartOptions): void;
    }

    export interface slice {
        /**
        * The color to use for this slice. Specify a valid HTML color string.
        */
        color?: string;
        /**
        * How far to separate the slice from the rest of the pie, from 0.0 (not at all) to 1.0 (the pie's radius).
        */
        offer?: number;
        /**
        * Overrides the global pieSliceTextSlice for this slice.
        */
        textStyle?: textStyle;
    }


}             