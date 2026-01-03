export const checkWeatherIcon = (
    weatherCode: number | null,
    isDayorNight?: number
): string => {
    if (weatherCode == null) return ''

    if (weatherCode >= 0 && weatherCode <= 2) {
        if (isDayorNight == 0) return '../../public/images/moon.png'
        return '../../public/images/icon-sunny.webp'
    }
    if (weatherCode == 3) {
        if (isDayorNight == 0) return '../../public/images/night.png'
        return '../../public/images/icon-partly-cloudy.webp'
    }

    if (weatherCode >= 61 && weatherCode <= 67)
        return '../../public/images/icon-drizzle.webp'

    if (weatherCode >= 80 && weatherCode <= 82)
        return '../../public/images/icon-rain.webp'

    if (weatherCode >= 95) return '../../public/images/thunderstorm.png'

    return 'Unknown'
}
