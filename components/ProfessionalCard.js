import React, { useContext } from "react";
import {
  X,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Calendar,
  GraduationCap,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useState, useEffect } from "react";
import countries from "i18n-iso-countries";
import { FaLinkedinIn } from "react-icons/fa6";
import { userContext } from "@/pages/_app";
import { useRouter } from "next/router";
import Image from "next/image";

const ProfileCard = ({ profile }) => {
  const [country, setCountry] = useState("");
  const [user, setuser] = useContext(userContext)
  const profileData = profile;
  const router = useRouter();

  const toggleProfile = (id) => {
    router.push(`/Professional/${id}`)
  };

  useEffect(() => {
    const result = countries.getName(
      profile.location?.trim().toUpperCase(),
      "en"
    );
    setCountry(result || "US");
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200  mx-auto shadow-sm hover:shadow-lg transition-shadow duration-300 md:w-[280px] w-[340px]">
      <div className="mx-auto">
        {profile.coverImage ? (
          <div className="relative md:w-[280px] w-full md:h-24 h-28">
            <Image
              src={profile.coverImage}
              alt="CoverPage"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-24 bg-gradient-to-r from-blue-50 to-blue-100 " />
        )}

        <div className="flex justify-center -mt-12 relative z-10">
          <div className="relative w-32 h-32 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-200">
            <Image
              src={profile.isPublic && profile.profileImage ? profile.profileImage : "/profile.png"}
              alt="Profile"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 flex flex-col justify-center items-center gap-4">
          <div className="text-center ">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {profile.fullName}
            </h3>
            <p className="text-gray-600 text-sm">{profile.professionalTitle}</p>
          </div>

          <button
            className="w-full border-2 border-blue-600 hover:bg-blue-50 text-blue-600 py-2.5 px-4 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2"
            onClick={() => toggleProfile(profile?._id)}
          >
            View Profile
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div >
  );
};

export default ProfileCard;
