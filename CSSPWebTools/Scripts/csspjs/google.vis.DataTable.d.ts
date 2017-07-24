/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export class DataTable {
        /**
        * The DataTable object is used to hold the data passed into a visualization. A DataTable is a basic two-dimensional table. All data in each column must have the same data type. 
        * Each column has a descriptor that includes its data type, a label for that column (which might be displayed by a visualization), and an ID, which can be used to refer to a 
        * specific column (as an alternative to using column indexes). The DataTable object also supports a map of arbitrary properties assigned to a specific value, a row, a column, 
        * or the whole DataTable. Visualizations can use these to support additional features; for example, the Table visualization uses custom properties to let you assign arbitrary 
        * class names or styles to individual cells.
        *
        * Each cell in the table holds a value. Cells can have a null value, or a value of the 
        * type specified by its column. Cells optionally can take a "formatted" version of the data; 
        * this is a string version of the data, formatted for display by a visualization. A 
        * visualization can (but is not required to) use the formatted version for display, 
        * but will always use the data itself for any sorting or calculations that it makes 
        * (such as determining where on a graph to place a point). An example might be assigning 
        * the values "low" "medium", and "high" as formatted values to numeric cell values of 1, 2, and 3.
        *
        * @param opt_data [Optional] Data used to initialize the table. This can either be the 
        * JSON returned by calling DataTable.toJSON() on a populated table, or a JavaScript object 
        * containing data used to initialize the table. The structure of the JavaScript literal 
        * object is described here. If this parameter is not supplied, a new, empty data table 
        * will be returned.
        * -
        * data example
        * {
        *   cols: [{id: 'A', label: 'NEW A', type: 'string'},
        *          {id: 'B', label: 'B-label', type: 'number'},
        *          {id: 'C', label: 'C-label', type: 'date'}
        *         ],
        *   rows: [{c:[{v: 'a'}, {v: 1.0, f: 'One'}, {v: new Date(2008, 1, 28, 0, 31, 26), f: '2/28/08 12:31 AM'}]},
        *          {c:[{v: 'b'}, {v: 2.0, f: 'Two'}, {v: new Date(2008, 2, 30, 0, 31, 26), f: '3/30/08 12:31 AM'}]},
        *          {c:[{v: 'c'}, {v: 3.0, f: 'Three'}, {v: new Date(2008, 3, 30, 0, 31, 26), f: '4/30/08 12:31 AM'}]}
        *         ],
        *   p: {foo: 'hello', bar: 'world!'}
        * }
        * -
        * The data object consists of two required top-level properties, cols and rows, and an optional p property that is a map of arbitrary values.
        * Note: All property names and string constants shown are case-sensitive. 
        * Also, properties described as taking a string value should have their value enclosed in quotation marks. 
        * For example, if you wish to specify the type property as being number, 
        * it would be expressed like this: type: 'number' but the value itself, as numeric, would be expressed like this: v: 42
        * -
        * @param opt_version [Optional] A numeric value specifying the version of the wire protocol 
        * used. This is only used by Chart Tools Datasource implementors. The current version is 0.6.
        *
        */
        constructor(opt_data?: dataTableJsonData, opt_version?: number);
        /**
        * Returns: the index of the new column
        *
        * @param type 
        * A string with the data type of the values of the column. The type can be one of the following: 
        * 'string' 'number' 'boolean' 'date' 'datetime' 'timeofday'.
        * @param opt_label 
        * [Optional] A string with the label of the column. The column label is typically displayed as 
        * part of the visualization, for example as a column header in a table, or as a legend label 
        * in a pie chart. If not value is specified, an empty string is assigned.
        * @param opt_id 
        * [Optional] A string with a unique identifier for the column. If not value is specified, 
        * an empty string is assigned.
        */
        addColumn(
            type: string,
            opt_label?: string,
            opt_id?: string): number;
        /**
        * Returns: the index of the new column
        *
        * @param description_object 
        * type - A string describing the column data type. Same values as type above.
        * label - [Optional, string] A label for the column.
        * id - [Optional, string] An ID for the column.
        * role - [Optional, string] A role for the column.
        * pattern - [Optional, string] A number (or date) format string specifying how to display the column value.
        */
        addColumn(description_object: description_object): number;
        /**
        * Adds a new row to the data table, and returns the index of the new row.
        * Returns: the index of the new row
        */
        addRow(): number;
        /**
        * Adds a new row to the data table, and returns the index of the new row.
        * Returns: the index of the new row
        * 
        * @param opt_cellArray [optional] A row object, in JavaScript notation, specifying the data for 
        * the new row. If this parameter is not included, this method will simply add a new, empty row 
        * to the end of the table. This parameter is an array of cell values: if you only want to specify 
        * a value for a cell, just give the cell value (e.g., 55 or 'hello'); if you want to specify a 
        * formatted value and/or properties for the cell, use a cell object (e.g., {v:55, f:'Fifty-five'}). 
        * You can mix simple values and cell objects in the same method call). Use null or an empty array 
        * entry for an empty cell.
        */
        addRow(opt_cellArray: Array<cell>): number;
        /**
        * Returns: the index of the new row
        *
        * @param Number A number specifying how many new, unpopulated rows to add.
        */
        addRows(Number: number): number;
        /**
        * Returns: the index of the new row
        *
        * @param Array An array of row objects used to populate a set of new rows. Each row is an 
        * object as described in addRow(). Use null or an empty array entry for an empty cell.
        */
        addRows(Array: Array<row>): number;
        /**
        * Returns a clone of the data table. The result is a deep copy of the data table except for 
        * the cell properties, row properties, table properties and column properties, which are 
        * shallow copies; this means that non-primitive properties are copied by reference, but 
        * primitive properties are copied by value.
        */
        clone(): DataTable;
        /**
        * Returns the identifier of a given column specified by the column index in the underlying table.
        * For data tables that are retrieved by queries, the column identifier is set by the data source, 
        * and can be used to refer to columns when using the query language. 
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than the number of 
        * columns as returned by the getNumberOfColumns() method.
        */
        getColumnId(columnIndex: number): string;
        /**
        * Returns the label of a given column specified by the column index in the underlying table.
        * The column label is typically displayed as part of the visualization. For example the column 
        * label can be displayed as a column header in a table, or as the legend label in a pie chart. 
        * For data tables that are retrieved by queries, the column label is set by the data source, 
        * or by the label clause of the query language. 
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than the number 
        * of columns as returned by the getNumberOfColumns() method.
        */
        getColumnLabel(columnIndex: number): string;
        /**
        * Returns the formatting pattern used to format the values of the specified column.
        * For data tables that are retrieved by queries, The column pattern is set by the 
        * data source, or by the format clause of the query language. An example of a pattern 
        * is '#,##0.00'. For more on patterns see the query language reference.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than 
        * the number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnPattern(columnIndex: number): string;
        /**
        * Returns a map of all properties for the specified column. Note that the properties 
        * object is returned by reference, so changing values in the retrieved object changes 
        * them in the DataTable.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than 
        * the number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnProperties(columnIndex: number): any;
        /**
        * Returns the value of a named property, or null if no such property is set for the 
        * specified column. The return type varies, depending on the property.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than 
        * the number of columns as returned by the getNumberOfColumns() method.
        * @param name is the property name, as a string.
        */
        getColumnProperty(columnIndex: number, name: string): any;
        /**
        * Returns the minimal and maximal values of values in a specified column. The returned 
        * object has properties min and max. If the range has no values, min and max will contain null.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than the 
        * number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnRange(columnIndex: number): minMax;
        /**
        * Returns: one of "domain", "data", "annotation", "annotationText", "interval", "tooltip", 
        * "centainty", "emphasis", "scope"
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than the 
        * number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnRole(columnIndex: number): string;
        /**
        * Returns the type of a given column specified by the column index.
        * The returned column type can be one of the following: 
        * 'string' 'number' 'boolean' 'date' 'datetime' 'timeofday'
        *
        * @param columnIndex should be a number greater than or equal to zero, 
        * and less than the number of columns as returned by the getNumberOfColumns() method.
        */
        getColumnType(columnIndex: number): string;
        /**
        * Returns the unique values in a certain column, in ascending order.
        * The type of the returned objects is the same as that returned by the getValue method.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than 
        * the number of columns as returned by the getNumberOfColumns() method.
        */
        getDistinctValues(columnIndex: number): any;
        /**
        * Returns the row indexes for rows that match all of the given filters. The indexes 
        * are returned in ascending order. The output of this method can be used as input to 
        * DataView.setRows() to change the displayed set of rows in a visualization.
        *
        * @param filters An array of objects that describe an acceptable cell value. A row index 
        * is returned by this method if it matches all of the given filters. Each filter is an object 
        * with a numeric column property that specifies the index of the column in the row to assess, 
        * plus one of the following:
        * A value property with a value that must be matched exactly by the cell in the specified column. 
        * The value must be the same type as the column; or
        * One or both of the following properties, the same type as the column being filtered:
        * minValue - A minimum value for the cell. The cell value in the specified column must be greater than or equal to this value.
        * maxValue - A maximum value for the cell. The cell value in the specified column must be less than or equal to this value.
        * Example: getFilteredRows([{column: 3, value: 42}, {column: 2, minValue: 'bar', maxValue: 'foo'}]) 
        * returns an array containing, in ascending order, the indexes of all rows for which the fourth column (column index 3) 
        * is exactly 42, and the third column (column index 2) is between 'bar' and 'foo' (inclusive).
        */
        getFilteredRows(filters: Array<filter>): Array<number>;
        /**
        * Returns the formatted value of the cell at the given row and column indexes.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less than the number 
        * of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less than the number 
        * of columns as returned by the getNumberOfColumns() method.
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
        * Returns a map of all the properties for the specified cell. Note that the properties object is returned 
        * by reference, so changing values in the retrieved object changes them in the DataTable.
        * 
        * @param rowIndex is the cell's row index.
        * @param columnIndex is the cell's column index.
        */
        getProperties(rowIndex: number, columnIndex: number): any;
        /**
        * Returns the value of a named property, or null if no such property is set for the specified cell. 
        * The return type varies, depending on the property.
        * @param rowIndex should be a number greater than or equal to zero, and less than the number of 
        * rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less than the number 
        * of columns as returned by the getNumberOfColumns() method.
        * @param name is a string with the property name.
        */
        getProperty(rowIndex: number, columnIndex: number, name: string): any;
        /**
        * Returns a map of all properties for the specified row. Note that the properties object is 
        * returned by reference, so changing values in the retrieved object changes them in the DataTable.
        * 
        * @param rowIndex is the index of the row to retrieve properties for.
        */
        getRowProperties(rowIndex: number): any;
        /**
        * Returns the value of a named property, or null if no such property is set for the specified row. 
        * The return type varies, depending on the property.
        * 
        * @param rowIndex should be a number greater than or equal to zero, and less than the number of 
        * rows as returned by the getNumberOfRows() method.
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
        * @param sortColumns A single number specifies the index of the column to sort by. Sorting will be 
        * in ascending order. Example: sortColumns(3) will sort by the 4th column, in ascending order.
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
        * and an optional boolean property desc. If desc is set to true, the specific column will be 
        * sorted in descending order; otherwise, sorting is in ascending order. 
        * Examples: sortColumns({column: 3}) will sort by the 4th column, in ascending order; 
        * sortColumns({column: 3, desc: true}) will sort by the 4th column, in descending order.
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
        * (in ascending order), then by the 2nd column (in ascending order), and then by the 7th column 
        * (in ascending order).
        * 
        * Note that the sorting is guaranteed to be stable: this means that if you sort on equal values 
        * of two rows, the same sort will return the rows in the same order every time.
        */
        getSortedRows(sortColumns: Array<number>): Array<number>;
        /**
        * Returns a sorted version of the table without modifying the order of the underlying data. 
        * To permanently sort the underlying data, call sort(). You can specify sorting in a number 
        * of ways, depending on the type you pass in to the sortColumns parameter:
        * The returned value is an array of numbers, each number is an index of a DataTable row. 
        * Iterating on the DataTable rows by the order of the returned array will result in rows 
        * ordered by the specified sortColumns. The output can be used as input to DataView.setRows() 
        * to quickly change the displayed set of rows in a visualization.
        *
        * @param sortColumns An array of objects, each one with the number of the column index to sort by, 
        * and an optional boolean property desc. If desc is set to true, the specific column will be sorted 
        * in descending order (the default is ascending order). The first object is the primary column by 
        * which to sort, the second one is the secondary, and so on. This means that when two values in the 
        * first column are equal, the values in the next column are compared, and so on. 
        * Example: sortColumn([{column: 3}, {column: 1, desc: true}, {column: 6, desc: true}]) will sort 
        * first by the 4th column (in ascending order), then column 2 in descending order, and then 
        * column 7 in descending order.
        * 
        * Note that the sorting is guaranteed to be stable: this means that if you sort on equal values 
        * of two rows, the same sort will return the rows in the same order every time.
        */
        getSortedRows(sortColumns: Array<sortObj>): Array<number>;
        /**
        * Returns a map of all properties for the table.
        */
        getTableProperties(): any;
        /**
        * Returns the value of a named property, or null if no such property is set for the table. 
        * The return type varies, depending on the property.
        * 
        * @param name is a string with the property name.
        */
        getTableProperty(name: string): any;
        /**
        * Returns the value of the cell at the given row and column indexes.
        * -
        * The type of the returned value depends on the column type (see getColumnType):
        * -
        * If the column type is 'string', the value is a string.
        * If the column type is 'number', the value is a number.
        * If the column type is 'boolean', the value is a boolean.
        * If the column type is 'date' or 'datetime', the value is a Date object.
        * If the column type is 'timeofday', the value is an array of four numbers: [hour, minute, second, millisenconds].
        * If the column value is a null value, an exception is thrown.
        * -
        * @param rowIndex should be a number greater than or equal to zero, and less than the number 
        * of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less than the 
        * number of columns as returned by the getNumberOfColumns() method.

        */
        getValue(rowIndex: number, columnIndex: number): any;
        /**
        * Inserts a new column to the data table, at the specifid index. All existing 
        * columns at or after the specified index are shifted to a higher index.
        *
        * @param columnIndex is a number with the required index of the new column.
        * @param type should be a string with the data type of the values of the column. The type can 
        * be one of the following: 'string' 'number' 'boolean' 'date' 'datetime' 'timeofday'.
        * @param label should be a string with the label of the column. The column label is typically 
        * displayed as part of the visualization, for example as a column header in a table, or as a 
        * legend label in a pie chart. If no value is specified, an empty string is assigned.
        * @param id should be a string with a unique identifier for the column. If no value is 
        * specified, an empty string is assigned.
        */
        insertColumn(columnIndex: number, type: string, label?: string, id?: string): void;
        /**
        * Insert the specified number of rows at the specified row index.
        * 
        * @param rowIndex is the index number where to insert the new row(s). 
        * Rows will be added, starting at the index number specified.
        * @param n is either a number of new, empty rows to add, or an array of one or more 
        * populated rows to add at the index. See addRows() for the syntax for adding an array of row objects.
        */
        insertRows(rowIndex: number, n: number): void;
        /**
        * Insert the specified number of rows at the specified row index.
        *
        * @param rowIndex is the index number where to insert the new row(s). 
        * Rows will be added, starting at the index number specified.
        * @param arr is either a number of new, empty rows to add, or an array of one or more populated 
        * rows to add at the index. See addRows() for the syntax for adding an array of row objects.
        */
        insertRows(rowIndex: number, arr: Array<row>): void;
        /**
        * Removes the column at the specified index.
        * 
        * @param columnIndex should be a number with a valid column index.
        */
        removeColumn(columnIndex: number): void;
        /**
        * Removes the specified number of columns starting from the column at the specified index.
        *
        * @param columnIndex should be a number with a valid column index.
        * @param numberOfColumns is the number of columns to remove.
        */
        removeColumns(columnIndex: number, numberOfColumns: number): void;
        /**
        * Removes the row at the specified index.
        *
        * @param rowIndex should be a number with a valid row index.
        */
        removeRow(rowIndex: number): void;
        /**
        * Removes the specified number of rows starting from the row at the specified index.
        *
        * @param numberOfRows is the number of rows to remove.
        * @param rowIndex should be a number with a valid row index.
        */
        removeRows(rowIndex: number, numberOfRows: number): void;
        /**
        * Sets the value, formatted value, and/or properties, of a cell.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less than the number 
        * of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less than the number 
        * of columns as returned by the getNumberOfColumns() method.
        * @param value [Optional] is the value assigned to the specified cell. To avoid overwriting this 
        * value, set this parameter to undefined; to clear this value, set it to null. The type of the 
        * value depends on the column type (see getColumnType()):
        * If the column type is 'string', the value should be a string.
        * If the column type is 'number', the value should be a number.
        * If the column type is 'boolean', the value should be a boolean.
        * If the column type is 'date' or 'datetime', the value should be a Date object.
        * If the column type is 'timeofday', the value should be an array of four numbers: 
        * [hour, minute, second, millisenconds].
        * @param formattedValue [Optional] is a string with the value formatted as a string. 
        * To avoid overwriting this value, set this parameter to undefined; to clear this value 
        * and have the API apply default formatting to value as needed, set it to null; to explicitly 
        * set an empty formatted value, set it to an empty string. The formatted value is typically 
        * used by visualizations to display value labels. For example the formatted value can appear 
        * as a label text within a pie chart.
        * @param properties [Optional] is an Object (a name/value map) with additional properties for this cell. 
        * To avoid overwriting this value, set this parameter to undefined; to clear this value, set it to null. 
        * Some visualizations support row, column, or cell properties to modify their display or behavior; 
        * see the visualization doc to see what properties are supported.
        */
        setCell(rowIndex: number, columnIndex: number, value?: any, formattedValue?: string, properties?: any): void;
        /**
        * Sets the label of a column.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less than 
        * the number of columns as returned by the getNumberOfColumns() method.
        * @param label is a string with the label to assign to the column. The column label is 
        * typically displayed as part of the visualization. For example the column label can be 
        * displayed as a column header in a table, or as the legend label in a pie chart.
        */
        setColumnLabel(columnIndex: number, label: string): void;
        /**
        * Sets a single column property. Some visualizations support row, column, or cell properties 
        * to modify their display or behavior; see the visualization doc to see what properties are supported.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        * @param name is a string with the property name.
        * @param value is a value of any type to assign to the specified named property of the specified column.
        */
        setColumnProperty(columnIndex: number, name: string, value: any): void;
        /**
        * Sets multiple column properties. Some visualizations support row, column, or cell properties 
        * to modify their display or behavior; see the visualization doc to see what properties are supported.
        *
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method.
        * @param properties is an Object (name/value map) with additional properties for this column. 
        * If null is specified, all additional properties of the column will be removed.
        */
        setColumnProperties(columnIndex: number, properties: any): void;
        /**
        * Sets the formatted value of a cell.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less than 
        * the number of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less than 
        * the number of columns as returned by the getNumberOfColumns() method.
        * @param formattedValue is a string with the value formatted for display. To clear this 
        * value and have the API apply default formatting to the cell value as needed, set it 
        * formattedValue null; to explicitly set an empty formatted value, set it to an empty string.
        */
        setFormattedValue(rowIndex: number, columnIndex: number, formattedValue: string): void;
        /**
        * Sets a cell property. Some visualizations support row, column, or cell properties to 
        * modify their display or behavior; see the visualization doc to see what properties are supported.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less than the 
        * number of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less than the 
        * number of columns as returned by the getNumberOfColumns() method.
        * @param name is a string with the property name.
        * @param value is a value of any type to assign to the specified named property of the specified cell.
        */
        setProperty(rowIndex: number, columnIndex: number, name: string, value: any): void;
        /**
        * Sets multiple cell properties. Some visualizations support row, column, or cell properties 
        * to modify their display or behavior; see the visualization doc to see what properties are supported.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less than the 
        * number of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less than 
        * the number of columns as returned by the getNumberOfColumns() method.
        * @param properties is an Object (name/value map) with additional properties for this cell. 
        * If null is specified, all additional properties of the cell will be removed.
        */
        setProperties(rowIndex: number, columnIndex: number, properties: any): void;
        /**
        * Sets a row property. Some visualizations support row, column, or cell properties to modify 
        * their display or behavior; see the visualization doc to see what properties are supported.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less than the 
        * number of rows as returned by the getNumberOfRows() method.
        * @param name is a string with the property name.
        * @param value is a value of any type to assign to the specified named property of the specified row.
        */
        setRowProperty(rowIndex: number, name: string, value: any): void;
        /**
        * Sets multiple row properties. Some visualizations support row, column, or cell properties 
        * to modify their display or behavior; see the visualization doc to see what properties are supported.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less 
        * than the number of rows as returned by the getNumberOfRows() method.
        * @param properties is an Object (name/value map) with additional properties for this row. 
        * If null is specified, all additional properties of the row will be removed.
        */
        setRowProperties(rowIndex: number, properties: any): void;
        /**
        * Sets a single table property. Some visualizations support table, row, column, or cell 
        * properties to modify their display or behavior; see the visualization doc to see what properties are supported.
        *
        * @param name is a string with the property name.
        * @param value is a value of any type to assign to the specified named property of the table.
        */
        setTableProperty(name: number, value: any): void;
        /**
        * Sets multiple table properties. Some visualizations support table, row, column, or 
        * cell properties to modify their display or behavior; see the visualization doc 
        * to see what properties are supported.
        *
        * @param properties is an Object (name/value map) with additional properties for the table. 
        * If null is specified, all additional properties of the table will be removed.
        */
        setTableProperties(properties: any): void;
        /**
        * Sets the value of a cell. In addition to overwriting any existing cell value, 
        * this method will also clear out any formatted value and properties for the cell.
        *
        * @param rowIndex should be a number greater than or equal to zero, and less 
        * than the number of rows as returned by the getNumberOfRows() method.
        * @param columnIndex should be a number greater than or equal to zero, and less 
        * than the number of columns as returned by the getNumberOfColumns() method. 
        * This method does not let you set a formatted value for this cell; to do that, call setFormattedValue().
        * @param value is the value assigned to the specified cell. The type of the 
        * returned value depends on the column type (see getColumnType):
        * If the column type is 'string', the value should be a string.
        * If the column type is 'number', the value should be a number.
        * If the column type is 'boolean', the value should be a boolean.
        * If the column type is 'date' or 'datetime', the value should be a Date object.
        * If the column type is 'timeofday', the value should be an array of four numbers: 
        * [hour, minute, second, millisenconds].
        * For any column type, the value can be set to null.
        */
        setValue(rowIndex: number, columnIndex: number, value: any): void;
        /**
        * Sorts the rows, according to the specified sort columns. The DataTable is 
         modified by this method. See getSortedRows() for a description of the sorting details. 
        * This method does not return the sorted data.
        *
        * Example: To sort by the third column and then by the second column, use: data.sort([{column: 2}, {column: 1}]);
        */
        sort(sortColumns: Array<sortObj>): void;
        /**
        * Returns a JSON representation of the DataTable that can be passed into the DataTable constructor. For example:
        *
        * {"cols":[{"id":"Col1","label":"","type":"date"}],
        *   "rows":[
        *     {"c":[{"v":"a"},{"v":"Date(2010,10,6)"}]},
        *     {"c":[{"v":"b"},{"v":"Date(2010,10,7)"}]}
        *   ]
        * }
        */
        toJSON(): string;
    }

    export interface dataTableJsonData {
        /**
        * Is an array of objects describing the ID and type of each column. Each property is an object with the following properties (case-sensitive):
        * -
        * type [Required] Data type of the data in the column. Supports the following string values (examples include the v: property, described later):
        * 'boolean' - JavaScript boolean value ('true' or 'false'). Example value: v:'true'
        * 'number' - JavaScript number value. Example values: v:7 , v:3.14, v:-55
        * 'string' - JavaScript string value. Example value: v:'hello'
        * 'date' - JavaScript Date object (zero-based month), with the time truncated. Example value: v:new Date(2008, 0, 15)
        * 'datetime' - JavaScript Date object including the time. Example value: v:new Date(2008, 0, 15, 14, 30, 45)
        * 'timeofday' - Array of three numbers and an optional fourth, representing hour (0 indicates midnight), minute, second, 
        *       and optional millisecond. Example values: v:[8, 15, 0], v: [6, 12, 1, 144]
        * id [Optional] String ID of the column. Must be unique in the table. Use basic alphanumeric characters, 
        *       so the host page does not require fancy escapes to access the column in JavaScript. 
        *       Be careful not to choose a JavaScript keyword. Example: id:'col_1'
        * label [Optional] String value that some visualizations display for this column. Example: label:'Height'
        * pattern [Optional] String pattern that was used by a data source to format numeric, date, or time column values. 
        *       This is for reference only; you probably won't need to read the pattern, and it isn't required to exist. 
        *       The Google Visualization client does not use this value (it reads the cell's formatted value). 
        *       If the DataTable has come from a data source in response to a query with a format clause, 
        *       the pattern you specified in that clause will probably be returned in this value. 
        *       The recommended pattern standards are the ICU DecimalFormat and SimpleDateFormat.
        * p [Optional] An object that is a map of custom values applied to the cell. 
        *       These values can be of any JavaScript type. If your visualization supports any cell-level properties, 
        *       it will describe them; otherwise, this property will be ignored. Example: p:{style: 'border: 1px solid green;'}.
        * -
        * example: 
        * cols: [{id: 'A', label: 'NEW A', type: 'string'},
        *        {id: 'B', label: 'B-label', type: 'number'},
        *        {id: 'C', label: 'C-label', type: 'date'}]
        */
        cols: Array<col>;
        /**
        * The rows property holds an array of row objects.
        * -
        * Each row object has one required property called c, which is an array of cells in that row. 
        * It also has an optional p property that defines a map of arbitrary custom values to assign to the whole row. 
        * If your visualization supports any row-level properties it will describe them; otherwise, this property will be ignored.
        * -
        * Each cell in the table is described by an object with the following properties:
        * -
        * v [Optional] The cell value. The data type should match the column data type. 
        *       If null, the whole object should be empty and have neither v nor f properties.
        * f [Optional] A string version of the v value, formatted for display. The values should match, 
        *       so if you specify Date(2008, 0, 1) for v, you should specify "January 1, 2008" or some such string for this property. 
        *       This value is not checked against the v value. The visualization will not use this value for calculation, 
        *       only as a label for display. If omitted, a string version of v will be used.
        * p [Optional] An object that is a map of custom values applied to the cell. 
        *       These values can be of any JavaScript type. If your visualization supports any cell-level properties, 
        *       it will describe them; otherwise, this property will be ignored. Example: p:{style: 'border: 1px solid green;'}.
        * -
        * Cells in the row array should be in the same order as their column descriptions in cols. 
        * To indicate a null cell, you can specify null, leave a blank for a cell in an array, or omit trailing array members. 
        * So, to indicate a row with null for the first two cells, you could specify [ , , {cell_val}] or [null, null, {cell_val}].
        */
        rows: Array<row>;
        /**
        * The table-level p property is a map of custom values applied to the whole DataTable. These values can be of any JavaScript type. 
        * If your visualization supports any datatable-level properties, it will describe them; otherwise, 
        * this property will be ignored. Example: p:{className: 'myDataTable'}.
        */
        p?: any;
    }

    export interface row {
        /**
        * Is an array of cells in that row. 
        */
        c: Array<cell>;
        /**
        * It also has an optional p property that defines a map of arbitrary custom values to assign to the whole row. 
        * If your visualization supports any row-level properties it will describe them; otherwise, this property will be ignored.
        */
        p?: string;
    }

    export interface cell {
        /**
        * The cell value. The data type should match the column data type. 
        * If null, the whole object should be empty and have neither v nor f properties.
        */
        v?: any;
        /**
        * A string version of the v value, formatted for display. The values should match, so if you specify Date(2008, 0, 1) for v, 
        * you should specify "January 1, 2008" or some such string for this property. 
        * This value is not checked against the v value. The visualization will not use this value for calculation, 
        * only as a label for display. If omitted, a string version of v will be used.
        */
        f?: string;
        /**
        * An object that is a map of custom values applied to the cell. These values can be of any JavaScript type. 
        * If your visualization supports any cell-level properties, it will describe them; otherwise, 
        * this property will be ignored. Example: p:{style: 'border: 1px solid green;'}.
        */
        p?: any;
    }

    export interface description_object {
        /**
        * A string describing the column data type. Same values as type above.
        */
        type: string;
        /**
        * [Optional, string] A label for the column.
        */
        label?: string;
        /**
        * [Optional, string] An ID for the column.
        */
        id?: string;
        /**
        * [Optional, string] A role for the column.
        * -
        * Allowable values: "annotation", "annotationText", "interval", "tooltip", "certainty", "emphasis", "scope", "domain", "data"
        * -
        * Google DataTable and DataView objects now support explicitly assigned column roles. 
        * A column role describes the purpose of the data in that column: for example, 
        * a column might hold data describing tooltip text, data point annotations, or uncertainty indicators.
        * -
        * Note: if you're looking to control the content of the tooltips that appear when the user hovers over a chart, see Tooltips.
        * -
        * Previously, there were only two roles available to a column: 'domain,' which specifies major axis labels; and 'data,' 
        * which specifies bar heights, pie slice widths, and so on. These roles were assigned implicitly, 
        * based on the order and type of the columns in the table. However, with the ability to explicitly assign column roles, 
        * you can now add optional columns that provide new, interesting features to a chart such as arbitrary annotation labels, hovertext, and uncertainty bars.
        * -
        * If you do not explicitly assign a column's role, its role is inferred by the column's order in the table, 
        * according to the chart's data format specification, and you will be limited to the standard domain and data roles. 
        * This page will show you what roles are available, and how to assign column roles.
        */
        role?: string; 
        /**
        * [Optional, string] A number (or date) format string specifying how to display the column value.
        */
        pattern?: string;
    }

    export interface col {
        /**
        * Data type of the data in the column. Supports the following string values (examples include the v: property, described later):
        * 'boolean' - JavaScript boolean value ('true' or 'false'). Example value: v:'true'
        * 'number' - JavaScript number value. Example values: v:7 , v:3.14, v:-55
        * 'string' - JavaScript string value. Example value: v:'hello'
        * 'date' - JavaScript Date object (zero-based month), with the time truncated. Example value: v:new Date(2008, 0, 15)
        * 'datetime' - JavaScript Date object including the time. Example value: v:new Date(2008, 0, 15, 14, 30, 45)
        * 'timeofday' - Array of three numbers and an optional fourth, representing hour (0 indicates midnight), 
        *       minute, second, and optional millisecond. Example values: v:[8, 15, 0], v: [6, 12, 1, 144]
        */
        type: string;
        /**
        * String ID of the column. Must be unique in the table. Use basic alphanumeric characters, 
        * so the host page does not require fancy escapes to access the column in JavaScript. 
        * Be careful not to choose a JavaScript keyword. Example: id:'col_1'
        */
        id?: string;
        /**
        * String value that some visualizations display for this column. Example: label:'Height'
        */
        label?: string;
        /**
        * String pattern that was used by a data source to format numeric, date, or time column values. 
        * This is for reference only; you probably won't need to read the pattern, and it isn't required to exist. 
        * The Google Visualization client does not use this value (it reads the cell's formatted value). 
        * If the DataTable has come from a data source in response to a query with a format clause, 
        * the pattern you specified in that clause will probably be returned in this value. 
        * The recommended pattern standards are the ICU DecimalFormat and SimpleDateFormat.
        */
        pattern?: string;
        /**
        * An object that is a map of custom values applied to the cell. These values can be of any JavaScript type. 
        * If your visualization supports any cell-level properties, it will describe them; otherwise, 
        * this property will be ignored. Example: p:{style: 'border: 1px solid green;'}.
        */
        p?: any;
    }

    export interface minMax {
        /**
        * any is of type string | number
        */
        min?: any;
        /**
        * any is of type string | number
        */
        max?: any;
    }



} 