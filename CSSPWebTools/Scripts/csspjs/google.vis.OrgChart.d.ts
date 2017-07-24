/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface OrgChartOptions {
        /**
        * Determines if double click will collapse a node.
        * -
        * Default: false
        */
        allowCollapse?: boolean;
        /**
        * If set to true, any annotation text that includes HTML tags will be rendered as HTML.
        * -
        * Default: false
        */
        allowHtml?: boolean;
        /**
        * A class name to assign to node elements. Apply CSS to this class name to specify colors or styles for the chart elements.
        * -
        * Default: default class name
        */
        nodeClass?: string;
        /**
        * A class name to assign to selected node elements. Apply CSS to this class name to specify colors or styles for selected chart elements.
        * -
        * Default: default class name
        */
        selectedNodeClass?: string;
        /**
        * 'small', 'medium' or 'large'
        * -
        * Default: 'medium'
        */
        size?: string; 
    }

    export class OrgChart {
        /**
        * Org charts are diagrams of a hierarchy of nodes, commonly used to portray superior/subordinate relationships in an organization. A family tree is a type of org chart.
        * -
        * The google.load package name is 'orgchart'
        * -
        *   google.load('visualization', '1', {packages: ['orgchart']});
        * The visualization's class name is google.visualization.OrgChart
        * -
        *   var visualization = new google.visualization.OrgChart(container);
        * -
        * A table with three string string columns, where each row represents a node in the orgchart. Here are the three columns:
        * -
        * Column 0 - The node ID. It should be unique among all nodes, and can include any characters, including spaces. This is shown on the node. You can specify a formatted value to show on the chart instead, but the unformatted value is still used as the ID.
        * Column 1 - [optional] The ID of the parent node. This should be the unformatted value from column 0 of another row. Leave unspecified for a root node.
        * Column 2 - [optional] Tool-tip text to show, when a user hovers over this node.
        * Each node can have zero or one parent node, and zero or more child nodes.
        * -
        * Custom Properties
        * -
        * You can assign the following custom properties to data table elements, using the setProperty() method of DataTable:
        * selectedStyle: applied to row - An inline style string to assign to a specific node when selected. You must set the option allowHtml=true for this to work, and it must be set before calling draw() on the visualization. This overrides the selectionColor option for the specified node.
        *       Example:   myDataTable.setRowProperty(2, 'selectedStyle', 'background-color:#00FF00');
        * style: applied to row - An inline style string to assign to a specific node. This is overridden by the selectedStyle property. You must set the option allowHtml=true for this to work, and it must be set before calling draw() on the visualization. This overrides the color option for the specified node.
        *       Example:  myDataTable.setRowProperty(3, 'style', 'border: 1px solid green');
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Collapses or expands the node.
        * @param row Index of the row to expand or collapse.
        * @param collapsed Whether to collapse or expand the row, where true means collapse.
        */
        collapse(row: number, collapsed: boolean): void;
        /**
        * Draws the chart.
        * -
        * data ex:
        * [
        *   [{v:'Mike', f:'Mike<div style="color:red; font-style:italic">President</div>'}, '', 'The President'],
        *   [{v:'Jim', f:'Jim<div style="color:red; font-style:italic">Vice President</div>'}, 'Mike', 'VP'],
        *   ['Alice', 'Mike', ''],
        *   ['Bob', 'Jim', 'Bob Sponge'],
        *   ['Carol', 'Bob', '']
        * ]
        */
        draw(data: DataTable, options?: OrgChartOptions): void;
        /**
        * Draws the chart.
        * -
        * data ex:
        * [
        *   [{v:'Mike', f:'Mike<div style="color:red; font-style:italic">President</div>'}, '', 'The President'],
        *   [{v:'Jim', f:'Jim<div style="color:red; font-style:italic">Vice President</div>'}, 'Mike', 'VP'],
        *   ['Alice', 'Mike', ''],
        *   ['Bob', 'Jim', 'Bob Sponge'],
        *   ['Carol', 'Bob', '']
        * ]
        */
        draw(data: DataView, options?: OrgChartOptions): void;
        /**
        * Return: an array with the indexes of the children of the given node.
        */
        getChildrenIndexes(row: number): Array<number>;
        /**
        * Return: an array with the list of the collapsed node's indexes.
        */
        getCollapsedNodes(row: number): Array<number>;
        /**
        * Standard getSelection() implementation. Selection elements are all row elements. Can return more than one selected row.
        * -
        * Return: Array of selection elements
        */
        getSelection(): Array<any>;
        /**
        * Standard setSelection() implementation. Treats every selection entry as a row selection. Supports selection of mutiple rows.
        */
        setSelection(selection: any): void

        // -------------------------------------------
        // events
        // -------------------------------------------

        /**
        * Event triggered when allowCollapse is set to true and the user double clicks on a node with children.
        * -
        * @param collapsed A boolean indicating whether this is a 'collapse' or 'expand' event.
        * -
        * @param row The zero-based index of the row in the data table, corresponding to the node being clicked.
        */
        collapse(collapsed: boolean, row: number);
        /**
        * Triggered when the user hovers over a specific row.
        * -
        * @param row The zero-based index of the row in the data table, corresponding to the node being moused over.
        */
        onmouseover(row: number);
        /**
        * Triggered when the user hovers out of a row.
        * -
        * @param row The zero-based index of the row in the data table, corresponding to the node being moused out from.
        */
        onmouseout(row: number);
        /**
        * The chart is ready for external method calls. If you want to interact with the chart, and call methods after you draw it, you should set up a listener for this event before you call the draw method, and call the methods only after the event is fired.
        */
        ready();
        /**
        * Standard select event
        */
        select();

    }


}            