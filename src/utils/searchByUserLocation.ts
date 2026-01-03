import { toast } from 'react-toastify'

import { searchNameByLocation } from './convertUserLocation'
import { useEffect, useState } from 'react'

interface LocationData {
    city: string
    state: string
}

export const useSearchByUserLocation = () => {
    const [locationData, setLocationData] = useState<LocationData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async position => {
                    if (!isMounted) return

                    const lat = position.coords.latitude
                    const lon = position.coords.longitude

                    try {
                        const response = await searchNameByLocation(lat, lon)
                        if (typeof response === 'string') {
                            toast.error(response)
                        } else {
                            setLocationData(response)
                        }
                    } catch (error) {
                        console.error(error)
                        toast.error(
                            'An error occurred while fetching location data.'
                        )
                    } finally {
                        if (isMounted) setLoading(false)
                    }
                },
                () => {
                    if (!isMounted) return
                    toast.error(
                        "We couldn't get your current position. Getting default location."
                    )
                    setLoading(false)
                }
            )
        } else {
            console.log('Geolocation not available')
            if (isMounted) setLoading(false)
        }

        return () => {
            isMounted = false
        }
    }, [])

    return { locationData, loading }
}
