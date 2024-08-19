/*tslint:disable */
/*eslint-disable */



export namespace Data {
  interface HourlyWeather {
    datetime: string
    datetimeEpoch: number
    temp: number
    feelslike: number
    humidity: number
    dew: number
    precip: number
    precipprob: number
    snow: number
    snowdepth: number
    preciptype: string | null
    windgust: number
    windspeed: number
    winddir: number
    pressure: number
    visibility: number
    cloudcover: number
    solarradiation: number
    solarenergy: number
    uvindex: number
    severerisk: number
    conditions: string
    icon: string
    stations: string[]
    source: string
    datetimeInstance: string
  }
}
