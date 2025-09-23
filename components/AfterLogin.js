
import { Users, Building2, Search, MapPin, User, Eye, UserRound } from "lucide-react";
import HeroSection from "./Footer";
import { useRouter } from "next/router";
import Image from "next/image";

function AfterLogin() {
    const router = useRouter()
    return (<>
        <div className="max-w-7xl min-h-screen px-4  mx-auto md:pb-0 pb-10">
            <div className="pt-18">
                <div className="text-center mb-12">
                    <h2 className="md:text-[52px] text-3xl leading-tight  font-bold text-[#50A2FF] mb-2 md:mt-0 mt-6">
                        Discover Professional Networks
                    </h2>
                    <p className="text-black text-[15px] md:text-[16px] max-w-md mx-auto font-Poppins">
                        Connect with professionals and companies across East Africa.
                        Build your network, find opportunities, and grow your career.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-[20px] transform transition-transform duration-300 hover:scale-105 "
                    >
                        <div className="py-6 text-center md:bg-center bg-right-bottom bg-cover bg-no-repeat rounded-t-2xl"
                            style={{
                                backgroundImage: 'url("./image-3.png")',
                            }}
                        >
                            <div className="flex items-center justify-center mx-auto mb-4 ">
                                <UserRound className=" text-white" size={45} />
                            </div>
                            <h3 className="text-[18px] font-bold text-white mb-2">
                                Find Professionals
                            </h3>
                            <p className="text-white leading-tight w-[85%] mx-auto text-[11px]">
                                Connect with talented professionals across various
                                industries. Find experts, mentors, and potential
                                collaborators.
                            </p>
                        </div>
                        <div
                            className="[background:linear-gradient(180deg,rgba(255,255,255,0.35)_38.16%,rgba(153,153,153,0.35)_99.93%)] p-4 rounded-xl"
                        >
                            <div className="space-y-3 mb-6 flex flex-wrap mx-auto justify-center items-center space-x-3">
                                <div className="flex gap-1 items-center text-[#1E1E1E] px-3 py-2 rounded-2xl text-[11px] bg-[#FFEFB466] transform transition-transform duration-300 hover:scale-103
">
                                    <Users size={15} />
                                    <span>Browse by expertise</span>
                                </div>
                                <div className="flex gap-1 items-center text-[#1E1E1E] px-3 py-2 rounded-2xl text-[11px] bg-[#FFEFB466] transform transition-transform duration-300 hover:scale-103">
                                    <MapPin size={15} />
                                    <span>Filter by location</span>
                                </div>
                                <div className="flex gap-1 items-center text-[#1E1E1E] px-3 py-2 rounded-2xl text-[11px] bg-[#FFEFB466] transform transition-transform duration-300 hover:scale-103">
                                    <Eye size={15} />
                                    <span>View professional profiles</span>
                                </div>
                            </div>

                            <button
                                className="w-[80%] mx-auto bg-[#50A2FF99] text-black font-medium py-2 px-4 rounded-lg flex gap-1 items-center justify-center cursor-pointer text-[11px] transform transition-transform duration-300 hover:scale-105"
                                onClick={() => router.push('/FindProfessional')}
                            >
                                <Search size={13} />
                                Browse Professionals
                            </button>
                        </div>

                    </div>
                    <div className="bg-white rounded-[20px] transform transition-transform duration-300 hover:scale-105"
                    >
                        <div className="py-6 text-center md:bg-center bg-right-bottom bg-cover bg-no-repeat rounded-t-2xl"
                            style={{
                                backgroundImage: 'url("./image1.png")',
                            }}
                        >
                            <div className="flex items-center justify-center mx-auto mb-4 ">
                                <Building2 className=" text-white" size={45} />
                            </div>
                            <h3 className="text-[18px] font-bold text-white mb-2">
                                Find Companies
                            </h3>
                            <p className="text-white leading-tight w-[85%] mx-auto text-[11px]">
                                Discover companies and organizations making an impact. Explore opportunities and learn about industry leaders.
                            </p>
                        </div>
                        <div
                            className="[background:linear-gradient(180deg,rgba(255,255,255,0.35)_38.16%,rgba(153,153,153,0.35)_99.93%)] p-4 rounded-xl"
                        >
                            <div className="space-y-3 mb-6 flex flex-wrap mx-auto justify-center items-center space-x-3">
                                <div className="flex gap-1 items-center text-[#1E1E1E] px-3 py-2 rounded-2xl text-[11px] bg-[#FFEFB466] transform transition-transform duration-300 hover:scale-103
">
                                    <Users size={15} />
                                    <span>Browse by industry</span>
                                </div>
                                <div className="flex gap-1 items-center text-[#1E1E1E] px-3 py-2 rounded-2xl text-[11px] bg-[#FFEFB466] transform transition-transform duration-300 hover:scale-105">
                                    <MapPin size={15} />
                                    <span>Filter by location</span>
                                </div>
                                <div className="flex gap-1 items-center text-[#1E1E1E] px-3 py-2 rounded-2xl text-[11px] bg-[#FFEFB466] transform transition-transform duration-300 hover:scale-105">
                                    <Eye size={15} />
                                    <span>view company profiles</span>
                                </div>
                            </div>

                            <button
                                className="w-[80%] mx-auto bg-[#50A2FF99] text-black font-medium py-2 px-4 rounded-lg  flex gap-1 items-center justify-center cursor-pointer text-[11px] transform transition-transform duration-300 hover:scale-105"
                                onClick={() => router.push('/FindCompany')}
                            >
                                <Search size={13} />
                                Browse Companies
                            </button>
                        </div>

                    </div>
                    <div className="bg-white rounded-[20px] transform transition-transform duration-300 hover:scale-105 "
                    >
                        <div className="py-6 text-center md:bg-center bg-right-bottom bg-cover bg-no-repeat rounded-t-2xl transform transition-transform duration-300"
                            style={{
                                backgroundImage: 'url("./image-2.png")',
                            }}
                        >
                            <div className="flex items-center justify-center mx-auto mb-4 ">
                                <UserRound className=" text-white" size={45} />
                            </div>
                            <h3 className="text-[18px] font-bold text-white mb-2">
                                Smart Directory
                            </h3>
                            <p className="text-white leading-tight w-[85%] mx-auto text-[11px]">
                                Discover top professionals and leading companies. Connect with experts, mentors, and organizations to grow together.
                            </p>
                        </div>
                        <div
                            className="[background:linear-gradient(180deg,rgba(255,255,255,0.35)_38.16%,rgba(153,153,153,0.35)_99.93%)] p-4 rounded-[20px]"
                        >
                            <div className="space-y-3 mb-6 flex flex-wrap mx-auto justify-center items-center space-x-3">
                                <div className="flex gap-1 items-center text-[#1E1E1E] px-3 py-2 rounded-2xl text-[11px] bg-[#FFEFB466] transform transition-transform duration-300 hover:scale-103
">
                                    <Users size={15} />
                                    <span>Browse Everything</span>
                                </div>
                                <div className="flex gap-1 items-center text-[#1E1E1E] px-3 py-2 rounded-2xl text-[11px] bg-[#FFEFB466] transform transition-transform duration-300 hover:scale-103">
                                    <MapPin size={15} />
                                    <span>Filter by location</span>
                                </div>
                                <div className="flex gap-1 items-center text-[#1E1E1E] px-3 py-2 rounded-2xl text-[11px] bg-[#FFEFB466] transform transition-transform duration-300 hover:scale-103">
                                    <Eye size={15} />
                                    <span>View All profiles</span>
                                </div>
                            </div>

                            <button
                                className="w-[80%] mx-auto bg-[#50A2FF99] text-black font-medium py-2 px-4 rounded-lg  flex gap-1 items-center justify-center cursor-pointer text-[11px] transform transition-transform duration-300 hover:scale-103"
                                onClick={() => router.push('/dashboard')}
                            >
                                <Search size={13} />
                                Browse Directory
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-14 ">
                <div>
                    <Image src="/image2.png" alt="Growing Network Across East Africa" width={700} height={700} />
                </div>
                <div className="relative flex flex-col justify-center items-center">
                    <div className=" text-center">
                        <div className="mb-10 flex flex-col justify-center items-center">
                            <h1 className="md:text-[26px] text-[20px] font-bold text-[#1E1E1E]">
                                Growing Network Across East Africa
                            </h1>
                            <p className="text-[#1E1E1E] md:text-[14px] text-[13px] md:w-full w-[80%]">
                                Join thousands of professionals and companies building the
                                future together
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 poppins">
                            <div className="text-center [background:linear-gradient(0deg,rgba(176,201,230,0.3),rgba(176,201,230,0.3)),linear-gradient(0deg,rgba(237,230,246,0.2),rgba(237,230,246,0.2))] py-4 rounded-[20px] shadow-[1.5px_2px_2px_0px]  cursor-pointer 
                     transform transition-transform duration-300 hover:scale-105">
                                <p className="md:text-[26px] text-[20px] font-semibold text-[#1E1E1E] ">
                                    400+
                                </p>
                                <p className="md:text-[26px] text-[20px] font-semibold text-[#1E1E1E]">Professionals</p>
                            </div>
                            <div className="text-center [background:linear-gradient(0deg,rgba(176,201,230,0.3),rgba(176,201,230,0.3)),linear-gradient(0deg,rgba(237,230,246,0.2),rgba(237,230,246,0.2))] py-4 rounded-[20px] shadow-[1.5px_2px_2px_0px]  cursor-pointer 
                     transform transition-transform duration-300 hover:scale-105">
                                <p className="md:text-[26px] text-[20px] font-semibold text-[#1E1E1E] ">
                                    100+
                                </p>
                                <p className="md:text-[26px] text-[20px] font-semibold text-[#1E1E1E]">
                                    Companies</p>
                            </div>
                            <div className="text-center [background:linear-gradient(0deg,rgba(176,201,230,0.3),rgba(176,201,230,0.3)),linear-gradient(0deg,rgba(237,230,246,0.2),rgba(237,230,246,0.2))] py-4 rounded-[20px] shadow-[1.5px_2px_2px_0px]  cursor-pointer 
                     transform transition-transform duration-300 hover:scale-105">
                                <p className="md:text-[26px] text-[20px] font-semibold text-[#1E1E1E] ">
                                    50+
                                </p>
                                <p className="md:text-[26px] text-[20px] font-semibold text-[#1E1E1E]">
                                    Industries</p>
                            </div>
                            <div className="text-center [background:linear-gradient(0deg,rgba(176,201,230,0.3),rgba(176,201,230,0.3)),linear-gradient(0deg,rgba(237,230,246,0.2),rgba(237,230,246,0.2))] py-4 rounded-[20px] shadow-[1.5px_2px_2px_0px]  cursor-pointer 
                     transform transition-transform duration-300 hover:scale-105">
                                <p className="md:text-[26px] text-[20px] font-semibold text-[#1E1E1E] ">
                                    10+
                                </p>
                                <p className="md:text-[26px] text-[20px] font-semibold text-[#1E1E1E]">Countries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <HeroSection />
    </>)
}

export default AfterLogin