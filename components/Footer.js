
import { FaSearchLocation } from "react-icons/fa";

const HeroSection = () => {
    return (
        <div className=" text-center pt-2  md:bg-center bg-right-bottom bg-cover bg-no-repeat rounded-t-2xl"
            style={{
                backgroundImage: 'url("./Group6.png")',
                backgroundColor: "#FFFFFF66"
            }}>

            <div className="md:py-8 py-6  rounded-lg ">
                <h2 className="text-xl text-black font-semibold">
                    Available Across East Africa
                </h2>
                <p className="text-[#1E1E1E] font-light md:mb-4 mb-8 text-[14px]">
                    Connecting professionals in major cities and growing markets
                </p>


                <div className="flex flex-row justify-between gap-4 md:max-w-[1240px] md:mx-auto md:mb-0 mb-4 mx-3">
                    <span
                        className="bg-white px-4 py-2 rounded-full shadow-sm text-sm text-[#1E1E1E] flex items-center gap-2 md:w-[200px] justify-center transform transition-transform duration-300 hover:scale-105 cursor-pointer ;"
                        style={{
                            boxShadow: "-10px -10px 30px 4px rgba(0,0,0,0.1), 10px 10px 30px 4px rgba(45,78,255,0.15)"
                        }}
                    >
                        <FaSearchLocation className="" />
                        Nairobi, Kenya
                    </span>
                    <span

                        className="bg-white px-4 py-2 rounded-full shadow-sm text-sm text-[#1E1E1E] flex items-center gap-2 md:w-[200px] justify-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                        style={{
                            boxShadow: "-10px -10px 30px 4px rgba(0,0,0,0.1), 10px 10px 30px 4px rgba(45,78,255,0.15)"
                        }}
                    >
                        <FaSearchLocation className="" />
                        Addis Ababa, Ethiopia
                    </span>
                </div>
                <div className="flex flex-row justify-between gap-4 max-w-[720px] md:mx-auto md:mb-0 mb-4 mx-3">
                    <span
                        className="bg-white px-4 py-2 rounded-full shadow-sm text-sm text-[#1E1E1E] flex items-center gap-2 md:w-[200px] justify-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                        style={{
                            boxShadow: "-10px -10px 30px 4px rgba(0,0,0,0.1), 10px 10px 30px 4px rgba(45,78,255,0.15)"
                        }}
                    >
                        <FaSearchLocation className="" />
                        Kampala, Uganda
                    </span>
                    <span

                        className="bg-white px-4 py-2 rounded-full shadow-sm text-sm text-[#1E1E1E] flex items-center gap-2 md:w-[200px] justify-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                        style={{
                            boxShadow: "-10px -10px 30px 4px rgba(0,0,0,0.1), 10px 10px 30px 4px rgba(45,78,255,0.15)"
                        }}
                    >
                        <FaSearchLocation className="" />
                        Kigali, Rwanda
                    </span>
                </div>
                <div className="flex flex-row justify-center gap-4 max-w-sm md:mx-auto md:mb-0 mb-4 mx-3">
                    <span
                        className="bg-white px-4 py-2 rounded-full shadow-sm text-sm text-[#1E1E1E] flex items-center gap-2 w-[220px] justify-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                        style={{
                            boxShadow: "-10px -10px 30px 4px rgba(0,0,0,0.1), 10px 10px 30px 4px rgba(45,78,255,0.15)"
                        }}
                    >
                        <FaSearchLocation className="" />
                        Dar es Salaam, Tanzania
                    </span>

                </div>
            </div>
        </div >
    );
};

export default HeroSection