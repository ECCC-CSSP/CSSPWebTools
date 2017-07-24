/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export class DataView {
        /**
        * A DataTable or DataView used to initialize the view. By default, the view contains all the columns and 
        * rows in the underlying data table or view, in the original order. To hide or show rows or columns in 
        * this view, call the appropriate set...() or hide...() methods.
        *
        * @param data An existing DataTable
        */
        constructor(data: DataTable);
        /**
        * A DataTable or DataView used to initialize the view. By default, the view contains all the 
        * columns and rows in the underlying data table or view, in the original order. To hide or 
        * show rows or columns in this view, call the appropriate set...() or hide...() methods.
        *
        * @param data An existing DataView
        */
        constructor(data: DataView);
        /**
        * Returns: the index of the new column
        *
        * @param viewAsJson 
        * type - A string describing the column data type. Same values as type above.
        * label - [Optional, string] A label for the column.
        * id - [Optional, string] An ID for the column.
        * role - [Optional, string] A role for the column.
        * pattern - [Optional, string] A number (or date) format string specifying how to display the column value.
        */
        fromJSON(data: DataTable, viewAsJson: string): DataView;
        /**
        * Returns the identifier of a given column specified by the column index in the underlying table.
        * For data tables that are retrieved by queries, the column identifier is set by the data source, 
        * and can be used to refer to columns when using the query language. 
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than the 
        * number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnId(columnIndex: number): string;
        /**
        * Returns the label of a given column specified by the column index in the underlying table.
        * The column label is typically displayed as part of the visualization. For example the 
        * column label can be displayed as a column header in a table, or as the legend label 
        * in a pie chart. 
        * For data tables that are retrieved by queries, the column label is set by the data 
        * source, or by the label clause of the query language. 
        *
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnLabel(columnIndex: number): string;
        /**
        * Returns the formatting pattern used to format the values of the specified column.
        * For data tables that are retrieved by queries, The column pattern is set by the data source, 
        * or by the format clause of the query language. An example of a pattern is '#,##0.00'. 
        * For more on patterns see the query language reference.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnPattern(columnIndex: number): string;
        /**
        * Returns the minimal and maximal values of values in a specified column. The returned 
        * object has properties min and max. If the range has no values, min and max will contain null.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnProperty(columnIndex: number, name: string): any;
        /**
        * Returns: one of "domain", "data", "annotation", "annotationText", "interval", 
        * "tooltip", "centainty", "emphasis", "scope"
        *
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnRange(columnIndex: number): minMax;
        /**
        * Returns the type of a given column specified by the column index.
        * The returned column type can be one of the following: 
        * 'string' 'number' 'boolean' 'date' 'datetime' 'timeofday'
        *
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnType(columnIndex: number): string; /* "string" "number" "boolean" "date" "datetime" "timeofday" */
        /**
        * Returns the unique values in a certain column, in ascending order.
        * The type of the returned objects is the same as that returned by the getValue method.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        */
        getDistinctValues(columnIndex: number): any;
        /**
        * Returns the row indexes for rows that match all of the given filters. 
        * The indexes are returned in ascending order. The output of this method 
        * can be used as input to DataView.setRows() to change the displayed set of rows in a visualization.
        *
        * @param filters An array of objects that describe an acceptable cell value. 
        * A row index is returned by this method if it matches all of the given filters. 
        * Each filter is an object with a numeric column property that specifies the index 
        * of the column in the row to assess, plus one of the following:
        * A value property with a value that must be matched exactly by the cell in 
        * the specified column. The value must be the same type as the column; or
        * One or both of the following properties, the same type as the column being filtered:
        * minValue - A minimum value for the cell. The cell value in the specified 
        * column must be greater than or equal to this value.
        * maxValue - A maximum value for the cell. The cell value in the specified 
        * column must be less than or equal to this value.
        * Example: getFilteredRows([{column: 3, value: 42}, {column: 2, minValue: 'bar', maxValue: 'foo'}]) 
        * returns an array containing, in ascending order, the indexes of all rows for which the fourth 
        * column (column index 3) is exactly 42, and the third column (column index 2) is 
        * between 'bar' and 'foo' (inclusive).
        */
        getFilteredRows(filters: Array<filter>): Array<number>;
        /**
        * Returns the formatted value of the cell at the given row and column indexes.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less 
        * than the number of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, 
        * and less than the number of columns as returned by the getNumberOfColumns() method.
        */
        getFormattedValue(rowIndex: number, columnIndex: number): string;
        /**
        * Returns the number of columns in the table.
        */
        getNumberOfColumns(): number;
        /**
        * Returns the number of rows in the table.
        */
        getNumberOfRows(): number;
        /**
        * Returns a map of all the properties for the specified cell. Note that the 
        * properties object is returned by reference, so changing values in the retrieved 
        * object changes them in the DataTable.
        * 
        * @param rowIndex is the cell's row index.
        * @param columnIndex is the cell's column index.
        */
        getProperties(rowIndex: number, columnIndex: number): any;
        /**
        * Returns the value of a named property, or null if no such property is set 
        * for the specified cell. The return type varies, depending on the property.
        * @param rowIndex should be a number greater than or equal to zero, and less 
        * than the number of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        * @param name is a string with the property name.
        */
        getProperty(rowIndex: number, columnIndex: number, name: string): any;
        /**
        * Returns the value of a named property, or null if no such property is set 
        * for the specified row. The return type varies, depending on the property.
        * 
        * @param rowIndex should be a number greater than or equal to zero, and less 
        * than the number of rows as returned by the getNumberOfRows() method.
        * @param name is a string with the property name.
        */
        getRowProperty(rowIndex: number, name: string): any;
        /**
        * Returns a sorted version of the table without modifying the order of the underlying data. 
        * To permanently sort the underlying data, call sort(). You can specify sorting in a number 
        * of ways, depending on the type you pass in to the sortColumns parameter:
        * The returned value is an array of numbers, each number is an index of a DataTable row. 
        * Iterating on the DataTable rows by the order of the returned array will result in rows ordered 
        * by the specified sortColumns. The output can be used as input to DataView.setRows() to quickly 
        * change the displayed set of rows in a visualization.
        *
        * @param sortColumns A single number specifies the index of the column to sort by. Sorting will 
        * be in ascending order. Example: sortColumns(3) will sort by the 4th column, in ascending order.
        * 
        * Note that the sorting is guaranteed to be stable: this means that if you sort on equal values 
        * of two rows, the same sort will return the rows in the same order every time.
        */
        getSortedRows(sortColumns: number): Array<number>;
        /**
        * Returns a sorted version of the table without modifying the order of the underlying data. 
        * To permanently sort the underlying data, call sort(). You can specify sorting in a number 
        * of ways, depending on the type you pass in to the sortColumns parameter:
        * The returned value is an array of numbers, each number is an index of a DataTable row. 
        * Iterating on the DataTable rows by the order of the returned array will result in rows 
        * ordered by the specified sortColumns. The output can be used as input to DataView.setRows() 
        * to quickly change the displayed set of rows in a visualization.
        *
        * @param sortColumns A single object that contains the number of the column index to sort by, 
        * and an optional boolean property desc. If desc is set to true, the specific column will be sorted in 
        * descending order; otherwise, sorting is in ascending order. Examples: sortColumns({column: 3}) will 
        * sort by the 4th column, in ascending order; sortColumns({column: 3, desc: true}) will sort by 
        * the 4th column, in descending order.
        * 
        * Note that the sorting is guaranteed to be stable: this means that if you sort on equal 
        * values of two rows, the same sort will return the rows in the same order every time.
        */
        getSortedRows(sortColumns: sortObj): Array<number>;
        /**
        * Returns a sorted version of the table without modifying the order of the underlying data. 
        * To permanently sort the underlying data, call sort(). You can specify sorting in a number 
        * of ways, depending on the type you pass in to the sortColumns parameter:
        * The returned value is an array of numbers, each number is an index of a DataTable row. 
        * Iterating on the DataTable rows by the order of the returned array will result in rows 
        * ordered by the specified sortColumns. The output can be used as input to DataView.setRows() 
        * to quickly change the displayed set of rows in a visualization.
        *
        * @param sortColumns An array of numbers of the column indexes by which to sort. The first 
        * number is the primary column by which to sort, the second one is the secondary, and so on. 
        * This means that when two values in the first column are equal, the values in the next column 
        * are compared, and so on. Example: sortColumns([3, 1, 6]) will sort first by the 4th column 
        * (in ascending order), then by the 2nd column (in ascending order), and then by 
        * the 7th column (in ascending order).
        * 
        * Note that the sorting is guaranteed to be stable: this means that if you sort on 
        * equal values of two rows, the same sort will return the rows in the same order every time.
        */
        getSortedRows(sortColumns: Array<number>): Array<number>;
        /**
        * Returns a sorted version of the table without modifying the order of the underlying data. 
        * To permanently sort the underlying data, call sort(). You can specify sorting in a number of ways, 
        * depending on the type you pass in to the sortColumns parameter:
        * The returned value is an array of numbers, each number is an index of a DataTable row. 
        * Iterating on the DataTable rows by the order of the returned array will result in rows 
        * ordered by the specified sortColumns. The output can be used as input to DataView.setRows() 
        * to quickly change the displayed set of rows in a visualization.
        *
        * @param sortColumns An array of objects, each one with the number of the column index to sort by, 
        * and an optional boolean property desc. If desc is set to true, the specific column will be sorted 
        * in descending order (the default is ascending order). The first object is the primary column 
        * by which to sort, the second one is the secondary, and so on. This means that when two values in 
        * the first column are equal, the values in the next column are compared, and so on. 
        * Example: sortColumn([{column: 3}, {column: 1, desc: true}, {column: 6, desc: true}]) will sort 
        * first by the 4th column (in ascending order), then column 2 in descending order, and then 
        * column 7 in descending order.
        * 
        * Note that the sorting is guaranteed to be stable: this means that if you sort on equal 
        * values of two rows, the same sort will return the rows in the same order every time.
        */
        getSortedRows(sortColumns: Array<sortObj>): Array<number>;
        /**
        * Returns the value of a named property, or null if no such property is set for the table. 
        * The return type varies, depending on the property.
        * 
        * @param name is a string with the property name.
        */
        getTableProperty(name: string): any;
        /**
        * Returns the value of the cell at the given row and column indexes.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less than 
        * the number of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        *
        * The type of the returned value depends on the column type (see getColumnType):
        *
        * If the column type is 'string', the value is a string.
        * If the column type is 'number', the value is a number.
        * If the column type is 'boolean', the value is a boolean.
        * If the column type is 'date' or 'datetime', the value is a Date object.
        * If the column type is 'timeofday', the value is an array of four numbers: 
        * [hour, minute, second, millisenconds].
        * If the column value is a null value, an exception is thrown.
        */
        getValue(rowIndex: number, columnIndex: number): any;
        /**
        * Returns the index in the underlying table (or view) of a given column 
        * specified by its index in this view.
        * Example: If setColumns([3, 1, 4]) was previously called, then 
        * getTableColumnIndex(2) will return 4.
        *
        * @param viewColumnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method. 
        * Returns -1 if this is a generated column.
        */
        getTableColumnIndex(viewColumnIndex: number): number;
        /**
        * Returns the index in the underlying table (or view) of a given row specified by its index in this view.
        * Example: If setRows([3, 1, 4]) was previously called, then getTableRowIndex(2) will return 4.
        *
        * @param viewRowIndex should be a number greater than or equal to zero, and less than the number 
        * of rows as returned by the getNumberOfRows() method.
        */
        getTableRowIndex(viewRowIndex: number): number;
        /**
        * Returns the index in this view that maps to a given column specified by its index in the underlying 
        * table (or view). If more than one such index exists, returns the first (smallest) one. If no such 
        * index exists (the specified column is not in the view), returns -1.
        * Example: If setColumns([3, 1, 4]) was previously called, then getViewColumnIndex(4) will return 2.
        *
        * @param tableColumnIndex should be a number greater than or equal to zero, and less than the number 
        * of columns as returned by the getNumberOfColumns() method of the underlying table/view.
        */
        getViewColumnIndex(tableColumnIndex: number): number;
        /**
        * Returns the columns in this view, in order. That is, if you call setColumns with some array, and 
        * then call getViewColumns() you should get an identical array.
        */
        getViewColumns(): Array<number>;
        /**
        * Returns the index in this view that maps to a given row specified by its index in the underlying 
        * table (or view). If more than one such index exists, returns the first (smallest) one. If no such 
        * index exists (the specified row is not in the view), returns -1
        * Example: If setRows([3, 1, 4]) was previously called, then getViewRowIndex(4) will return 2.
        *
        * @param tableRowIndex should be a number greater than or equal to zero, and less than the number of  
        * rows as returned by the getNumberOfRows() method of the underlying table/view.
        */
        getViewRowIndex(tableRowIndex: number): number;
        /**
        * Returns the rows in this view, in order. That is, if you call setRows with some array, and then call  
        * getViewRows() you should get an identical array.
        */
        getViewRows(): Array<number>;
        /**
        * Hides the specified columns from the current view.
        * Example: If you have a table with 10 columns, and you call setColumns([2,7,1,7,9]), and then  
        * hideColumns([7,9]), the columns in the view will then be [2,1].
        * 
        * @param columnIndexes is an array of numbers representing the indexes of the columns to hide.  
        * These indexes are the index numbers in the underlying table/view. The numbers in columnIndexes 
        * do not have to be in order (that is, [3,4,1] is fine). The remaining columns retain their index 
        * order when you iterate through them. Entering an index number for a column already hidden is not 
        * an error, but entering an index that does not exist in the underlying table/view will throw an 
        * error. To unhide columns, call setColumns().
        */
        hideColumns(columnIndexes: Array<number>): void;
        /**
        * Hides all rows with indexes that lie between min and max (inclusive) from the current view.  
        * This is a convenience syntax for hideRows(rowIndexes) above. For example, hideRows(5, 10) is  
        * equivalent to hideRows([5, 6, 7, 8, 9, 10]).
        */
        hideRows(min: number, max: number): void;
        /**
        * Hides the specified rows from the current view.
        * Example: If you have a table with 10 rows, and you call setRows([2,7,1,7,9]), and then  
        * hideRows([7,9]), the rows in the view will then be [2,1].
        * -
        * @param rowIndexes is an array of numbers representing the indexes of the rows to hide.  
        * These indexes are the index numbers in the underlying table/view. The numbers in rowIndexes  
        * do not have to be in order (that is, [3,4,1] is fine). The remaining rows retain their index order.  
        * Entering an index number for a row already hidden is not an error, but entering an index that does  
        * not exist in the underlying table/view will throw an error. To unhide rows, call setRows().
        */
        hideRows(rowIndexes: Array<number>): void;
        /**
        * Specifies which columns are visible in this view.
        * Examples:
        * -
        * Show some columns directly from the underlying data.
        * Shows column 3 twice.
        * view.setColumns([3, 4, 3, 2]);
        * -
        * @param columnIndexes An array of numbers and/or objects (can be mixed):
        * Numbers specify the index of the source data column to include in the view. The data is brought  
        * through unmodified. If you need to explicitly define a role or additional column properties,  
        * specify an object with a sourceColumn property.
        */
        setColumns(columnIndexes: Array<number>): void;
        /**
        * Specifies which columns are visible in this view.
        * Examples:
        * -
        * Underlying table has a column specifying a value in centimeters.
        * The view imports this directly, and creates a calculated column
        * that converts the value into inches.
        * view.setColumns([1,{calc:cmToInches, type:'number', label:'Height in Inches'}]);
        * function cmToInches(dataTable, rowNum){
        *   return Math.floor(dataTable.getValue(rowNum, 1) / 2.54);
        * }
        * -
        * @param columnIndexes An array of numbers and/or objects (can be mixed):
        * Objects specify a calculated column. A calculated column creates a value on the fly for each  
        * row and adds it to the view. The object must have the following properties:
        * -
        * calc [function] - A function that will be called for each row in the column to calculate a value  
        *       for that cell. The function signature is func(dataTable, row), where dataTable is the source DataTable,  
        *       and row is the index of the source data row. The function should return a single value of the type  
        *       specified by type.
        * type [string] - The JavaScript type of the value that the calc function returns.
        * label [Optional, string] - An optional label to assign to this generated column. If not specified,  
        *       the view column will have no label.
        * id [Optional, string] - An optional ID to assign to this generated column.
        * sourceColumn - [Optional, number] The source column to use as a value; if specified, do not specify  
        *       the calc or the type property. This is similar to passing in a number instead of an object, but enables  
        *       you to specify a role and properties for the new column.
        * properties [Optional, object] - An object containing any arbitrary properties to assign to this column.  
        *       If not specified, the view column will have no properties.
        * role [Optional, string] - A role to assign to this column. If not specified, the existing role will not be imported.
        */
        setColumns(columnIndexes: Array<calcColumn>): void;
        /**
        * any is of type number | object (calcColumn)
        * see other setColumns for description
        */
        setColumns(columnIndexes: Array<any>): void;
        /**
        * Sets the rows in this view to be all indexes (in the underlying table/view) that lie  
        * between min and max (inclusive). This is a convenience syntax for setRows(rowIndexes) below.  
        * For example, setRows(5, 10) is equivalent to setRows([5, 6, 7, 8, 9, 10]).
        */
        setRows(min: number, max: number): void;
        /**
        * Sets the visible rows in this view, based on index numbers from the underlying table/view.
        * 
        * @param rowIndexes should be an array of index numbers specifying which rows to show in the view.  
        * The array specifies the order in which to show the rows, and rows can be duplicated. Note that  
        * only the rows specified in rowIndexes will be shown; this method clears all other rows from the view.  
        * The array can also contain duplicates, effectively duplicating the specified row in this view  
        * (for example, setRows([3, 4, 3, 2]) will cause row 3 to appear twice in this view).  
        * The array thus provides a mapping of the rows from the underlying table/view to this view.  
        * You can use getFilteredRows() or getSortedRows() to generate input for this method.
        * Example: To create a view with rows three and zero of an underlying table/view: view.setRows([3, 0])
        */
        setRows(rowIndexes: Array<number>): void;
        /**
        * Returns a DataTable object populated with the visible rows and columns of the DataView.
        */
        toDataTable(): DataTable;
        /**
        * Returns a string representation of this DataView. This string does not contain the actual data;  
        * it only contains the DataView-specific settings such as visible rows and columns. You can store  
        * this string and pass it to the static DataView.fromJSON() constructor to recreate this view.  
        * This won't include generated columns.
        */
        toJSON(): string;

    }

    export interface calcColumn {
        /**
        * A function that will be called for each row in the column to calculate a value for that cell. 
        * The function signature is func(dataTable, row), where dataTable is the source DataTable, 
        * and row is the index of the source data row. The function should return a single value of the type specified by type.
        */
        calc: Function;
        /**
        * The JavaScript type of the value that the calc function returns.
        */
        type: string;
        /**
        * An optional label to assign to this generated column. If not specified, the view column will have no label.
        */
        label?: string;
        /**
        * An optional ID to assign to this generated column.
        */
        id?: string;
        /**
        * The source column to use as a value; if specified, do not specify the calc or the type property. 
        * This is similar to passing in a number instead of an object, but enables you to specify a role and properties for the new column.
        */
        sourceColumn?: number;
        /**
        * An object containing any arbitrary properties to assign to this column. If not specified, the view column will have no properties.
        */
        properties?: any;
        /**
        * A role to assign to this column. If not specified, the existing role will not be imported.
        * -
        * Allowable values: "annotation", "annotationText", "interval", "tooltip", "certainty", "emphasis", "scope", "domain", "data"
        */
        role?: string;  
    }


}  