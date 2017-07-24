/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export class data {
        /**
        * The google.visualization.data namespace holds static methods to perform SQL-like operations  
        * on DataTable objects, for example joining them or grouping by column value.
        */
        constructor();
        /**
        * Performs a SQL GROUP BY action to return a table grouped by values in specified columns.
        * Takes a populated DataTable object and performs a SQL-like GROUP BY operation, returning a  
        * table with rows grouped by the specified column values.  
        * Note that this does not modify the input DataTable.
        * 
        * The returned table includes one row for each combination of values in the specified key columns.  
        * Each row includes the key columns, plus one column with an aggregated column value over all rows  
        * that match the key combination (for example, a sum or count of all values in the specified column).
        * 
        * The google.visualization.data namespace includes several useful aggregation values  
        * (for example, sum and count), but you can define your own (for example, standardDeviation or secondHighest).  
        * Instructions on how to define your own aggregator are given after the method description.
        *
        * @param data_table The input DataTable. This will not be modified by calling group().
        * @param keys An array of numbers and/or objects specifying which columns to group by. The result table  
        * includes every column in this array, as well as every column in columns. If a number, this  
        * is a column index of the input DataTable to group by. If an object, it will include a function  
        * that can modify the specified column (for example, add 1 to the value in that column). The  
        * object must have the following properties:
        * column - A number that is a column index from dt to apply the transformation to.
        * modifier - A function that accepts one value (the cell value in that column for each row),  
        * and returns the modified value. This function is used to modify the column value to assist  
        * in the grouping: for example, by calling a whichQuarter function that calculates a quarter  
        * from a date column, so the API can group rows by quarter. The calculated value is displayed  
        * in the key columns in the returned table. This function can be declared inline inside this  
        * object, or it can be a function that you define elsewhere in your code  
        * (it must be within the calling scope). The API provides one simple modifier function;  
        * here are instructions on how to create your own, more useful functions. You must know  
        * the data type that this function can accept, and call it only on columns of that type.  
        * You must also know the return type of this function, and declare it in  
        * the type property described next.
        * type - The type returned by the function modifier. This should be a JavaScript  
        * string type name, for example: 'number' or 'boolean'.
        * label - [Optional] A string label to assign this column in the returned DataTable.
        * id - [Optional] A string ID to assign this column in the returned DataTable.
        * -
        * Examples: [0], [0,2], [0,{column:1, modifier:myPlusOneFunc, type:'number'},2]
        * @param columns [Optional] Lets you specify which columns, in addition to key columns, to include in the output table.  
        * Because all rows in the row group are compressed into a single output row, you must determine what value  
        * to display for that row group. For example, you could choose to show the column value from the first row  
        * in the set, or an average of all rows in that group. columns is an array of objects, with the following properties:
        * column - A number specifying the index of the column to show.
        * aggregation - A function that accepts an array of all values of this column in this row group and  
        * returns a single value to display in the result row. The return value must be of the type specified  
        * by the object's type property. Details on creating your own aggregation function are given below.  
        * You must know what data types this method accepts and only call it on columns of the appropriate type.  
        * The API provides several useful aggregation functions. See Provided Aggregation Functions below for a list, or  
        * Creating an aggregation function to learn how to write your own aggregation function.
        * type - The return type of the aggregation function. This should be a JavaScript string type name,  
        * for example: 'number' or 'boolean'.
        * label - [Optional] A string label to apply to this column in the returned table.
        * id - [Optional] A string ID to apply to this column in the returned table.
        */
        group(dataTable: DataTable, keys: Array<number>, columns?: dataColumn): any;
        /**
        * Performs a SQL GROUP BY action to return a table grouped by values in specified columns.
        * Takes a populated DataTable object and performs a SQL-like GROUP BY operation, returning a table with rows  
        * grouped by the specified column values. Note that this does not modify the input DataTable.
        * 
        * The returned table includes one row for each combination of values in the specified key columns. Each row  
        * includes the key columns, plus one column with an aggregated column value over all rows that match the key  
        * combination (for example, a sum or count of all values in the specified column).
        * 
        * The google.visualization.data namespace includes several useful aggregation values (for example, sum and count),  
        * but you can define your own (for example, standardDeviation or secondHighest). Instructions on how to define your  
        * own aggregator are given after the method description.
        *
        * @param data_table The input DataTable. This will not be modified by calling group().
        * @param keys An array of numbers and/or objects specifying which columns to group by. The result table includes every column  
        * in this array, as well as every column in columns. If a number, this is a column index of the input DataTable  
        * to group by. If an object, it will include a function that can modify the specified column  
        * (for example, add 1 to the value in that column). The object must have the following properties:
        * column - A number that is a column index from dt to apply the transformation to.
        * modifier - A function that accepts one value (the cell value in that column for each row), and returns  
        * the modified value. This function is used to modify the column value to assist in the grouping:  
        * for example, by calling a whichQuarter function that calculates a quarter from a date column, so the API  
        * can group rows by quarter. The calculated value is displayed in the key columns in the returned table.  
        * This function can be declared inline inside this object, or it can be a function that you define elsewhere  
        * in your code (it must be within the calling scope). The API provides one simple modifier function; here are  
        * instructions on how to create your own, more useful functions. You must know the data type that this function  
        * can accept, and call it only on columns of that type. You must also know the return type of this function,  
        * and declare it in the type property described next.
        * type - The type returned by the function modifier. This should be a JavaScript string type name,  
        * for example: 'number' or 'boolean'.
        * label - [Optional] A string label to assign this column in the returned DataTable.
        * id - [Optional] A string ID to assign this column in the returned DataTable.
        * -
        * Examples: [0], [0,2], [0,{column:1, modifier:myPlusOneFunc, type:'number'},2]
        * @param columns [Optional] Lets you specify which columns, in addition to key columns, to include in the output table.  
        * Because all rows in the row group are compressed into a single output row, you must determine what value  
        * to display for that row group. For example, you could choose to show the column value from the first row  
        * in the set, or an average of all rows in that group. columns is an array of objects, with the following properties:
        * column - A number specifying the index of the column to show.
        * aggregation - A function that accepts an array of all values of this column in this row group and  
        * returns a single value to display in the result row. The return value must be of the type specified  
        * by the object's type property. Details on creating your own aggregation function are given below.  
        * You must know what data types this method accepts and only call it on columns of the appropriate type.  
        * The API provides several useful aggregation functions. See Provided Aggregation Functions below for a list,  
        * or Creating an aggregation function to learn how to write your own aggregation function.
        * type - The return type of the aggregation function. This should be a JavaScript string type name,  
        * for example: 'number' or 'boolean'.
        * label - [Optional] A string label to apply to this column in the returned table.
        * id - [Optional] A string ID to apply to this column in the returned table.
        */
        group(dataTable: DataTable, keys: Array<dataRow>, columns?: dataColumn): any;
        /**
        * The API provides the following modifier functions that you can pass  
        * into the keys.modifier parameter to customize grouping behavior.
        * Given a date, it will return the zero-based month value (0, 1, 2, and so on).
        * Example modifier
        */
        month: Function;
        /**
        * The API provides the following aggregation functions that you can pass  
        * into the columns.aggregation parameter array.
        * The average value of the array passed in.
        * Example aggregation
        * - 
        * // Input type: Date
        * // Return type: number (1-4)
        * function getQuarter(someDate) {
        *   return Math.floor(someDate.getMonth()/3) + 1;
        * }
        */
        avg: Function;
        /**
        * The API provides the following aggregation functions that you can pass  
        * into the columns.aggregation parameter array.
        * The count of rows in the group. Null and duplicate values are counted.
        * Example aggregation
        * -
        * // Input type: Array of any type
        * // Return type: number
        * function count(values) {
        *   return values.length;
        * }
        */
        count: Function;
        /**
        * The API provides the following aggregation functions that you can pass  
        * into the columns.aggregation parameter array.
        * The maximum value in the array. For strings, this is the first item in an  
        * lexicographically sorted list; for Date values, it is the latest date. Nulls are ignored.
        * Example aggregation
        * -
        * // Input type: Array of any type
        * // Return type: number
        * function count(values) {
        *   return values.length;
        * }
        */
        max: Function;
        /**
        * The API provides the following aggregation functions that you can pass  
        * into the columns.aggregation parameter array.
        * The minimum value in the array. For strings, this is the last item in an lexicographically  
        * sorted list; for Date values, it is the earliest date. Nulls are ignored.
        * Example aggregation
        * -
        * // Input type: Array of any type
        * // Return type: number
        * function count(values) {
        *   return values.length;
        * }
        */
        min: Function;
        /**
        * The API provides the following aggregation functions that you can pass  
        * into the columns.aggregation parameter array.
        * The sum of all values in the array.
        * Example aggregation
        * -
        * // Input type: Array of any type
        * // Return type: number
        * function count(values) {
        *   return values.length;
        * }
        */
        sum: Function;
        /**
        * Joins two data tables on one or more key columns.
        * This method joins two data tables (DataTable or DataView objects) into a single results table, similar  
        * to a SQL JOIN statement. You specify one or more column pairs (key columns) between the two tables, and  
        * the output table includes the rows according to a join method that you specify: only rows where both keys  
        * match; all rows from one table; or all rows from both tables, whether or not the keys match. The results  
        * table includes only the key columns, plus any additional columns that you specify. Note that dt2 cannot  
        * have duplicate keys, but dt1 can. The term "key" means the combination of all key column values, not a  
        * specific key column value; so if a row has cell values A | B | C and columns 0 and 1 are key columns,  
        * then the key for that row is AB.
        * -
        * Returns A DataTable with the key columns, dt1Columns, and dt2Columns. This table is sorted by the key columns,  
        * from left to right. When joinMethod is 'inner', all key cells should be populated. For other join methods, if  
        * no matching key is found, the table will have a null for any unmatched key cells.
        *
        * @param dt1 A populated DataTable to join with dt2.
        * @param dt2 A populated DataTable to join with dt1. This table cannot have multiple identical keys  
        * (where a key is a combination of key column values).
        * @param joinMethod A string specifying the join type. If dt1 has multiple rows that match a dt2 row, the output table  
        * will include all matching dt1 rows. Choose from the following values:
        * 'full' - The output table includes all rows from both tables, regardless of whether keys match.  
        * Unmatched rows will have null cell entries; matched rows are joined.
        * 'inner' - The full join filtered to include only rows where the keys match.
        * 'left' - The output table includes all rows from dt1, whether or not there are any matching rows from dt2.
        * 'right' - The output table includes all rows from dt2, whether or not there are any matching rows from dt1.
        * @param keys An array of key columns to compare from both tables. Each pair is a two element array, the first is 
        * a key in dt1, the second is a key in dt2. Columns must be the same type in both tables. All specified 
        * keys must match according to the rule given by joinMethod in order to include a row from the table. 
        * Key columns are always included in the output table. Only dt1, the left-hand table, can include duplicate 
        * keys; keys in dt2 must be unique. The term "key" here means a unique set of key columns, not individual 
        * column values. For example, if your key columns were A and B, the following table would have only unique 
        * key values (and could thus be used as dt2):
        * A  |  B
        * Jen  Red
        * Jen  Blue
        * Fred Red
        * Example: [[0,0], [2,1]] compares values from the first column in both tables as well as the 
        * third column from dt1 with the second column from dt2.
        * @param dt1Columns An array of columns from dt1 to include in the output table, in addition 
        * to dt1's key columns. This is an array of column indexes.
        * @param dt2Columns An array of columns from dt2 to include in the output table, in addition 
        * to dt2's key columns. This is an array of column indexes.
        */
        join(dt1: DataTable, dt2: DataTable, joinMethod: string, keys: Array<Array<number>>, dt1Columns: Array<number>, dt2Columns: Array<number>): DataTable;
        /**
        * Joins two data tables on one or more key columns.
        * This method joins two data tables (DataTable or DataView objects) into a single results table, similar 
        * to a SQL JOIN statement. You specify one or more column pairs (key columns) between the two tables, 
        * and the output table includes the rows according to a join method that you specify: only rows where 
        * both keys match; all rows from one table; or all rows from both tables, whether or not the keys match. 
        * The results table includes only the key columns, plus any additional columns that you specify. Note that 
        * dt2 cannot have duplicate keys, but dt1 can. The term "key" means the combination of all key column values, 
        * not a specific key column value; so if a row has cell values A | B | C and columns 0 and 1 are key columns, 
        * then the key for that row is AB.
        * -
        * Returns A DataTable with the key columns, dt1Columns, and dt2Columns. This table is sorted by the key 
        * columns, from left to right. When joinMethod is 'inner', all key cells should be populated. For other 
        * join methods, if no matching key is found, the table will have a null for any unmatched key cells.
        * -
        * @param dt1 A populated DataTable to join with dt2.
        * @param dt2 A populated DataTable to join with dt1. This table cannot have multiple identical keys 
        * (where a key is a combination of key column values).
        * @param joinMethod A string specifying the join type. If dt1 has multiple rows that match a dt2 row, the output table will 
        * include all matching dt1 rows. Choose from the following values:
        * 'full' - The output table includes all rows from both tables, regardless of whether keys match. Unmatched 
        * rows will have null cell entries; matched rows are joined.
        * 'inner' - The full join filtered to include only rows where the keys match.
        * 'left' - The output table includes all rows from dt1, whether or not there are any matching rows from dt2.
        * 'right' - The output table includes all rows from dt2, whether or not there are any matching rows from dt1.
        * @param keys An array of key columns to compare from both tables. Each pair is a two element array, the first is a key 
        * in dt1, the second is a key in dt2. Columns must be the same type in both tables. All specified keys must 
        * match according to the rule given by joinMethod in order to include a row from the table. Key columns are always 
        * included in the output table. Only dt1, the left-hand table, can include duplicate keys; keys in dt2 must be unique. 
        * The term "key" here means a unique set of key columns, not individual column values. For example, if your key 
        * columns were A and B, the following table would have only unique key values (and could thus be used as dt2):
        * A  |  B
        * Jen  Red
        * Jen  Blue
        * Fred Red
        * Example: [[0,0], [2,1]] compares values from the first column in both tables  
        * as well as the third column from dt1 with the second column from dt2.
        * @param dt1Columns An array of columns from dt1 to include in the output table,  
        * in addition to dt1's key columns. This is an array of column indexes.
        * @param dt2Columns An array of columns from dt2 to include in the output table,  
        * in addition to dt2's key columns. This is an array of column indexes.
        */
        join(dt1: DataTable, dt2: DataView, joinMethod: string, keys: Array<Array<number>>, dt1Columns: Array<number>, dt2Columns: Array<number>): DataTable;
        /**
        * Joins two data tables on one or more key columns.
        * This method joins two data tables (DataTable or DataView objects) into a single results table, 
        * similar to a SQL JOIN statement. You specify one or more column pairs (key columns) between the 
        * two tables, and the output table includes the rows according to a join method that you specify: 
        * only rows where both keys match; all rows from one table; or all rows from both tables, whether 
        * or not the keys match. The results table includes only the key columns, plus any additional columns 
        * that you specify. Note that dt2 cannot have duplicate keys, but dt1 can. The term "key" means the 
        * combination of all key column values, not a specific key column value; so if a row has cell 
        * values A | B | C and columns 0 and 1 are key columns, then the key for that row is AB.
        * -
        * Returns A DataTable with the key columns, dt1Columns, and dt2Columns. This table is sorted by the key 
        * columns, from left to right. When joinMethod is 'inner', all key cells should be populated. For other 
        * join methods, if no matching key is found, the table will have a null for any unmatched key cells.
        * -
        * @param dt1 A populated DataTable to join with dt2.
        * @param dt2 A populated DataTable to join with dt1. This table cannot have multiple identical keys 
        * (where a key is a combination of key column values).
        * @param joinMethod A string specifying the join type. If dt1 has multiple rows that match a dt2 row, the output table 
        * will include all matching dt1 rows. Choose from the following values:
        * 'full' - The output table includes all rows from both tables, regardless of whether keys match. 
        * Unmatched rows will have null cell entries; matched rows are joined.
        * 'inner' - The full join filtered to include only rows where the keys match.
        * 'left' - The output table includes all rows from dt1, whether or not there are any matching rows from dt2.
        * 'right' - The output table includes all rows from dt2, whether or not there are any matching rows from dt1.
        * @param keys An array of key columns to compare from both tables. Each pair is a two element array, the first is a 
        * key in dt1, the second is a key in dt2. Columns must be the same type in both tables. All specified keys 
        * must match according to the rule given by joinMethod in order to include a row from the table. Key columns 
        * are always included in the output table. Only dt1, the left-hand table, can include duplicate keys; keys 
        * in dt2 must be unique. The term "key" here means a unique set of key columns, not individual column values. 
        * For example, if your key columns were A and B, the following table would have only unique key values 
        * (and could thus be used as dt2):
        * A  |  B
        * Jen  Red
        * Jen  Blue
        * Fred Red
        * Example: [[0,0], [2,1]] compares values from the first column in both tables  
        * as well as the third column from dt1 with the second column from dt2.
        * @param dt1Columns An array of columns from dt1 to include in the output table,  
        * in addition to dt1's key columns. This is an array of column indexes.
        * @param dt2Columns An array of columns from dt2 to include in the output table,  
        * in addition to dt2's key columns. This is an array of column indexes.
        */
        join(dt1: DataView, dt2: DataTable, joinMethod: string, keys: Array<Array<number>>, dt1Columns: Array<number>, dt2Columns: Array<number>): DataTable;
        /**
        * Joins two data tables on one or more key columns.
        * This method joins two data tables (DataTable or DataView objects) into a single results table,  
        * similar to a SQL JOIN statement. You specify one or more column pairs (key columns) between  
        * the two tables, and the output table includes the rows according to a join method that you specify:  
        * only rows where both keys match; all rows from one table; or all rows from both tables, whether or  
        * not the keys match. The results table includes only the key columns, plus any additional columns  
        * that you specify. Note that dt2 cannot have duplicate keys, but dt1 can. The term "key" means the  
        * combination of all key column values, not a specific key column value; so if a row has cell  
        * values A | B | C and columns 0 and 1 are key columns, then the key for that row is AB.
        * -
        * Returns A DataTable with the key columns, dt1Columns, and dt2Columns. This table is sorted by the  
        * key columns, from left to right. When joinMethod is 'inner', all key cells should be populated.  
        * For other join methods, if no matching key is found, the table will have a null for any  
        * unmatched key cells.
        * -
        * @param dt1 A populated DataTable to join with dt2.
        * @param dt2 A populated DataTable to join with dt1. This table cannot have multiple identical keys  
        * (where a key is a combination of key column values).
        * @param joinMethod A string specifying the join type. If dt1 has multiple rows that match a dt2 row, the output table  
        * will include all matching dt1 rows. Choose from the following values:
        * 'full' - The output table includes all rows from both tables, regardless of whether keys match.  
        * Unmatched rows will have null cell entries; matched rows are joined.
        * 'inner' - The full join filtered to include only rows where the keys match.
        * 'left' - The output table includes all rows from dt1, whether or not there are any matching rows from dt2.
        * 'right' - The output table includes all rows from dt2, whether or not there are any matching rows from dt1.
        * -
        * @param keys An array of key columns to compare from both tables. Each pair is a two element array,  
        * the first is a key in dt1, the second is a key in dt2. Columns must be the same type in both tables.  
        * All specified keys must match according to the rule given by joinMethod in order to include  
        * a row from the table. Key columns are always included in the output table. Only dt1, the left-hand table,  
        * can include duplicate keys; keys in dt2 must be unique. The term "key" here means a unique set of key columns,  
        * not individual column values. For example, if your key columns were A and B, the following table would have  
        * only unique key values (and could thus be used as dt2):
        * A  |  B
        * Jen  Red
        * Jen  Blue
        * Fred Red
        * Example: [[0,0], [2,1]] compares values from the first column in both tables as  
        * well as the third column from dt1 with the second column from dt2.
        * -
        * @param dt1Columns An array of columns from dt1 to include in the output table,  
        * in addition to dt1's key columns. This is an array of column indexes.
        * @param dt2Columns An array of columns from dt2 to include in the output table,  
        * in addition to dt2's key columns. This is an array of column indexes.
        */
        join(dt1: DataView, dt2: DataView, joinMethod: string, keys: Array<Array<number>>, dt1Columns: Array<number>, dt2Columns: Array<number>): DataView;
    }

    export interface dataColumn {
        column: number;
        aggregation: Function;
        type: string; /* "string" "number" "boolean" "date" "datetime" "timeofday" */
        label?: string;
        id?: string;
    }

    export interface dataRow {
        column: number;
        modifier: Function;
        type: string; /* "string" "number" "boolean" "date" "datetime" "timeofday" */
        label?: string;
        id?: string;
    }


} 