
import React, { useContext, useEffect, useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import countryList from "react-select-country-list";
const stats = [
    {
        number: "10K+",
        label: "Professionals",

    },
    {
        number: "400+",
        label: "Companies",

    },
    {
        number: "5",
        label: "Countries",
    },
    {
        number: "50+",
        label: "Industries",

    },
];
function BeforeLogin() {
    const countryOptions = useMemo(() => countryList().getData(), []);

    return (
        <>
            <div className="md:py-6 md:pt-40 pt-14 px-4 md:px-8 relative max-w-6xl  flex flex-col lg:flex-row items-center mx-auto">
                <div className="flex flex-col justify-start items-start w-full md:gap-0 gap-6">
                    <div>
                        <p className="font-bold text-white md:text-[52px] text-[42px] leading-[52px]"> Welcome to the professional community <span className="flex md:hidden"> for {" "} <span className="text-[#FDC700] ml-2">{" "} East Africa</span></span> </p>
                    </div>
                    <div className="flex md:gap-8 gap-2 mt-4">
                        <div className="shadow-2xl text-[#1E1E1E] md:max-w-[320px] w-fit md:p-2 p-4 flex justify-center items-center rounded-3xl"
                            style={{
                                background: "linear-gradient(93.28deg, rgba(176, 201, 230, 0.15) 0%, rgba(255, 255, 255, 0.5) 48.74%, rgba(176, 201, 230, 0.35) 100%)",
                            }}
                        >
                            <p className="md:text-[14px] text-md text-center"> Connect with professionals, discover opportunities, and build your career across Kenya, Tanzania, Riwanda, and beyond.</p>
                        </div>
                        <div className="md:flex hidden">
                            <p className="font-bold text-white md:text-[52px] text-3xl"> for <span className="text-[#FDC700] "> East Africa</span></p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="md:mt-10 relative p-4 md:p-6 rounded-2xl max-w-3xl mx-auto">
                <div className="relative flex flex-col md:flex-row gap-4 w-full">

                    {/* Search Input */}
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search professionals or Company"
                            className="w-full text-black/80 bg-white/50 pl-10 pr-4 py-2 rounded-[12px] focus:outline-none"
                        />
                    </div>

                    {/* Location + Button */}
                    <div className="flex flex-row gap-4 md:w-auto w-full">
                        {/* Location Dropdown */}
                        <div className="relative w-full md:w-[180px] bg-white/50 rounded-[12px]">
                            <select className="appearance-none text-black/70 px-4 py-2 pr-10 w-full focus:outline-none rounded-[12px]">
                                <option>Select Location</option>
                                {countryOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg
                                    className="w-4 h-4 fill-current text-gray-900"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button
                            className="bg-[#FDC700] text-black w-[150px] md:w-[120px] px-7 py-2 rounded-[12px] font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-[16px]"
                            onClick={() => router.push("/dashboard")}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="py-4 min-h-[250px]">
                <div className="max-w-6xl mx-auto h-[200px] px-4 grid grid-cols-2 md:grid-cols-4 flex-wrap justify-evenly items-center gap-8 md:gap-20 text-center">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`py-6 rounded-3xl shadow-2xl text-[#1E1E1E]`}
                            style={{
                                background: `linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)),
                         linear-gradient(0deg, rgba(237, 230, 246, 0.2), rgba(237, 230, 246, 0.2))`,
                            }}
                        >
                            <h2 className={`text-3xl font-bold `}>{stat.number}</h2>
                            <p className={`text-lg font-bold `}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
export default BeforeLogin