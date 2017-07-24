/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface GaugeOptions {
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
        * Draws the chart inside an inline frame. (Note that on IE8, this option is ignored; all IE8 charts are drawn in i-frames.)
        * -
        * Default: false
        */
        forceIFrame?: boolean;
        /**
        * The color to use for the green section, in HTML color notation.
        * -
        * Default: '#109618'
        */
        greenColor?: string;
        /**
        * The lowest value for a range marked by a green color.
        * -
        * Default: none
        */
        greenFrom?: number;
        /**
        * The highest value for a range marked by a green color.
        * -
        * Default: none
        */
        greenTo?: number;
        /**
        * Height of the chart in pixels.
        * -
        * Default: Container's height
        */
        height?: number;
        /**
        * Labels for major tick marks. The number of labels define the number of major ticks in all gauges. The default is five major ticks, with the labels of the minimal and maximal gauge value.
        * -
        * Default: none
        */
        majorTicks?: Array<string>;
        /**
        * The maximal value of a gauge.
        * -
        * Default: 100
        */
        max?: number;
        /**
        * The minimal value of a gauge.
        * -
        * Default: 0
        */
        min?: number;
        /**
        * The number of minor tick section in each major tick section.
        * -
        * Default: 2
        */
        minorTicks?: number;
        /**
        * The color to use for the red section, in HTML color notation.
        * -
        * Default: '#DC3912'
        */
        redColor?: string;
        /**
        * The lowest value for a range marked by a red color.
        * -
        * Default: none
        */
        redFrom?: number;
        /**
        * The highest value for a range marked by a red color.
        * -
        * Default: none
        */
        redTo?: number;
        /**
        * Width of the chart in pixels.
        * -
        * Default: Container's width
        */
        width?: number;
        /**
        * The color to use for the yellow section, in HTML color notation.
        * -
        * Default: '#FF9900'
        */
        yellowColor?: string;
        /**
        * The lowest value for a range marked by a yellow color.
        * -
        * Default: none
        */
        yellowFrom?: number;
        /**
        * The highest value for a range marked by a yellow color.
        * -
        * Default: none
        */
        yellowTo?: number;
    }

    export class Gauge {
        /**
        * One or more gauges are rendered within the browser using SVG or VML.
        * Each numeric value is displayed as a gauge. Two alternative data formats are supported:
        * 
        * Two columns. The first column should be a string, and contain the gauge label. The second column should be a number, and contain the gauge value.
        * Any number of numeric columns. The label of each gauge is the column's label.
        * -
        * google.load("visualization", "1", {packages: ["gauge"]});
        *
        * var visualization = new google.visualization.Gauge(container);
        * 
        * @param htmlElem an HTML Element
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataTable object holding all the data
        * @param options GaugeOptions holding all the non default setup
        */
        draw(d: DataTable, opt?: GaugeOptions): void;
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataView object holding all the data
        * @param options GaugeOptions holding all the non default setup
        */
        draw(d: DataView, opt?: GaugeOptions): void;
        /**
        * Clears the chart, and releases all of its allocated resources.
        */
        clearChart();
    }
}       