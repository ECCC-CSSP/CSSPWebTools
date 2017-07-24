/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface vAxis {
        /**
        * vAxis property that specifies the baseline for the vertical axis. If the baseline is larger than 
        * the highest grid line or smaller than the lowest grid line, it will be rounded to the closest gridline.
        * -
        * Default: automatic
        */
        baseline?: number;
        /**
        * Specifies the color of the baseline for the vertical axis. Can be any HTML color string, for example: 'red' or '#00cc00'.
        * -
        * Default: 'black'
        */
        baselineColor?: string;
        /**
        * The direction in which the values along the vertical axis grow. Specify -1 to reverse the order of the values.
        * Allowable values: 1 or -1
        * Default: 1
        */
        direction?: number;
        /**
        * A format string for numeric axis labels. This is a subset of the ICU pattern set. For instance, 
        * {format:'#,###%'} will display values "1,000%", "750%", and "50%" for values 10, 7.5, and 0.5.
        * The actual formatting applied to the label is derived from the locale the API has been loaded with. 
        * For more details, see loading charts with a specific locale.
        * -
        * Default: auto
        */
        format?: string;
        /**
        * An object with members to configure the gridlines on the vertical axis. To specify properties of this object, you can use object literal notation, as shown here:
        * 
        * {color: '#333', count: 4}
        * This option is only supported for a continuous axis.
        */
        gridLines?: gridLines;
        /**
        * If true, makes the vertical axis a logarithmic scale Note: All values must be positive.
        * -
        * Default: false
        */
        logScale?: boolean;
        /**
        * Moves the max value of the vertical axis to the specified value; this will be upward in most charts. 
        * Ignored if this is set to a value smaller than the maximum y-value of the data. vAxis.viewWindow.max overrides this property.
        * -
        * Default: automatic
        */
        maxValue?: number;
        /**
        * An object with members to configure the minor gridlines on the vertical axis, similar to the vAxis.gridlines option.
        */
        minorGridlines?: minorGridlines;
        /**
        * Moves the min value of the vertical axis to the specified value; this will be downward in most charts. 
        * Ignored if this is set to a value greater than the minimum y-value of the data. vAxis.viewWindow.min overrides this property.
        * - 
        * Default: automatic
        */
        minValue?: number;
        /**
        * Position of the vertical axis text, relative to the chart area.
        * Supported values: 'out', 'in', 'none'.
        * - 
        * Default: 'out'
        */
        textPosition?: string;
        /**
        * An object that specifies the vertical axis text style. The object has this format:
        * -
        * { color: <string>,
        *   fontName: <string>,
        *   fontSize: <number>,
        *   bold: <boolean>,
        *   italic: <boolean> }
        * The color can be any HTML color string, for example: 'red' or '#00cc00'. Also see fontName and fontSize
        * -
        * Default: {color: 'black', fontName: <global-font-name>, fontSize: <global-font-size>}
        */
        textStyle?: textStyle;
        /**
        * Replaces the automatically generated X-axis ticks with the specified array. Each element of the array should be either a valid tick value (such as a number, date, datetime, or timeofday), or an object. If it's an object, it should have a v property for the tick value, and an optional f property containing the literal string to be displayed as the label.
        * -
        * Examples:
        * -
        * vAxis: { ticks: [5,10,15,20] }
        * vAxis: { ticks: [{v:32, f:"thirty two"}, {v:64, f:"sixty four"}] }
        * vAxis: { ticks: [new Date(2014,3,15), new Date(2013,5,15)] }
        * vAxis: { ticks: [16, {v:32, f:"thirty two"}, {v:64, f:"sixty four"}, 128] }
        * This option is only supported for a continuous axis.
        * -
        * Default: auto
        */
        ticks?: Array<tick>;
        /**
        * vAxis property that specifies a title for the vertical axis.
        * -
        * Default: none
        */
        title?: string;
        /**
        * An object that specifies the vertical axis title text style. The object has this format:
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
        * Specifies how to scale the vertical axis to render the values within the chart area. The following string values are supported:
        * 
        * 'pretty' - Scale the vertical values so that the maximum and minimum data values are rendered a bit inside the top and bottom of the chart area. 
        *         This will cause vaxis.viewWindow.min and vaxis.viewWindow.max to be ignored.
        * 'maximized' - Scale the vertical values so that the maximum and minimum data values touch the top and bottom of the chart area. 
        *         This will cause vaxis.viewWindow.min and vaxis.viewWindow.max to be ignored.
        * 'explicit' - A deprecated option for specifying the top and bottom scale values of the chart area. 
        *         (Deprecated because it's redundant with vaxis.viewWindow.min and vaxis.viewWindow.max. 
        *         Data values outside these values will be cropped. You must specify a vAxis.viewWindow object describing the maximum and minimum values to show.
        * - 
        * Default: Equivalent to 'pretty', but haxis.viewWindow.min and haxis.viewWindow.max take precedence if used.
        */
        viewWindowMode?: string;
        /**
        * Specifies the cropping range of the vertical  axis.
        */
        viewWindow?: viewWindow;
    }


} 