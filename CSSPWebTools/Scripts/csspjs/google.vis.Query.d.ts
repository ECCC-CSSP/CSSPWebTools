/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface QueryOptions {
        sendMethod?: string; /* "xhr", "scriptInjection", "makeRequest", "auto" */
        makeRequestParams?: any;
    }

    export class Query {
        /**
        * Represents a query that is sent to a data source.
        * -
        * @param dataSourceUrl - [Required, String] URL to send the query to. See the Charts and 
        * Spreadsheets doc for Google Spreadsheets. 
        * @param opt_options - [Optional, Object] A map of options for the request. 
        * Note: If you are accessing a restricted data source, you should not use this parameter. 
        * Here are the supported properties: 
        * 1. sendMethod - [Optional, String] Specifies the method to use to send the query. 
        * Choose one of the following string values:         
        * - 'xhr' - Send the query using XmlHttpRequest.
        * - 'scriptInjection' - Send the query using script injection.
        * - 'makeRequest' - [Available only for gadgets, which are deprecated] Send the 
        * query using the Gadget API  makeRequest() method. If specified, you should 
        * also specify makeRequestParams.
        * - 'auto' - Use the method specified by the tqrt URL parameter from the data source URL. 
        * tqrt can have the following values: 'xhr', 'scriptInjection', or 'makeRequest'. 
        * If tqrt is missing or has an invalid value, the default is 'xhr' for same-domain 
        * requests and 'scriptInjection' for cross-domain requests.
        * 2. makeRequestParams - [Object] A map of parameters for a makeRequest() query. 
        * Used and required only if sendMethod is 'makeRequest'. 
        */
        constructor(dataSourceUrl: string, opt_options?: QueryOptions);
        /**
        * Stops the automated query sending that was started with setRefreshInterval().
        */
        abort(): void;
        /**
       * Sets the query to automatically call the send method every specified duration (number of seconds), 
       * starting from the first explicit call to send. seconds is a number greater than or equal to zero.
       * -
       * If you use this method, you should call it before calling the send method.
       * -
       * Cancel this method either by calling it again with zero (the default), or by calling abort().
       */
        setRefreshInterval(seconds: number): void;
        /** 
       * Sets the number of seconds to wait for the data source to respond before raising a 
       * timeout error.seconds is a number greater than zero. 
       * The default timeout is 30 seconds.This method, if used, should be called 
       * before calling the send method. 
       */
        setTimeout(seconds: number): void;
        /**
        * Sets the query string. The value of the string parameter should be a valid query. 
        * This method, if used, should be called before calling the send method. 
        */
        setQuery(q: string): void;
        /**
        * Sends the query to the data source. callback should be a function that will be 
        * called when the data source responds. The callback function will receive a 
        * single parameter of type google.visualization.QueryResponse. 
        */
        send(callback: Function): void;
    }

    export class QueryResponse {
        /**
        * Represents a response of a query execution as received from the data source. 
        * An instance of this class is passed as an argument to the callback function 
        * that was set when Query.send was called.
        * -
        * Returns the data table as returned by the data source. Returns null if the query 
        * execution failed and no data was returned. 
         */
        getDataTable(): DataTable;
        /**
        * Returns a detailed error message for queries that failed. If the query execution 
        * was successful, this method returns an empty string. The message returned is a 
        * message that is intended for developers, and may contain technical information, 
        * for example 'Column {salary} does not exist'. 
        */
        getDetailedMessage(): string;
        /**
        * Returns a short error message for queries that failed. If the query execution was 
        * successful, this method returns an empty string. The message returned is a short 
        * message that is intended for end users, for example 'Invalid Query' or 'Access Denied'. 
        */
        getMessage(): string;
        /**
        * Returns an array of zero of more entries. Each entry is a short string with an error 
        * or warning code that was raised while executing the query. Possible codes: 
        * 'access_denied' The user does not have permissions to access the data source.
        * 'invalid_query' The specified query has a syntax error.
        * 'data_truncated' One or more data rows that match the query selection were not returned 
        * due to output size limits. (warning).
        * 'timeout' The query did not respond within the expected time.

        */
        getReasons(): Array<string>;
        /**
        * Returns true if the query execution has any warning messages. 
        */
        hasWarning(): boolean;
        /**
        * Returns true if the query execution failed, and the response does not contain any data table. 
        * Returns <false> if the query execution was successful and the response contains a data table. 
        */
        isError(): boolean;
    }


} 