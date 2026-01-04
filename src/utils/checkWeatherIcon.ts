export const checkWeatherIcon = (
    weatherCode: number | null,
    isDayorNight?: number
): string => {
    if (weatherCode == null) return ''

    if (weatherCode >= 0 && weatherCode <= 2) {
        if (isDayorNight == 0) return '/images/moon.png'
        return '/images/icon-sunny.webp'
    }
    if (weatherCode == 3) {
        if (isDayorNight == 0) return '/images/night.png'
        return '/images/icon-partly-cloudy.webp'
    }

    if (weatherCode >= 61 && weatherCode <= 67)
        return '/images/icon-drizzle.webp'

    if (weatherCode >= 80 && weatherCode <= 82) return '/images/icon-rain.webp'

    if (weatherCode >= 95) return '/images/thunderstorm.png'

    return 'Unknown'
}
