import searchIcon from '../../public/images/icon-search.svg'

const SearchInput: React.FC = () => {
    return (
        <form className="flex flex-col w-2xs m-auto gap-2.5 md:flex-row md:w-96 md:justify-center ">
            <div className="flex gap-1.5 bg-gray_2 px-2 rounded-md ">
                <img src={searchIcon} alt="search icon" />
                <input
                    type="search"
                    placeholder="Search for a place"
                    className="bg-transparent p-2.5 text-white placeholder:text-white outline-0 "
                    name="search"
                />
            </div>

            <button
                type="submit"
                className="bg-purple_1 hover:bg-purple_2 transition-colors rounded-md text-white p-2.5 cursor-pointer font-DM font-semibold md:px-4"
            >
                search
            </button>
        </form>
    )
}

export default SearchInput
