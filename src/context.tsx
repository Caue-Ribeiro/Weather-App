import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'
import type { tempUnitsType } from './types/tempUnitsType'
import type { windSpeedType } from './types/windSpeedType'
import type { precipitationType } from './types/precipitationType'

interface AppContextType {
    temperatureUnit: tempUnitsType
    setTemperatureUnit: React.Dispatch<React.SetStateAction<tempUnitsType>>
    windSpeed: windSpeedType
    setWindSpeed: React.Dispatch<React.SetStateAction<windSpeedType>>
    precipitation: precipitationType
    setPrecipitation: React.Dispatch<React.SetStateAction<precipitationType>>
    userCurrentLocation: UserLocationProps
    setUserCurrentLocation: React.Dispatch<
        React.SetStateAction<UserLocationProps>
    >
}

interface AppProviderProps {
    children: ReactNode
}

interface UserLocationProps {
    lat: number
    lon: number
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [temperatureUnit, setTemperatureUnit] =
        useState<tempUnitsType>('celsius')

    const [windSpeed, setWindSpeed] = useState<windSpeedType>('km/h')

    const [precipitation, setPrecipitation] =
        useState<precipitationType>('millimeter')

    const [userCurrentLocation, setUserCurrentLocation] =
        useState<UserLocationProps>({ lat: 0, lon: 0 })

    return (
        <AppContext.Provider
            value={{
                temperatureUnit,
                setTemperatureUnit,
                windSpeed,
                setWindSpeed,
                precipitation,
                setPrecipitation,
                userCurrentLocation,
                setUserCurrentLocation,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = (): AppContextType => {
    const context = useContext(AppContext)

    if (!context)
        throw new Error('useAppContext must be used with an AppProvider')

    return context
}
