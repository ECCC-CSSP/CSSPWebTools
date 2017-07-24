/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface hAxis {
        /**
        * If false, will hide outermost labels rather than allow them to be cropped by the chart container. If true, will allow label cropping.
        * This option is only supported for a discrete axis.
        * -
        * Default: false
        */
        allowContainerBoundaryTextCufoff?: boolean;
        /**
        * The baseline for the horizontal axis. This option is only supported for a continuous axis.
        * -
        * Default: automatic
        */
        baseline?: number;
        /**
        * The color of the baseline for the horizontal axis. Can be any HTML color string, for example: 'red' or '#00cc00'.
        * This option is only supported for a continuous axis.
        * -
        * Default: 'black'
        */
        baselineColor?: string;
        /**
        * The direction in which the values along the horizontal axis grow. Specify -1 to reverse the order of the values.
        * Allowable values: 1 or -1
        * Default: 1
        */
        direction?: number;
        /**
        * A format string for numeric or date axis labels.
        * -
        * For number axis labels, this is a subset of the decimal formatting ICU pattern set. For instance, {format:'#,###%'} will display values "1,000%", "750%", and "50%" for values 10, 7.5, and 0.5.
        * -
        * For date axis labels, this is a subset of the date formatting ICU pattern set. For instance, {format:'MMM d, y'} will display the value "Jul 1, 2011" for the date of July first in 2011.
        * -
        * The actual formatting applied to the label is derived from the locale the API has been loaded with. For more details, see loading charts with a specific locale.
        * -
        * This option is only supported for a continuous axis.
        * -
        * Default: auto
        */
        format?: string;
        /**
        * An object with members to configure the gridlines on the horizontal axis. To specify properties of this object, you can use object literal notation, as shown here:
        * 
        * {color: '#333', count: 4}
        * This option is only supported for a continuous axis.
        */
        gridLines?: gridLines;
        /**
        * hAxis property that makes the horizontal axis a logarithmic scale (requires all values to be positive). Set to true for yes.
        * This option is only supported for a continuous axis.
        * -
        * Default: false
        */
        logScale?: boolean;
        /**
        * Maximum number of levels of horizontal axis text. If axis text labels become too crowded, the server might shift 
        * neighboring labels up or down in order to fit labels closer together. This value specifies the most number of levels to use; 
        * the server can use fewer levels, if labels can fit without overlapping.
        * This option is only supported for a discrete axis.
        * -
        * Default: 2
        */
        maxAlternation?: number;
        /**
        * Maximum number of lines allowed for the text labels. Labels can span multiple lines if they are too long, 
        * and the nuber of lines is, by default, limited by the height of the available space.
        * This option is only supported for a discrete axis.
        * -
        * Default: auto
        */
        maxTextLines?: number;
        /**
        * Moves the max value of the horizontal axis to the specified value; this will be rightward in most charts. 
        * Ignored if this is set to a value smaller than the maximum x-value of the data. hAxis.viewWindow.max overrides this property.
        * This option is only supported for a continuous axis.
        * -
        * Default: automatic
        */
        maxValue?: number;
        /**
        * An object with members to configure the minor gridlines on the horizontal axis, similar to the hAxis.gridlines option.
        * This option is only supported for a continuous axis.
        */
        minorGridlines?: minorGridlines;
        /**
        * Minimum horizontal spacing, in pixels, allowed between two adjacent text labels. If the labels are spaced too densely, 
        * or they are too long, the spacing can drop below this threshold, and in this case one of the label-unclutter 
        * measures will be applied (e.g, truncating the lables or dropping some of them).
        * This option is only supported for a discrete axis.
        * -
        * Default: The value of hAxis.textStyle.fontSize
        */
        minTextSpacing?: number;
        /**
        * Moves the min value of the horizontal axis to the specified value; this will be leftward in most charts. 
        * Ignored if this is set to a value greater than the minimum x-value of the data. hAxis.viewWindow.min overrides this property.
        * This option is only supported for a continuous axis.
        * - 
        * Default: automatic
        */
        minValue?: number;
        /**
        * How many horizontal axis labels to show, where 1 means show every label, 2 means show every other label, 
        * and so on. Default is to try to show as many labels as possible without overlapping.
        * This option is only supported for a discrete axis.
        * - 
        * Default: automatic
        */
        showTextEvery?: number;
        /**
        * If true, draw the horizontal axis text at an angle, to help fit more text along the axis; 
        * if false, draw horizontal axis text upright. Default behavior is to slant text if it cannot all fit when drawn upright. 
        * Notice that this option is available only when the hAxis.textPosition is set to 'out' (which is the default).
        * This option is only supported for a discrete axis.
        * - 
        * Default: automatic
        */
        slantedText?: boolean;
        /**
        * The angle of the horizontal axis text, if it's drawn slanted. Ignored if hAxis.slantedText is false, 
        * or is in auto mode, and the chart decided to draw the text horizontally.
        * This option is only supported for a discrete axis.
        * -
        * Allowable value: 1-90
        * Default: 30
        */
        slantedTextAngle?: number;
        /**
        * Position of the horizontal axis text, relative to the chart area. 
        * Supported values: 'out', 'in', 'none'.
        * - 
        * Default: 'out'
        */
        textPosition?: string;
        /**
        * An object that specifies the horizontal axis text style. The object has this format:
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
        * hAxis: { ticks: [5,10,15,20] }
        * hAxis: { ticks: [{v:32, f:"thirty two"}, {v:64, f:"sixty four"}] }
        * hAxis: { ticks: [new Date(2014,3,15), new Date(2013,5,15)] }
        * hAxis: { ticks: [16, {v:32, f:"thirty two"}, {v:64, f:"sixty four"}, 128] }
        * This option is only supported for a continuous axis.
        * -
        * Default: auto
        */
        ticks?: Array<tick>;
        /**
        * specifies the title of the horizontal axis.
        * -
        * Default: none
        */
        title?: string;
        /**
        * An object that specifies the horizontal axis title text style. The object has this format:
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
        * Specifies how to scale the horizontal axis to render the values within the chart area. The following string values are supported:
        * 
        * 'pretty' - Scale the horizontal values so that the maximum and minimum data values are rendered a bit inside the left and right of the chart area. 
        * This will cause haxis.viewWindow.min and haxis.viewWindow.max to be ignored.
        * 'maximized' - Scale the horizontal values so that the maximum and minimum data values touch the left and right of the chart area. 
        * This will cause haxis.viewWindow.min and haxis.viewWindow.max to be ignored.
        * 'explicit' - A deprecated option for specifying the left and right scale values of the chart area. 
        * (Deprecated because it's redundant with haxis.viewWindow.min and haxis.viewWindow.max.) 
        * Data values outside these values will be cropped. You must specify an hAxis.viewWindow object describing the maximum and minimum values to show.
        * This option is only supported for a continuous axis.
        * - 
        * Default: Equivalent to 'pretty', but haxis.viewWindow.min and haxis.viewWindow.max take precedence if used.
        */
        viewWindowMode?: string;
        /**
        * Specifies the cropping range of the horizontal axis.
        */
        viewWindow?: viewWindow;
    }


} 