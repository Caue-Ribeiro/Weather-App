import axios from 'axios'

export async function searchNameByLocation(lat: number, lon: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`

    try {
        const response = await axios(url)

        if (!response.data) {
            throw new Error('Erro na resposta da rede')
        }

        const userAddress = response.data

        const city =
            userAddress.address.city ||
            userAddress.address.town ||
            userAddress.address.village ||
            userAddress.address.hamlet ||
            userAddress.address.municipality ||
            'Unknown Location'

        const state = userAddress.address.state || ''

        return { city, state }
    } catch (error) {
        console.error('Error searching for location name:', error)
        return 'Error trying to obtain location'
    }
}
