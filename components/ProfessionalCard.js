import React from "react";
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


const ProfileCard = ({ profile }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [country, setCountry] = useState("");
  const profileData = profile;
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const result = countries.getName(
      profile.location?.trim().toUpperCase(),
      "en"
    );
    setCountry(result || "not found");
  });
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-sm mx-auto shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
          style={{
            background: profile.avatarColor || "#3B82F6",
          }}
        >
          {profile.initials || "AB"}
        </div>
      </div>

      {/* Name and Title */}
      <div className="text-center mb-1">
        <h3 className="text-[18px] font-bold text-gray-900 mb-1">
          {profile.fullName}
        </h3>
        <p className="text-gray-600 text-[14px]">{profile.professionalTitle}</p>
      </div>

      {/* Location */}
      <div className="flex items-center justify-center text-gray-400 text-sm mb-4">
        <MapPin className="w-4 h-4 mr-1" />
        {country}
      </div>

      {/* Skills Section */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {profile.skills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="bg-blue-400 text-white text-xs px-3 py-1 rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
          {profile.skills?.length > 3 && (
            <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
              +{profile.skills?.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Current Role */}
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-gray-800 mb-1">
          Current Role
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          {profile?.experience[0]?.jobTitle} at {profile?.experience[0]?.company}
        </p>
      </div>

      {/* View Profile Button */}
      <button
        className="w-full bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        onClick={toggleProfile}
      >
        View Profile
        <ExternalLink className="w-4 h-4" />
      </button>

      {isProfileOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-50 p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {profileData.fullName.slice(0, 2)}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {profileData.fullName}
                    </h1>
                    <p className="text-blue-600 font-medium text-base sm:text-lg">
                      {profileData.title}
                    </p>
                    <p className="text-gray-600 flex items-center mt-1 text-sm sm:text-base">
                      <MapPin className="w-4 h-4 mr-1" />
                      {country}
                    </p>
                  </div>
                </div>

                {/* Right section: Buttons */}
                <div className="flex flex-row items-center sm:items-center gap-2 sm:space-x-2">
                  <button className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex justify-center items-center space-x-2 transition-colors w-full sm:w-auto">
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={toggleProfile}
                    className="p-2 w-[100px] flex justify-end hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      About
                    </h2>
                    <div
                      className="text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: profileData.bio }}
                    ></div>
                  </div>

                  {/* Experience Section */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                      Experience
                    </h2>
                    {profileData.experience?.map((exp, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 mb-4 rounded-lg p-4 border-l-4 border-blue-400"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white font-bold">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg">
                              {exp.position}
                            </h3>
                            <p className="text-blue-600 font-medium">
                              {exp.company}
                            </p>
                            <p className="text-gray-400 text-sm mb-2">
                              {exp.duration} | {exp.location}
                            </p>
                            <p className="text-gray-700">{exp.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Education Section */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2 text-blue-400" />
                      Education
                    </h2>
                    {profileData.education.map((edu, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg">
                              {edu.degree}
                            </h3>
                            <p className="text-blue-600 font-medium">
                              {edu.institution}
                            </p>
                            <p className="text-gray-400 text-sm mb-2">
                              {edu.year}
                            </p>
                            <p className="text-gray-700">{edu.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Skills Section */}
                  <div className="bg-blue-50 rounded-lg p-5">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-blue-400`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages Section */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Languages
                    </h2>
                    <div className="space-y-3">
                      {profileData.languages.map((lang, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-700 font-medium">
                            {lang.language}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="bg-blue-50 rounded-lg p-5">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Contact
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <a
                            href={`mailto:${profileData?.email}`}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {profileData?.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <a
                            href={`tel:${profileData?.phone}`}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {profileData?.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <FaLinkedinIn className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">LinkedIn</p>
                          <a
                            href={`https://${profileData.linkedinUrl}`}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {profileData.linkedinUrl}
                          </a>
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

export default ProfileCard;
