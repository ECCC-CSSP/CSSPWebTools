/*
Google Visualization API Reference
https://developers.google.com/chart/interactive/docs/reference
        */
declare module google.visualization {

    export interface chartWrapperOptions {
        chartType: string; /* "AreaChart", "BarChart", "BubbleChart", "CandlestickChart", "ColumnChart",  
        * "ComboChart", "Gauge", "LineChart", "OrgChart", "PieChart", "ScatterChart", "SteppedAreaChart",  
        * "Table", "Timeline", "TreeMap" */
        containerId: string;
        options?: any;
        dataTable?: any;
        dataSourceUrl?: string;
        query?: string;
        refreshInterval?: number;
        view?: any;
    }

    export class ChartWrapper {
        /**
        * @param opt [Optional] - Either a JSON object defining the chart, or a serialized string version  
        * of that object. The format of this object is shown in the drawChart() doc. If not specified,  
        * you must set all the appropriate properties using the set... methods exposed by this object.
        */
        constructor(opt_spec?: chartWrapperOptions);
        /**
        * Draws the chart. You must call this method after any changes  
        * that you make to the chart or data to show the changes.
        * @param opt_container_ref [Optional] - A reference to a valid container  
        * element on the page. If specified, the chart will be drawn there. 
        * If not, the chart will be drawn in the element with ID specified by opt_container_ref.
        */
        draw(opt_container_ref?: string): void;
        /**
        * Returns a string version of the JSON representation of the chart.
        */
        toJSON(): string;
        /**
        * Returns a deep copy of the chart wrapper.
        */
        clone(): ChartWrapper;
        /**
        * If this chart gets its data from a data source, returns the URL for this data source. Otherwise, returns null.
        */
        getDataSourceUrl(): string;
        /**
        * If this chart gets its data from a locally-defined DataTable, will return a reference to  
        * the chart's DataTable. If this chart gets its data from a data source, it will return null.
        * 
        * Any changes that you make to the returned object will be reflected by  
        * the chart the next time you call ChartWrapper.draw().
        */
        getDataTable(): DataTable;
        /**
        * The class name of the wrapped chart. If this is a Google chart, the name will  
        * not be qualified with google.visualization. So, for example, if this were a Treemap chart,  
        * it would return "Treemap" rather than "google.visualization.treemap".
        */
        getChartType(): string;
        /**
        * Returns the chart name assigned by setChartName().
        */
        getChartName(): string;
        /**
        * Returns a reference to the chart created by this ChartWrapper, for example a  
        * google.visualization.BarChart or a google.visualization.ColumnChart. This will  
        * return null until after you have called draw() on the ChartWrapper object, and  
        * it throws a ready event. Methods called on the returned object will be reflected  
        * on the page.
        */
        getChart(): any;
        /**
        * The ID of the chart's DOM container element.
        */
        getContainerId(): string;
        /**
        * The query string for this chart, if it has one and queries a data source.
        */
        getQuery(): string;
        /**
        * Any refresh interval for this chart, if it queries a data source. Zero indicates no refresh.
        */
        getRefreshInterval(): number;
        /**
        * Returns the specified chart option value
        *
        * @param key The name of the option to retrieve. May be a qualified name, such as 'vAxis.title'.
        * @param opt_default_value [Optional] - If the specified value is undefined or null,  
        * this value will be returned.
        */
        getOption(key: string, opt_default_value?: any): any;
        /**
        * Returns the options object for this chart.
        */
        getOptions(): any;
        /**
        * Returns the DataView initializer object, in the same format as dataview.toJSON(), or an array of such objects.
        */
        getView(): any; /* return DataView or Array */
        /**
        * Sets the URL of a data source to use for this chart.  
        * If you also set a data table for this object, the data source URL will be ignored.
        *
        * @param url The URL of a data source
        */
        setDataSourceUrl(url: string): void;
        /**
        * Sets the DataTable for the chart. Pass in one of the following: null;  
        * a DataTable object; a JSON representation of a DataTable; or an array  
        * following the syntax of arrayToDataTable().
        *
        * @param table The DataTable for the chart
        */
        setDataTable(table: DataTable): void;
        /**
        * Sets the chart type. Pass in the class name of the wrapped chart.  
        * If this is a Google chart, do not qualify it with google.visualization. 
        * So, for example, for a pie chart, pass in "PieChart".
        *
        * @param type The chart type
        */
        setChartType(type: string): void;
        /**
        * Sets an arbitrary name for the chart. This is not shown anywhere on the chart,  
        * unless a custom chart is explicitly designed to use it.
        *
        * @param name The chart name to be set
        */
        setChartName(name: string): void;
        /**
        * Sets the ID of the containing DOM element for the chart.
        *
        * @param id
        */
        setContainerId(id: string): void;
        /**
        * Sets a query string, if this chart queries a data source.  
        * You must also set the data source URL if specifying this value.
        *
        * @param query
        */
        setQuery(query: string): void;
        /**
        * Sets the refresh interval for this chart, if it queries a data source.  
        * You must also set a data source URL if specifying this value. Zero indicates no refresh.
        *
        * @param interval
        */
        setRefreshInterval(interval: number): void;
        /**
        * Sets a single chart option value, where key is the option name and value is the value.  
        * To unset an option, pass in null for the value. Note that key may be a qualified name,  
        * such as 'vAxis.title'.
        *
        * @param key
        * @param value
        */
        setOption(key: string, value: any): void;
        /**
        * Sets a complete options object for a chart.
        *
        * @param options
        */
        setOptions(options: any): void;
        /**
        * Sets a DataView initializer object, which acts as a filter over the underlying data.  
        * The chart wrapper must have underlying data from a DataTable or a data source to apply  
        * this view to. You can pass in either a string or DataView initializer object, like that  
        * returned by dataview.toJSON(). You can also pass in an array of DataView initializer objects,  
        * in which case the first DataView in the array is applied to the underlying data to create  
        * a new data table, and the second DataView is applied to the data table resulting from  
        * application of the first DataView, and so on.
        *
        * @param viewSpec
        */
        setView(viewSpec: any): void;


        // events
        /**
        * Fired when an error occurs when attempting to render the chart.
        * 
        * @param id
        * @param message
        */
        error(id: string, message: string);
        /**
        * The chart is ready for external method calls. If you want to interact with the chart,  
        * and call methods after you draw it, you should set up a listener for this event before  
        * you call the draw method, and call them only after the event was fired
        */
        ready();
        /**
        * Fired when the user clicks a bar or legend. When a chart element is selected, the  
        * corresponding cell in the data table is selected; when a legend is selected, the  
        * corresponding column in the data table is selected. To learn what has been selected,  
        * call ChartWrapper.getChart().getSelection(). Note that this will only be thrown when  
        * the underlying chart type throws a selection event.
        */
        select();

    }

    export interface ChartEditorOptions {
        dataSourceInput: string; /* "urlbox" or an HTMLElement */
    }

    export class ChartEditor {
        /**
        * The ChartEditor class is used to open an in-page dialog box that enables  
        * a user to customize a visualization on the fly.
        */
        constructor();
        /**
        * Opens the chart editor as an embedded dialog box on the page.  
        * The function returns immediately; it does not wait for the dialog to be closed.  
        * If you do not lose scope of the instance, you can call openDialog() again to  
        * reopen the dialog, although you must pass in a ChartWrapper object again.
        *
        * @param chartWrapper A ChartWrapper object defining the initial chart to render in  
        * the window. The chart must either have a populated DataTable, or be connected to a  
        * valid data source. This wrapper is copied internally to the chart editor, so any  
        * later changes that you make to your ChartWrapper handle will not be reflected  
        * in the chart editor's copy.
        * @param opt_options [Optional] An object containing any options for the chart editor.  
        * See the options below.
        * -
        * 'urlbox' - Show the chart's data source URL on the dialog in an editable textbox.  
        * The user can modify this, and the chart will be redrawn, based on the new data source.
        * DOM element - Enables you to provide a custom HTML element to use to select a data source.  
        * Pass in a handle to an HTML element, either one created in code or copied from the page.  
        * This element will be displayed on the dialog. Use this as a way to let the user choose  
        * the chart's data source. For example, create a listbox containing several data source URLs,  
        * or user-friendly names that the user can choose from. The element must implement a selection  
        * handler and use it to change the chart's data source: for example, either change the  
        * underlying DataTable, or modify the chart's dataSourceUrl field.
        */
        openDialog(chartWrapper: ChartWrapper, options?: ChartEditorOptions): void;
        /**
        * Returns a ChartWrapper representing the chart, with user modifications.
        */
        getChartWrapper(): ChartWrapper;
        /**
        * Use this method to update the rendered chart on the editor.
        * @param chartWrapper - A ChartWrapper object representing the new chart to render.  
        * The chart must either have a populated DataTable, or be connected to a valid data source.
        */
        setChartWrapper(chartWrapper: ChartWrapper): void
        /**
        * Closes the chart editor dialog box.
        */
        closeDialog(): void;

        // Events
        /**
        * Fired when the user clicks the "OK" button on the dialog. After receiving this method,  
        * you should call getChartWrapper() to retrieve the user-configured chart.
        */
        ok();
        /**
        * Fired when the user clicks the "Cancel" button on the dialog.
        */
        cancel();
    }


} 