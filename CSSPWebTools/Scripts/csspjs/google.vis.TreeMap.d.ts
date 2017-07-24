/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export class TreeMap {
        /**
        * A visual representation of a data tree, where each node can have zero or more children, and one parent (except for the root, which has no parents). 
        * Each node is displayed as a rectangle, sized and colored according to values that you assign. Sizes and colors are valued relative to 
        * all other nodes in the graph. You can specify how many levels to display simultaneously, and optionally to display deeper levels in 
        * a hinted fashion. If a node is a leaf node, you can specify a size and color; if it is not a leaf, it will be displayed as a bounding 
        * box for leaf nodes. The default behavior is to move down the tree when a user left-clicks a node, and to move back up the tree when a user right-clicks the graph.
        * -
        * The total size of the graph is determined by the size of the containing element that you insert in your page. 
        * If you have leaf nodes with names too long to show, the name will be truncated with an ellipsis (...).
        * -
        * The google.load package name is "treemap".
        * -
        *   google.load("visualization", "1", {packages: ["treemap"]});
        * -
        * The visualization's class name is google.visualization.TreeMap.
        * -
        *   var visualization = new google.visualization.TreeMap(container);
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the chart.
        * -
        * Data format:
        * Each row in the data table describes one node (a rectangle in the graph). Each node (except the root node) has one or more parent nodes. 
        * Each node is sized and colored according to its values relative to the other nodes currently shown.
        * -
        * The data table should have four columns in the following format:
        * -
        * Column 0 - [string] An ID for this node. It can be any valid JavaScript string, including spaces, 
        *       and any length that a string can hold. This value is displayed as the node header.
        * Column 1 - [string] - The ID of the parent node. If this is a root node, leave this blank. Only one root is allowed per treemap.
        * Column 2 - [number] - The size of the node. Any positive value is allowed. This value determines the size of the node, 
        *       computed relative to all other nodes currently shown. For non-leaf nodes, this value is ignored and calculated from the size of all its children.
        * Column 3 - [optional, number] - An optional value used to calculate a color for this node. Any value, positive or negative, 
        * is allowed. The color value is first recomputed on a scale from minColorValue to maxColorValue, 
        * and then the node is assigned a color from the gradient between minColor and maxColor.
        */
        draw(data: DataTable, opt?: TreeMapOptions): void;
        /**
        * Draws the chart.
        * -
        * Data format:
        * Each row in the data table describes one node (a rectangle in the graph). Each node (except the root node) has one or more parent nodes. 
        * Each node is sized and colored according to its values relative to the other nodes currently shown.
        * -
        * The data table should have four columns in the following format:
        * -
        * Column 0 - [string] An ID for this node. It can be any valid JavaScript string, including spaces, 
        *       and any length that a string can hold. This value is displayed as the node header.
        * Column 1 - [string] - The ID of the parent node. If this is a root node, leave this blank. Only one root is allowed per treemap.
        * Column 2 - [number] - The size of the node. Any positive value is allowed. This value determines the size of the node, 
        *       computed relative to all other nodes currently shown. For non-leaf nodes, this value is ignored and calculated from the size of all its children.
        * Column 3 - [optional, number] - An optional value used to calculate a color for this node. Any value, positive or negative, 
        * is allowed. The color value is first recomputed on a scale from minColorValue to maxColorValue, 
        * and then the node is assigned a color from the gradient between minColor and maxColor.
        */
        draw(data: DataView, opt?: TreeMapOptions): void;
        /**
        * Standard getSelection() implementation. Selected elements are nodes. Only one node can be selected at a time.
        * -
        * Returns an array of selected Element
        */
        getSelection(): any;
        /**
        * Standard setSelection() implementation. Selected elements are nodes. Only one node can be selected at a time.
        */
        setSelection(): void;
        /**
        * Move up the tree by one level and redraw it. Does not throw an error if the node is the root node. 
        * This is fired automatically when the user right-clicks a node.
        */
        goUpAndDraw(): void;
        /**
        * Returns the maximum possible depth for the current view.
        */
        getMaxPossibleDepth(): void;
        /**
        * Clears the chart, and releases all of its allocated resources.
        */
        clearChart(): void;

        // --------------------------------------------------------
        // Event
        // --------------------------------------------------------

        /**
        * Fired when the user mouses over a node. The event handler is passed the row index of the corresponding entry in the data table.
        * -
        * @param row The row index of the corresponding entry in the data table
        */
        onmouseover(row: number);
        /**
        * Fired when the user mouses out of a node. The event handler is passed the row index of the corresponding entry in the data table.
        * -
        * @param row The row index of the corresponding entry in the data table
        */
        onmouseout(row: number);
        /**
        * Fired when chart is ready for external method calls. If you want to interact with the chart, 
        * and call methods after you draw it, you should set up a listener for this event 
        * before you call the draw method, and call them only after the event was fired
        */
        ready();
        /**
        * Fired when the user navigates back up the tree, typically by right-clicking. 
        * The row property passed into the event handler is the row of the node that the 
        * user is navigating from, not the row the user is navigating to.
        */
        rollup(row: number);
        /**
        * Fired when the user clicks a node. To learn which node was selected, call getSelection().
        */
        select();

    }

    export interface TreeMapOptions {
        /**
        * The text color. Specify an HTML color value.
        * -
        * Default: '#ffffff'
        */
        fontColor?: string;
        /**
        * The font family to use for all text.
        * -
        * Default: 'auto'
        */
        fontFamily?: string;
        /**
        * The font size for all text, in points.
        * -
        * Default: 12
        */
        fontSize?: number;
        /**
        * Draws the chart inside an inline frame. (Note that on IE8, this option is ignored; all IE8 charts are drawn in i-frames.)
        * -
        * Default: false
        */
        forceIFrame?: boolean;
        /**
        * The color of the header section for each node. Specify an HTML color value.
        * -
        * Default: '#988f86'
        */
        headerColor?: string;
        /**
        * The height of the header section for each node, in pixels (can be zero).
        * -
        * Default: 0
        */
        headerHeight?: number;
        /**
        * The color of the header of a node being hovered over. 
        * Specify an HTML color value or null; if null this value will be headerColor lightened by 35%.
        * -
        * Default: null
        */
        headerHighlightColor?: string;
        /**
        * When maxPostDepth is greater than 1, causing nodes below the current depth to be shown, 
        * hintOpacity specifies how transparent it should be. 
        * It should be between 0 and 1; the higher the value, the fainter the node.
        * -
        * Allowable value: 0.0 - 1.0
        * Default: 0.0
        */
        hintOpacity?: number;
        /**
        * The color for a rectangle with a column 3 value of maxColorValue. Specify an HTML color value.
        * -
        * Default: '#00dd00'
        */
        maxColor?: string;
        /**
        * The maximum number of node levels to show in the current view. Levels will be flattened into the current plane. 
        * If your tree has more levels than this, you will have to go up or down to see them. 
        * You can additionally see maxPostDepth levels below this as shaded rectangles within these nodes.
        * -
        * Default: 1
        */
        maxDepth?: number;
        /**
        * The highlight color to use for the node with the largest value in column 3. 
        * Specify an HTML color value or null; If null, this value will be the value of maxColor lightened by 35%
        * - 
        * Default: null
        */
        maxHighlightColor?: string;
        /**
        * How many levels of nodes beyond maxDepth to show in "hinted" fashion. 
        * Hinted nodes are shown as shaded rectangles within a node that is within the maxDepth limit.
        * -
        * Default: 0
        */
        maxPostDepth?: number;
        /**
        * The maximum value allowed in column 3. All values greater than this will be trimmed to this value. 
        * If set to null, it will be set to the max value in the column.
        * -
        * Default: 0
        */
        maxColorValue?: number;
        /**
        * The color for a rectangle with a column 3 value midway between maxColorValue and minColorValue. 
        * Specify an HTML color value.
        * - 
        * Default: '#000000'
        */
        midColor?: string;
        /**
        * The highlight color to use for the node with a column 3 value near the median of minColorValue and maxColorValue. 
        * Specify an HTML color value or null; if null, this value will be the value of midColor lightened by 35%.
        * -
        * Default: null
        */
        midHighlightColor?: string;
        /**
        * The color for a rectangle with the column 3 value of minColorValue. Specify an HTML color value.
        * -
        * Default: '#dd0000'
        */
        minColor?: string;
        /**
        * The highlight color to use for the node with a column 3 value nearest to minColorValue. 
        * Specify an HTML color value or null; if null, this value will be the value of minColor lightened by 35%
        * -
        * Default: null
        */
        minHighlightColor?: string;
        /**
        * The minimum value allowed in column 3. All values less than this will be trimmed to this value. 
        * If set to null, it will be calculated as the minimum value in the column.
        * -
        * Default: null
        */
        minColorValue?: number;
        /**
        * The color to use for a rectangle when a node has no value for column 3, and that node is a leaf (or contains only leaves). 
        * Specify an HTML color value.
        * -
        * Default: '#000000'
        */
        noColor?: string;
        /**
        * The color to use for a rectangle of "no" color when highlighted. 
        * Specify an HTML color value or null; if null, this will be the value of noColor lightened by 35%.
        * -
        * Default: null
        */
        noHighlightColor?: string;
        /**
        * Whether or not to show a color gradient scale from minColor to maxColor along the top of the chart. Specify true to show the scale.
        * - 
        * Default: false
        */ 
        showScale?: boolean;
        /**
        * Whether to show tooltips.
        * -
        * Default: true
        */
        showTooltips?: boolean;
        /**
        * An object that specifies the text style, for certain charts that have text in the content area such as the treemap. The object has this format:
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
        textStyle?: textStyle;
        /**
        * Text to display above the chart.
        * -
        * Default: no title
        */
        title?: string;
        /**
        * An object that specifies the title text style. The object has this format:
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
        * Whether to use weighted averages for aggregation.
        * -
        * Default: false
        */
        useWeightedAverageForAggregation?: boolean;

    }

}                   