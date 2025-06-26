import { MapPin, Users, Calendar, ExternalLink, X, Phone, Mail, Globe } from "lucide-react";

import { useState } from "react";
const CompanyCard = ({ company }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            {" "}
            <div
              className="w-14 h-14 rounded-full m-2 shadow-lg flex items-center justify-center text-white font-semibold text-2xl"
              style={{ backgroundColor: company.color }}
            >
              {company.initial}
            </div>
            <div className="flex flex-col items-start justify-between ">
              <h3 className="text-[16px] font-semibold text-gray-900 mb-1">
                {company.name}
              </h3>
              <p className="text-gray-600 mb-2 text-[14px]">
                {company.category}
              </p>
              <div className="flex items-center text-gray-500 text-[12px] mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {company.location}
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {company.description}
          </p>

          <div className="grid grid-cols-1 gap-4 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Size:</span>
              <div className="flex items-center ">
                <Users className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium text-gray-500">
                  {company.size}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Founded:</span>
              <div className="flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                <span className="font-medium text-gray-500">
                  {company.founded}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Recent Projects
            </h4>
            <ul className="text-sm text-gray-600">
              {company.projects.map((project, index) => (
                <li key={index} className="mb-1">
                  • {project}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={toggleProfile}
          >
            View Profile
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {isProfileOpen && (
          <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 md:p-4 p-0">
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-2xl w-[95%] md:w-[85%] md:h-[95%] h-[95%] max-w-5xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    S
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-blue-600">
                      SafariFintech
                    </h1>
                    <p className="text-gray-600">Financial Technology</p>
                    <p className="text-gray-500 text-sm flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleProfile}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Company Information */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Company Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Founded
                          </h3>
                          <p className="text-gray-800 font-medium flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            2018
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Company Size
                          </h3>
                          <p className="text-gray-800 font-medium flex items-center">
                            <Users className="w-4 h-4 mr-2 text-gray-400" />
                            51-200 employees
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Sector
                          </h3>
                          <p className="text-gray-800 font-medium">
                            Financial Technology
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Website
                          </h3>
                          <a
                            href="https://safarifintech.co.ke"
                            className="text-blue-500 hover:text-blue-600 font-medium"
                          >
                            https://safarifintech.co.ke
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* About Us */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        About Us
                      </h2>
                      <p className="text-gray-600 mb-1">
                        Leading fintech company in East Africa
                      </p>
                      <p className="text-gray-600">
                        We are revolutionizing financial services across East
                        Africa
                      </p>
                    </div>

                    {/* Mission & Vision */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Mission & Vision
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Mission Statement
                          </h3>
                          <p className="text-gray-700">
                            To provide accessible financial solutions for
                            everyone
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Vision Statement
                          </h3>
                          <p className="text-gray-700">
                            A financially inclusive East Africa
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Past Experience */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Past Experience
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          SafariPay Mobile App (2023)
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Client:</span> General
                          Public
                        </p>
                        <p className="text-gray-700">
                          Revolutionary mobile payment platform
                        </p>
                      </div>
                    </div>

                    {/* Key Personnel */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Key Personnel
                      </h2>
                      <p className="text-gray-500">Information not available</p>
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
                          <Mail className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <a
                              href="mailto:contact@safarifintech.co.ke"
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              contact@safarifintech.co.ke
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <a
                              href="tel:+254201234567"
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              +254 20 123 4567
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <a
                              href="https://safarifintech.co.ke"
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              https://safarifintech.co.ke
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="text-gray-700 font-medium">
                              Nairobi, Kenya
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
    </div>
  );
};

export default CompanyCard;
