/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface gradient {
        /**
        * Start color for gradient.
        */
        color1?: string;
        /**
        * Finish color for gradient.
        */
        color2?: string;
        /**
        * Where on the boundary to start and end the color1/color2 gradient, relative to the upper left corner of the boundary.
        */
        x1?: string;
        /**
        * Where on the boundary to start and end the color1/color2 gradient, relative to the upper left corner of the boundary.
        */
        x2?: string;
        /**
        * Where on the boundary to start and end the color1/color2 gradient, relative to the upper left corner of the boundary.
        */
        y1?: string;
        /**
        * Where on the boundary to start and end the color1/color2 gradient, relative to the upper left corner of the boundary.
        */
        y2?: string;
        /**
        * If true, the boundary for x1, y1, x2, and y2 is the box. If false, it's the entire chart.
        */
        useObjectBoundingBoxUnits?: boolean
    }

    export interface boxStyle {
        /**
        * Color of the box outline.
        */
        stroke?: string;
        /**
        * Thickness of the box outline.
        */
        strokeWidth?: number;
        /**
        * x-radius of the corner curvature.
        */
        rx?: number;
        /**
        * y-radius of the corner curvature.
        */
        ry?: number;
        /**
        * Attributes for linear gradient fill.
        */
        gradient?: gradient;
    }

    export interface textStyle {
        /**
        * Font name ex: 'Times-Roman'
        */
        fontName?: string;
        /**
        * Font size
        */
        fontSize?: number;
        /**
        * Show as bold if true
        */
        bold?: boolean;
        /**
        * Show as italic if true
        */
        italic?: boolean;
        /**
        * The color of the text.
        */
        color?: string;
        /**
        * The color of the text outline.
        */
        auraColor?: string;
        /**
        * The transparency of the text.
        */
        opacity?: number;
    }

    export interface animation {
        /**
        * The duration of the animation, in milliseconds. For details, see the animation doc.
        * Default: 0
        */
        duration?: number;
        /**
        * The easing function applied to the animation. The following options are available:
        * 'linear' - Constant speed.
        * 'in' - Ease in - Start slow and speed up.
        * 'out' - Ease out - Start fast and slow down.
        * 'inAndOut' - Ease in and out - Start slow, speed up, then slow down.
        * -
        * Default: 'linear'
        */
        easing?: string;
        /**
        * For charts that support annotations, the annotations.boxStyle object controls the appearance of the boxes surrounding annotations:
        * -
        * var options = {
        *   annotations: {
        *     boxStyle: {
        *       stroke: '#888',           // Color of the box outline.
        *       strokeWidth: 1,           // Thickness of the box outline.
        *       rx: 10,                   // x-radius of the corner curvature.
        *       ry: 10,                   // y-radius of the corner curvature.
        *       gradient: {               // Attributes for linear gradient fill.
        *         color1: '#fbf6a7',      // Start color for gradient.
        *         color2: '#33b679',      // Finish color for gradient.
        *         x1: '0%', y1: '0%',     // Where on the boundary to start and end the
        *         x2: '100%', y2: '100%', // color1/color2 gradient, relative to the
        *                                 // upper left corner of the boundary.
        *         useObjectBoundingBoxUnits: true // If true, the boundary for x1, y1,
        *                                         // x2, and y2 is the box. If false,
        *                                         // it's the entire chart.
        *       }
        *     }
        *   }
        * };
        * -
        * Default: null
        * -
        * This option is currently supported for area, bar, column, combo, line, and scatter charts. It is not supported by the Annotation Chart.
        */
        boxStyle?: boxStyle;
        /**
        * For charts that support annotations, the annotations.textStyle object controls the appearance of the text of the annotation:
        * -
        * var options = {
        *   annotations: {
        *     textStyle: {
        *       fontName: 'Times-Roman',
        *       fontSize: 18,
        *       bold: true,
        *       italic: true,
        *       color: '#871b47',     // The color of the text.
        *       auraColor: '#d799ae', // The color of the text outline.
        *       opacity: 0.8          // The transparency of the text.
        *     }
        *   }
        * };
        * -
        * This option is currently supported for area, bar, column, combo, line, and scatter charts. It is not supported by the Annotation Chart.
        */
        textStyle?: textStyle;
    }

} 