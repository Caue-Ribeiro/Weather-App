export const WeatherSkeleton = () => {
    return (
        <section className="font-DM grid justify-center place-items-center lg:flex lg:justify-center lg:gap-3 animate-pulse">
            <div className="md:mx-2">
                {/* Main Card Skeleton */}
                <div className="w-72 mt-9 h-60 mx-auto bg-gray-800 flex flex-col items-center md:w-full md:flex-row md:justify-between md:p-6 rounded-2xl border border-gray-700">
                    <div className="text-center md:text-start w-full md:w-auto">
                        {/* City Name Placeholder */}
                        <div className="h-6 w-32 bg-gray-600 rounded mx-auto md:mx-0 mt-7"></div>
                        {/* Date Placeholder */}
                        <div className="h-4 w-24 bg-gray-700 rounded mx-auto md:mx-0 mt-2"></div>
                    </div>

                    <div className="flex items-center mt-7 gap-4">
                        {/* Icon Placeholder */}
                        <div className="w-20 h-20 bg-gray-600 rounded-full"></div>
                        {/* Temperature Placeholder */}
                        <div className="h-16 w-24 bg-gray-600 rounded"></div>
                    </div>
                </div>

                {/* Weather Specifications Skeleton */}
                <div className="grid grid-cols-2 w-64 gap-2.5 mt-4 mx-auto md:flex md:w-full">
                    {[1, 2, 3, 4].map(item => (
                        <div
                            key={item}
                            className="w-full h-20 bg-gray-800 border border-gray-700 p-2.5 rounded-md flex flex-col justify-between"
                        >
                            <div className="h-3 w-16 bg-gray-600 rounded"></div>
                            <div className="h-5 w-12 bg-gray-600 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Daily Forecast Skeleton */}
                <div className="w-2xs md:w-full mx-auto p-1">
                    <div className="h-5 w-32 bg-gray-700 rounded mt-5 mb-4"></div>
                    <div className="grid grid-cols-3 justify-items-center gap-y-2 md:flex md:justify-start md:gap-3.5 md:items-center">
                        {[1, 2, 3, 4, 5, 6].map(item => (
                            <div
                                key={item}
                                className="bg-gray-800 border border-gray-700 w-20 h-24 rounded-md flex flex-col items-center justify-around p-2"
                            >
                                <div className="h-3 w-8 bg-gray-600 rounded"></div>
                                <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
                                <div className="flex gap-2">
                                    <div className="h-3 w-4 bg-gray-700 rounded"></div>
                                    <div className="h-3 w-4 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hourly Forecast Skeleton */}
            <div className="bg-gray-800 h-80 w-3xs lg:w-3xs md:w-full mx-2 my-3 md:mt-9 md:h-125 rounded-md p-3 border border-gray-700">
                <div className="h-5 w-32 bg-gray-600 rounded mb-4"></div>
                <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6, 7].map(item => (
                        <div
                            key={item}
                            className="h-10 bg-gray-700 rounded-md w-full"
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    )
}
