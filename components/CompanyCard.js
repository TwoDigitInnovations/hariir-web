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

const CompanyCard = ({ company }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [country, setCountry] = useState("");

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
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
          <img
            src={company.coverImage}
            alt="CoverPage"
            className="w-full md:h-24 md:object-cover object-contain"
          />
        ) : (
          <div className="w-full h-24 bg-gradient-to-r from-blue-50 to-blue-100 " />
        )}
        {/* Profile image container */}
        <div className="flex justify-center -mt-12 relative z-10">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
            <img
              src={company.companyLogo || "/profile.png"}
              className="w-full h-full object-cover"
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
            onClick={toggleProfile}
          >
            View Profile
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isProfileOpen && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 md:p-4 p-0">
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-2xl w-[95%] md:w-[85%] md:h-[95%] h-[95%] max-w-6xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                  <img
                    src={company.companyLogo || "/profile.png"}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-600">
                    {company.companyName}
                  </h1>
                  <p className="text-gray-600">{company.industrySector}</p>
                  <p className="text-gray-400 text-sm flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {country}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleProfile}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Company Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">
                          Founded
                        </h3>
                        <p className="text-gray-800 font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {company.foundedYear}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">
                          Company Size
                        </h3>
                        <p className="text-gray-800 font-medium flex items-center">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          {company.companySize} employees
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">
                          Sector
                        </h3>
                        <p className="text-gray-800 font-medium">
                          {company.industrySector}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">
                          Website
                        </h3>
                        <a
                          href={company.website}
                          className="text-blue-400 hover:text-blue-600 font-medium"
                        >
                          {company.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* About Us */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      About Us
                    </h2>
                    <p className="text-gray-600 mb-1">{company.aboutUs}</p>
                  </div>

                  {/* Mission & Vision */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Mission & Vision
                    </h2>

                    <div className="mb-4">
                      <h3 className="text-sm font-bold text-gray-800 mb-2">
                        Our Mission
                      </h3>
                      <p className="text-gray-700">
                        {company.missionStatement}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-gray-800 mb-2">
                        Our Vision
                      </h3>
                      <p className="text-gray-700">{company.visionStatement}</p>
                    </div>
                  </div>

                  {/* Past Experience */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Past Experience
                    </h2>
                    {company.projects.map((project, key) => (
                      <div
                        key={key}
                        className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4"
                      >
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {project.title} ({project.yearCompleted})
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Client:</span>{" "}
                          {project.client}
                        </p>
                        <p className="text-gray-700">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Quick Contact */}
                <div className="lg:col-span-1">
                  <div className="bg-blue-50 rounded-lg p-6 sticky top-0">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Quick Contact
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <a
                            href="mailto:contact@safarifintech.co.ke"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {company.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <a
                            href="tel:+254201234567"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {company.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">Website</p>
                          <a
                            href={company.website}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {company.website}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-gray-700 font-medium">
                            {company.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyCard;
