import {
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  X,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const CompanyCard = ({ company }) => {

  const [country, setCountry] = useState("");
  const router = useRouter()

  const toggleProfile = (id) => {
    router.push(`/Company/${id}`)
  };

  useEffect(() => {
    const result = countries.getName(
      company.location?.trim().toUpperCase(),
      "en"
    );
    setCountry(result || "US");
  });

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-200">
      <div>
        {/* Header background */}
        {company.coverImage ? (
          <div className="relative md:w-[300px] w-full md:h-24 h-28">
            <Image
              src={company.coverImage}
              alt="CoverPage"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-24 bg-gradient-to-r from-blue-50 to-blue-100 " />
        )}
        {/* Profile image container */}
        <div className="flex justify-center -mt-12 relative z-10">
          <div className="w-32 h-32 relative rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
            <Image
              fill
              src={company.companyLogo || "/profile.png"}
              className=" object-contain"
              alt="companyLogo"
            />
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 flex flex-col justify-center items-center gap-4">
          <div className="text-center ">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {company.companyName}
            </h3>
            <p className="text-gray-600 text-sm">{company.industrySector}</p>
          </div>

          <button
            className="w-full border-2 border-blue-600 hover:bg-blue-50 text-blue-600 py-2.5 px-4 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2"
            onClick={() => toggleProfile(company?._id)}
          >
            View Profile
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default CompanyCard;
