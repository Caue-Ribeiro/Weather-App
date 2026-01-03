import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { MapProperties } from '../interfaces/mapInterface'

export const useMapSearch = (address: string) => {
    return useQuery<MapProperties[]>({
        queryKey: ['mapApi', address],
        queryFn: async () => {
            if (!address) return []

            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(
                    address
                )}&format=json`
            )

            return response.data
        },
        enabled: address.length > 0,
        staleTime: 1000 * 60 * 5,
    })
}
