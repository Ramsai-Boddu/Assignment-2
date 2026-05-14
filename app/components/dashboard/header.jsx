"use client"
import { useState } from "react";

export default function Header() {
    const [activeToggle, setActiveToggle] = useState("Full Statistics");
    return (
        <div className="relative flex-1 h-[70px] bg-white flex flex-row items-center">
            <div className="font-bold p-[60px]">
                <h1 className="text-2xl">Analytics</h1>
            </div>
            <div className="absolute left-[35%] bg-gray-200 rounded-full p-1 flex items-center gap-2">

                <button
                    onClick={() => setActiveToggle("Full Statistics")}
                    className={`
                        px-4 py-2 rounded-full font-semibold transition-all
                        ${activeToggle === "Full Statistics"
                            ? "bg-white shadow-sm text-black"
                            : "bg-gray-200 text-gray-600 cursor-pointer"
                        }
                    `}
                >
                    Full Statistics
                </button>

                <button
                    onClick={() => setActiveToggle("Total Summary")}
                    className={`
                        px-4 py-2 rounded-full font-semibold transition-all
                        ${activeToggle === "Total Summary"
                            ? "bg-white shadow-sm text-black"
                            : "bg-gray-200 text-gray-600 cursor-pointer"
                        }
                    `}
                > 
                    Total Summary
                </button>

            </div>
            <div className="absolute flex flex-row right-[40px] gap-4 items-center">
                <h1 className="bg-gray-300 w-[40px] h-[40px] items-center rounded-[20%] justify-center text-2xl p-[10px] flex">
                    +
                </h1>
                <div className="bg-red-500 w-[60px] h-[60px] rounded-full">

                </div>
            </div>
        </div>
    )
}