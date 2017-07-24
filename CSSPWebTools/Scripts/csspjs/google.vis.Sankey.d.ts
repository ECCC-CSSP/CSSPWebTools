/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface SankeyOptions {
        /**
        * Whether the chart throws user-based events or reacts to user interaction. 
        * If false, the chart will not throw 'select' or other interaction-based events (but will throw ready or error events), 
        * and will not display hovertext or otherwise change depending on user input.
        * Default: true
        */
        enableInteractivity?: boolean;
        /**
        * Draws the chart inside an inline frame. (Note that on IE8, this option is ignored; all IE8 charts are drawn in i-frames.)
        * -
        * Default: false
        */
        forceIFrame?: boolean;
        /**
        * Height of the chart, in pixels.
        * -
        * Default: height of the containing element
        */
        height?: number;
        /**
        * sankey obj type is:
        * 
        */
        sankey?: sankey;
        /**
        * Width of the chart, in pixels.
        * -
        * Default: width of the containing element
        */
        width?: number;

    }

    export class Sankey {
        /**
        * A sankey diagram is a visualization used to depict a flow from one set of values to another. The things being connected are called nodes and the connections are called links. Sankeys are best used when you want to show a many-to-many mapping between two domains (e.g., universities and majors) or multiple paths through a set of stages (for instance, Google Analytics uses sankeys to show how traffic flows from pages to other pages on your web site).
        * 
        * For the curious, they're named after Captain Sankey, who created a diagram of steam engine efficiency that used arrows having widths proportional to heat loss.
        * 
        * The sankey chart may be undergoing substantial revisions in future Google Charts releases.
        * 
        * Sankey diagrams are rendered in the browser using SVG or VML, whichever is appropriate for the user's browser. Like all Google charts, sankey diagrams display tooltips when the user hovers over the data. Google's sankey layout code is derived from D3's sankey layout code.
        * -
        * The google.load package name is "sankey":
        * -
        *   google.load("visualization", "1", {packages: ["sankey"]});
        * The visualization's class name is google.visualization.Sankey:
        * -
        *   var visualization = new google.visualization.Sankey(container);
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataTable object holding all the data
        * @param options SankeyOptions holding all the non default setup
        */
        draw(data: DataTable, options?: SankeyOptions): void;
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataView object holding all the data
        * @param options SankeyOptions holding all the non default setup
        */
        draw(data: DataView, options?: SankeyOptions): void;
        /**
        * Returns an object containing the left, top, width, and height of chart element id. The format for id isn't yet documented (they're the return values of event handlers), but here are some examples:
        * -
        *  var cli = chart.getChartLayoutInterface();
        * -
        * Height of the chart area
        * cli.getBoundingBox('chartarea').height
        * Width of the third bar in the first series of a bar or column chart
        * cli.getBoundingBox('bar#0#2').width
        * Bounding box of the fifth wedge of a pie chart
        * cli.getBoundingBox('slice#4')
        * Bounding box of the chart data of a vertical (e.g., column) chart:
        * cli.getBoundingBox('vAxis#0#gridline')
        * Bounding box of the chart data of a horizontal (e.g., bar) chart:
        * cli.getBoundingBox('hAxis#0#gridline')
        * Values are relative to the container of the chart. Call this after the chart is drawn.
        */
        getBoundingBox(id): boundingBox;
        /**
        * Standard getSelection() implementation. Selected elements are cell elements. Only one cell can be selected at a time by the user.
        * Returns: Array of selection elements
        */
        getSelection(): Array<any>;
        /**
        * Selects the specified chart entities. Cancels any previous selection. Selectable entities are points, annotations, legend entries and categories. 
        * A point or annotation correlates to a cell in the data table, a legend entry to a column (row index is null), 
        * and a category to a row (column index is null). For this chart, only one entity can be selected at a time. Extended description.
        */
        setSelection(): void;
        /**
        * Clears the chart, and releases all of its allocated resources.
        */
        clearChart(): void;

        // ---------------------------------
        // events
        // ---------------------------------

        /**
        * Fired when an error occurs when attempting to render the chart.
        * -
        * @param id 
        * @param message
        */
        error(id: string, message: string);
        /**
        * Fired when the user mouses over a visual entity. Passes back the row and column indices of the corresponding data table element. 
        * A point or annotation correlates to a cell in the data table, a legend entry to a column (row index is null), and a category to a row (column index is null).
        * -
        * @param row
        * @param column
        */
        onmouseover(row: number, column: number);
        /**
        * Fired when the user mouses away from a visual entity. Passes back the row and column indices of the corresponding data table element. 
        * A point or annotation correlates to a cell in the data table, a legend entry to a column (row index is null), and a category to a row (column index is null).
        * -
        * @param row
        * @param column
        */
        onmouseout(row: number, column: number);
        /**
        * The chart is ready for external method calls. If you want to interact with the chart, and call methods after you draw it, 
        * you should set up a listener for this event before you call the draw method, and call them only after the event was fired.
        */
        ready();
        /**
        * Fired when the user clicks a visual entity. To learn what has been selected, call getSelection().
        */
        select();

    }

    export interface sankey {
        /**
        *  With multilevel sankeys, it's sometimes nonobvious where nodes should be placed for optimal readability. 
        * The D3 layout engine experiments with different node layouts, stopping when sankey.iterations attempts have been made. 
        * The larger this number, the more pleasing the layout of complex sankeys, but it comes with a cost: the sankeys will take longer to render. 
        * Conversely, the shorter this number, the quicker your charts will render.
        * -
        * Default: 32
        */
        iterations?: number;
        /**
        *  Controls attributes of the connections between nodes. Currently all attributes pertain to color:
        *    sankey: {
        *      link: {
        *        color: {
        *          fill: '#efd',     // Color of the link.
        *          fillOpacity: 0.8, // Transparency of the link.
        *          stroke: 'black'   // Color of the link border.
        *          strokeWidth: 1    // Thickness of the link border (default 0).
        *        }
        *      }
        *    }
        * -
        * Default: null
        */
        link?: link;
        /**
        *  Controls attributes of the nodes (the vertical bars between links):
        *    sankey: {
        *      node: {
        *        label: {
        *          fontName: 'Times-Roman',
        *          fontSize: 12,
        *          color: '#000',
        *          bold: true,
        *          italic: false
        *        },
        *        labelPadding: 6, // Horizontal distance between the label and the node.
        *        nodePadding: 10, // Vertical distance between nodes.
        *        width: 5         // Thickness of the node.
        *      }
        *    }
        * -
        * Default: null
        */
        node?: node;
    }

    export interface link {
        color?: color;
    }

    export interface color {
        /**
        * Color of the link
        */
        fill?: string;
        /**
        * Transparency of the link.
        */
        fillOpacity?: number;
        /**
        * Color of the link border.
        */
        stroke?: string;
        /**
        * Thickness of the link border (default 0)
        */
        strokeWidth?: number;
    }

    export interface node {
        label?: label;
        /**
        * Horizontal distance between the label and the node.
        */
        labelPadding?: number;
        /**
        * Vertical distance between nodes.
        */ 
        nodePadding?: number; 
        /**
        * Thickness of the node.
        */
        width?: number
    }

    export interface label {
        /**
        *
        */
        fontName?: string;
        fontSize?: number;
        color?: string;
        bold?: boolean;
        italic?: boolean;
        }
}              