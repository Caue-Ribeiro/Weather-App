import { useQuery } from '@tanstack/react-query'
import { fetchWeatherApi } from 'openmeteo'
import { useGlobalContext } from '../context'

interface WeatherRequestParams {
    latitude: number
    longitude: number
    daily?: string[]
    hourly?: string | string[]
    current?: string[]
    timezone: string
    wind_speed_unit?: 'km/h' | 'mph'
    precipitation_unit?: 'mm' | 'inch'
    temperature_unit?: 'fahrenheit' | 'celsius'
}

const urlWeather: string = 'https://api.open-meteo.com/v1/forecast'

export const useWeatherSearch = (lat: number, lon: number) => {
    const { temperatureUnit, windSpeed, precipitation } = useGlobalContext()

    const params: WeatherRequestParams = {
        latitude: lat,
        longitude: lon,
        daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code'],
        hourly: ['temperature_2m', 'weather_code', 'is_day'],
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'precipitation',
            'wind_speed_10m',
            'apparent_temperature',
            'weather_code',
            'is_day',
        ],
        timezone: 'America/Sao_Paulo',
        temperature_unit: temperatureUnit,
        ...(windSpeed == 'mph' ? { wind_speed_unit: 'mph' } : {}),
        ...(precipitation == 'inch' ? { precipitation_unit: 'inch' } : {}),
    }

    return useQuery({
        queryKey: ['weather', temperatureUnit, windSpeed, lat, lon],
        queryFn: async () => {
            const response = await fetchWeatherApi(urlWeather, params)

            return response[0]
        },
    })
}
