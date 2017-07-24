/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface ArrowFormatOptions {
        /**
        * A number indicating the base value, used to compare against the cell value. 
        * If the cell value is higher, the cell will include a green up arrow; 
        * if the cell value is lower, it will include a red down arrow; if the same, no arrow.
        */
        base?: number;
    }

    export interface BarFormatOptions {
        /**
        * A number that is the base value to compare the cell value against. If the cell value is higher, 
        * it will be drawn to the right of the base; if lower, it will be drawn to the left. Default value is 0.
        */
        base?: number;
        /**
        * A string indicating the negative value section of bars. Possible values are 'red', 'green' and 'blue'; default value is 'red'.
        */
        colorNegative?: string;
        /**
        * A string indicating the color of the positive value section of bars. Possible values are 'red', 'green' and 'blue'. Default is 'blue'.
        */
        colorPositive?: string;
        /**
        * A boolean indicating if to draw a 1 pixel dark base line when negative values are present. 
        * The dark line is there to enhance visual scanning of the bars. Default value is 'false'.
        */
        drawZeroLine?: boolean;
        /**
        * The maximum number value for the bar range. Default value is the highest value in the table.
        */
        max?: number;
        /**
        * The minimum number value for the bar range. Default value is the lowest value in the table.
        */
        min?: number;
        /**
        * If true, shows values and bars; if false, shows only bars. Default value is true.
        */
        showValue?: boolean;
        /**
        * Thickness of each bar, in pixels. Default value is 100.
        */
        width?: number;
    }

    export interface DateFormatOptions {
        /**
        * A quick formatting option for the date. The following string values are supported, reformatting the date February 28, 2008 as shown:
        * 
        * 'short' - Short format: e.g., "2/28/08"
        * 'medium' - Medium format: e.g., "Feb 28, 2008"
        * 'long' - Long format: e.g., "February 28, 2008"
        * You cannot specify both formatType and pattern.
        */
        formatType?: string;
        /**
        * A custom format pattern to apply to the value, similar to the ICU date and time format. 
        * For example: var formatter3 = new google.visualization.DateFormat({pattern: "EEE, MMM d, ''yy"});
        * -
        * You cannot specify both formatType and pattern. You can read more details about patterns in the next section.
        * -
        * more info https://developers.google.com/chart/interactive/docs/reference#dateformatter 
        */
        pattern?: string;
        /**
        * The time zone in which to display the date value. This is a numeric value, indicating GMT + this number of time zones (can be negative). 
        * Date object are created by default with the assumed time zone of the computer on which they are created; this option is used to display 
        * that value in a different time zone. For example, if you created a Date object of 5pm noon on a computer located in Greenwich, England, 
        * and specified timeZone to be -5 (options['timeZone'] = -5, or Eastern Pacific Time in the US), the value displayed would be 12 noon.
        */
        timeZone?: number;
    }

    export interface NumberFormatOptions {
        /**
        * A character to use as the decimal marker. The default is a dot (.).
        * -
        *  default: . could also be , for fr-CA 
        */
        decimalSymbol?: string;
        /**
        * A number specifying how many digits to display after the decimal. 
        * The default is 2. If you specify more digits than the number contains, 
        * it will display zeros for the smaller values. Truncated values will be rounded (5 rounded up).
        */
        fractionDigits?: number; /* default: 2 */
        /**
        * A character to be used to group digits to the left of the decimal into sets of three. Default is a comma (,).
        */
        groupingSymbol?: string; /* default: , */
        /**
        * The text color for negative values. No default value. Values can be any acceptable HTML color value, such as "red" or "#FF0000".
        */
        negativeColor?: string;
        /**
        * A boolean, where true indicates that negative values should be surrounded by parentheses. Default is true.
        */
        negativeParens?: boolean;
        /**
        * A format string. When provided, all other options are ignored, except negativeColor.
        * -
        * The format string is a subset of the ICU pattern set. For instance, {pattern:'#,###%'} 
        * will result in output values "1,000%", "750%", and "50%" for values 10, 7.5, and 0.5.
        */
        pattern?: string;
        /**
        * A string prefix for the value, for example "$".
        */
        prefix?: string;
        /**
        * A string suffix for the value, for example "%".
        */
        suffix?: string;
    }

    export class ArrowFormat {
        /** 
        * Adds an up or down arrow to a numeric cell, depending on whether the value is above or below a 
        * specified base value. If equal to the base value, no arrow is shown.
        * -
        * @param options ArrowFormat supports the following options, passed in to the constructor:
        * - base: A number indicating the base value, used to compare against the cell value.If the cell 
        *   value is higher, the cell will include a green up arrow; if the cell value is lower, it will 
        *   include a red down arrow; if the same, no arrow.
        */
        constructor(options: ArrowFormatOptions);
        /**
        * Reformats the data in the specified column.
        *
        * @param DataTable - A DataTable containing the data to reformat. You cannot use a DataView here.
        * @param colIndex - The zero-based index of the column to format. To format multiple columns, 
        * you must call this method multiple times, with different colIndex values.

        */
        format(data: DataTable, colIndex: number): void; /* can't use DataView */
    }

    export class BarFormat {
        /** 
        * Adds a colored bar to a numeric cell indicating whether the cell value is above or below a specified base value.
        * -
        * @param options - BarFormat supports the following options, passed in to the constructor:
        * - base: A number that is the base value to compare the cell value against. If the cell value is 
        *   higher, it will be drawn to the right of the base; if lower, it will be drawn to the left. 
        *   Default value is 0.
        * - colorNegative: A string indicating the negative value section of bars. Possible values 
        *   are 'red', 'green' and 'blue'; default value is 'red'.
        * - colorPositive: A string indicating the color of the positive value section of bars. 
        *   Possible values are 'red', 'green' and 'blue'. Default is 'blue'.
        * - drawZeroLine: A boolean indicating if to draw a 1 pixel dark base line when negative values 
        *   are present. The dark line is there to enhance visual scanning of the bars. Default value is 'false'.
        * - max: The maximum number value for the bar range. Default value is the highest value in the table.
        * - min: The minimum number value for the bar range. Default value is the lowest value in the table.
        * - showValue: If true, shows values and bars; if false, shows only bars. Default value is true.
        * - width: Thickness of each bar, in pixels. Default value is 100.
        */
        constructor(options: BarFormatOptions);
        /**
        * Reformats the data in the specified column.
        * -
        * @param DataTable - A DataTable containing the data to reformat. You cannot use a DataView here.
        * @param colIndex - The zero-based index of the column to format. To format multiple columns, 
        * you must call this method multiple times, with different colIndex values.
        */
        format(DataTable: DataTable, colIndex: number): void; /* can't use DataView */
    }

    export class ColorFormat {
        /**
        *   Assigns colors to the foreground or background of a numeric cell, depending on the cell value. 
        * This formatter is an unusual, in that it doesn't take its options in the constructor. Instead, 
        * you should call addRange() or addGradientRange() as many times as you want, to add color ranges, 
        * before calling format(). Colors can be specified in any acceptable HTML format, 
        * for example "black", "#000000", or "#000".
        */
        constructor();
        /**
        * Specifies a foreground color and/or background color to a cell, depending on the cell value. 
        * Any cell with a value in the specified from—to range will be assigned color and bgcolor. It is 
        * important to realize that the range is non-inclusive, because creating a range from 1—1,000 
        * and a second from 1,000—2,000 will not cover the value 1,000!
        * -
        * @param from - [String, Number, Date, DateTime, or TimeOfDay] The lower boundary (inclusive) of 
        * the range, or null. If null, it will match -?. String boundaries are compared alphabetically 
        * against string values.
        * @param to - [String, Number, Date, DateTime, or TimeOfDay] The high boundary (non-inclusive) 
        * of the range, or null. If null, it will match +?. String boundaries are compared alphabetically 
        * against string values.
        * @param color - The color to apply to text in matching cells. Values can be either '#RRGGBB' 
        * values or defined color constants, (example: '#FF0000' or 'red').
        * @param bgcolor - The color to apply to the background of matching cells. Values can be either 
        * '#RRGGBB' values or defined color constants, (example: '#FF0000' or 'red').
        */
        addRange(from: any, to: any, color: string, bgcolor: string): void;
        /**
        * Assigns a background color from a range, according to the cell value. The color is scaled 
        * to match the cell's value within a range from a lower boundary color to an upper boundary color. 
        * Note that this method cannot compare string values, as addRange() can. Tip: Color ranges are often 
        * hard for viewers to gauge accurately; the simplest and easiest to read range is from a fully 
        * saturated color to white (e.g., #FF0000—FFFFFF).
        * -
        * @param from - [Number, Date, DateTime, or TimeOfDay] The lower boundary (inclusive) of the range, 
        * or null. If null, it will match minus infinity.
        * @param to - [Number, Date, DateTime, or TimeOfDay] The higher boundary (non-inclusive) of the range, 
        * or null. If null, it will match plus infinity.
        * @param color - The color to apply to text in matching cells. This color is the same for all cells, 
        * no matter what their value.
        * @param fromBgColor - The background color for cells holding values at the low end of the gradient. 
        * Values can be either '#RRGGBB' values or defined color constants, (example: '#FF0000' or 'red').
        * @param toBgColor - The background color for cells holding values at the high end of the gradient. 
        * Values can be either '#RRGGBB' values or defined color constants, (example: '#FF0000' or 'red').
        */
        addGradientRange(from: any, to: any, color: string, fromBgColor: string, toBgColor: string)
        /**
        * Reformats the data in the specified column.
        * -
        * @param dataTable - A DataTable containing the data to reformat. You cannot use a DataView here.
        * @param columnIndex - The zero-based index of the column to format. To format multiple columns, 
        * you must call this method multiple times, with different colIndex values.
        */
        format(dataTable: DataTable, columnIndex: number): void; /* can't use DataView */
    }

    export class DateFormat {
        /**
        * Formats a JavaScript Date value in a variety of ways, including 
        * "January 1, 2009," "1/1/09" and "Jan 1, 2009.
        * -
        * @param options - DateFormatter supports the following options, passed in to the constructor:
        * - formatType: A quick formatting option for the date. The following string values are supported, 
        *   reformatting the date February 28, 2008 as shown:
        *   'short' - Short format: e.g., "2/28/08"
            'medium' - Medium format: e.g., "Feb 28, 2008"
            'long' - Long format: e.g., "February 28, 2008"
        *   You cannot specify both formatType and pattern.
        * -
        * - pattern: A custom format pattern to apply to the value, similar to the ICU date and time format. 
        *   For example: var formatter3 = new google.visualization.DateFormat({pattern: "EEE, MMM d, ''yy"});
        *   You cannot specify both formatType and pattern.
        * More about date pattern:
        *   GG Era designator. (example: "AD") 
        *   yy or yyyy year. (example: 1996) 
        *   M Month in year. For January: M produces 1, MM produces 01, MMM produces Jan, 
        *     MMMM produces January (example: "July", "07")
        *   d  Day in month. Extra 'd' values will add leading zeros. (example: 10)
        *   h  Hour in 12 hour scale. Extra 'h' values will add leading zeros. (example: 12)
        *   H  Hour in 24 hour scale. Extra Hk' values will add leading zeros. (example: 0)
        *   m  Minute in hour. Extra 'M' values will add leading zeros. (example: 30)
        *   s  Second in minute. Extra 's' values will add leading zeros. (example: 55)
        *   S  Fractional second. Extra 'S' values will be padded on the right with zeros. (example: 978)
        *   E  Day of week. Following outputs for "Tuesday": E produces T, EE or EEE Produce Tu or Tues, 
        *      EEEE Produces Tuesday. (example: "Tues", "Tuesday")
        *   aa AM/PM (example: "PM")
        *   k  Hour in day (1~24). Extra 'k' values will add leading zeros. (example: 24)
        *   K  Hour in AM/PM (0~11). Extra 'k' values will add leading zeros. (example: 0)
        *   z  Time zone. For time zone 5, produces "UTC+5" (example: "UTC+5")
        *   Z  Time zone in RFC 822 format. For time zone -5: Z, ZZ, ZZZ produce -0500, ZZZZ and more 
        *      produce "GMT -05:00" (example: "-0800" "GMT -05:00")
        *   v  Time zone (generic).  (example: "Etc/GMT-5") 
        *   '  escape for text  (example: 'Date=')
        *   ''  single quote  (example: ''yy)
        * -
        * - timeZone: The time zone in which to display the date value. 
        *   This is a numeric value, indicating GMT + this number of time zones (can be negative). 
        *   Date object are created by default with the assumed time zone of the computer on which 
        *   they are created; this option is used to display that value in a different time zone. 
        *   For example, if you created a Date object of 5pm noon on a computer located in Greenwich, England,
        *   and specified timeZone to be -5 (options['timeZone'] = -5, or Eastern Pacific Time in the US), 
        *   the value displayed would be 12 noon.
        */
        constructor(options: DateFormatOptions);
        /**
       * Reformats the data in the specified column.
       * -
       * @param dataTable - A DataTable containing the data to reformat. You cannot use a DataView here.
       * @param columnIndex - The zero-based index of the column to format. To format multiple columns, 
       you must call this method multiple times, with different colIndex values.
       */
        format(dataTable: DataTable, columnIndex: number): void; /* can't use DataView */
        /**
        * @param value - Returns the formatted value of a given value. This method does not require a DateTable.
        */
        formatValue(value: any): string;
    }

    export class NumberFormat {
        /**
        * Describes how numeric columns should be formatted. Formatting options include specifying 
        * a prefix symbol (such as a dollar sign) or the punctuation to use as a thousands marker.
        * -
        * NumberFormat supports the following options, passed in to the constructor:
        * -
        * @param options - 
        *   'decimalSymbol' - A character to use as the decimal marker. The default is a dot (.).
        *   'fractionDigits' - A number specifying how many digits to display after the decimal. 
        *       The default is 2. If you specify more digits than the number contains, it will display zeros 
        *       for the smaller values. Truncated values will be rounded (5 rounded up).
        *   'groupingSymbol' - A character to be used to group digits to the left of 
        *       the decimal into sets of three. Default is a comma (,).  
        *   'negativeColor' - The text color for negative values. No default value. 
        *       Values can be any acceptable HTML color value, such as "red" or "#FF0000". 
        *   'negativeParens' - A boolean, where true indicates that negative values 
        *       should be surrounded by parentheses. Default is true. 
        *   'pattern' -A format string. When provided, all other options are ignored, 
        *       except negativeColor. The format string is a subset of the ICU pattern set. 
        *       For instance, {pattern:'#,###%'} will result in output values "1,000%", "750%", and "50%" 
        *       for values 10, 7.5, and 0.5.
        *   'prefix' A string prefix for the value, for example "$". 
        *   'suffix' A string suffix for the value, for example "%". 
        */
        constructor(options: NumberFormatOptions);
        /**
       * Reformats the data in the specified column.
       * -
       * @param dataTable - A DataTable containing the data to reformat. You cannot use a DataView here.
       * @param columnIndex - The zero-based index of the column to format. To format multiple columns, 
       * you must call this method multiple times, with different colIndex values.
       */
        format(dataTable: DataTable, columnIndex: number): void; /* can't use DataView */
        /**
        * @param value - Returns the formatted value of a given value. This method does not require a DateTable.
        */
        formatValue(value): string;
    }

    export class PatternFormat {
        constructor(pattern: string);
        /**
       * Enables you to merge the values of designated columns into a single column, along with arbitrary text. 
       * So, for example, if you had a column for first name and a column for last name, you could populate a 
       * third column with {last name}, {first name}. This formatter does not follow the conventions for the 
       * constructor and the format() method. See the Methods section below for instructions.
       * -
       * Reformats the data in the specified column.
       * -
       * @param dataTable - The DataTable on which to operate. A DataTable containing the data to reformat. 
       * You cannot use a DataView here.
       * @param srcColumnIndices - An array of one or more (zero-based) column indices to pull as the sources 
       * from the underlying DataTable. This will be used as a data source for the pattern parameter in the 
       * constructor. The column numbers do not have to be in sorted order.
       * @param opt_dstColumnIndex - [optional] The destination column to place the output of the pattern 
       * manipulation. If not specified, the first element in srcColumIndices will be used as the destination.
       */
        format(dataTable: DataTable, srcColumnIndices: Array<number>, opt_dstColumnIndex?: number): void; /* can't use DataView */
    }

} 