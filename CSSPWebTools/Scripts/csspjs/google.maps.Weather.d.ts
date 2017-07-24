// Type definitions for Google Geolocation 0.4.8
// Project: https://developers.google.com/maps/
// Definitions by: Folia A/S <http://www.folia.dk>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/*
The MIT License

Copyright (c) 2012 Folia A/S. http://www.folia.dk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated doc files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

declare module google.maps {

    export module weather {
        export class CloudLayer extends MVCObject {
            /**
            * A layer showing cloud imagery.
            * -
            * Creates a new CloudLayer instance that displays a cloud overlay.
            */
            constructor();
            /**
            * Returns the map on which this layer is displayed.
            */
            getMap(): Map;
            /**
            * Renders the layer on the specified map. If map is set to null, the layer will be removed.
            */
            setMap(map: Map): void;
        }
        export class WeatherLayer extends MVCObject {
            /**
            * A layer that displays weather icons.
            * -
            * Creates a new WeatherLayer instance that displays weather icons.
            */
            constructor(opts?: WeatherLayerOptions);
            /**
            * Returns the map on which this layer is displayed.
            */
            getMap(): Map;
            /**
            * Renders the layer on the specified map. If map is set to null, the layer will be removed.
            */
            setMap(map: Map): void;
            /**
            * Sets the WeatherLayer's options.
            */
            setOptions(options: WeatherLayerOptions): void;
        }

        export interface WeatherLayerOptions {
            /**
            * If true, the layer receives mouse events. Default value is true.
            */
            clickable?: boolean;
            /**
            * The color of labels on the weather layer. If this is not explicitly set, the label color is chosen automatically depending on the map type.
            */
            labelColor?: LabelColor;
            /**
            * The map on which to display the layer.
            */
            map?: Map;
            /**
            * Suppress the rendering of info windows when weather icons are clicked.
            */
            suppressInfoWindows?: boolean;
            /**
            * The units to use for temperature.
            */
            temperatureUnits?: TemperatureUnit;
            /**
            * The units to use for wind speed.
            */
            windSpeedUnits?: WindSpeedUnit;
        }

        export enum TemperatureUnit {
            /**
            * Specifies that temperatures should be displayed in degrees Celsius.
            */
            CELSIUS,
            /**
            * Specifies that temperatures should be displayed in degrees Fahrenheit.
            */
            FAHRENHEIT
        }

        export enum WindSpeedUnit {
            /**
            * Specifies that wind speeds should be displayed in kilometers per hour.
            */
            KILOMETERS_PER_HOUR,
            /**
            * Specifies that wind speeds should be displayed in meters per second.
            */
            METERS_PER_SECOND,
            /**
            * Specifies that wind speeds should be displayed in miles per hour.
            */
            MILES_PER_HOUR
        }

        export enum LabelColor {
            /**
            * Weather labels will be displayed as black text with a white border.
            */
            BLACK,
            /**
            * Weather labels will be displayed as white text with a black border.
            */
            WHITE
        }

        export interface WeatherMouseEvent {
            /**
            * A WeatherFeature object containing information about the clicked feature.
            */
            featureDetails: WeatherFeature;
            /**
            * Pre-rendered HTML content to display within a feature's InfoWindow when clicked.
            */
            infoWindowHtml: string;
            /**
            * The position at which to anchor an info window on the clicked feature.
            */
            latLng: LatLng;
            /**
            * The offset to apply to an info window anchored on the clicked feature.
            */
            pixelOffset: Size;
        }

        export interface WeatherFeature {
            /**
            * The current weather conditions at this location.
            */
            current: WeatherConditions;
            /**
            * A forecast of weather conditions over the next four days. The forecast array is always in chronological order.
            */
            forecast: Array<WeatherForecast>;
            /**
            * The location name of this feature, e.g. "San Francisco, California".
            */
            location: string;
            /**
            * The temperature units being used.
            */
            temperatureUnit: TemperatureUnit;
            /**
            * The wind speed units being used.
            */
            windSpeedUnit: WindSpeedUnit;
        }

        export interface WeatherConditions {
            /**
            * The current day of the week in long form, e.g. "Monday".
            */
            day: string;
            /**
            * A description of the conditions, e.g. "Partly Cloudy".
            */
            description: string;
            /**
            * The highest temperature reached during the day.
            */
            high: number;
            /**
            * The current humidity, expressed as a percentage.
            */
            humidity: number;
            /**
            * The lowest temperature reached during the day.
            */
            low: number;
            /**
            * The current day of the week in short form, e.g. "M".
            */
            shortDay: string;
            /**
            * The current temperature, in the specified temperature units.
            */
            temperature: number;
            /**
            * The current wind direction.
            */
            windDirection: string;
            /**
            * The current wind speed, in the specified wind speed units.
            */
            windSpeed: number;
        }

        export interface WeatherForecast {
            /**
            * The day of the week in long form, e.g. "Monday".
            */
            day: string;
            /**
            * A description of the conditions, e.g. "Partly Cloudy".
            */
            description: string;
            /**
            * The highest temperature reached during the day.
            */
            high: number;
            /**
            * The lowest temperature reached during the day.
            */
            low: number;
            /**
            * The day of the week in short form, e.g. "M".
            */
            shortDay: string;
        }
    }

} 