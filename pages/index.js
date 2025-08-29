import React, { useContext, useEffect, useState, useMemo } from "react";
import { FiSearch, FiStar, FiGlobe } from "react-icons/fi";
import { useRouter } from "next/router";
import { userContext } from "./_app";
import { Users, ChevronRight, Building2, Search, MapPin, User, Eye, FolderSearch2, UserRound, ArrowLeft } from "lucide-react";

import HeroSection from "@/components/Footer";
import Network from "@/components/network";
import Link from "next/link";
import AfterLogin from "@/components/AfterLogin";
import BeforeLogin from "@/components/BeforeLogin";



export default function Home(props) {
  const router = useRouter();
  const [user] = useContext(userContext);


  const FeaturesSection = () => {
    const features = [
      {
        icon: <UserRound className="text-black" size={45} />,
        title: "Professional Profiles",
        description:
          "Create comprehensive profiles showcasing your education, experience, skills, and languages. Export your profile as a professional PDF CV.",
      },
      {
        icon: <Building2 className="text-black" size={45} />,
        title: "Company Profiles",
        description:
          "Showcase your company's sector, location, and past projects. Generate downloadable company profiles to share with stakeholders.",
      },
      {
        icon: <FolderSearch2 className="text-black" size={45} />,
        title: "Smart Directory",
        description:
          "Browse and filter professionals and companies by location, industry, and experience level. Find exactly who you're looking for.",
      },
    ];

    return (
      <div className="max-w-6xl mx-auto min-h-[530px] shadow-2xl rounded-2xl"
        style={{
          backgroundImage: 'url("./Group5.png")',
          backgroundColor: "#FFFFFF66"
        }}
      >
        <div className="py-18 px-4 flex flex-col justify-center items-center  "
        >
          <h2 className="text-black text-2xl text-center font-bold mb-3">
            Built for East African Professionals
          </h2>
          <p className="text-[#1E1E1E] mb-10 text-[14px] max-w-6xl text-center mx-auto">
            Whether you're a seasoned professional or growing company, Hariir
            provides the tools you need to succeed in East Africa's dynamic
            market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-8 py-8 flex flex-col justify-center items-center w-[350px]"
              >
                <div className=" text-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-black text-lg mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-[12px] w-full text-center ">
                  {feature.description}
                </p>
                <Link
                  href=""
                  className="text-blue-400 mt-3 flex items-center text-[12px] hover:underline"
                >
                  View More
                  <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


  return (
    <>
      {user?._id ? (
        <AfterLogin />
      ) : (
        <div className="">
          <div
            className="min-h-screen bg-no-repeat bg-cover md:bg-center bg-bottom md:bg-no-repeat "
            style={{ backgroundImage: 'url("./background1.png' }}
          >
            <BeforeLogin />
          </div>
          <FeaturesSection />
          <Network />
          <HeroSection />
        </div >
      )
      }
    </>
  );
}
