import React, { useContext, useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Building,
  Users,
  Edit3,
  Target,
  Award,
  Briefcase,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { userContext } from "@/pages/_app";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

countries.registerLocale(enLocale);

const CompanyProfile = ({ companyData, getProfile, loader }) => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showSpecializations, setShowSpecializations] = useState(false);
  const [showFullMission, setShowFullMission] = useState(false);
  const [showFullVision, setShowFullVision] = useState(false);
  const [country, setCountry] = useState("");
  const router = useRouter();
  const [openServices, setOpenServices] = useState(false);
  const [openSpecialization, setOpenSpecialization] = useState(false);
  const [services, setServices] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [user] = useContext(userContext);
  const profileData = companyData;

  useEffect(() => {
    setCountry(companyData.location);
  });

  useEffect(() => {
    if (profileData?.services?.length > 0) {
      setServices(profileData.services);
    } else {
      setServices([""]);
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData?.specializations?.length > 0) {
      setSpecializations(profileData.specializations);
    } else {
      setSpecializations([
        {
          title: "",
          description: "",
        },
      ]);
    }
  }, [profileData]);

  const handleChange1 = (index, field, value) => {
    const updated = [...specializations];
    updated[index][field] = value;
    setSpecializations(updated);
  };

  const addSpecialization = () => {
    setSpecializations([
      ...specializations,
      {
        title: "",
        description: "",
      },
    ]);
  };

  const removeSpecialization = (index) => {
    const updated = specializations.filter((_, i) => i !== index);
    setSpecializations(updated);
  };

  const handleChange = (index, value) => {
    const updated = [...services];
    updated[index] = value;
    setServices(updated);
  };

  const addService = () => {
    setServices([...services, ""]);
  };

  const removeService = (index) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  const submit = () => {
    const filteredServices = services.filter(
      (service) => service.trim() !== ""
    );

    if (filteredServices.length === 0) {
      toast.error("Please add at least one service");
      return;
    }

    loader(true);
    const data = {
      services: filteredServices,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        loader(false);
        if (res.status) {
          toast.success("Services updated successfully");
          close();
          getProfile();
          setOpenServices(false);
        } else {
          toast.error(res.message || "An error occurred");
        }
      },
      (err) => {
        loader(false);
        console.error("Error:", err);
        toast.error(err?.message || "An error occurred");
      }
    );
  };

  const submitspecializations = () => {
    loader(true);
    const data = {
      specializations: specializations,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        loader(false);
        if (res.status) {
          toast.success("Specializations updated successfully");
          close();
          getProfile();
          setOpenSpecialization(false);
        } else {
          toast.error(res.message || "An error occurred");
        }
      },
      (err) => {
        loader(false);
        console.error("Error:", err);
        toast.error(err?.message || "An error occurred");
      }
    );
  };
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r bg-white text-white border-b-2 border-b-gray-200 ">
        {companyData.coverImage ? (
          <div>
            <img
              src={companyData.coverImage}
              alt="CoverPage"
              className="w-full md:h-44 md:object-cover object-contain"
            />
          </div>
        ) : (
          <div className="h-40 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg"></div>
        )}

        <div className="md:-mt-20  flex md:flex-row flex-col justify-start pb-4 items-center md:ms-8 gap-6 -mt-12">
          <div className="md:w-40 md:h-40 w-24 h-24 bg-blue-400 rounded-full border-2 border-gray-300 flex items-center justify-center ">
            <img
              src={companyData.companyLogo || "/profile.png"}
              className="w-full h-full object-cover rounded-full"
              alt="companyLogo"
            />
          </div>
        </div>

        <div className="flex-1 px-4 md:px-8 pt-6 pb-8">
          <h1 className="md:text-[30px] text-black font-bold mb-2">
            {companyData.companyName}
          </h1>
          <p className="md:text-[20px] text-gray-700 mb-1">
            {companyData.industry}
          </p>
          <div className="flex flex-wrap gap-4 text-gray-700 mb-3">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{country}</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:w-lg gap-2">
            <div className="flex flex-row text-gray-400 items-center gap-2">
              <Mail size={16} />
              <span>{companyData.email}</span>
            </div>
            <div className="flex flex-row text-gray-400 items-center gap-2">
              <Phone size={16} />
              <span>{companyData.phone}</span>
            </div>
          </div>
          <div className="flex flex-wrap md:gap-14 gap-4 text-gray-600 mt-5">
            <div className="flex flex-col items-start ">
              <div className="flex">
                <p className="">Founded:</p>
              </div>
              <span>{companyData.foundedYear}</span>
            </div>

            <div className="flex flex-col items-start ">
              <div className="flex">
                <p className="">Size:</p>
              </div>
              <span> {companyData.companySize} employees</span>
            </div>

            <div className="flex flex-col items-start ">
              <div className="flex">
                <p className="">Website:</p>
              </div>
              <span>{companyData.website}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="md:p-8 p-4">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
              <Building size={24} />
              About Company
            </h2>
            {/* <Edit3
              size={20}
              className="text-gray-400 hover:bg-gray-200 cursor-pointer"
            /> */}
          </div>
          <div className="text-gray-600 leading-relaxed">
            {showFullAbout || companyData?.aboutUs?.length <= 200
              ? companyData.aboutUs
              : companyData.aboutUs?.slice(0, 200) + "..."}
            {companyData.aboutUs?.length > 200 && (
              <button
                className="text-blue-600 text-sm ml-1"
                onClick={() => setShowFullAbout(!showFullAbout)}
              >
                {showFullAbout ? "See less" : "See more"}
              </button>
            )}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
              <Briefcase size={24} />
              Services
            </h2>
            <Edit3
              size={20}
              className="text-gray-400 hover:bg-gray-200 cursor-pointer"
              onClick={() => setOpenServices(true)}
            />
          </div>

          {!companyData?.services || companyData.services.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 mb-2">No Services added yet</p>
              <p className="text-gray-400 mb-4">
                Click the edit icon to add Services
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {companyData.services.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          )}

          {openServices && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit services
                  </h2>
                  <button
                    onClick={() => setOpenServices(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X
                      className="text-gray-400 hover:text-gray-700"
                      size={20}
                    />
                  </button>
                </div>

                {/* Content Area with Scroll */}
                <div className="flex-1 overflow-y-auto p-6">
                  <p className="text-sm text-gray-600 mb-6">
                    <span className="text-red-400">*</span> Indicates required
                  </p>

                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => handleChange(index, e.target.value)}
                          placeholder="Enter service name"
                          className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        <button
                          onClick={() => removeService(index)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                          disabled={services.length === 1}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Service Button */}
                  <button
                    onClick={addService}
                    className="flex border border-gray-200 items-center gap-2 mt-6 px-4 py-2 text-gray-900 hover:bg-gray-50 text-sm rounded-lg transition-colors"
                  >
                    <Plus size={18} />
                    <span>Add Service</span>
                  </button>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100">
                  <button
                    onClick={submit}
                    className="w-full bg-blue-400 text-white rounded-xl px-6 py-3 font-medium hover:bg-blue-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
              <Award size={24} />
              Fields of Specialization
            </h2>
            <Edit3
              size={20}
              className="text-gray-400 hover:bg-gray-200 cursor-pointer"
              onClick={() => setOpenSpecialization(true)}
            />
          </div>

          {!companyData?.specializations ||
          companyData.specializations.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 mb-2">No specializations added yet</p>
              <p className="text-gray-400 mb-4">
                Click the edit icon to add specializations
              </p>
            </div>
          ) : (
            <div>
              {companyData.specializations.map((spec, index) => (
                <div
                  key={index}
                  className="border-l-4 border-purple-400 pl-4 pr-4 py-3 ml-2 bg-purple-50 rounded-lg mb-4 shadow-sm"
                >
                  <h3 className="text-[16px] font-semibold text-gray-800 mb-2">
                    {spec.title}
                  </h3>

                  <div className="text-gray-600 leading-relaxed">
                    {showSpecializations || spec.description?.length <= 170
                      ? spec.description
                      : spec.description?.slice(0, 170) + "..."}
                    {spec.description?.length > 170 && (
                      <button
                        className="text-blue-600 text-sm ml-1"
                        onClick={() =>
                          setShowSpecializations(!showSpecializations)
                        }
                      >
                        {showSpecializations ? "See less" : "See more"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {openSpecialization && (
            <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center p-6">
              <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Edit fields of specialization
                  </h2>
                  <X
                    onClick={close}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    size={24}
                  />
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <p className="text-sm text-gray-600 mb-3">
                    * Indicates required
                  </p>

                  {specializations.map((spec, index) => (
                    <div key={index} className="mb-6 border p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="md:text-lg text-sm font-semibold text-gray-800">
                          Specialization {index + 1}
                        </h3>
                        {specializations.length > 1 && (
                          <div
                            className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => removeSpecialization(index)}
                          >
                            <Trash2 size={16} className="text-gray-600" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Specialization Title{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={spec.title}
                            onChange={(e) =>
                              handleChange1(index, "title", e.target.value)
                            }
                            placeholder="Ex: Mobile Payment Solutions"
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            rows={4}
                            value={spec.description}
                            onChange={(e) =>
                              handleChange1(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Describe this field of specialization..."
                            className="border text-sm border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                          />
                        </div>
                      </div>

                      {index < specializations.length - 1 && (
                        <hr className="border-gray-200 mt-6" />
                      )}
                    </div>
                  ))}

                  <button
                    onClick={addSpecialization}
                    className="flex border border-gray-200 items-center gap-2 px-4 py-2 rounded-lg font-semibold text-black transition-colors"
                  >
                    <Plus size={18} /> Add Specialization
                  </button>
                </div>

                <div className="flex w-full items-center p-2 pb-4  border-gray-200 bg-gray-50">
                  <button
                    onClick={submitspecializations}
                    className="px-8 py-2 bg-blue-400 text-white rounded-2xl hover:bg-blue-600 transition-colors w-full "
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="mb-8">
          <div className="grid md:grid-cols-1 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                  <Target size={24} />
                  Our Mission
                </h2>
                {/* <Edit3
                  size={20}
                  className="text-gray-400 hover:bg-gray-200 cursor-pointer"
                /> */}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 text-[16px] leading-relaxed">
                  {showFullMission ||
                  companyData.missionStatement?.length <= 250
                    ? companyData.missionStatement
                    : companyData.missionStatement?.slice(0, 250) + "..."}
                  {companyData.missionStatement?.length > 250 && (
                    <button
                      className="text-blue-600 text-sm ml-1"
                      onClick={() => setShowFullMission(!showFullMission)}
                    >
                      {showFullMission ? "See less" : "See more"}
                    </button>
                  )}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                  <Target size={24} />
                  Our Vision
                </h2>
                {/* <Edit3
                  size={20}
                  className="text-gray-400 hover:bg-gray-200 cursor-pointer"
                /> */}
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-700 text-[16px] leading-relaxed">
                  {showFullVision || companyData.visionStatement?.length <= 250
                    ? companyData.visionStatement
                    : companyData.visionStatement?.slice(0, 250) + "..."}
                  {companyData.visionStatement?.length > 250 && (
                    <button
                      className="text-green-600 text-sm ml-1"
                      onClick={() => setShowFullVision(!showFullVision)}
                    >
                      {showFullVision ? "See less" : "See more"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Team Members Section --- */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
              <Users size={24} />
              Meet Our Team
            </h2>
          </div>

          {companyData?.teamMembers?.length > 0 ? (
            companyData.teamMembers.map((member, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-400 md:pl-6 pl-4 ml-2 mb-6"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-2 w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-semibold text-gray-800">
                      {member.fullName}
                    </h3>
                    <p className="text-blue-600 text-[14px] font-medium mb-1">
                      {member.designation}
                    </p>
                    <p className="text-gray-600 text-[14px]">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 mb-2">No team members added yet</p>
              <p className="text-gray-400 mb-4">
                Click the Edit Profile to add your team
              </p>
            </div>
          )}
        </section>

        {/* --- Projects Section --- */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
              <Award size={24} />
              Past Projects
            </h2>
          </div>

          {companyData?.projects?.length > 0 ? (
            companyData.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-2">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[16px] font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <span className="text-gray-400 text-[14px]">
                    {project.yearCompleted}
                  </span>
                </div>
                <p className="text-green-600 text-[14px] leading-relaxed mb-2">
                  {project.client}
                </p>
                <p className="text-gray-600 text-[14px] leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 mb-2">No projects added yet</p>
              <p className="text-gray-400 mb-4">
                Click the edit Profile to add past projects
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CompanyProfile;
