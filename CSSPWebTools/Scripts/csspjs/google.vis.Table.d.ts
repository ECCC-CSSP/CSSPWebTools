/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface TableOptions {
        /**
        * If set to true, any annotation text that includes HTML tags will be rendered as HTML.
        * Default: false
        */
        allowHtml?: boolean;
        /**
        * Determines if alternating color style will be assigned to odd and even rows.
        * -
        * Default: true
        */
        alternatingRowStyle?: boolean;
        /**
        * An object in which each property name describes a table element, and the property value is a string, 
        * defining a class to assign to that table element. Use this property to assign custom CSS to specific elements of your table. 
        * To use this property, assign an object, where the property name specifies the table element, and the property value is a string, 
        * specifying a class name to assign to that element. You must then define a CSS style for that class on your page. The following property names are supported:
        * 
        * headerRow - Assigns a class name to the table header row (<tr> element).
        * tableRow - Assigns a class name to the non-header rows (<tr> elements).
        * oddTableRow - Assigns a class name to odd table rows (<tr> elements). Note: the alternatingRowStyle option must be set to true.
        * selectedTableRow - Assigns a class name to the selected table row (<tr> element).
        * hoverTableRow - Assigns a class name to the hovered table row (<tr> element).
        * headerCell - Assigns a class name to all cells in the header row (<td> element).
        * tableCell - Assigns a class name to all non-header table cells (<td> element).
        * rowNumberCell - Assigns a class name to the cells in the row number column (<td> element). Note: the showRowNumber option must be set to true.
        * Example: var cssClassNames = {headerRow: 'bigAndBoldClass', hoverTableRow: 'highlightClass'};
        */
        cssClassNames?: cssClassNames;
        /**
        * The row number for the first row in the dataTable. Used only if showRowNumber is true.
        * -
        * Default: 1
        */
        firstRowNumber?: number;
        /**
        * Sets the height of the visualization's container element. You can use standard HTML units (for example, '100px', '80em', '60'). 
        * If no units are specified the number is assumed to be pixels. If not specified, the browser will set the width automatically to fit the table; 
        * if set smaller than the size required by the table, will add a vertical scroll bar.
        * -
        * Default: automatic
        */
        height?: string;
        /**
        * If and how to enable paging through the data. Choose one of the following string values:
        * -
        * 'enable' - The table will include page-forward and page-back buttons. 
        *       Clicking on these buttons will perform the paging operation and change the displayed page. You might want to also set the pageSize option.
        * 'event' - The table will include page-forward and page-back buttons, but clicking them will trigger a 'page' event 
        *       and will not change the displayed page. This option should be used when the code implements its own page turning logic. 
        *       See the TableQueryWrapper example for an example of how to handle paging events manually.
        * 'disable' - [Default] Paging is not supported.
        * -
        * Default: 'disable'
        */
        page?: string;
        /**
        * The number of rows in each page, when paging is enabled with the page option.
        * -
        * Default: 10
        */
        pageSize?: number;
        /**
        * Adds basic support for right-to-left languages (such as Arabic or Hebrew) by reversing the column order of the table, 
        * so that column zero is the rightmost column, and the last column is the leftmost column. 
        * This does not affect the column index in the underlying data, only the order of display. 
        * Full bi-directional (BiDi) language display is not supported by the table visualization even with this option. 
        * This option will be ignored if you enable paging (using the page option), or if the table has scroll bars because you have 
        * specified height and width options smaller than the required table size.
        * - 
        * Default: false
        */
        rtlTable?: boolean;
        /**
        * Sets the horizontal scrolling position, in pixels, if the table has horizontal scroll bars because you have set the width property. 
        * The table will open scrolled that many pixels past the leftmost column. T
        * -
        * Default: 0
        */
        scrollLeftStartPosition?: number;
        /**
        * If set to true, shows the row number as the first column of the table.
        * -
        * Default: false
        */
        showRowNumber?: boolean;
        /**
        * If and how to sort columns when the user clicks a column heading. If sorting is enabled, consider setting the 
        * sortAscending and sortColumn properties as well. Choose one of the following string values:
        * -
        * 'enable' - [Default] Users can click on column headers to sort by the clicked column. 
        *       When users click on the column header, the rows will be automatically sorted, and a 'sort' event will be triggered.
        * 'event' - When users click on the column header, a 'sort' event will be triggered, but the rows will not be automatically sorted. 
        *       This option should be used when the page implements its own sort. 
        *       See the TableQueryWrapper example for an example of how to handle sorting events manually.
        * 'disable' - Clicking a column header has no effect.
        */
        sort?: string;
        /**
        * The order in which the initial sort column is sorted. True for ascending, false for descending. Ignored if sortColumn is not specified.
        * -
        * Default: true
        */
        sortAscending?: boolean;
        /**
        * An index of a column in the data table, by which the table is initially sorted. The column will be marked with a small arrow indicating the sort order.
        * -
        * Default: -1
        */
        sortColumn?: number;
        /**
        * The first table page to display. Used only if page is in mode enable/event.
        * -
        * Default: 0
        */
        startPage?: number;
        /**
        * Sets the width of the visualization's container element. You can use standard HTML units (for example, '100px', '80em', '60'). 
        * If no units are specified the number is assumed to be pixels. If not specified, the browser will set the width automatically to fit the table; 
        * if set smaller than the size required by the table, will add a horizontal scroll bar.
        * -
        * Default: automatic
        */
        width?: string;
    }

    export class Table {
        /**
        * A table that can be sorted and paged. Table cells can be formatted using format strings, or by directly inserting HTML as cell values. 
        * Numeric values are right-aligned; boolean values are displayed as check marks. Users can select single rows either with the keyboard or the mouse. 
        * Users can sort rows by clicking on column headers. The header row remains fixed as the user scrolls. 
        * The table fires a number of events corresponding to user interaction.
        * -
        * The google.load package name is "table"
        * -
        *   google.load('visualization', '1', {packages: ['table']});
        * The visualization's class name is google.visualization.Table
        * -
        *   var visualization = new google.visualization.Table(container);
        * -
        * The DataTable is converted into a corresponding HTML table, with each row/column in the DataTable converted 
        * into a row/column in the HTML table. Each column must be of the same data type, and all 
        * standard visualization data types are supported (string, boolean, number, etc).
        */
        constructor(htmlElem: HTMLElement);
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataTable object holding all the data
        * @param options TableOptions holding all the non default setup
        */
        draw(data: DataTable, options?: TableOptions): void;
        /**
        * Draws the chart. The chart accepts further method calls only after the ready event is fired. Extended description.
        * -
        * @param data A DataView object holding all the data
        * @param options TableOptions holding all the non default setup
        */
        draw(data: DataView, options?: TableOptions): void;
        /**
        * Standard getSelection implementation. Selection elements are all row elements. Can return more than one selected row. 
        * The row indexes in the selection object refer to the original data table regardless of any user interaction (sort, paging, etc.).
        * 
        * Note that the selection(s) toggle: clicking a cell the first time selects it; clicking the cell again deselects it, 
        * resulting in a selection event, but no selected items in the retrieved selection object.
        * -
        * Returns: Array of selection elements
        */
        getSelection(): Array<any>;
        /**
        * Call this method to retrieve information about the current sort state of a table that has been sorted 
        * (typically by the user, who has clicked on a column heading to sort the rows by a specific column). 
        * If you have disabled sorting, this method will not work.
        * -
        * If you have not sorted data in code, or the user has not sorted data by selecting code, the default sort values will be returned.
        * -
        * Returns: 
        * An object with the following properties:
        * -
        * column - (number) Index of the column by which the table is sorted.
        * ascending - (boolean) true if the sort is ascending, false if descending.
        * sortedIndexes - (numeric array) Array of numbers, where the index in the array is the row number as sorted 
        * (in the visible table), and the value is the index of that row in the underlying (unsorted) data table.
        */
        getSortInfo(): sortInfo;
        /**
        * Standard setSelection() implementation, but can only select entire rows, or multiple rows. 
        * The row indexes in the selection object refer to the original data table regardless of any user interaction (sort, paging, etc.).
        * -
        * @param selection The row index to select
        */
        setSelection(selection: number): void;
        /**
        * Clears the chart, and releases all of its allocated resources.
        */
        clearChart(): void;

        // ----------------------------------------
        // events
        // ----------------------------------------

        /**
        * Standard select event, but only entire rows can be selected.
        */
        select();
        /**
        * Triggered when users click on a page navigation button.
        * -
        * @param page The index of page to navigate to.
        */
        page(page: number);
        /**
        * Triggered when users click on a column header, and the sort option is not 'disable'.
        * -
        * @param sortInfo An object with the following properties:
        * -
        * column - (number) Index of the column by which the table is sorted.
        * ascending - (boolean) true if the sort is ascending, false if descending.
        * sortedIndexes - (numeric array) Array of numbers, where the index in the array is the row number as sorted (in the visible table), 
        *       and the value is the index of that row in the underlying (unsorted) data table.
        */
        sort(sortInfo: sortInfo);
        /**
        * The chart is ready for external method calls. If you want to interact with the chart, and call methods after you draw it, 
        * you should set up a listener for this event before you call the draw method, and call them only after the event was fired.
        */
        ready();
    }

    export interface sortInfo {
        /**
        * Index of the column by which the table is sorted.
        */
        column?: number;
        /**
        * true if the sort is ascending, false if descending.
        */
        ascending?: boolean;
        /**
        * Array of numbers, where the index in the array is the row number as sorted (in the visible table), 
        * and the value is the index of that row in the underlying (unsorted) data table.
        */
        sortedIndexes?: Array<number>;
    }

    export interface cssClassNames {
        /**
        * Assigns a class name to the table header row (<tr> element).
        */
        headerRow?: string;
        /**
        * Assigns a class name to the non-header rows (<tr> elements).
        */
        tableRow?: string;
        /**
        * Assigns a class name to odd table rows (<tr> elements). Note: the alternatingRowStyle option must be set to true.
        */
        oddTableRow?: string;
        /**
        * Assigns a class name to the selected table row (<tr> element).
        */
        selectedTableRow?: string;
        /**
        * Assigns a class name to the hovered table row (<tr> element).
        */
        hoverTableRow?: string;
        /**
        * Assigns a class name to all cells in the header row (<td> element).
        */
        headerCell?: string;
        /**
        * Assigns a class name to all non-header table cells (<td> element).
        */
        tableCell?: string;
        /**
        * Assigns a class name to the cells in the row number column (<td> element). Note: the showRowNumber option must be set to true.
        */
        rowNumberCell?: string;
    }
}                 