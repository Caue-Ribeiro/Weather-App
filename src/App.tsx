import Navbar from './components/Navbar'
import SearchInput from './components/SearchInput'
import { WeatherSkeleton } from './components/WeatherSkeleton'
import { useMapSearch } from './hooks/useMapSearch'
import { useWeatherData } from './hooks/useWeatherData'
import { useSearchByUserLocation } from './utils/searchByUserLocation'

function App() {
    const { locationData } = useSearchByUserLocation()
    const url = new URLSearchParams(window.location.search)

    const searchQuery: string =
        Object.fromEntries(url)?.search || locationData?.city || ''

    const { data: addressInfo, isPending } = useMapSearch(searchQuery)

    const municipalityAndCountry =
        addressInfo &&
        `${addressInfo[0].address.municipality}, ${addressInfo[0].address.country}`

    const {
        currentDateTime,
        currentTemperature,
        hourlyForecast,
        weatherSpecifications,
        weeklyForecast,
        currentIcon,
    } = useWeatherData(addressInfo)

    const isLoadingState = isPending || !addressInfo || addressInfo.length === 0

    return (
        <>
            <Navbar />

            <h1 className="text-center w-48 md:w-full mx-auto my-3 text-white font-bricolage ">
                How's the sky looking today?
            </h1>

            <SearchInput isPending={isPending} />

            {isLoadingState ? (
                <WeatherSkeleton />
            ) : (
                <section className="font-DM grid justify-center place-items-center lg:flex lg:justify-center lg:gap-3">
                    <div className="md: mx-2">
                        {/* forecast */}
                        <div
                            className={`w-72 mt-9 h-60 mx-auto bg-[url(../public/images/bg-today-small.svg)] flex flex-col items-center md:bg-[url(/images/bg-today-large.svg)] md:w-full md:flex-row md:justify-between md:p-6 bg-cover rounded-2xl `}
                        >
                            <div className="text-center md:text-start">
                                <h2 className=" mt-7">
                                    {isPending
                                        ? 'Loading...'
                                        : municipalityAndCountry}
                                </h2>
                                <p className="text-white font-extralight">
                                    {currentDateTime}
                                </p>
                            </div>

                            <div className="flex items-center mt-7">
                                <img
                                    src={currentIcon}
                                    alt="sun icon"
                                    className="w-28"
                                />
                                <h3 className="italic text-white font-semibold text-7xl">
                                    {`${currentTemperature}°`}
                                </h3>
                            </div>
                        </div>

                        {/* weather specifications */}
                        <div className="grid grid-cols-2 w-64 gap-2.5 mt-4 mx-auto md:flex md:w-full">
                            {weatherSpecifications.map(
                                ({
                                    text,
                                    value,
                                }: {
                                    text: string
                                    value: string
                                }) => {
                                    return (
                                        <div
                                            key={value}
                                            className="w-full h-full bg-gray_1 text-white font-extralight border border-gray_2 p-2.5 rounded-md flex flex-col justify-between"
                                        >
                                            <p>{text}</p>
                                            <p>{value}</p>
                                        </div>
                                    )
                                }
                            )}
                        </div>

                        {/* daily forecast */}
                        <div className="w-2xs md:w-full mx-auto p-1">
                            <h3 className="text-white font-semibold mt-5">
                                Daily forecast
                            </h3>

                            <div className="grid grid-cols-3 justify-items-center gap-y-2 md:flex md:justify-start md:gap-3.5 md:items-center text-center  text-white  mt-4">
                                {weeklyForecast.map(
                                    ({
                                        day,
                                        image,
                                        min,
                                        max,
                                    }: {
                                        day: string
                                        image?: string
                                        min: string
                                        max: string
                                    }) => {
                                        return (
                                            <div
                                                key={day}
                                                className="bg-gray_1 border border-gray_2 w-20  rounded-md"
                                            >
                                                <h3>{day}</h3>
                                                <img
                                                    src={image}
                                                    alt=""
                                                    className="w-12 mx-auto"
                                                />
                                                <span className="flex justify-between p-1.5">
                                                    <p>{min}</p>
                                                    <p>{max}</p>
                                                </span>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    {/* hourly forecast */}
                    <div className="bg-gray_1 h-80 w-3xs lg:w-3xs md:w-full mx-2  my-3 md:mt-9 md:h-125 rounded-md p-3 overflow-auto scrollbar-thin scrollbar-minimal scrollbar-clean ">
                        <h3 className="font-semibold text-white">
                            Hourly Forecast
                        </h3>

                        <section>
                            {hourlyForecast
                                .filter(
                                    h =>
                                        h.hour.getDate() == new Date().getDate()
                                )
                                .map(({ hour, image, temperature }, id) => {
                                    return (
                                        <div
                                            key={id}
                                            className="bg-gray_1 border border-gray_2 shadow-2xs shadow-gray-800 h-10 flex justify-between items-center p-1 mt-2 rounded-md text-white "
                                        >
                                            <div className="flex items-center gap-1">
                                                <img
                                                    src={image}
                                                    alt="weather condition icon"
                                                    className="w-9 h-full"
                                                />
                                                <p>
                                                    {hour.toLocaleTimeString(
                                                        'en-US',
                                                        {
                                                            hour: 'numeric',
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                            <p className="text-[0.8rem]">
                                                {temperature}
                                            </p>
                                        </div>
                                    )
                                })}
                        </section>
                    </div>
                </section>
            )}
        </>
    )
}

export default App
