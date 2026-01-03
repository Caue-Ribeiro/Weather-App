import React, { useState } from 'react'
import settingsIcon from '../../public/images/icon-units.svg'
import { useGlobalContext } from '../context'
import type { tempUnitsType } from '../types/tempUnitsType'
import type { windSpeedType } from '../types/windSpeedType'
import type { precipitationType } from '../types/precipitationType'

const ToggleButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { setTemperatureUnit, setWindSpeed, setPrecipitation } =
        useGlobalContext()

    const handleUnits = (e: React.MouseEvent<HTMLLIElement>) => {
        const tempUnit = e.currentTarget.dataset.value as tempUnitsType

        setTemperatureUnit(tempUnit)
    }

    const handleWindSpeed = (e: React.MouseEvent<HTMLLIElement>) => {
        const windSpeedOption = e.currentTarget.dataset.value as windSpeedType

        setWindSpeed(windSpeedOption)
    }

    const handlePrecipitation = (e: React.MouseEvent<HTMLLIElement>) => {
        const precipitationOption = e.currentTarget.dataset
            .value as precipitationType

        setPrecipitation(precipitationOption)
    }

    return (
        <section className="relative inline-block text-left mr-2.5">
            <button
                id="dropdownDefaultButton"
                onClick={() => setIsOpen(!isOpen)}
                datatype="dropdown"
                className="relative inline-flex items-center justify-center gap-1 text-white bg-gray_1 hover:bg-gray_2 cursor-pointer font-medium rounded-lg border-[0.1px] text-sm px-4 py-2 w-full"
                type="button"
            >
                <span>
                    <img src={settingsIcon} alt="settings icon" />
                </span>
                <p>Units</p>
                <svg
                    className={`w-4 h-4 ms-1.5 -me-0.5 ${
                        isOpen
                            ? 'transition-transform rotate-180 duration-300'
                            : 'transition-transform rotate-0 duration-300'
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 9-7 7-7-7"
                    />
                </svg>
            </button>

            <div
                id="dropdown"
                className={`${
                    isOpen ? 'block' : 'hidden'
                } z-10  text-white absolute right-0 mt-2 border rounded-2xl bg-gray_1`}
            >
                <ul
                    className="p-2 text-sm text-body font-medium list-style "
                    aria-labelledby="dropdownDefaultButton"
                >
                    <li>
                        <h4 className="text-[0.8rem] font-extralight">
                            Temperature
                        </h4>
                    </li>
                    <li onClick={handleUnits} data-value={'celsius'}>
                        <p>Celsius(°C)</p>
                    </li>
                    <li onClick={handleUnits} data-value={'fahrenheit'}>
                        <p>Fahrenheit(°F)</p>
                    </li>

                    <li>
                        <h4 className="text-[0.8rem] font-extralight">
                            Wind Speed
                        </h4>
                    </li>
                    <li onClick={handleWindSpeed} data-value={'km/h'}>
                        <p>km/h</p>
                    </li>
                    <li onClick={handleWindSpeed} data-value={'mph'}>
                        <p>mph</p>
                    </li>

                    <li>
                        <h4 className="text-[0.8rem] font-extralight">
                            Precipitation
                        </h4>
                    </li>
                    <li onClick={handlePrecipitation} data-value={'millimeter'}>
                        <p>Millimeters(mm)</p>
                    </li>
                    <li onClick={handlePrecipitation} data-value={'inch'}>
                        <p>Inches(in)</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default ToggleButton
