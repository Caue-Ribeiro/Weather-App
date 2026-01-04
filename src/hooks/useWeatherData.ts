import { useWeatherSearch } from './useWeatherSearch'
import type { MapProperties } from '../interfaces/mapInterface'
import { checkWeatherIcon } from '../utils/checkWeatherIcon'
import { useGlobalContext } from '../context'
import { getWeatherData } from '../utils/getWeatherData'

type WeatherSpecificationType = {
    text: string
    value: string
}

type WeeklyForecastType = {
    day: string
    image?: string
    min: string
    max: string
}

type HourlyForecastType = {
    hour: Date
    image?: string
    temperature: string | undefined
}

export const useWeatherData = (addressInfo: MapProperties[] | undefined) => {
    const { windSpeed, precipitation, userCurrentLocation } = useGlobalContext()

    const location =
        addressInfo && addressInfo.length > 0
            ? addressInfo[0]
            : userCurrentLocation
    const { lat, lon } = location

    const { data } = useWeatherSearch(Number(lat), Number(lon))

    let currentDateTime: string = '',
        currentTemperature: string = '',
        currentIcon: string = '',
        weatherSpecifications: WeatherSpecificationType[] = [
            { text: '', value: '' },
        ]

    const weeklyForecast: WeeklyForecastType[] = []

    const hourlyForecast: HourlyForecastType[] = []

    if (data) {
        const weatherData = getWeatherData(data)

        //weather configs by day
        const weatherDaily = weatherData.daily

        for (let i = 0; i < weatherDaily.time.length; i++) {
            const formattedDay = weatherDaily.time[i].toLocaleDateString(
                'en-US',
                { weekday: 'short' }
            )
            const formattedTemperatureMin = weatherDaily.temperature_2m_min
                ? weatherDaily.temperature_2m_min[i].toFixed(0)
                : '0'
            const formattedTemperatureMax = weatherDaily.temperature_2m_max
                ? weatherDaily.temperature_2m_max[i].toFixed(0)
                : '0'

            const weatherCode = weatherDaily.weather_code
                ? weatherDaily.weather_code[i]
                : 0

            weeklyForecast.push({
                day: formattedDay,
                image: checkWeatherIcon(weatherCode),
                min: formattedTemperatureMin,
                max: formattedTemperatureMax,
            })
        }

        //weather current config for time
        currentDateTime = weatherData.current.time.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        })

        //weather current config for temperature
        currentTemperature = weatherData.current.temperature_2m.toFixed(0)

        const currentIsDayorNight: number = weatherData.current.is_day

        //weather current code config
        currentIcon = checkWeatherIcon(
            weatherData.current.weather_code,
            currentIsDayorNight
        )

        //weather specifications for current temperature
        weatherSpecifications = [
            {
                text: 'Feels like',
                value: `${weatherData.current.apparent_temperature.toFixed(
                    0
                )}°`,
            },
            {
                text: 'Humidity',
                value: `${weatherData.current.relative_humidity_2m}%`,
            },
            {
                text: 'Wind',
                value: `${weatherData.current.wind_speed_10m.toFixed(
                    1
                )} ${windSpeed}`,
            },
            {
                text: 'Precipitation',
                value: `${weatherData.current.precipitation.toFixed(
                    1
                )} ${precipitation}`,
            },
        ]

        //weather config by hour
        const weatherHourly = weatherData.hourly

        for (let i = 0; i < weatherHourly.time.length; i++) {
            const hour = weatherHourly.time[i][0]

            const weatherCode = hour ? hour?.weather_code : 0

            const isDayOrNight = hour.is_day

            if (isDayOrNight)
                hourlyForecast.push({
                    hour: hour.date,
                    image: checkWeatherIcon(weatherCode, isDayOrNight),
                    temperature: hour.temp?.toFixed(0),
                })
        }
    }

    return {
        currentDateTime,
        currentTemperature,
        weatherSpecifications,
        hourlyForecast,
        weeklyForecast,
        currentIcon,
    }
}
