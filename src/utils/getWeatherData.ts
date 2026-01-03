import { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response'

export const getWeatherData = (data: WeatherApiResponse) => {
    const current = data.current()!
    const utcOffsetSeconds = data?.utcOffsetSeconds()
    const daily = data.daily()!
    const hourly = data.hourly()!

    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),

            temperature_2m: current.variables(0)!.value(),
            relative_humidity_2m: current.variables(1)!.value(),
            precipitation: current.variables(2)!.value(),
            wind_speed_10m: current.variables(3)!.value(),
            apparent_temperature: current.variables(4)!.value(),
            weather_code: current.variables(5)!.value(),
            is_day: current.variables(6)!.value(),
        },
        hourly: {
            time: Array.from(
                {
                    length:
                        (Number(hourly.timeEnd()) - Number(hourly.time())) /
                        hourly.interval(),
                },
                (_, i) => [
                    {
                        date: new Date(
                            (Number(hourly.time()) +
                                i * hourly.interval() +
                                utcOffsetSeconds) *
                                1000
                        ),
                        temp: hourly.variables(0)!.values(i),
                        weather_code: hourly.variables(1)!.values(i),
                        is_day: hourly.variables(2)!.values(i),
                    },
                ]
            ),
        },
        daily: {
            time: Array.from(
                {
                    length:
                        (Number(daily.timeEnd()) - Number(daily.time())) /
                        daily.interval(),
                },
                (_, i) =>
                    new Date(
                        (Number(daily.time()) +
                            i * daily.interval() +
                            utcOffsetSeconds) *
                            1000
                    )
            ),
            temperature_2m_max: daily.variables(0)!.valuesArray(),
            temperature_2m_min: daily.variables(1)!.valuesArray(),
            weather_code: daily.variables(2)!.valuesArray(),
        },
    }

    console.log(weatherData.current)

    return weatherData
}
