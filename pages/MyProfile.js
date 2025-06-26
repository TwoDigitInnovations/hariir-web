import { ArrowLeft, User, Edit, Download, Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { userContext } from "./_app";
import {
  Mail,
  Phone,
  MapPin,
  Edit3,
  Briefcase,
  GraduationCap,
  Languages,
  Users,
} from "lucide-react";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import Skills from "../components/Skills";
import Experience from "../components/experience";

export default function ProfileCompletion(props) {
  const router = useRouter();
  const [user] = useContext(userContext);
  const [profileData, setProfileData] = useState({});
  const [skillOpen, setSkillOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // your key
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  const getProfile = () => {
    props.loader(true);
    Api("post", "auth/profile", { userId: user._id }, router).then(
      (res) => {
        props.loader(false);
        setProfileData(res.data || {});
      },
      (err) => {
        props.loader(false);
        toast.error(err?.data?.message || err?.message || "An error occurred");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center h-16"
            onClick={() => window.history.back()}
          >
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Browse
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!profileData?.fullName && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex md:flex-row flex-col items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Complete Your Profile
                </h1>
                <p className="text-gray-600">
                  Set up your professional profile to start connecting with
                  others and showcase your expertise.
                </p>
              </div>
              <button
                className="flex mt-4 items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => router.push("/ProfileComplete")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Set Up Profile
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Header */}
              <div className="border-b border-gray-200 md:p-6 p-5">
                <div className="flex md:flex-row flex-col items-center justify-between">
                  <div className="flex justify-start mb-2">
                    <User className="w-6 h-6 text-blue-500 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      My Profile
                    </h2>
                  </div>
                  <div className="flex grid-cols-2 items-start space-x-3">
                    <button
                      className="flex items-start text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50"
                      onClick={() =>
                        router.push(`/ProfileComplete?${user._id}`)
                      }
                    >
                      <Edit className="w-6 h-6 mr-2" />
                      Edit Profile
                    </button>
                    <button className="flex items-start text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50">
                      <Download className="w-5 h-5 mr-2" />
                      PDF
                    </button>
                  </div>
                </div>
              </div>

              {profileData.fullName ? (
                <div>
                  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r bg-white text-white md:p-8 p-2">
                      <div className="flex md:flex-row flex-col items-center gap-6">
                        <div className="w-32 h-32 bg-blue-400 rounded-full flex items-center justify-center text-white text-4xl font-bold uppercase">
                          {profileData.fullName
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h1 className="md:text-[30px] text-black font-bold mb-2">
                            {profileData.fullName}
                          </h1>
                          <p className="md:text-[20px] text-gray-700 mb-1">
                            {profileData.professionalTitle}
                          </p>
                          <div className="flex flex-wrap gap-4 text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} />
                              <span>Borama, Awdal, Somalia</span>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between md:w-lg">
                            <div className="flex flex-row text-gray-500 items-center gap-2">
                              <Mail size={16} />
                              <span>{profileData.email}</span>
                            </div>
                            <div className="flex flex-row text-gray-500 items-center gap-2">
                              <Phone size={16} />
                              <span>{profileData.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:p-8 p-4">
                      {/* About Section */}
                      <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                            <User size={24} />
                            About
                          </h2>
                        </div>
                        <div
                          className="text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: profileData.bio }}
                        ></div>
                      </section>

                      {/* Skills Section */}
                      <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-[18px] font-semibold text-gray-800">
                            Skills
                          </h2>
                          <div className="flex gap-4">
                            <Plus
                              size={20}
                              className="text-gray-400 hover:bg-gray-200 cursor-pointer"
                            />
                            <Edit3
                              size={20}
                              className="text-gray-400  hover:bg-gray-200 cursor-pointer"
                              onClick={() => setSkillOpen(true)}
                            />
                          </div>

                          {skillOpen && (
                            <div className="flex flex-col justify-center items-center">
                              <Skills
                                open={skillOpen}
                                close={() => setSkillOpen(false)}
                                loader={props.loader}
                                profileData={profileData}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {profileData?.skills?.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>

                      {/* Experience Section */}
                      <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                            <Briefcase size={24} />
                            Experience
                          </h2>
                          <div className="flex gap-4">
                            <Plus size={20} className="text-gray-400" />
                            <Edit3
                              size={20}
                              className="text-gray-400"
                              onClick={() => setExperienceOpen(true)}
                            />
                          </div>

                          {experienceOpen && (
                            <div className="flex flex-col justify-center items-center">
                              <Experience
                                open={experienceOpen}
                                close={() => setExperienceOpen(false)}
                                loader={props.loader}
                                profileData={profileData}
                              />
                            </div>
                          )}
                        </div>
                        {profileData?.experience?.map((experience, key) => (
                          <div
                            className="border-l-4 border-blue-500 md:pl-6 pl-4 ml-2"
                            key={key}
                          >
                            <div className="mb-6">
                              <h3 className="text-[16px] font-semibold text-gray-800">
                                {experience.jobTitle}
                              </h3>
                              <p className="text-blue-600 text-[16px] font-medium">
                                {experience.company}
                              </p>
                              <p className="text-gray-500 text-[14px] mb-2">
                                {experience.location} - {experience.duration}
                              </p>
                              <p className="text-gray-600 text-[14px]">
                               
                              </p>
                              <p className="text-gray-600 text-[14px]">
                                {experience.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </section>

                      <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                            <GraduationCap size={24} />
                            Education
                          </h2>
                          <div className="flex gap-2">
                            <Plus size={20} className="text-gray-400" />
                            <Edit3 size={20} className="text-gray-400" />
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-[16px]  font-semibold text-gray-800">
                            MCA
                          </h3>
                          <p className="text-blue-600 text-[16px]  font-medium">
                            BBD University Lucknow
                          </p>
                          <p className="text-gray-500 text-[14px] ">2024</p>
                        </div>
                      </section>

                      {/* Languages Section */}
                      <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                            <Languages size={24} />
                            Languages
                          </h2>
                          <div className="flex gap-4">
                            <Plus size={20} className="text-gray-400" />
                            <Edit3 size={20} className="text-gray-400" />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <span className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full md:text-sm text-[12px]">
                            English (Beginner)
                          </span>
                          <span className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full md:text-sm text-[12px]">
                            French (Intermediate)
                          </span>
                        </div>
                      </section>

                      {/* References Section */}
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                            <Users size={24} />
                            References
                          </h2>
                          <div className="flex gap-4">
                            <Plus size={20} className="text-gray-400" />
                            <Edit3 size={20} className="text-gray-400" />
                          </div>
                        </div>
                        <div className="border-l-4 border-green-500 pl-6 ml-2 bg-green-50 p-4 rounded-lg">
                          <h3 className="text-[16px] font-semibold text-gray-800">
                            Rishabh Tiwari
                          </h3>
                          <p className="text-green-600 font-medium">
                            Senior Manager
                          </p>
                          <p className="text-gray-600 text-[14px] mb-2">
                            FlipCart
                          </p>
                          <div className="flex gap-4 text-[14px] text-gray-500">
                            <span>RishabhTiwari@gmail.com</span>
                            <span>7302569774</span>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <User className="w-10 h-10 text-blue-500" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Complete Your Professional Profile
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Add your information to start building your network and
                    showcase your expertise.
                  </p>

                  <button
                    className="bg-blue-500 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => router.push("/ProfileComplete")}
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {profileData?.phone && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 ">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>

                <div className="flex flex-row gap-5 mb-2 text-gray-500 items-center ">
                  <Mail size={16} />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex flex-row gap-5 text-gray-500 items-center ">
                  <Phone size={16} />
                  <span>{profileData.phone}</span>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Completion
              </h3>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Profile Strength
                  </span>
                  <span className="text-sm font-bold text-gray-900">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>

              <p className="text-sm text-blue-600">
                Complete your profile to increase visibility
              </p>
            </div>

            {!profileData?.fullName && (
              <div className="bg-blue-50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Profile Tips
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Add a professional photo</li>
                  <li>• Write a compelling headline</li>
                  <li>• Include your work experience</li>
                  <li>• List your key skills</li>
                  <li>• Add education details</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
