import type React from 'react'
import logo from '../../public/images/logo.svg'
import ToggleButton from './ToggleButton'

const Navbar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center font-DM lg:w-244 lg:mx-auto ">
            <figure className="m-2.5">
                <img
                    className="w-30"
                    src={logo}
                    alt="logo written Weather Now"
                />
            </figure>
            <ToggleButton />
        </nav>
    )
}

export default Navbar
