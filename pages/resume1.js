import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { userContext } from "./_app";
import { toast } from "react-toastify";
import { Api } from "@/services/service";
import { useRouter } from "next/router";

export default function PdfTemplate({ profile }) {
  const router = useRouter();
  const [profileData, setProfileData] = useState({});
  const [user, setUser] = useContext(userContext);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && user?._id) {
  //     getProfile();
  //   }
  // }, [user]);

  // const getProfile = () => {
  //   Api("post", "auth/profile", { userId: user._id }, router).then(
  //     (res) => {
  //       setProfileData(res.data || {});
  //     },
  //     (err) => {
  //       toast.error(err?.data?.message || err?.message || "An error occurred");
  //     }
  //   );
  // };

  // useEffect(() => {
  //   if (profileData) {
  //     window.dataLoaded = true; // ✅ Puppeteer will wait for this
  //     console.log("✅ Data Loaded and flag set");
  //   }
  // }, [profileData]);

  const resumeData = profile;

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      {profile && (
        <div
          id="profile-content-loaded"
          className="w-full max-w-4xl mx-auto bg-white shadow-2xl relative overflow-hidden"
        >
          <div className="flex min-h-screen">
            {/* Left sidebar */}
            <div className="w-1/3 bg-blue-900 text-white relative">
              {/* Top curve for left sidebar */}
              <div className="relative">
                <svg
                  className="w-full"
                  viewBox="0 0 400 160"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0 L400,0 L400,120 C300,160 100,160 0,120 Z"
                    fill="#1e3a8a"
                  />
                </svg>
                <div className="absolute top-8 left-6 text-white">
                  <h1 className="text-3xl font-bold">{resumeData?.fullName}</h1>
                </div>
                <div className="absolute top-18 left-6 text-white">
                  <h1 className="text-xl font-medium">
                    {resumeData?.professionalTitle || "Your Professional Title"}
                  </h1>
                </div>
              </div>

              <div className="px-6 pt-4 pb-32">
                {/* Personal Details */}
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-4 text-blue-200">
                    Personal details
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-300">✉</span>
                      <span className="break-all">{resumeData.email}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-300">📞</span>
                      <span>{resumeData.phone}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-300">🔗</span>
                      <span className="break-all">
                        {resumeData.linkedinUrl}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-4 text-blue-200">
                    Skills
                  </h2>
                  <ul className="space-y-2">
                    {resumeData.skills?.map((skill, index) => (
                      <li key={index} className="text-blue-100">
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Languages */}
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-4 text-blue-200">
                    Languages
                  </h2>
                  <ul className="space-y-2">
                    {resumeData.languages?.map((lang, index) => (
                      <li key={index} className="text-blue-100">
                        • {lang.language} ({lang.level})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full">
                <svg
                  className="w-full"
                  viewBox="0 0 400 160"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,40 C100,0 300,0 400,40 L400,160 L0,160 Z"
                    fill="#1e3a8a"
                  />
                </svg>
              </div>
            </div>

            {/* Main content */}
            <div className="w-2/3 p-8 bg-gray-50 min-h-screen">
              {/* Summary */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                  Summary
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {resumeData.bio}
                </p>
              </div>

              {/* Work Experience */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-blue-900 mb-6">
                  Work Experience
                </h2>
                {resumeData.experience?.map((job, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {job.jobTitle}
                        </h3>
                        <p className="text-blue-700 font-medium">
                          {job.company}
                        </p>
                      </div>
                      <span className="text-blue-700 font-medium text-sm">
                        {job.duration}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                  Education
                </h2>
                {resumeData.education?.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start flex-wrap">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {edu.degree}
                        </h3>
                        <p className="text-blue-700">{edu.institution}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-blue-700 font-medium block">
                          {edu.year}
                        </span>
                      </div>
                      {edu.description && (
                        <span className="text-gray-700 font-medium block">
                          {edu.description}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Referees */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                  Referees
                </h2>
                {resumeData.referees?.map((ref, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start flex-wrap">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {ref.fullName}
                        </h3>
                        <p className="text-blue-700 font-medium">
                          {ref.title}, {ref.organization}
                        </p>
                        <p className="text-gray-700">{ref.email}</p>
                        <p className="text-gray-700">{ref.contact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
