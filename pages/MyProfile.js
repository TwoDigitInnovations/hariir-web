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
  Building2,
  ShieldCheck,
} from "lucide-react";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import Skills from "../components/Skills";
import Experience from "../components/experience";
import Education from "../components/educaation";
import Referee from "../components/referee";
import Language from "../components/language";
import Resume from "../components/Resume";
import CompanyProfile from "@/components/CompanyProfile";
import ResumeForCompany from "@/components/ResumeForCompany";
import Swal from "sweetalert2";
import AllCV from "@/components/AllCV";
import calculateProfileCompletion from "@/components/ProfileComplete";

export default function ProfileCompletion(props) {
  const router = useRouter();
  const [user] = useContext(userContext);
  const [profileData, setProfileData] = useState({});
  const [skillOpen, setSkillOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [refereeOpen, setRefereeOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [showFull, setShowFull] = useState(false);
  const [allCVOpen, setAllCVOpen] = useState(false);
  const role = user?.role === "professional" ? "Professional" : "Company";

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

  const handleVerifyRequest = (expid) => {
    Swal.fire({
      text: "Are you sure you want to request verification for this experience? Once verified, it cannot be edited or changed",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, request it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          userId: user._id,
          experienceId: expid,
          status: "Requested",
        };

        props.loader(true);
        Api("post", "auth/ExperienceVerification", data, router).then(
          (res) => {
            props.loader(false);
            if (res.status) {
              toast.success(res.message);
              getProfile();
            } else {
              toast.error(res.message);
            }
          },
          (err) => {
            props.loader(false);
            console.error("Error:", err);
            toast.error(err?.message || "An error occurred");
          }
        );
      }
    });
  };
  const handleVerifyRequestForEdu = (expid) => {
    Swal.fire({
      text: "Are you sure? You are about to request verification for this education? Once verified, it cannot be edited or changed.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, request it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          userId: user._id,
          educationId: expid,
          status: "Requested",
        };

        props.loader(true);
        Api("post", "auth/EducationVerification", data, router).then(
          (res) => {
            props.loader(false);
            if (res.status) {
              toast.success(res.message);
              getProfile();
            } else {
              toast.error(res.message);
            }
          },
          (err) => {
            props.loader(false);
            console.error("Error:", err);
            toast.error(err?.message || "An error occurred");
          }
        );
      }
    });
  };


  const completion = calculateProfileCompletion(profileData);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center h-16 md:mt-0 mt-8"
            onClick={() => window.history.back()}
          >
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Browse
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {!profileData?.fullName && !profileData?.companyName && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex md:flex-row flex-col items-center justify-between">
              <div>
                <h1 className="md:text-2xl text-xl font-bold text-gray-900 mb-2">
                  Complete Your Profile
                </h1>
                <p className="text-gray-600 md:text-[16px] text-[14px]">
                  Set up your {role} profile to start connecting with others and
                  showcase your expertise.
                </p>
              </div>
              <button
                className="flex md:w-[180px] w-full justify-center mt-4 items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => {
                  if (user?.role === "professional") {
                    router.push("/ProfileComplete");
                  } else if (user?.role === "company") {
                    router.push("/CompanyProfile");
                  }
                }}
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
              <div className="border-b border-gray-200 md:p-4 p-5">
                <div className="flex md:flex-row flex-col items-center justify-between">
                  <div className="flex justify-start mb-2">
                    {user?.role === "company" ? (
                      <Building2 className="w-6 h-6 text-blue-500 mr-3" />
                    ) : (
                      <User className="w-6 h-6 text-blue-500 mr-3" />
                    )}

                    <h2 className="text-xl font-semibold text-gray-800">
                      My Profile
                    </h2>
                  </div>
                  <div className="flex grid-cols-2 items-start space-x-3">
                    <button
                      className="flex items-start text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50"
                      onClick={() => {
                        router.push({
                          pathname:
                            user?.role === "professional"
                              ? "/ProfileComplete"
                              : "/CompanyProfile",
                          query: { id: user._id },
                        });
                      }}
                    >
                      <Edit className="w-6 h-6 mr-2" />
                      Edit Profile
                    </button>

                    {user?.role === "professional" ? (
                      <button
                        className="flex items-start text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50"
                        type="button"
                        aria-label="Download Resume"
                        onClick={() => setAllCVOpen(true)}
                      >
                        <Download className="w-5 h-5 mr-2" />
                        PDF
                      </button>
                    ) : (
                      <ResumeForCompany profile={profileData} />
                    )}

                    {allCVOpen && (
                      <div className="flex flex-col justify-center items-center">
                        <AllCV
                          open={allCVOpen}
                          close={() => setAllCVOpen(false)}
                          loader={props.loader}
                          profileData={profileData}
                          getProfile={() => getProfile()}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {profileData.role === "professional"
                ? profileData?.fullName && (
                  <div>
                    <div className="max-w-4xl mx-auto bg-white shadow-lg  overflow-hidden">
                      <div className="bg-white text-white ">
                        {/* Cover Section */}
                        <div className=" w-full">
                          {profileData.coverImage ? (
                            <img
                              src={profileData.coverImage}
                              alt="CoverPage"
                              className="w-full md:h-44 md:object-cover object-contain"
                            />
                          ) : (
                            <div className="w-full h-40 bg-gradient-to-r from-gray-200 to-blue-50 " />
                          )}

                          <div className="ms-6 md:-mt-20 -mt-12 flex md:justify-start justify-center">
                            <div className="md:w-40 md:h-40 w-24 h-24 bg-blue-400 rounded-full border-4 border-white shadow-md overflow-hidden">
                              <img
                                src={
                                  profileData.profileImage || "/profile.png"
                                }
                                alt="Company Logo"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className=" text-black md:px-8 p-2">
                          <h1 className="md:text-[30px] font-bold mb-2 text-center md:text-left">
                            {profileData.fullName}
                          </h1>
                          <p className="md:text-[20px] text-gray-700 mb-1 text-center md:text-left">
                            {profileData.professionalTitle}
                          </p>

                          <div className="flex flex-wrap gap-4 text-gray-700 mb-2 justify-center md:justify-start">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} />
                              <span>{profileData.location}</span>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row justify-between text-center md:text-left gap-2 md:gap-0">
                            <div className="flex flex-row text-gray-500  items-center justify-center md:justify-start gap-2">
                              <Mail size={16} />
                              <span>{profileData.email}</span>
                            </div>
                            <div className="flex flex-row text-gray-500 items-center justify-center md:justify-start gap-2">
                              <Phone size={16} />
                              <span>{profileData.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:px-8 p-4">
                        <section className="mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                              <User size={24} />
                              About
                            </h2>
                          </div>
                          <div
                            className="text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: profileData.bio,
                            }}
                          ></div>
                        </section>

                        {/* Skills Section */}
                        <section className="mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[18px] font-semibold text-gray-800">
                              Skills
                            </h2>
                            <div className="flex gap-4">
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
                                  getProfile={() => getProfile()}
                                />
                              </div>
                            )}
                          </div>
                          {profileData?.skills?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {profileData.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">
                              Add skills to showcase your expertise.
                            </p>
                          )}
                        </section>

                        {/* Experience Section */}
                        <section className="mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                              <Briefcase size={24} />
                              Experience
                            </h2>
                            <div className="flex gap-4 ">
                              <Edit3
                                size={20}
                                className="text-gray-400  hover:bg-gray-200 cursor-pointer"
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
                                  getProfile={() => getProfile()}
                                />
                              </div>
                            )}
                          </div>

                          {profileData?.experience?.length > 0 ? (
                            profileData.experience.map((experience, key) => {
                              const isLong =
                                experience?.description?.length > 200;
                              const shortDesc =
                                experience?.description?.slice(0, 200);

                              return (
                                <div
                                  className="border-l-4 border-blue-500 md:pl-6 pl-4 ml-2"
                                  key={key}
                                >
                                  <div className="mb-6">
                                    <div className="flex justify-between">
                                      <h3 className="text-[16px] font-semibold text-gray-800 flex items-center gap-2 mb-1">
                                        {experience.jobTitle}
                                        {experience.status === "Approved" ? (
                                          <RiVerifiedBadgeLine className="text-green-600 text-2xl" />
                                        ) : experience.status ===
                                          "Rejected" ? (
                                          <img
                                            src="/reject.png"
                                            className="w-6 h-6"
                                          />
                                        ) : null}
                                      </h3>
                                      <div className="flex gap-4">
                                        <button
                                          className={`text-[16px] text-gray-800 font-semibold ${experience.status === "Pending" &&
                                            "text-yellow-500"
                                            }`}
                                        >
                                          {experience.status === "Requested"
                                            && "Verification Requested"
                                          }
                                        </button>
                                        {experience.status !== "Requested" &&
                                          experience.status !==
                                          "Approved" && (
                                            <button
                                              onClick={() =>
                                                handleVerifyRequest(
                                                  experience._id
                                                )
                                              }
                                              className="mt-1 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm cursor-pointer"
                                            >
                                              Verify
                                            </button>
                                          )}
                                      </div>
                                    </div>
                                    <p className="text-blue-600 text-[16px] font-medium">
                                      {experience.company}
                                    </p>
                                    <p className="text-gray-500 text-[14px] mb-2">
                                      {experience.location} -{" "}
                                      {experience.duration}
                                    </p>
                                    <p className="text-gray-600 text-[14px]">
                                      {showFull || !isLong
                                        ? experience.description
                                        : shortDesc + "..."}
                                      {isLong && (
                                        <button
                                          className="text-blue-600 text-sm ml-1"
                                          onClick={() =>
                                            setShowFull(!showFull)
                                          }
                                        >
                                          {showFull ? "See less" : "See more"}
                                        </button>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-gray-500 text-sm">
                              Add experience to showcase your work history.
                            </p>
                          )}
                        </section>

                        <section className="mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                              <GraduationCap size={24} />
                              Education
                            </h2>
                            <div className="flex gap-2">
                              <Edit3
                                size={20}
                                className="text-gray-400  hover:bg-gray-200 cursor-pointer"
                                onClick={() => {
                                  setEducationOpen(true);
                                }}
                              />
                            </div>

                            {educationOpen && (
                              <div className="flex flex-col justify-center items-center">
                                <Education
                                  open={educationOpen}
                                  close={() => setEducationOpen(false)}
                                  loader={props.loader}
                                  profileData={profileData}
                                  getProfile={() => getProfile()}
                                />
                              </div>
                            )}
                          </div>
                          {profileData?.education?.length > 0 ? (
                            profileData.education.map((education, key) => (
                              <div
                                className="bg-gray-50 p-4 rounded-lg mb-4"
                                key={key}
                              >
                                <div className="flex justify-between">
                                  <h3 className="text-[16px] font-semibold text-gray-800 flex items-center gap-2 mb-1">
                                    {education.degree || "N/A"}
                                    {education.status === "Approved" ? (
                                      <RiVerifiedBadgeLine className="text-green-600 text-2xl" />
                                    ) : education.status === "Rejected" ? (
                                      <img
                                        src="/reject.png"
                                        className="w-6 h-6"
                                      />
                                    ) : null}
                                  </h3>
                                  <div className="flex gap-4">
                                    <button
                                      className={`text-[16px] font-semibold ${education.status === "Pending"
                                        ? "text-yellow-500"
                                        : ""
                                        }`}
                                    >
                                      {education.status === "Requested"
                                        && "Verification Requested"
                                      }
                                    </button>

                                    {education.status !== "Requested" &&
                                      education.status !== "Approved" && (
                                        <button
                                          onClick={() =>
                                            handleVerifyRequestForEdu(
                                              education._id
                                            )
                                          }
                                          className="mt-1 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm cursor-pointer"
                                        >
                                          Verify
                                        </button>
                                      )}
                                  </div>
                                </div>
                                <p className="text-blue-600 text-[16px] font-medium">
                                  {education.institution || "N/A"}
                                </p>
                                <p className="text-gray-500 text-[14px]">
                                  {education.year || "N/A"}
                                </p>
                                {education.description && (
                                  <p className="text-gray-600 text-[14px] mt-1">
                                    {education.description}
                                  </p>
                                )}
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">
                              Add education details to showcase your academic
                              background.
                            </p>
                          )}
                        </section>

                        {/* Languages Section */}
                        <section className="mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                              <Languages size={24} />
                              Languages
                            </h2>
                            <div className="flex gap-4">
                              <Edit3
                                size={20}
                                className="text-gray-400  hover:bg-gray-200 cursor-pointer"
                                onClick={() => {
                                  setLanguageOpen(true);
                                }}
                              />
                            </div>
                            {languageOpen && (
                              <div className="flex flex-col justify-center items-center">
                                <Language
                                  open={languageOpen}
                                  close={() => setLanguageOpen(false)}
                                  loader={props.loader}
                                  profileData={profileData}
                                  getProfile={() => getProfile()}
                                />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-4">
                            {profileData?.languages?.length > 0 ? (
                              profileData.languages.map((lang, key) => (
                                <span
                                  key={key}
                                  className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full md:text-sm text-[12px]"
                                >
                                  {lang.language} ({lang.level})
                                </span>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">
                                Add languages to showcase your multilingual
                                abilities.
                              </p>
                            )}
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
                              <Edit3
                                size={20}
                                className="text-gray-400  hover:bg-gray-200 cursor-pointer"
                                onClick={() => setRefereeOpen(true)}
                              />
                            </div>
                            {refereeOpen && (
                              <div className="flex flex-col justify-center items-center">
                                <Referee
                                  open={refereeOpen}
                                  close={() => setRefereeOpen(false)}
                                  loader={props.loader}
                                  profileData={profileData}
                                  getProfile={() => getProfile()}
                                />
                              </div>
                            )}
                          </div>
                          {profileData?.referees?.length > 0 ? (
                            profileData.referees.map((referee, key) => (
                              <div
                                key={key}
                                className="border-l-4 border-green-500 pl-4 pr-4 py-3 ml-2 bg-green-50 rounded-lg mb-4 shadow-sm"
                              >
                                <h3 className="text-[16px] font-semibold text-gray-800">
                                  {referee?.fullName || "N/A"}
                                </h3>
                                <p className="text-green-600 font-medium">
                                  {referee?.title || "N/A"}
                                </p>
                                <p className="text-gray-600 text-[14px] mb-2">
                                  {referee?.organization || "N/A"}
                                </p>
                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-gray-500">
                                  {referee?.email && (
                                    <span>{referee.email}</span>
                                  )}
                                  {referee?.contact && (
                                    <span>{referee.contact}</span>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">
                              Add professional referees to strengthen your
                              profile.
                            </p>
                          )}
                        </section>
                      </div>
                    </div>
                  </div>
                )
                : profileData?.companyName && (
                  <CompanyProfile
                    companyData={profileData}
                    getProfile={() => getProfile()}
                    loader={props.loader}
                  />
                )}

              {!profileData?.fullName && !profileData?.companyName && (
                <div className="p-6 text-center min-h-[400px] flex justify-center items-center flex-col">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    {user?.role === "company" ? (
                      <Building2 className="w-10 h-10 text-blue-500" />
                    ) : (
                      <User className="w-10 h-10 text-blue-500 " />
                    )}
                  </div>

                  <h3 className="md:text-xl text-[18px] font-semibold text-gray-900 mb-4">
                    Complete Your {role} Profile
                  </h3>
                  <p className="text-gray-600  text-[16px] mb-4 max-w-xl mx-auto">
                    Add your information to start building your network and
                    showcase your expertise.
                  </p>

                  <button
                    className="bg-blue-500 cursor-pointer text-white text-sm md:text-[16px] px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => {
                      if (user?.role === "professional") {
                        router.push("/ProfileComplete");
                      } else if (user?.role === "company") {
                        router.push("/CompanyProfile");
                      }
                    }}
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
                  <span className="text-sm font-bold text-gray-900">
                    {/* {!profileData?.fullName && !profileData?.companyName
                      ? "0%"
                      : "85%"} */}
                    {completion}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${completion}%`
                    }}
                  ></div>

                </div>
              </div>

              <p className="text-sm text-blue-600">
                Complete your profile to increase visibility
              </p>
            </div>

            {!profileData?.fullName && !profileData?.companyName && (
              <div className="bg-blue-50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Profile Tips
                </h4>

                {user?.role === "company" ? (
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Add your company logo</li>
                    <li>• Provide a clear company description</li>
                    <li>• Mention your services or products</li>
                    <li>• Add business contact details</li>
                    <li>• Showcase completed projects or case studies</li>
                  </ul>
                ) : (
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Add a professional photo</li>
                    <li>• Write a compelling headline</li>
                    <li>• Include your work experience</li>
                    <li>• List your key skills</li>
                    <li>• Add education details</li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
