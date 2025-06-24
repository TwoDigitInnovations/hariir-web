import React, { useEffect, useState } from "react";
import { FiSearch, FiStar, FiGlobe } from "react-icons/fi";
import { useRouter } from "next/router";
import { FaUser, FaBuilding, FaSearchLocation } from "react-icons/fa";
import { MdOutlineShowChart } from "react-icons/md";
export default function Home(props) {
  const router = useRouter();

  const HeroSection = () => {
    return (
      <div className="bg-white text-center pt-6 ">
        <div className="py-8 flex flex-col justify-center items-center">
          <MdOutlineShowChart className="text-8xl mb-6 text-blue-500" />
          <h1 className="text-3xl text-black font-bold mb-4">
            Ready to advance your career?
          </h1>
          <p className="text-gray-600 mb-6">
            Join thousands of professionals and companies already building their
            network on Hariir.
          </p>
          <div className="flex justify-center gap-4 mb-10">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
              Browse Directory
            </button>
            <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>
        <div className="bg-gray-100 py-12  rounded-lg">
          <h2 className="text-xl text-black font-semibold mb-3">
            Available Across East Africa
          </h2>
          <p className="text-gray-600 mb-8">
            Connecting professionals in major cities and growing markets
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Nairobi, Kenya",
              "Kampala, Uganda",
              "Dar es Salaam, Tanzania",
              "Kigali, Rwanda",
              "Addis Ababa, Ethiopia",
            ].map((location, i) => (
              <span
                key={i}
                className="bg-white px-4 py-2 rounded-full shadow-sm text-sm text-gray-700 flex items-center gap-2 "
              >
                <FaSearchLocation className="text-blue-500" />
                {location}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const FeaturesSection = () => {
    const features = [
      {
        icon: <FaUser className="text-white text-xl" />,
        title: "Professional Profiles",
        description:
          "Create comprehensive profiles showcasing your education, experience, skills, and languages. Export your profile as a professional PDF CV.",
      },
      {
        icon: <FaBuilding className="text-white text-xl" />,
        title: "Company Profiles",
        description:
          "Showcase your company's sector, location, and past projects. Generate downloadable company profiles to share with stakeholders.",
      },
      {
        icon: <FaSearchLocation className="text-white text-xl" />,
        title: "Smart Directory",
        description:
          "Browse and filter professionals and companies by location, industry, and experience level. Find exactly who you're looking for.",
      },
    ];

    return (
      <div className="bg-gray-100 py-12 px-4 flex flex-col justify-center items-center min-h-[550px]">
        <h2 className="text-black text-2xl text-center font-bold mb-4">
          Built for East African Professionals
        </h2>
        <p className="text-gray-600 mb-10 max-w-3xl text-center mx-auto">
          Whether you're a seasoned professional or growing company, Hariir
          provides the tools you need to succeed in East Africa's dynamic
          market.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-8 py-8 text-left"
            >
              <div className="bg-blue-500 p-2 w-[36px] rounded-[5px] text-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-black text-lg mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm w-[85%]">
                {feature.description}
              </p>
              <a
                href="#"
                className="text-blue-500 mt-3 inline-block text-sm hover:underline"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const StatsSection = () => {
    return (
      <div className="py-12 min-h-[250px]">
        <div className="max-w-7xl mx-auto h-[200px] px-4 grid grid-cols-2 md:grid-cols-4 flex-wrap justify-evenly items-center gap-8 md:gap-20 text-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-500">10K+</h2>
            <p className="text-lg text-blue-500">Professionals</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-500">500+</h2>
            <p className="text-lg text-blue-500">Companies</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-500">5</h2>
            <p className="text-lg text-blue-500">Countries</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-500">50+</h2>
            <p className="text-lg text-blue-500">Industries</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="md:py-6 md:pt-20 pt-12 px-4 md:px-8 relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight max-w-3xl">
              <span className="text-blue-500">
                Welcome to the professional community for{" "}
              </span>
              <span className="text-yellow-400">East Africa</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
              Connect with professionals, discover opportunities, and build your
              career across Kenya, Uganda, Tanzania, Rwanda, and beyond.
            </p>

            <div className="bg-white relative p-4 md:p-6 rounded-2xl shadow-lg max-w-2xl">
              <div className="relative flex md:flex-row flex-col gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search professionals by"
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 w-full focus:ring-blue-500 focus:border-transparent text-black">
                    <option>Select Location</option>
                    <option>Kenya</option>
                    <option>Uganda</option>
                    <option>Tanzania</option>
                    <option>Rwanda</option>
                    <option>All East Africa</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 fill-current text-gray-400"
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

                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <FiSearch className="w-5 h-5" />
                  Search
                </button>
                <div className="hidden md:flex flex-shrink-0 absolute -top-5 -right-32">
                  <div className="bg-blue-500 p-6 md:p-4 rounded-full shadow-2xl hidden lg:block">
                    <FiGlobe className="w-12 h-12 md:w-10 md:h-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-friendly decorative elements */}
          <div className="hidden md:flex flex-shrink-0 absolute top-20 right-4">
            <div className="bg-yellow-400 p-3 rounded-full">
              <FiStar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <StatsSection />
        <FeaturesSection />
        <HeroSection />
      </div>
    </div>
  );
}
