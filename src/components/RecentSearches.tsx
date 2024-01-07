import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { optionType } from "../types";

type Props = {
    recentSearches: []
    removeSearch: (index: number) => void
    getForecast: (city: optionType) => void
}

export const RecentSearches = ({ recentSearches, removeSearch, getForecast }: Props) => {
    const [isHover, setIsHover] = useState(false)
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    return (
        <div className='md:flex hidden flex-col gap-4 p-4 ml-5 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700'>
            <h1 className="text-2xl font-thin"><span className="font-black">Recent </span>Searches</h1>
            <div className='flex flex-col-reverse gap-1'>
                {recentSearches.slice(-5).map((search: optionType, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                        <div
                            onClick={() => getForecast(search)}
                            className={`hover:cursor-pointer hover:font-bold ${isHover && hoverIndex === index ? 'text-red-500' : ''}`}
                        >
                            {search.name}, {search.country}
                        </div>
                        <IoCloseSharp
                            onMouseOver={() => {
                                setIsHover(true)
                                setHoverIndex(index)
                            }}
                            onMouseLeave={() => {
                                setIsHover(false)
                                setHoverIndex(null)
                            }}
                            className={`hover:cursor-pointer ${isHover ? 'hover:text-red-500' : ''}`}
                            onClick={() => removeSearch(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
